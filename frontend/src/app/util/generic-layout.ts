import { SlideDefinition, TextDefinition, ImageDefinition } from '../interfaces/slides.interface';
import { findLayoutIdByName, findPlaceholder, findFirstPage } from './presentation_helpers';
import { uuid } from './uuid';

// const Layout: any = require('Layout');

interface BoundingBox { // Posicion y dimensiones
    height: number;
    width: number;
    x: number;
    y: number;
}

// interface LayoutConfig {
//     name: string;
//     objectId: string
// }

export default class GenericLayout {
    public name!: string;
    public presentation!: any;
    private slide!: SlideDefinition;

    public constructor(name: string, presentation: any, slide: SlideDefinition) {
        this.name = name; // Layout
        this.presentation = presentation;
        this.slide = slide;
    }

    /**
     * Crea un request de todos los slide
     */
    public appendCreateSlideRequest(requests: any[]): any[] {
        const layoutId = findLayoutIdByName(this.presentation, this.name); // Busca un layout
        if (!layoutId) {
            throw new Error(`Unable to find layout ${this.name}`);
        }
        this.slide.objectId = uuid();

        requests.push({ // Agrega un slide al request

            // Para crear un slide se utiliza el objectID
            // El insertionIndex es opcional, si no se indica se
            // pone final de la presentacion
            // El slide solo se crea si se encontro el layoutId
            createSlide: { //
                slideLayoutReference: {
                    layoutId: layoutId, // LayoutID, el layout que va a utilizar
                },
                objectId: this.slide.objectId, // Un nuevo slide uuid para generar
            },
        });
        return requests;
    }

    // Crea todo el contenido, si existe una imagen, tabla, video, imagen, etc
    // Por ejemplo carga el titulo
    public appendContentRequests(requests: any[]): any[] {
        this.appendFillPlaceholderTextRequest(this.slide.title, 'TITLE', requests);
        this.appendFillPlaceholderTextRequest(this.slide.title, 'CENTERED_TITLE', requests);
        this.appendFillPlaceholderTextRequest(this.slide.subtitle, 'SUBTITLE', requests);

        if (this.slide.bodies) {
            const bodyElements: any = findPlaceholder(this.presentation, this.slide.objectId, 'BODY');
            this.slide.bodies.forEach((body, index) => {
                let placeholder = bodyElements[index];
                if (body.lists.length === 0) {
                    this.appendFillPlaceholderTextRequest(body.text, placeholder, requests);
                } else {
                    this.appendFillPlaceholderListRequest(body.lists, placeholder, requests);
                }

                if (body.images && body.images.length) {
                    this.appendCreateImageRequests(body.images, placeholder, requests);
                }
            });
        }

        return requests;
    }

    /**
     * Crea el request para rellenar de textos
     */
    protected appendFillPlaceholderTextRequest(
        value: TextDefinition | any,
        placeholder: string | any,
        requests: any[],
    ): any[] | any {
        if (!value) { // Debe haber un texto para funcionar
            return;
        }

        if (typeof placeholder === 'string') { // debe existe un placeholder
            // Se busca el placeholder
            const pageElements = findPlaceholder(this.presentation, this.slide.objectId, placeholder);
            if (!pageElements) { // Si no existe el elemento

                return;
            }
            placeholder = pageElements[0]; // El placeholder se crea
        }

        // Se pasa el id del placeholder al texto
        this.appendInsertTextRequests(value, { objectId: placeholder.objectId }, requests);
    }

    /**
     * Crea el request para rellenar de lista
     */
    protected appendFillPlaceholderListRequest(
        value: TextDefinition[] | any,
        placeholder: string | any,
        requests: any[],
    ): any[] | any {
        if (!value) { // Debe haber un texto para funcionar
            return;
        }

        if (typeof placeholder === 'string') { // debe existe un placeholder
            // Se busca el placeholder
            const pageElements = findPlaceholder(this.presentation, this.slide.objectId, placeholder);
            if (!pageElements) { // Si no existe el elemento

                return;
            }
            placeholder = pageElements[0]; // El placeholder se crea
        }

        // Se pasa el id del placeholder al texto
        this.appendInsertListRequest(value, { objectId: placeholder.objectId }, requests);
    }

    protected appendInsertTextRequests(text: TextDefinition,
        locationProps: any, requests: any[]): void {
        let request = { // Prepara el request
            insertText: {
                text: text.rawText, // Texto
                objectId: locationProps.objectId
            },
        };
        requests.push(request);
    }

    protected appendSetBackgroundImageRequest(image: any,
        requests: any[]): void {

        requests.push({
            updatePageProperties: { // Se actualiza la pagina con
                objectId: this.slide.objectId,
                fields: 'pageBackgroundFill.stretchedPictureFill.contentUrl',
                pageProperties: {
                    pageBackgroundFill: {
                        stretchedPictureFill: {
                            contentUrl: image.url,
                        },
                    },
                },
            },
        });
    }

    protected appendDeleteFirstObject(requests: any[]): void {

        const slide = findFirstPage(this.presentation);

        if (!slide) {
            return;
        }

        requests.push({
            deleteObject: {
                objectId: slide.objectId,
            },
        })
    }

    protected appendInsertListRequest(lists: TextDefinition[], locationProps: any,
        requests: any[]) {

        // Anexa los textos
        let textos: string[] | any = [];
        lists.forEach((l: TextDefinition) => {
            textos.push(l.rawText);
        });


        this.appendInsertTextRequests({
            rawText: textos.join('\n')
        }, locationProps, requests);


        // Crear la enumeracion de toda la lista



        let request = {
            createParagraphBullets: {
                textRange: {
                    type: 'ALL',
                },
                bulletPreset: `BULLET_DISC_CIRCLE_SQUARE`,
                objectId: locationProps.objectId
            }
        }



        requests.push(request);




    }

    protected appendCreateImageRequests(images: ImageDefinition[], placeholder: any,
            requests: any[]): void {

        // const layer = Layout('left-right');
        // for (let image of images) {
        //     layer.addItem({
        //         width: 15 * 2,
        //         height: 15 * 2,
        //         meta: image,
        //     });
        // }

        const box = this.getBodyBoundingBox(placeholder);
        // const computedLayout = layer.export();

        // let scaleRatio = Math.min(box.width / computedLayout.width, box.height /
        // computedLayout.height);

        // let scaledWidth = computedLayout.width * scaleRatio;
        // let scaledHeight = computedLayout.height * scaleRatio;

        // let baseTranslateX = box.x + (box.width - scaledWidth) / 2;
        // let baseTranslateY = box.y + (box.height - scaledHeight) / 2;

        for (let item of images) {
            // let itemOffsetX = item.meta.offsetX ? item.meta.offsetX : 0;
            // let itemOffsetY = item.meta.offsetY ? item.meta.offsetY : 0;
            // let itemPadding = item.meta.padding ? item.meta.padding : 0;
            // let width = item.meta.width * scaleRatio;
            // let height = item.meta.height * scaleRatio;
            // let translateX = baseTranslateX + (item.x + itemPadding + itemOffsetX) * scaleRatio;
            // let translateY = baseTranslateY + (item.y + itemPadding + itemOffsetY) * scaleRatio;

            requests.push({
                createImage: {
                    elementProperties: {
                        pageObjectId: this.slide.objectId,
                        size: {
                            height: {
                                magnitude: box.height,
                                unit: 'EMU',
                            },
                            width: {
                                magnitude: box.width,
                                unit: 'EMU',
                            },
                        },
                        transform: {
                            scaleX: 1,
                            scaleY: 1,
                            translateX: box.x,
                            translateY: box.y,
                            shearX: 0,
                            shearY: 0,
                            unit: 'EMU',
                        },
                    },
                    url: item.url,
                },
            });
        }
    }

    protected getBodyBoundingBox(placeholder: any): BoundingBox {
        if (placeholder) {
            return this.calculateBoundingBox(placeholder);
        }
        return {
            width: this.presentation.pageSize!.width!.magnitude as number,
            height: this.presentation.pageSize!.height!.magnitude as number,
            x: 0,
            y: 0,
        };
    }

    protected calculateBoundingBox(element: any): BoundingBox {
        const height = element.size!.height!.magnitude;
        const width = element.size!.width!.magnitude;
        const scaleX = element.transform!.scaleX || 1;
        const scaleY = element.transform!.scaleY || 1;
        const shearX = element.transform!.shearX || 0;
        const shearY = element.transform!.shearY || 0;

        return {
            width: scaleX * width! + shearX * height!,
            height: scaleY * height! + shearY * width!,
            x: element.transform!.translateX as number,
            y: element.transform!.translateY as number,
        };
    }

}



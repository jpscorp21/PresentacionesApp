// import slides from './slides';
import { SlideDefinition } from '../interfaces/slides.interface';
import extractSlides from './extract-slides';
import matchLayout from './match-layout';
import { SlideService } from '../services/slide.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlideGenerator {
    private slides: SlideDefinition[] = [];
    private _presentacion: any;
    // private static _slideSrv = new SlideService().addSlides();

    constructor(private readonly slideSrv: SlideService) {
        // this._presentacion = res;
    }

    get presentacion(): any {
        return this._presentacion.result;
    }

    /**
     * Generar una presentacion a partir de uno nuevo
     * @param title Titulo de una presentacion
     */
    public async newPresentation(title: string) {
        this._presentacion = await this.slideSrv.create({title});
        // return new SlideGenerator(res);
    }

    /**
     * Agrega un slide
     */
    protected createSlides(): any {
        const batch = {
            requests: []
        };
        for (const slide of this.slides) { // Se crea el layout para cargar
            const layout = matchLayout(this.presentacion, slide); // Devuelve la clase GenericLayout
            layout.appendCreateSlideRequest(batch.requests); // Añade el request Slide
        }

        return batch;
    }

    /**
     * Agrega los contenidos en cada slide
     */
    protected populateSlides(): any {
        const batch = {
            requests: []
        };

        for (const slide of this.slides) {
            const layout = matchLayout(this.presentacion, slide); // Establece los layout
            layout.appendContentRequests(batch.requests); // Añade todos los request
        }

        return batch;
    }

    protected clearAllSlide() {

        const batch: any = {
            requests: []
        };

        if (!this.presentacion || !this.presentacion.slides) {
            throw new Error('No existe la presentacion');
        }

        for (const slide of this.presentacion.slides) {
            this.requestDeleteSlide(batch, slide.objectId);
        }

        return batch;
    }

    /**
     * Agrega los contenidos en cada slide
     */
    protected deleteFirstSlide(): any {
        const batch: any = {
            requests: []
        };

        if (this.presentacion && this.presentacion.slides && this.presentacion.slides[0]) {
            this.requestDeleteSlide(batch, this.presentacion.slides[0].objectId);
        }


        return batch;
    }

    protected requestDeleteSlide(batch: any, objectId: string | undefined): void {
        batch.requests.push({
            deleteObject: {
                objectId
            }
        });
    }

    /**
     * Generar una presentacion desde uno existente
     * @param presentationId Id de una presentacion
     */
    public async forPresentation(presentationId: string): Promise<any> {
        // console.log(SlideGenerator._slideSrv);
        const res = await this.slideSrv.get(presentationId);

        if (!res) {
            throw new Error(
                'No existe la presentacion con el id: ' + presentationId);
        }


        this._presentacion = res;
        // return new SlideGenerator(res);
    }

    /**
     * Refrescar una copia local de una presentacion
     */
    protected async reloadPresentation(): Promise<void> {
        const res = await this.slideSrv.get(this.presentacion.presentationId);
        this._presentacion = res;
    }

    /**
     * Actualiza una presentacion
     * @param batch request
     */
    protected async updatePresentation(batch: any): Promise<void | null> {
        if (batch.requests.length === 0) {
            return Promise.resolve(null);
        }
        await this.slideSrv.batchUpdate(this.presentacion.presentationId, batch);
    }

    public async generateFromJSON(json: any[]) {

        this.slides = extractSlides(json);
        await this.updatePresentation(this.createSlides());
        await this.reloadPresentation();
        await this.updatePresentation(this.populateSlides());
        await this.reloadPresentation();
        await this.updatePresentation(this.deleteFirstSlide());
        return this.presentacion.presentationId;
    }

    public async updateFromJSON(json: any[]) {
        await this.updatePresentation(this.clearAllSlide());
        await this.reloadPresentation();
        this.slides = extractSlides(json); // Correcto

        await this.updatePresentation(this.createSlides());
        // Se carga la presentacion con todo el objeto para luego actualizar y realizar comparaciones
        await this.reloadPresentation();

        await this.updatePresentation(this.populateSlides());
        return this._presentacion;
    }


}

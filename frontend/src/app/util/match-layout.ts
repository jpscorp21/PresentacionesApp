import GenericLayout from './generic-layout';
import { TextDefinition, SlideDefinition } from '../interfaces/slides.interface';

type MatchFn = (slide: SlideDefinition) => boolean;

interface Layout {
    name: string;
    match: MatchFn;
}

const layouts: Layout[] = [];

export default function matchLayout(presentation: any,
    slide: SlideDefinition): GenericLayout {
    // if we have manually set the slide layout get the master from the presentation
    let layoutName: string | undefined = undefined;
    // Si no existe ya un customlayout
    // Pregunta si existe un layout, entonces busca si encuentra coincidencia
    if (slide.customLayout !== undefined) {
        let layout = presentation.layouts!.find(layout =>
            layout.layoutProperties!.displayName == slide.customLayout);
        if (layout) {
            layoutName = layout.layoutProperties!.name;
        }
    }
    if (layoutName == undefined) { // Si layoutName no existe entonces, se escoge uno perfecto
        // Recorre el layout con las funciones cargadas y se le pasa el parametro
        let layout = layouts.find(layout => layout.match(slide));
        if (!layout) { // Si no existe ninguno, nada pasa y falla el programa
            throw new Error('Failed to match layout for slide');
        }
        layoutName = layout.name; // Guarda el layout // Guarda el layout
    }

    // Crea el layout
    // Crea el objeto para armar el request con el layout
    return new GenericLayout(layoutName, presentation, slide);
}

function defineLayout(name: string, matchFn: MatchFn): void { // Define un layout con el texto
    layouts.push({
        name: name,
        match: matchFn,
    });
}

function hasText(text: any): boolean {
    return text && text.rawText && text.rawText.length !== 0;
}

function hasContent(slide: SlideDefinition): boolean {
    return slide.bodies.length !== 0;
}

function hasTextAndImage(slide: SlideDefinition): boolean {
    return slide.bodies && slide.bodies.length == 2;
}

function hasImages(slide: SlideDefinition): boolean {
    return slide.bodies && slide.bodies.length == 3;
}

// Definicion de layouts
defineLayout('TITLE', slide => hasText(slide.title) &&
    !hasText(slide.subtitle) && !hasContent(slide)); // Solo muestra si no tiene contenido
defineLayout('TITLE_1', slide => hasText(slide.title) &&
    hasText(slide.subtitle) && !hasContent(slide));
defineLayout('TITLE_AND_TWO_COLUMNS', slide => hasText(slide.title) && hasTextAndImage(slide));
defineLayout('TITLE_AND_TWO_COLUMNS_1', slide => hasText(slide.title) && hasImages(slide));
defineLayout('TITLE_AND_BODY', slide => hasText(slide.title) || hasContent(slide));
// defineLayout('TITLE_AND_TWO_COLUMNS', slide => hasText(slide.title) && slide.bodies.length == 2);
defineLayout('BLANK', () => true);


// defineLayout('TITLE', slide => hasText(slide.title) && hasText(slide.subtitle) &&
// hasContent(slide)); // Solo muestra si no tiene contenido
// defineLayout('SECTION_HEADER', slide => hasText(slide.title) && !hasText(slide.subtitle)
//&& !hasContent(slide));
// defineLayout(
//     'SECTION_TITLE_AND_DESCRIPTION',
//     slide => hasText(slide.title) && hasText(slide.subtitle) && hasTextContent(slide),
// );
// defineLayout('TITLE_AND_TWO_COLUMNS', slide => hasText(slide.title) && slide.bodies.length == 2);
// defineLayout('TITLE_AND_BODY', slide => hasText(slide.title) || hasContent(slide));
// defineLayout('BLANK', () => true);

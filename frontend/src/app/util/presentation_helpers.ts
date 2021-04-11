export interface Dimensions {
    width: number;
    height: number;
}

/**
 * Localiza y devuelve una pagina segun el id
 */
export function findPage(presentation: any, pageId: string)
: any | undefined {
    if (!presentation.slides) {
        return undefined;
    }
    return presentation.slides.find((p: any): boolean =>
        p.objectId === pageId); // Retornar un slide que coincida con el id
}

/**
 * Tamaño de una presentacion
 */
export function pageSize(presentation: any): Dimensions {

    if (
        !presentation ||
        !presentation.pageSize ||
        !presentation.pageSize.width ||
        !presentation.pageSize.height
    ) {
        return {
            width: 0,
            height: 0
        }
    }

    return {
        width: presentation.pageSize.width.magnitude || 0, // Retorna el width y height
        height: presentation.pageSize.height.magnitude || 0,
    };
}

/**
 * Localizacion de un layout
 */
export function findLayoutIdByName(presentation: any, name: string)
: string | undefined {
    if (!presentation.layouts) { // Si no tiene layout
        return undefined;
    }
    // busca el layout por el nombre
    const layout = presentation.layouts.find((l: any): boolean => l.layoutProperties.name === name);
    if (!layout) { // si no hay
        return undefined;
    }
    return layout.objectId; // Retorna el id del layout
}

/**
 * Encuentra un nombre de placeholder en la pagina
 */
export function findPlaceholder(
    presentation: any,
    pageId: any,
    name: string,
): any[] | undefined {
    const page = findPage(presentation, pageId); // Busca un slide
    if (!page) {
        throw new Error(`Can't find page ${pageId}`);
    }

    let placeholders = [];
    if (!page.pageElements) { // Si no tiene ningun placeholder
        return undefined;
    }

    for (let element of page.pageElements) { // Si tiene
        if (element.shape && element.shape.placeholder && name == element.shape.placeholder.type) {
            placeholders.push(element);
        }
    }

    if (placeholders.length) { // Si existe placeholders
        return placeholders;
    }

    return undefined;
}

/**
 * Encuentra un elemento en una pagina segun el id
 */
export function findPageElement(
    presentation: any,
    pageId: string,
    id: string,
): any | undefined {
    const page: any = findPage(presentation, pageId); // Busca un page
    if (!page) { // Si no existe
        throw new Error(`Can't find page element ${pageId}`);
    }

    for (let element of page.pageElements) { // Busca un elemento
        if (element.objectId == id) { // Si coincide retorna el elemento
            return element;
        }
    }
    return undefined;
}

export function findSpeakerNotesObjectId(
    presentation: any,
    pageId: string,
): string | undefined {
    let page: any = findPage(presentation, pageId);
    if (page) {
        return page.slideProperties.notesPage.notesProperties.speakerNotesObjectId;
    }
    return undefined;
}

/**
 * Localiza y devuelve una pagina segun el id
 */
export function findFirstPage(presentation: any):
    any | undefined {
    if (!presentation.slides) {
        return undefined;
    }
    return presentation.slides[0];
}

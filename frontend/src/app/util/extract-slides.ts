import { SlideDefinition } from '../interfaces/slides.interface';
import { Context } from './slides-env';

function processJSON(json: any[], context: Context) {
    json.forEach((v: any) => {
        context.startSlide();
        saveTitulo(v.titulo, context);
        saveSubtitulo(v.subtitulo, context);
        saveParrafos(v.parrafos, context);
        saveListas(v.listas, context);        
        saveImagenes(v, context);

        context.endSlide();
    });
}

function saveTitulo(titulo: any, context: Context) {
    if (context.currentSlide && titulo && titulo.texto) {
        context.currentSlide.title = {
            rawText: titulo.texto
        }
    }
}

function saveSubtitulo(subtitulo: any, context: Context) {
    if (context.currentSlide && subtitulo && subtitulo.texto) {
        context.currentSlide.subtitle = {
            rawText: subtitulo.texto
        }
    }
}

function saveParrafos(parrafos: any[], context: Context) {
    if (parrafos) {
        parrafos.forEach((p: any) => {
            if (p.texto) {
                context.appendText(p.texto + '\n');
            }
        });
    }
}

function saveListas(listas: any, context: Context) {
    if (listas && listas.textos) {
        listas.textos.forEach((l: any) => {            
            context.appendLists(l);            
        });
    }
}

function saveImagenes(v: any, context: Context) {

    if (v.imagenes && Array.isArray(v.imagenes) && v.imagenes.length > 0) {

        // En el caso si existe el parrafo y la imagen juntos
        if (context.text && context.text.rawText && context.text.rawText.length) {
            saveBody(context);
        } else if (context.lists && context.lists.length > 0) {
            saveBody(context);
        }

        v.imagenes.forEach((i: any, index: number) => {            
            if (index > 0) {
                saveBody(context);
            }
            if (i.url) {
                context.images.push({
                    url: i.url
                })
            }
        });
    }
}

function saveBody(context: Context) {
    context.addBody();
    context.reset();
}

export default function extractSlides(json: any[]): SlideDefinition[] {
    let context = new Context();
    processJSON(json, context);
    context.done();
    return context.slides;
}
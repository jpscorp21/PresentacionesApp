import { SlideDefinition, TextDefinition, ImageDefinition, VideoDefinition } from '../interfaces/slides.interface';
import { uuid } from './uuid';

/**
 * Se encarga de armar los slides para posterior hacer las peticiones
 * Es una clase principal que arma los slides, se carga un slide y luego se añade 
 * en un slide array
 */
export class Context {
    
    public slides: SlideDefinition[] = [];
    public currentSlide?: SlideDefinition;
    public text: TextDefinition = {
        rawText: ''
    };
    public lists: TextDefinition[] = [];
    public images: ImageDefinition[] = [];
    public videos: VideoDefinition[] = [];

    public constructor() {
        this.startSlide();
        this.startTextBlock();
    }

    public done(): void {
        this.endSlide();
    }

    public startTextBlock(): void {
        this.text = {
            rawText: ''
        }
    }

    public appendText(content: string): void {
        this.text.rawText += content;
    }

    public appendLists(content: string): void {
        this.lists.push({
            rawText: content
        });
    }

    public startSlide(): void {
        this.currentSlide = {
            objectId: uuid(),
            bodies: [],
            title: null,
            subtitle: null,
            customLayout: null,
            backgroundImage: null
        }
    }

    public endSlide(): void {
        if (this.currentSlide) {

            if (
                this.images.length ||
                this.videos.length ||
                this.lists.length ||
                (this.text 
                && this.text.rawText
                && this.text.rawText.trim().length)
            ) {
                this.addBody();       
            }
            this.slides.push(this.currentSlide);
            this.currentSlide = undefined;
            this.reset();
        }
        
    }

    addBody() {
        this.currentSlide!.bodies.push({
            text: this.text,
            lists: this.lists,
            images: this.images
        });  
    }

    reset() {        
        this.startTextBlock();
        this.lists = [];
        this.images = [];
        this.videos = [];
    }
}
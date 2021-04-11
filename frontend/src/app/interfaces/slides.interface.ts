export type Color = any;

export interface ListMarker {
    start: number;
    end: number;
    type: string; // TODO - enum
}

export interface TextDefinition {
    rawText?: string;
}

export interface BodyDefinition {
    text: TextDefinition;
    lists: TextDefinition[];
    images: ImageDefinition[];
}

export interface SlideDefinition {
    objectId?: string;
    title?: TextDefinition | null;
    subtitle?: TextDefinition | null;
    customLayout?: string | null;
    bodies: BodyDefinition[];
    backgroundImage?: ImageDefinition | null;
}

export interface ListDefinition {
    depth: number;
    tag: string;
    start: number;
    end?: number;
}

export interface ImageDefinition {
    url?: string;
    source?: string;
    type?: string;
    width?: number;
    height?: number;
    style?: string;
    padding?: number;
    offsetX?: number;
    offsetY?: number;
}

export interface VideoDefinition {
    width: number;
    height: number;
    autoPlay: boolean;
    id: string;
}

export interface FontSize {
    magnitude: number;
    unit: string;
}

export interface LinkDefinition {
    url: string;
}

export interface StyleDefinition {
    bold?: boolean;
    italic?: boolean;
    fontFamily?: string;
    foregroundColor?: Color;
    link?: LinkDefinition;
    backgroundColor?: Color;
    underline?: boolean;
    strikethrough?: boolean;
    smallCaps?: boolean;
    baselineOffset?: string;
    start?: number;
    end?: number;
    fontSize?: FontSize;
}

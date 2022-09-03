/**
 * Red, green, and blue color attributes for canvas objects.
 */
export interface ColorRGB {
    red: number;
    green: number;
    blue: number;
}
export class ColorRGB implements ColorRGB {
}

/**
 * Red, green, blue, and alpha color attributes for canvas objects.
 */
export interface ColorRGBA extends ColorRGB {
    alpha?: number;
}
export class ColorRGBA implements ColorRGBA {
}
/**
 * RGBA color model data structure, providing values for each primary color
 * and alpha.
 */
export interface RGBAColorSpace {
    /**
     * The primary color Red value
     */
    red: number;
    /**
     * The primary color Green value
     */
    green: number;
    /**
     * The primary color Blue value
     */
    blue: number;
    /**
     * The alpha value (opacity) of the color model.
     */
    alpha: number;
}

import { RGBAColorSpace } from './types';

export class BaseRGBAColorSpace implements RGBAColorSpace {
    public red: number;
    public green: number;
    public blue: number;
    public alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    public add(value: number) {
        this.red += value;
        this.green += value;
        this.blue += value;
    }

    public subtract(value: number) {
        this.red -= value;
        this.green -= value;
        this.blue -= value;
    }
}

import { BaseSpace, ModelType } from '../base';
import {
    convertHslToHwb,
    convertHslToRgb,
    convertHwbToHsl,
    convertRgbToHsl,
} from '../utils';
import { HSLColorSpace } from './types';
import { normalizePercent } from '../../common';
import { RGBASpace } from '../rgba';

export class HSLSpace implements BaseSpace<HSLColorSpace> {
    public type: ModelType;
    private readonly space: HSLColorSpace;

    constructor(space: HSLColorSpace) {
        this.type = 'hsl';
        this.space = space;
    }

    public hue(): number {
        return this.space.hue;
    }

    public saturation(): number {
        return this.space.saturation;
    }

    public lightness(): number {
        return this.space.lightness;
    }

    blacken(ratio: number): HSLSpace {
        ratio = normalizePercent(ratio);
        const hwb = convertHslToHwb(this.space);
        hwb.blackness += hwb.blackness * ratio;
        const hsl = convertHwbToHsl(hwb);
        this.applySpace(hsl);
        return this;
    }

    clone(): HSLSpace {
        return new HSLSpace({ ...this.space });
    }

    color(color: keyof HSLColorSpace): number {
        return this.space[color];
    }

    darken(ratio: number): HSLSpace {
        return this.adjustRelativeValue('lightness', ratio, false);
    }

    desaturate(ratio: number): HSLSpace {
        return this.adjustRelativeValue('saturation', ratio, false);
    }

    grayscale(): HSLSpace {
        const rgba = this.toRGBA();
        rgba.grayscale();
        const hsl = convertRgbToHsl(rgba.toObject());
        this.applySpace(hsl);
        return this;
    }

    lighten(ratio: number): HSLSpace {
        return this.adjustRelativeValue('lightness', ratio, true);
    }

    mix(color: HSLColorSpace, weight?: number): HSLSpace {
        const hsl = this.toRGBA().mix(convertHslToRgb(color), weight).toHSL();
        this.applySpace(hsl.space);
        return this;
    }

    rotate(degrees: number): HSLSpace {
        this.space.hue = (this.space.hue + degrees) % 360;
        if (this.space.hue < 0) {
            this.space.hue += 360;
        }
        return this;
    }

    saturate(ratio: number): HSLSpace {
        return this.adjustRelativeValue('saturation', ratio, true);
    }

    setColor(color: keyof HSLColorSpace, value: number): HSLSpace {
        if (color !== 'hue') {
            this.space[color] = Math.floor(Math.min(Math.max(value, 0), 360));
        } else {
            this.space[color] = Math.min(Math.max(value, 0), 1);
        }
        return this;
    }

    toArray(): [number, number, number] {
        return [this.space.hue, this.space.saturation, this.space.lightness];
    }

    toHexString(removeHashtag?: boolean): string {
        return this.toRGBA().toHexString(removeHashtag);
    }

    toObject(): HSLColorSpace {
        return { ...this.space };
    }

    toString(): string {
        return `hsl(${this.space.hue},${this.space.saturation}%,${this.space.lightness}%)`;
    }

    whiten(ratio: number): HSLSpace {
        ratio = normalizePercent(ratio);
        const hwb = convertHslToHwb(this.space);
        hwb.whiteness += hwb.whiteness * ratio;
        const hsl = convertHwbToHsl(hwb);
        this.applySpace(hsl);
        return this;
    }

    public toRGBA() {
        return new RGBASpace(convertHslToRgb(this.space));
    }

    private applySpace(space: HSLColorSpace) {
        this.space.hue = Math.min(Math.max(Math.floor(space.hue), 0), 360);
        this.space.saturation = Math.min(
            Math.max(Math.floor(space.saturation), 0),
            100
        );
        this.space.lightness = Math.min(
            Math.max(Math.floor(space.lightness), 0),
            100
        );
    }

    private adjustRelativeValue(
        key: keyof HSLColorSpace,
        ratio: number,
        increase: boolean
    ) {
        const normalized = normalizePercent(ratio, true);
        this.space[key] += Math.round(
            this.space[key] * normalized * (increase ? 1 : -1)
        );
        const max = key === 'hue' ? 360 : 100;
        if (this.space[key] < 0) this.space[key] = 0;
        if (this.space[key] > max) this.space[key] = max;
        return this;
    }
}

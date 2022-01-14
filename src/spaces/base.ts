export type ModelType = 'rgb' | 'cymk' | 'hsv' | 'hsl';

export interface BaseSpace<T> {
    type: ModelType;

    lighten(ratio: number): BaseSpace<T>;
    darken(ratio: number): BaseSpace<T>;
    whiten(ratio: number): BaseSpace<T>;
    blacken(ratio: number): BaseSpace<T>;
    saturate(ratio: number): BaseSpace<T>;
    desaturate(ratio: number): BaseSpace<T>;
    rotate(degrees: number): BaseSpace<T>;
    mix(color: T, weight?: number): BaseSpace<T>;
    clone(): BaseSpace<T>;
    grayscale(): BaseSpace<T>;
    color(color: keyof T): number;

    setColor(color: keyof T, value: number): BaseSpace<T>;

    toArray(): Array<number>;
    toObject(): T;
    toHexString(removeHashtag?: boolean): string;
    toString(): string;
}

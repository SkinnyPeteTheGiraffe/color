import { HueColorSpace } from '../../base';

export default interface HSLColorSpace extends HueColorSpace {
    lightness: number;
    saturation: number;
}

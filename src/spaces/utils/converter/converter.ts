import RGBAColorSpace from '../../rgba/types/rgba-color-space';
import HSLColorSpace from '../../hsl/types/hsl-color-space';
import HWBColorSpace from '../../hwb/types/hwb-color-space';
import HSVColorSpace from '../../hsv/types/hsv-color-space';

export default interface Converter<T> {
    toRGBA(space: T): RGBAColorSpace;
    toHSL(space: T): HSLColorSpace;
    toHWB(space: T): HWBColorSpace;
    toHSV(space: T): HSVColorSpace;
}

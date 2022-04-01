/**
 * Determines if the provided string is between 3 and 5, which would indicate a shorthand
 * hex color value.
 *
 * @remarks This does not validate the string is a valid hex-decimal value, this may be added in the future if the need arises.
 *
 * @param hex the string to determine value
 */
export const isShortHand = (hex: string): boolean =>
    hex.length >= 3 && hex.length < 6;

export const HEX_REGEX = /([\da-f]{3}){1,2}/i;

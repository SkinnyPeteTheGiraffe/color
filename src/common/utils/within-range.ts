export interface WithinRangeOptions {
    lowerBound?: 'gt' | 'gte';
    upperBound?: 'lt' | 'lte';
}

const DEFAULT_CONFIG: WithinRangeOptions = {
    lowerBound: 'gte',
    upperBound: 'lte',
};

export const withinRange = (
    value: number,
    minimum: number,
    maximum: number,
    options?: WithinRangeOptions
) => {
    let results: boolean;
    const { lowerBound, upperBound } = {
        ...DEFAULT_CONFIG,
        ...(options || {}),
    };
    // Setup lower bound condition
    if (lowerBound === 'gt') {
        results = value > minimum;
    } else {
        results = value >= minimum;
    }
    // Skip if needed
    if (!results) return false;

    // Setup upper bound condition
    if (upperBound === 'lt') {
        results = value < maximum;
    } else {
        results = value <= minimum;
    }
    return results;
};

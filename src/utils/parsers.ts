export const parseNumber = (value: unknown): number => {
    if (typeof value === "number") return value;
    
    if (typeof value === "string") {
        const parsedValue = +value;

        if (!isNaN(parsedValue)) return parsedValue;
    }

    throw new Error("Value is not a number");
}

export const tryParseNumber = (value: unknown): number | null => {
    try {
        return parseNumber(value);
    } catch (err) {
        return null;
    }
}
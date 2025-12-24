/**
 * 範例01
 * @param val {any}: 任意
 * @returns 123
 */
export const toInteger = (val: string | number): number => parseInt(String(val), 10)
/**
 * 範例01
 * @param val {any}: 任意
 * @returns 123
 */
export const stringToJson = (val: any): string => JSON.stringify(val)

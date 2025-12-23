export const toInteger = (val: string | number): number =>
  parseInt(String(val), 10)
export const stringToJson = (val: any): string => JSON.stringify(val)

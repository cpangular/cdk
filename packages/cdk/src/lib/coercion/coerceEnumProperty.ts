import { EnumInput } from "./EnumInput";

export function coerceEnumProperty<T extends number>(
  value: EnumInput<T>,
  lookup: { [key: string | number]: T | string }
): T | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value === "number") {
    return value as T;
  }
  return lookup[value.toUpperCase()] as T;
}

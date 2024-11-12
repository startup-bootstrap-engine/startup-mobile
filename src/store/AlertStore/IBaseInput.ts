/**
 * Base interface for common input properties.
 */
export interface IBaseInput {
  placeholder?: string;
  label?: string;
  value?: string | number;
  attributes?: { [key: string]: string | number };
}

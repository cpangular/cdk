import { paramCase } from 'change-case';

export class CSSStyleDeclarationBase {
  protected getProperty(name: string): string {
    return this.getPropertyRaw(`${this.prefix}${paramCase(name)}`);
  }

  protected setProperty(name: string, value: string) {
    this.setPropertyRaw(`${this.prefix}${paramCase(name)}`, value);
  }

  protected getPropertyRaw(name: string): string {
    return this._props.getPropertyValue(name);
  }

  protected setPropertyRaw(name: string, value: string) {
    this._props.setProperty(name, value);
  }

  protected boolean(val: string): boolean;
  protected boolean(val: boolean): string;
  protected boolean(val: string | boolean): string | boolean {
    if (typeof val === 'string') {
      return val === '1';
    }
    return val ? '1' : '0';
  }

  constructor(private readonly _props: CSSStyleDeclaration, protected readonly prefix?: string) {}
}

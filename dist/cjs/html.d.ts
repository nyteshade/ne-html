
export const commands: {
  readonly parse: unique symbol;
  readonly parseOrdered: unique symbol;
  readonly parseNamed: unique symbol;
  readonly parseShadow: unique symbol;
  readonly createStorage: unique symbol;
  readonly register: unique symbol;
  readonly registered: unique symbol;
  readonly define: unique symbol;
  readonly additionalFunctions: unique symbol;
  readonly prefix: string;
};

export class HTML {
  static create(...args: any[]): HTMLElement;

  static [tagName: string]: (...args: any[]) => HTMLElement;

  static [commands.parse](...args: any[]): Record<string | symbol, any>;

  static [commands.parseOrdered](
    tagName: string,
    content?: string | string[],
    style?: Record<string, string>,
    attributes?: Record<string, string>,
    webComponentName?: string,
    useDocument?: Document,
    children?: Node[],
    shadow?:
      | {
          options?: Record<string, any>;
          children?: Node[];
        }
      | Node[],
  ): Record<string | symbol, any>;

  static [commands.parseNamed](
    tagName: string,
    config: Record<any, any>,
  ): Record<string | symbol, any>;

  static [commands.parseShadow](
    tagName: string,
    shadowDOMOptions?:
      | {
          options?: Record<string, any>;
          children?: Node[];
        }
      | Node[],
  ): Record<string | symbol, any>;

  static [commands.additionalFunctions](args: any[]): void;

  static [commands.createStorage](
    forPrimaryKey: string,
    forSubKey?: string,
    create?: boolean,
  ): Map<any, any>;

  static [commands.register](
    name: string,
    factoryFunction: (args: any[]) => any,
    config?: Record<any, any>,
    thisArg?: any,
    args?: any[],
  ): void;

  static [commands.registered](): Generator<[string, Map<string, any>], void, unknown>;
}

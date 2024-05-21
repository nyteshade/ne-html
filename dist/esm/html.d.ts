
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

  /**
   * Parses the provided arguments to construct a configuration
   * object for creating an HTML element. This method dynamically
   * determines the parsing strategy based on the number and type
   * of arguments provided.
   *
   * @param {...*} args - The arguments used to configure the web
   * component. The first argument is always the name of the
   * component. The subsequent arguments determine the properties
   * and children of the component.
   * @returns {Object} The configuration object for the web component
   * @throws {SyntaxError} If no arguments are provided.
   * @example
   * // Create a parsed arguments with default properties:
   * const {parse} = commands;
   * HTML[parse]('my-component');
   *
   * @example
   * // Create parsed arguments with named properties:
   * const {parse} = commands;
   * HTML[parse]('my-component', {
   *   id: 'unique-id',
   *   class: 'container'
   * });
   *
   * @example
   * // Create parsed arguments with children defined
   * // through an array:
   * const {parse} = commands;
   * HTML[parse]('my-component', ['child1', 'child2']);
   */
  static [commands.parse](...args: any[]): Record<string | symbol, any>;

  /**
   * Constructs an object representing the configuration for a web
   * component, including its content, styles, attributes, and
   * shadow DOM options.
   *
   * @param {string} content - The inner content of the web component.
   * @param {Object} [style={}] - CSS styles to apply to the
   * component.
   * @param {Object} [attributes={}] - HTML attributes to set on
   * the component.
   * @param {string} [webComponentName] - Name for custom element
   * registration.
   * @param {Document} [useDocument=document] - The document context
   * to use.
   * @param {Array} [children=[]] - Child elements to append to the
   * component.
   * @param {boolean} [addShadowDOM=false] - Whether to attach a
   * shadow DOM.
   * @param {Object} [shadowDOMOpts={}] - Options for the shadow DOM.
   * @param {Array} [shadowChildren=[]] - Children to append to the
   * shadow DOM.
   * @returns {Object} The configuration object for the web component.
   *
   * @example
   * const symbol = Symbol.for('@raptive.html.init.ordered.params')
   * const config = HTML[symbol](
   *   'Hello, World!', {}, {}, 'my-component', document, [], true,
   *   { mode: 'open', clonable: true, slotAssignment: 'named' }, []
   * );
   */
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

  /**
   * Parses the named parameters and initializes the object with
   * additional attributes if specified. This method handles the
   * extraction and assignment of properties from a parameter object
   * to a new object with structured attributes for web components.
   *
   * @param {Object} params - The parameters object containing all
   * settings.
   * @param {string} params.content - The content for the web
   * component.
   * @param {Object} params.style - The style settings for the web
   * component.
   * @param {Object} params.attributes - Initial attributes for the
   * web component.
   * @param {string} params.webComponentName - The tag name for the
   * web component.
   * @param {Document} params.useDocument - The document to be used
   * for creating elements.
   * @param {Array} params.children - Child elements of the web
   * component.
   * @param {Object} params.shadow - Shadow DOM settings for the web
   * component.
   * @param {string} params.class - Class attribute for the web
   * component.
   * @param {string} params.id - ID attribute for the web component.
   * @param {Array} params.classes - Additional classes for the web
   * component.
   * @returns {Object} The parsed object with structured web
   * component settings.
   *
   * @example
   * const {parseNamed} = commands
   * const params = {
   *   content: 'Example',
   *   style: { color: 'red' },
   *   attributes: { 'data-type': 'primary' },
   *   webComponentName: 'custom-element',
   *   useDocument: document,
   *   children: [],
   *   shadow: {},
   *   class: 'main-class',
   *   id: 'unique-id',
   *   classes: ['additional-class', 'theme-dark']
   * };
   * const componentConfig = HTML[parseNamed](params);
   *
   * // Note that componentConfig will now have normalized even the
   * // helpers like class, id, and classes. Attributes should now
   * // look like this:
   * console.log(componentConfig.attributes);
   * // {
   * //   'data-type': 'primary',
   * //   id: 'main-class',
   * //   class: 'main-class additional-class theme-dark'
   * // }
   */
  static [commands.parseNamed](
    tagName: string,
    config: Record<any, any>,
  ): Record<string | symbol, any>;

  /**
   * Parses the provided tag name and shadow DOM options to
   * determine if a shadow DOM can be attached to the specified
   * element. It validates the element against a set of criteria
   * including tag name and the presence of a hyphen, which is
   * required for custom elements that support shadow DOM.
   *
   * @param {string} tagName - The name of the tag to which the
   * shadow DOM might be attached.
   * @param {Object} shadowDOMOptions - Configuration options for
   * the shadow DOM, including whether to force attachment with
   * `tryAnyhow`.
   * @returns {Object|undefined} The normalized shadow DOM options
   * if the element is valid, otherwise `undefined`.
   *
   * @example
   * // To parse shadow DOM options for a custom element:
   * const shadowOptions = HTML[commands.parseShadow](
   *  'my-custom-element', { tryAnyhow: false }
   * );
   */
  static [commands.parseShadow](
    tagName: string,
    shadowDOMOptions?:
      | {
          options?: Record<string, any>;
          children?: Node[];
        }
      | Node[],
  ): Record<string | symbol, any>;

  /**
   * Defines additional functions on an element, particularly for
   * managing CSS variables through a dynamic interface. This
   * method enhances an element with methods to get and set CSS
   * variables efficiently, using either a shadow DOM or the global
   * document.
   *
   * @param {Object} config - The configuration object for
   * additional functions.
   * @param {Element} config.element - The DOM element to which the
   * functions will be attached.
   * @param {CSSStyleSheet} [config.reusableStyleSheet] - A reusable
   * style sheet for efficient style management. Optional.
   * @param {HTMLStyleElement} [config.reusableStyleElement] - A
   * style element that can be reused for dynamic style changes.
   * Optional.
   * @param {Object} [config.descriptorBase] - Base configuration
   * for property descriptors applied to the element.
   *
   * @example
   * // Define additional CSS variable functions on a custom element
   * MyCustomElement.additionalFunctions({
   *   element: document.querySelector('#myElement'),
   *   descriptorBase: { enumerable: true, configurable: true }
   * });
   */
  static [commands.additionalFunctions](args: any[]): void;

  /**
   * Creates or accesses a storage map for managing primary and sub
   * keys. This method ensures that a unique storage is available
   * globally for specified keys, allowing for structured data
   * storage across different components or modules.
   *
   * @param {string} forPrimaryKey - The primary key under which to
   * store or retrieve data.
   * @param {string} forSubKey - The sub key under which to store or
   * retrieve data within the primary key's map.
   * @param {boolean} [create=true] - Determines whether to create
   * a new storage map if one does not exist for the provided keys.
   * @returns {Map} Returns the storage map associated with the sub
   * key, or the primary key if no sub key is provided, or the
   * entire storage if neither key is provided.
   *
   * @example
   * // Create or access storage for a primary key 'userSettings'
   * // and sub key 'theme'
   * const themeStorage = HTML[commands.createStorage](
   *   'userSettings', 'theme'
   * );
   * // Use the storage to set a new theme
   * themeStorage.set('color', 'dark');
   */
  static [commands.createStorage](
    forPrimaryKey: string,
    forSubKey?: string,
    create?: boolean,
  ): Map<any, any>;

  /**
   * Registers a factory function under a given name with optional
   * configuration, binding context, and additional arguments. This
   * method stores the factory function and its associated data in a
   * centralized storage, allowing for retrieval and utilization
   * elsewhere in the application.
   *
   * For read only or otherwise immutable components, the factories
   * can be fairly simply. Simply stamping down a new component as
   * one might expect.
   *
   * For composite components that support dynamism in their creation
   * a more complex factory is often required, but also engenders
   * greater reusability.
   *
   * @param {string} name - The unique name to register the factory
   * function under.
   * @param {Function} factoryFunction - The factory function to
   * register.
   * @param {Object} [config={}] - Optional configuration object for
   * the factory function.
   * @param {any} thisArg - The value of `this` to be used when
   * invoking the factory function.
   * @param {...any} args - Additional arguments to pass to the
   * factory function upon invocation.
   *
   * @example
   * HTML[commands.register](
   *   'SmRedButton',
   *   buttonFactory,
   *   {color: 'red'},
   *   this,
   *   'small'
   * );
   *
   * const button = HTML.SmRedButton();
   *
   * // This registers a `buttonFactory` under the name 'SmRedButton'
   * // with a configuration specifying the color as 'red', binds
   * // `this` for context, and passes 'small' as an argument.
   */
  static [commands.register](
    name: string,
    factoryFunction: (...args: any[]) => any,
    config?: Record<any, any>,
    thisArg?: any,
    args?: any[],
  ): void;

  /**
   * Generator function that iterates over all registered component
   * factories. This method provides access to the internal storage
   * of registered factories, yielding each registered element's name
   * and its associated metadata.
   *
   * @yields {Array} An array containing the element name and its
   * metadata.
   *
   * @example
   * for (const [name, data] of HTML[commands.registered]()) {
   *   console.log(`Factory for ${name}:`, data);
   * }
   */
  static [commands.registered](): Generator<[string, Map<string, any>], void, unknown>;
}

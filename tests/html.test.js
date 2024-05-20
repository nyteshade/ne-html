// @vitest-environment jsdom

const {HTML, commands} = await import('../dist/cjs/html.js');
const {describe, it, expect} = await import('vitest');

describe('HTML class', () => {
  describe('create method', () => {
    it('should create a simple HTML element', () => {
      const element = HTML.create('div');
      expect(element.tagName).toBe('DIV');
    });

    it('should handle attributes correctly', () => {
      const element = HTML.create('div', {
        attributes: { id: 'test-id', 'data-type': 'test' }
      });
      expect(element.id).toBe('test-id');
      expect(element.getAttribute('data-type')).toBe('test');
    });

    it('should apply styles correctly', () => {
      const element = HTML.create('div', {
        style: { color: 'red', fontSize: '16px' }
      });
      expect(element.style.color).toBe('red');
      expect(element.style.fontSize).toBe('16px');
    });

    it('should handle children correctly', () => {
      const child1 = HTML.create('span');
      const child2 = HTML.create('span');
      const element = HTML.create('div', {
        children: [child1, child2]
      });
      expect(element.children.length).toBe(2);
      expect(element.children[0]).toBe(child1);
      expect(element.children[1]).toBe(child2);
    });

    it('should handle shadow DOM with elements', () => {
      const shadowChild = HTML.create('span');
      const element = HTML.create('div', {
        shadow: { children: [shadowChild] }
      });
      const shadowRoot = element.shadowRoot;
      expect(shadowRoot).not.toBeNull();
      expect(shadowRoot.children.length).toBe(1);
      expect(shadowRoot.children[0]).toBe(shadowChild);
    });

    it('should handle web components with custom elements', () => {
      const element = HTML.create('button', {
        webComponentName: 'custom-button'
      });
    });
  });

  // CSSStyleSheet.prototype.replaceSync doesn't work in jest or
  // vitest we cannot test this until jsdom works in the future
  // for this type of testing...
  //
  // describe('cssVar method', () => {
  //   it('should set and get CSS variables correctly', () => {
  //
  //     const element = HTML.create('div');
  //     document.body.append(element);
  //     element.cssVar.set('main-color', 'blue');
  //     expect(element.cssVar.get('main-color')).toBe('blue');
  //   });
  // });

  describe('parse method', () => {
    it('should throw an error if no arguments are provided', () => {
      expect(() => HTML[commands.parse]()).toThrow(SyntaxError);
    });

    it('should handle named parameters correctly', () => {
      const config = HTML[commands.parse]('div', {
        id: 'test-div',
        class: 'test-class'
      });
      expect(config.tagName).toBe('div');
      expect(config.attributes.get('id')).toBe('test-div');
      expect(config.attributes.get('class')).toBe('test-class');
    });
  });

  describe('should allow arbitrary elements using proxy', () => {
    it('should allow creating a div with content', () => {
      const message = 'Hello world';
      const div = HTML.div(message);

      expect(div).toBeInstanceOf(HTMLElement);
      expect(div).toBeInstanceOf(HTMLDivElement);
      expect(div.innerHTML).toBe(message);
    })

    it('should allow non-conflicting props as attributes', () => {
      const message = 'Hello world';
      const p = HTML.p({
        id: 'yep',
        alt: 'alt',
        content: message
      });

      expect(p).toBeInstanceOf(HTMLElement);
      expect(p).toBeInstanceOf(HTMLParagraphElement);
      expect(p.innerHTML).toBe(message);
      expect(p.getAttribute('id')).toBe('yep');
      expect(p.getAttribute('alt')).toBe('alt');
    });
  });

  describe('should allow registering composite elements', ()=>{
    it('should allow creating a helloDiv', ()=>{
      const div = HTML.div([HTML.span('hello')]);
      const span = div.querySelector('span');

      expect(div).toBeInstanceOf(HTMLDivElement);
      expect(span).toBeInstanceOf(HTMLSpanElement);
      expect(span.innerHTML).toBe('hello');

      HTML[commands.register]('HelloDiv', ()=>div.cloneNode(true), {});

      const helloDiv = HTML.HelloDiv();
      const helloSpan = helloDiv.querySelector('span');

      expect(helloDiv).toBeInstanceOf(HTMLDivElement);
      expect(helloSpan).toBeInstanceOf(HTMLSpanElement);
      expect(helloSpan.innerHTML).toBe('hello');
    });

    it('should allow a parameterized composite element', ()=>{
      const div = HTML.div([HTML.span()]);
      const span = div.querySelector('span');

      expect(div).toBeInstanceOf(HTMLDivElement);
      expect(span).toBeInstanceOf(HTMLSpanElement);
      expect(span.innerHTML).toBe('');

      HTML[commands.register](
        'MessageDiv',
        (config = {}, ...args) => {
          const nuDiv = div.cloneNode(true);
          const nuSpan = nuDiv.querySelector('span');

          for (const [key, value] of Object.entries(config)) {
            nuDiv.setAttribute(key, value);
          }

          nuSpan.innerHTML = args?.[0] ?? 'n/a';

          return nuDiv;
        },
        { attribute: "Example" },
      );

      const msgDiv1 = HTML.MessageDiv();
      const msgDivAttr = msgDiv1.getAttribute('attribute');
      const msgSpan1 = msgDiv1.querySelector('span');

      expect(msgDiv1).toBeInstanceOf(HTMLDivElement);
      expect(msgDivAttr).toBe('Example');
      expect(msgSpan1).toBeInstanceOf(HTMLSpanElement);
      expect(msgSpan1.innerHTML).toBe('n/a');

      const msgDiv2 = HTML.MessageDiv('hello again');
      const msgSpan2 = msgDiv2.querySelector('span');

      expect(msgDiv2).toBeInstanceOf(HTMLDivElement);
      expect(msgSpan2).toBeInstanceOf(HTMLSpanElement);
      expect(msgSpan2.innerHTML).toBe('hello again');
    });
  })
});
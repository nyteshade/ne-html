// @vitest-environment jsdom

const {HTML, commands} = await import('../dist/esm/html.js');
const {Levels} = await import('../dist/esm/factories/levels.js');
const {beforeAll, describe, it, expect} = await import('vitest');

describe('should create previously registered components', () => {
  it('should create a NELowSignalLevel', () => {
    const lowSignal = HTML.NELowSignalLevel();
    const shadow = lowSignal?.shadowRoot;

    expect(lowSignal).toBeInstanceOf(HTMLElement);
    expect(shadow).toBeInstanceOf(ShadowRoot);

    const elems = {
      container: lowSignal.shadowRoot.querySelector('figure.levels'),
      low: shadow.querySelector('figure.level:nth-child(1)'),
      medium: shadow.querySelector('figure.level:nth-child(2)'),
      high: shadow.querySelector('figure.level:nth-child(3)'),
      label: shadow.querySelector('article span.label'),
    };

    expect(elems.container).toBeInstanceOf(HTMLElement);
    expect(elems.container.classList).toContain('low');
    expect(elems.container.classList).toContain('signal-aspect');
    expect(elems.low).toBeInstanceOf(HTMLElement);
    expect(elems.medium).toBeInstanceOf(HTMLElement);
    expect(elems.high).toBeInstanceOf(HTMLElement);
  })

  it('should create a NELowSignalLevel with label', () => {
    const label = 'Label'
    const lowSignal = HTML.NELowSignalLevel(label);
    const shadow = lowSignal?.shadowRoot;

    expect(lowSignal).toBeInstanceOf(HTMLElement);
    expect(shadow).toBeInstanceOf(ShadowRoot);

    const elems = {
      container: lowSignal.shadowRoot.querySelector('figure.levels'),
      low: shadow.querySelector('figure.level:nth-child(1)'),
      medium: shadow.querySelector('figure.level:nth-child(2)'),
      high: shadow.querySelector('figure.level:nth-child(3)'),
      label: shadow.querySelector('article span.label'),
    };

    expect(elems.container).toBeInstanceOf(HTMLElement);
    expect(elems.container.classList).toContain('low');
    expect(elems.container.classList).toContain('signal-aspect');
    expect(elems.low).toBeInstanceOf(HTMLElement);
    expect(elems.medium).toBeInstanceOf(HTMLElement);
    expect(elems.high).toBeInstanceOf(HTMLElement);
    expect(elems.label).toBeInstanceOf(HTMLSpanElement);
    expect(elems.label.innerHTML).toBe(label);
  })

  it('should create a NEMediumSignalLevel', () => {
    const lowSignal = HTML.NEMediumSignalLevel();
    const shadow = lowSignal?.shadowRoot;

    expect(lowSignal).toBeInstanceOf(HTMLElement);
    expect(shadow).toBeInstanceOf(ShadowRoot);

    const elems = {
      container: lowSignal.shadowRoot.querySelector('figure.levels'),
      low: shadow.querySelector('figure.level:nth-child(1)'),
      medium: shadow.querySelector('figure.level:nth-child(2)'),
      high: shadow.querySelector('figure.level:nth-child(3)'),
      label: shadow.querySelector('article span.label'),
    };

    expect(elems.container).toBeInstanceOf(HTMLElement);
    expect(elems.container.classList).toContain('medium');
    expect(elems.container.classList).toContain('signal-aspect');
    expect(elems.low).toBeInstanceOf(HTMLElement);
    expect(elems.medium).toBeInstanceOf(HTMLElement);
    expect(elems.high).toBeInstanceOf(HTMLElement);
  })

  it('should create a NEMediumSignalLevel with label', () => {
    const label = 'Label'
    const lowSignal = HTML.NEMediumSignalLevel(label);
    const shadow = lowSignal?.shadowRoot;

    expect(lowSignal).toBeInstanceOf(HTMLElement);
    expect(shadow).toBeInstanceOf(ShadowRoot);

    const elems = {
      container: lowSignal.shadowRoot.querySelector('figure.levels'),
      low: shadow.querySelector('figure.level:nth-child(1)'),
      medium: shadow.querySelector('figure.level:nth-child(2)'),
      high: shadow.querySelector('figure.level:nth-child(3)'),
      label: shadow.querySelector('article span.label'),
    };

    expect(elems.container).toBeInstanceOf(HTMLElement);
    expect(elems.container.classList).toContain('medium');
    expect(elems.container.classList).toContain('signal-aspect');
    expect(elems.low).toBeInstanceOf(HTMLElement);
    expect(elems.medium).toBeInstanceOf(HTMLElement);
    expect(elems.high).toBeInstanceOf(HTMLElement);
    expect(elems.label).toBeInstanceOf(HTMLSpanElement);
    expect(elems.label.innerHTML).toBe(label);
  })

  it('should create a NEHighSignalLevel', () => {
    const lowSignal = HTML.NEHighSignalLevel();
    const shadow = lowSignal?.shadowRoot;

    expect(lowSignal).toBeInstanceOf(HTMLElement);
    expect(shadow).toBeInstanceOf(ShadowRoot);

    const elems = {
      container: lowSignal.shadowRoot.querySelector('figure.levels'),
      low: shadow.querySelector('figure.level:nth-child(1)'),
      medium: shadow.querySelector('figure.level:nth-child(2)'),
      high: shadow.querySelector('figure.level:nth-child(3)'),
      label: shadow.querySelector('article span.label'),
    };

    expect(elems.container).toBeInstanceOf(HTMLElement);
    expect(elems.container.classList).toContain('high');
    expect(elems.container.classList).toContain('signal-aspect');
    expect(elems.low).toBeInstanceOf(HTMLElement);
    expect(elems.medium).toBeInstanceOf(HTMLElement);
    expect(elems.high).toBeInstanceOf(HTMLElement);
  })

  it('should create a NEHighSignalLevel with label', () => {
    const label = 'Label'
    const lowSignal = HTML.NEHighSignalLevel(label);
    const shadow = lowSignal?.shadowRoot;

    expect(lowSignal).toBeInstanceOf(HTMLElement);
    expect(shadow).toBeInstanceOf(ShadowRoot);

    const elems = {
      container: lowSignal.shadowRoot.querySelector('figure.levels'),
      low: shadow.querySelector('figure.level:nth-child(1)'),
      medium: shadow.querySelector('figure.level:nth-child(2)'),
      high: shadow.querySelector('figure.level:nth-child(3)'),
      label: shadow.querySelector('article span.label'),
    };

    expect(elems.container).toBeInstanceOf(HTMLElement);
    expect(elems.container.classList).toContain('high');
    expect(elems.container.classList).toContain('signal-aspect');
    expect(elems.low).toBeInstanceOf(HTMLElement);
    expect(elems.medium).toBeInstanceOf(HTMLElement);
    expect(elems.high).toBeInstanceOf(HTMLElement);
    expect(elems.label).toBeInstanceOf(HTMLSpanElement);
    expect(elems.label.innerHTML).toBe(label);
  })

  it('should create a NELevel', () => {
    const lowSignal = HTML.NELevel();
    const shadow = lowSignal?.shadowRoot;

    expect(lowSignal).toBeInstanceOf(HTMLElement);
    expect(shadow).toBeInstanceOf(ShadowRoot);

    const elems = {
      container: lowSignal.shadowRoot.querySelector('figure.levels'),
      only: shadow.querySelector('figure.level:only-child'),
      low: shadow.querySelector('figure.level:nth-child(1)'),
      medium: shadow.querySelector('figure.level:nth-child(2)'),
      high: shadow.querySelector('figure.level:nth-child(3)'),
      label: shadow.querySelector('article span.label'),
    };

    expect(elems.container).toBeInstanceOf(HTMLElement);
    expect(elems.only).toBeInstanceOf(HTMLElement);
    expect(elems.low).toBeInstanceOf(HTMLElement);
    expect(elems.only).toEqual(elems.low);
    expect(elems.medium).toBeFalsy();
    expect(elems.high).toBeFalsy();
    expect(elems.label).toBeFalsy();
    expect(elems.label?.innerHTML).toBeFalsy();
  })
})

export function Levels(options, argPreset = 'low', argLabel = undefined, argStyles = { noBackground: false, solid: false, signal: false }) {
    const opportunities = ['low', 'medium', 'high'];
    const { preset = argPreset ?? 'high', solid = false, label = argLabel, signal = false, noBackground = false, } = options;
    for (const [key, value] of Object.entries((argStyles || {}))) {
        if (Reflect.has(options, key)) {
            options[key] = !!value;
        }
    }
    const levelSheet = new CSSStyleSheet();
    const elemSize = { w: 12, h: 32 };
    const boxSize = { w: signal ? elemSize.w * 3 : elemSize.w };
    const element = HTML.section({
        class: 'levels',
        shadow: [
            HTML.style(`
        :host {
          --low-color: #8691B6;
          --medium-color: #5D6C9E;
          --high-color: #202B50;
          --gradient-height: ${elemSize.h}px;
          --per-level-height: calc(var(--gradient-height) / 3);
          --level-height: 0%;
          --standard-box-shadows:
            inset 1px 0px 0px rgba(255 255 255 / 20%),
            inset 0px 1px 0px 0px rgba(255 255 255 / 40%),
            inset ${elemSize.w - 1}px 1px 0px 0px rgba(255 255 255 / 40%);
          --standalone-box-shadows:
            inset 1px 0px 0px rgba(255 255 255 / 20%),
            inset 0px 1px 0px 0px rgba(255 255 255 / 40%),
            inset 11px 1px 0px 0px rgba(255 255 255 / 40%),
            0px 1px 0px 0px rgb(32 43 80 / 63%);

          font-family:
            Tenorite, -apple-system, "system-ui", "Segoe UI",
            Roboto, Oxygen-Sans, Ubuntu, Cantarell;
          font-size: 0;
          margin: 0 4px;

          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
        }

        article {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;

          figure.levels {
            background-color: darkgray;
            border: 1px solid white;
            box-shadow:
              1px 1px 3px rgb(0 0 0 / 25%),
              inset 1px 1px 2px rgb(0 0 0 / 45%);
            display: inline-flex;
            font-size: 16px;
            height: 32px;
            margin: 0;
            padding: 0;
            position: relative;
            width: ${elemSize.w}px;

            &.no-background {
              background-color: unset;
              border: unset;
              box-shadow: unset;

              figure.level {
                box-shadow: var(--standalone-box-shadows);
              }
            }

            &.signal-aspect {
              width: ${elemSize.w * 3}px;

              &.no-background {
                figure.level {
                  opacity: 33%;
                  display: unset;
                }
              }

              &.low {
                figure.level:nth-child(2),
                figure.level:nth-child(3) {
                  display: none;
                }

                &.no-background {
                  figure.level:nth-child(2),
                  figure.level:nth-child(3) {
                    opacity: 33%;
                    display: unset;
                  }
                }
              }

              &.medium {
                figure.level:nth-child(3) {
                  display: none;
                }

                &.no-background {
                  figure.level:nth-child(3) {
                    opacity: 33%;
                    display: unset;
                  }
                }
              }

              figure.level:nth-child(1) {
                height: 33%;
                left: 0;
              }

              figure.level:nth-child(2) {
                height: 66%;
                left: ${elemSize.w}px;
              }

              figure.level:nth-child(3) {
                height: 100%;
                left: ${elemSize.w * 2}px;
              }
            }

            &.low {
              figure.level:nth-child(1) {
                height: 33%;
                left: 0;
              }
            }

            &.medium {
              figure.level:nth-child(1) {
                height: 66%;
                left: 0
              }
            }

            &.high {
              figure.level:nth-child(1) {
                height: 100%;
                left: 0
              }
            }


            &.low.solid figure.level {
              background-image: unset !important;
              background-color: var(--low-color);
            }

            &.medium.solid figure.level {
              background-image: unset !important;
              background-color: var(--high-color);
            }

            &.high.solid figure.level {
              background-image: unset !important;
              background-color: var(--high-color);
            }

            figure.level {
              margin: 0;
              padding: 0;
              position: absolute;
              bottom: 0;
              left: 0;
              height: var(--level-height);
              width: ${elemSize.w}px;
              background-image: linear-gradient(
                to top,
                var(--low-color) var(--per-level-height),
                var(--medium-color) calc(var(--per-level-height) * 2),
                var(--high-color) calc(var(--per-level-height) * 3)
              );
              box-shadow: var(--standard-box-shadows);
              transition: height 0.3s ease, background-image 0.3s ease;
            }
          }

          span.label {
            margin-left: 0.5em;
            font-size: 16px;
          }
        }
      `),
            HTML.article([
                HTML.figure({
                    class: `levels ${preset}`,
                    children: [
                        HTML.figure({ class: `level` }),
                    ].concat(signal ? [
                        HTML.figure({ class: `level` }),
                        HTML.figure({ class: `level` }),
                    ] : [])
                }),
            ]),
        ],
    });
    const [article, levels] = ['article', '.levels']
        .map(s => element.shadowRoot.querySelector(s));
    if (article && label && typeof label === 'string') {
        article.append(HTML.span({
            content: label,
            class: 'label'
        }));
    }
    if (levels) {
        const classes = [
            !!solid && 'solid',
            !!signal && 'signal-aspect',
            !!noBackground && 'no-background',
        ].filter(className => className);
        levels.classList.add(...classes);
    }
    Object.defineProperty(element, 'setLevel', {
        value(percent) {
            if (!signal) {
                this.cssVar.set('level-height', `${percent}%`);
            }
            else {
                levels[0].style.display = percent === 0 ? 'none' : '';
                levels[1].style.display = percent <= 66 ? 'none' : '';
                levels[2].style.display = percent < 100 ? 'none' : '';
            }
        },
        enumerable: false,
        configurable: true,
        writable: true
    });
    return element;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Levels = void 0;
const html_js_1 = require("../html.js");
/**
 * Constructs a visual representation of levels based on the provided
 * options and styles. This function creates a section element
 * styled with CSS to represent different levels (e.g., low, medium,
 * high) which can be dynamically adjusted.
 *
 * @param {Object} options - Configuration options for the levels.
 * @param {string} [options.preset] - Initial preset of the level,
 * can be overridden.
 * @param {boolean} [options.solid] - If true, uses a solid color
 * instead of gradients.
 * @param {string} [options.label] - Label text to display next to
 * the levels.
 * @param {boolean} [options.signal] - If true, displays multiple
 * level indicators.
 * @param {boolean} [options.noBackground] - If true, no background
 * is displayed.
 * @param {number} [options.percent] - Percentage to fill the level
 * indicator.
 * @param {string} [argLabel=undefined] - Optional label, overrides
 * options.label if provided.
 * @param {Object} [argStyles] - Additional style options that can
 * override initial settings.
 * @param {string} [argStyles.preset] - Overrides the preset level
 * setting.
 * @param {boolean} [argStyles.solid] - Overrides the solid color
 * setting.
 * @param {string} [argStyles.label] - Overrides the label text.
 * @param {boolean} [argStyles.signal] - Overrides the signal
 * setting.
 * @param {boolean} [argStyles.noBackground] - Overrides the
 * background visibility.
 *
 * @returns {HTMLElement} The constructed element with levels
 * visualization.
 *
 * @example
 *  const levelConfig = {
 *    preset: 'medium',
 *    solid: true,
 *    label: 'Progress',
 *    signal: false,
 *    noBackground: false,
 *    percent: 75
 *  };
 *  const customStyles = { preset: 'high', label: 'Completion' };
 *  const levelElement = Levels(levelConfig, undefined, customStyles);
 *  document.body.appendChild(levelElement);
 */
function Levels(options, argLabel = undefined, argStyles) {
    const opportunities = ['low', 'medium', 'high'];
    let { preset, solid, label, signal, noBackground, percent } = options;
    preset = argStyles?.preset ?? preset;
    solid = argStyles?.solid ?? solid;
    label = argLabel ?? argStyles?.label ?? label;
    signal = argStyles?.signal ?? signal;
    noBackground = argStyles?.noBackground ?? noBackground;
    if (typeof percent !== 'undefined') {
        preset = undefined;
        percent = Math.min(100, Math.max(0, parseInt(percent)));
    }
    const levelSheet = new CSSStyleSheet();
    const elemSize = { w: 12, h: 32 };
    const boxSize = { w: signal ? elemSize.w * 3 : elemSize.w };
    const element = html_js_1.HTML.section({
        class: 'levels',
        shadow: [
            html_js_1.HTML.style(generateCSS(elemSize)),
            html_js_1.HTML.article([
                html_js_1.HTML.figure({
                    class: `levels`,
                    children: [
                        html_js_1.HTML.figure({ class: `level` }),
                    ].concat(signal ? [
                        html_js_1.HTML.figure({ class: `level` }),
                        html_js_1.HTML.figure({ class: `level` }),
                    ] : [])
                }),
            ]),
        ],
    });
    const [article, levels] = ['article', '.levels']
        .map(s => element.shadowRoot.querySelector(s));
    if (article && label && typeof label === 'string') {
        article.append(html_js_1.HTML.span({
            content: label,
            class: 'label'
        }));
    }
    if (levels) {
        const classes = [
            ['low', 'medium', 'high'].includes(preset) && preset,
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
    if (percent) {
        element.setLevel(percent);
    }
    return element;
}
exports.Levels = Levels;
;
function generateCSS(elemSize) {
    return `
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

          figure.level {
            opacity: 33%;
          }

          figure.level:nth-child(1) {
            left: 0;
            height: 33%;
          }

          figure.level:nth-child(2) {
            height: 66%;
            left: ${elemSize.w}px;
          }

          figure.level:nth-child(3) {
            height: 100%;
            left: ${elemSize.w * 2}px;
          }

          &.no-background {
            filter: drop-shadow(1px 1px 1px rgb(0 0 0 /50%));

            figure.level {
              opacity: 33%;
              display: unset !important;
            }

            &.low {
              figure.level:nth-child(1) {
                height: 33%;
                opacity: 100%;
              }
            }

            &.medium {
              figure.level:nth-child(1),
              figure.level:nth-child(2) {
                opacity: 100%;
              }
            }

            &.high {
              figure.level:nth-child(1),
              figure.level:nth-child(2),
              figure.level:nth-child(3) {
                opacity: 100%;
              }
            }
          }

          &.solid {
            figure.level:nth-child(1) {
              background-image: unset;
              background-color: var(--low-color);
            }
            figure.level:nth-child(2) {
              background-image: unset;
              background-color: var(--medium-color);
            }
            figure.level:nth-child(3) {
              background-image: unset;
              background-color: var(--high-color);
            }
          }

          &.low {
            figure.level:nth-child(1) {opacity: 100%;}
          }

          &.medium {
            figure.level:nth-child(1),
            figure.level:nth-child(2) {opacity: 100%;}
          }

          &.high {
            figure.level:nth-child(1),
            figure.level:nth-child(2),
            figure.level:nth-child(3) {opacity: 100%;}
          }
        }

        &.low {
          figure.level {
            height: 33%;
            left: 0;
          }

          &.solid {
            figure.level:only-child,
            figure.level:nth-child(1) {
              background-image: unset !important;
              background-color: var(--low-color);
            }
          }
        }

        &.medium {
          figure.level {
            height: 66%;
            left: 0
          }

          &.solid {
            figure.level:only-child,
            figure.level:nth-child(2) {
              background-image: unset !important;
              background-color: var(--medium-color);
            }
          }
        }

        &.high {
          figure.level {
            height: 100%;
            left: 0
          }

          &.solid {
            figure.level:only-child,
            figure.level:nth-child(3) {
              background-image: unset !important;
              background-color: var(--high-color);
            }
          }
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
  `;
}
const registerLevels = function (HTML, commands) {
    /**
     * Creates a composite element that is shipped with the HTML class.
     * The low signal level is a sort of progress indiciator that shows
     * three vertical bars in ascending order from left to right. The
     * low signal variant, shows the first bar in color with the second
     * two in a translucent appearance to indicate they are not filled.
     *
     * It invokes the Levels factory method with the following default
     * configuration:
     *
     * ```js
     * { preset: 'low', signal: true, noBackground: true }
     * ```
     *
     * @param {string} label if the label parameter is provided, a
     * text label will appear adjacent to the right of the levels
     * icon that is generated.
     * @param {object} styles an optional object that supports setting
     * the following values:
     *   {string} preset - a string with one of 'low', 'medium', 'high'
     *     as values.
     *   {boolean} solid - if true, will prevent the component from
     *     indicating each vertical bar as a gradient and use a single
     *     color for each to differentiate their appearance.
     *   {string} label - same as the first parameter, applied here it
     *     will overwrite the value of the first parameter. You can
     *     supply an object with a getter for `label` using this
     *     approach if the value needs to be dynamic.
     *   {boolean} signal - if true, as is the default here, you will
     *     see three adjacent vertical bars instead of a single bar
     *     with a more dynamic value.
     *   {boolean} noBackground - if true, as is the default, there
     *     will be no rendered and shadowed border around the bars.
     *   {number} percent - a number value clamped from 0 to 100 that
     *     indicates how full the vertical bar in this component should
     *     be. [Note: does nothing if signal is true]
     */
    HTML[commands.register]('NELowSignalLevel', function (config, label, styles, ...args) {
        return Levels(config, ...[label, styles, ...args]);
    }, { preset: 'low', signal: true, noBackground: true });
    /**
     * Creates a composite element that is shipped with the HTML class.
     * The medium signal level is a sort of progress indiciator that
     * shows three vertical bars in ascending order from left to right.
     * The medium signal variant, shows the first and second bar in
     * color with the third in a translucent appearance to indicate it
     * is not filled.
     *
     * It invokes the Levels factory method with the following default
     * configuration:
     *
     * ```js
     * { preset: 'medium', signal: true, noBackground: true }
     * ```
     *
     * @param {string} label if the label parameter is provided, a
     * text label will appear adjacent to the right of the levels
     * icon that is generated.
     * @param {object} styles an optional object that supports setting
     * the following values:
     *   {string} preset - a string with one of 'low', 'medium', 'high'
     *     as values.
     *   {boolean} solid - if true, will prevent the component from
     *     indicating each vertical bar as a gradient and use a single
     *     color for each to differentiate their appearance.
     *   {string} label - same as the first parameter, applied here it
     *     will overwrite the value of the first parameter. You can
     *     supply an object with a getter for `label` using this
     *     approach if the value needs to be dynamic.
     *   {boolean} signal - if true, as is the default here, you will
     *     see three adjacent vertical bars instead of a single bar
     *     with a more dynamic value.
     *   {boolean} noBackground - if true, as is the default, there
     *     will be no rendered and shadowed border around the bars.
     *   {number} percent - a number value clamped from 0 to 100 that
     *     indicates how full the vertical bar in this component should
     *     be. [Note: does nothing if signal is true]
     */
    HTML[commands.register]('NEMediumSignalLevel', function (config, label, styles, ...args) {
        return Levels(config, ...[label, styles, ...args]);
    }, { preset: 'medium', signal: true, noBackground: true });
    /**
     * Creates a composite element that is shipped with the HTML class.
     * The high signal level is a sort of progress indiciator that
     * shows three vertical bars in ascending order from left to right.
     * All three vertical bars will appear opaque and in color
     * indicating the "signal" is at its strongest.
     *
     * It invokes the Levels factory method with the following default
     * configuration:
     *
     * ```js
     * { preset: 'high', signal: true, noBackground: true }
     * ```
     *
     * @param {string} label if the label parameter is provided, a
     * text label will appear adjacent to the right of the levels
     * icon that is generated.
     * @param {object} styles an optional object that supports setting
     * the following values:
     *   {string} preset - a string with one of 'low', 'medium', 'high'
     *     as values.
     *   {boolean} solid - if true, will prevent the component from
     *     indicating each vertical bar as a gradient and use a single
     *     color for each to differentiate their appearance.
     *   {string} label - same as the first parameter, applied here it
     *     will overwrite the value of the first parameter. You can
     *     supply an object with a getter for `label` using this
     *     approach if the value needs to be dynamic.
     *   {boolean} signal - if true, as is the default here, you will
     *     see three adjacent vertical bars instead of a single bar
     *     with a more dynamic value.
     *   {boolean} noBackground - if true, as is the default, there
     *     will be no rendered and shadowed border around the bars.
     *   {number} percent - a number value clamped from 0 to 100 that
     *     indicates how full the vertical bar in this component should
     *     be. [Note: does nothing if signal is true]
     */
    HTML[commands.register]('NEHighSignalLevel', function (config, label, styles, ...args) {
        return Levels(config, ...[label, styles, ...args]);
    }, { preset: 'high', signal: true, noBackground: true });
    /**
     * Creates a composite element that ships with the HTML class. This
     * variant of the Levels factory method shows a vertical bar, by
     * defalut with a rendered and shadowed border. The bar's height
     * can be adjusted by supplying a percent value as the first
     * parameter. The second parameter will optionally provide a label,
     * while the third allows full overrides of the styles.
     *
     * It invokes the Levels factory method with the following default
     * configuration:
     *
     * ```js
     * { percent: 0 }
     * ```
     *
     * @param {number} percent a value from 0 to 100, indicating the
     * percent complete the vertical bar is.
     * @param {string} label if the label parameter is provided, a
     * text label will appear adjacent to the right of the levels
     * icon that is generated.
     * @param {object} styles an optional object that supports setting
     * the following values:
     *   {string} preset - a string with one of 'low', 'medium', 'high'
     *     as values. low equates to 33% percent, medium 66% and high
     *     will be the same as 100%
     *   {boolean} solid - if true, will prevent the component from
     *     indicating each vertical bar as a gradient and use a single
     *     color for each to differentiate their appearance.
     *   {string} label - same as the first parameter, applied here it
     *     will overwrite the value of the first parameter. You can
     *     supply an object with a getter for `label` using this
     *     approach if the value needs to be dynamic.
     *   {boolean} signal - if true, you will see three adjacent
     *     vertical bars instead of a single bar with a more dynamic
     *     value. if true, percent will mean nothing and you must use
     *     the preset property to choose one of three values for display
     *   {boolean} noBackground - if true, as is the default, there
     *     will be no rendered and shadowed border around the bars.
     *   {number} percent - a number value clamped from 0 to 100 that
     *     indicates how full the vertical bar in this component should
     *     be. [Note: does nothing if signal is true]
     */
    HTML[commands.register]('NELevel', function NELevelFactory(config, percent, label, styles) {
        return Levels(config, label, { percent, ...(styles || {}) });
    }, { percent: 0 });
}.bind(undefined, html_js_1.HTML, html_js_1.commands)();

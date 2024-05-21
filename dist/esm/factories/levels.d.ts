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
export function Levels(options: {
    preset?: string | undefined;
    solid?: boolean | undefined;
    label?: string | undefined;
    signal?: boolean | undefined;
    noBackground?: boolean | undefined;
    percent?: number | undefined;
}, argLabel?: string | undefined, argStyles?: {
    preset?: string | undefined;
    solid?: boolean | undefined;
    label?: string | undefined;
    signal?: boolean | undefined;
    noBackground?: boolean | undefined;
} | undefined): HTMLElement;

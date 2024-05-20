export {HTML, commands} from './html.js';
export {Levels} from './factories/levels.js';

import { HTML, commands } from './html.js';
import { Levels } from './factories/levels.js';

HTML[commands.register]('NELowSignalLevel',
  Levels,
  { preset: 'low', signal: true, noBackground: true }
);

HTML[commands.register]('NEMediumSignalLevel',
  Levels,
  { preset: 'medium', signal: true, noBackground: true }
);

HTML[commands.register]('NEHighSignalLevel',
  Levels,
  { preset: 'high', signal: true, noBackground: true }
);

HTML[commands.register]('NELevel',
  Levels,
  { percent: 0 }
);

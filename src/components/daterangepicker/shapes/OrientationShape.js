import { PropTypes } from 'react';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
} from '../constants/constants';

export default PropTypes.oneOf([HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION]);

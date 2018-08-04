import { combineReducers } from 'redux';

import authorization from './authorization';
import projects from './projects';

const reducers = combineReducers({
  authorization,
  projects
});

export default reducers;

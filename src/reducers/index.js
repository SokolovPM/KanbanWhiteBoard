import { combineReducers } from 'redux';

import authorization from './authorization';
import projects from './projects';
import tasks from './tasks'

const reducers = combineReducers({
  authorization,
  projects,
  tasks
});

export default reducers;

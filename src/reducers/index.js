import { combineReducers } from 'redux';

import authorization from './authorization';
import projects from './projects';
import tasks from './tasks';
import team from './team';

const reducers = combineReducers({
  authorization,
  projects,
  tasks,
  team
});

export default reducers;

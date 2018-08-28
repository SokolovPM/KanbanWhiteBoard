import tokeys from 'tokeys';

import authConstants from './authorization';
import teamConstants from './team';
import taskConstants from './task';
import projectConstants from './project';

export default tokeys([
  ...authConstants,
  ...projectConstants,
  ...taskConstants,
  ...teamConstants
]);

import ApplicationSessionStore from '../stores/application';

export function initialize(application, container) {
  container.register('session-store:application', ApplicationSessionStore);
}

export default {
  name: 'setup-custom-session-store.js',
  initialize: initialize
};

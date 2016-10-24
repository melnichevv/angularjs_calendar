import angular from 'angular';
import 'angular-moment';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'http://bash.im';
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['angularMoment'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
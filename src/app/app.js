import angular from 'angular';
import moment from 'moment';

import 'normalize.css';
import '../style/app.css';

let app = () => {
    return {
        template: require('./app.html'),
        controller: 'AppCtrl',
        controllerAs: 'app'
    }
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
    .directive('app', app)
    .constant('EVENT_ROUTE', 'https://demo2128819.mockable.io/events/1')
    .controller('AppCtrl', require('./app.ctrl'))
    .filter('moment', () => (date, format, parseFormat) => moment(date, parseFormat).format(format));

export default MODULE_NAME;
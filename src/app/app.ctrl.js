import moment from 'moment';

class AppCtrl {
    constructor($http, EVENT_ROUTE) {
        this.startDate = moment().startOf('week');
        this.changeMode(5);

        this.loading = true;

        $http.get(EVENT_ROUTE)
            .then(response => {
                return response.data.map(item => {
                    return {
                        name: item.name,
                        start: moment(item.startDate),
                        end: moment(item.endDate)
                    };
                })
            })
            .then(events => this.events = events)
            .finally(() => this.loading = false);
    }

    addToStartDate(days, mode) {
        // Add days based on mode
        this.startDate.add(days, 'd');
        return this.recalculateDays();
    }

    changeMode(mode) {
        this.mode = mode;
        return this.recalculateDays();
    }

    recalculateDays() {
        this.days = [];
        for (let i in Array.from(Array(this.mode).keys())) {
            this.days.push(this.startDate.clone().add(i, 'd'));
        }
        return this.days;
    }

    getHours() {
        return Array.from(Array(24).keys());
    }

    getEventsForDay(day) {
        let returnEvents = [];
        for (let event of this.events) {
            if (event.start.isSame(day, 'd')) {
                returnEvents.push(event);
            }
        }
        return returnEvents;
    }

    checkIfTimeIsBetween(event) {
        let startTime = event.start,
            endTime = event.end;

        let between = [];
        for (let letEvent of this.events) {
            let letStart = letEvent.start;
            let endStart = letEvent.end;
            if (startTime.isBetween(letStart, endStart, null, '[]') ||
                endTime.isBetween(letStart, endStart, null, '[]') ||
                letStart.isBetween(startTime, endTime, null, '[]') ||
                endStart.isBetween(startTime, endTime, null, '[]')) {
                between.push(letEvent);
            }
        }
        return between;
    }

    getStartedBefore(event, events) {
        let before = [];
        for (let letEvent of events) {
            if (event.start.isBetween(letEvent.start, letEvent.end, null, '()')) {
                before.push(letEvent);
            }
        }
        return before;
    }

    getStyleForEvent(event) {
        let eventIntersections = this.checkIfTimeIsBetween(event);
        let before = this.getStartedBefore(event, eventIntersections);

        let startTime = event.start;
        let endTime = event.end;

        return {
            top: 60 * startTime.get('hour') + startTime.get('minute') + 'px',
            height: endTime.diff(startTime, 'minutes') + 'px',
            width: (100 / eventIntersections.length) + '%',
            left: (before.length / eventIntersections.length) * 100 + '%'
        }
    }
}

module.exports = AppCtrl;
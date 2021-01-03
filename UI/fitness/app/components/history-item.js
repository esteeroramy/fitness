import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
    classNames: ['history-item'],

    intl: service(),

    /**
     * If the history item detail modal is visible
     *
     * @type {Boolean}
     */
    isHistoryItemDetailModalVisible: false,

    /**
     * The selected log
     *
     * @type {Object}
     */
    selectedLog: null,

    /**
     * The history object to display
     *
     * @type {Object}
     */
    history: null,

    /**
     * The formatted date of the log
     *
     * @type {String}
     */
    loggedDate: computed('history.loggedDate', function() {
        let date = new Date(Date.parse(this.get('history.loggedDate')));
        return date.toDateString();
    }).readOnly(),

    /**
     * The formatted duration of the workout
     *
     * @type {String}
     */
    duration: computed('history.durationInSeconds', function() {
        const intl = this.get('intl');
        const duration = this.get('history.durationInSeconds');

        const h = Math.floor(duration / 3600);
        const m = Math.floor(duration % 3600 / 60);
        const s = Math.floor(duration % 3600 % 60);

        if (h > 0 || m > 0) {
            const mDisplay = h > 0 ? `${h} ${intl.t('duration.h')} ` : '';
            const sDisplay = m > 0 ? `${m} ${intl.t('duration.min')}` : '';
            return mDisplay + sDisplay;
        }

        return `${s} ${intl.t('duration.sec')}`;
    }).readOnly(),

    actions: {
        openItemHistoryDetailModal() {
            this.setProperties({
                isHistoryItemDetailModalVisible: true,
                selectedLog: this.get('history'),
            });
        },

        closeItemHistoryDetailModal() {
            this.setProperties({
                isHistoryItemDetailModalVisible: false,
                selectedLog: null,
            });
        },
    }
});

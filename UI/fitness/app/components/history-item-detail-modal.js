import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    historyRepository: service(),

    /**
     * If the modal is visible
     *
     * @type {Boolean}
     */
    isModalVisible: false,

    /**
     * Selected log
     *
     * @type {Object}
     */
    log: null,

    actions: {
        closeModal() {
            this.onClose();
        },

        deleteLog() {
            this.get('historyRepository.deleteLog').perform(this.get('log.id'));
            this.send('closeModal');
        }
    }
});

import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default Service.extend({
    intl: service(),
    session: service(),

    /**
     * Handles any common exceptions and logs out the user if they do not have a valid session
     * 
     * @param {Object} exception 
     */
    handleException(exception) {
        if (isPresent(exception) && isPresent(exception.errors) && exception.errors.length > 0 && isPresent(exception.errors[0].status)) {
            const status = exception['errors'][0].status;
            
            if (status === '403') {
                this.get('session').invalidate();
            }
        }
    },

    /**
     * Returns the error message for an exception
     * 
     * @param {Object} exception 
     * @returns {String} The exception message
     */
    getErrorMessage(exception) {
        if (isPresent(exception) && isPresent(exception.responseJSON) && isPresent(exception.responseJSON.code)) {
            return this.get('intl').t(`errorCodes.${exception.responseJSON.code}`);
        } else if (isPresent(exception) && isPresent(exception.errors) && (exception.errors.length > 0) && isPresent(exception.errors[0].code)) {
            return this.get('intl').t(`errorCodes.${exception.errors[0].code}`);
        }

        return this.get('intl').t('errorCodes.unknown');
    }
});

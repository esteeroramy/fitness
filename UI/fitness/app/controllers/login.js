import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default Controller.extend({
    exceptionHandler: service(),
    intl: service(),
    session: service(),

    /**
     * The username to login with
     * 
     * @type {String}
     */
    username: '',

    /**
     * The password to login with
     * 
     * @type {String}
     */
    password: '',

    /**
     * If we are waiting on the API to log in the user
     * 
     * @type {Boolean}
     */
    isLoading: false,

    /**
     * The error message coming from the API
     * 
     * @type {String}
     */
    loginErrorMessage: null,
    
    /**
     * If the username is present after submitting
     * 
     * @type {Boolean}
     */
    isUsernamePresenceValid: true,

    /**
     * If the password is present after submitting
     * 
     * @type {Boolean}
     */
    isPasswordPresenceValid: true,

    /**
     * Validates the fields and returns true if the fields are valid.
     * 
     * @returns {Boolean} If the fields are all valid
     */
    areFieldsValid() {
        this.resetValidation();

        const username = this.get('username');
        const password = this.get('password');

        const isUsernamePresenceValid = isPresent(username);
        const isPasswordPresenceValid = isPresent(password);

        this.setProperties({
            isUsernamePresenceValid,
            isPasswordPresenceValid,
            loginErrorMessage: ''
        });

        return isUsernamePresenceValid && isPasswordPresenceValid;
    },

    /**
     * Resets the validation fields
     */
    resetValidation() {
        this.setProperties({
            isUsernamePresenceValid: true,
            isPasswordPresenceValid: true
        });
    },

    actions: {
        login() {
            const username = this.get('username');
            const password = this.get('password');

            if (this.areFieldsValid()) {
                this.set('isLoading', true);

                this.get('session').authenticate('authenticator:oauth2', username, password).then(() => {
                    this.set('isLoading', false);
                }, (exception) => {
                    this.setProperties({
                        isLoading: false,
                        loginErrorMessage: this.get('exceptionHandler').getErrorMessage(exception)
                    });
                });           
            }
        }
    }
});

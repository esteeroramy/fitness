import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { run } from '@ember/runloop';
import { task } from 'ember-concurrency';

export default Controller.extend({
    exceptionHandler: service(),
    store: service(),

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
     * The password confirmed
     * 
     * @type {String}
     */
    confirmedPassword: '',

    /**
     * The user's email
     * 
     * @type {String}
     */
    email: '',

    /**
     * tThe user's first name
     * 
     * @type {String}
     */
    fname: '',

    /**
     * The user's last name
     * 
     * @type {String}
     */
    lname: '',

    /**
     * The user's body weight
     * 
     * @type {Number}
     */
    weight: '',

    /**
     * If the username is present
     * 
     * @type {Boolean}
     */
    isUsernamePresenceValid: true,

    /**
     * If the password is present
     * 
     * @type {Boolean}
     */
    isPasswordPresenceValid: true,

    /**
     * If the confirmed password is present
     * 
     * @type {Boolean}
     */
    isConfirmedPasswordPresenceValid: true,

    /**
     * If the confirmed password matches the password
     * 
     * @type {Boolean}
     */
    isConfirmedPasswordValueValid: true,

    /**
     * If the first name is present
     * 
     * @type {Boolean}
     */
    isFNamePresenceValid: true,

    /**
     * If the last name is present
     * 
     * @type {Boolean}
     */
    isLNamePresenceValid: true,

    /**
     * If the email is present
     * 
     * @type {Boolean}
     */
    isEmailPresenceValid: true,

    /**
     * If the weight is present
     * 
     * @type {Boolean}
     */
    isWeightPresenceValid: true,

    /**
     * If the weight is a valid nunber
     * 
     * @type {Boolean}
     */
    isWeightValueValid: true,

    /**
     * If the email is valid
     * 
     * @type {Boolean}
     */
    isEmailValueValid: true,

    /**
     * The error message coming back from the API
     * 
     * @type {String}
     */
    registerErrorMessage: '',

    /**
     * Validates the fields and returns true if the fields are valid.
     * 
     * @returns {Boolean} If the fields are all valid
     */
    areFieldsValid() {
        this.resetValidation();

        const username = this.get('username');
        const password = this.get('password');
        const confirmedPassword = this.get('confirmedPassword');
        const email = this.get('email');
        const fname = this.get('fname');
        const lname = this.get('lname');
        const weight = this.get('weight');

        const isUsernamePresenceValid = isPresent(username);
        const isPasswordPresenceValid = isPresent(password);
        const isConfirmedPasswordPresenceValid = isPresent(confirmedPassword);
        const isFNamePresenceValid = isPresent(fname);
        const isLNamePresenceValid = isPresent(lname);
        const isEmailPresenceValid = isPresent(email);
        const isWeightPresenceValid = isPresent(weight);
        const isConfirmedPasswordValueValid = password === confirmedPassword;
        const isWeightValueValid = !isNaN(weight) && weight > 0;
        const isEmailValueValid = /\S+@\S+\.\S+/.test(email);

        this.setProperties({
            isUsernamePresenceValid,
            isPasswordPresenceValid,
            isConfirmedPasswordPresenceValid,
            isFNamePresenceValid,
            isLNamePresenceValid,
            isEmailPresenceValid,
            isWeightPresenceValid,
            isConfirmedPasswordValueValid,
            isWeightValueValid,
            isEmailValueValid
        });

        return isUsernamePresenceValid &&
            isPasswordPresenceValid &&
            isConfirmedPasswordPresenceValid &&
            isFNamePresenceValid &&
            isLNamePresenceValid &&
            isEmailPresenceValid &&
            isWeightPresenceValid &&
            isConfirmedPasswordValueValid &&
            isWeightValueValid &&
            isEmailValueValid;
    },

    /**
     * Rests the values in the fields
     */
    resetFields() {
        this.setProperties({
            username: '',
            password: '',
            confirmedPassword: '',
            email: '',
            fname: '',
            lname: '',
            weight: ''
        });
    },

    /**
     * Resets the validation fields
     */
    resetValidation() {
        this.setProperties({
            isUsernamePresenceValid: true,
            isPasswordPresenceValid: true,
            isConfirmedPasswordPresenceValid: true,
            isConfirmedPasswordValueValid: true,
            isFNamePresenceValid: true,
            isLNamePresenceValid: true,
            isEmailPresenceValid: true,
            isWeightPresenceValid: true,
            isWeightValueValid: true,
            isEmailValueValid: true,
            registerErrorMessage: '',
        });
    },

    setupFormFields() {
        run.scheduleOnce('afterRender', this, function() {
            $('select').formSelect();
        });
    },

    /**
     * Register the user
     */
    registerUserTask: task(function*() {
        if (this.areFieldsValid()) {
            const username = this.get('username');
            const password = this.get('password');
            const confirmedPassword = this.get('confirmedPassword');
            const email = this.get('email');
            const fname = this.get('fname');
            const lname = this.get('lname');
            const weight = this.get('weight');
            const unit = $('select').formSelect('getSelectedValues')[0];

            const userObject = {
                username,
                password,
                confirmedPassword,
                email,
                fname,
                lname,
                weight,
                unit
            };

            try {
                const user = this.get('store').createRecord('user', userObject);

                yield user.save();
            } catch (exception) {
                this.set('registerErrorMessage', this.get('exceptionHandler').getErrorMessage(exception));
            }
        }
    }).restartable()
});

import Component from '@ember/component';

export default Component.extend({
    classNames: ['progress-bar-component'],

    /**
     * The progress left
     *
     * @type {Float}
     */
    progress: 0,

    /**
     * The remaining time
     *
     * @type {String}
     */
    time: ''
});

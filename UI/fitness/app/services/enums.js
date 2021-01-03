import Service from '@ember/service';

export default Service.extend({
    exerciseEquipment: {
        barbell: 'barbell',
        bodyWeight: 'bodyWeight',
        cable: 'cable',
        dumbbell: 'dumbbell',
        freeWeight: 'freeWeight',
        kettlebell: 'kettlebell',
        machine: 'machine',
        medicineBall: 'medicineBall',
        resistanceBand: 'resistanceBand'
    },
    pages: {
        exercises: 'exercises',
        history: 'history',
        home: 'home',
        measurements: 'measurements',
        profile: 'profile'
    },
    workoutTypes: {
        cardio: 'cardio',
        weights: 'weights'
    },

    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
});

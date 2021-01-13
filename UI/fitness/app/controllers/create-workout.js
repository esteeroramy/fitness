import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { task } from 'ember-concurrency';

export default Controller.extend({
    enums: service(),
    exerciseRepository: service(),
    workoutRepository: service(),

    /**
     * The id of the edited workout
     *
     * @type {Boolean}
     */
    id: null,

    /**
     * If this is in editing state
     *
     * @type {Boolean}
     */
    isEditing: false,

    /**
     * The name of the workout
     *
     * @type {String}
     */
    workoutName: '',

    /**
     * The list of exercises in the workout
     *
     * @type {Array}
     */
    exercises: null,

    /**
     * If the add exercise modal is visible
     *
     * @type {Boolean}
     */
    isAddExerciseModalVisible: false,

    /**
     * The list of exercises that the user can add from
     *
     * @type {Array}
     */
    availableExercises: computed('exerciseRepository.exercises.[]', function() {
        return (this.get('exerciseRepository.exercises') || []).map(exercise => {
            return {
                id: get(exercise, 'id'),
                creatorId: get(exercise, 'creatorId'),
                name: get(exercise, 'name'),
                weight: get(exercise, 'weight'),
                equipmentKey: get(exercise, 'equipmentKey')
            };
        });
    }).readOnly(),

    /**
     * Converts user ime to seconds
     *
     * @param {String} time
     */
    toSecs(time) {
        if (!isPresent(time)) {
            time = ''
        }

        var split = time.split(':');

        if (split.length === 1) {
            return +split[0];
        } else if (split.length == 2) {
            return (+split[0]) * 60 + (+split[1]);
        }

        return 0
    },

    saveWorkout: task(function* () {
        const workout = {
            name: this.get('workoutName'),
            type: this.get('enums.workoutTypes.weights'),
            configuration: {
                exercises: (this.get('exercises') || []).map(exercise => {
                    return {
                        id: exercise.id,
                        sets: get(exercise, 'sets').map(set => {
                            return {
                                minReps: parseInt(get(set, 'minReps')),
                                maxReps: parseInt(get(set, 'maxReps')),
                                minRestSecs: this.toSecs(get(set, 'minRest')),
                                maxRestSecs: this.toSecs(get(set, 'maxRest'))
                            };
                        })
                    };
                })
            }
        };

        try {
            if (this.get('isEditing')) {
                set(workout, 'id', this.get('id'));

                yield this.get('workoutRepository.editWorkout').perform(workout);
            } else {
                yield this.get('workoutRepository.createWorkout').perform(workout);
            }
            this.reset();
            this.transitionToRoute('home');
        } catch {

        }
    }),

    deleteWorkout: task(function* () {
        // try {
            yield this.get('workoutRepository.deleteWorkout').perform(this.get('id'));

            this.send('exit');
        // } catch {

        // }
    }),

    reset() {
        this.setProperties({
            exercises: null,
            isAddExerciseModalVisible: false,
            workoutName: '',
            id: null,
            isEditing: false
        });
    },

    actions: {
        openAddExerciseModal() {
            this.set('isAddExerciseModalVisible', true);
        },

        closeAddExerciseModal() {
            this.set('isAddExerciseModalVisible', false);
        },

        addExercises(exercises) {
            const previous = this.get('exercises') || [];
            const current = (exercises || []).map(exercise => {
                return {
                    id: get(exercise, 'id'),
                    creatorId: get(exercise, 'creatorId'),
                    name: get(exercise, 'name'),
                    weight: get(exercise, 'weight'),
                    equipmentKey: get(exercise, 'equipmentKey'),
                    sets: [{
                        minReps: null,
                        maxReps: null,
                        minRest: null,
                        maxRest: null
                    }]
                };
            });

            this.set('exercises', previous.concat(current));
        },

        deleteExercise(exercise) {
            const exercises = this.get('exercises');
            const index = exercises.findIndex(item => item.id === exercise.id);
            this.set('exercises', exercises.slice(0, index).concat(exercises.slice(index + 1, exercises.length)));
        },

        saveWorkout() {
            this.get('saveWorkout').perform();
        },

        deleteWorkout() {
            this.get('deleteWorkout').perform();
        },

        exit() {
            this.reset();
            this.transitionToRoute('home');
        },

        moveUp(index) {
            const exercises = this.get('exercises');
            const toMove = exercises[index];

            exercises.replace(index, 1, [exercises[index - 1]]);
            exercises.replace(index - 1, 1, [toMove]);
        },

        moveDown(index) {
            const exercises = this.get('exercises');
            const toMove = exercises[index];

            exercises.replace(index, 1, [exercises[index + 1]]);
            exercises.replace(index + 1, 1, [toMove]);
        }
    }
});

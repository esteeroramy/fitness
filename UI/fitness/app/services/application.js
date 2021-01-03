import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Service.extend({
    exerciseRepository: service(),
    historyRepository: service(),
    meRepository: service(),
    workoutRepository: service(),

    startUpTask: task(function* () {
        yield this.get('meRepository.getMeCall').perform();
        yield this.get('exerciseRepository.getExercises').perform();
        yield this.get('workoutRepository.getWorkouts').perform();
        yield this.get('historyRepository.getHistories').perform();
    })
});

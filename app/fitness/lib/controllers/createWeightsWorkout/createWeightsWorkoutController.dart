import 'package:flutter/material.dart';

import 'package:fitness/global/enums/enums.dart';
import 'package:fitness/global/exceptionHandler/exceptionHandler.dart';
import 'package:fitness/models/exercise..dart';
import 'package:fitness/routes.dart';
import 'package:fitness/services/meRepository.dart';
import 'package:fitness/services/workoutRepository.dart';

class CreateWeightsWorkoutController {
  List<Map<String, dynamic>> _exercises = [];
  List<Map<String, dynamic>> get exercises => _exercises;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  bool _hasError = false;
  bool get hasError => _hasError;

  String _errorMessage = '';
  String get errorMessage => _errorMessage;

  void addExercise(Exercise exercise) {
    List<dynamic> sets = [];
    Map<String, dynamic> configuration = {
      'repsRangeEnabled': false,
      'restRangeEnabled': false,
    };

    sets.add({
      'reps': 0,
      'repsRange': 0,
      'restInSeconds': 0,
      'restRangeInSeconds': 0,
    });

    _exercises.add({
      'exercise': exercise,
      'sets': sets,
      'configuration': configuration,
    });
  }

  void removeExercise(Exercise exercise) {
    _exercises.removeWhere((item) => item['exercise'] == exercise);
  }

  void addSet(Exercise exercise) {
    var sets =
        _exercises.firstWhere((item) => item['exercise'] == exercise)['sets'];

    sets.add({
      'reps': sets.length != 0 ? sets.last['reps'] : 0,
      'repsRange': sets.length != 0 ? sets.last['repsRange'] : 0,
      'restInSeconds': sets.length != 0 ? sets.last['restInSeconds'] : 0,
      'restRangeInSeconds': sets.length != 0 ? sets.last['restRangeInSeconds'] : 0,
    });
  }

  void removeSet(Exercise exercise, int index) {
    _exercises
        .firstWhere((item) => item['exercise'] == exercise)['sets']
        .removeAt(index);
  }

  void setReps(Exercise exercise, int index, int reps, int repsRange) {
    var object = _exercises
        .firstWhere((item) => item['exercise'] == exercise)['sets'][index];

    object['reps'] = reps;
    object['repsRange'] = repsRange == null ? reps : repsRange;
  }

  void setRest(Exercise exercise, int index, int restInSeconds, int restRangeInSeconds) {
    var object = _exercises
        .firstWhere((item) => item['exercise'] == exercise)['sets'][index];

    object['restInSeconds'] = restInSeconds;
    object['restRangeInSeconds'] = restRangeInSeconds == null ? restInSeconds : restRangeInSeconds;
  }

  void saveConfiguration(
      Exercise exercise, Map<String, dynamic> configuration) {
    var object = _exercises.firstWhere((item) => item['exercise'] == exercise);

    object['configuration'] = configuration;
  }

  void createWorkout(BuildContext context, Map<String, dynamic> data) async {
    _isLoading = true;

    String accessToken = MeRepository.accessToken;

    List<Map<String, dynamic>> parsedExercises = [];

    _exercises.forEach((item) {
      Exercise exercise = item['exercise'];
      Map<String, dynamic> parsedItem = {};

      parsedItem['exercise'] = exercise.id;
      parsedItem['sets'] = item['sets'];
      parsedItem['configuration'] = item['configuration'];

      parsedExercises.add(parsedItem);
    });

    data['type'] = ENUMS['workoutTypes']['weights'];
    data['configuration'] = parsedExercises;

    try {
      final response =
          await WorkoutRepository.create().createWorkout(accessToken, data);

      _isLoading = false;

      if (response.statusCode == 200) {
        _hasError = false;
        _errorMessage = '';

        Routes.sailor
            .popUntil((route) => route.settings.name == '/workouthome');
      }
    } catch (exception) {
      _hasError = true;
      _errorMessage = handleException(context, exception);
      _isLoading = false;
    }
  }
}

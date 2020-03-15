import 'package:flutter/material.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/global/enums/enums.dart';
import 'package:fitness/global/exceptionHandler/exceptionHandler.dart';
import 'package:fitness/models/exercise..dart';
import 'package:fitness/routes.dart';
import 'package:fitness/services/exerciseRepository.dart';
import 'package:fitness/services/meRepository.dart';

class CreateExerciseController {
  static List<String> _exerciseWeights = [
    'barbell',
    'bodyWeight',
    'cable',
    'dumbbell',
    'freeWeight',
    'kettlebell',
    'machine',
    'medicineBall',
    'resistanceBand',
  ];
  static List<String> get exerciseWeights => _exerciseWeights;

  String _selectedExerciseWeight = _exerciseWeights[0];
  String get selectedExerciseType => _selectedExerciseWeight;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  bool _hasError = false;
  bool get hasError => _hasError;

  String _errorMessage = '';
  String get errorMessage => _errorMessage;

  setSelectedExerciseWeight(value) {
    _selectedExerciseWeight = value;
  }

  createExercise(BuildContext context, ReactiveModel createWeightsWorkoutReactiveModel, Map<String, String> data) async {
    _isLoading = true;

    String accessToken = MeRepository.accessToken;

    data['weight'] = ENUMS['exerciseWeights'][_selectedExerciseWeight];

    try {
      final response =
          await ExerciseRepository.create().createExercise(accessToken, data);

      if (response.statusCode == 200) {
        _isLoading = false;
        _hasError = false;
        _errorMessage = '';

        Exercise exercise = Exercise.fromMap(response.body);
        createWeightsWorkoutReactiveModel.setState((controller) => controller.addExercise(exercise));
        Routes.sailor.popUntil((route) => route.settings.name == '/createweightsworkout');
      }
    } catch (exception) {
      _hasError = true;
      _errorMessage = handleException(context, exception);
      _isLoading = false;
    }
  }
}

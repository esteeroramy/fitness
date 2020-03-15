import 'package:flutter/material.dart';

import 'package:fitness/global/enums/enums.dart';
import 'package:fitness/global/exceptionHandler/exceptionHandler.dart';
import 'package:fitness/routes.dart';
import 'package:fitness/services/meRepository.dart';
import 'package:fitness/services/workoutRepository.dart';

class CreateCardioWorkoutController {
  Map<String, List<int>> _valuesMap = {
    'countdown': [3],
    'warmup': [1, 0],
    'exercise': [0, 30],
    'rest': [1, 0],
    'sets': [5],
    'cycles': [1],
    'recoveryInterval': [1, 0],
    'cooldown': [1, 0],
  };
  Map<String, List<int>> get valuesMap => _valuesMap;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  bool _hasError = false;
  bool get hasError => _hasError;

  String _errorMessage = '';
  String get errorMessage => _errorMessage;

  void setValue(String key, List<int> value) {
    _valuesMap[key] = value;
  }

  List<int> getValue(String key) {
    return _valuesMap[key];
  }

  void createWorkout(BuildContext context, Map<String, dynamic> data) async {
    _isLoading = true;

    String accessToken = MeRepository.accessToken;

    data['type'] = ENUMS['workoutTypes']['cardio'];
    data['configuration'] = _valuesMap;

    try {
      final response =
          await WorkoutRepository.create().createWorkout(accessToken, data);

      _isLoading = false;

      if (response.statusCode == 200) {
        _hasError = false;
        _errorMessage = '';

        Routes.sailor.popUntil((route) => route.settings.name == '/workouthome');
      }
    } catch (exception) {
      _hasError = true;
      _errorMessage = handleException(context, exception);
      _isLoading = false;
    }
  }
}

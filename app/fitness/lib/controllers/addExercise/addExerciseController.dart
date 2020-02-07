import 'package:flutter/material.dart';

import 'package:fitness/global/exceptionHandler/exceptionHandler.dart';
import 'package:fitness/models/exercise..dart';
import 'package:fitness/services/exerciseRepository.dart';
import 'package:fitness/services/meRepository.dart';

class AddExerciseController {
  bool _isPredefinedFirstLoad = true;
  bool get isPredefinedFirstLoad => _isPredefinedFirstLoad;

  bool _isPredefinedLoading = false;
  bool get isPredefinedLoading => _isPredefinedLoading;

  bool _predefinedHasError = false;
  bool get predefinedHasError => _predefinedHasError;

  String _predefinedErrorMessage = '';
  String get predefinedErrorMessage => _predefinedErrorMessage;

  List<Exercise> _predefinedExerciseList = [];
  List<Exercise> get predefinedExerciseList => _predefinedExerciseList;

  bool _isCustomFirstLoad = true;
  bool get isCustomFirstLoad => _isCustomFirstLoad;

  bool _isCustomLoading = false;
  bool get isCustomLoading => _isCustomLoading;

  bool _customHasError = false;
  bool get customHasError => _customHasError;

  String _customErrorMessage = '';
  String get customErrorMessage => _customErrorMessage;

  List<Exercise> _customExerciseList = [];
  List<Exercise> get customExerciseList => _customExerciseList;

  void queryPredefinedExercises(BuildContext context) async {
    String accessToken = MeRepository.accessToken;

    _isPredefinedLoading = true;
    _isPredefinedFirstLoad = false;

    try {
      final response =
          await ExerciseRepository.create().queryPredefinedExercises(accessToken);

      if (response.statusCode == 200) {
        _isPredefinedLoading = false;
        _predefinedHasError = false;
        _predefinedErrorMessage = '';

        List<Exercise> tempExerciseList = [];

        for (var i = 0; i < response.body.length; i++) {
          tempExerciseList.add(Exercise.fromMap(response.body[i]));
        }

        _predefinedExerciseList = tempExerciseList;
      }
    } catch (exception) {
      _predefinedHasError = true;
      _predefinedErrorMessage = handleException(context, exception);
      _isPredefinedLoading = false;
    }
  }

  void queryCustomExercises(BuildContext context) async {
    String accessToken = MeRepository.accessToken;

    _isCustomLoading = true;
    _isCustomFirstLoad = false;

    try {
      final response =
          await ExerciseRepository.create().queryCustomExercises(accessToken);

      if (response.statusCode == 200) {
        _isCustomLoading = false;
        _customHasError = false;
        _customErrorMessage = '';

        List<Exercise> tempExerciseList = [];

        for (var i = 0; i < response.body.length; i++) {
          tempExerciseList.add(Exercise.fromMap(response.body[i]));
        }

        _customExerciseList = tempExerciseList;
      }
    } catch (exception) {
      _customHasError = true;
      _customErrorMessage = handleException(context, exception);
      _isCustomLoading = false;
    }
  }
}

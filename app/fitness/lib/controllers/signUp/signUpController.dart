import 'package:flutter/material.dart';
import 'package:sailor/sailor.dart';

import 'package:fitness/global/exceptionHandler/exceptionHandler.dart';
import 'package:fitness/routes.dart';
import 'package:fitness/services/signUpRepository.dart';

class SignUpController {
  bool _isLoading = false;
  bool get isLoading => _isLoading;

  bool _hasError = false;
  bool get hasError => _hasError;

  String _errorMessage = '';
  String get errorMessage => _errorMessage;

  Future signUp(BuildContext context, Map<String, String> data) async {
    _isLoading = true;

    try {
      final response = await SignUpRepository.create().signUp(data);

      _isLoading = false;

      if (response.statusCode == 200) {
        _hasError = false;
        _errorMessage = '';

        Routes.sailor.navigate(
          '/login',
          navigationType: NavigationType.pushReplace,
        );
      }
    } catch (exception) {
      _hasError = true;
      _errorMessage = handleException(context, exception);
      _isLoading = false;
    }
  }
}

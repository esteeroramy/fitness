import 'package:flutter/material.dart';
import 'package:sailor/sailor.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:fitness/controllers/currentUser/currentUserController.dart';
import 'package:fitness/global/exceptionHandler/exceptionHandler.dart';
import 'package:fitness/routes.dart';
import 'package:fitness/services/loginRepository.dart';

class LoginController {
  bool _isLoading = false;
  bool get isLoading => _isLoading;

  bool _hasError = false;
  bool get hasError => _hasError;

  String _errorMessage = '';
  String get errorMessage => _errorMessage;

  Future login(BuildContext context, Map<String, String> data) async {
    _isLoading = true;

    try {
      final response = await LoginRepository.create().login(data);
      final accessToken = response.body['access_token'];

      _isLoading = false;

      if (response.statusCode == 200 && accessToken != null) {
        _hasError = false;
        _errorMessage = '';

        CurrentUserController().token = accessToken;

        // Save the current token to the shared preferences so that we can use
        // it the next time the user opens the application.
        SharedPreferences preferences = await SharedPreferences.getInstance();
        preferences.setString('access_token', accessToken);

        Routes.sailor.navigate(
          '/home',
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

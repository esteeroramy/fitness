import 'package:flutter/material.dart';

import 'package:fitness/global/exceptionHandler/exceptionHandler.dart';
import 'package:fitness/routes.dart';
import 'package:fitness/services/meRepository.dart';
import 'package:fitness/services/userRepository.dart';

class ChangePasswordController {
  bool _isLoading = false;
  bool get isLoading => _isLoading;

  bool _hasError = false;
  bool get hasError => _hasError;

  String _errorMessage = '';
  String get errorMessage => _errorMessage;

  savePasswordChange(BuildContext context, Map<String, String> data) async {
    String accessToken = MeRepository.accessToken;

    _isLoading = true;

    try {
      final response = await UserRepository.create().updatePassword(accessToken, data);

      if (response.statusCode == 200) {
        _isLoading = false;
        _hasError = false;
        _errorMessage = '';

        Routes.sailor.pop();
      }
    } catch (exception) {
      _hasError = true;
      _errorMessage = handleException(context, exception);
      _isLoading = false;
    }
  }
}
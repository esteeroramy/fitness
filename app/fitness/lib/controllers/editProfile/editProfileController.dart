import 'package:flutter/material.dart';

import 'package:fitness/global/exceptionHandler/exceptionHandler.dart';
import 'package:fitness/models/me.dart';
import 'package:fitness/routes.dart';
import 'package:fitness/services/meRepository.dart';
import 'package:fitness/services/userRepository.dart';

class EditProfileController {
  bool _isLoading = false;
  bool get isLoading => _isLoading;

  bool _hasError = false;
  bool get hasError => _hasError;

  String _errorMessage = '';
  String get errorMessage => _errorMessage;

  saveProfile(BuildContext context, Map<String, String> data) async {
    String accessToken = MeRepository.accessToken;

    _isLoading = true;

    try {
      final response = await UserRepository.create().update(accessToken, data);

      if (response.statusCode == 200) {
        final meResponse = await MeRepository.create().me(accessToken);
        final Me meObject = Me.fromMap(meResponse.body);

        MeRepository.setMeData(meObject);

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
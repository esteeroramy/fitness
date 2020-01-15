import 'dart:convert';

import 'package:chopper/chopper.dart';
import 'package:flutter/material.dart';

import 'package:fitness/global/localizations/app_localizations.dart';

// Returns the error string associated with an API exception
String handleException(BuildContext context, Response<dynamic> exception) {
  final exceptionJson = json.decode(exception.body);
  final errorCode = exceptionJson['code'].toString();

  if (errorCode != null) {
    return AppLocalizations.of(context).translate('errorCodes.$errorCode');
  } else {
    return AppLocalizations.of(context).translate('errorCodes.unknown');
  }
}

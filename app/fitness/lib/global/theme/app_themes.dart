import 'package:flutter/material.dart';

const Map<String, String> AppThemes = {
  'default': 'default',
};

final appThemeData = {
  AppThemes['default']: ThemeData(
    brightness: Brightness.light,
    primaryColor: Colors.white,
    primaryColorLight: Colors.white60,
    buttonColor: Colors.cyan
  ),
};

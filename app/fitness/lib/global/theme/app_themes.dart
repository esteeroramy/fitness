import 'package:flutter/material.dart';

const Map<String, String> AppThemes = {
  'default': 'default',
};

final appThemeData = {
  AppThemes['default']: ThemeData(
    brightness: Brightness.light,
    scaffoldBackgroundColor: Colors.white,
    appBarTheme: AppBarTheme(
      color: Colors.white,
      textTheme: TextTheme(
        title: TextStyle(color: Colors.black),
      ),
    ),
  ),
};

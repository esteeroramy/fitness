import 'package:fitness/global/theme/app_themes.dart';
import 'package:flutter/material.dart';

class ThemeController {
  ThemeData _theme = appThemeData[AppThemes['default']];
  ThemeData get theme => _theme;
}
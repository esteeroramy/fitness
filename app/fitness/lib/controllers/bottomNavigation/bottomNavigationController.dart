import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:sailor/sailor.dart';

import 'package:fitness/routes.dart';

class BottomNavigationController {
  final _navigation = [
    {
      'index': 0,
      'labelTranslation': 'screens.home',
      'route': '/home',
      'icon': Icons.home
    },
    {
      'index': 1,
      'labelTranslation': 'screens.workouts',
      'route': '/workouthome',
      'icon': MdiIcons.dumbbell
    },
    {
      'index': 2,
      'labelTranslation': 'screens.nutrition',
      'route': '/nutritionhome',
      'icon': MdiIcons.food
    },
    {
      'index': 3,
      'labelTranslation': 'screens.progress',
      'route': '/progresshome',
      'icon': MdiIcons.finance
    },
    {
      'index': 4,
      'labelTranslation': 'screens.settings',
      'route': '/settingshome',
      'icon': MdiIcons.settings
    },
  ];
  List get navigation => _navigation;

  int _selectedTab = 0;
  int get selectedTab => _selectedTab;

  void setSelectedTab(int tab) {
    final transitionTab =
        _navigation.firstWhere((item) => item['index'] == tab);

    _selectedTab = tab;

    Routes.sailor.navigate(
      transitionTab['route'],
      navigationType: NavigationType.pushReplace,
      transitionDuration: Duration(milliseconds: 0),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/controllers/bottomNavigation/bottomNavigationController.dart';
import 'package:fitness/global/localizations/app_localizations.dart';

class BottomNavigation extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StateBuilder<BottomNavigationController>(
      models: [Injector.getAsReactive<BottomNavigationController>()],
      builder: (context, reactiveModel) {
        return BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          currentIndex: reactiveModel.state.selectedTab,
          onTap: (int index) => _navigationItemSelected(reactiveModel, index),
          items: _buildButtons(context),
        );
      },
    );
  }

  List _buildButtons(BuildContext context) {
    final List navigation = BottomNavigationController().navigation;
    List<BottomNavigationBarItem> navigationItems = [];

    navigation.forEach((item) {
       navigationItems.add(BottomNavigationBarItem(
        icon: Icon(item['icon']),
        title: Text(
          AppLocalizations.of(context).translate(item['labelTranslation']),
          style: TextStyle(fontSize: 16.0),
        ),
      ));
    });

    return navigationItems;
  }

  void _navigationItemSelected(ReactiveModel reactiveModel, int index) {
    reactiveModel.setState((controller) => controller.setSelectedTab(index));
  }
}

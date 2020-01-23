import 'package:sailor/sailor.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:fitness/routes.dart';

class SettingsHomeController {
  void logout() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.setString('access_token', null);

    Routes.sailor.navigate(
      '/login',
      navigationType: NavigationType.pushAndRemoveUntil,
      removeUntilPredicate: (_) => false,
      transitionDuration: Duration(milliseconds: 0),
    );
  }
}

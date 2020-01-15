import 'package:sailor/sailor.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:fitness/routes.dart';

class SplashScreenController {
  void backgroundWork() async {
    // Chech if there is a token already saved on the device, if there is
    // log in the user automatically, otherwise go to login.
    SharedPreferences preferences = await SharedPreferences.getInstance();
    final accessToken = preferences.getString('access_token');

    if (accessToken == null) {
      Routes.sailor.navigate(
        '/login',
        navigationType: NavigationType.pushReplace,
      );
    } else {
      preferences.setString('access_token', accessToken);

      Routes.sailor.navigate(
        '/home',
        navigationType: NavigationType.pushReplace,
      );
    }
  }
}

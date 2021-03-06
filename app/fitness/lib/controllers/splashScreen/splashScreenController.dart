import 'package:sailor/sailor.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:fitness/models/me.dart';
import 'package:fitness/routes.dart';
import 'package:fitness/services/meRepository.dart';

class SplashScreenController {
  bool _isFirstLoad = true;
  bool get isFirstLoad => _isFirstLoad;

  void backgroundWork() async {
    _isFirstLoad = false;

    // Chech if there is a token already saved on the device, if there is
    // log in the user automatically, otherwise go to login.
    SharedPreferences preferences = await SharedPreferences.getInstance();
    final accessToken = preferences.getString('access_token');

    if (accessToken == null) {
      Routes.sailor.navigate(
        '/login',
        navigationType: NavigationType.pushReplace,
        transitionDuration: Duration(milliseconds: 0),
      );
    } else {
      try {
        final String token = 'Bearer $accessToken';
        final response = await MeRepository.create().me(token);
        final Me meObject = Me.fromMap(response.body);

        MeRepository.setMeData(meObject);
        MeRepository.setAccessToken(token);

        Routes.sailor.navigate(
          '/home',
          navigationType: NavigationType.pushReplace,
          transitionDuration: Duration(milliseconds: 0),
        );
      } catch (exception) {
        Routes.sailor.navigate(
          '/login',
          navigationType: NavigationType.pushReplace,
          transitionDuration: Duration(milliseconds: 0),
        );
      }
    }
  }
}

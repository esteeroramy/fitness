import 'package:sailor/sailor.dart';

import 'package:fitness/screens/screens.dart';

class Routes {
  static final sailor = Sailor(
    options: SailorOptions(
      defaultTransitions: [SailorTransition.slide_from_right],
    ),
  );

  static void createRoutes() {
    sailor.addRoutes([
      SailorRoute(
        name: '/splashScreen',
        builder: (context, args, params) {
          return SplashScreen();
        },
      ),
      SailorRoute(
        name: '/login',
        builder: (context, args, params) {
          return Login();
        },
      ),
      SailorRoute(
        name: '/signup',
        builder: (context, args, params) {
          return SignUp();
        },
      ),
      SailorRoute(
        name: '/home',
        builder: (context, args, params) {
          return Home();
        },
      ),
    ]);
  }
}

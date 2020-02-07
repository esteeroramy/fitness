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
      SailorRoute(
        name: '/workouthome',
        builder: (context, args, params) {
          return WorkoutHome();
        },
      ),
      SailorRoute(
        name: '/nutritionhome',
        builder: (context, args, params) {
          return NutritionHome();
        },
      ),
      SailorRoute(
        name: '/progresshome',
        builder: (context, args, params) {
          return ProgressHome();
        },
      ),
      SailorRoute(
        name: '/settingshome',
        builder: (context, args, params) {
          return SettingsHome();
        },
      ),
      SailorRoute(
        name: '/editprofile',
        builder: (context, args, params) {
          return EditProfile();
        },
      ),
      SailorRoute(
        name: '/changepassword',
        builder: (context, args, params) {
          return ChangePassword();
        },
      ),
      SailorRoute(
        name: '/addworkout',
        builder: (context, args, params) {
          return AddWorkout();
        },
      ),
      SailorRoute(
        name: '/createworkout',
        builder: (context, args, params) {
          return CreateWorkout();
        },
      ),
      SailorRoute(
        name: '/addexercise',
        builder: (context, args, params) {
          return AddExercise();
        },
      ),
      SailorRoute(
        name: '/createexercise',
        builder: (context, args, params) {
          return CreateExercise();
        },
      ),
    ]);
  }
}

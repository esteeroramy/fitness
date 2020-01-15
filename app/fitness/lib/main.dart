import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/controllers/theme/theme_controller.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/routes.dart';
import 'package:fitness/screens/splashScreen/splashScreen.dart';

void main() {
  Routes.createRoutes();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Injector(
      inject: [Inject<ThemeController>(() => ThemeController())],
      builder: (_) => StateBuilder<ThemeController>(
        models: [Injector.getAsReactive<ThemeController>()],
        builder: (context, reactiveModel) {
          return MaterialApp(
            theme: reactiveModel.state.theme,
            home: SplashScreen(),
            onGenerateRoute: Routes.sailor.generator(),
            navigatorKey: Routes.sailor.navigatorKey,
            supportedLocales: [
              Locale('en'),
            ],
            localizationsDelegates: [
              AppLocalizations.delegate,
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
            ],
            localeResolutionCallback: (locale, supportedLocales) {
              for (var supportedLocale in supportedLocales) {
                if (supportedLocale.languageCode == locale.languageCode) {
                  return supportedLocale;
                }
              }

              return supportedLocales.first;
            },
          );
        },
      ),
    );
  }
}

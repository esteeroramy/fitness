import 'package:flutter/material.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/components/loading.dart';
import 'package:fitness/controllers/splashScreen/splashScreenController.dart';

class SplashScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Injector(
      inject: [Inject<SplashScreenController>(() => SplashScreenController())],
      builder: (_) => StateBuilder<SplashScreenController>(
        models: [Injector.getAsReactive<SplashScreenController>()],
        builder: (context, reactiveModel) {
          WidgetsBinding.instance.addPostFrameCallback((_) => reactiveModel
              .setState((controller) => controller.backgroundWork()));

          return Scaffold(
            body: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.blue[900],
                    Colors.tealAccent[700],
                  ],
                ),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.all(50),
                    child:
                        Image(image: AssetImage('lib/assets/images/logo.png')),
                  ),
                  Loading(),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

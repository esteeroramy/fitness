import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/components/bottomNavigation.dart';
import 'package:fitness/controllers/workoutHome/workoutHomeController.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/routes.dart';

class WorkoutHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Injector(
      inject: [Inject<WorkoutHomeController>(() => WorkoutHomeController())],
      builder: (_) => StateBuilder<WorkoutHomeController>(
        models: [Injector.getAsReactive<WorkoutHomeController>()],
        builder: (context, reactiveModel) {
          return Scaffold(
            bottomNavigationBar: BottomNavigation(),
            appBar: _appBar(context),
            body: Text('2', style: TextStyle(fontSize: 30.0)),
          );
        },
      ),
    );
  }

  Widget _appBar(BuildContext context) {
    return PreferredSize(
      preferredSize: Size.fromHeight(101.0),
      child: AppBar(
        elevation: 1.0,
        flexibleSpace: Container(
          child: Column(
            children: <Widget>[
              SizedBox(height: 70.0),
              Row(
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.only(left: 20.0),
                    child: Text(
                      AppLocalizations.of(context)
                          .translate('workoutHomePage.title'),
                      style: TextStyle(
                        fontSize: 33.0,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  Spacer(),
                  Padding(
                    padding: EdgeInsets.only(right: 10.0),
                    child: IconButton(
                      icon: Icon(
                        MdiIcons.plus,
                        size: 30.0,
                        color: Theme.of(context).textTheme.title.color,
                      ),
                      onPressed: () => _onAddWorkoutPressed(),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  _onAddWorkoutPressed() {
    Routes.sailor.navigate(
      '/addworkout',
    );
  }
}

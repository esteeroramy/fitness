import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/controllers/createWorkout/createWorkoutController.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/routes.dart';

class CreateWorkout extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Injector(
      inject: [
        Inject<CreateWorkoutController>(() => CreateWorkoutController())
      ],
      builder: (_) => StateBuilder<CreateWorkoutController>(
        models: [Injector.getAsReactive<CreateWorkoutController>()],
        builder: (context, reactiveModel) {
          return Scaffold(
            appBar: _appBar(context),
            body: FloatingActionButton(
              onPressed: () => _onAddExercise(),
            ),
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
                    padding: EdgeInsets.only(left: 10.0),
                    child: IconButton(
                      icon: Icon(
                        MdiIcons.arrowLeft,
                        size: 30.0,
                        color: Theme.of(context).textTheme.title.color,
                      ),
                      onPressed: () => _onBackPressed(),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(left: 10.0),
                    child: Text(
                      AppLocalizations.of(context)
                          .translate('createWorkoutPage.title'),
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
                        MdiIcons.contentSave,
                        size: 30.0,
                      ),
                      onPressed: null,
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

  void _onBackPressed() {
    Routes.sailor.pop();
  }

  void _onAddExercise() {
    Routes.sailor.navigate(
      '/addexercise',
    );
  }
}

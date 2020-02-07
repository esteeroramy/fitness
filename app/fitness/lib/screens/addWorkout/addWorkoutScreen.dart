import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/controllers/addWorkout/addWorkoutController.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/routes.dart';

class AddWorkout extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Injector(
      inject: [Inject<AddWorkoutController>(() => AddWorkoutController())],
      builder: (_) => StateBuilder<AddWorkoutController>(
        models: [Injector.getAsReactive<AddWorkoutController>()],
        builder: (context, reactiveModel) {
          return Scaffold(
            appBar: _appBar(context),
            body: Column(
              children: <Widget>[
                SizedBox(height: 10.0),
                _buildCustomRow(context),
              ],
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
                          .translate('addWorkoutPage.title'),
                      style: TextStyle(
                        fontSize: 33.0,
                        fontWeight: FontWeight.w600,
                      ),
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

  Widget _buildCustomRow(BuildContext context) {
    return Row(
      children: <Widget>[
        SizedBox(width: 40.0),
        Text(
          AppLocalizations.of(context).translate('addWorkoutPage.custom'),
          style: TextStyle(fontSize: 22.0),
        ),
        Spacer(),
        IconButton(
          icon: Icon(
            MdiIcons.plus,
            size: 30.0,
            color: Theme.of(context).textTheme.title.color,
          ),
          onPressed: () => _onCreateCustomPressed(),
        ),
        SizedBox(width: 40.0),
      ],
    );
  }

  void _onBackPressed() {
    Routes.sailor.pop();
  }

  void _onCreateCustomPressed() {
    Routes.sailor.navigate(
      '/createworkout',
    );
  }
}

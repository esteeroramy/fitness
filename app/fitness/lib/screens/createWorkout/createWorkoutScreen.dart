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
            body: _buildBody(context),
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
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBody(BuildContext context) {
    return Container(
      height: double.infinity,
      child: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.only(left: 25.0, right: 25.0, top: 25.0),
              child: InkWell(
                onTap: () => _onSelectCardio(),
                child: Stack(
                  alignment: AlignmentDirectional.center,
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(25.0),
                      child: Image(
                        image: AssetImage(
                            'lib/assets/images/workout-types/cardio.jpg'),
                        color: Colors.grey.withOpacity(0.5),
                        colorBlendMode: BlendMode.srcOver,
                        fit: BoxFit.fill,
                      ),
                    ),
                    Center(
                      child: Text(
                        AppLocalizations.of(context)
                            .translate('workoutTypes.cardio'),
                        style: TextStyle(fontSize: 35.0),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  left: 25.0, right: 25.0, top: 25.0, bottom: 25.0),
              child: InkWell(
                onTap: () => _onSelectWeights(),
                child: Stack(
                  alignment: AlignmentDirectional.center,
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(25.0),
                      child: Image(
                        image: AssetImage(
                            'lib/assets/images/workout-types/weights.jpg'),
                        color: Colors.grey.withOpacity(0.5),
                        colorBlendMode: BlendMode.srcOver,
                        fit: BoxFit.fill,
                      ),
                    ),
                    Center(
                      child: Text(
                        AppLocalizations.of(context)
                            .translate('workoutTypes.weights'),
                        style: TextStyle(fontSize: 35.0),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _onBackPressed() {
    Routes.sailor.pop();
  }

  void _onSelectCardio() {
    Routes.sailor.navigate(
      '/createcardioworkout',
    );
  }

  void _onSelectWeights() {
    Routes.sailor.navigate(
      '/createweightsworkout',
    );
  }
}

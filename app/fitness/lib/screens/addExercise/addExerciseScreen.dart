import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/components/loading.dart';
import 'package:fitness/controllers/addExercise/addExerciseController.dart';
import 'package:fitness/controllers/createWeightsWorkout/createWeightsWorkoutController.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/models/exercise..dart';
import 'package:fitness/routes.dart';

class AddExercise extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Injector(
      inject: [Inject<AddExerciseController>(() => AddExerciseController())],
      builder: (_) => StateBuilder<AddExerciseController>(
        models: [Injector.getAsReactive<AddExerciseController>()],
        builder: (context, reactiveModel) {
          return StateBuilder<CreateWeightsWorkoutController>(
              models: [Injector.getAsReactive<CreateWeightsWorkoutController>()],
              builder: (context, createWeightsWorkoutReactiveModel) {
                return Scaffold(
                  appBar: _appBar(context),
                  body: _buildTabView(context, reactiveModel, createWeightsWorkoutReactiveModel),
                );
              },
          );
        },
      ),
    );
  }

  Widget _appBar(BuildContext context) {
    return PreferredSize(
      preferredSize: Size.fromHeight(101.0),
      child: AppBar(
        elevation: 0,
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
                          .translate('addExercisePage.title'),
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

  Widget _buildTabView(BuildContext context, ReactiveModel reactiveModel, ReactiveModel createWeightsWorkoutReactiveModel) {
    return DefaultTabController(
      length: 2,
      child: Column(
        children: <Widget>[
          Container(
            constraints: BoxConstraints.expand(height: 50),
            child: TabBar(
              labelColor: Theme.of(context).textTheme.title.color,
              tabs: <Widget>[
                Tab(
                    text: AppLocalizations.of(context)
                        .translate('addExercisePage.predefined')),
                Tab(
                    text: AppLocalizations.of(context)
                        .translate('addExercisePage.custom')),
              ],
            ),
          ),
          Divider(
            height: 2.0,
            thickness: 2.0,
          ),
          Expanded(
            child: Container(
              child: TabBarView(
                children: <Widget>[
                  Container(
                    child: _buildPredefinedPage(context, reactiveModel, createWeightsWorkoutReactiveModel),
                  ),
                  Container(
                    child: _buildCustomPage(context, reactiveModel, createWeightsWorkoutReactiveModel),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildCustomPage(BuildContext context, ReactiveModel reactiveModel, ReactiveModel createWeightsWorkoutReactiveModel) {
    if (reactiveModel.state.isCustomFirstLoad) {
      WidgetsBinding.instance.addPostFrameCallback((_) => reactiveModel
          .setState((controller) => controller.queryCustomExercises(context)));

      return Loading();
    } else if (reactiveModel.state.isCustomLoading) {
      return Loading();
    } else if (reactiveModel.state.customHasError) {
      return Center(
        child: Text(
          reactiveModel.state.customErrorMessage,
          style: TextStyle(color: Theme.of(context).errorColor),
        ),
      );
    } else {
      return Column(
        children: <Widget>[
          _buildCustomRow(context),
          Expanded(
            child: ListView.builder(
              padding: EdgeInsets.only(left: 10.0, right: 10.0, bottom: 10.0),
              itemCount: reactiveModel.state.customExerciseList.length,
              itemBuilder: (BuildContext context, int index) {
                return GestureDetector(
                  onTap: () => _addExercise(
                      reactiveModel.state.customExerciseList[index], createWeightsWorkoutReactiveModel),
                  child: Card(
                    elevation: 2.0,
                    child: Padding(
                      padding: EdgeInsets.all(12.0),
                      child: Text(
                          reactiveModel.state.customExerciseList[index].name,
                          style: TextStyle(fontSize: 18.0)),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      );
    }
  }

  Widget _buildCustomRow(BuildContext context) {
    return Row(
      children: <Widget>[
        SizedBox(width: 40.0),
        Text(
          AppLocalizations.of(context)
              .translate('addExercisePage.createCustom'),
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

  Widget _buildPredefinedPage(
      BuildContext context, ReactiveModel reactiveModel, ReactiveModel createWeightsWorkoutReactiveModel) {
    if (reactiveModel.state.isPredefinedFirstLoad) {
      WidgetsBinding.instance.addPostFrameCallback((_) =>
          reactiveModel.setState(
              (controller) => controller.queryPredefinedExercises(context)));

      return Loading();
    } else if (reactiveModel.state.isPredefinedLoading) {
      return Loading();
    } else if (reactiveModel.state.predefinedHasError) {
      return Center(
        child: Text(
          reactiveModel.state.predefinedErrorMessage,
          style: TextStyle(color: Theme.of(context).errorColor),
        ),
      );
    } else {
      return ListView.builder(
        padding: EdgeInsets.only(left: 10.0, right: 10.0, bottom: 10.0),
        itemCount: reactiveModel.state.predefinedExerciseList.length,
        itemBuilder: (BuildContext context, int index) {
          return GestureDetector(
            onTap: () =>
                _addExercise(reactiveModel.state.predefinedExerciseList[index], createWeightsWorkoutReactiveModel),
            child: Card(
              child: Padding(
                padding: EdgeInsets.all(12.0),
                child: Text(
                    reactiveModel.state.predefinedExerciseList[index].name,
                    style: TextStyle(fontSize: 18.0)),
              ),
            ),
          );
        },
      );
    }
  }

  void _onBackPressed() {
    Routes.sailor.pop();
  }

  void _onCreateCustomPressed() {
    Routes.sailor.navigate(
      '/createexercise',
    );
  }

  void _addExercise(Exercise exercise, ReactiveModel createWeightsWorkoutReactiveModel) {
    createWeightsWorkoutReactiveModel.setState((controller) => controller.addExercise(exercise));
    Routes.sailor.pop();
  }
}

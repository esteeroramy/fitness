import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/components/loading.dart';
import 'package:fitness/controllers/createWeightsWorkout/createWeightsWorkoutController.dart';
import 'package:fitness/controllers/createExercise/createExerciseController.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/routes.dart';

class CreateExercise extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    Map<String, String> data = {};

    return Injector(
      inject: [
        Inject<CreateExerciseController>(() => CreateExerciseController())
      ],
      builder: (_) => StateBuilder<CreateExerciseController>(
        models: [Injector.getAsReactive<CreateExerciseController>()],
        builder: (context, reactiveModel) {
          return StateBuilder<CreateWeightsWorkoutController>(
            models: [Injector.getAsReactive<CreateWeightsWorkoutController>()],
            builder: (context, createWeightsWorkoutReactiveModel) {
              return Scaffold(
                appBar: _appBar(context, data, reactiveModel, createWeightsWorkoutReactiveModel),
                body: Container(
                  height: double.infinity,
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        _buildForm(context, data, reactiveModel),
                      ],
                    ),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }

  Widget _appBar(BuildContext context, Map<String, String> data,
      ReactiveModel reactiveModel, ReactiveModel createWeightsWorkoutReactiveModel) {
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
                          .translate('createExercisePage.title'),
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
                      onPressed: () => _onSavePressed(
                          context, data, _formKey, reactiveModel, createWeightsWorkoutReactiveModel),
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

  Widget _buildForm(BuildContext context, Map<String, String> data,
      ReactiveModel reactiveModel) {
    return Form(
      key: _formKey,
      child: Container(
        padding: EdgeInsets.only(left: 25.0, right: 25.0, top: 25.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(AppLocalizations.of(context).translate('exerciseFields.name')),
            _buildNameField(context, data),
            SizedBox(height: 15.0),
            Text(AppLocalizations.of(context)
                .translate('exerciseFields.weight')),
            _buildWeightField(context, data, reactiveModel),
            SizedBox(height: 15.0),
            _buildLoadingSection(context, reactiveModel)
          ],
        ),
      ),
    );
  }

  Widget _buildNameField(BuildContext context, Map<String, String> data) {
    return TextFormField(
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context)
              .translate('errors.exerciseNameRequired');
        }

        return null;
      },
      onSaved: (value) {
        data['name'] = value.trim();
      },
    );
  }

  Widget _buildWeightField(BuildContext context, Map<String, String> data,
      ReactiveModel reactiveModel) {
    return DropdownButton<String>(
      items: CreateExerciseController.exerciseWeights.map((item) {
        return new DropdownMenuItem<String>(
          value: item,
          child: new Text(AppLocalizations.of(context)
              .translate('exerciseWeights.' + item)),
        );
      }).toList(),
      value: reactiveModel.state.selectedExerciseType,
      onChanged: (value) {
        reactiveModel.setState(
            (controller) => controller.setSelectedExerciseWeight(value));
      },
    );
  }

  Widget _buildLoadingSection(
      BuildContext context, ReactiveModel reactiveModel) {
    if (reactiveModel.state.isLoading) {
      return Loading();
    } else if (reactiveModel.state.hasError) {
      return Center(
        child: Text(
          reactiveModel.state.errorMessage,
          style: TextStyle(color: Theme.of(context).errorColor),
        ),
      );
    }

    return Container();
  }

  void _onBackPressed() {
    Routes.sailor.pop();
  }

  void _onSavePressed(BuildContext context, Map<String, String> data,
      GlobalKey<FormState> key, ReactiveModel reactiveModel, ReactiveModel createWeightsWorkoutReactiveModel) {
    final form = key.currentState;

    if (form.validate()) {
      form.save();

      reactiveModel
          .setState((controller) => controller.createExercise(context, createWeightsWorkoutReactiveModel, data));
    }
  }
}

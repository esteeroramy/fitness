import 'package:flutter/material.dart';
import 'package:flutter_picker/flutter_picker.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/components/loading.dart';
import 'package:fitness/controllers/createWeightsWorkout/createWeightsWorkoutController.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/models/exercise..dart';
import 'package:fitness/routes.dart';

class CreateWeightsWorkout extends StatelessWidget {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    Map<String, dynamic> data = {};

    return Injector(
      inject: [
        Inject<CreateWeightsWorkoutController>(
            () => CreateWeightsWorkoutController())
      ],
      builder: (_) => StateBuilder<CreateWeightsWorkoutController>(
        models: [Injector.getAsReactive<CreateWeightsWorkoutController>()],
        builder: (context, reactiveModel) {
          return Scaffold(
            key: _scaffoldKey,
            appBar: _appBar(context, reactiveModel, data),
            body: _buildBody(context, reactiveModel, data),
          );
        },
      ),
    );
  }

  Widget _appBar(BuildContext context, ReactiveModel reactiveModel,
      Map<String, dynamic> data) {
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
                          .translate('createWeightsWorkoutPage.title'),
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
                        color: reactiveModel.state.isLoading
                            ? Theme.of(context).disabledColor
                            : Theme.of(context).textTheme.title.color,
                      ),
                      onPressed: reactiveModel.state.isLoading
                          ? null
                          : () => _onSavePressed(
                              context, data, _formKey, reactiveModel),
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

  Widget _buildBody(BuildContext context, ReactiveModel reactiveModel,
      Map<String, dynamic> data) {
    return Container(
      height: double.infinity,
      child: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 10.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildForm(context, data, reactiveModel),
              SizedBox(height: 25.0),
              Padding(
                padding: EdgeInsets.only(left: 10.0),
                child: Text(AppLocalizations.of(context)
                    .translate('createWeightsWorkoutPage.configuration')),
              ),
              SizedBox(height: 10.0),
              _buildExercisesDisplay(context, reactiveModel),
              SizedBox(height: 10.0),
              _buildLoadingSection(context, reactiveModel),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildForm(BuildContext context, Map<String, dynamic> data,
      ReactiveModel reactiveModel) {
    return Form(
      key: _formKey,
      child: Container(
        padding: EdgeInsets.only(left: 15.0, right: 15.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(AppLocalizations.of(context).translate('workoutFields.name')),
            _buildNameField(context, data),
          ],
        ),
      ),
    );
  }

  Widget _buildNameField(BuildContext context, Map<String, dynamic> data) {
    return TextFormField(
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context)
              .translate('errors.workoutNameRequired');
        }

        return null;
      },
      onSaved: (value) {
        data['name'] = value.trim();
      },
    );
  }

  Widget _buildExercisesDisplay(
      BuildContext context, ReactiveModel reactiveModel) {
    List<Widget> items = [];

    reactiveModel.state.exercises.forEach((exercise) {
      items.add(_buildExercise(context, reactiveModel, exercise));
    });

    items.add(
      GestureDetector(
        onTap: () => _onAddExercise(),
        child: Card(
          child: Padding(
            padding: EdgeInsets.all(15.0),
            child: Row(
              children: [
                Icon(
                  MdiIcons.plus,
                  size: 26.0,
                  color: Theme.of(context).textTheme.title.color,
                ),
                SizedBox(width: 10.0),
                Text(
                    AppLocalizations.of(context)
                        .translate('createWeightsWorkoutPage.addExercise'),
                    style: TextStyle(fontSize: 20.0)),
              ],
            ),
          ),
          elevation: 3.0,
        ),
      ),
    );

    return Column(
      children: items,
    );
  }

  Widget _buildExercise(BuildContext context, ReactiveModel reactiveModel,
      Map<String, dynamic> exercise) {
    List<Widget> items = [
      Row(
        children: [
          IconButton(
            icon: Icon(
              MdiIcons.minusCircle,
              size: 26.0,
              color: Theme.of(context).errorColor,
            ),
            onPressed: () => reactiveModel.setState((controller) =>
                controller.removeExercise(exercise['exercise'])),
          ),
          Expanded(
            child: Text(
              exercise['exercise'].name,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: 20.0),
            ),
          ),
          IconButton(
            icon: Icon(
              MdiIcons.dotsVertical,
              size: 26.0,
            ),
            onPressed: () => _showExerciseSettings(context, reactiveModel,
                exercise['exercise'], exercise['configuration']),
          ),
        ],
      ),
      SizedBox(height: 10.0),
      Padding(
        padding: EdgeInsets.symmetric(horizontal: 11.0),
        child: Row(
          children: [
            Expanded(
              child: Center(child: Container()),
              flex: 1,
            ),
            Expanded(
              child: Center(
                child: Text(AppLocalizations.of(context)
                    .translate('workoutFields.sets')),
              ),
              flex: 3,
            ),
            Expanded(
              child: Center(
                child: Text(AppLocalizations.of(context)
                    .translate('workoutFields.reps')),
              ),
              flex: 3,
            ),
            Expanded(
              child: Center(
                child: Text(AppLocalizations.of(context)
                    .translate('workoutFields.rest')),
              ),
              flex: 3,
            )
          ],
        ),
      ),
      _buildDivider(),
    ];

    for (int i = 0; i < exercise['sets'].length; i++) {
      items.add(_buildSet(context, reactiveModel, exercise['exercise'],
          exercise['configuration'], exercise['sets'][i], i));
    }

    items.add(Padding(
      padding: EdgeInsets.all(11.0),
      child: GestureDetector(
        onTap: () => reactiveModel
            .setState((controller) => controller.addSet(exercise['exercise'])),
        child: Row(
          children: [
            Icon(
              MdiIcons.plus,
              size: 26.0,
              color: Theme.of(context).textTheme.title.color,
            ),
            SizedBox(width: 10.0),
            Text(
                AppLocalizations.of(context)
                    .translate('createWeightsWorkoutPage.addSet'),
                style: TextStyle(fontSize: 20.0)),
          ],
        ),
      ),
    ));

    return Card(
      child: Padding(
        padding: EdgeInsets.all(4.0),
        child: Column(children: items),
      ),
      elevation: 3.0,
    );
  }

  void _showExerciseSettings(BuildContext context, ReactiveModel reactiveModel,
      Exercise exercise, Map<String, dynamic> configuration) {
    Map<String, dynamic> tempConfiguration = {};
    tempConfiguration.addAll(configuration);
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(exercise.name +
              ' ' +
              AppLocalizations.of(context)
                  .translate('createWeightsWorkoutPage.settings')),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                children: [
                  Text(AppLocalizations.of(context)
                      .translate('createWeightsWorkoutPage.repsRange')),
                  Switch(
                    value: tempConfiguration['repsRangeEnabled'],
                    onChanged: (bool value) {
                      tempConfiguration['repsRangeEnabled'] = value;
                    },
                  ),
                ],
              ),
              Row(
                children: [
                  Text(AppLocalizations.of(context)
                      .translate('createWeightsWorkoutPage.restRange')),
                  Switch(
                    value: tempConfiguration['restRangeEnabled'],
                    onChanged: (bool value) {
                      tempConfiguration['restRangeEnabled'] = value;
                    },
                  ),
                ],
              ),
            ],
          ),
          actions: [
            FlatButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text(AppLocalizations.of(context)
                  .translate('generalInterface.cancel')),
            ),
            FlatButton(
              onPressed: () {
                reactiveModel.setState((controller) =>
                    controller.saveConfiguration(exercise, tempConfiguration));
                Navigator.of(context).pop();
              },
              child: Text(AppLocalizations.of(context)
                  .translate('generalInterface.save')),
            )
          ],
        );
      },
    );
  }

  Widget _buildDivider() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 10.0),
      child: Divider(),
    );
  }

  Widget _buildSet(
      BuildContext context,
      ReactiveModel reactiveModel,
      Exercise exercise,
      Map<String, dynamic> configuration,
      Map<String, dynamic> setDetails,
      int index) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.0),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              child: Center(
                child: IconButton(
                  icon: Icon(
                    MdiIcons.minusCircle,
                    size: 26.0,
                    color: Theme.of(context).errorColor,
                  ),
                  onPressed: () => reactiveModel.setState(
                      (controller) => controller.removeSet(exercise, index)),
                ),
              ),
              flex: 1,
            ),
            Expanded(
              child: Center(
                  child: Text((index + 1).toString(),
                      style: TextStyle(fontSize: 18.0))),
              flex: 3,
            ),
            Expanded(
              child: GestureDetector(
                onTap: () => configuration['repsRangeEnabled']
                    ? _showRepsRangePicker(
                        context,
                        reactiveModel,
                        setDetails['reps'],
                        setDetails['repsRange'],
                        exercise,
                        index)
                    : _showRepsPicker(context, reactiveModel,
                        setDetails['reps'], exercise, index),
                child: Container(
                  color: Colors.transparent,
                  child: Center(
                      child: Text(
                          configuration['repsRangeEnabled']
                              ? ((setDetails['reps'] != 0 &&
                                      setDetails['repsRange'] != 0
                                  ? setDetails['reps'].toString() +
                                      ' - ' +
                                      setDetails['repsRange'].toString()
                                  : '-'))
                              : (setDetails['reps'] != 0
                                  ? setDetails['reps'].toString()
                                  : '-'),
                          style: TextStyle(fontSize: 18.0))),
                ),
              ),
              flex: 3,
            ),
            Expanded(
              child: GestureDetector(
                onTap: () => configuration['restRangeEnabled']
                    ? _showRestRangePicker(
                        context,
                        reactiveModel,
                        setDetails['restInSeconds'],
                        setDetails['restRangeInSeconds'],
                        exercise,
                        index)
                    : _showRestPicker(context, reactiveModel,
                        setDetails['restInSeconds'], exercise, index),
                child: Container(
                  color: Colors.transparent,
                  child: Center(
                    child: Text(
                      configuration['restRangeEnabled']
                          ? _restRangeDisplay(setDetails['restInSeconds'],
                              setDetails['restRangeInSeconds'])
                          : _restDisplay(setDetails['restInSeconds']),
                      style: TextStyle(fontSize: 18.0),
                    ),
                  ),
                ),
              ),
              flex: 3,
            ),
          ],
        ),
      ),
    );
  }

  _showRepsPicker(BuildContext context, ReactiveModel reactiveModel,
      int selectedCount, Exercise exercise, int setIndex) {
    Picker(
      adapter: NumberPickerAdapter(
        data: [
          NumberPickerColumn(
            begin: 1,
            end: 60,
          ),
        ],
      ),
      selecteds: [selectedCount != 0 ? selectedCount - 1 : 0],
      changeToFirst: false,
      onConfirm: (Picker picker, List values) {
        reactiveModel.setState((controller) =>
            controller.setReps(exercise, setIndex, values[0] + 1, null));
      },
    ).show(_scaffoldKey.currentState);
  }

  _showRepsRangePicker(BuildContext context, ReactiveModel reactiveModel,
      int reps, int repRange, Exercise exercise, int setIndex) {
    Picker(
      adapter: NumberPickerAdapter(
        data: [
          NumberPickerColumn(
            begin: 1,
            end: 60,
          ),
          NumberPickerColumn(
            begin: 1,
            end: 60,
          ),
        ],
      ),
      delimiter: [
        PickerDelimiter(
          child: Container(
            width: 30.0,
            alignment: Alignment.center,
            child: Text('-'),
          ),
        ),
      ],
      selecteds: [reps != 0 ? reps - 1 : 0, repRange != 0 ? repRange - 1 : 0],
      changeToFirst: false,
      onConfirm: (Picker picker, List values) {
        reactiveModel.setState((controller) => controller.setReps(
            exercise, setIndex, values[0] + 1, values[1] + 1));
      },
    ).show(_scaffoldKey.currentState);
  }

  _showRestPicker(BuildContext context, ReactiveModel reactiveModel,
      int restInSeconds, Exercise exercise, int setIndex) {
    int mins = (restInSeconds / 60).floor();
    int secs = restInSeconds - (mins * 60);

    Picker(
      adapter: NumberPickerAdapter(
        data: [
          NumberPickerColumn(
            begin: 0,
            end: 10,
            suffix: Text(
              AppLocalizations.of(context).translate('timeUnit.mins'),
            ),
          ),
          NumberPickerColumn(
            begin: 0,
            end: 59,
            suffix: Text(
              AppLocalizations.of(context).translate('timeUnit.secs'),
            ),
          ),
        ],
      ),
      selecteds: [mins, secs],
      changeToFirst: false,
      onConfirm: (Picker picker, List values) {
        int newRestInSeconds = (values[0] * 60) + values[1];

        reactiveModel.setState((controller) =>
            controller.setRest(exercise, setIndex, newRestInSeconds, null));
      },
    ).show(_scaffoldKey.currentState);
  }

  _showRestRangePicker(
      BuildContext context,
      ReactiveModel reactiveModel,
      int restInSeconds,
      int restRangeInSeconds,
      Exercise exercise,
      int setIndex) {
    int mins = (restInSeconds / 60).floor();
    int secs = restInSeconds - (mins * 60);
    int minsRange = (restRangeInSeconds / 60).floor();
    int secsRange = restRangeInSeconds - (minsRange * 60);

    Picker(
      adapter: NumberPickerAdapter(
        data: [
          NumberPickerColumn(
            begin: 0,
            end: 10,
            suffix: Text(
              AppLocalizations.of(context).translate('timeUnit.mins'),
            ),
          ),
          NumberPickerColumn(
            begin: 0,
            end: 59,
            suffix: Text(
              AppLocalizations.of(context).translate('timeUnit.secs'),
            ),
          ),
          NumberPickerColumn(
            begin: 0,
            end: 10,
            suffix: Text(
              AppLocalizations.of(context).translate('timeUnit.mins'),
            ),
          ),
          NumberPickerColumn(
            begin: 0,
            end: 59,
            suffix: Text(
              AppLocalizations.of(context).translate('timeUnit.secs'),
            ),
          ),
        ],
      ),
      delimiter: [
        PickerDelimiter(
          column: 2,
          child: Container(
            width: 30.0,
            alignment: Alignment.center,
            child: Text('-'),
          ),
        ),
      ],
      selecteds: [mins, secs, minsRange, secsRange],
      changeToFirst: false,
      onConfirm: (Picker picker, List values) {
        int newRestInSeconds = (values[0] * 60) + values[1];
        int newRestRangeInSeconds = (values[2] * 60) + values[3];

        reactiveModel.setState((controller) => controller.setRest(
            exercise, setIndex, newRestInSeconds, newRestRangeInSeconds));
      },
    ).show(_scaffoldKey.currentState);
  }

  String _restDisplay(int restInSeconds) {
    int mins = (restInSeconds / 60).floor();
    int secs = restInSeconds - (mins * 60);

    if (mins == 0 && secs == 0) {
      return '-';
    } else {
      return mins.toString() + ':' + secs.toString();
    }
  }

  String _restRangeDisplay(int restInSeconds, int restRangeInSeconds) {
    int mins = (restInSeconds / 60).floor();
    int secs = restInSeconds - (mins * 60);
    int minsRange = (restRangeInSeconds / 60).floor();
    int secsRange = restRangeInSeconds - (minsRange * 60);

    if ((mins == 0 && secs == 0) || (minsRange == 0 && secsRange == 0)) {
      return '-';
    } else {
      return mins.toString() +
          ':' +
          secs.toString() +
          '-' +
          minsRange.toString() +
          ':' +
          secsRange.toString();
    }
  }

  Widget _buildLoadingSection(
      BuildContext context, ReactiveModel reactiveModel) {
    if (reactiveModel.state.isLoading) {
      return Loading();
    } else if (reactiveModel.state.hasError) {
      return Text(
        reactiveModel.state.errorMessage,
        style: TextStyle(color: Theme.of(context).errorColor),
      );
    }

    return Container();
  }

  void _onSavePressed(BuildContext context, Map<String, dynamic> data,
      GlobalKey<FormState> key, ReactiveModel reactiveModel) {
    final form = key.currentState;

    if (form.validate()) {
      form.save();

      reactiveModel
          .setState((controller) => controller.createWorkout(context, data));
    }
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

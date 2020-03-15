import 'package:flutter/material.dart';
import 'package:flutter_picker/flutter_picker.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/components/loading.dart';
import 'package:fitness/controllers/createCardioWorkout/createCardioWorkoutController.dart';
import 'package:fitness/global/enums/enums.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/routes.dart';

class CreateCardioWorkout extends StatelessWidget {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    Map<String, dynamic> data = {};

    return Injector(
      inject: [
        Inject<CreateCardioWorkoutController>(
            () => CreateCardioWorkoutController())
      ],
      builder: (_) => StateBuilder<CreateCardioWorkoutController>(
        models: [Injector.getAsReactive<CreateCardioWorkoutController>()],
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
                          .translate('createCardioWorkoutPage.title'),
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
                    .translate('createCardioWorkoutPage.configuration')),
              ),
              SizedBox(height: 10.0),
              _buildItemRow(context, reactiveModel, 'countdown'),
              _buildDivider(),
              _buildItemRow(context, reactiveModel, 'warmup'),
              _buildDivider(),
              _buildItemRow(context, reactiveModel, 'exercise'),
              _buildDivider(),
              _buildItemRow(context, reactiveModel, 'rest'),
              _buildDivider(),
              _buildItemRow(context, reactiveModel, 'sets'),
              _buildDivider(),
              _buildItemRow(context, reactiveModel, 'cycles'),
              _buildDivider(),
              _buildItemRow(context, reactiveModel, 'recoveryInterval'),
              _buildDivider(),
              _buildItemRow(context, reactiveModel, 'cooldown'),
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

  Widget _buildItemRow(
      BuildContext context, ReactiveModel reactiveModel, String name) {
    return GestureDetector(
      onTap: () => _onRowClicked(context, reactiveModel, name),
      child: Row(
        children: [
          Padding(
            padding: EdgeInsets.only(left: 15.0),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(5.0),
              child: Container(
                padding: EdgeInsets.all(2.0),
                decoration: new BoxDecoration(
                    color: ENUMS['cardioBorderIconColour'][name]),
                child: Icon(
                  ENUMS['cardioIcons'][name],
                  size: 25.0,
                  color: ENUMS['cardioIconColour'][name],
                ),
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(left: 10.0),
            child: Text(
              AppLocalizations.of(context).translate('cardioFields.' + name),
              style: TextStyle(fontSize: 22.0),
            ),
          ),
          Spacer(),
          Padding(
            padding: EdgeInsets.only(right: 15.0),
            child: Text(
              _getValueText(context, name, reactiveModel.state.getValue(name)),
              style: TextStyle(fontSize: 20.0),
            ),
          ),
        ],
      ),
    );
  }

  void _onRowClicked(
      BuildContext context, ReactiveModel reactiveModel, String name) {
    switch (name) {
      case 'warmup':
      case 'exercise':
      case 'rest':
      case 'recoveryInterval':
      case 'cooldown':
        _showMinSecPicker(context, reactiveModel, name);
        break;
      case 'countdown':
        _showCountdownPicker(context, reactiveModel, name);
        break;
      case 'sets':
      case 'cycles':
        _showSetsAndCyclesPicker(context, reactiveModel, name);
        break;
    }
  }

  String _getValueText(BuildContext context, String name, List<int> value) {
    switch (name) {
      case 'warmup':
      case 'exercise':
      case 'rest':
      case 'recoveryInterval':
      case 'cooldown':
        if (value[0] == 0 && value[1] == 0) {
          return AppLocalizations.of(context)
              .translate('createCardioWorkoutPage.sec', args: {'sec': 0});
        }
        return AppLocalizations.of(context).translate(
            'createCardioWorkoutPage.minAndSec',
            args: {'min': value[0], 'sec': value[1]});
      case 'countdown':
        return AppLocalizations.of(context)
            .translate('createCardioWorkoutPage.sec', args: {'sec': value[0]});
      case 'sets':
      case 'cycles':
        return value[0].toString();
    }

    return '';
  }

  Widget _buildDivider() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 30.0),
      child: Divider(),
    );
  }

  _showMinSecPicker(
      BuildContext context, ReactiveModel reactiveModel, String name) {
    Picker(
      adapter: NumberPickerAdapter(
        data: [
          NumberPickerColumn(
            begin: 0,
            end: 90,
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
      selecteds: []..addAll(reactiveModel.state.getValue(name)),
      changeToFirst: false,
      onConfirm: (Picker picker, List values) {
        reactiveModel
            .setState((controller) => controller.setValue(name, values));
      },
    ).show(_scaffoldKey.currentState);
  }

  _showCountdownPicker(
      BuildContext context, ReactiveModel reactiveModel, String name) {
    Picker(
      adapter: NumberPickerAdapter(
        data: [
          NumberPickerColumn(
            begin: 0,
            end: 10,
            suffix: Text(
              AppLocalizations.of(context).translate('timeUnit.secs'),
            ),
          ),
        ],
      ),
      selecteds: []..addAll(reactiveModel.state.getValue(name)),
      changeToFirst: false,
      onConfirm: (Picker picker, List values) {
        reactiveModel
            .setState((controller) => controller.setValue(name, values));
      },
    ).show(_scaffoldKey.currentState);
  }

  _showSetsAndCyclesPicker(
      BuildContext context, ReactiveModel reactiveModel, String name) {
    Picker(
      adapter: NumberPickerAdapter(
        data: [
          NumberPickerColumn(
            begin: 0,
            end: 60,
          ),
        ],
      ),
      selecteds: []..addAll(reactiveModel.state.getValue(name)),
      changeToFirst: false,
      onConfirm: (Picker picker, List values) {
        reactiveModel
            .setState((controller) => controller.setValue(name, values));
      },
    ).show(_scaffoldKey.currentState);
  }

  void _onBackPressed() {
    Routes.sailor.pop();
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
}

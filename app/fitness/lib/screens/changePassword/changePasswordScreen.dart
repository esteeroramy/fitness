import 'package:fitness/components/loading.dart';
import 'package:fitness/controllers/changePassword/changePasswordController.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/routes.dart';
import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

class ChangePassword extends StatelessWidget {
  final TextEditingController oldPasswordController =
      new TextEditingController();
  final TextEditingController newPasswordController =
      new TextEditingController();
  final TextEditingController confirmPasswordController =
      new TextEditingController();

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    Map<String, String> data = {};

    return Injector(
      inject: [
        Inject<ChangePasswordController>(() => ChangePasswordController())
      ],
      builder: (_) => StateBuilder<ChangePasswordController>(
        models: [Injector.getAsReactive<ChangePasswordController>()],
        builder: (context, reactiveModel) {
          return Scaffold(
            appBar: _appBar(context, reactiveModel, data),
            body: Container(
              height: double.infinity,
              child: SingleChildScrollView(
                child: Center(
                  child: Column(
                    children: <Widget>[
                      SizedBox(height: 10.0),
                      Form(
                        key: _formKey,
                        child: Container(
                          padding: EdgeInsets.only(
                              left: 25.0, right: 25.0, top: 25.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(AppLocalizations.of(context)
                                  .translate('userFields.oldPassword')),
                              _buildOldPasswordField(context, data),
                              SizedBox(height: 15.0),
                              Text(AppLocalizations.of(context)
                                  .translate('userFields.newPassword')),
                              _buildNewPasswordField(context, data),
                              SizedBox(height: 15.0),
                              Text(AppLocalizations.of(context)
                                  .translate('userFields.confirmPassword')),
                              _buildConfirmPasswordField(context, data),
                              SizedBox(height: 15.0),
                              _buildLoadingSection(context, reactiveModel)
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _appBar(BuildContext context, ReactiveModel reactiveModel,
      Map<String, String> data) {
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
                          .translate('changePasswordPage.title'),
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

  Widget _buildOldPasswordField(
      BuildContext context, Map<String, String> data) {
    return TextFormField(
      obscureText: true,
      controller: oldPasswordController,
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context)
              .translate('errors.oldPasswordRequired');
        }

        return null;
      },
      onSaved: (value) {
        data['oldPassword'] = value.trim();
      },
    );
  }

  Widget _buildNewPasswordField(
      BuildContext context, Map<String, String> data) {
    return TextFormField(
      obscureText: true,
      controller: newPasswordController,
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context)
              .translate('errors.newPasswordRequired');
        }

        return null;
      },
      onSaved: (value) {
        data['newPassword'] = value.trim();
      },
    );
  }

  Widget _buildConfirmPasswordField(
      BuildContext context, Map<String, String> data) {
    return TextFormField(
      obscureText: true,
      controller: confirmPasswordController,
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context)
              .translate('errors.confirmPasswordRequired');
        } else if (newValue != newPasswordController.text) {
          return AppLocalizations.of(context)
              .translate('errors.passwordsDoNotMatch');
        }

        return null;
      },
      onSaved: (value) {
        data['confirmedPassword'] = value.trim();
      },
    );
  }

  void _onBackPressed() {
    Routes.sailor.pop();
  }

  void _onSavePressed(BuildContext context, Map<String, String> data,
      GlobalKey<FormState> key, ReactiveModel reactiveModel) {
    final form = key.currentState;

    if (form.validate()) {
      form.save();

      reactiveModel.setState(
          (controller) => controller.savePasswordChange(context, data));
    }
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
}

import 'package:flutter/material.dart';
import 'package:sailor/sailor.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/components/loading.dart';
import 'package:fitness/controllers/signUp/signUpController.dart';
import 'package:fitness/global/common/common.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/global/theme/constants.dart';
import 'package:fitness/routes.dart';

class SignUp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();
    TextEditingController passwordController = new TextEditingController();
    Map<String, String> data = {};

    return Injector(
      inject: [Inject<SignUpController>(() => SignUpController())],
      builder: (_) => StateBuilder<SignUpController>(
        models: [Injector.getAsReactive<SignUpController>()],
        builder: (context, reactiveModel) {
          return Scaffold(
            body: Container(
              height: double.infinity,
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
              child: SingleChildScrollView(
                child: Center(
                  child: Column(
                    children: <Widget>[
                      Form(
                        key: _formKey,
                        child: Container(
                          padding: EdgeInsets.symmetric(horizontal: 50.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: <Widget>[
                              Padding(
                                padding: EdgeInsets.all(50),
                                child: Text(
                                  AppLocalizations.of(context)
                                      .translate('signUpPage.createAccount'),
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 27.0),
                                ),
                              ),
                              _buildUsernameField(context, data),
                              _buildCommonSpacing(),
                              _buildPasswordField(
                                  context, data, passwordController),
                              _buildCommonSpacing(),
                              _buildConfirmPasswordField(
                                  context, data, passwordController),
                              _buildCommonSpacing(),
                              _buildEmailField(context, data),
                              _buildCommonSpacing(),
                              _buildFirstNameField(context, data),
                              _buildCommonSpacing(),
                              _buildLastNameField(context, data),
                              _buildCommonSpacing(),
                              _buildSignUpButton(
                                  context, data, _formKey, reactiveModel),
                              _buildErrorMessage(context, reactiveModel),
                              SizedBox(height: 60.0),
                              Text(
                                AppLocalizations.of(context)
                                    .translate('signUpPage.haveAccount'),
                                style: TextStyle(
                                    color: Colors.white),
                              ),
                              FlatButton(
                                child: Text(
                                  AppLocalizations.of(context)
                                      .translate('signUpPage.login'),
                                  style: TextStyle(
                                    color: Colors.white,
                                  ),
                                ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(25.0),
                                  side: BorderSide(
                                    color: Colors.white,
                                    width: 1.0,
                                  ),
                                ),
                                color: Colors.black.withOpacity(0.15),
                                onPressed: () => _transitionToLogin(),
                              ),
                              SizedBox(height: 20.0),
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

  _buildUsernameField(context, data) {
    return TextFormField(
      textAlign: TextAlign.start,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        filled: true,
        hintText: AppLocalizations.of(context).translate('userFields.username'),
        hintStyle: constantFor(context, 'loginFieldHintTextStyle'),
        enabledBorder: constantFor(context, 'loginFieldEnabledBorder'),
        focusedBorder: constantFor(context, 'loginFieldFocusedBorder'),
        errorBorder: constantFor(context, 'loginFieldErrorBorder'),
        focusedErrorBorder:
            constantFor(context, 'loginFieldFocusedErrorBorder'),
        contentPadding: EdgeInsets.only(top: 15.0, left: 15.0),
      ),
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context)
              .translate('errors.usernameRequired');
        }

        return null;
      },
      onSaved: (value) {
        data['username'] = value.trim();
      },
    );
  }

  _buildPasswordField(context, data, passwordController) {
    return TextFormField(
      obscureText: true,
      controller: passwordController,
      textAlign: TextAlign.start,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        filled: true,
        hintText: AppLocalizations.of(context).translate('userFields.password'),
        hintStyle: constantFor(context, 'loginFieldHintTextStyle'),
        enabledBorder: constantFor(context, 'loginFieldEnabledBorder'),
        focusedBorder: constantFor(context, 'loginFieldFocusedBorder'),
        errorBorder: constantFor(context, 'loginFieldErrorBorder'),
        focusedErrorBorder:
            constantFor(context, 'loginFieldFocusedErrorBorder'),
        contentPadding: EdgeInsets.only(top: 15.0, left: 15.0),
      ),
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context)
              .translate('errors.passwordRequired');
        }

        return null;
      },
      onSaved: (value) {
        data['password'] = value.trim();
      },
    );
  }

  _buildConfirmPasswordField(context, data, passwordController) {
    return TextFormField(
      obscureText: true,
      textAlign: TextAlign.start,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        filled: true,
        hintText: AppLocalizations.of(context)
            .translate('userFields.confirmPassword'),
        hintStyle: constantFor(context, 'loginFieldHintTextStyle'),
        enabledBorder: constantFor(context, 'loginFieldEnabledBorder'),
        focusedBorder: constantFor(context, 'loginFieldFocusedBorder'),
        errorBorder: constantFor(context, 'loginFieldErrorBorder'),
        focusedErrorBorder:
            constantFor(context, 'loginFieldFocusedErrorBorder'),
        contentPadding: EdgeInsets.only(top: 15.0, left: 15.0),
      ),
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context)
              .translate('errors.confirmPasswordRequired');
        } else if (newValue != passwordController.text) {
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

  _buildEmailField(context, data) {
    return TextFormField(
      keyboardType: TextInputType.emailAddress,
      textAlign: TextAlign.start,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        filled: true,
        hintText: AppLocalizations.of(context).translate('userFields.email'),
        hintStyle: constantFor(context, 'loginFieldHintTextStyle'),
        enabledBorder: constantFor(context, 'loginFieldEnabledBorder'),
        focusedBorder: constantFor(context, 'loginFieldFocusedBorder'),
        errorBorder: constantFor(context, 'loginFieldErrorBorder'),
        focusedErrorBorder:
            constantFor(context, 'loginFieldFocusedErrorBorder'),
        contentPadding: EdgeInsets.only(top: 15.0, left: 15.0),
      ),
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context).translate('errors.emailRequired');
        } else if (!isValidEmail(newValue)) {
          return AppLocalizations.of(context).translate('errors.invalidEmail');
        }

        return null;
      },
      onSaved: (value) {
        data['email'] = value.trim();
      },
    );
  }

  _buildFirstNameField(context, data) {
    return TextFormField(
      textAlign: TextAlign.start,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        filled: true,
        hintText:
            AppLocalizations.of(context).translate('userFields.firstName'),
        hintStyle: constantFor(context, 'loginFieldHintTextStyle'),
        enabledBorder: constantFor(context, 'loginFieldEnabledBorder'),
        focusedBorder: constantFor(context, 'loginFieldFocusedBorder'),
        errorBorder: constantFor(context, 'loginFieldErrorBorder'),
        focusedErrorBorder:
            constantFor(context, 'loginFieldFocusedErrorBorder'),
        contentPadding: EdgeInsets.only(top: 15.0, left: 15.0),
      ),
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context)
              .translate('errors.firstNameRequired');
        }

        return null;
      },
      onSaved: (value) {
        data['fname'] = value.trim();
      },
    );
  }

  _buildLastNameField(context, data) {
    return TextFormField(
      textAlign: TextAlign.start,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        filled: true,
        hintText: AppLocalizations.of(context).translate('userFields.lastName'),
        hintStyle: constantFor(context, 'loginFieldHintTextStyle'),
        enabledBorder: constantFor(context, 'loginFieldEnabledBorder'),
        focusedBorder: constantFor(context, 'loginFieldFocusedBorder'),
        errorBorder: constantFor(context, 'loginFieldErrorBorder'),
        focusedErrorBorder:
            constantFor(context, 'loginFieldFocusedErrorBorder'),
        contentPadding: EdgeInsets.only(top: 15.0, left: 15.0),
      ),
      validator: (value) {
        final newValue = value.trim();

        if (newValue.isEmpty) {
          return AppLocalizations.of(context)
              .translate('errors.lastNameRequired');
        }

        return null;
      },
      onSaved: (value) {
        data['lname'] = value.trim();
      },
    );
  }

  _buildSignUpButton(BuildContext context, Map<String, String> data,
      GlobalKey<FormState> key, ReactiveModel reactiveModel) {
    if (reactiveModel.state.isLoading) {
      return Container(
          padding: EdgeInsets.only(bottom: 18.0), child: Loading(color: Colors.white));
    } else {
      return RaisedButton(
        child:
            Text(AppLocalizations.of(context).translate('signUpPage.signUp')),
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(25.0)),
        color: Colors.cyan,
        onPressed: () => _signUpPressed(context, data, key, reactiveModel),
      );
    }
  }

  _buildErrorMessage(BuildContext context, ReactiveModel reactiveModel) {
    if (!reactiveModel.state.isLoading && reactiveModel.state.hasError) {
      return Text(
        reactiveModel.state.errorMessage,
        style: TextStyle(color: Colors.red[700]),
      );
    } else {
      return Container();
    }
  }

  _buildCommonSpacing() {
    return SizedBox(height: 20.0);
  }

  _transitionToLogin() {
    Routes.sailor.navigate(
      '/login',
      navigationType: NavigationType.pushReplace,
    );
  }

  _signUpPressed(BuildContext context, Map<String, String> data,
      GlobalKey<FormState> key, ReactiveModel reactiveModel) {
    final form = key.currentState;

    if (form.validate()) {
      form.save();

      reactiveModel.setState((controller) => controller.signUp(context, data));
    }
  }
}

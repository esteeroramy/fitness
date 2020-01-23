import 'package:flutter/material.dart';
import 'package:sailor/sailor.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/components/loading.dart';
import 'package:fitness/controllers/bottomNavigation/bottomNavigationController.dart';
import 'package:fitness/controllers/login/loginController.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/global/theme/constants.dart';
import 'package:fitness/routes.dart';

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();
    Map<String, String> data = {};

    return Injector(
      inject: [Inject<LoginController>(() => LoginController())],
      builder: (_) => StateBuilder<LoginController>(
        models: [Injector.getAsReactive<LoginController>()],
        builder: (context, reactiveModel) {
          return StateBuilder<BottomNavigationController>(
              models: [Injector.getAsReactive<BottomNavigationController>()],
              builder: (context, navigationReactiveModel) {
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
                            Padding(
                              padding: EdgeInsets.all(50),
                              child: Image(
                                  image:
                                      AssetImage('lib/assets/images/logo.png')),
                            ),
                            Form(
                              key: _formKey,
                              child: Container(
                                padding: EdgeInsets.symmetric(horizontal: 50.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: <Widget>[
                                    _buildUsernameField(context, data),
                                    SizedBox(height: 20.0),
                                    _buildPasswordField(context, data),
                                    SizedBox(height: 20.0),
                                    _buildLoginButton(context, data, _formKey,
                                        reactiveModel, navigationReactiveModel),
                                    _buildErrorMessage(context, reactiveModel),
                                    SizedBox(height: 60.0),
                                    Text(
                                      AppLocalizations.of(context)
                                          .translate('loginPage.noAccount'),
                                      style: TextStyle(color: Colors.white),
                                    ),
                                    FlatButton(
                                      child: Text(
                                        AppLocalizations.of(context).translate(
                                            'loginPage.createAccount'),
                                        style: TextStyle(
                                          color: Colors.white,
                                        ),
                                      ),
                                      shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(25.0),
                                        side: BorderSide(
                                          color: Colors.white,
                                          width: 1.0,
                                        ),
                                      ),
                                      color: Colors.black.withOpacity(0.15),
                                      onPressed: () => _transitionToSignUp(),
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
              });
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
        contentPadding: EdgeInsets.only(top: 15.0),
        prefixIcon: Icon(Icons.person, color: Colors.white),
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

  _buildPasswordField(context, data) {
    return TextFormField(
      obscureText: true,
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
        contentPadding: EdgeInsets.only(top: 15.0),
        prefixIcon: Icon(Icons.vpn_key, color: Colors.white),
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

  _buildLoginButton(
      BuildContext context,
      Map<String, String> data,
      GlobalKey<FormState> key,
      ReactiveModel reactiveModel,
      ReactiveModel navigationReactiveModel) {
    if (reactiveModel.state.isLoading) {
      return Container(
          padding: EdgeInsets.only(bottom: 18.0),
          child: Loading(color: Colors.white));
    } else {
      return RaisedButton(
        child: Text(AppLocalizations.of(context).translate('loginPage.login')),
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(25.0)),
        color: Colors.cyan,
        onPressed: () => _loginPressed(
            context, data, key, reactiveModel, navigationReactiveModel),
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

  _loginPressed(
      BuildContext context,
      Map<String, String> data,
      GlobalKey<FormState> key,
      ReactiveModel reactiveModel,
      ReactiveModel navigationReactiveModel) {
    final form = key.currentState;

    if (form.validate()) {
      form.save();

      reactiveModel.setState((controller) =>
          controller.login(context, data, navigationReactiveModel));
    }
  }

  _transitionToSignUp() {
    Routes.sailor.navigate(
      '/signup',
      navigationType: NavigationType.pushReplace,
    );
  }
}

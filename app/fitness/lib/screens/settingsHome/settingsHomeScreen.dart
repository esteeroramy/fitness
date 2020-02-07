import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:states_rebuilder/states_rebuilder.dart';

import 'package:fitness/components/bottomNavigation.dart';
import 'package:fitness/controllers/settingsHome/settingsHomeController.dart';
import 'package:fitness/global/localizations/app_localizations.dart';
import 'package:fitness/routes.dart';
import 'package:fitness/services/meRepository.dart';

class SettingsHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Injector(
      inject: [Inject<SettingsHomeController>(() => SettingsHomeController())],
      builder: (_) => StateBuilder<SettingsHomeController>(
        models: [Injector.getAsReactive<SettingsHomeController>()],
        builder: (context, reactiveModel) {
          return Scaffold(
            bottomNavigationBar: BottomNavigation(),
            appBar: _appBar(context),
            body: Container(
              height: double.infinity,
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    _buildUserPicture(context),
                    _buildUsernameComponent(),
                    _buildButtonsSection(context, reactiveModel),
                  ],
                ),
              ),
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
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              SizedBox(height: 70.0),
              Padding(
                padding: EdgeInsets.only(left: 20.0),
                child: Text(
                  AppLocalizations.of(context).translate('settingsPage.title'),
                  style: TextStyle(
                    fontSize: 33.0,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              SizedBox(height: 10.0),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildUserPicture(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(top: 10.0),
      child: Center(
        child: Stack(
          children: <Widget>[
            Container(
              width: 190.0,
              height: 190.0,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: Theme.of(context).primaryColor,
                  width: 3.0,
                ),
              ),
              child: Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                      color: Theme.of(context).scaffoldBackgroundColor,
                      width: 4.0),
                  image: DecorationImage(
                    fit: BoxFit.cover,
                    image: NetworkImage(
                        "https://lh3.googleusercontent.com/ztb5lNvRZrwDzdUfplSvLs9JthoPUpeCLPgmtzGkklYlAfiGXB0-YOhWu9cMswolPGsn"),
                  ),
                ),
              ),
            ),
            Positioned(
              top: 140.0,
              left: 50.0,
              child: GestureDetector(
                onTap: () => _onProfileClicked(),
                child: Container(
                  height: 100.0,
                  width: 100.0,
                  padding: EdgeInsets.only(bottom: 35.0),
                  decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Theme.of(context).scaffoldBackgroundColor),
                  child: Icon(
                    MdiIcons.pencilOutline,
                    size: 26.0,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildUsernameComponent() {
    return Container(
      padding: EdgeInsets.only(top: 10.0),
      child: Row(
        children: <Widget>[
          Expanded(
            child: Container(
                margin: EdgeInsets.only(left: 10.0, right: 20.0),
                child: Divider(thickness: 1.0)),
          ),
          Text('${MeRepository.meData.fname} ${MeRepository.meData.lname}'),
          Expanded(
            child: Container(
                margin: EdgeInsets.only(left: 20.0, right: 10.0),
                child: Divider(thickness: 1.0)),
          ),
        ],
      ),
    );
  }

  Widget _buildButtonsSection(
      BuildContext context, ReactiveModel reactiveModel) {
    return Container(
      padding: EdgeInsets.only(top: 60.0),
      child: Column(
        children: <Widget>[
          Divider(thickness: 1.0),
          InkWell(
            onTap: () => _onPreferencesClicked(),
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 15.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                      AppLocalizations.of(context)
                          .translate('settingsPage.preferences'),
                      style: TextStyle(fontSize: 18.0)),
                  Icon(
                    MdiIcons.tune,
                    size: 28.0,
                  ),
                ],
              ),
            ),
          ),
          Divider(thickness: 1.0),
          InkWell(
            onTap: () => _onChangePasswordClicked(),
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 15.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                      AppLocalizations.of(context)
                          .translate('settingsPage.changePassword'),
                      style: TextStyle(fontSize: 18.0)),
                  Icon(
                    MdiIcons.key,
                    size: 28.0,
                  ),
                ],
              ),
            ),
          ),
          Divider(thickness: 1.0),
          InkWell(
            onTap: () => _onLogoutClicked(reactiveModel),
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 15.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                      AppLocalizations.of(context)
                          .translate('settingsPage.logout'),
                      style: TextStyle(fontSize: 18.0)),
                  Icon(
                    MdiIcons.logout,
                    size: 28.0,
                  ),
                ],
              ),
            ),
          ),
          Divider(thickness: 1.0),
        ],
      ),
    );
  }

  void _onProfileClicked() {
    Routes.sailor.navigate(
      '/editprofile',
    );
  }

  void _onChangePasswordClicked() {
    Routes.sailor.navigate(
      '/changepassword',
    );
  }

  void _onPreferencesClicked() {}

  void _onLogoutClicked(ReactiveModel reactiveModel) {
    reactiveModel.setState((controller) => controller.logout());
  }
}

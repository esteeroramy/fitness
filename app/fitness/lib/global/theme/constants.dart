import 'package:flutter/material.dart';

dynamic constantFor(BuildContext context, String constant) {
  switch (constant) {
    case 'loginFieldEnabledBorder':
      {
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(25.0),
          borderSide: BorderSide(
            width: 2.0,
            color: Theme.of(context).primaryColorLight,
          ),
        );
      }
    case 'loginFieldFocusedBorder':
      {
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(25.0),
          borderSide: BorderSide(
            width: 2.0,
            color: Theme.of(context).primaryColor,
          ),
        );
      }
    case 'loginFieldErrorBorder':
      {
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(25.0),
          borderSide: BorderSide(
            width: 2.0,
            color: Theme.of(context).errorColor,
          ),
        );
      }
    case 'loginFieldFocusedErrorBorder':
      {
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(25.0),
          borderSide: BorderSide(
            width: 2.0,
            color: Theme.of(context).errorColor,
          ),
        );
      }
    case 'loginFieldHintTextStyle':
      {
        return TextStyle(color: Theme.of(context).primaryColorLight);
      }
  }
}

import 'package:flutter/material.dart';

dynamic constantFor(BuildContext context, String constant) {
  switch (constant) {
    case 'loginFieldEnabledBorder':
      {
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(25.0),
          borderSide: BorderSide(
            width: 2.0,
            color: Colors.white60,
          ),
        );
      }
    case 'loginFieldFocusedBorder':
      {
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(25.0),
          borderSide: BorderSide(
            width: 2.0,
            color: Colors.white,
          ),
        );
      }
    case 'loginFieldErrorBorder':
      {
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(25.0),
          borderSide: BorderSide(
            width: 2.0,
            color: Colors.red[700],
          ),
        );
      }
    case 'loginFieldFocusedErrorBorder':
      {
        return OutlineInputBorder(
          borderRadius: BorderRadius.circular(25.0),
          borderSide: BorderSide(
            width: 2.0,
            color: Colors.red[700],
          ),
        );
      }
    case 'loginFieldHintTextStyle':
      {
        return TextStyle(color: Colors.white60);
      }
  }
}

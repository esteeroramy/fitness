import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class Loading extends StatelessWidget {
  final Color color;

  Loading({this.color});

  @override
  Widget build(BuildContext context) {
    return SpinKitThreeBounce(
      color: color == null ? Theme.of(context).primaryColor : color,
      size: 30.0,
    );
  }
}

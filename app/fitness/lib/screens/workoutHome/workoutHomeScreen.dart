import 'package:flutter/material.dart';

import 'package:fitness/components/bottomNavigation.dart';

class WorkoutHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigation(),
      body: Text('2', style: TextStyle(fontSize: 30.0)),
    );
  }
}

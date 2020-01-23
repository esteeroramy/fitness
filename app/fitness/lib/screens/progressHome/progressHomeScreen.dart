import 'package:flutter/material.dart';

import 'package:fitness/components/bottomNavigation.dart';

class ProgressHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigation(),
      body: Text('4', style: TextStyle(fontSize: 30.0)),
    );
  }
}
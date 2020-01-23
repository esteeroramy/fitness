import 'package:flutter/material.dart';

import 'package:fitness/components/bottomNavigation.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigation(),
      body: Text('1', style: TextStyle(fontSize: 30.0)),
    );
  }
}

import 'dart:convert';

class User {
  final String confirmedPassword;
  final String email;
  final String fname;
  final String lname;
  final String password;
  final String username;

  User({
    this.confirmedPassword,
    this.email,
    this.fname,
    this.lname,
    this.password,
    this.username,
  });

  static User fromMap(Map<String, dynamic> map) {
    if (map == null) return null;

    return User(
      confirmedPassword: map['confirmedPassword'],
      email: map['email'],
      fname: map['fname'],
      lname: map['lname'],
      password: map['password'],
      username: map['username'],
    );
  }

  static User fromJson(String source) => fromMap(json.decode(source));
}

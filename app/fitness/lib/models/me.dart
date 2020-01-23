import 'dart:convert';

class Me {
  final String email;
  final String fname;
  final String lname;
  final String username;

  Me({
    this.email,
    this.fname,
    this.lname,
    this.username,
  });

  static Me fromMap(Map<String, dynamic> map) {
    if (map == null) return null;

    return Me(
      email: map['email'],
      fname: map['fname'],
      lname: map['lname'],
      username: map['username'],
    );
  }

  static Me fromJson(String source) => fromMap(json.decode(source));
}

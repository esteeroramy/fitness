import 'dart:convert';

class Exercise {
  final String name;
  final String weight;

  Exercise({
    this.name,
    this.weight,
  });

  static Exercise fromMap(Map<String, dynamic> map) {
    if (map == null) return null;

    return Exercise(
      name: map['name'],
      weight: map['weight'],
    );
  }

  static Exercise fromJson(String source) => fromMap(json.decode(source));
}

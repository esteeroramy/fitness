import 'dart:convert';

class Exercise {
  final String id;
  final String name;
  final String weight;

  Exercise({
    this.id,
    this.name,
    this.weight,
  });

  Exercise clone() {
    return new Exercise(
      id: this.id,
      name: this.name,
      weight: this.weight,
    );
  }

  static Exercise fromMap(Map<String, dynamic> map) {
    if (map == null) return null;

    return Exercise(
      id: map['id'],
      name: map['name'],
      weight: map['weight'],
    );
  }

  static Exercise fromJson(String source) => fromMap(json.decode(source));
}

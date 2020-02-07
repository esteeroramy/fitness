// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'exerciseRepository.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

class _$ExerciseRepository extends ExerciseRepository {
  _$ExerciseRepository([ChopperClient client]) {
    if (client == null) return;
    this.client = client;
  }

  final definitionType = ExerciseRepository;

  Future<Response> createExercise(String token, Map<String, String> data) {
    final $url = '/exercises/create';
    final $headers = {'Authorization': token};
    final $body = data;
    final $request =
        Request('PUT', $url, client.baseUrl, body: $body, headers: $headers);
    return client.send<dynamic, dynamic>($request);
  }

  Future<Response> queryCustomExercises(String token) {
    final $url = '/exercises/custom/_query';
    final $headers = {'Authorization': token};
    final $request = Request('GET', $url, client.baseUrl, headers: $headers);
    return client.send<dynamic, dynamic>($request);
  }

  Future<Response> queryPredefinedExercises(String token) {
    final $url = '/exercises/predefined/_query';
    final $headers = {'Authorization': token};
    final $request = Request('GET', $url, client.baseUrl, headers: $headers);
    return client.send<dynamic, dynamic>($request);
  }
}

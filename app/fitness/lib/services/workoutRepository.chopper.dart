// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'workoutRepository.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

class _$WorkoutRepository extends WorkoutRepository {
  _$WorkoutRepository([ChopperClient client]) {
    if (client == null) return;
    this.client = client;
  }

  final definitionType = WorkoutRepository;

  Future<Response> createWorkout(String token, Map<String, dynamic> data) {
    final $url = '/workouts/create';
    final $headers = {'Authorization': token};
    final $body = data;
    final $request =
        Request('PUT', $url, client.baseUrl, body: $body, headers: $headers);
    return client.send<dynamic, dynamic>($request);
  }
}

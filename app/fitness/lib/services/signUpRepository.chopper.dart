// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'signUpRepository.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

class _$SignUpRepository extends SignUpRepository {
  _$SignUpRepository([ChopperClient client]) {
    if (client == null) return;
    this.client = client;
  }

  final definitionType = SignUpRepository;

  Future<Response> signUp(Map<String, String> data) {
    final $url = '/users/create';
    final $body = data;
    final $request = Request('PUT', $url, client.baseUrl, body: $body);
    return client.send<dynamic, dynamic>($request);
  }
}

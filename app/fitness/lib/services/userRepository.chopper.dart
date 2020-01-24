// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'userRepository.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

class _$UserRepository extends UserRepository {
  _$UserRepository([ChopperClient client]) {
    if (client == null) return;
    this.client = client;
  }

  final definitionType = UserRepository;

  Future<Response> updateProfile(String token, Map<String, String> data) {
    final $url = '/users/updateProfile';
    final $headers = {'Authorization': token};
    final $body = data;
    final $request =
        Request('POST', $url, client.baseUrl, body: $body, headers: $headers);
    return client.send<dynamic, dynamic>($request);
  }

  Future<Response> updatePassword(String token, Map<String, String> data) {
    final $url = '/users/updatePassword';
    final $headers = {'Authorization': token};
    final $body = data;
    final $request =
        Request('POST', $url, client.baseUrl, body: $body, headers: $headers);
    return client.send<dynamic, dynamic>($request);
  }
}

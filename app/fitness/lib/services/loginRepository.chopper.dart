// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'loginRepository.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

class _$LoginRepository extends LoginRepository {
  _$LoginRepository([ChopperClient client]) {
    if (client == null) return;
    this.client = client;
  }

  final definitionType = LoginRepository;

  Future<Response> login(Map<String, String> data) {
    final $url = '/login';
    final $body = data;
    final $request = Request('POST', $url, client.baseUrl, body: $body);
    return client.send<dynamic, dynamic>($request);
  }
}

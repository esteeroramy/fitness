// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'meRepository.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

class _$MeRepository extends MeRepository {
  _$MeRepository([ChopperClient client]) {
    if (client == null) return;
    this.client = client;
  }

  final definitionType = MeRepository;

  Future<Response> me(String token) {
    final $url = '/me/';
    final $headers = {'Authorization': token};
    final $request = Request('GET', $url, client.baseUrl, headers: $headers);
    return client.send<dynamic, dynamic>($request);
  }
}

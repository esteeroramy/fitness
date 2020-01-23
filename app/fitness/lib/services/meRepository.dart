import 'package:chopper/chopper.dart';

import 'package:fitness/global/constants/constants.dart';
import 'package:fitness/models/me.dart';

part 'meRepository.chopper.dart';

@ChopperApi(baseUrl: '/me')
abstract class MeRepository extends ChopperService {
  static Me meData;
  static String accessToken;

  @Get(path: '/')
  Future<Response> me(@Header('Authorization') String token);

  static void setMeData(Me data) {
    meData = data;
  }

  static void setAccessToken(String data) {
    accessToken = data;
  }

  static MeRepository create() {
    final client = ChopperClient(
      baseUrl: API_PATH,
      services: [
        _$MeRepository(),
      ],
      converter: JsonConverter(),
    );

    return _$MeRepository(client);
  }
}

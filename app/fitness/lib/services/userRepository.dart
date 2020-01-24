import 'package:chopper/chopper.dart';

import 'package:fitness/global/constants/constants.dart';

part 'userRepository.chopper.dart';

@ChopperApi(baseUrl: '/users')
abstract class UserRepository extends ChopperService {
  @Post(path: '/updateProfile')
  Future<Response> updateProfile(@Header('Authorization') String token, @Body() Map<String, String> data);

  @Post(path: '/updatePassword')
  Future<Response> updatePassword(@Header('Authorization') String token, @Body() Map<String, String> data);

  static UserRepository create() {
    final client = ChopperClient(
      baseUrl: API_PATH,
      services: [
        _$UserRepository(),
      ],
      converter: JsonConverter(),
    );

    return _$UserRepository(client);
  }
}

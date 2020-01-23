import 'package:chopper/chopper.dart';

import 'package:fitness/global/constants/constants.dart';

part 'signUpRepository.chopper.dart';

@ChopperApi(baseUrl: '/users')
abstract class SignUpRepository extends ChopperService {
  @Put(path: '/create')
  Future<Response> signUp(@Body() Map<String, String> data);

  static SignUpRepository create() {
    final client = ChopperClient(
      baseUrl: API_PATH,
      services: [
        _$SignUpRepository(),
      ],
      converter: JsonConverter(),
    );

    return _$SignUpRepository(client);
  }
}

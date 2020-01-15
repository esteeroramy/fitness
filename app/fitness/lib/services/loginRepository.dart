import 'package:chopper/chopper.dart';

import 'package:fitness/global/constants/constants.dart';

part 'loginRepository.chopper.dart';

@ChopperApi(baseUrl: '/login')
abstract class LoginRepository extends ChopperService {
  @Post()
  Future<Response> login(@Body() Map<String, String> data);

  static LoginRepository create() {
    final client = ChopperClient(
      baseUrl: API_PATH,
      services: [
        _$LoginRepository(),
      ],
      converter: JsonConverter(),
    );

    return _$LoginRepository(client);
  }
}

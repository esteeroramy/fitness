import 'package:chopper/chopper.dart';

import 'package:fitness/global/constants/constants.dart';

part 'exerciseRepository.chopper.dart';

@ChopperApi(baseUrl: '/exercises')
abstract class ExerciseRepository extends ChopperService {
  @Put(path: '/create')
  Future<Response> createExercise(@Header('Authorization') String token, @Body() Map<String, String> data);

  @Get(path: '/custom/_query')
  Future<Response> queryCustomExercises(@Header('Authorization') String token);

  @Get(path: '/predefined/_query')
  Future<Response> queryPredefinedExercises(@Header('Authorization') String token);

  static ExerciseRepository create() {
    final client = ChopperClient(
      baseUrl: API_PATH,
      services: [
        _$ExerciseRepository(),
      ],
      converter: JsonConverter(),
    );

    return _$ExerciseRepository(client);
  }
}

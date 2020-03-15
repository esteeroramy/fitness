import 'package:chopper/chopper.dart';

import 'package:fitness/global/constants/constants.dart';

part 'workoutRepository.chopper.dart';

@ChopperApi(baseUrl: '/workouts')
abstract class WorkoutRepository extends ChopperService {
  @Put(path: '/create')
  Future<Response> createWorkout(@Header('Authorization') String token, @Body() Map<String, dynamic> data);

  static WorkoutRepository create() {
    final client = ChopperClient(
      baseUrl: API_PATH,
      services: [
        _$WorkoutRepository(),
      ],
      converter: JsonConverter(),
    );

    return _$WorkoutRepository(client);
  }
}

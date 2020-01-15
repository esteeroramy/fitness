class CurrentUserController {
  static final CurrentUserController _singleton = CurrentUserController._internal();

  factory CurrentUserController() {
    return _singleton;
  }

  CurrentUserController._internal();

  String token = '';
}

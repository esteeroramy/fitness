/// Returns true if an email is valid
bool isValidEmail(String email) {
  RegExp exp = RegExp(r'\S+@\S+\.\S+');

  return exp.hasMatch(email);
}
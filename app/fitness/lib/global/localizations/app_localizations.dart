import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AppLocalizations {
  final Locale locale;

  AppLocalizations(this.locale);

  static AppLocalizations of(BuildContext context) {
    return Localizations.of(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  Map<String, dynamic> _localizedStrings;

  /// Loads the selected locale into memory
  Future load() async {
    String jsonString =
        await rootBundle.loadString('lib/locales/${locale.languageCode}.json');
    _localizedStrings = json.decode(jsonString);
  }

  /// Translates a string and replaces parameters based on the given args
  String translate(String key, {Map<String, dynamic> args = const {}}) {
    List<String> find = key.split('.');
    dynamic subObject = _localizedStrings;

    // Find the translation string
    for (int i = 0; i < find.length; i++) {
      subObject = subObject[find[i]];
    }

    // Find things to replace
    RegExp exp = RegExp(r'({[^}]+})');
    Iterable<RegExpMatch> toReplaceMatches = exp.allMatches(subObject);

    // Add the things to replace to a list
    List<String> toReplaceStrings = [];
    for (Match m in toReplaceMatches) {
      toReplaceStrings.add(m.group(0));
    }

    // Resolve all the matches
    List<String> resolvedMatches = [];
    toReplaceStrings
        .forEach((match) => resolvedMatches.add(_resolveMatch(match, args)));

    // Replaces the resolved matches with the real values
    for (int i = 0; i < toReplaceStrings.length; i++) {
      subObject =
          subObject.replaceFirst(toReplaceStrings[i], resolvedMatches[i]);
    }

    return subObject;
  }

  /// Resolves matches based on the provided args
  String _resolveMatch(String match, Map<String, dynamic> args) {
    // Remove the surrounding {}
    String toResolve = match.substring(1, match.length - 1);
    // Get the different arguments provided in the {}
    List<String> chunks = toResolve.split(',');

    if (chunks.length == 1) {
      // If there is only one item in {} then we just need to replace
      // the bracket with the args given
      return args[chunks[0].trim()].toString();
    } else if (chunks[0] == 'count') {
      // If the first word is `count` then we need to call the count helper
      return _countResolver(chunks, args);
    }

    return '';
  }

  /// A helper method that resolves count matches
  String _countResolver(List<String> chunks, Map<String, dynamic> args) {
    RegExp findCondition = RegExp(r'(=|<|>|<=|>=){1}(\d+) (.+)');
    int value = int.parse(args[chunks[1].trim()].toString());

    for (int i = 2; i < chunks.length; i++) {
      // Find the current chunk
      String section = chunks[i].trim();
      // Match the regex to get the different sections of the current chunk
      Iterable<RegExpMatch> matches = findCondition.allMatches(section);
      // Get the different sections in the current chunk
      String operation = matches.first.group(1);
      int number = int.parse(matches.first.group(2));
      String text = matches.first.group(3);

      // If we found the right match then return
      if (operation == '=' && value == number ||
          operation == '<' && value < number ||
          operation == '>' && value > number ||
          operation == '<=' && value <= number ||
          operation == '>=' && value >= number) {

        String returnValue = text.replaceAll('#', value.toString());

        if (returnValue == 'null') {
          return '';
        }

        return returnValue;
      }
    }

    return '';
  }
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) {
    return ['en'].contains(locale.languageCode);
  }

  @override
  Future<AppLocalizations> load(Locale locale) async {
    AppLocalizations localizations = new AppLocalizations(locale);
    await localizations.load();
    return localizations;
  }

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

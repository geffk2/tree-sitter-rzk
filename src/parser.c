#include "tree_sitter/parser.h"

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 7
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 8
#define ALIAS_COUNT 0
#define TOKEN_COUNT 6
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 3
#define PRODUCTION_ID_COUNT 1

enum ts_symbol_identifiers {
  sym_varIdentToken = 1,
  sym_holeIdentToken = 2,
  anon_sym_POUNDlang = 3,
  anon_sym_SEMI = 4,
  sym_language = 5,
  sym_grammar = 6,
  sym_languageDecl = 7,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [sym_varIdentToken] = "varIdentToken",
  [sym_holeIdentToken] = "holeIdentToken",
  [anon_sym_POUNDlang] = "#lang",
  [anon_sym_SEMI] = ";",
  [sym_language] = "language",
  [sym_grammar] = "grammar",
  [sym_languageDecl] = "languageDecl",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [sym_varIdentToken] = sym_varIdentToken,
  [sym_holeIdentToken] = sym_holeIdentToken,
  [anon_sym_POUNDlang] = anon_sym_POUNDlang,
  [anon_sym_SEMI] = anon_sym_SEMI,
  [sym_language] = sym_language,
  [sym_grammar] = sym_grammar,
  [sym_languageDecl] = sym_languageDecl,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [sym_varIdentToken] = {
    .visible = true,
    .named = true,
  },
  [sym_holeIdentToken] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_POUNDlang] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_SEMI] = {
    .visible = true,
    .named = false,
  },
  [sym_language] = {
    .visible = true,
    .named = true,
  },
  [sym_grammar] = {
    .visible = true,
    .named = true,
  },
  [sym_languageDecl] = {
    .visible = true,
    .named = true,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
};

static inline bool sym_varIdentToken_character_set_1(int32_t c) {
  return (c < ','
    ? (c < ' '
      ? (c < '\t'
        ? c == 0
        : c <= '\r')
      : (c <= ' ' || (c < '('
        ? (c >= '"' && c <= '#')
        : c <= ')')))
    : (c <= ',' || (c < '['
      ? (c < '>'
        ? (c >= ';' && c <= '<')
        : c <= '>')
      : (c <= ']' || (c >= '{' && c <= '}')))));
}

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(10);
      if (lookahead == '#') ADVANCE(6);
      if (lookahead == ';') ADVANCE(18);
      if (lookahead == '?') ADVANCE(16);
      if (lookahead == 'r') ADVANCE(14);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(0)
      if (lookahead != 0 &&
          lookahead != '!' &&
          lookahead != '"' &&
          lookahead != '(' &&
          lookahead != ')' &&
          (lookahead < ',' || '.' < lookahead) &&
          lookahead != '<' &&
          lookahead != '>' &&
          (lookahead < '[' || ']' < lookahead) &&
          (lookahead < '{' || '}' < lookahead)) ADVANCE(15);
      END_STATE();
    case 1:
      if (lookahead == '-') ADVANCE(2);
      END_STATE();
    case 2:
      if (lookahead == '1') ADVANCE(19);
      END_STATE();
    case 3:
      if (lookahead == 'a') ADVANCE(7);
      END_STATE();
    case 4:
      if (lookahead == 'g') ADVANCE(17);
      END_STATE();
    case 5:
      if (lookahead == 'k') ADVANCE(1);
      END_STATE();
    case 6:
      if (lookahead == 'l') ADVANCE(3);
      END_STATE();
    case 7:
      if (lookahead == 'n') ADVANCE(4);
      END_STATE();
    case 8:
      if (lookahead == 'r') ADVANCE(9);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(8)
      END_STATE();
    case 9:
      if (lookahead == 'z') ADVANCE(5);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(sym_varIdentToken);
      if (lookahead == '-') ADVANCE(12);
      if (!sym_varIdentToken_character_set_1(lookahead)) ADVANCE(15);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(sym_varIdentToken);
      if (lookahead == '1') ADVANCE(20);
      if (!sym_varIdentToken_character_set_1(lookahead)) ADVANCE(15);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(sym_varIdentToken);
      if (lookahead == 'k') ADVANCE(11);
      if (!sym_varIdentToken_character_set_1(lookahead)) ADVANCE(15);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(sym_varIdentToken);
      if (lookahead == 'z') ADVANCE(13);
      if (!sym_varIdentToken_character_set_1(lookahead)) ADVANCE(15);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(sym_varIdentToken);
      if (!sym_varIdentToken_character_set_1(lookahead)) ADVANCE(15);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(sym_holeIdentToken);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_POUNDlang);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_SEMI);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(sym_language);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(sym_language);
      if (!sym_varIdentToken_character_set_1(lookahead)) ADVANCE(15);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 8},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [sym_varIdentToken] = ACTIONS(1),
    [sym_holeIdentToken] = ACTIONS(1),
    [anon_sym_POUNDlang] = ACTIONS(1),
    [anon_sym_SEMI] = ACTIONS(1),
    [sym_language] = ACTIONS(1),
  },
  [1] = {
    [sym_grammar] = STATE(3),
    [sym_languageDecl] = STATE(4),
    [anon_sym_POUNDlang] = ACTIONS(3),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 1,
    ACTIONS(5), 1,
      sym_language,
  [4] = 1,
    ACTIONS(7), 1,
      ts_builtin_sym_end,
  [8] = 1,
    ACTIONS(9), 1,
      ts_builtin_sym_end,
  [12] = 1,
    ACTIONS(11), 1,
      anon_sym_SEMI,
  [16] = 1,
    ACTIONS(13), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 4,
  [SMALL_STATE(4)] = 8,
  [SMALL_STATE(5)] = 12,
  [SMALL_STATE(6)] = 16,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [7] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [9] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_grammar, 1),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [13] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_languageDecl, 3),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_rzk(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif

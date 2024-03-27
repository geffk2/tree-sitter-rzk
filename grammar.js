module.exports = grammar({
  name: 'rzk',

  extras: $ => [
    /\s/,
    $.comment
  ],

  rules: {
    grammar: $ => seq(
      $.languageDecl,
      repeat(seq($.command, ';')),
    ),

    _varIdentToken: $ => /[^-?!.\\;,#"\]\[)(}{><|\s\t\n\r][^;\\,#"\]\[)(}{><|\s\t\n\r]*/,
    _holeIdentToken: $ => '?',

    holeIdent: $ => $._holeIdentToken,
    varIdent: $ => $._varIdentToken, // nonempty

    languageDecl: $ => seq('#lang', $.language, ';'),
    language: $ => 'rzk-1',

    declUsedVars: $ => seq('uses', '(', repeat1($.varIdent), ')'),

    command: $ => choice(
      seq('#set-option', $.string, '=', $.string),
      seq('#unset-option', $.string),

      seq('#check', $.term, ':', $.term),
      
      seq('#compute', $.term),
      seq('#compute-whnf', $.term),
      seq('#compute-nf', $.term),

      seq('#postulate', $.varIdent, optional($.declUsedVars), repeat1($.param), ':', $.term),

      seq('#assume', repeat1($.varIdent), ':', $.term),
      seq('#variable', $.varIdent, ':', $.term),
      seq('#variables', repeat1($.varIdent), ':', $.term),

      seq('#section', optional($.varIdent)),
      seq('#end', optional($.varIdent)),

      seq('#define', $.varIdent, optional($.declUsedVars), repeat1($.param), ':', $.term, ':=', $.term),
      seq('#def', $.varIdent, optional($.declUsedVars), repeat1($.param), ':', $.term, ':=', $.term),
    ),

    pattern: $ => choice( // nonempty 
      'unit',
      $.varIdent,
      seq('(', $.pattern, ',', $.pattern, ')')
    ),

    param: $ => choice( // nonempty 
      $.pattern,
      seq('(', repeat1($.pattern), ':', $.term, optional(seq('|', $.term)), ')'),
    ),

    paramDecl: $ => choice( 
      $._term6,
      seq('(', $.term, ':', $.term, optional(seq('|', $.term)), ')'),

      // DEPRECATED:
      // seq('{', $.pattern, ':', $.term, optional(seq('|', $.term)), '}'),
      // seq('{', '(', $.pattern, ':', $.term, ')', '|', $.term, '}'),
    ),

    restriction: $ => choice( // nonempty; only mentioned as list
      seq($.term, "↦", $.term,),

      seq($.term, "|->", $.term,),
    ),

    term: $ => choice( // separator nonempty ","
      $._term1,
      seq($._term2, 'as', $._term1),
    ),

    _term1: $ => prec(1, choice(
      $._term2,
      field('function', seq($.paramDecl, choice("→", "->"), $._term1)),

      field('sigma_type', seq(choice(
        "Σ","∑","Sigma"
      ), '(', $.pattern, ':', $.term, ')', ',', $._term1)),

      field('type_identity', seq($._term2, '=_{', $.term, '}', $._term2)),
      field('type_identity', seq($._term2, '=', $._term2)),

      field('lambda', seq('\\', repeat1($.param), choice("→", "->"), $._term1)),
    )),

    _term2: $ => prec(2, choice(
      $._term3,
      field('tope_or', seq($._term3, choice("∨", "\\/"), $._term2)),
    )),

    _term3: $ => prec(3, choice(
      $._term4,
      field('tope_and', seq($._term4, choice("∧", "/\\"), $._term3)),
    )),

    _term4: $ => prec(4, choice(
      $._term5,
      field('tope_eq', seq($._term5, choice("≡","==="), $._term5)),

      field('tope_leq', seq($._term5, choice("≤", "<="), $._term5)),
    )),

    _term5: $ => prec(5, choice(
      $._term6,
      field('cube_product', seq($._term5, choice("×", "*"), $._term6)),
    )),

    _term6: $ => prec(6, choice(
      $._term7,
      field('type_restricted', seq($._term6, '[', seq($.restriction, repeat(seq(',', $.restriction))), ']')),
      field('application', seq($._term6, $._term7)),

      field('projection_first', seq(choice("π₁", "first"), $._term7)),

      field('projection_second', seq(choice("π₂", "second"), $._term7)),
    )),

    _term7: $ => prec(7, choice(
      seq('(', $.term, ')'),
      'U',
      'CUBE',
      'TOPE',
      '1',
      '2',

      "*₁", '*_1',
      "0₂", '0_2',
      "1₂", '1_2',
      "⊤", 'TOP',
      "⊥", 'BOT',

      'recBOT',
      seq('recOR', '(', repeat($.restriction), ')'),

      'Unit',
      seq('(', $.term, ',', $.term, ')'),
      'unit',
      'refl',
      seq('refl_{', $.term, optional(seq(':', $.term)), '}'),
      seq('idJ', '(', $.term, ',', $.term, ',', $.term, ',', $.term, ',', $.term, ',', $.term, ')'),
      $.holeIdent,
      $.varIdent,

      // DEPRECATED: 
      // seq('<', $.paramDecl, "→", $.term, '>'),
      // seq('<', $.paramDecl, "->", $.term, '>'),
      // seq('recOR', '(', $.term, ',', $.term, ',', $.term, ',', $.term ')'),
    )),

    comment: $ => token(choice(
      seq('--', /.*/),
      seq('{-', repeat(choice(/[^-]/, /-[^}]/)), '-}')
    )),

    string: $ => seq(
      '"',
      repeat(choice(
        token.immediate(prec(1, /[^\\"\n]+/)),
        $.escape_sequence
      )),
      '"'
    ),

    escape_sequence: $ => token.immediate(seq(
      '\\',
      choice(
        /[^xuU]/,
        /\d{2,3}/,
        /x[0-9a-fA-F]{2,}/,
        /u[0-9a-fA-F]{4}/,
        /U[0-9a-fA-F]{8}/
      )
    )),
  }
});


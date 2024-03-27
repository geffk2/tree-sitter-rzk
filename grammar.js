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

    varIdentToken: $ => /[^-?!.\\;,#"\]\[)(}{><|\s\t\n\r][^;\\,#"\]\[)(}{><|\s\t\n\r]*/,
    holeIdentToken: $ => '?',

    holeIdent: $ => $.holeIdentToken,
    varIdent: $ => repeat1($.varIdentToken),

    languageDecl: $ => seq('#lang', $.language, ';'),
    language: $ => 'rzk-1',

    declUsedVars: $ => seq('uses', '(', $.varIdent, ')'),

    command: $ => choice(
      seq('#set-option', $.string, '=', $.string),
      seq('#unset-option', $.string),

      seq('#check', $.term, ':', $.term),
      
      seq('#compute', $.term),
      seq('#compute-whnf', $.term),
      seq('#compute-nf', $.term),

      seq('#postulate', $.varIdent, optional($.declUsedVars), repeat($.param), ':', $.term),

      seq('#assume', $.varIdent, ':', $.term),
      seq('#variable', $.varIdent, ':', $.term),
      seq('#variables', $.varIdent, ':', $.term),

      seq('#section', optional($.varIdent)),
      seq('#end', optional($.varIdent)),

      seq('#define', $.varIdent, optional($.declUsedVars), repeat($.param), ':', $.term, ':=', $.term),
      seq('#def', $.varIdent, optional($.declUsedVars), repeat($.param), ':', $.term, ':=', $.term),
    ),

    pattern: $ => repeat1(choice(
      'unit',
      $.varIdent,
      seq('(', $.pattern, ',', $.pattern, ')')
    )),

    param: $ => repeat1(choice(
      $.pattern,
      seq('(', repeat($.pattern), ':', $.term, optional(seq('|', $.term)), ')'),

      // seq('{', $.pattern, ':', $.term, '|', $.term, '}') // DEPRECATED
    )),

    paramDecl: $ => choice( 
      $.term6,
      seq('(', $.term, ':', $.term, optional(seq('|', $.term)), ')'),

      // DEPRECATED:
      // seq('{', $.pattern, ':', $.term, optional(seq('|', $.term)), '}'),
      // seq('{', '(', $.pattern, ':', $.term, ')', '|', $.term, '}'),
    ),

    restriction: $ => choice(
      seq($.term, "↦", $.term, 
          repeat(seq(',', $.term, "↦", $.term))),

      seq($.term, "|->", $.term, 
          repeat(seq(',', $.term, "|->", $.term))),
    ),

    term: $ => seq($.term1, repeat(seq(',', $.term1))),

    term1: $ => choice(
      $.term2,
      seq($.paramDecl, "→", $.term1),
      seq($.paramDecl, "->", $.term1),

      seq("Σ", '(', $.pattern, ':', $.term, ')', ',', $.term1),
      seq("∑", '(', $.pattern, ':', $.term, ')', ',', $.term1),

      seq("Sigma", '(', $.pattern, ':', $.term, ')', ',', $.term1),

      seq($.term2, '=_{', $.term, '}', $.term2),
      seq($.term2, '=', $.term2),

      seq('\\', repeat($.param), "→", $.term1),
      seq('\\', repeat($.param), "->", $.term1),
    ),

    term2: $ => choice(
      $.term3,
      seq($.term3, "∨", $.term2),
      seq($.term3, "\\/", $.term2),
    ),

    term3: $ => choice(
      $.term4,
      seq($.term4, "∧", $.term3),
      seq($.term4, "/\\", $.term3),
    ),

    term4: $ => choice(
      $.term5,
      seq($.term5, "≡", $.term5),
      seq($.term5, "===", $.term5),
      seq($.term5, "≤", $.term5),
      seq($.term5, "<=", $.term5)
    ),

    term5: $ => choice(
      $.term6,
      seq($.term5, "×", $.term6),
      seq($.term5, "*", $.term6),
    ),

    term6: $ => choice(
      $.term7,
      seq($.term6, '[', repeat($.restriction), ']'),
      seq($.term6, $.term7),

      seq("π₁", $.term7),
      seq("first", $.term7),

      seq("π₂", $.term7),
      seq("second", $.term7),
    ),

    term7: $ => choice(
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
    ),

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


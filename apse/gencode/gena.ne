@{%
const assert = console.assert;
const moo = require("moo");
const lexer = moo.compile({
  space: {match: /\s+/, lineBreaks: true},
  number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
  quostr: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
  word: /[a-zA-Z_][a-zA-Z0-9_]*/,
  operators:
});
%}

doc -> _ "{" (_ stmt ";" )+ _ "}" _
stmt -> stmt_class | stmt_props | stmt_singleton | stmt_events | stmt_extends | stmt_copath | stmt_ofType
stmt_class -> identifier colon "class" %class stmt_class_substmts

identifier->%word ("." %word)*
colon -> _ ":" _




_ -> null | space {% d=>null %}
space -> %ws%

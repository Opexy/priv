grammar Gena;
WS: [ \n\t\r]+ -> skip;
Comment     : '###' ~('\r' | '\n')* -> skip;
// All multichar operators goes before OPCHAR.
//OPCHAR2  : ('>=' | '<=' | '==' | '&&' | '||' | '^' | '!');
// Reserved Keywords goes anywhere after WS and OPCHAR.
// you are a parser and parser is stupid. let's keep it that way.


STRING
   : '"' (ESC | SAFECODEPOINT)* '"' ;
fragment ESC
   : '\\' (["\\/bfnrt] | UNICODE) ;
fragment UNICODE
   : 'u' HEXDIGIT HEXDIGIT HEXDIGIT HEXDIGIT ;
fragment HEXDIGIT
   : [0-9a-fA-F] ;
fragment SAFECODEPOINT
   : ~ ["\\\u0000-\u001F] ;
OPCHAR2 : ':=' | '->';
OPCHAR  : [.,:;{}+\-*/<>[\]()];
DECIMAL : '0' | [1-9] [0-9]*;
HEXADECIMAL : '0'[xX]HEXDIGIT+;
FLOAT   : DECIMAL '.' [0-9]* EXPONENT? | 
          [0-9]+EXPONENT;
fragment
EXPONENT : [Ee] [+\-]? DECIMAL;

Iden: [a-zA-Z_][a-zA-Z_0-9]*;

doc         : expr ';'*;
// just a meta-grammar
expr: opr='(' expr? ')'
    | opr='[' expr? ']'
    | opr='{' expr? ';'* '}'
    | lhs=expr opr='.' rhs=expr
    | lhs=expr opr=('*'|'/') rhs=expr 
    | lhs=expr opr=('+'|'-') rhs=expr
    | lhs=expr opr=':'rhs=expr
    | <assoc=right> lhs=expr opr='=' rhs=expr 
    | lhs=expr opr=',' rhs=expr
    | lhs=expr rhs=expr
    | lhs=expr opr=':=' rhs=expr // assignment separates from...
    | lhs=expr ';'+ rhs=expr
    | iden=Iden
    | val=value;
value: str= STRING 
    | numfloat= FLOAT
    | numdec= (DECIMAL | HEXADECIMAL);

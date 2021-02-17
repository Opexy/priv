//  Copyright (c) 2020 Mi Chen
//  All rights reserved.
/** Generative Application Grammar */
grammar Gena2;
WS: [ \n\t\r]+ -> skip;
Comment     : '###' ~('\r' | '\n')* -> skip;
EvtPathConnector: '->';
OPCHAR  : [.,:;{}+\-*/<>[\]()];

Noid        :'noid';
//Frag        :'frag'; // part of nseIden
//Let         :'let'; // part of nseIden
Copath      :'copath';
Class       :'class';
Data        :'data';
Extends     :'extends';
Nary        :'nary';
Event       :'event';
Param       :'param';
Callinto    :'callinto'; // end this and connects into...
Caller      :'caller';
// MouseClick:event belongsto:App.EventLoop
// Not implemented
Belongsto   :'belongsto'; // use belongsto to add to event loop

PiggyAfter  :'piggyafter'; // after a certain event. Object path from x to y shall have been defined.
PiggyInto   :'piggyinto'; // specify partial event path for happening...
PiggyBefore :'piggybefore'; // specify partial event path for happening...
DataType    :'float32' | 'int32';
Iden    : [a-zA-Z_][a-zA-Z_0-9]*;
INT     : [0-9]+;
FLOAT   : [0-9]+'.'[0-9]*EXPONENT? | 
          '.'[0-9]+EXPONENT? |
          [0-9]+EXPONENT?;
fragment
EXPONENT : ('e'|'E') ('+'|'-')? ('0'..'9')+;

doc
  : docStmt+ ;
docStmt
  : docStmtNse;

docStmtNse    : stmtNse ';';
stmtNse       : nseIden(','nseIden)* (':'nseModel)? (nseModel)* nseCurly?;
  nseModel    : nseModelName ('(' nseModelProp (',' nseModelProp)* ')')?;
    nseModelName: Event | Param | nseIden;
    nseModelProp: nseModelPropKey (':' nseModelPropVal)?;
    nseModelPropKey:nseIden;
    nseModelPropVal:nseIden | INT|FLOAT;
    nseIden   : DataType | Iden ('.' Iden)*;
nseCurly      : '{' (stmtCopath | stmtExtends |
                     stmtInitializes | stmtCaller | stmtCallinto |
                     stmtNse ';')+ '}';
  stmtCopath  : 'copath' nseIden ';';
  stmtExtends : 'extends' nseIden (',' nseIden)* ';';
  stmtInitializes: 'initializes' nseIden (',' nseIden)* ';';
  stmtCaller : 'caller' eventPath ';';
  stmtCallinto : 'callinto' eventPath ';';
    eventPath  : eventSpec ('->' eventSpec) *;
     eventSpec : eventName (eventTargetArgs)? (eventCurly)?;
     eventName : Iden;
     eventTargetArgs: '(' eventTarget ')';
     eventTarget: nseIden;
     eventCurly: '{' stmtCaller | stmtCallinto '}'; //........

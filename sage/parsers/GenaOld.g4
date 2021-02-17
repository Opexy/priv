//  Copyright (c) 2020 Mi Chen
//  All rights reserved.
/** Generative Application Grammar */
grammar GenaOld;
WS: [ \n\t\r]+ -> skip;
Comment     : '###' ~('\r' | '\n')* -> skip;
EvtPathConnector: '->';
OPCHAR  : [.,:;{}+\-*/<>[\]()];

Noid        :'noid';
Let         :'let';
Copath      :'copath';
Class       :'class';
Singleton   :'singleton';
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

doc
  : docStmt+ ;
docStmt
  : docStmtNse;

docStmtNse    : stmtNse ';';
stmtNse       : nseMain (nseNary | nseCurly | nseParam)* ;
  nseMain     : 'noid'| ('let' | nseIden) (':' nseType)?;
    nseIden   : DataType | Iden ('.' Iden)* ;
    nseType   : 'noid' | 'class' | 'singleton' | 'event' | nseIden;
  nseNary     : 'nary' ':' ('List' | 'One');
  nseParam    : 'param';
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
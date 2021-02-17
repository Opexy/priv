//  Copyright (c) 2020 Mi Chen
//  All rights reserved.
/** Generative Application Grammar */
grammar GenaTest;
WS: [ \n\t\r]+ -> skip;
Comment     : '###' ~('\r' | '\n')* -> skip;
EvtPathConnector: '->';
OPCHAR  : [.,:;{}+\-*/<>[\]()];

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
  : stmt ';';

stmt: stmt | stmtDot;
stmtDot: stmt '.' stmt;
### AppServer.Manager Create Application()
stmtInvoke:'invoke'? ivScoper* ivVerb ivSpec? ivArgs? ivCurly;
ivActor: 

stmtAssign: stmtAssignTarget=stmt '=' stmtAssignResult=stmt;

ivActor: 

//docStmtNse    : stmtNse;
stmtNse       : arrayOfType;
arrayOfType   : aotType '[' aotSpec ']';
aotType: nseIden;
aotSpec: aotCount | 'COUNT' '=' aotCount |
         ((aotElem (',' aotElem)+) | (aotRest | aotSpread)) (',' 'COUNT' '=' aotCount)?;
aotCount: INT | nseIden;
aotElem: aotName | aotRest | aotSpread;
aotName: nseIden;
aotRest: '...''rest';
aotSpread: '...'nseIden;
nseIden : Iden ('.' Iden)*;

/*
nseIden(','nseIden)* (':'nseModel)? (nseModel)* nseCurly?;
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
*/
// Generated from websage/src/gena/Gena.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { DocContext } from "./GenaParser";
import { DocStmtContext } from "./GenaParser";
import { DocStmtNseContext } from "./GenaParser";
import { StmtNseContext } from "./GenaParser";
import { NseModelContext } from "./GenaParser";
import { NseModelNameContext } from "./GenaParser";
import { NseModelPropContext } from "./GenaParser";
import { NseModelPropKeyContext } from "./GenaParser";
import { NseModelPropValContext } from "./GenaParser";
import { NseIdenContext } from "./GenaParser";
import { NseCurlyContext } from "./GenaParser";
import { StmtCopathContext } from "./GenaParser";
import { StmtExtendsContext } from "./GenaParser";
import { StmtInitializesContext } from "./GenaParser";
import { StmtCallerContext } from "./GenaParser";
import { StmtCallintoContext } from "./GenaParser";
import { EventPathContext } from "./GenaParser";
import { EventSpecContext } from "./GenaParser";
import { EventNameContext } from "./GenaParser";
import { EventTargetArgsContext } from "./GenaParser";
import { EventTargetContext } from "./GenaParser";
import { EventCurlyContext } from "./GenaParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `GenaParser`.
 */
export interface GenaListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `GenaParser.doc`.
	 * @param ctx the parse tree
	 */
	enterDoc?: (ctx: DocContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.doc`.
	 * @param ctx the parse tree
	 */
	exitDoc?: (ctx: DocContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.docStmt`.
	 * @param ctx the parse tree
	 */
	enterDocStmt?: (ctx: DocStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.docStmt`.
	 * @param ctx the parse tree
	 */
	exitDocStmt?: (ctx: DocStmtContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.docStmtNse`.
	 * @param ctx the parse tree
	 */
	enterDocStmtNse?: (ctx: DocStmtNseContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.docStmtNse`.
	 * @param ctx the parse tree
	 */
	exitDocStmtNse?: (ctx: DocStmtNseContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.stmtNse`.
	 * @param ctx the parse tree
	 */
	enterStmtNse?: (ctx: StmtNseContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.stmtNse`.
	 * @param ctx the parse tree
	 */
	exitStmtNse?: (ctx: StmtNseContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.nseModel`.
	 * @param ctx the parse tree
	 */
	enterNseModel?: (ctx: NseModelContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.nseModel`.
	 * @param ctx the parse tree
	 */
	exitNseModel?: (ctx: NseModelContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.nseModelName`.
	 * @param ctx the parse tree
	 */
	enterNseModelName?: (ctx: NseModelNameContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.nseModelName`.
	 * @param ctx the parse tree
	 */
	exitNseModelName?: (ctx: NseModelNameContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.nseModelProp`.
	 * @param ctx the parse tree
	 */
	enterNseModelProp?: (ctx: NseModelPropContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.nseModelProp`.
	 * @param ctx the parse tree
	 */
	exitNseModelProp?: (ctx: NseModelPropContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.nseModelPropKey`.
	 * @param ctx the parse tree
	 */
	enterNseModelPropKey?: (ctx: NseModelPropKeyContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.nseModelPropKey`.
	 * @param ctx the parse tree
	 */
	exitNseModelPropKey?: (ctx: NseModelPropKeyContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.nseModelPropVal`.
	 * @param ctx the parse tree
	 */
	enterNseModelPropVal?: (ctx: NseModelPropValContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.nseModelPropVal`.
	 * @param ctx the parse tree
	 */
	exitNseModelPropVal?: (ctx: NseModelPropValContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.nseIden`.
	 * @param ctx the parse tree
	 */
	enterNseIden?: (ctx: NseIdenContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.nseIden`.
	 * @param ctx the parse tree
	 */
	exitNseIden?: (ctx: NseIdenContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.nseCurly`.
	 * @param ctx the parse tree
	 */
	enterNseCurly?: (ctx: NseCurlyContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.nseCurly`.
	 * @param ctx the parse tree
	 */
	exitNseCurly?: (ctx: NseCurlyContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.stmtCopath`.
	 * @param ctx the parse tree
	 */
	enterStmtCopath?: (ctx: StmtCopathContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.stmtCopath`.
	 * @param ctx the parse tree
	 */
	exitStmtCopath?: (ctx: StmtCopathContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.stmtExtends`.
	 * @param ctx the parse tree
	 */
	enterStmtExtends?: (ctx: StmtExtendsContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.stmtExtends`.
	 * @param ctx the parse tree
	 */
	exitStmtExtends?: (ctx: StmtExtendsContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.stmtInitializes`.
	 * @param ctx the parse tree
	 */
	enterStmtInitializes?: (ctx: StmtInitializesContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.stmtInitializes`.
	 * @param ctx the parse tree
	 */
	exitStmtInitializes?: (ctx: StmtInitializesContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.stmtCaller`.
	 * @param ctx the parse tree
	 */
	enterStmtCaller?: (ctx: StmtCallerContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.stmtCaller`.
	 * @param ctx the parse tree
	 */
	exitStmtCaller?: (ctx: StmtCallerContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.stmtCallinto`.
	 * @param ctx the parse tree
	 */
	enterStmtCallinto?: (ctx: StmtCallintoContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.stmtCallinto`.
	 * @param ctx the parse tree
	 */
	exitStmtCallinto?: (ctx: StmtCallintoContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.eventPath`.
	 * @param ctx the parse tree
	 */
	enterEventPath?: (ctx: EventPathContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.eventPath`.
	 * @param ctx the parse tree
	 */
	exitEventPath?: (ctx: EventPathContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.eventSpec`.
	 * @param ctx the parse tree
	 */
	enterEventSpec?: (ctx: EventSpecContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.eventSpec`.
	 * @param ctx the parse tree
	 */
	exitEventSpec?: (ctx: EventSpecContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.eventName`.
	 * @param ctx the parse tree
	 */
	enterEventName?: (ctx: EventNameContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.eventName`.
	 * @param ctx the parse tree
	 */
	exitEventName?: (ctx: EventNameContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.eventTargetArgs`.
	 * @param ctx the parse tree
	 */
	enterEventTargetArgs?: (ctx: EventTargetArgsContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.eventTargetArgs`.
	 * @param ctx the parse tree
	 */
	exitEventTargetArgs?: (ctx: EventTargetArgsContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.eventTarget`.
	 * @param ctx the parse tree
	 */
	enterEventTarget?: (ctx: EventTargetContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.eventTarget`.
	 * @param ctx the parse tree
	 */
	exitEventTarget?: (ctx: EventTargetContext) => void;

	/**
	 * Enter a parse tree produced by `GenaParser.eventCurly`.
	 * @param ctx the parse tree
	 */
	enterEventCurly?: (ctx: EventCurlyContext) => void;
	/**
	 * Exit a parse tree produced by `GenaParser.eventCurly`.
	 * @param ctx the parse tree
	 */
	exitEventCurly?: (ctx: EventCurlyContext) => void;
}


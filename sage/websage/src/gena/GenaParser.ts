// Generated from websage/src/gena/Gena.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { GenaListener } from "./GenaListener";

export class GenaParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly WS = 10;
	public static readonly Comment = 11;
	public static readonly EvtPathConnector = 12;
	public static readonly OPCHAR = 13;
	public static readonly Noid = 14;
	public static readonly Copath = 15;
	public static readonly Class = 16;
	public static readonly Data = 17;
	public static readonly Extends = 18;
	public static readonly Nary = 19;
	public static readonly Event = 20;
	public static readonly Param = 21;
	public static readonly Callinto = 22;
	public static readonly Caller = 23;
	public static readonly Belongsto = 24;
	public static readonly PiggyAfter = 25;
	public static readonly PiggyInto = 26;
	public static readonly PiggyBefore = 27;
	public static readonly DataType = 28;
	public static readonly Iden = 29;
	public static readonly INT = 30;
	public static readonly FLOAT = 31;
	public static readonly RULE_doc = 0;
	public static readonly RULE_docStmt = 1;
	public static readonly RULE_docStmtNse = 2;
	public static readonly RULE_stmtNse = 3;
	public static readonly RULE_nseModel = 4;
	public static readonly RULE_nseModelName = 5;
	public static readonly RULE_nseModelProp = 6;
	public static readonly RULE_nseModelPropKey = 7;
	public static readonly RULE_nseModelPropVal = 8;
	public static readonly RULE_nseIden = 9;
	public static readonly RULE_nseCurly = 10;
	public static readonly RULE_stmtCopath = 11;
	public static readonly RULE_stmtExtends = 12;
	public static readonly RULE_stmtInitializes = 13;
	public static readonly RULE_stmtCaller = 14;
	public static readonly RULE_stmtCallinto = 15;
	public static readonly RULE_eventPath = 16;
	public static readonly RULE_eventSpec = 17;
	public static readonly RULE_eventName = 18;
	public static readonly RULE_eventTargetArgs = 19;
	public static readonly RULE_eventTarget = 20;
	public static readonly RULE_eventCurly = 21;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"doc", "docStmt", "docStmtNse", "stmtNse", "nseModel", "nseModelName", 
		"nseModelProp", "nseModelPropKey", "nseModelPropVal", "nseIden", "nseCurly", 
		"stmtCopath", "stmtExtends", "stmtInitializes", "stmtCaller", "stmtCallinto", 
		"eventPath", "eventSpec", "eventName", "eventTargetArgs", "eventTarget", 
		"eventCurly",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "';'", "','", "':'", "'('", "')'", "'.'", "'{'", "'}'", "'initializes'", 
		undefined, undefined, "'->'", undefined, "'noid'", "'copath'", "'class'", 
		"'data'", "'extends'", "'nary'", "'event'", "'param'", "'callinto'", "'caller'", 
		"'belongsto'", "'piggyafter'", "'piggyinto'", "'piggybefore'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "WS", "Comment", "EvtPathConnector", 
		"OPCHAR", "Noid", "Copath", "Class", "Data", "Extends", "Nary", "Event", 
		"Param", "Callinto", "Caller", "Belongsto", "PiggyAfter", "PiggyInto", 
		"PiggyBefore", "DataType", "Iden", "INT", "FLOAT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(GenaParser._LITERAL_NAMES, GenaParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return GenaParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Gena.g4"; }

	// @Override
	public get ruleNames(): string[] { return GenaParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return GenaParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(GenaParser._ATN, this);
	}
	// @RuleVersion(0)
	public doc(): DocContext {
		let _localctx: DocContext = new DocContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, GenaParser.RULE_doc);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 45;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 44;
				this.docStmt();
				}
				}
				this.state = 47;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === GenaParser.DataType || _la === GenaParser.Iden);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public docStmt(): DocStmtContext {
		let _localctx: DocStmtContext = new DocStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, GenaParser.RULE_docStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 49;
			this.docStmtNse();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public docStmtNse(): DocStmtNseContext {
		let _localctx: DocStmtNseContext = new DocStmtNseContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, GenaParser.RULE_docStmtNse);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 51;
			this.stmtNse();
			this.state = 52;
			this.match(GenaParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmtNse(): StmtNseContext {
		let _localctx: StmtNseContext = new StmtNseContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, GenaParser.RULE_stmtNse);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 54;
			this.nseIden();
			this.state = 59;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GenaParser.T__1) {
				{
				{
				this.state = 55;
				this.match(GenaParser.T__1);
				this.state = 56;
				this.nseIden();
				}
				}
				this.state = 61;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 64;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GenaParser.T__2) {
				{
				this.state = 62;
				this.match(GenaParser.T__2);
				this.state = 63;
				this.nseModel();
				}
			}

			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << GenaParser.Event) | (1 << GenaParser.Param) | (1 << GenaParser.DataType) | (1 << GenaParser.Iden))) !== 0)) {
				{
				{
				this.state = 66;
				this.nseModel();
				}
				}
				this.state = 71;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 73;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GenaParser.T__6) {
				{
				this.state = 72;
				this.nseCurly();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nseModel(): NseModelContext {
		let _localctx: NseModelContext = new NseModelContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, GenaParser.RULE_nseModel);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 75;
			this.nseModelName();
			this.state = 87;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GenaParser.T__3) {
				{
				this.state = 76;
				this.match(GenaParser.T__3);
				this.state = 77;
				this.nseModelProp();
				this.state = 82;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === GenaParser.T__1) {
					{
					{
					this.state = 78;
					this.match(GenaParser.T__1);
					this.state = 79;
					this.nseModelProp();
					}
					}
					this.state = 84;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 85;
				this.match(GenaParser.T__4);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nseModelName(): NseModelNameContext {
		let _localctx: NseModelNameContext = new NseModelNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, GenaParser.RULE_nseModelName);
		try {
			this.state = 92;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case GenaParser.Event:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 89;
				this.match(GenaParser.Event);
				}
				break;
			case GenaParser.Param:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 90;
				this.match(GenaParser.Param);
				}
				break;
			case GenaParser.DataType:
			case GenaParser.Iden:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 91;
				this.nseIden();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nseModelProp(): NseModelPropContext {
		let _localctx: NseModelPropContext = new NseModelPropContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, GenaParser.RULE_nseModelProp);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 94;
			this.nseModelPropKey();
			this.state = 97;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GenaParser.T__2) {
				{
				this.state = 95;
				this.match(GenaParser.T__2);
				this.state = 96;
				this.nseModelPropVal();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nseModelPropKey(): NseModelPropKeyContext {
		let _localctx: NseModelPropKeyContext = new NseModelPropKeyContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, GenaParser.RULE_nseModelPropKey);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 99;
			this.nseIden();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nseModelPropVal(): NseModelPropValContext {
		let _localctx: NseModelPropValContext = new NseModelPropValContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, GenaParser.RULE_nseModelPropVal);
		try {
			this.state = 104;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case GenaParser.DataType:
			case GenaParser.Iden:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 101;
				this.nseIden();
				}
				break;
			case GenaParser.INT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 102;
				this.match(GenaParser.INT);
				}
				break;
			case GenaParser.FLOAT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 103;
				this.match(GenaParser.FLOAT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nseIden(): NseIdenContext {
		let _localctx: NseIdenContext = new NseIdenContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, GenaParser.RULE_nseIden);
		let _la: number;
		try {
			this.state = 115;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case GenaParser.DataType:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 106;
				this.match(GenaParser.DataType);
				}
				break;
			case GenaParser.Iden:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 107;
				this.match(GenaParser.Iden);
				this.state = 112;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === GenaParser.T__5) {
					{
					{
					this.state = 108;
					this.match(GenaParser.T__5);
					this.state = 109;
					this.match(GenaParser.Iden);
					}
					}
					this.state = 114;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nseCurly(): NseCurlyContext {
		let _localctx: NseCurlyContext = new NseCurlyContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, GenaParser.RULE_nseCurly);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 117;
			this.match(GenaParser.T__6);
			this.state = 126;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				this.state = 126;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case GenaParser.Copath:
					{
					this.state = 118;
					this.stmtCopath();
					}
					break;
				case GenaParser.Extends:
					{
					this.state = 119;
					this.stmtExtends();
					}
					break;
				case GenaParser.T__8:
					{
					this.state = 120;
					this.stmtInitializes();
					}
					break;
				case GenaParser.Caller:
					{
					this.state = 121;
					this.stmtCaller();
					}
					break;
				case GenaParser.Callinto:
					{
					this.state = 122;
					this.stmtCallinto();
					}
					break;
				case GenaParser.DataType:
				case GenaParser.Iden:
					{
					this.state = 123;
					this.stmtNse();
					this.state = 124;
					this.match(GenaParser.T__0);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 128;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << GenaParser.T__8) | (1 << GenaParser.Copath) | (1 << GenaParser.Extends) | (1 << GenaParser.Callinto) | (1 << GenaParser.Caller) | (1 << GenaParser.DataType) | (1 << GenaParser.Iden))) !== 0));
			this.state = 130;
			this.match(GenaParser.T__7);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmtCopath(): StmtCopathContext {
		let _localctx: StmtCopathContext = new StmtCopathContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, GenaParser.RULE_stmtCopath);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 132;
			this.match(GenaParser.Copath);
			this.state = 133;
			this.nseIden();
			this.state = 134;
			this.match(GenaParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmtExtends(): StmtExtendsContext {
		let _localctx: StmtExtendsContext = new StmtExtendsContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, GenaParser.RULE_stmtExtends);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 136;
			this.match(GenaParser.Extends);
			this.state = 137;
			this.nseIden();
			this.state = 142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GenaParser.T__1) {
				{
				{
				this.state = 138;
				this.match(GenaParser.T__1);
				this.state = 139;
				this.nseIden();
				}
				}
				this.state = 144;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 145;
			this.match(GenaParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmtInitializes(): StmtInitializesContext {
		let _localctx: StmtInitializesContext = new StmtInitializesContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, GenaParser.RULE_stmtInitializes);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 147;
			this.match(GenaParser.T__8);
			this.state = 148;
			this.nseIden();
			this.state = 153;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GenaParser.T__1) {
				{
				{
				this.state = 149;
				this.match(GenaParser.T__1);
				this.state = 150;
				this.nseIden();
				}
				}
				this.state = 155;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 156;
			this.match(GenaParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmtCaller(): StmtCallerContext {
		let _localctx: StmtCallerContext = new StmtCallerContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, GenaParser.RULE_stmtCaller);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 158;
			this.match(GenaParser.Caller);
			this.state = 159;
			this.eventPath();
			this.state = 160;
			this.match(GenaParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmtCallinto(): StmtCallintoContext {
		let _localctx: StmtCallintoContext = new StmtCallintoContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, GenaParser.RULE_stmtCallinto);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 162;
			this.match(GenaParser.Callinto);
			this.state = 163;
			this.eventPath();
			this.state = 164;
			this.match(GenaParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eventPath(): EventPathContext {
		let _localctx: EventPathContext = new EventPathContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, GenaParser.RULE_eventPath);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 166;
			this.eventSpec();
			this.state = 171;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === GenaParser.EvtPathConnector) {
				{
				{
				this.state = 167;
				this.match(GenaParser.EvtPathConnector);
				this.state = 168;
				this.eventSpec();
				}
				}
				this.state = 173;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eventSpec(): EventSpecContext {
		let _localctx: EventSpecContext = new EventSpecContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, GenaParser.RULE_eventSpec);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 174;
			this.eventName();
			this.state = 176;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GenaParser.T__3) {
				{
				this.state = 175;
				this.eventTargetArgs();
				}
			}

			this.state = 179;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === GenaParser.T__6 || _la === GenaParser.Callinto) {
				{
				this.state = 178;
				this.eventCurly();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eventName(): EventNameContext {
		let _localctx: EventNameContext = new EventNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, GenaParser.RULE_eventName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 181;
			this.match(GenaParser.Iden);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eventTargetArgs(): EventTargetArgsContext {
		let _localctx: EventTargetArgsContext = new EventTargetArgsContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, GenaParser.RULE_eventTargetArgs);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 183;
			this.match(GenaParser.T__3);
			this.state = 184;
			this.eventTarget();
			this.state = 185;
			this.match(GenaParser.T__4);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eventTarget(): EventTargetContext {
		let _localctx: EventTargetContext = new EventTargetContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, GenaParser.RULE_eventTarget);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 187;
			this.nseIden();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eventCurly(): EventCurlyContext {
		let _localctx: EventCurlyContext = new EventCurlyContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, GenaParser.RULE_eventCurly);
		try {
			this.state = 194;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case GenaParser.T__6:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 189;
				this.match(GenaParser.T__6);
				this.state = 190;
				this.stmtCaller();
				}
				break;
			case GenaParser.Callinto:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 191;
				this.stmtCallinto();
				this.state = 192;
				this.match(GenaParser.T__7);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03!\xC7\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x03" +
		"\x02\x06\x020\n\x02\r\x02\x0E\x021\x03\x03\x03\x03\x03\x04\x03\x04\x03" +
		"\x04\x03\x05\x03\x05\x03\x05\x07\x05<\n\x05\f\x05\x0E\x05?\v\x05\x03\x05" +
		"\x03\x05\x05\x05C\n\x05\x03\x05\x07\x05F\n\x05\f\x05\x0E\x05I\v\x05\x03" +
		"\x05\x05\x05L\n\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x07\x06S\n" +
		"\x06\f\x06\x0E\x06V\v\x06\x03\x06\x03\x06\x05\x06Z\n\x06\x03\x07\x03\x07" +
		"\x03\x07\x05\x07_\n\x07\x03\b\x03\b\x03\b\x05\bd\n\b\x03\t\x03\t\x03\n" +
		"\x03\n\x03\n\x05\nk\n\n\x03\v\x03\v\x03\v\x03\v\x07\vq\n\v\f\v\x0E\vt" +
		"\v\v\x05\vv\n\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f" +
		"\x06\f\x81\n\f\r\f\x0E\f\x82\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\x0E" +
		"\x03\x0E\x03\x0E\x03\x0E\x07\x0E\x8F\n\x0E\f\x0E\x0E\x0E\x92\v\x0E\x03" +
		"\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07\x0F\x9A\n\x0F\f\x0F\x0E" +
		"\x0F\x9D\v\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x11" +
		"\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x07\x12\xAC\n\x12\f\x12" +
		"\x0E\x12\xAF\v\x12\x03\x13\x03\x13\x05\x13\xB3\n\x13\x03\x13\x05\x13\xB6" +
		"\n\x13\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16" +
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x05\x17\xC5\n\x17\x03\x17\x02" +
		"\x02\x02\x18\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02" +
		"\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02" +
		"&\x02(\x02*\x02,\x02\x02\x02\x02\xCA\x02/\x03\x02\x02\x02\x043\x03\x02" +
		"\x02\x02\x065\x03\x02\x02\x02\b8\x03\x02\x02\x02\nM\x03\x02\x02\x02\f" +
		"^\x03\x02\x02\x02\x0E`\x03\x02\x02\x02\x10e\x03\x02\x02\x02\x12j\x03\x02" +
		"\x02\x02\x14u\x03\x02\x02\x02\x16w\x03\x02\x02\x02\x18\x86\x03\x02\x02" +
		"\x02\x1A\x8A\x03\x02\x02\x02\x1C\x95\x03\x02\x02\x02\x1E\xA0\x03\x02\x02" +
		"\x02 \xA4\x03\x02\x02\x02\"\xA8\x03\x02\x02\x02$\xB0\x03\x02\x02\x02&" +
		"\xB7\x03\x02\x02\x02(\xB9\x03\x02\x02\x02*\xBD\x03\x02\x02\x02,\xC4\x03" +
		"\x02\x02\x02.0\x05\x04\x03\x02/.\x03\x02\x02\x0201\x03\x02\x02\x021/\x03" +
		"\x02\x02\x0212\x03\x02\x02\x022\x03\x03\x02\x02\x0234\x05\x06\x04\x02" +
		"4\x05\x03\x02\x02\x0256\x05\b\x05\x0267\x07\x03\x02\x027\x07\x03\x02\x02" +
		"\x028=\x05\x14\v\x029:\x07\x04\x02\x02:<\x05\x14\v\x02;9\x03\x02\x02\x02" +
		"<?\x03\x02\x02\x02=;\x03\x02\x02\x02=>\x03\x02\x02\x02>B\x03\x02\x02\x02" +
		"?=\x03\x02\x02\x02@A\x07\x05\x02\x02AC\x05\n\x06\x02B@\x03\x02\x02\x02" +
		"BC\x03\x02\x02\x02CG\x03\x02\x02\x02DF\x05\n\x06\x02ED\x03\x02\x02\x02" +
		"FI\x03\x02\x02\x02GE\x03\x02\x02\x02GH\x03\x02\x02\x02HK\x03\x02\x02\x02" +
		"IG\x03\x02\x02\x02JL\x05\x16\f\x02KJ\x03\x02\x02\x02KL\x03\x02\x02\x02" +
		"L\t\x03\x02\x02\x02MY\x05\f\x07\x02NO\x07\x06\x02\x02OT\x05\x0E\b\x02" +
		"PQ\x07\x04\x02\x02QS\x05\x0E\b\x02RP\x03\x02\x02\x02SV\x03\x02\x02\x02" +
		"TR\x03\x02\x02\x02TU\x03\x02\x02\x02UW\x03\x02\x02\x02VT\x03\x02\x02\x02" +
		"WX\x07\x07\x02\x02XZ\x03\x02\x02\x02YN\x03\x02\x02\x02YZ\x03\x02\x02\x02" +
		"Z\v\x03\x02\x02\x02[_\x07\x16\x02\x02\\_\x07\x17\x02\x02]_\x05\x14\v\x02" +
		"^[\x03\x02\x02\x02^\\\x03\x02\x02\x02^]\x03\x02\x02\x02_\r\x03\x02\x02" +
		"\x02`c\x05\x10\t\x02ab\x07\x05\x02\x02bd\x05\x12\n\x02ca\x03\x02\x02\x02" +
		"cd\x03\x02\x02\x02d\x0F\x03\x02\x02\x02ef\x05\x14\v\x02f\x11\x03\x02\x02" +
		"\x02gk\x05\x14\v\x02hk\x07 \x02\x02ik\x07!\x02\x02jg\x03\x02\x02\x02j" +
		"h\x03\x02\x02\x02ji\x03\x02\x02\x02k\x13\x03\x02\x02\x02lv\x07\x1E\x02" +
		"\x02mr\x07\x1F\x02\x02no\x07\b\x02\x02oq\x07\x1F\x02\x02pn\x03\x02\x02" +
		"\x02qt\x03\x02\x02\x02rp\x03\x02\x02\x02rs\x03\x02\x02\x02sv\x03\x02\x02" +
		"\x02tr\x03\x02\x02\x02ul\x03\x02\x02\x02um\x03\x02\x02\x02v\x15\x03\x02" +
		"\x02\x02w\x80\x07\t\x02\x02x\x81\x05\x18\r\x02y\x81\x05\x1A\x0E\x02z\x81" +
		"\x05\x1C\x0F\x02{\x81\x05\x1E\x10\x02|\x81\x05 \x11\x02}~\x05\b\x05\x02" +
		"~\x7F\x07\x03\x02\x02\x7F\x81\x03\x02\x02\x02\x80x\x03\x02\x02\x02\x80" +
		"y\x03\x02\x02\x02\x80z\x03\x02\x02\x02\x80{\x03\x02\x02\x02\x80|\x03\x02" +
		"\x02\x02\x80}\x03\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82\x80\x03\x02" +
		"\x02\x02\x82\x83\x03\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84\x85\x07\n" +
		"\x02\x02\x85\x17\x03\x02\x02\x02\x86\x87\x07\x11\x02\x02\x87\x88\x05\x14" +
		"\v\x02\x88\x89\x07\x03\x02\x02\x89\x19\x03\x02\x02\x02\x8A\x8B\x07\x14" +
		"\x02\x02\x8B\x90\x05\x14\v\x02\x8C\x8D\x07\x04\x02\x02\x8D\x8F\x05\x14" +
		"\v\x02\x8E\x8C\x03\x02\x02\x02\x8F\x92\x03\x02\x02\x02\x90\x8E\x03\x02" +
		"\x02\x02\x90\x91\x03\x02\x02\x02\x91\x93\x03\x02\x02\x02\x92\x90\x03\x02" +
		"\x02\x02\x93\x94\x07\x03\x02\x02\x94\x1B\x03\x02\x02\x02\x95\x96\x07\v" +
		"\x02\x02\x96\x9B\x05\x14\v\x02\x97\x98\x07\x04\x02\x02\x98\x9A\x05\x14" +
		"\v\x02\x99\x97\x03\x02\x02\x02\x9A\x9D\x03\x02\x02\x02\x9B\x99\x03\x02" +
		"\x02\x02\x9B\x9C\x03\x02\x02\x02\x9C\x9E\x03\x02\x02\x02\x9D\x9B\x03\x02" +
		"\x02\x02\x9E\x9F\x07\x03\x02\x02\x9F\x1D\x03\x02\x02\x02\xA0\xA1\x07\x19" +
		"\x02\x02\xA1\xA2\x05\"\x12\x02\xA2\xA3\x07\x03\x02\x02\xA3\x1F\x03\x02" +
		"\x02\x02\xA4\xA5\x07\x18\x02\x02\xA5\xA6\x05\"\x12\x02\xA6\xA7\x07\x03" +
		"\x02\x02\xA7!\x03\x02\x02\x02\xA8\xAD\x05$\x13\x02\xA9\xAA\x07\x0E\x02" +
		"\x02\xAA\xAC\x05$\x13\x02\xAB\xA9\x03\x02\x02\x02\xAC\xAF\x03\x02\x02" +
		"\x02\xAD\xAB\x03\x02\x02\x02\xAD\xAE\x03\x02\x02\x02\xAE#\x03\x02\x02" +
		"\x02\xAF\xAD\x03\x02\x02\x02\xB0\xB2\x05&\x14\x02\xB1\xB3\x05(\x15\x02" +
		"\xB2\xB1\x03\x02\x02\x02\xB2\xB3\x03\x02\x02\x02\xB3\xB5\x03\x02\x02\x02" +
		"\xB4\xB6\x05,\x17\x02\xB5\xB4\x03\x02\x02\x02\xB5\xB6\x03\x02\x02\x02" +
		"\xB6%\x03\x02\x02\x02\xB7\xB8\x07\x1F\x02\x02\xB8\'\x03\x02\x02\x02\xB9" +
		"\xBA\x07\x06\x02\x02\xBA\xBB\x05*\x16\x02\xBB\xBC\x07\x07\x02\x02\xBC" +
		")\x03\x02\x02\x02\xBD\xBE\x05\x14\v\x02\xBE+\x03\x02\x02\x02\xBF\xC0\x07" +
		"\t\x02\x02\xC0\xC5\x05\x1E\x10\x02\xC1\xC2\x05 \x11\x02\xC2\xC3\x07\n" +
		"\x02\x02\xC3\xC5\x03\x02\x02\x02\xC4\xBF\x03\x02\x02\x02\xC4\xC1\x03\x02" +
		"\x02\x02\xC5-\x03\x02\x02\x02\x161=BGKTY^cjru\x80\x82\x90\x9B\xAD\xB2" +
		"\xB5\xC4";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!GenaParser.__ATN) {
			GenaParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(GenaParser._serializedATN));
		}

		return GenaParser.__ATN;
	}

}

export class DocContext extends ParserRuleContext {
	public docStmt(): DocStmtContext[];
	public docStmt(i: number): DocStmtContext;
	public docStmt(i?: number): DocStmtContext | DocStmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DocStmtContext);
		} else {
			return this.getRuleContext(i, DocStmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_doc; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterDoc) {
			listener.enterDoc(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitDoc) {
			listener.exitDoc(this);
		}
	}
}


export class DocStmtContext extends ParserRuleContext {
	public docStmtNse(): DocStmtNseContext {
		return this.getRuleContext(0, DocStmtNseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_docStmt; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterDocStmt) {
			listener.enterDocStmt(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitDocStmt) {
			listener.exitDocStmt(this);
		}
	}
}


export class DocStmtNseContext extends ParserRuleContext {
	public stmtNse(): StmtNseContext {
		return this.getRuleContext(0, StmtNseContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_docStmtNse; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterDocStmtNse) {
			listener.enterDocStmtNse(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitDocStmtNse) {
			listener.exitDocStmtNse(this);
		}
	}
}


export class StmtNseContext extends ParserRuleContext {
	public nseIden(): NseIdenContext[];
	public nseIden(i: number): NseIdenContext;
	public nseIden(i?: number): NseIdenContext | NseIdenContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NseIdenContext);
		} else {
			return this.getRuleContext(i, NseIdenContext);
		}
	}
	public nseModel(): NseModelContext[];
	public nseModel(i: number): NseModelContext;
	public nseModel(i?: number): NseModelContext | NseModelContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NseModelContext);
		} else {
			return this.getRuleContext(i, NseModelContext);
		}
	}
	public nseCurly(): NseCurlyContext | undefined {
		return this.tryGetRuleContext(0, NseCurlyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_stmtNse; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterStmtNse) {
			listener.enterStmtNse(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitStmtNse) {
			listener.exitStmtNse(this);
		}
	}
}


export class NseModelContext extends ParserRuleContext {
	public nseModelName(): NseModelNameContext {
		return this.getRuleContext(0, NseModelNameContext);
	}
	public nseModelProp(): NseModelPropContext[];
	public nseModelProp(i: number): NseModelPropContext;
	public nseModelProp(i?: number): NseModelPropContext | NseModelPropContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NseModelPropContext);
		} else {
			return this.getRuleContext(i, NseModelPropContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_nseModel; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterNseModel) {
			listener.enterNseModel(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitNseModel) {
			listener.exitNseModel(this);
		}
	}
}


export class NseModelNameContext extends ParserRuleContext {
	public Event(): TerminalNode | undefined { return this.tryGetToken(GenaParser.Event, 0); }
	public Param(): TerminalNode | undefined { return this.tryGetToken(GenaParser.Param, 0); }
	public nseIden(): NseIdenContext | undefined {
		return this.tryGetRuleContext(0, NseIdenContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_nseModelName; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterNseModelName) {
			listener.enterNseModelName(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitNseModelName) {
			listener.exitNseModelName(this);
		}
	}
}


export class NseModelPropContext extends ParserRuleContext {
	public nseModelPropKey(): NseModelPropKeyContext {
		return this.getRuleContext(0, NseModelPropKeyContext);
	}
	public nseModelPropVal(): NseModelPropValContext | undefined {
		return this.tryGetRuleContext(0, NseModelPropValContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_nseModelProp; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterNseModelProp) {
			listener.enterNseModelProp(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitNseModelProp) {
			listener.exitNseModelProp(this);
		}
	}
}


export class NseModelPropKeyContext extends ParserRuleContext {
	public nseIden(): NseIdenContext {
		return this.getRuleContext(0, NseIdenContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_nseModelPropKey; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterNseModelPropKey) {
			listener.enterNseModelPropKey(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitNseModelPropKey) {
			listener.exitNseModelPropKey(this);
		}
	}
}


export class NseModelPropValContext extends ParserRuleContext {
	public nseIden(): NseIdenContext | undefined {
		return this.tryGetRuleContext(0, NseIdenContext);
	}
	public INT(): TerminalNode | undefined { return this.tryGetToken(GenaParser.INT, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(GenaParser.FLOAT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_nseModelPropVal; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterNseModelPropVal) {
			listener.enterNseModelPropVal(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitNseModelPropVal) {
			listener.exitNseModelPropVal(this);
		}
	}
}


export class NseIdenContext extends ParserRuleContext {
	public DataType(): TerminalNode | undefined { return this.tryGetToken(GenaParser.DataType, 0); }
	public Iden(): TerminalNode[];
	public Iden(i: number): TerminalNode;
	public Iden(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GenaParser.Iden);
		} else {
			return this.getToken(GenaParser.Iden, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_nseIden; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterNseIden) {
			listener.enterNseIden(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitNseIden) {
			listener.exitNseIden(this);
		}
	}
}


export class NseCurlyContext extends ParserRuleContext {
	public stmtCopath(): StmtCopathContext[];
	public stmtCopath(i: number): StmtCopathContext;
	public stmtCopath(i?: number): StmtCopathContext | StmtCopathContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StmtCopathContext);
		} else {
			return this.getRuleContext(i, StmtCopathContext);
		}
	}
	public stmtExtends(): StmtExtendsContext[];
	public stmtExtends(i: number): StmtExtendsContext;
	public stmtExtends(i?: number): StmtExtendsContext | StmtExtendsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StmtExtendsContext);
		} else {
			return this.getRuleContext(i, StmtExtendsContext);
		}
	}
	public stmtInitializes(): StmtInitializesContext[];
	public stmtInitializes(i: number): StmtInitializesContext;
	public stmtInitializes(i?: number): StmtInitializesContext | StmtInitializesContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StmtInitializesContext);
		} else {
			return this.getRuleContext(i, StmtInitializesContext);
		}
	}
	public stmtCaller(): StmtCallerContext[];
	public stmtCaller(i: number): StmtCallerContext;
	public stmtCaller(i?: number): StmtCallerContext | StmtCallerContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StmtCallerContext);
		} else {
			return this.getRuleContext(i, StmtCallerContext);
		}
	}
	public stmtCallinto(): StmtCallintoContext[];
	public stmtCallinto(i: number): StmtCallintoContext;
	public stmtCallinto(i?: number): StmtCallintoContext | StmtCallintoContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StmtCallintoContext);
		} else {
			return this.getRuleContext(i, StmtCallintoContext);
		}
	}
	public stmtNse(): StmtNseContext[];
	public stmtNse(i: number): StmtNseContext;
	public stmtNse(i?: number): StmtNseContext | StmtNseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StmtNseContext);
		} else {
			return this.getRuleContext(i, StmtNseContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_nseCurly; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterNseCurly) {
			listener.enterNseCurly(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitNseCurly) {
			listener.exitNseCurly(this);
		}
	}
}


export class StmtCopathContext extends ParserRuleContext {
	public Copath(): TerminalNode { return this.getToken(GenaParser.Copath, 0); }
	public nseIden(): NseIdenContext {
		return this.getRuleContext(0, NseIdenContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_stmtCopath; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterStmtCopath) {
			listener.enterStmtCopath(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitStmtCopath) {
			listener.exitStmtCopath(this);
		}
	}
}


export class StmtExtendsContext extends ParserRuleContext {
	public Extends(): TerminalNode { return this.getToken(GenaParser.Extends, 0); }
	public nseIden(): NseIdenContext[];
	public nseIden(i: number): NseIdenContext;
	public nseIden(i?: number): NseIdenContext | NseIdenContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NseIdenContext);
		} else {
			return this.getRuleContext(i, NseIdenContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_stmtExtends; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterStmtExtends) {
			listener.enterStmtExtends(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitStmtExtends) {
			listener.exitStmtExtends(this);
		}
	}
}


export class StmtInitializesContext extends ParserRuleContext {
	public nseIden(): NseIdenContext[];
	public nseIden(i: number): NseIdenContext;
	public nseIden(i?: number): NseIdenContext | NseIdenContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NseIdenContext);
		} else {
			return this.getRuleContext(i, NseIdenContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_stmtInitializes; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterStmtInitializes) {
			listener.enterStmtInitializes(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitStmtInitializes) {
			listener.exitStmtInitializes(this);
		}
	}
}


export class StmtCallerContext extends ParserRuleContext {
	public Caller(): TerminalNode { return this.getToken(GenaParser.Caller, 0); }
	public eventPath(): EventPathContext {
		return this.getRuleContext(0, EventPathContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_stmtCaller; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterStmtCaller) {
			listener.enterStmtCaller(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitStmtCaller) {
			listener.exitStmtCaller(this);
		}
	}
}


export class StmtCallintoContext extends ParserRuleContext {
	public Callinto(): TerminalNode { return this.getToken(GenaParser.Callinto, 0); }
	public eventPath(): EventPathContext {
		return this.getRuleContext(0, EventPathContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_stmtCallinto; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterStmtCallinto) {
			listener.enterStmtCallinto(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitStmtCallinto) {
			listener.exitStmtCallinto(this);
		}
	}
}


export class EventPathContext extends ParserRuleContext {
	public eventSpec(): EventSpecContext[];
	public eventSpec(i: number): EventSpecContext;
	public eventSpec(i?: number): EventSpecContext | EventSpecContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EventSpecContext);
		} else {
			return this.getRuleContext(i, EventSpecContext);
		}
	}
	public EvtPathConnector(): TerminalNode[];
	public EvtPathConnector(i: number): TerminalNode;
	public EvtPathConnector(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(GenaParser.EvtPathConnector);
		} else {
			return this.getToken(GenaParser.EvtPathConnector, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_eventPath; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterEventPath) {
			listener.enterEventPath(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitEventPath) {
			listener.exitEventPath(this);
		}
	}
}


export class EventSpecContext extends ParserRuleContext {
	public eventName(): EventNameContext {
		return this.getRuleContext(0, EventNameContext);
	}
	public eventTargetArgs(): EventTargetArgsContext | undefined {
		return this.tryGetRuleContext(0, EventTargetArgsContext);
	}
	public eventCurly(): EventCurlyContext | undefined {
		return this.tryGetRuleContext(0, EventCurlyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_eventSpec; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterEventSpec) {
			listener.enterEventSpec(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitEventSpec) {
			listener.exitEventSpec(this);
		}
	}
}


export class EventNameContext extends ParserRuleContext {
	public Iden(): TerminalNode { return this.getToken(GenaParser.Iden, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_eventName; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterEventName) {
			listener.enterEventName(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitEventName) {
			listener.exitEventName(this);
		}
	}
}


export class EventTargetArgsContext extends ParserRuleContext {
	public eventTarget(): EventTargetContext {
		return this.getRuleContext(0, EventTargetContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_eventTargetArgs; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterEventTargetArgs) {
			listener.enterEventTargetArgs(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitEventTargetArgs) {
			listener.exitEventTargetArgs(this);
		}
	}
}


export class EventTargetContext extends ParserRuleContext {
	public nseIden(): NseIdenContext {
		return this.getRuleContext(0, NseIdenContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_eventTarget; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterEventTarget) {
			listener.enterEventTarget(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitEventTarget) {
			listener.exitEventTarget(this);
		}
	}
}


export class EventCurlyContext extends ParserRuleContext {
	public stmtCaller(): StmtCallerContext | undefined {
		return this.tryGetRuleContext(0, StmtCallerContext);
	}
	public stmtCallinto(): StmtCallintoContext | undefined {
		return this.tryGetRuleContext(0, StmtCallintoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return GenaParser.RULE_eventCurly; }
	// @Override
	public enterRule(listener: GenaListener): void {
		if (listener.enterEventCurly) {
			listener.enterEventCurly(this);
		}
	}
	// @Override
	public exitRule(listener: GenaListener): void {
		if (listener.exitEventCurly) {
			listener.exitEventCurly(this);
		}
	}
}



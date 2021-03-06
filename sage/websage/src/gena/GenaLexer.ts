// Generated from websage/src/gena/Gena.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class GenaLexer extends Lexer {
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

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"WS", "Comment", "EvtPathConnector", "OPCHAR", "Noid", "Copath", "Class", 
		"Data", "Extends", "Nary", "Event", "Param", "Callinto", "Caller", "Belongsto", 
		"PiggyAfter", "PiggyInto", "PiggyBefore", "DataType", "Iden", "INT", "FLOAT", 
		"EXPONENT",
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
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(GenaLexer._LITERAL_NAMES, GenaLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return GenaLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(GenaLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "Gena.g4"; }

	// @Override
	public get ruleNames(): string[] { return GenaLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return GenaLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return GenaLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return GenaLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02!\u0127\b\x01" +
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t" +
		"\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t" +
		"\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x03\x02" +
		"\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06" +
		"\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n" +
		"\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\v\x06\va\n\v\r\v\x0E\v" +
		"b\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x07\fl\n\f\f\f\x0E\fo\v\f" +
		"\x03\f\x03\f\x03\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10" +
		"\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13" +
		"\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15" +
		"\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x19\x03\x19" +
		"\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x1A" +
		"\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x03\x1A" +
		"\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C" +
		"\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D" +
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D" +
		"\xEF\n\x1D\x03\x1E\x03\x1E\x07\x1E\xF3\n\x1E\f\x1E\x0E\x1E\xF6\v\x1E\x03" +
		"\x1F\x06\x1F\xF9\n\x1F\r\x1F\x0E\x1F\xFA\x03 \x06 \xFE\n \r \x0E \xFF" +
		"\x03 \x03 \x07 \u0104\n \f \x0E \u0107\v \x03 \x05 \u010A\n \x03 \x03" +
		" \x06 \u010E\n \r \x0E \u010F\x03 \x05 \u0113\n \x03 \x06 \u0116\n \r" +
		" \x0E \u0117\x03 \x05 \u011B\n \x05 \u011D\n \x03!\x03!\x05!\u0121\n!" +
		"\x03!\x06!\u0124\n!\r!\x0E!\u0125\x02\x02\x02\"\x03\x02\x03\x05\x02\x04" +
		"\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v" +
		"\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02\x11!" +
		"\x02\x12#\x02\x13%\x02\x14\'\x02\x15)\x02\x16+\x02\x17-\x02\x18/\x02\x19" +
		"1\x02\x1A3\x02\x1B5\x02\x1C7\x02\x1D9\x02\x1E;\x02\x1F=\x02 ?\x02!A\x02" +
		"\x02\x03\x02\n\x05\x02\v\f\x0F\x0F\"\"\x04\x02\f\f\x0F\x0F\t\x02*1<>@" +
		"@]]__}}\x7F\x7F\x05\x02C\\aac|\x06\x022;C\\aac|\x03\x022;\x04\x02GGgg" +
		"\x04\x02--//\x02\u0135\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02" +
		"\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02" +
		"\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02" +
		"\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02" +
		"\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02" +
		"\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03\x02\x02\x02\x02%\x03" +
		"\x02\x02\x02\x02\'\x03\x02\x02\x02\x02)\x03\x02\x02\x02\x02+\x03\x02\x02" +
		"\x02\x02-\x03\x02\x02\x02\x02/\x03\x02\x02\x02\x021\x03\x02\x02\x02\x02" +
		"3\x03\x02\x02\x02\x025\x03\x02\x02\x02\x027\x03\x02\x02\x02\x029\x03\x02" +
		"\x02\x02\x02;\x03\x02\x02\x02\x02=\x03\x02\x02\x02\x02?\x03\x02\x02\x02" +
		"\x03C\x03\x02\x02\x02\x05E\x03\x02\x02\x02\x07G\x03\x02\x02\x02\tI\x03" +
		"\x02\x02\x02\vK\x03\x02\x02\x02\rM\x03\x02\x02\x02\x0FO\x03\x02\x02\x02" +
		"\x11Q\x03\x02\x02\x02\x13S\x03\x02\x02\x02\x15`\x03\x02\x02\x02\x17f\x03" +
		"\x02\x02\x02\x19r\x03\x02\x02\x02\x1Bu\x03\x02\x02\x02\x1Dw\x03\x02\x02" +
		"\x02\x1F|\x03\x02\x02\x02!\x83\x03\x02\x02\x02#\x89\x03\x02\x02\x02%\x8E" +
		"\x03\x02\x02\x02\'\x96\x03\x02\x02\x02)\x9B\x03\x02\x02\x02+\xA1\x03\x02" +
		"\x02\x02-\xA7\x03\x02\x02\x02/\xB0\x03\x02\x02\x021\xB7\x03\x02\x02\x02" +
		"3\xC1\x03\x02\x02\x025\xCC\x03\x02\x02\x027\xD6\x03\x02\x02\x029\xEE\x03" +
		"\x02\x02\x02;\xF0\x03\x02\x02\x02=\xF8\x03\x02\x02\x02?\u011C\x03\x02" +
		"\x02\x02A\u011E\x03\x02\x02\x02CD\x07=\x02\x02D\x04\x03\x02\x02\x02EF" +
		"\x07.\x02\x02F\x06\x03\x02\x02\x02GH\x07<\x02\x02H\b\x03\x02\x02\x02I" +
		"J\x07*\x02\x02J\n\x03\x02\x02\x02KL\x07+\x02\x02L\f\x03\x02\x02\x02MN" +
		"\x070\x02\x02N\x0E\x03\x02\x02\x02OP\x07}\x02\x02P\x10\x03\x02\x02\x02" +
		"QR\x07\x7F\x02\x02R\x12\x03\x02\x02\x02ST\x07k\x02\x02TU\x07p\x02\x02" +
		"UV\x07k\x02\x02VW\x07v\x02\x02WX\x07k\x02\x02XY\x07c\x02\x02YZ\x07n\x02" +
		"\x02Z[\x07k\x02\x02[\\\x07|\x02\x02\\]\x07g\x02\x02]^\x07u\x02\x02^\x14" +
		"\x03\x02\x02\x02_a\t\x02\x02\x02`_\x03\x02\x02\x02ab\x03\x02\x02\x02b" +
		"`\x03\x02\x02\x02bc\x03\x02\x02\x02cd\x03\x02\x02\x02de\b\v\x02\x02e\x16" +
		"\x03\x02\x02\x02fg\x07%\x02\x02gh\x07%\x02\x02hi\x07%\x02\x02im\x03\x02" +
		"\x02\x02jl\n\x03\x02\x02kj\x03\x02\x02\x02lo\x03\x02\x02\x02mk\x03\x02" +
		"\x02\x02mn\x03\x02\x02\x02np\x03\x02\x02\x02om\x03\x02\x02\x02pq\b\f\x02" +
		"\x02q\x18\x03\x02\x02\x02rs\x07/\x02\x02st\x07@\x02\x02t\x1A\x03\x02\x02" +
		"\x02uv\t\x04\x02\x02v\x1C\x03\x02\x02\x02wx\x07p\x02\x02xy\x07q\x02\x02" +
		"yz\x07k\x02\x02z{\x07f\x02\x02{\x1E\x03\x02\x02\x02|}\x07e\x02\x02}~\x07" +
		"q\x02\x02~\x7F\x07r\x02\x02\x7F\x80\x07c\x02\x02\x80\x81\x07v\x02\x02" +
		"\x81\x82\x07j\x02\x02\x82 \x03\x02\x02\x02\x83\x84\x07e\x02\x02\x84\x85" +
		"\x07n\x02\x02\x85\x86\x07c\x02\x02\x86\x87\x07u\x02\x02\x87\x88\x07u\x02" +
		"\x02\x88\"\x03\x02\x02\x02\x89\x8A\x07f\x02\x02\x8A\x8B\x07c\x02\x02\x8B" +
		"\x8C\x07v\x02\x02\x8C\x8D\x07c\x02\x02\x8D$\x03\x02\x02\x02\x8E\x8F\x07" +
		"g\x02\x02\x8F\x90\x07z\x02\x02\x90\x91\x07v\x02\x02\x91\x92\x07g\x02\x02" +
		"\x92\x93\x07p\x02\x02\x93\x94\x07f\x02\x02\x94\x95\x07u\x02\x02\x95&\x03" +
		"\x02\x02\x02\x96\x97\x07p\x02\x02\x97\x98\x07c\x02\x02\x98\x99\x07t\x02" +
		"\x02\x99\x9A\x07{\x02\x02\x9A(\x03\x02\x02\x02\x9B\x9C\x07g\x02\x02\x9C" +
		"\x9D\x07x\x02\x02\x9D\x9E\x07g\x02\x02\x9E\x9F\x07p\x02\x02\x9F\xA0\x07" +
		"v\x02\x02\xA0*\x03\x02\x02\x02\xA1\xA2\x07r\x02\x02\xA2\xA3\x07c\x02\x02" +
		"\xA3\xA4\x07t\x02\x02\xA4\xA5\x07c\x02\x02\xA5\xA6\x07o\x02\x02\xA6,\x03" +
		"\x02\x02\x02\xA7\xA8\x07e\x02\x02\xA8\xA9\x07c\x02\x02\xA9\xAA\x07n\x02" +
		"\x02\xAA\xAB\x07n\x02\x02\xAB\xAC\x07k\x02\x02\xAC\xAD\x07p\x02\x02\xAD" +
		"\xAE\x07v\x02\x02\xAE\xAF\x07q\x02\x02\xAF.\x03\x02\x02\x02\xB0\xB1\x07" +
		"e\x02\x02\xB1\xB2\x07c\x02\x02\xB2\xB3\x07n\x02\x02\xB3\xB4\x07n\x02\x02" +
		"\xB4\xB5\x07g\x02\x02\xB5\xB6\x07t\x02\x02\xB60\x03\x02\x02\x02\xB7\xB8" +
		"\x07d\x02\x02\xB8\xB9\x07g\x02\x02\xB9\xBA\x07n\x02\x02\xBA\xBB\x07q\x02" +
		"\x02\xBB\xBC\x07p\x02\x02\xBC\xBD\x07i\x02\x02\xBD\xBE\x07u\x02\x02\xBE" +
		"\xBF\x07v\x02\x02\xBF\xC0\x07q\x02\x02\xC02\x03\x02\x02\x02\xC1\xC2\x07" +
		"r\x02\x02\xC2\xC3\x07k\x02\x02\xC3\xC4\x07i\x02\x02\xC4\xC5\x07i\x02\x02" +
		"\xC5\xC6\x07{\x02\x02\xC6\xC7\x07c\x02\x02\xC7\xC8\x07h\x02\x02\xC8\xC9" +
		"\x07v\x02\x02\xC9\xCA\x07g\x02\x02\xCA\xCB\x07t\x02\x02\xCB4\x03\x02\x02" +
		"\x02\xCC\xCD\x07r\x02\x02\xCD\xCE\x07k\x02\x02\xCE\xCF\x07i\x02\x02\xCF" +
		"\xD0\x07i\x02\x02\xD0\xD1\x07{\x02\x02\xD1\xD2\x07k\x02\x02\xD2\xD3\x07" +
		"p\x02\x02\xD3\xD4\x07v\x02\x02\xD4\xD5\x07q\x02\x02\xD56\x03\x02\x02\x02" +
		"\xD6\xD7\x07r\x02\x02\xD7\xD8\x07k\x02\x02\xD8\xD9\x07i\x02\x02\xD9\xDA" +
		"\x07i\x02\x02\xDA\xDB\x07{\x02\x02\xDB\xDC\x07d\x02\x02\xDC\xDD\x07g\x02" +
		"\x02\xDD\xDE\x07h\x02\x02\xDE\xDF\x07q\x02\x02\xDF\xE0\x07t\x02\x02\xE0" +
		"\xE1\x07g\x02\x02\xE18\x03\x02\x02\x02\xE2\xE3\x07h\x02\x02\xE3\xE4\x07" +
		"n\x02\x02\xE4\xE5\x07q\x02\x02\xE5\xE6\x07c\x02\x02\xE6\xE7\x07v\x02\x02" +
		"\xE7\xE8\x075\x02\x02\xE8\xEF\x074\x02\x02\xE9\xEA\x07k\x02\x02\xEA\xEB" +
		"\x07p\x02\x02\xEB\xEC\x07v\x02\x02\xEC\xED\x075\x02\x02\xED\xEF\x074\x02" +
		"\x02\xEE\xE2\x03\x02\x02\x02\xEE\xE9\x03\x02\x02\x02\xEF:\x03\x02\x02" +
		"\x02\xF0\xF4\t\x05\x02\x02\xF1\xF3\t\x06\x02\x02\xF2\xF1\x03\x02\x02\x02" +
		"\xF3\xF6\x03\x02\x02\x02\xF4\xF2\x03\x02\x02\x02\xF4\xF5\x03\x02\x02\x02" +
		"\xF5<\x03\x02\x02\x02\xF6\xF4\x03\x02\x02\x02\xF7\xF9\t\x07\x02\x02\xF8" +
		"\xF7\x03\x02\x02\x02\xF9\xFA\x03\x02\x02\x02\xFA\xF8\x03\x02\x02\x02\xFA" +
		"\xFB\x03\x02\x02\x02\xFB>\x03\x02\x02\x02\xFC\xFE\t\x07\x02\x02\xFD\xFC" +
		"\x03\x02\x02\x02\xFE\xFF\x03\x02\x02\x02\xFF\xFD\x03\x02\x02\x02\xFF\u0100" +
		"\x03\x02\x02\x02\u0100\u0101\x03\x02\x02\x02\u0101\u0105\x070\x02\x02" +
		"\u0102\u0104\t\x07\x02\x02\u0103\u0102\x03\x02\x02\x02\u0104\u0107\x03" +
		"\x02\x02\x02\u0105\u0103\x03\x02\x02\x02\u0105\u0106\x03\x02\x02\x02\u0106" +
		"\u0109\x03\x02\x02\x02\u0107\u0105\x03\x02\x02\x02\u0108\u010A\x05A!\x02" +
		"\u0109\u0108\x03\x02\x02\x02\u0109\u010A\x03\x02\x02\x02\u010A\u011D\x03" +
		"\x02\x02\x02\u010B\u010D\x070\x02\x02\u010C\u010E\t\x07\x02\x02\u010D" +
		"\u010C\x03\x02\x02\x02\u010E\u010F\x03\x02\x02\x02\u010F\u010D\x03\x02" +
		"\x02\x02\u010F\u0110\x03\x02\x02\x02\u0110\u0112\x03\x02\x02\x02\u0111" +
		"\u0113\x05A!\x02\u0112\u0111\x03\x02\x02\x02\u0112\u0113\x03\x02\x02\x02" +
		"\u0113\u011D\x03\x02\x02\x02\u0114\u0116\t\x07\x02\x02\u0115\u0114\x03" +
		"\x02\x02\x02\u0116\u0117\x03\x02\x02\x02\u0117\u0115\x03\x02\x02\x02\u0117" +
		"\u0118\x03\x02\x02\x02\u0118\u011A\x03\x02\x02\x02\u0119\u011B\x05A!\x02" +
		"\u011A\u0119\x03\x02\x02\x02\u011A\u011B\x03\x02\x02\x02\u011B\u011D\x03" +
		"\x02\x02\x02\u011C\xFD\x03\x02\x02\x02\u011C\u010B\x03\x02\x02\x02\u011C" +
		"\u0115\x03\x02\x02\x02\u011D@\x03\x02\x02\x02\u011E\u0120\t\b\x02\x02" +
		"\u011F\u0121\t\t\x02\x02\u0120\u011F\x03\x02\x02\x02\u0120\u0121\x03\x02" +
		"\x02\x02\u0121\u0123\x03\x02\x02\x02\u0122\u0124\x042;\x02\u0123\u0122" +
		"\x03\x02\x02\x02\u0124\u0125\x03\x02\x02\x02\u0125\u0123\x03\x02\x02\x02" +
		"\u0125\u0126\x03\x02\x02\x02\u0126B\x03\x02\x02\x02\x12\x02bm\xEE\xF4" +
		"\xFA\xFF\u0105\u0109\u010F\u0112\u0117\u011A\u011C\u0120\u0125\x03\b\x02" +
		"\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!GenaLexer.__ATN) {
			GenaLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(GenaLexer._serializedATN));
		}

		return GenaLexer.__ATN;
	}

}


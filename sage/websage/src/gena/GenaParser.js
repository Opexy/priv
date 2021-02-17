// Generated from Gena.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';
import GenaListener from './GenaListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003!\u00c7\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017",
    "\u0003\u0002\u0006\u00020\n\u0002\r\u0002\u000e\u00021\u0003\u0003\u0003",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0007\u0005<\n\u0005\f\u0005\u000e\u0005?\u000b\u0005\u0003\u0005",
    "\u0003\u0005\u0005\u0005C\n\u0005\u0003\u0005\u0007\u0005F\n\u0005\f",
    "\u0005\u000e\u0005I\u000b\u0005\u0003\u0005\u0005\u0005L\n\u0005\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u0006S",
    "\n\u0006\f\u0006\u000e\u0006V\u000b\u0006\u0003\u0006\u0003\u0006\u0005",
    "\u0006Z\n\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0005\u0007_\n\u0007",
    "\u0003\b\u0003\b\u0003\b\u0005\bd\n\b\u0003\t\u0003\t\u0003\n\u0003",
    "\n\u0003\n\u0005\nk\n\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0007\u000bq\n\u000b\f\u000b\u000e\u000bt\u000b\u000b\u0005\u000bv",
    "\n\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0006\f\u0081\n\f\r\f\u000e\f\u0082\u0003\f\u0003\f\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0007\u000e\u008f\n\u000e\f\u000e\u000e\u000e\u0092\u000b\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f",
    "\u0007\u000f\u009a\n\u000f\f\u000f\u000e\u000f\u009d\u000b\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003",
    "\u0012\u0007\u0012\u00ac\n\u0012\f\u0012\u000e\u0012\u00af\u000b\u0012",
    "\u0003\u0013\u0003\u0013\u0005\u0013\u00b3\n\u0013\u0003\u0013\u0005",
    "\u0013\u00b6\n\u0013\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015",
    "\u0003\u0015\u0003\u0015\u0003\u0016\u0003\u0016\u0003\u0017\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0005\u0017\u00c5\n\u0017\u0003",
    "\u0017\u0002\u0002\u0018\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014",
    "\u0016\u0018\u001a\u001c\u001e \"$&(*,\u0002\u0002\u0002\u00ca\u0002",
    "/\u0003\u0002\u0002\u0002\u00043\u0003\u0002\u0002\u0002\u00065\u0003",
    "\u0002\u0002\u0002\b8\u0003\u0002\u0002\u0002\nM\u0003\u0002\u0002\u0002",
    "\f^\u0003\u0002\u0002\u0002\u000e`\u0003\u0002\u0002\u0002\u0010e\u0003",
    "\u0002\u0002\u0002\u0012j\u0003\u0002\u0002\u0002\u0014u\u0003\u0002",
    "\u0002\u0002\u0016w\u0003\u0002\u0002\u0002\u0018\u0086\u0003\u0002",
    "\u0002\u0002\u001a\u008a\u0003\u0002\u0002\u0002\u001c\u0095\u0003\u0002",
    "\u0002\u0002\u001e\u00a0\u0003\u0002\u0002\u0002 \u00a4\u0003\u0002",
    "\u0002\u0002\"\u00a8\u0003\u0002\u0002\u0002$\u00b0\u0003\u0002\u0002",
    "\u0002&\u00b7\u0003\u0002\u0002\u0002(\u00b9\u0003\u0002\u0002\u0002",
    "*\u00bd\u0003\u0002\u0002\u0002,\u00c4\u0003\u0002\u0002\u0002.0\u0005",
    "\u0004\u0003\u0002/.\u0003\u0002\u0002\u000201\u0003\u0002\u0002\u0002",
    "1/\u0003\u0002\u0002\u000212\u0003\u0002\u0002\u00022\u0003\u0003\u0002",
    "\u0002\u000234\u0005\u0006\u0004\u00024\u0005\u0003\u0002\u0002\u0002",
    "56\u0005\b\u0005\u000267\u0007\u0003\u0002\u00027\u0007\u0003\u0002",
    "\u0002\u00028=\u0005\u0014\u000b\u00029:\u0007\u0004\u0002\u0002:<\u0005",
    "\u0014\u000b\u0002;9\u0003\u0002\u0002\u0002<?\u0003\u0002\u0002\u0002",
    "=;\u0003\u0002\u0002\u0002=>\u0003\u0002\u0002\u0002>B\u0003\u0002\u0002",
    "\u0002?=\u0003\u0002\u0002\u0002@A\u0007\u0005\u0002\u0002AC\u0005\n",
    "\u0006\u0002B@\u0003\u0002\u0002\u0002BC\u0003\u0002\u0002\u0002CG\u0003",
    "\u0002\u0002\u0002DF\u0005\n\u0006\u0002ED\u0003\u0002\u0002\u0002F",
    "I\u0003\u0002\u0002\u0002GE\u0003\u0002\u0002\u0002GH\u0003\u0002\u0002",
    "\u0002HK\u0003\u0002\u0002\u0002IG\u0003\u0002\u0002\u0002JL\u0005\u0016",
    "\f\u0002KJ\u0003\u0002\u0002\u0002KL\u0003\u0002\u0002\u0002L\t\u0003",
    "\u0002\u0002\u0002MY\u0005\f\u0007\u0002NO\u0007\u0006\u0002\u0002O",
    "T\u0005\u000e\b\u0002PQ\u0007\u0004\u0002\u0002QS\u0005\u000e\b\u0002",
    "RP\u0003\u0002\u0002\u0002SV\u0003\u0002\u0002\u0002TR\u0003\u0002\u0002",
    "\u0002TU\u0003\u0002\u0002\u0002UW\u0003\u0002\u0002\u0002VT\u0003\u0002",
    "\u0002\u0002WX\u0007\u0007\u0002\u0002XZ\u0003\u0002\u0002\u0002YN\u0003",
    "\u0002\u0002\u0002YZ\u0003\u0002\u0002\u0002Z\u000b\u0003\u0002\u0002",
    "\u0002[_\u0007\u0016\u0002\u0002\\_\u0007\u0017\u0002\u0002]_\u0005",
    "\u0014\u000b\u0002^[\u0003\u0002\u0002\u0002^\\\u0003\u0002\u0002\u0002",
    "^]\u0003\u0002\u0002\u0002_\r\u0003\u0002\u0002\u0002`c\u0005\u0010",
    "\t\u0002ab\u0007\u0005\u0002\u0002bd\u0005\u0012\n\u0002ca\u0003\u0002",
    "\u0002\u0002cd\u0003\u0002\u0002\u0002d\u000f\u0003\u0002\u0002\u0002",
    "ef\u0005\u0014\u000b\u0002f\u0011\u0003\u0002\u0002\u0002gk\u0005\u0014",
    "\u000b\u0002hk\u0007 \u0002\u0002ik\u0007!\u0002\u0002jg\u0003\u0002",
    "\u0002\u0002jh\u0003\u0002\u0002\u0002ji\u0003\u0002\u0002\u0002k\u0013",
    "\u0003\u0002\u0002\u0002lv\u0007\u001e\u0002\u0002mr\u0007\u001f\u0002",
    "\u0002no\u0007\b\u0002\u0002oq\u0007\u001f\u0002\u0002pn\u0003\u0002",
    "\u0002\u0002qt\u0003\u0002\u0002\u0002rp\u0003\u0002\u0002\u0002rs\u0003",
    "\u0002\u0002\u0002sv\u0003\u0002\u0002\u0002tr\u0003\u0002\u0002\u0002",
    "ul\u0003\u0002\u0002\u0002um\u0003\u0002\u0002\u0002v\u0015\u0003\u0002",
    "\u0002\u0002w\u0080\u0007\t\u0002\u0002x\u0081\u0005\u0018\r\u0002y",
    "\u0081\u0005\u001a\u000e\u0002z\u0081\u0005\u001c\u000f\u0002{\u0081",
    "\u0005\u001e\u0010\u0002|\u0081\u0005 \u0011\u0002}~\u0005\b\u0005\u0002",
    "~\u007f\u0007\u0003\u0002\u0002\u007f\u0081\u0003\u0002\u0002\u0002",
    "\u0080x\u0003\u0002\u0002\u0002\u0080y\u0003\u0002\u0002\u0002\u0080",
    "z\u0003\u0002\u0002\u0002\u0080{\u0003\u0002\u0002\u0002\u0080|\u0003",
    "\u0002\u0002\u0002\u0080}\u0003\u0002\u0002\u0002\u0081\u0082\u0003",
    "\u0002\u0002\u0002\u0082\u0080\u0003\u0002\u0002\u0002\u0082\u0083\u0003",
    "\u0002\u0002\u0002\u0083\u0084\u0003\u0002\u0002\u0002\u0084\u0085\u0007",
    "\n\u0002\u0002\u0085\u0017\u0003\u0002\u0002\u0002\u0086\u0087\u0007",
    "\u0011\u0002\u0002\u0087\u0088\u0005\u0014\u000b\u0002\u0088\u0089\u0007",
    "\u0003\u0002\u0002\u0089\u0019\u0003\u0002\u0002\u0002\u008a\u008b\u0007",
    "\u0014\u0002\u0002\u008b\u0090\u0005\u0014\u000b\u0002\u008c\u008d\u0007",
    "\u0004\u0002\u0002\u008d\u008f\u0005\u0014\u000b\u0002\u008e\u008c\u0003",
    "\u0002\u0002\u0002\u008f\u0092\u0003\u0002\u0002\u0002\u0090\u008e\u0003",
    "\u0002\u0002\u0002\u0090\u0091\u0003\u0002\u0002\u0002\u0091\u0093\u0003",
    "\u0002\u0002\u0002\u0092\u0090\u0003\u0002\u0002\u0002\u0093\u0094\u0007",
    "\u0003\u0002\u0002\u0094\u001b\u0003\u0002\u0002\u0002\u0095\u0096\u0007",
    "\u000b\u0002\u0002\u0096\u009b\u0005\u0014\u000b\u0002\u0097\u0098\u0007",
    "\u0004\u0002\u0002\u0098\u009a\u0005\u0014\u000b\u0002\u0099\u0097\u0003",
    "\u0002\u0002\u0002\u009a\u009d\u0003\u0002\u0002\u0002\u009b\u0099\u0003",
    "\u0002\u0002\u0002\u009b\u009c\u0003\u0002\u0002\u0002\u009c\u009e\u0003",
    "\u0002\u0002\u0002\u009d\u009b\u0003\u0002\u0002\u0002\u009e\u009f\u0007",
    "\u0003\u0002\u0002\u009f\u001d\u0003\u0002\u0002\u0002\u00a0\u00a1\u0007",
    "\u0019\u0002\u0002\u00a1\u00a2\u0005\"\u0012\u0002\u00a2\u00a3\u0007",
    "\u0003\u0002\u0002\u00a3\u001f\u0003\u0002\u0002\u0002\u00a4\u00a5\u0007",
    "\u0018\u0002\u0002\u00a5\u00a6\u0005\"\u0012\u0002\u00a6\u00a7\u0007",
    "\u0003\u0002\u0002\u00a7!\u0003\u0002\u0002\u0002\u00a8\u00ad\u0005",
    "$\u0013\u0002\u00a9\u00aa\u0007\u000e\u0002\u0002\u00aa\u00ac\u0005",
    "$\u0013\u0002\u00ab\u00a9\u0003\u0002\u0002\u0002\u00ac\u00af\u0003",
    "\u0002\u0002\u0002\u00ad\u00ab\u0003\u0002\u0002\u0002\u00ad\u00ae\u0003",
    "\u0002\u0002\u0002\u00ae#\u0003\u0002\u0002\u0002\u00af\u00ad\u0003",
    "\u0002\u0002\u0002\u00b0\u00b2\u0005&\u0014\u0002\u00b1\u00b3\u0005",
    "(\u0015\u0002\u00b2\u00b1\u0003\u0002\u0002\u0002\u00b2\u00b3\u0003",
    "\u0002\u0002\u0002\u00b3\u00b5\u0003\u0002\u0002\u0002\u00b4\u00b6\u0005",
    ",\u0017\u0002\u00b5\u00b4\u0003\u0002\u0002\u0002\u00b5\u00b6\u0003",
    "\u0002\u0002\u0002\u00b6%\u0003\u0002\u0002\u0002\u00b7\u00b8\u0007",
    "\u001f\u0002\u0002\u00b8\'\u0003\u0002\u0002\u0002\u00b9\u00ba\u0007",
    "\u0006\u0002\u0002\u00ba\u00bb\u0005*\u0016\u0002\u00bb\u00bc\u0007",
    "\u0007\u0002\u0002\u00bc)\u0003\u0002\u0002\u0002\u00bd\u00be\u0005",
    "\u0014\u000b\u0002\u00be+\u0003\u0002\u0002\u0002\u00bf\u00c0\u0007",
    "\t\u0002\u0002\u00c0\u00c5\u0005\u001e\u0010\u0002\u00c1\u00c2\u0005",
    " \u0011\u0002\u00c2\u00c3\u0007\n\u0002\u0002\u00c3\u00c5\u0003\u0002",
    "\u0002\u0002\u00c4\u00bf\u0003\u0002\u0002\u0002\u00c4\u00c1\u0003\u0002",
    "\u0002\u0002\u00c5-\u0003\u0002\u0002\u0002\u00161=BGKTY^cjru\u0080",
    "\u0082\u0090\u009b\u00ad\u00b2\u00b5\u00c4"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class GenaParser extends antlr4.Parser {

    static grammarFileName = "Gena.g4";
    static literalNames = [ null, "';'", "','", "':'", "'('", "')'", "'.'", 
                            "'{'", "'}'", "'initializes'", null, null, "'->'", 
                            null, "'noid'", "'copath'", "'class'", "'data'", 
                            "'extends'", "'nary'", "'event'", "'param'", 
                            "'callinto'", "'caller'", "'belongsto'", "'piggyafter'", 
                            "'piggyinto'", "'piggybefore'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, "WS", "Comment", "EvtPathConnector", 
                             "OPCHAR", "Noid", "Copath", "Class", "Data", 
                             "Extends", "Nary", "Event", "Param", "Callinto", 
                             "Caller", "Belongsto", "PiggyAfter", "PiggyInto", 
                             "PiggyBefore", "DataType", "Iden", "INT", "FLOAT" ];
    static ruleNames = [ "doc", "docStmt", "docStmtNse", "stmtNse", "nseModel", 
                         "nseModelName", "nseModelProp", "nseModelPropKey", 
                         "nseModelPropVal", "nseIden", "nseCurly", "stmtCopath", 
                         "stmtExtends", "stmtInitializes", "stmtCaller", 
                         "stmtCallinto", "eventPath", "eventSpec", "eventName", 
                         "eventTargetArgs", "eventTarget", "eventCurly" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = GenaParser.ruleNames;
        this.literalNames = GenaParser.literalNames;
        this.symbolicNames = GenaParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	doc() {
	    let localctx = new DocContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, GenaParser.RULE_doc);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 45; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 44;
	            this.docStmt();
	            this.state = 47; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===GenaParser.DataType || _la===GenaParser.Iden);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	docStmt() {
	    let localctx = new DocStmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, GenaParser.RULE_docStmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 49;
	        this.docStmtNse();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	docStmtNse() {
	    let localctx = new DocStmtNseContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, GenaParser.RULE_docStmtNse);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 51;
	        this.stmtNse();
	        this.state = 52;
	        this.match(GenaParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stmtNse() {
	    let localctx = new StmtNseContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, GenaParser.RULE_stmtNse);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 54;
	        this.nseIden();
	        this.state = 59;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===GenaParser.T__1) {
	            this.state = 55;
	            this.match(GenaParser.T__1);
	            this.state = 56;
	            this.nseIden();
	            this.state = 61;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 64;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===GenaParser.T__2) {
	            this.state = 62;
	            this.match(GenaParser.T__2);
	            this.state = 63;
	            this.nseModel();
	        }

	        this.state = 69;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GenaParser.Event) | (1 << GenaParser.Param) | (1 << GenaParser.DataType) | (1 << GenaParser.Iden))) !== 0)) {
	            this.state = 66;
	            this.nseModel();
	            this.state = 71;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 73;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===GenaParser.T__6) {
	            this.state = 72;
	            this.nseCurly();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nseModel() {
	    let localctx = new NseModelContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, GenaParser.RULE_nseModel);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 75;
	        this.nseModelName();
	        this.state = 87;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===GenaParser.T__3) {
	            this.state = 76;
	            this.match(GenaParser.T__3);
	            this.state = 77;
	            this.nseModelProp();
	            this.state = 82;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===GenaParser.T__1) {
	                this.state = 78;
	                this.match(GenaParser.T__1);
	                this.state = 79;
	                this.nseModelProp();
	                this.state = 84;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 85;
	            this.match(GenaParser.T__4);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nseModelName() {
	    let localctx = new NseModelNameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, GenaParser.RULE_nseModelName);
	    try {
	        this.state = 92;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case GenaParser.Event:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 89;
	            this.match(GenaParser.Event);
	            break;
	        case GenaParser.Param:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 90;
	            this.match(GenaParser.Param);
	            break;
	        case GenaParser.DataType:
	        case GenaParser.Iden:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 91;
	            this.nseIden();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nseModelProp() {
	    let localctx = new NseModelPropContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, GenaParser.RULE_nseModelProp);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 94;
	        this.nseModelPropKey();
	        this.state = 97;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===GenaParser.T__2) {
	            this.state = 95;
	            this.match(GenaParser.T__2);
	            this.state = 96;
	            this.nseModelPropVal();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nseModelPropKey() {
	    let localctx = new NseModelPropKeyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, GenaParser.RULE_nseModelPropKey);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 99;
	        this.nseIden();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nseModelPropVal() {
	    let localctx = new NseModelPropValContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, GenaParser.RULE_nseModelPropVal);
	    try {
	        this.state = 104;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case GenaParser.DataType:
	        case GenaParser.Iden:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 101;
	            this.nseIden();
	            break;
	        case GenaParser.INT:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 102;
	            this.match(GenaParser.INT);
	            break;
	        case GenaParser.FLOAT:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 103;
	            this.match(GenaParser.FLOAT);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nseIden() {
	    let localctx = new NseIdenContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, GenaParser.RULE_nseIden);
	    var _la = 0; // Token type
	    try {
	        this.state = 115;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case GenaParser.DataType:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 106;
	            this.match(GenaParser.DataType);
	            break;
	        case GenaParser.Iden:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 107;
	            this.match(GenaParser.Iden);
	            this.state = 112;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===GenaParser.T__5) {
	                this.state = 108;
	                this.match(GenaParser.T__5);
	                this.state = 109;
	                this.match(GenaParser.Iden);
	                this.state = 114;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nseCurly() {
	    let localctx = new NseCurlyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, GenaParser.RULE_nseCurly);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 117;
	        this.match(GenaParser.T__6);
	        this.state = 126; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 126;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case GenaParser.Copath:
	                this.state = 118;
	                this.stmtCopath();
	                break;
	            case GenaParser.Extends:
	                this.state = 119;
	                this.stmtExtends();
	                break;
	            case GenaParser.T__8:
	                this.state = 120;
	                this.stmtInitializes();
	                break;
	            case GenaParser.Caller:
	                this.state = 121;
	                this.stmtCaller();
	                break;
	            case GenaParser.Callinto:
	                this.state = 122;
	                this.stmtCallinto();
	                break;
	            case GenaParser.DataType:
	            case GenaParser.Iden:
	                this.state = 123;
	                this.stmtNse();
	                this.state = 124;
	                this.match(GenaParser.T__0);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            this.state = 128; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GenaParser.T__8) | (1 << GenaParser.Copath) | (1 << GenaParser.Extends) | (1 << GenaParser.Callinto) | (1 << GenaParser.Caller) | (1 << GenaParser.DataType) | (1 << GenaParser.Iden))) !== 0));
	        this.state = 130;
	        this.match(GenaParser.T__7);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stmtCopath() {
	    let localctx = new StmtCopathContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, GenaParser.RULE_stmtCopath);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 132;
	        this.match(GenaParser.Copath);
	        this.state = 133;
	        this.nseIden();
	        this.state = 134;
	        this.match(GenaParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stmtExtends() {
	    let localctx = new StmtExtendsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, GenaParser.RULE_stmtExtends);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 136;
	        this.match(GenaParser.Extends);
	        this.state = 137;
	        this.nseIden();
	        this.state = 142;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===GenaParser.T__1) {
	            this.state = 138;
	            this.match(GenaParser.T__1);
	            this.state = 139;
	            this.nseIden();
	            this.state = 144;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 145;
	        this.match(GenaParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stmtInitializes() {
	    let localctx = new StmtInitializesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, GenaParser.RULE_stmtInitializes);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 147;
	        this.match(GenaParser.T__8);
	        this.state = 148;
	        this.nseIden();
	        this.state = 153;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===GenaParser.T__1) {
	            this.state = 149;
	            this.match(GenaParser.T__1);
	            this.state = 150;
	            this.nseIden();
	            this.state = 155;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 156;
	        this.match(GenaParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stmtCaller() {
	    let localctx = new StmtCallerContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, GenaParser.RULE_stmtCaller);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 158;
	        this.match(GenaParser.Caller);
	        this.state = 159;
	        this.eventPath();
	        this.state = 160;
	        this.match(GenaParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stmtCallinto() {
	    let localctx = new StmtCallintoContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, GenaParser.RULE_stmtCallinto);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 162;
	        this.match(GenaParser.Callinto);
	        this.state = 163;
	        this.eventPath();
	        this.state = 164;
	        this.match(GenaParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	eventPath() {
	    let localctx = new EventPathContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, GenaParser.RULE_eventPath);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 166;
	        this.eventSpec();
	        this.state = 171;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===GenaParser.EvtPathConnector) {
	            this.state = 167;
	            this.match(GenaParser.EvtPathConnector);
	            this.state = 168;
	            this.eventSpec();
	            this.state = 173;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	eventSpec() {
	    let localctx = new EventSpecContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, GenaParser.RULE_eventSpec);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 174;
	        this.eventName();
	        this.state = 176;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===GenaParser.T__3) {
	            this.state = 175;
	            this.eventTargetArgs();
	        }

	        this.state = 179;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===GenaParser.T__6 || _la===GenaParser.Callinto) {
	            this.state = 178;
	            this.eventCurly();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	eventName() {
	    let localctx = new EventNameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, GenaParser.RULE_eventName);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 181;
	        this.match(GenaParser.Iden);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	eventTargetArgs() {
	    let localctx = new EventTargetArgsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, GenaParser.RULE_eventTargetArgs);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 183;
	        this.match(GenaParser.T__3);
	        this.state = 184;
	        this.eventTarget();
	        this.state = 185;
	        this.match(GenaParser.T__4);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	eventTarget() {
	    let localctx = new EventTargetContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, GenaParser.RULE_eventTarget);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 187;
	        this.nseIden();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	eventCurly() {
	    let localctx = new EventCurlyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, GenaParser.RULE_eventCurly);
	    try {
	        this.state = 194;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case GenaParser.T__6:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 189;
	            this.match(GenaParser.T__6);
	            this.state = 190;
	            this.stmtCaller();
	            break;
	        case GenaParser.Callinto:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 191;
	            this.stmtCallinto();
	            this.state = 192;
	            this.match(GenaParser.T__7);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

GenaParser.EOF = antlr4.Token.EOF;
GenaParser.T__0 = 1;
GenaParser.T__1 = 2;
GenaParser.T__2 = 3;
GenaParser.T__3 = 4;
GenaParser.T__4 = 5;
GenaParser.T__5 = 6;
GenaParser.T__6 = 7;
GenaParser.T__7 = 8;
GenaParser.T__8 = 9;
GenaParser.WS = 10;
GenaParser.Comment = 11;
GenaParser.EvtPathConnector = 12;
GenaParser.OPCHAR = 13;
GenaParser.Noid = 14;
GenaParser.Copath = 15;
GenaParser.Class = 16;
GenaParser.Data = 17;
GenaParser.Extends = 18;
GenaParser.Nary = 19;
GenaParser.Event = 20;
GenaParser.Param = 21;
GenaParser.Callinto = 22;
GenaParser.Caller = 23;
GenaParser.Belongsto = 24;
GenaParser.PiggyAfter = 25;
GenaParser.PiggyInto = 26;
GenaParser.PiggyBefore = 27;
GenaParser.DataType = 28;
GenaParser.Iden = 29;
GenaParser.INT = 30;
GenaParser.FLOAT = 31;

GenaParser.RULE_doc = 0;
GenaParser.RULE_docStmt = 1;
GenaParser.RULE_docStmtNse = 2;
GenaParser.RULE_stmtNse = 3;
GenaParser.RULE_nseModel = 4;
GenaParser.RULE_nseModelName = 5;
GenaParser.RULE_nseModelProp = 6;
GenaParser.RULE_nseModelPropKey = 7;
GenaParser.RULE_nseModelPropVal = 8;
GenaParser.RULE_nseIden = 9;
GenaParser.RULE_nseCurly = 10;
GenaParser.RULE_stmtCopath = 11;
GenaParser.RULE_stmtExtends = 12;
GenaParser.RULE_stmtInitializes = 13;
GenaParser.RULE_stmtCaller = 14;
GenaParser.RULE_stmtCallinto = 15;
GenaParser.RULE_eventPath = 16;
GenaParser.RULE_eventSpec = 17;
GenaParser.RULE_eventName = 18;
GenaParser.RULE_eventTargetArgs = 19;
GenaParser.RULE_eventTarget = 20;
GenaParser.RULE_eventCurly = 21;

class DocContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_doc;
    }

	docStmt = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(DocStmtContext);
	    } else {
	        return this.getTypedRuleContext(DocStmtContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterDoc(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitDoc(this);
		}
	}


}



class DocStmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_docStmt;
    }

	docStmtNse() {
	    return this.getTypedRuleContext(DocStmtNseContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterDocStmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitDocStmt(this);
		}
	}


}



class DocStmtNseContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_docStmtNse;
    }

	stmtNse() {
	    return this.getTypedRuleContext(StmtNseContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterDocStmtNse(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitDocStmtNse(this);
		}
	}


}



class StmtNseContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_stmtNse;
    }

	nseIden = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NseIdenContext);
	    } else {
	        return this.getTypedRuleContext(NseIdenContext,i);
	    }
	};

	nseModel = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NseModelContext);
	    } else {
	        return this.getTypedRuleContext(NseModelContext,i);
	    }
	};

	nseCurly() {
	    return this.getTypedRuleContext(NseCurlyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterStmtNse(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitStmtNse(this);
		}
	}


}



class NseModelContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_nseModel;
    }

	nseModelName() {
	    return this.getTypedRuleContext(NseModelNameContext,0);
	};

	nseModelProp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NseModelPropContext);
	    } else {
	        return this.getTypedRuleContext(NseModelPropContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterNseModel(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitNseModel(this);
		}
	}


}



class NseModelNameContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_nseModelName;
    }

	Event() {
	    return this.getToken(GenaParser.Event, 0);
	};

	Param() {
	    return this.getToken(GenaParser.Param, 0);
	};

	nseIden() {
	    return this.getTypedRuleContext(NseIdenContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterNseModelName(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitNseModelName(this);
		}
	}


}



class NseModelPropContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_nseModelProp;
    }

	nseModelPropKey() {
	    return this.getTypedRuleContext(NseModelPropKeyContext,0);
	};

	nseModelPropVal() {
	    return this.getTypedRuleContext(NseModelPropValContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterNseModelProp(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitNseModelProp(this);
		}
	}


}



class NseModelPropKeyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_nseModelPropKey;
    }

	nseIden() {
	    return this.getTypedRuleContext(NseIdenContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterNseModelPropKey(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitNseModelPropKey(this);
		}
	}


}



class NseModelPropValContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_nseModelPropVal;
    }

	nseIden() {
	    return this.getTypedRuleContext(NseIdenContext,0);
	};

	INT() {
	    return this.getToken(GenaParser.INT, 0);
	};

	FLOAT() {
	    return this.getToken(GenaParser.FLOAT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterNseModelPropVal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitNseModelPropVal(this);
		}
	}


}



class NseIdenContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_nseIden;
    }

	DataType() {
	    return this.getToken(GenaParser.DataType, 0);
	};

	Iden = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(GenaParser.Iden);
	    } else {
	        return this.getToken(GenaParser.Iden, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterNseIden(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitNseIden(this);
		}
	}


}



class NseCurlyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_nseCurly;
    }

	stmtCopath = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StmtCopathContext);
	    } else {
	        return this.getTypedRuleContext(StmtCopathContext,i);
	    }
	};

	stmtExtends = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StmtExtendsContext);
	    } else {
	        return this.getTypedRuleContext(StmtExtendsContext,i);
	    }
	};

	stmtInitializes = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StmtInitializesContext);
	    } else {
	        return this.getTypedRuleContext(StmtInitializesContext,i);
	    }
	};

	stmtCaller = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StmtCallerContext);
	    } else {
	        return this.getTypedRuleContext(StmtCallerContext,i);
	    }
	};

	stmtCallinto = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StmtCallintoContext);
	    } else {
	        return this.getTypedRuleContext(StmtCallintoContext,i);
	    }
	};

	stmtNse = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StmtNseContext);
	    } else {
	        return this.getTypedRuleContext(StmtNseContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterNseCurly(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitNseCurly(this);
		}
	}


}



class StmtCopathContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_stmtCopath;
    }

	Copath() {
	    return this.getToken(GenaParser.Copath, 0);
	};

	nseIden() {
	    return this.getTypedRuleContext(NseIdenContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterStmtCopath(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitStmtCopath(this);
		}
	}


}



class StmtExtendsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_stmtExtends;
    }

	Extends() {
	    return this.getToken(GenaParser.Extends, 0);
	};

	nseIden = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NseIdenContext);
	    } else {
	        return this.getTypedRuleContext(NseIdenContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterStmtExtends(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitStmtExtends(this);
		}
	}


}



class StmtInitializesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_stmtInitializes;
    }

	nseIden = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(NseIdenContext);
	    } else {
	        return this.getTypedRuleContext(NseIdenContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterStmtInitializes(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitStmtInitializes(this);
		}
	}


}



class StmtCallerContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_stmtCaller;
    }

	Caller() {
	    return this.getToken(GenaParser.Caller, 0);
	};

	eventPath() {
	    return this.getTypedRuleContext(EventPathContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterStmtCaller(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitStmtCaller(this);
		}
	}


}



class StmtCallintoContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_stmtCallinto;
    }

	Callinto() {
	    return this.getToken(GenaParser.Callinto, 0);
	};

	eventPath() {
	    return this.getTypedRuleContext(EventPathContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterStmtCallinto(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitStmtCallinto(this);
		}
	}


}



class EventPathContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_eventPath;
    }

	eventSpec = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(EventSpecContext);
	    } else {
	        return this.getTypedRuleContext(EventSpecContext,i);
	    }
	};

	EvtPathConnector = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(GenaParser.EvtPathConnector);
	    } else {
	        return this.getToken(GenaParser.EvtPathConnector, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterEventPath(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitEventPath(this);
		}
	}


}



class EventSpecContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_eventSpec;
    }

	eventName() {
	    return this.getTypedRuleContext(EventNameContext,0);
	};

	eventTargetArgs() {
	    return this.getTypedRuleContext(EventTargetArgsContext,0);
	};

	eventCurly() {
	    return this.getTypedRuleContext(EventCurlyContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterEventSpec(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitEventSpec(this);
		}
	}


}



class EventNameContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_eventName;
    }

	Iden() {
	    return this.getToken(GenaParser.Iden, 0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterEventName(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitEventName(this);
		}
	}


}



class EventTargetArgsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_eventTargetArgs;
    }

	eventTarget() {
	    return this.getTypedRuleContext(EventTargetContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterEventTargetArgs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitEventTargetArgs(this);
		}
	}


}



class EventTargetContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_eventTarget;
    }

	nseIden() {
	    return this.getTypedRuleContext(NseIdenContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterEventTarget(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitEventTarget(this);
		}
	}


}



class EventCurlyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_eventCurly;
    }

	stmtCaller() {
	    return this.getTypedRuleContext(StmtCallerContext,0);
	};

	stmtCallinto() {
	    return this.getTypedRuleContext(StmtCallintoContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterEventCurly(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitEventCurly(this);
		}
	}


}




GenaParser.DocContext = DocContext; 
GenaParser.DocStmtContext = DocStmtContext; 
GenaParser.DocStmtNseContext = DocStmtNseContext; 
GenaParser.StmtNseContext = StmtNseContext; 
GenaParser.NseModelContext = NseModelContext; 
GenaParser.NseModelNameContext = NseModelNameContext; 
GenaParser.NseModelPropContext = NseModelPropContext; 
GenaParser.NseModelPropKeyContext = NseModelPropKeyContext; 
GenaParser.NseModelPropValContext = NseModelPropValContext; 
GenaParser.NseIdenContext = NseIdenContext; 
GenaParser.NseCurlyContext = NseCurlyContext; 
GenaParser.StmtCopathContext = StmtCopathContext; 
GenaParser.StmtExtendsContext = StmtExtendsContext; 
GenaParser.StmtInitializesContext = StmtInitializesContext; 
GenaParser.StmtCallerContext = StmtCallerContext; 
GenaParser.StmtCallintoContext = StmtCallintoContext; 
GenaParser.EventPathContext = EventPathContext; 
GenaParser.EventSpecContext = EventSpecContext; 
GenaParser.EventNameContext = EventNameContext; 
GenaParser.EventTargetArgsContext = EventTargetArgsContext; 
GenaParser.EventTargetContext = EventTargetContext; 
GenaParser.EventCurlyContext = EventCurlyContext; 

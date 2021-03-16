// Generated from Gena.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';
import GenaListener from './GenaListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u001bR\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0003\u0002\u0003\u0002\u0007\u0002\u000b\n\u0002\f\u0002\u000e",
    "\u0002\u000e\u000b\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003",
    "\u0013\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u0018",
    "\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u001d\n\u0003",
    "\u0003\u0003\u0007\u0003 \n\u0003\f\u0003\u000e\u0003#\u000b\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0005\u0003(\n\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0006",
    "\u0003C\n\u0003\r\u0003\u000e\u0003D\u0003\u0003\u0007\u0003H\n\u0003",
    "\f\u0003\u000e\u0003K\u000b\u0003\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0005\u0004P\n\u0004\u0003\u0004\u0002\u0003\u0004\u0005\u0002\u0004",
    "\u0006\u0002\u0005\u0003\u0002\u000b\f\u0003\u0002\r\u000e\u0003\u0002",
    "\u0018\u0019\u0002c\u0002\b\u0003\u0002\u0002\u0002\u0004\'\u0003\u0002",
    "\u0002\u0002\u0006O\u0003\u0002\u0002\u0002\b\f\u0005\u0004\u0003\u0002",
    "\t\u000b\u0007\u0003\u0002\u0002\n\t\u0003\u0002\u0002\u0002\u000b\u000e",
    "\u0003\u0002\u0002\u0002\f\n\u0003\u0002\u0002\u0002\f\r\u0003\u0002",
    "\u0002\u0002\r\u0003\u0003\u0002\u0002\u0002\u000e\f\u0003\u0002\u0002",
    "\u0002\u000f\u0010\b\u0003\u0001\u0002\u0010\u0012\u0007\u0004\u0002",
    "\u0002\u0011\u0013\u0005\u0004\u0003\u0002\u0012\u0011\u0003\u0002\u0002",
    "\u0002\u0012\u0013\u0003\u0002\u0002\u0002\u0013\u0014\u0003\u0002\u0002",
    "\u0002\u0014(\u0007\u0005\u0002\u0002\u0015\u0017\u0007\u0006\u0002",
    "\u0002\u0016\u0018\u0005\u0004\u0003\u0002\u0017\u0016\u0003\u0002\u0002",
    "\u0002\u0017\u0018\u0003\u0002\u0002\u0002\u0018\u0019\u0003\u0002\u0002",
    "\u0002\u0019(\u0007\u0007\u0002\u0002\u001a\u001c\u0007\b\u0002\u0002",
    "\u001b\u001d\u0005\u0004\u0003\u0002\u001c\u001b\u0003\u0002\u0002\u0002",
    "\u001c\u001d\u0003\u0002\u0002\u0002\u001d!\u0003\u0002\u0002\u0002",
    "\u001e \u0007\u0003\u0002\u0002\u001f\u001e\u0003\u0002\u0002\u0002",
    " #\u0003\u0002\u0002\u0002!\u001f\u0003\u0002\u0002\u0002!\"\u0003\u0002",
    "\u0002\u0002\"$\u0003\u0002\u0002\u0002#!\u0003\u0002\u0002\u0002$(",
    "\u0007\t\u0002\u0002%(\u0007\u001b\u0002\u0002&(\u0005\u0006\u0004\u0002",
    "\'\u000f\u0003\u0002\u0002\u0002\'\u0015\u0003\u0002\u0002\u0002\'\u001a",
    "\u0003\u0002\u0002\u0002\'%\u0003\u0002\u0002\u0002\'&\u0003\u0002\u0002",
    "\u0002(I\u0003\u0002\u0002\u0002)*\f\r\u0002\u0002*+\u0007\n\u0002\u0002",
    "+H\u0005\u0004\u0003\u000e,-\f\f\u0002\u0002-.\t\u0002\u0002\u0002.",
    "H\u0005\u0004\u0003\r/0\f\u000b\u0002\u000201\t\u0003\u0002\u00021H",
    "\u0005\u0004\u0003\f23\f\n\u0002\u000234\u0007\u000f\u0002\u00024H\u0005",
    "\u0004\u0003\u000b56\f\t\u0002\u000267\u0007\u0010\u0002\u00027H\u0005",
    "\u0004\u0003\t89\f\b\u0002\u00029:\u0007\u0011\u0002\u0002:H\u0005\u0004",
    "\u0003\t;<\f\u0007\u0002\u0002<H\u0005\u0004\u0003\b=>\f\u0006\u0002",
    "\u0002>?\u0007\u0012\u0002\u0002?H\u0005\u0004\u0003\u0007@B\f\u0005",
    "\u0002\u0002AC\u0007\u0003\u0002\u0002BA\u0003\u0002\u0002\u0002CD\u0003",
    "\u0002\u0002\u0002DB\u0003\u0002\u0002\u0002DE\u0003\u0002\u0002\u0002",
    "EF\u0003\u0002\u0002\u0002FH\u0005\u0004\u0003\u0006G)\u0003\u0002\u0002",
    "\u0002G,\u0003\u0002\u0002\u0002G/\u0003\u0002\u0002\u0002G2\u0003\u0002",
    "\u0002\u0002G5\u0003\u0002\u0002\u0002G8\u0003\u0002\u0002\u0002G;\u0003",
    "\u0002\u0002\u0002G=\u0003\u0002\u0002\u0002G@\u0003\u0002\u0002\u0002",
    "HK\u0003\u0002\u0002\u0002IG\u0003\u0002\u0002\u0002IJ\u0003\u0002\u0002",
    "\u0002J\u0005\u0003\u0002\u0002\u0002KI\u0003\u0002\u0002\u0002LP\u0007",
    "\u0015\u0002\u0002MP\u0007\u001a\u0002\u0002NP\t\u0004\u0002\u0002O",
    "L\u0003\u0002\u0002\u0002OM\u0003\u0002\u0002\u0002ON\u0003\u0002\u0002",
    "\u0002P\u0007\u0003\u0002\u0002\u0002\f\f\u0012\u0017\u001c!\'DGIO"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class GenaParser extends antlr4.Parser {

    static grammarFileName = "Gena.g4";
    static literalNames = [ null, "';'", "'('", "')'", "'['", "']'", "'{'", 
                            "'}'", "'.'", "'*'", "'/'", "'+'", "'-'", "':'", 
                            "'='", "','", "':='" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, null, 
                             null, "WS", "Comment", "STRING", "OPCHAR2", 
                             "OPCHAR", "DECIMAL", "HEXADECIMAL", "FLOAT", 
                             "Iden" ];
    static ruleNames = [ "doc", "expr", "value" ];

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

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 1:
    	    		return this.expr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 11);
    		case 1:
    			return this.precpred(this._ctx, 10);
    		case 2:
    			return this.precpred(this._ctx, 9);
    		case 3:
    			return this.precpred(this._ctx, 8);
    		case 4:
    			return this.precpred(this._ctx, 7);
    		case 5:
    			return this.precpred(this._ctx, 6);
    		case 6:
    			return this.precpred(this._ctx, 5);
    		case 7:
    			return this.precpred(this._ctx, 4);
    		case 8:
    			return this.precpred(this._ctx, 3);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	doc() {
	    let localctx = new DocContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, GenaParser.RULE_doc);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 6;
	        this.expr(0);
	        this.state = 10;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===GenaParser.T__0) {
	            this.state = 7;
	            this.match(GenaParser.T__0);
	            this.state = 12;
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


	expr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, GenaParser.RULE_expr, _p);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 37;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case GenaParser.T__1:
	            this.state = 14;
	            localctx.opr = this.match(GenaParser.T__1);
	            this.state = 16;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GenaParser.T__1) | (1 << GenaParser.T__3) | (1 << GenaParser.T__5) | (1 << GenaParser.STRING) | (1 << GenaParser.DECIMAL) | (1 << GenaParser.HEXADECIMAL) | (1 << GenaParser.FLOAT) | (1 << GenaParser.Iden))) !== 0)) {
	                this.state = 15;
	                this.expr(0);
	            }

	            this.state = 18;
	            this.match(GenaParser.T__2);
	            break;
	        case GenaParser.T__3:
	            this.state = 19;
	            localctx.opr = this.match(GenaParser.T__3);
	            this.state = 21;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GenaParser.T__1) | (1 << GenaParser.T__3) | (1 << GenaParser.T__5) | (1 << GenaParser.STRING) | (1 << GenaParser.DECIMAL) | (1 << GenaParser.HEXADECIMAL) | (1 << GenaParser.FLOAT) | (1 << GenaParser.Iden))) !== 0)) {
	                this.state = 20;
	                this.expr(0);
	            }

	            this.state = 23;
	            this.match(GenaParser.T__4);
	            break;
	        case GenaParser.T__5:
	            this.state = 24;
	            localctx.opr = this.match(GenaParser.T__5);
	            this.state = 26;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << GenaParser.T__1) | (1 << GenaParser.T__3) | (1 << GenaParser.T__5) | (1 << GenaParser.STRING) | (1 << GenaParser.DECIMAL) | (1 << GenaParser.HEXADECIMAL) | (1 << GenaParser.FLOAT) | (1 << GenaParser.Iden))) !== 0)) {
	                this.state = 25;
	                this.expr(0);
	            }

	            this.state = 31;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===GenaParser.T__0) {
	                this.state = 28;
	                this.match(GenaParser.T__0);
	                this.state = 33;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 34;
	            this.match(GenaParser.T__6);
	            break;
	        case GenaParser.Iden:
	            this.state = 35;
	            localctx.iden = this.match(GenaParser.Iden);
	            break;
	        case GenaParser.STRING:
	        case GenaParser.DECIMAL:
	        case GenaParser.HEXADECIMAL:
	        case GenaParser.FLOAT:
	            this.state = 36;
	            localctx.val = this.value();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 71;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 69;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    localctx.lhs = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, GenaParser.RULE_expr);
	                    this.state = 39;
	                    if (!( this.precpred(this._ctx, 11))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 11)");
	                    }
	                    this.state = 40;
	                    localctx.opr = this.match(GenaParser.T__7);
	                    this.state = 41;
	                    localctx.rhs = this.expr(12);
	                    break;

	                case 2:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    localctx.lhs = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, GenaParser.RULE_expr);
	                    this.state = 42;
	                    if (!( this.precpred(this._ctx, 10))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
	                    }
	                    this.state = 43;
	                    localctx.opr = this._input.LT(1);
	                    _la = this._input.LA(1);
	                    if(!(_la===GenaParser.T__8 || _la===GenaParser.T__9)) {
	                        localctx.opr = this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 44;
	                    localctx.rhs = this.expr(11);
	                    break;

	                case 3:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    localctx.lhs = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, GenaParser.RULE_expr);
	                    this.state = 45;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }
	                    this.state = 46;
	                    localctx.opr = this._input.LT(1);
	                    _la = this._input.LA(1);
	                    if(!(_la===GenaParser.T__10 || _la===GenaParser.T__11)) {
	                        localctx.opr = this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 47;
	                    localctx.rhs = this.expr(10);
	                    break;

	                case 4:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    localctx.lhs = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, GenaParser.RULE_expr);
	                    this.state = 48;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 49;
	                    localctx.opr = this.match(GenaParser.T__12);
	                    this.state = 50;
	                    localctx.rhs = this.expr(9);
	                    break;

	                case 5:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    localctx.lhs = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, GenaParser.RULE_expr);
	                    this.state = 51;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 52;
	                    localctx.opr = this.match(GenaParser.T__13);
	                    this.state = 53;
	                    localctx.rhs = this.expr(7);
	                    break;

	                case 6:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    localctx.lhs = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, GenaParser.RULE_expr);
	                    this.state = 54;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 55;
	                    localctx.opr = this.match(GenaParser.T__14);
	                    this.state = 56;
	                    localctx.rhs = this.expr(7);
	                    break;

	                case 7:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    localctx.lhs = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, GenaParser.RULE_expr);
	                    this.state = 57;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 58;
	                    localctx.rhs = this.expr(6);
	                    break;

	                case 8:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    localctx.lhs = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, GenaParser.RULE_expr);
	                    this.state = 59;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 60;
	                    localctx.opr = this.match(GenaParser.T__15);
	                    this.state = 61;
	                    localctx.rhs = this.expr(5);
	                    break;

	                case 9:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    localctx.lhs = _prevctx;
	                    this.pushNewRecursionContext(localctx, _startState, GenaParser.RULE_expr);
	                    this.state = 62;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 64; 
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    do {
	                        this.state = 63;
	                        this.match(GenaParser.T__0);
	                        this.state = 66; 
	                        this._errHandler.sync(this);
	                        _la = this._input.LA(1);
	                    } while(_la===GenaParser.T__0);
	                    this.state = 68;
	                    localctx.rhs = this.expr(4);
	                    break;

	                } 
	            }
	            this.state = 73;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,8,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	value() {
	    let localctx = new ValueContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, GenaParser.RULE_value);
	    var _la = 0; // Token type
	    try {
	        this.state = 77;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case GenaParser.STRING:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 74;
	            localctx.str = this.match(GenaParser.STRING);
	            break;
	        case GenaParser.FLOAT:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 75;
	            localctx.numfloat = this.match(GenaParser.FLOAT);
	            break;
	        case GenaParser.DECIMAL:
	        case GenaParser.HEXADECIMAL:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 76;
	            localctx.numdec = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===GenaParser.DECIMAL || _la===GenaParser.HEXADECIMAL)) {
	                localctx.numdec = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
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
GenaParser.T__9 = 10;
GenaParser.T__10 = 11;
GenaParser.T__11 = 12;
GenaParser.T__12 = 13;
GenaParser.T__13 = 14;
GenaParser.T__14 = 15;
GenaParser.T__15 = 16;
GenaParser.WS = 17;
GenaParser.Comment = 18;
GenaParser.STRING = 19;
GenaParser.OPCHAR2 = 20;
GenaParser.OPCHAR = 21;
GenaParser.DECIMAL = 22;
GenaParser.HEXADECIMAL = 23;
GenaParser.FLOAT = 24;
GenaParser.Iden = 25;

GenaParser.RULE_doc = 0;
GenaParser.RULE_expr = 1;
GenaParser.RULE_value = 2;

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

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
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



class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_expr;
        this.lhs = null; // ExprContext
        this.opr = null; // Token
        this.iden = null; // Token
        this.val = null; // ValueContext
        this.rhs = null; // ExprContext
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	Iden() {
	    return this.getToken(GenaParser.Iden, 0);
	};

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitExpr(this);
		}
	}


}



class ValueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = GenaParser.RULE_value;
        this.str = null; // Token
        this.numfloat = null; // Token
        this.numdec = null; // Token
    }

	STRING() {
	    return this.getToken(GenaParser.STRING, 0);
	};

	FLOAT() {
	    return this.getToken(GenaParser.FLOAT, 0);
	};

	DECIMAL() {
	    return this.getToken(GenaParser.DECIMAL, 0);
	};

	HEXADECIMAL() {
	    return this.getToken(GenaParser.HEXADECIMAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.enterValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof GenaListener ) {
	        listener.exitValue(this);
		}
	}


}




GenaParser.DocContext = DocContext; 
GenaParser.ExprContext = ExprContext; 
GenaParser.ValueContext = ValueContext; 

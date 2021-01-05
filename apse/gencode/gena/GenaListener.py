# Generated from Gena.g4 by ANTLR 4.9
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .GenaParser import GenaParser
else:
    from GenaParser import GenaParser

# This class defines a complete listener for a parse tree produced by GenaParser.
class GenaListener(ParseTreeListener):

    # Enter a parse tree produced by GenaParser#doc.
    def enterDoc(self, ctx:GenaParser.DocContext):
        pass

    # Exit a parse tree produced by GenaParser#doc.
    def exitDoc(self, ctx:GenaParser.DocContext):
        pass


    # Enter a parse tree produced by GenaParser#docStmt.
    def enterDocStmt(self, ctx:GenaParser.DocStmtContext):
        pass

    # Exit a parse tree produced by GenaParser#docStmt.
    def exitDocStmt(self, ctx:GenaParser.DocStmtContext):
        pass


    # Enter a parse tree produced by GenaParser#docStmtNse.
    def enterDocStmtNse(self, ctx:GenaParser.DocStmtNseContext):
        pass

    # Exit a parse tree produced by GenaParser#docStmtNse.
    def exitDocStmtNse(self, ctx:GenaParser.DocStmtNseContext):
        pass


    # Enter a parse tree produced by GenaParser#stmtNse.
    def enterStmtNse(self, ctx:GenaParser.StmtNseContext):
        pass

    # Exit a parse tree produced by GenaParser#stmtNse.
    def exitStmtNse(self, ctx:GenaParser.StmtNseContext):
        pass


    # Enter a parse tree produced by GenaParser#nseMain.
    def enterNseMain(self, ctx:GenaParser.NseMainContext):
        pass

    # Exit a parse tree produced by GenaParser#nseMain.
    def exitNseMain(self, ctx:GenaParser.NseMainContext):
        pass


    # Enter a parse tree produced by GenaParser#nseIden.
    def enterNseIden(self, ctx:GenaParser.NseIdenContext):
        pass

    # Exit a parse tree produced by GenaParser#nseIden.
    def exitNseIden(self, ctx:GenaParser.NseIdenContext):
        pass


    # Enter a parse tree produced by GenaParser#nseType.
    def enterNseType(self, ctx:GenaParser.NseTypeContext):
        pass

    # Exit a parse tree produced by GenaParser#nseType.
    def exitNseType(self, ctx:GenaParser.NseTypeContext):
        pass


    # Enter a parse tree produced by GenaParser#nseNary.
    def enterNseNary(self, ctx:GenaParser.NseNaryContext):
        pass

    # Exit a parse tree produced by GenaParser#nseNary.
    def exitNseNary(self, ctx:GenaParser.NseNaryContext):
        pass


    # Enter a parse tree produced by GenaParser#nseParam.
    def enterNseParam(self, ctx:GenaParser.NseParamContext):
        pass

    # Exit a parse tree produced by GenaParser#nseParam.
    def exitNseParam(self, ctx:GenaParser.NseParamContext):
        pass


    # Enter a parse tree produced by GenaParser#nseCurly.
    def enterNseCurly(self, ctx:GenaParser.NseCurlyContext):
        pass

    # Exit a parse tree produced by GenaParser#nseCurly.
    def exitNseCurly(self, ctx:GenaParser.NseCurlyContext):
        pass


    # Enter a parse tree produced by GenaParser#stmtCopath.
    def enterStmtCopath(self, ctx:GenaParser.StmtCopathContext):
        pass

    # Exit a parse tree produced by GenaParser#stmtCopath.
    def exitStmtCopath(self, ctx:GenaParser.StmtCopathContext):
        pass


    # Enter a parse tree produced by GenaParser#stmtExtends.
    def enterStmtExtends(self, ctx:GenaParser.StmtExtendsContext):
        pass

    # Exit a parse tree produced by GenaParser#stmtExtends.
    def exitStmtExtends(self, ctx:GenaParser.StmtExtendsContext):
        pass


    # Enter a parse tree produced by GenaParser#stmtInitializes.
    def enterStmtInitializes(self, ctx:GenaParser.StmtInitializesContext):
        pass

    # Exit a parse tree produced by GenaParser#stmtInitializes.
    def exitStmtInitializes(self, ctx:GenaParser.StmtInitializesContext):
        pass


    # Enter a parse tree produced by GenaParser#stmtCaller.
    def enterStmtCaller(self, ctx:GenaParser.StmtCallerContext):
        pass

    # Exit a parse tree produced by GenaParser#stmtCaller.
    def exitStmtCaller(self, ctx:GenaParser.StmtCallerContext):
        pass


    # Enter a parse tree produced by GenaParser#stmtCallinto.
    def enterStmtCallinto(self, ctx:GenaParser.StmtCallintoContext):
        pass

    # Exit a parse tree produced by GenaParser#stmtCallinto.
    def exitStmtCallinto(self, ctx:GenaParser.StmtCallintoContext):
        pass


    # Enter a parse tree produced by GenaParser#eventPath.
    def enterEventPath(self, ctx:GenaParser.EventPathContext):
        pass

    # Exit a parse tree produced by GenaParser#eventPath.
    def exitEventPath(self, ctx:GenaParser.EventPathContext):
        pass


    # Enter a parse tree produced by GenaParser#eventSpec.
    def enterEventSpec(self, ctx:GenaParser.EventSpecContext):
        pass

    # Exit a parse tree produced by GenaParser#eventSpec.
    def exitEventSpec(self, ctx:GenaParser.EventSpecContext):
        pass


    # Enter a parse tree produced by GenaParser#eventName.
    def enterEventName(self, ctx:GenaParser.EventNameContext):
        pass

    # Exit a parse tree produced by GenaParser#eventName.
    def exitEventName(self, ctx:GenaParser.EventNameContext):
        pass


    # Enter a parse tree produced by GenaParser#eventTargetArgs.
    def enterEventTargetArgs(self, ctx:GenaParser.EventTargetArgsContext):
        pass

    # Exit a parse tree produced by GenaParser#eventTargetArgs.
    def exitEventTargetArgs(self, ctx:GenaParser.EventTargetArgsContext):
        pass


    # Enter a parse tree produced by GenaParser#eventTarget.
    def enterEventTarget(self, ctx:GenaParser.EventTargetContext):
        pass

    # Exit a parse tree produced by GenaParser#eventTarget.
    def exitEventTarget(self, ctx:GenaParser.EventTargetContext):
        pass


    # Enter a parse tree produced by GenaParser#eventCurly.
    def enterEventCurly(self, ctx:GenaParser.EventCurlyContext):
        pass

    # Exit a parse tree produced by GenaParser#eventCurly.
    def exitEventCurly(self, ctx:GenaParser.EventCurlyContext):
        pass



del GenaParser
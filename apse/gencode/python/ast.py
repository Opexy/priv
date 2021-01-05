from collections import defaultdict
from pymaybe import maybe
#from typing import TypeVar, Generic
import graphlib
from antlr4 import *;
from .gena.GenaLexer import GenaLexer;
from .gena.GenaParser import GenaParser;
from .gena.GenaListener import GenaListener;

def osm(odef:dict):

  class OsmObj:
    def addTags(self, *tags, **kwargs):
      for tag in tags:
        if tag not in self.tags:
          self.tags[tag] = {};
      for tag in kwargs:
        if tag not in self.tags:
          self.tags[tag] = {};
#import networkx as nx;

Nse = osm({'Nse':{'parent':sqmType('Nse'), nseIden:'Field' 'nseIden':'string', 'nseTtr':'NseDefs'}});
class Nse(Sq):
  __slots__ = 'parent nseIden nseTstr nseType copath nary lets nses tags'.split()
  def __init__(self, parent, lets, **argv):
    self.parent = parent;
    self.nseIden = "";
    self.nseTstr = "";
    self.nseType = None;
    self.copath = "";
    self.nary = "";
    self.tags = dict[str, any]();
    self.lets = lets;
    self.nses = dict[str, Nse]();
    for key, val in argv.items():
      setattr(self, key, val);
  @property
  def nseParent(self):
    if self.parent == None:
      return self
    elif self.parent.nseIden:
      return self.parent
    else:
      return self.parent.nseParent;
  @property
  def nseRoot(self):
    iter = self
    while(iter.parent): iter = iter.parent
    return iter

class GenaAst(GenaListener):
  def __init__(self):
    self.lets = ();
    self.nse = None;
  def pushNse(self,**kwargs):
    self.nse = Nse(self.nse, self.lets, **kwargs);
  def addNseToParent(self, iden=None):
    if iden == 0:iden = str(iden)
    iden = iden or self.nse.nseIden;
    self.nse.parent.nses[iden] = self.nse
  def popNse(self):
    if(self.nse.nseIden != 'let'):
      self.lets = self.nse.lets; # not a mistake -- scope gets the "lets" before entering
    else:
      pass
    assert(self.nse.parent);
    self.nse = self.nse.parent;

  def enterDoc(self, ctx:GenaParser.DocContext):
    self.nse = None;
    self.pushNse();
  def enterStmtNse(self, ctx: GenaParser.StmtNseContext):
    self.pushNse();
  def enterStmtCopath(self, ctx: GenaParser.StmtCopathContext):
    self.nse.copath = ctx.nseIden().getText();
  def enterStmtInitializes(self, ctx: GenaParser.StmtInitializesContext):
    self.pushNse(nseTstr="initializes");
    self.addNseToParent();
    for nseIden in ctx.nseIden():
      iden = nseIden.getText();
      self.pushNse(nseIden = iden, nseTstr='initializes_target');
      self.addNseToParent();
      self.popNse();
    self.popNse();
  def enterStmtCaller(self, ctx: GenaParser.StmtCallerContext):
    self.pushNse(nseIden="caller", nseTstr="caller");
    self.addNseToParent();
  def exitStmtCaller(self, ctx: GenaParser.StmtCallerContext):
    self.popNse();
  def enterStmtCallinto(self, ctx: GenaParser.StmtCallintoContext):
    self.pushNse(nseIden="callinto", nseTstr="callinto");
    self.addNseToParent();
  def exitStmtCallinto(self, ctx: GenaParser.StmtCallintoContext):
    self.popNse();
  def enterEventSpec(self, ctx: GenaParser.EventSpecContext):
    idx = len(self.nse.nses);
    eventName = ctx.eventName().getText();
    self.pushNse(nseIden=eventName, nseTstr='event');
    self.addNseToParent(idx);
    target = maybe(ctx.eventTargetArgs()).eventTarget().getText().or_else('');
    if(target):
      self.pushNse(nseIden=target, nseTstr='eventtarget');
      self.addNseToParent('eventtarget');
      self.popNse();
    if(ctx.eventCurly()):
      assert(False);
    self.popNse(); # event
  
  def enterNseMain(self, ctx: GenaParser.NseMainContext):
    if(ctx.Let()):
      self.nse.nseIden = 'let';
      self.lets += (self.nse,);
    elif(ctx.nseIden()):
      iden = ctx.nseIden().getText();
      self.nse.nseIden = iden;
      self.nse.nseParent.nses[iden] = self.nse;
    if(ctx.Noid()):
      self.nse.nseTstr = 'noid';
    else:
      if(ctx.nseType()):
        self.nse.nseTstr = ctx.nseType().getText();
      else:
        pass;
  def exitStmtNse(self, ctx: GenaParser.StmtNseContext):
    self.popNse();

class NseResolver:
  def __init__(self, nse:Nse):
    self.root = nse.nseRoot;
    self.events = defaultdict[str, set[Nse]](lambda:set[Nse]());
    self.nses = dict(nse.nseRoot.nses);
    #self.deps = defaultdict[str, set[Nse]](lambda:set[Nse]());
    self.ResolveNse(nse);
    self.ProcSingletons();
  def ResolveNse(self, nse:Nse):
    tstr = nse.nseTstr
    while True:
      if nse.parent == None:
        break;
      if tstr:
        if tstr == 'event':
          self.events[nse.nseIden].add(nse);
        if tstr in ['noid', 'class', 'event', 
        'singleton', 'initializes', 'initializes_target', 'caller', 'callinto', 'eventtarget']: break;
        else: pass
      else: # try to resolve from lets
        for predef in nse.lets:
          if predef.nseTstr:
            tstr = predef.nseTstr;
        if not tstr:
          # no tstr, use Iden as tstr.
          # todo: try to use parent as Iden first.
          if nse.nseIden in self.nses:
            tstr = nse.nseIden;

        assert(tstr);
        break;
      if tstr in self.root.nses:
        nse.nseType = self.nses[tstr];
        #self.deps[nse].add(nse.nseType);
      else:
        print("adding missing class {0}".format(tstr) );
        nseType = Nse(self.root, ())
        nseType.nseIden = tstr;
        self.nses[tstr] = nseType;
        nse.nseType = nseType;
      break;

    for child in nse.nses.values():
      self.ResolveNse(child);
  def ProcSingletons(self):
    self.singletons = [];
    for key, nse in self.root.nses.items():
      if nse.nseTstr == 'singleton':
        self.singletons.append(nse);
        procSingleton(so);
    def procSingleton(so):
      EventProc.Init(so);
    

    for so in self.singletons:
      procSingleton(so)
    

def parse_spec(str):
  lexer = GenaLexer(InputStream(str));
  tokenStream = CommonTokenStream(lexer);
  parser = GenaParser(tokenStream);
  doc = parser.doc();
  walker = ParseTreeWalker();
  ast = GenaAst();
  walker.walk(ast, doc);

  ret = ast.nse;
  resolver = NseResolver(ret);
  return resolver;
from .ast import NseResolver, parse_spec;
from ._cogio import *;
def readFromFile(fname):
  file = open(fname)
  str = file.read();
  return str;

class CodeoutWriter:
  pass

class CxxWriter(CodeoutWriter):
  def codeout(res:NseResolver):
    classes = filter(
      lambda x:x.nseTstr == 'class' and x.nseIden,
      res.nses.values());
    singletons = filter(
      lambda x:x.nseTstr == 'singleton' and x.nseIden,
      res.nses.values());
    types = filter(
      lambda x:x.nseTstr == '' and x.nseIden,
      res.nses.values());
    pass

def codeout(codespec):
  res = parse_spec(codespec);
  outl('//done');



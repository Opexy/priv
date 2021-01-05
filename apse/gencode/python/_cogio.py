try:
  import cog
except ImportError:
  from types import SimpleNamespace;
  global cog;
  cog = SimpleNamespace();
  cog.outl = print;
finally:
  pass

dent = 0
def indent():
  dent+=2;
def undent():
  global dent;
  dent-=2;
def outl(line):
  cog.outl(" " * dent + line);
#!/usr/bin/python3
from typing import ClassVar


class TxtBuilder:
  def __init__(self):
    self.str = ''
  def nl(self, text):
    self.str += text + '\n'
    return self
  def __str__(self):
    return self.str
  
class CmdArg:
  def __init__(self, argType, argName):
    self.argType = argType
    self.argName = argName
  @property
  def argDefStr(s):
    return f'{s.argType} {s.argName}'
    
    
class CmdRet:
  def __init__(self, retType):
    self.retType = retType

RetNew = CmdRet('New')
    
ArgStr = lambda argName:CmdArg('ArgStr', argName)
    
class CmdRet:
  def __init__(self, cmdRetType):
    self.cmdRetType = cmdRetType

nextCmdId = 1

class DbCmd:
  def __init__(self, cmdName, cmdRet, *cmdArgs):
    global nextCmdId
    self.cmdName = cmdName
    self.cmdRet = cmdRet
    self.cmdArgs = cmdArgs
    self.cmdId = nextCmdId
    nextCmdId+=1
  @property
  def argDefStr(s):
    return ", ".join(map(lambda x:x.argDefStr, s.cmdArgs))
  @property
  def clsHdrStr(s):
    return f'static DbCmd {s.cmdName} ({s.argDefStr});'
  @property
  def decl(s):
    ret = TxtBuilder()
    ret.nl(f'DbCmd DbCmd::{s.cmdName} ({s.argDefStr}) {{')
    ret.nl(f'  DbCmd ret();')
    ret.nl(f'  ret.cmdId = CMD_{s.cmdName};')
    for arg in s.cmdArgs:
      ret.nl(f'  ret.addArg(ARG_{arg.argType}, {arg.argName});')
    ret.nl(f'}}')
    return ret.str

def dbCmdGenCppText():
  clsHdr = TxtBuilder()
  clsHdr.nl('''
class DbCmd {
  DbCmd & AddArg(ArgType argType, ArgStr str) {
    addArg(argType, str);
    return this;
  }
''')
  
  for cmd in commands:
    clsHdr.nl(f'  static int CMD_{cmd.cmdName} = {cmd.cmdId};')
    clsHdr.nl('  ' + cmd.clsHdrStr)
  clsHdr.nl('};')
  clsHdr.nl('')
  
  decl = TxtBuilder()
  for cmd in commands:
    decl.nl('' + cmd.decl)
  return clsHdr.str + decl.str

commands = [
  DbCmd('createClass', RetNew, ArgStr('className')),
  DbCmd('createKey', RetNew, ArgStr('className'))
]

if __name__ == '__main__':
  print(dbCmdGenCppText())
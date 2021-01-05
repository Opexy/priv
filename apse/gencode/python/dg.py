from collections import defaultdict
from dataclasses import dataclass


class DgSchema:
  def __init__(self, schema):
    self.propDefs = {};
    self.tagDefs = {};
    self.clsDefs = {};
  def addPropName(self, propName, data={}):
    if propName not in self.propDefs:
      self.propDefs[propName] = data;
  def addTagName(self, tagName, data={}):
    if tagName not in self.tagDefs:
      self.tagDefs[tagName] = data;
  def addClassName(self, clsName, data={}):
    if clsName not in self.clsDefs:
      self.clsDefs[clsName] = data;

def default_assert(**kwargs):
    assert(False)
def swdict(swd:dict, dftn=default_assert):
  swdout = {}
  for key, ftn in swd.items():
    if isinstance(key, str):
      key = {key.split()}
    swdout[key] = ftn
  
  def proc(**args):
    return swdout.get(args.keys(), dftn)(**args)
  return proc

def mkdg(schema:DgSchema):
  @dataclass(unsafe_hash=True)
  class Cls:
    className:str
    def __post_init__(self):
      self.fields = {}
      self.instances = []
    @property
    def name(self):return self.className
    def mkField(self, fieldName):
      field = ukey(fieldName=fieldName)
      clsField = self.fields.get(field, None)
      if clsField is None:
        clsField = ukey(cls=self, field=ukey(fieldName=fieldName));
        self.fields[field] = clsField
      return clsField
    def mkInst(self):
      field = ukey()

  @dataclass(unsafe_hash=True)
  class ClsInst:
    cls:Cls
    instIdx:int

  @dataclass(unsafe_hash=True)
  class Field:
    fieldName:str
    @property
    def name(self):return self.fieldName

  @dataclass(unsafe_hash=True)
  class ClsField:
    cls:Cls
    field:Field

  class DgRoot:
    def mkClass(className):
      return ukey(className=className);
    pass

  _ukey_switch = swdict({
    'className':lambda className:_uniqkey(Cls(className)),
    'fieldName':lambda fieldName:_uniqkey(Field(fieldName)),
    'cls field':lambda cls, field:_uniqkey(ClsField(cls, field)),
  })
  _keys=defaultdict(lambda:None)
  _keys["InvalidKey"] = 0
  def _uniqkey(key):
    ret = _keys[key]
    if ret == None:
      ret = key
      ret.idSelf = len(_keys)
      _keys[key] = ret
    return ret

  def ukey(**args):
    ret = _ukey_switch(args)
    return ret

  
  dg = DgRoot()
  return dg

if __name__ == "__main__":
  def unittest():
    dg = mkdg()
    mycls = dg.ukey(className='Hello')
    mycls.addProp()
    inst = mycls.newi();
    inst.setProp()

    pass
  unittest()    

class DgCtrl:
  def __init__(ctrl, schema):
    ctrl.schema = schema;
  def pathAdd(ctrl, path):
    ctrl.paths.add
    if path.path: return path
    else: return ctrl.paths[path];
  def pathAddTag(ctrl, path, tag):
    ownerPath = ctrl.tagOwnerPath(tag, path);
    ownerPath.tags.add(tag);
  def pathAddProp(ctrl, path, prop):
    pass

def _mkdg(schema:DgSchema):
  class DgEdgePropName:
    __slots__ = ['val']
    type = 'propName'
    def __init__(edge, propName):
      edge.propName = propName
      edge.val = propName
  class DgEdgeObjInst:
    __slots__ = ['obj']:
  class DgEdge:
    def __new__(mcls, name, args, kwargs):
    def __init__(edge, type, spec):
      edge.type = type
      edge.spec = spec
      if (type == 'propName')
        return edge;
  class DgPath:
    __slots__= ['path', 'isTmp']
    def __init__(self, path, isTmp=True):
      self.path = path
      self.isTmp = isTmp
  paths = dict[any, DgPath]();
  def mkpath(path):
    if isinstance(path, DgPath):
      return path
    elif path in paths:
      return paths[path]
    else:
      ret = DgPath(path)
      paths[path] = path
      return ret
  def pathForTag(path, tag):
    tagdef = schema.tagDefs[tag]
    pft = ()
    for edge in path.path:
      if 

    if schema.tagDefs[tag].allowed:

  pathTags = defaultdict[DgPath, set](lambda:set())
  tagPaths = defaultdict[str, set[DgPath]](lambda:set[DgPath]())
  def pathAddTag(_path, tag):
    pft = pathForTag(_path, tag)
    pft.isTmp = False
    pathTags[path].add(tag)
    tagPaths[tag].add(path)
  pathProps = defaultdict[DgPath, dict](lambda:dict())
  def pathSetProp(_path, propName, prop):
    path = mkpath(_path)
    pathProps[path][propName] = prop

  ctrl = {'paths':paths, 'pathTags':pathTags, 'tagPaths':tagPaths, 'pathProps':pathProps}
  class Dg:
    def __init__(dg, ctrl, path):
      dg.path = path;
      dg.ctrl = ctrl;
    def _path(dg, path):
      return Dg(dg.ctrl, dg.path + path);
    def prop(dg, propName):
      return dg._path(('propName', propName));
    def addTag(dg, tag):
      return dg.ctrl.pathAddTag(dg.path, tag);


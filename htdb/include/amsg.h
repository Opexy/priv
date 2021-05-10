#pragma once
#ifndef AMSG_H
#define AMSG_H
#include <cstdint>
namespace htdb
{
typedef struct Fo;
typedef const char *FoKey;
enum ValType {
  kUndefined,
  kValObjStr,
  kValI64, 
};
class FoVal {
public:
  void SetI64(int64_t val);
  Val(int64_t val){SetI64(val);}
private:
  ValType vt_:8;
  int     v3_:24;
  int32_t v4_;
  int64_t v8_;
};

typedef struct FoSchmea;

struct FoSchemaBuilder {
  
};

Fo *NewFo(FoSchema &schema);

void Put(Fo &fo, FoKey &key, FoVal &val){

}

void test(){
  struct RunDb {
    void BeginProgram(int pid, int ppid, char **argl, char **envl){
      Program program = Program::EmplaceFromPid(pid);
      program.CreateColumn()
    }
    void addProgramArg(int pid, char *arg) {
    };
    void addProgramEnv(int pid, char *envk, char *envv){
    };
  }
  Fo *db;
  Emplace("Program.Pid")
  Program("Program.Pid"Equals()) Get(db, "Program.Pid", )
  Put(db, "Program", );
  Put(db, "Data", "DataBase");
}
}
#endif // AMSG_H
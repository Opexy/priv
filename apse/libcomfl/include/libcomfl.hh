// Copyright 2020 Taugoal LLC. All Rights Reserved.
#pragma once
#include <stdint.h>
#include "comfl_utils.hh"
#include "comfl_concurrency.hh"
#include "comfl_shmem.hh"
//#include "comfl_datatype.hh"
// system:protocol:endpoint received cmd (cmdname, stage, seqid, params, backtrack information...)
// system processing request -- usually not synchronized unless explicitly (information exchanged)
// command Name -- Check
// System Name -- Check
// Processing Stages: Need hashed. Will have 1, 2, 3...
// system forwarding request
// system received request
//CFL APIS
// #define cfl_script(cfl_, script_...) \
//   cflScript(cfl_, "{"#script_"}")
// #define cfl_system(cfl_, sys_, script_...) \
//   cflSystem(cflScript(cfl_, "{" "system:"#sys_" "#script_"}"))
// //#define cfl_system_run_cmd cfl_run_cmd
// #define cfl_run_cmd(cfl_, cmd_, script_...) \
//   cflRunCmd(cflScript(cfl_, "{" "runcmd:"#cmd_" "#script_"}"))
// #define cfl_set(cfl_, obj, script_...) \
//   cflScript(cfl_, "{"#script_"}").setVal(obj)

// typedef struct cfl_s cfl_s;
// typedef struct cfl_p cfl_p;
// typedef struct cfl_s cflsys_s;
// typedef struct cfl_p cflsys_p;
// typedef struct cfl_s cflruncmd_s;
// typedef struct cfl_p cflruncmd_p;
// typedef struct cfv_s cfv_s;
// struct cfl_p:sptr<cfl_s>{
//   using sptr::sptr;
// };

// //void cfl_release(cflptr *ppcfl);
// cfl_p cflScript(cfl_p parent, const char *script);
// cflsys_p cflSystem(cfl_p cfl); // effectively casting.
// cflruncmd_p cflRunCmd(cfl_p cfl);
// void cflRelease(cfl_p *pcfl);
// void cflSetVal(cfl_p cfl, cfv_p cfv);



#include <fmt/core.h>
#include <fmt/chrono.h>
#define logstr(_fmt, ...) fmt::print("{} {}:{} " _fmt, tsstr(nsstamp()),  __FILE_NAME__, __LINE__, __VA_ARGS__)

inline std::string tsstr(const stamp_t & timestamp){
  int microseconds = (timestamp.tick % 1000000000)/1000;
  time_t epoch = timestamp.tick / 1000000000;
  tm local;
  localtime_r(&epoch, &local);
  return fmt::format("[{:%H:%M:%S}.{:0>6d}]", local, microseconds);
}


#include "apse_ast2.hh"

void main(){
  auto str = 
R"(
(system:MiServer, 
  (cmd:EchoPrint)),
  (interface:cmdline,
   cmd:item),
(
  stage:UserInput TCP.Client(commandline)
  stage:ServerExec,
  stage:FeedbackProcess,

)
)";
auto spec = 
R"(
(system:$SysName,
  (cmd:$CmdName)
  (interface:$InterfaceName, 
    $InterfaceItem)
)";
  #define cfl_system(...)
  #define cfl_system_proc(...)
  #define cfl_proc_stage(...)
  cfl_system(sysname);
  cfl_system_proc(sysname, procname);
  cfl_proc_stage(procname, stagename, stagetype);
  cfl_proc_stage(hello, client_received_request, c++);
  cfl_proc_stage(hello, client_forwarded_request, c++);
  cfl_proc_stage(hello, server_received_request, c++);
  cfl_proc_stage(hello, server_create_response_string, c++);
  cfl_proc_stage(hello, server_send_response_string, c++);
  cfl_proc_stage(hello, received_response_string, callback.c++);
  cfl_proc_stage(hello, received_response_string, c++);
  

}
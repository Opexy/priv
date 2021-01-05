// Copyright 2020 Taugoal LLC. All Rights Reserved.
#include <iostream>
#include "libapse.hh"
#include <zmq.hpp>
#define SrcInit(...) #__VA_ARGS__
// comli udp://192.168.1.100
// flad: flow arrial dictionary
int main(int argc, char **argv){
  auto systemscript = R"(
{system:server},
{sysrem:client},

{nativeftn:musicfft, runon:server,
  {param:ms, io:input, type:MusicSample:{
    field:bitrate         type:uint32_t,
    field:sampleRate      type:uint32_t meaning:{frequency of:samples over:1:second}}
    field:sampleFormat    type:SampleFormat:typeenum{wav, mp3},
    field:samples         type:array{elemtype:ms.sampleFormat},
  }},
  {param:window, io:input, type:FFTWindow:{
    field:nsamples        type:uint32_t
  }},
  {param:fds, io:output, type:FrequencyDomainData:{
    field:packets        type:array2d{elemtype:FrequencyDomainDataItem:{
      fields:{r,i} type:double}}
  }},
  /* on return input and output will be visible. */
},

{nativeftn:readmusic, runon:client,
  {param:musicFile, io:input, type:string},
  {param ms, io:ouput, type:MusicSample},
},
{nativeftn:writemusic, runon:client,
  {param:fdsOutputFile, io:input, type:string},
  {param:fds, io:input, type:FrequencyDomainData},
},

{procedure:fftmusic, 
  exposeto:{interface:cmdline, target:client},
  call:readmusic,
  call:musicfft,
  call:writemusic,
  onevent:musicfft.progress call:onprogress on:client,
}

{systemstart:server role:server comm:{listen:tcp:127.0.0.1:9901, listen:udp::9901}}
{systemstart:client role:client comm:{connect:server} interface:cmdline},
)";
  //auto apse = Apse();
  //auto client = apse.startSystem("client");
  //auto ccmdline = client.startInterface("nativecmd");
  //ccmdline.ingest(argc, argv);
  //apse.forever();

  auto &svr = *Svr::create();
  svr.addRole("Server");
  logstr("hello {} {} {}\n", Kstr("Server").vidx, Kstr("Server").vidx, Kstr("Server").toStrv());
  svr.run("");

  



  //auto root = cfl_script(NULL, STR(name:root, 
  //{system name:server},
  //{system name:client},
  //{client:connect to:server /*... policy */} { 
  //  on:established(myconnection){
  //    {client:send hollyloyah}
  //  },
  //},
  //{system:any on:established(myconnection), client:send Helloloyah}));

  //auto client = cfl_system(root, client,);
  //auto server = cfl_system(root, server,);
  //cfl_set_variable(bunk, root, client:honk:book);
  //cfl_run_cmd(client, sendword,);

  /*
  zmq::socket_t socket{context, zmq::socket_type::req};
  socket.bind(argv[1]);
  const std::string data{"Hello"};

  for (auto request_num = 0; request_num < 10; ++request_num) 
  {
      // send the request message
      logstr("Sending Hello {}...\n", request_num);
      socket.send(zmq::buffer(data), zmq::send_flags::none);
      
      // wait for reply from server
      zmq::message_t reply{};
      socket.recv(reply, zmq::recv_flags::none);

      std::cout << "Received " << reply.to_string(); 
      std::cout << " (" << request_num << ")";
      std::cout << std::endl;
  }*/
  

  std::cout<<tsstr(nsstamp())<<std::endl;
  logstr("hello {}", "world");

  return 0;
}
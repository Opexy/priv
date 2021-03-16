#pragma once
#include <cstddef>
#include <array>
#include <vector>
#include "mediarec_video.hh"
#include "props.hh"
struct PipeNodeConnection {
  PipeNode *From;
  PipeNode *To;
  DestAddr *DestAddr;
};
struct DestAddr {};
struct DestAddrMedia {

};
typedef PipeNodeConnection * PipeNodeConnectionRef;

struct PipeNodeConnections:
  public std::vector<PipeNodeConnectionRef> {
};
struct PipeNode {

  PipeNodeConnections Inputs;
  PipeNodeConnections Outputs;
};

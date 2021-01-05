// Copyright 2020 Taugoal LLC. All Rights Reserved.
#include <iostream>
#include "gena.hh"
using namespace std;
// Automated Parallelization-Serialization Engine

void createWindow(){
  
}

int main(int argc, const char **argv){
  SystemStart();
  auto proc = gena_begin(App.Init()); // App.UserInit();
  gena_set(App.CreateWindow(), createWindow);
  gena_set(proc.Create, createWindow);
  gena_set(proc.createWinow(), createWindow);
  // driver...
  gena_continue(App.Init());
  App.PresentWindows();
  return 0;
}
https://www.youtube.com/watch?v=ZphadMGufY8

Bins

Elements

Pads

Source - src

Filter - sink -- src

demuxer -- sink, src_01, src_02;

muxer -- sink_1, sink_2, src

tee -- sink, src_01, src_02

Communication

Buffers -- From Pads

Events -- Registerable

Queries -- Pull

Messages -- Async Events

Gstreamer -- gravity wave.

Element States

NULL, Ready, Paused, Playing, State changes: NULL-Ready-Paused-Playing

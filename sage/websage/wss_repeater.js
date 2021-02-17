const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const ctx  = {
  peers:[],
  peerOf(ws){return this.peers.find(peer=>peer !== ws)},
  remove(ws){this.peers = this.peers.filter(peer => peer !== ws)}
};

wss.on('connection', function connection(ws) {
  ws.msgs = [];
  ctx.peers.push(ws);
  let peer = ctx.peerOf(ws)
  peer.msgs.forEach(msg=>ws.send(msg));
  peer.msgs = [];
  ws.on('message', function incoming(message) {
    let peer = ctx.peerOf(ws);
    if(peer){
      peer.send(ws);
    } else {
      ws.msgs.push(message);
    }
  });

  ws.on('close', function close() {
    ctx.remove(ws);
    console.log('disconnected');
  });

  ws.send('something');
});
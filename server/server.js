const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
var {getChannelList,getChannelData,channelStats} = require('../youtube/channel');

var app = express();
http.globalAgent.maxSockets=Infinity;
var server = http.createServer(app);
var io = socketIO(server);
// var channelR = new Channel();
// var newRoom;

app.use(express.static(publicPath));


io.on('connection', (socket) => {

  socket.on('newConnection',() => {
  // socket.join(socket.id);
  // channelR.removeCh(socket.id)
  // channelR.addCHannelRoom(socket.id);

  // newRoom = channelR.getCh(socket.id);
  //
  // console.log(newRoom);


  })
  //console.log(newRoom);


  socket.to(socket.id).on('searchForChannel', (channel,callback) => {

          getChannelList(channel,(channelList)=> {
              io.to(socket.id).emit('channel-List', channelList);
        });


      callback();
    });

      socket.to(socket.id).on('channelDataRequest', (channelId,callback) => {
            //error handling
              getChannelData(channelId,(channelData) => {


                  io.to(socket.id).emit('channel-data', channelData);
                  //error handling
                    channelStats(channelData.address,(channelStats) => {
                            // console.log(channelStats.videoTotals);
                      io.to(socket.id).emit('channel-Stats', channelStats,channelData);
                  });
              });

          callback();
      });



socket.on('disconnect', () => {
      console.log('client disconnected from server');
      });
    });



server.listen(8090, () => {
  console.log('started on port 8090');
})

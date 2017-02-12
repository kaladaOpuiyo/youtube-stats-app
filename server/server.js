const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');
const {getChannelList,getChannelData,channelStats} = require('../youtube/channel');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));



io.on('connection', (socket) => {


      socket.on('searchForChannel', (channel,callback) => {
  //error handling
            getChannelList(channel,(channelList)=> {
          io.emit('channel-List', channelList);
        });

      callback();
    });

      socket.on('channelDataRequest', (channelId,callback) => {
            //error handling
            getChannelData(channelId,(channelData,err) => {

                    io.emit('channel-data', channelData);

                    //error handling
                    channelStats(channelData.address,(channelStats) => {
                            console.log(channelStats.videoTotals);
                      io.emit('channel-Stats', channelStats,channelData);
                  });
              });

          callback();
      });



socket.on('disconnect', () => {
      console.log('client disconnected from server');
      });
    });

server.listen(3000, () => {
  console.log('started on port 3000');
})

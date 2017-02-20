const yargs = require('yargs');
const axios = require('axios');
var url = require('./urls');
const socketIO = require('socket.io');

var counter=0;
var videoTotals=0;
var viewCountTotal =0;
var likeCountTotal=0;
var dislikeCountTotal=0;
var commentCountTotal=0;
var vidStats=0;


class Channel {
  constructor(id){
    this.channels = [];



  }

  addCHannelRoom(room){
    var ch = {room};
    this.channels.push(ch);
    return ch;
  }

  getchannelList(room){
  var ch = this.channels.filter((channel)=>channel.room === room);
  var chArray = channels.map((channel)=>channel.name);
  return chArray;
}

getCh(room){
  return this.channels.filter((channel) => channel.room===room)[0]
}
removeCh(room){
  var ch = this.getCh(room);

  if(ch){
    this.channels = this.channels.filter((channel) => channel.room!==room);
  }
  return ch;
}

// console.log(id);
// console.log(counter);


getChannelList(channel,results){

  var channelArray = [];
  axios.get(url.searchForChannel(channel)).then((response) => {

        for(var i=0;i<10;i++){
            var chId = response.data.items[i].snippet.channelId;
              var title = response.data.items[i].snippet.title;
              channelArray.push({
              channel_id:chId,
              channel_title:title
            });

          }
      results(channelArray);
        }).catch((e) => {
          if(e){
           console.log(e);
          }
        });



}

getChannelData(chId, results){

axios.all([axios.get(url.getChannelStats(chId)), axios.get(url.getUploadStats(chId))]).then(axios.spread((chlstats,uplstats) => {

console.log(chlstats.data.items[0].snippet.thumbnails.high.url);

var uploadId = uplstats.data.items[0].contentDetails.relatedPlaylists.uploads;

      var channelDataArray = {
        pic: chlstats.data.items[0].snippet.thumbnails.high.url,
        ch_title : chlstats.data.items[0].snippet.title,
        ch_viewCount :  chlstats.data.items[0].statistics.viewCount,
        ch_subscriberCount :  chlstats.data.items[0].statistics.subscriberCount,
        ch_commentCount :  chlstats.data.items[0].statistics.commentCount,
        ch_videoCount :  chlstats.data.items[0].statistics.videoCount,
        address : url.getChannelVideoList(uploadId),
        playlistId : /playlistId=([^&]+)/.exec(url.getChannelVideoList(uploadId))[1] ?/playlistId=([^&]+)/.exec(url.getChannelVideoList(uploadId))[1]:''
      };

      results(channelDataArray);


  })).catch((e) => {
    if(e){
       console.log(e);
      }
  });

}


channelStats(address,playlistId,results){
    var total=0;
     axios.get(address).then((response) =>{

       var nextPageToken = response.data.nextPageToken?`&pageToken=${response.data.nextPageToken}`:'';
       var prevPageToken = response.data.prevPageToken?`&pageToken=${response.data.prevPageToken}`:'';

        //
        // console.log(`test1 ${response.data.items.length == 0}`);
        // console.log(`test2${!prevPageToken && counter > 0}` );
      if(!prevPageToken && counter > 0 || response.data.items.length == 0){

        var  chData = {

            viewCountTotal,
            likeCountTotal,
            dislikeCountTotal,
            commentCountTotal,
            videoTotals

            }
            counter=0;
            viewCountTotal=0;
            likeCountTotal=0;
            dislikeCountTotal=0;
            commentCountTotal =0;
            videoTotals =0;

            return results(chData);

         }else{

            var value = this.getTotals(response,total);
            videoTotals+=value;

                    counter++;
                      //Set next playlist page
                       var listVideoUrl = url.getChannelVideoListWithPageToken(playlistId,nextPageToken);


                          for (var index=0; index < value; index++) {

                            var vidId =response.data.items[index].snippet.resourceId.videoId;

                              //Get Video Data by videoID
                               axios.get(url.getVideoStatsUrl(vidId)).then((response) => {
                                 viewCountTotal+= parseInt(response.data.items[0].statistics.viewCount)?parseInt(response.data.items[0].statistics.viewCount):0;
                                 likeCountTotal+= parseInt(response.data.items[0].statistics.likeCount)?parseInt(response.data.items[0].statistics.likeCount):0;
                                 dislikeCountTotal+= parseInt(response.data.items[0].statistics.dislikeCount)? parseInt(response.data.items[0].statistics.dislikeCount):0;
                                 commentCountTotal+= parseInt(response.data.items[0].statistics.commentCount)? parseInt(response.data.items[0].statistics.commentCount):0;

                               },0).catch((e) => {

                                   if(e.message){
                                       console.log(e);
                                   }
                            });

                          }
                      }

                        // Recursive call to method using nextPageToken
                        return this.channelStats(listVideoUrl,playlistId,results);

                     }).catch((e) => {
                             if(e.message){
                                  console.log(e);
                             }
                        });

                }

//Get number of videos per page
getTotals(response,total){

  try {

        while(true){
              total++;
              response.data.items[total].snippet;
            }
          } catch (e) {
              return total;
      }
    }

}
module.exports = {Channel};

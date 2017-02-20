const yargs = require('yargs');
const axios = require('axios');
var url = require('./urls');
const socketIO = require('socket.io');

var counter;
var videoTotals;
var viewCountTotal;
var likeCountTotal;
var dislikeCountTotal;
var commentCountTotal;
var vidStats;

var reset = () => {
  counter=0;
  videoTotals=0;
  viewCountTotal =0;
  likeCountTotal=0;
  dislikeCountTotal=0;
  commentCountTotal=0;
  vidStats=0;
}


var getChannelList = (channel,results) => {

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

var getChannelData = (chId, results) => {

axios.all([axios.get(url.getChannelStats(chId)), axios.get(url.getUploadStats(chId))]).then(axios.spread((chlstats,uplstats) => {

// console.log(chlstats.data.items[0].snippet.thumbnails.high.url);

var uploadId = uplstats.data.items[0].contentDetails.relatedPlaylists.uploads;

      var channelDataArray = {
        pic: chlstats.data.items[0].snippet.thumbnails.high.url,
        ch_title : chlstats.data.items[0].snippet.title,
        ch_viewCount :  chlstats.data.items[0].statistics.viewCount,
        ch_subscriberCount :  chlstats.data.items[0].statistics.subscriberCount,
        ch_commentCount :  chlstats.data.items[0].statistics.commentCount,
        ch_videoCount :  chlstats.data.items[0].statistics.videoCount,
        address : url.getChannelVideoList(uploadId),
      };
      reset();
      results(channelDataArray);


  })).catch((e) => {
    if(e){
       console.log(e);
      }
  });

}


var channelStats = (address,results)=> {
    var total=0;
    var playlistId = /playlistId=([^&]+)/.exec(address)[1] ?/playlistId=([^&]+)/.exec(address)[1]:'';

     axios.get(address).then((response) =>{

       var nextPageToken = response.data.nextPageToken?`&pageToken=${response.data.nextPageToken}`:'';
       var prevPageToken = response.data.prevPageToken?`&pageToken=${response.data.prevPageToken}`:'';

      if(!prevPageToken && counter > 0 || response.data.items.length == 0){

        var  chData = {

            viewCountTotal,
            likeCountTotal,
            dislikeCountTotal,
            commentCountTotal,
            videoTotals

            }
            reset();
            return results(chData);

         }
            var value = getTotals(response,total);
            videoTotals+=value;
            counter++;

            getVidStats(value,response);

            // Recursive call to method using nextPageToken
            return channelStats(url.getChannelVideoListWithPageToken(playlistId,nextPageToken),results);

                     }).catch((e) => {
                             if(e.message){
                                  console.log(e);
                             }
                        });

                }
var getVidStats = (value,response) => {

  for (var index=0; index < value; index++) {

    var vidId =response.data.items[index].snippet.resourceId.videoId;

      //Get Video Data by videoID
       axios.get(url.getVideoStatsUrl(vidId)).then((response) => {
         viewCountTotal+= parseInt(response.data.items[0].statistics.viewCount)?parseInt(response.data.items[0].statistics.viewCount):0;
         likeCountTotal+= parseInt(response.data.items[0].statistics.likeCount)?parseInt(response.data.items[0].statistics.likeCount):0;
         dislikeCountTotal+= parseInt(response.data.items[0].statistics.dislikeCount)? parseInt(response.data.items[0].statistics.dislikeCount):0;
         commentCountTotal+= parseInt(response.data.items[0].statistics.commentCount)? parseInt(response.data.items[0].statistics.commentCount):0;

       }).catch((e) => {

           if(e.message){
               console.log(e);
           }
      });

    }


}
//Get number of videos per page
var getTotals = (response,total) => {

  try {

        while(true){
              total++;
              response.data.items[total].snippet;
            }
          } catch (e) {
              return total;
      }
    }
module.exports = {getChannelList,getChannelData,channelStats};

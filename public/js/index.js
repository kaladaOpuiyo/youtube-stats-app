var socket = io();

socket.on('connect',function () {
  console.log('connected to server sucessful');
    socket.emit('newConnection',function () {});

});

socket.on('channel-Stats', function (channelStats,channelData) {

  videoStats = {
    vid_Total: channelStats.videoTotals.toLocaleString(),
    vid_viewCountTotal:channelStats.viewCountTotal.toLocaleString(),
    vid_likeCountTotal:channelStats.likeCountTotal.toLocaleString(),
    vid_dislikeCountTotal:channelStats.dislikeCountTotal.toLocaleString(),
    vid_commentCountTotal:channelStats.commentCountTotal.toLocaleString(),
    vid_commentsPerView:((channelStats.commentCountTotal/channelStats.viewCountTotal)*1000).toFixed(2),
    vid_likesPerView: ((channelStats.likeCountTotal/channelStats.viewCountTotal)*1000).toFixed(2),
    vid_dislikesPerView: ((channelStats.dislikeCountTotal/channelStats.viewCountTotal)*1000).toFixed(2),
    vid_averageViewsPerVideo:parseInt(((channelStats.viewCountTotal/channelData.ch_videoCount)).toFixed(0)).toLocaleString(),
    vid_channelEngagementScore:parseInt((((channelStats.likeCountTotal-channelStats.dislikeCountTotal+channelStats.commentCountTotal)/channelData.ch_subscriberCount)).toFixed(2)).toLocaleString()
    }

    var template = jQuery('#channel-Stats-template').html();
    var html = Mustache.render(template,videoStats);
    jQuery('#Stats-display').html(html);

    var templateTitle = jQuery('#title-template').html();
    var htmlTitle = Mustache.render(templateTitle,videoStats);
    jQuery('#title-display').html(htmlTitle);


});


socket.on('channel-data', function (channelData) {

  var chData = {
            pic:channelData.pic,
            title:channelData.ch_title,
            view_Count:parseInt(channelData.ch_viewCount).toLocaleString(),
            subscriber_Count:parseInt(channelData.ch_subscriberCount).toLocaleString(),
            comment_Count:parseInt(channelData.ch_commentCoun).toLocaleString(),
            video_Count: parseInt(channelData.ch_videoCount).toLocaleString(),
            vid_viewCountTotal:parseInt(channelData.vid_viewCountTotal).toLocaleString(),
            totalVideos:channelData.videoTotals
          }
    var template = jQuery('#channel-data-template').html();
    var html = Mustache.render(template,chData);

    jQuery('#data-display').html(html);
    jQuery('#title-display').html('');
    jQuery('#Stats-display').html('<div><img src="images/loading.gif" style="display:block; margin: 0 auto; " alt= "<span class=green><h1><b><i>loading...</i></b></h1></span>" </div>');


  });

var channelSearch = jQuery('#channelSearch-request');

  channelSearch.on('click', function () {

    var channel = jQuery('[name=channelSearch]').val();

    socket.emit('searchForChannel',channel,function () {

  });

});

var channelData = jQuery('#channelResult');

  channelData.on('click','li', function (e) {

      var channelId = e.target.id;

        socket.emit('channelDataRequest',channelId,function () {

  });
});
// socket.on('channel-List', function (channelList) {
// console.log(channelList);
//   jQuery('#channelResult').empty();
//   for(var i in channelList){
//     jQuery('#channelResult')
//     .append("<a href=#><li id= "+channelList[i].channel_id+">"+  channelList[i].channel_title + " </li></a>");
//     }
// });


socket.on('channel-List',function (channelList) {
console.log(channelList);

  jQuery('#channelResult').empty();
  for(var i in channelList){
    jQuery('#channelResult')
    .append("<a href=#><li id= "+channelList[i].channel_id+">"+  channelList[i].channel_title + " </li></a>");
    }
});

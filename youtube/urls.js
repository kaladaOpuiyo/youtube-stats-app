const key = require('./keys');

const youtube_v3_url = 'https://www.googleapis.com/youtube/v3/';


var searchForChannel = (encodedSearch) => `${youtube_v3_url}search?key=${key}&part=snippet&maxResults=10&q=${encodedSearch}&type=channel&order=relevance&hl=en`;

var getChannelStats = (chId) => `${youtube_v3_url}channels?part=snippet,statistics&id=${chId}&key=${key}`;

var getUploadStats = (chId) => `${youtube_v3_url}channels?part=contentDetails&id=${chId}&key=${key}`;

var getChannelVideoList = (playlistId) => `${youtube_v3_url}playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}`;

var getChannelVideoListWithPageToken  = (playlistId,nextPageToken) => `${youtube_v3_url}playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}${nextPageToken}`;

 var getVideoStatsUrl = (vidId) => `${youtube_v3_url}videos?&part=statistics&id=${vidId}&key=${key}`;


module.exports = {
  searchForChannel,
  getChannelStats,
  getUploadStats,
  getChannelVideoList,
  getChannelVideoListWithPageToken,
  getVideoStatsUrl

};

import config from './config';

// Environment Variables
const YOUTUBE_V3_URL = config.YOUTUBE_V3_URL;
const YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;

const searchForChannelUrl = (encodedSearch) =>
`${YOUTUBE_V3_URL}search?key=` +
 `${YOUTUBE_API_KEY}&part=snippet&maxResults=10&q=${encodedSearch}&type=channel&order=relevance&hl=en`;

const getChannelStatsUrl = (id) =>
`${YOUTUBE_V3_URL}channels?part=snippet,statistics&id=${id}&key=${YOUTUBE_API_KEY}`;

const getUploadStatsUrl = (id) =>
`${YOUTUBE_V3_URL}channels?part=contentDetails&id=${id}&key=${YOUTUBE_API_KEY}`;

const getChannelVideoListUrl = (id) =>
 `${YOUTUBE_V3_URL}playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${YOUTUBE_API_KEY}`;

const getChannelVideoListWithPageTokenUrl = (id, token) =>
`${YOUTUBE_V3_URL}playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${YOUTUBE_API_KEY}${token}`;

const getVideoStatsUrl = (id) =>
`${YOUTUBE_V3_URL}videos?&part=statistics&id=${id}&key=${YOUTUBE_API_KEY}`;

module.exports = {
  searchForChannelUrl,
  getChannelStatsUrl,
  getUploadStatsUrl,
  getChannelVideoListUrl,
  getChannelVideoListWithPageTokenUrl,
  getVideoStatsUrl

};

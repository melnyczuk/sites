export type VideoInfo = {
  videoId: string;
  title: string;
  lengthSeconds: number;
  keywords: string[];
  channelId: string;
  isCrawlable: boolean;
  thumbnail: {
    thumbnails: unknown[];
  };
  viewCount: number;
  author: string;
  isLiveContent: boolean;
};

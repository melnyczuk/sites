import React, { FC } from 'react';
import { useAsyncRetry, useWindowSize } from 'react-use';
import YouTube from 'react-youtube';

import { Loader } from '../../components';
import { VideoInfo } from './types';
import { VideoDiv, DescDiv, PageDiv } from './styles';

const RATIO = 0.5;
const ENDPOINT = 'https://imgxxxx.herokuapp.com/info';

const ImgXXXX: FC = () => {
  const { width: w, height: h } = useWindowSize();
  const width = w * RATIO;
  const height = h * RATIO;

  const { loading, error, value, retry } = useAsyncRetry<VideoInfo>(
    async () => {
      const r = await fetch(ENDPOINT);
      return r.json();
    }
  );

  if (error) {
    retry();
  }

  if (loading) {
    return (
      <VideoDiv>
        <div
          style={{
            width,
            height,
            background: typeof window === 'undefined' ? 'black' : 'white',
          }}
        />
        <Loader/>
      </VideoDiv>
    );
  }

  const { videoId, title, author, viewCount } = value;

  return (
    <PageDiv>
      <VideoDiv>
        <YouTube
          videoId={videoId}
          opts={{
            width: `${width}`,
            height: `${height}`,
            playerVars: { autoplay: 1 },
          }}
          onReady={(event): void => {
            event.target.hideVideoInfo();
            event.target.playVideo();
          }}
          onEnd={retry}
          onError={retry}
        />
      </VideoDiv>
      <DescDiv>
        <h2>{title}</h2>
        <h3>{author}</h3>
        <p>{viewCount}</p>
      </DescDiv>
    </PageDiv>
  );
};

export default ImgXXXX;

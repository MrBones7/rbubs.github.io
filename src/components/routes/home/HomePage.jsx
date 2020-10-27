/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import cx from 'classnames';
import { fullscreen, backgroundVideoPlayer, ui } from './HomePage.styles.less';
import Nav from '../../ui/Nav';
import Player from '../../ui/Player';
import Counter from '../../ui/Counter';
import BackgroundVideoPlayer from '../../ui/BackgroundVideo';

const videoSrc = [
  {
    src: 'https://rebase.radio/assets/background-vp9.webm',
    type: 'video/webm',
  },
  {
    src: 'https://rebase.radio/assets/background.mp4',
    type: 'video/mp4',
  },
];
const posterSrc = 'https://rebase.radio/assets/poster.jpg';
const stationId = 'sb5955894a';

const Spacer = () => <div style={{ flexGrow: 1 }} />;

const HomePage = () => (
  <>
    <div className={cx(fullscreen, ui)}>
      <Nav />
      <Spacer />
      <Player initialVolume={0.6} stationId={stationId} />
    </div>
    <BackgroundVideoPlayer
      src={videoSrc}
      poster={posterSrc}
      className={cx(fullscreen, backgroundVideoPlayer)}
    />
  </>
);

export default HomePage;

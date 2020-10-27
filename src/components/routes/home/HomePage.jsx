/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { row, fullscreen, backgroundVideoPlayer, ui } from './HomePage.styles.less';
import Nav from '../../ui/Nav';
import Player from '../../ui/Player';
import SupportButton from '../../ui/SupportButton';
import BackgroundVideoPlayer from '../../ui/BackgroundVideo';

const supportUrl = 'https://app.rarible.com/token/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:59031:0x6667c694b55e68f6409bc96ace9a9ac3bb1fc132';
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

const Row = ({ alignItems, children }) => (
  <div className={row} style={{ alignItems }}>{children}</div>
);
Row.propTypes = {
  alignItems: PropTypes.string,
  children: PropTypes.any.isRequired,
};

const HomePage = () => (
  <>
    <div className={cx(fullscreen, ui)}>
      <Row>
        <Nav />
      </Row>
      <Spacer />
      <Row alignItems="flex-end">
        <Player initialVolume={0.6} stationId={stationId} />
        <SupportButton link={supportUrl}>
          Support Us
        </SupportButton>
      </Row>
    </div>
    <BackgroundVideoPlayer
      src={videoSrc}
      poster={posterSrc}
      className={cx(fullscreen, backgroundVideoPlayer)}
    />
  </>
);

export default HomePage;

/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { row, fullscreen, backgroundVideoPlayer, ui } from './HomePage.styles.less';
import BackgroundVideoPlayer from '../../ui/BackgroundVideo';
import ExitNextButton from '../../ui/ExitNextButton';
import ExitPrevButton from '../../ui/ExitPrevButton';
import Nav from '../../ui/Nav';
import Player from '../../ui/Player';
import Row from '../../ui/Row';
import SupportButton from '../../ui/SupportButton';

// EDIT THESES VALUES TO SETUP NEW VIDEO SETS

// array of video source info
const videoSrc = [
//  Minimal scene example
//  {
//    scenes: {
//      enter: 'A01_Enter',
//      mainLoop: 'A02_MainLoop',
//      exitNext: 'A06_ExitNext'
//    }, 
//    nftUrl: null
//  },
  {
    scenes: {
      enter: 'A01_Enter',
      mainLoop: 'A02_MainLoop',
      mainLoopToSubLoop: 'A03_MainLoopToSubLoop',
      subLoop: 'A04_SubLoop',
      subLoopToMainLoop: 'A05_SubLoopToMainLoop',
      exitNext: 'A06_ExitNext'
    }, 
    mainLoopMaxLoops: 6,
    mainLoopMinLoops: 3,       
    subLoopMaxLoops: 6,
    subLoopMinLoops: 3,
    nftUrl: null
  }, 
  {
    scenes: {    
      enter: 'B01_Enter',
      mainLoop: 'B02_MainLoop',
      mainLoopToSubLoop: 'B03_MainLoopToSubLoop',
      subLoop: 'B04_SubLoop',
      subLoopToMainLoop: 'B05_SubLoopToMainLoop',
      exitPrev: 'B06_ExitPrev',
      exitNext: 'B07_ExitNext'
    },
    mainLoopMaxLoops: 6,
    mainLoopMinLoops: 3,       
    subLoopMaxLoops: 6,
    subLoopMinLoops: 3,
    nftUrl: null
  }  
];

const stationId = 'sb5955894a';

// DO NOT EDIT BELOW THIS LINE

const Spacer = () => <div style={{ flexGrow: 1 }} />;

const HomePage = () => {  
  // store index of current video set
  // passed down to background video player as props
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // store url of current video nft
  // passed down to support button as props
  const [currentVideoNft, setCurrentVideoNft] = useState(null);

  // store exit button clicked status
  // values: undefined, prev, or next
  // passed down to background video player as props
  const [exit, setExit] = useState(undefined);

  // store whether to show exit next button
  // passed down to exit button as props
  const [showExitNext, setShowExitNext] = useState(true); 

  // store whether to show exit previous button
  // passed down to exit button as props
  const [showExitPrev, setShowExitPrev] = useState(false); 

  // click handler for ExitNextButton and ExitPrevButton
  const handleExitButton = buttonName => {
    setExit(buttonName);
    if (buttonName === 'next') {
      setShowExitNext(false);
    } else {
      setShowExitPrev(false);
    }
  }

  // reset exit state after exit scene has been loaded
  const resetExit = () => {
    setExit(undefined);
  }

  // change video index when video is exited
  const changeVideoIndex = (videoIndex) => {
    setCurrentVideoIndex(videoIndex);

    // display the exit previous button if an exitPrev video exists for this video set
    if (videoSrc[videoIndex] && videoSrc[videoIndex].scenes && videoSrc[videoIndex].scenes.exitPrev) {
      setShowExitPrev(true);
    } else {
      setShowExitPrev(false);     
    }

    // display the exit next button if an exitNext video exists for this video set
    if (videoSrc[videoIndex] && videoSrc[videoIndex].scenes && videoSrc[videoIndex].scenes.exitNext) {
      setShowExitNext(true);   
    } else {
      setShowExitNext(false);    
    }

    // update the url for the video nft if an nft exists for this video set
    if (videoSrc[videoIndex] && videoSrc[videoIndex].nftUrl) {
      setCurrentVideoNft(videoSrc[videoIndex].nftUrl);
    } else {
      setCurrentVideoNft(null);
    }
  }

  // executes once to load initial video set
  useEffect(()=>{
    changeVideoIndex(0);
  }, [])

  return (
    <>
      <div className={cx(fullscreen, ui)}>
        <Row>
          <Nav />
        </Row>
        <Spacer />
        <Row alignItems="flex-end">
          <Player initialVolume={0.6} stationId={stationId} />
          <div>
            <ExitPrevButton handler={handleExitButton} showExit={showExitPrev} />
            <ExitNextButton handler={handleExitButton} showExit={showExitNext} />
          </div>
          <SupportButton link={currentVideoNft} />
        </Row>
      </div>
      <BackgroundVideoPlayer
        videoSrc={videoSrc}
        changeVideoIndex={changeVideoIndex}
        className={cx(fullscreen, backgroundVideoPlayer)}
        currentVideoIndex={currentVideoIndex}
        exit={exit}
        resetExit={resetExit}
      />
    </>
  );
};

export default HomePage;
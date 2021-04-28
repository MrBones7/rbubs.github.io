/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import cx from 'classnames';
import { row, fullscreen, backgroundVideoPlayer, ui } from './HomePage.styles.less';
import BackgroundVideoPlayer from '../../ui/BackgroundVideo';
import ExitNextButton from '../../ui/ExitNextButton';
import ExitPrevButton from '../../ui/ExitPrevButton';
import Header from '../../ui/Header';
import ContentAbout from '../../ui/ContentAbout';
import Player from '../../ui/Player';
import Row from '../../ui/Row';

// EDIT THESES VALUES TO SETUP NEW VIDEO SETS

// array of video source info
const videoSrc = [
//  Minimal video set example
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
      enter: 'https://streamable.com/l/idiuej/',
      mainLoop: 'https://streamable.com/l/uqz91y/',
      mainLoopToSubLoop: 'https://streamable.com/l/akzkwp/',
      subLoop: 'https://streamable.com/l/1uvga7/',
      subLoopToMainLoop: 'https://streamable.com/l/q17ur9/',
      exitNext: 'https://streamable.com/l/3zec69/',
    },
    mainLoopMaxLoops: 6,
    mainLoopMinLoops: 3,
    subLoopMaxLoops: 6,
    subLoopMinLoops: 3,
    nftUrl: null,
  }, 
  {
    scenes: {
      enter: 'https://streamable.com/l/yl025m/',
      mainLoop: 'https://streamable.com/l/xsh8z4/',
      mainLoopToSubLoop: 'https://streamable.com/l/u81hvk/',
      subLoop: 'https://streamable.com/l/8zsfpm/',
      subLoopToMainLoop: 'https://streamable.com/l/61fetd/',
      exitPrev: 'https://streamable.com/l/p9nfo9/',
      // exitNext: 'https://streamable.com/l/ps8igy/'
    },
    mainLoopMaxLoops: 6,
    mainLoopMinLoops: 3,
    subLoopMaxLoops: 6,
    subLoopMinLoops: 3,
    nftUrl: null,
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
  // TODO: Update logic per scene, not per video set.
  const [currentSceneNft, setCurrentSceneNft] = useState(null);

  // current content item to display
  const [currentContent, setCurrentContent] = useState(null);

  // store exit button clicked status
  // values: undefined, prev, or next
  // passed down to background video player as props
  const [exit, setExit] = useState(undefined);

  // store whether to display exit previous button
  // passed down to exit button as props
  const [showExitPrev, setShowExitPrev] = useState(() => { 
    return (videoSrc[currentVideoIndex] && videoSrc[currentVideoIndex].scenes && videoSrc[currentVideoIndex].scenes.exitPrev) 
      ? true : false;
  });

  // store whether to display exit next button
  // passed down to exit button as props
  const [showExitNext, setShowExitNext] = useState(() => { 
    return (videoSrc[currentVideoIndex] && videoSrc[currentVideoIndex].scenes && videoSrc[currentVideoIndex].scenes.exitNext) 
      ? true : false;
  });  

  // click handler for ExitNextButton and ExitPrevButton
  const handleExitButton = buttonName => {
    setExit(buttonName);
    if (buttonName === 'next') {
      setShowExitNext(false);
    }

    if (buttonName === 'prev') {
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

    // set the exit previous button display status
    setShowExitPrev((videoSrc[videoIndex] && videoSrc[videoIndex].scenes && videoSrc[videoIndex].scenes.exitPrev) 
      ? true : false);

    // set the exit next button display status
    setShowExitNext((videoSrc[videoIndex] && videoSrc[videoIndex].scenes && videoSrc[videoIndex].scenes.exitNext) 
      ? true : false);

    // TODO: Change to update nft per scene, not per video set
    // update the url for the video nft if an nft exists for this video set
    if (videoSrc[videoIndex] && videoSrc[videoIndex].nftUrl) {
      setCurrentSceneNft(videoSrc[videoIndex].nftUrl);
    } else {
      setCurrentSceneNft(null);
    }
  }

  const handleNavMenu = (navSelection) => {
    setCurrentContent(navSelection);
  }

  const closeContent = () => {
    console.log('closeContent');
    setCurrentContent(null);
  }

  return (
    <>
      <div className={ cx(fullscreen, ui) }>
        <Header handler={ handleNavMenu } />
        <Spacer />
        <ContentAbout display={ currentContent } close={ closeContent } />
        <Row alignItems="flex-end">
          <Player initialVolume={ 0.6 } stationId={ stationId } />
          <div>
            <ExitPrevButton handler={ handleExitButton } showExit={ showExitPrev } />
            <ExitNextButton handler={ handleExitButton } showExit={ showExitNext } />
          </div>
        </Row>
      </div>
      <BackgroundVideoPlayer
        videoSrc={ videoSrc }
        changeVideoIndex={ changeVideoIndex }
        className={ cx(fullscreen, backgroundVideoPlayer) }
        currentVideoIndex={ currentVideoIndex }
        exit={ exit }
        resetExit={ resetExit }
      />
    </>
  );
};

export default HomePage
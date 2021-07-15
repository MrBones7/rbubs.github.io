/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { row, fullscreen, backgroundVideoPlayer, ui } from './HomePage.styles.less';
import BackgroundVideoPlayer from '../../ui/BackgroundVideo';
// import ExitNextButton from '../../ui/ExitNextButton';
// import ExitPrevButton from '../../ui/ExitPrevButton';
import StoreHome from '../../ui/Store';
import Stories from '../../ui/Store/Stories';
import StoreInDetails from '../../ui/Store/StoreInDetails';
import MystoriesHome from '../../ui/Mystories';
import MyStories from '../../ui/Mystories/MyStories';
import MyStorieInDetails from '../../ui/Mystories/MyStorieInDetails';
// import Search from '../../ui/Search';
import Header from '../../ui/Header';
import ContentAbout from '../../ui/ContentAbout';
import Player from '../../ui/Player';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../../redux/actions';

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
  },
];

const stationId = 'sb5955894a';

// DO NOT EDIT BELOW THIS LINE

const Spacer = () => <div style={{ flexGrow: 1 }} />;

const HomePage = () => {
  // store index of current video set
  // passed down to background video player as props
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const [isLandscape, setIsLandscape] = useState(false);

  const [isStore, setIsStore] = useState(false);

  const [address, setAddress] = useState(null);
  const providerOptions = {
    injected: {
      display: {
        name: 'Injected',
        description: 'Metamask',
      },
      package: null,
    },
  };

  let web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    providerOptions, // required
    cachedProvider: true,
  });

  const dispatch = useDispatch();

  const connect = async () => {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      setAddress(accounts[0]);
      dispatch(fetchUser({ address: accounts[0] }));
    }
  };

  useEffect(() => {
    dispatch(fetchUser({ address: address }));
  }, []);

  const disconnect = async () => {
    const provider = await web3Modal.connect();
    provider.on('disconnect', (res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    connect();
  }, [address]);

  const [isBottomContent, setIsShowBottomContent] = useState(true);

  const handleIsShowBottomContent = () => {
    setIsShowBottomContent(!isBottomContent);
  };

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
    return videoSrc[currentVideoIndex] &&
      videoSrc[currentVideoIndex].scenes &&
      videoSrc[currentVideoIndex].scenes.exitPrev
      ? true
      : false;
  });

  // store whether to display exit next button
  // passed down to exit button as props
  const [showExitNext, setShowExitNext] = useState(() => {
    return videoSrc[currentVideoIndex] &&
      videoSrc[currentVideoIndex].scenes &&
      videoSrc[currentVideoIndex].scenes.exitNext
      ? true
      : false;
  });

  // click handler for ExitNextButton and ExitPrevButton
  const handleExitButton = (buttonName) => {
    setExit(buttonName);
    if (buttonName === 'next') {
      setShowExitNext(false);
    }

    if (buttonName === 'prev') {
      setShowExitPrev(false);
    }
  };

  // reset exit state after exit scene has been loaded
  const resetExit = () => {
    setExit(undefined);
  };

  // change video index when video is exited
  const changeVideoIndex = (videoIndex) => {
    setCurrentVideoIndex(videoIndex);

    // set the exit previous button display status
    setShowExitPrev(
      videoSrc[videoIndex] && videoSrc[videoIndex].scenes && videoSrc[videoIndex].scenes.exitPrev
        ? true
        : false
    );

    // set the exit next button display status
    setShowExitNext(
      videoSrc[videoIndex] && videoSrc[videoIndex].scenes && videoSrc[videoIndex].scenes.exitNext
        ? true
        : false
    );

    // TODO: Change to update nft per scene, not per video set
    // update the url for the video nft if an nft exists for this video set
    if (videoSrc[videoIndex] && videoSrc[videoIndex].nftUrl) {
      setCurrentSceneNft(videoSrc[videoIndex].nftUrl);
    } else {
      setCurrentSceneNft(null);
    }
  };

  const handleNavMenu = (navSelection, store) => {
    if (navSelection === 'close') {
      setCurrentContent(null);
    } else {
      setCurrentContent(navSelection);
      setIsStore(store);
    }
  };

  const closeContent = () => {
    setCurrentContent(null);
  };
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    if (screen.orientation.type.match(/\w+/)[0] === 'landscape' && screen.orientation.angle !== 0) {
      setIsLandscape(true);
    } else {
      setIsLandscape(false);
    }
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  screen.orientation.onchange = function () {
    // logs 'portrait' or 'landscape'
    if (screen.orientation.type.match(/\w+/)[0] === 'landscape') {
      setIsLandscape(true);
      if (
        currentContent === 'myStories' ||
        currentContent === 'browseStories' ||
        currentContent === 'MystoriesInDetails'
      ) {
        setCurrentContent(null);
      }
    } else {
      setIsLandscape(false);
    }
  };

  return (
    <>
      <div className={cx(fullscreen, ui)}>
        <Header
          isBottomContent={isBottomContent}
          address={address}
          connect={connect}
          isLandscape={isLandscape}
          handleIsShowBottomContent={handleIsShowBottomContent}
          handler={handleNavMenu}
        />
        <Spacer />
        <ContentAbout display={currentContent} close={closeContent} />
        <Stories
          isBottomContent={isBottomContent}
          display={currentContent}
          close={closeContent}
          isStore={isStore}
          handler={handleNavMenu}
          isLandscape={isLandscape}
        />
        {/* <StoreInDetails
          isBottomContent={isBottomContent}
          display={currentContent}
          close={closeContent}
          handler={handleNavMenu}
        /> */}
        <MyStories
          isConnected={address !== null}
          isBottomContent={isBottomContent}
          showExitNext={showExitNext}
          handleExitButton={handleExitButton}
          display={currentContent}
          close={closeContent}
          isStore={isStore}
          handler={handleNavMenu}
          isLandscape={isLandscape}
        />
        <MyStorieInDetails
          isStore={isStore}
          isBottomContent={isBottomContent}
          isLandscape={isLandscape}
          display={currentContent}
          close={closeContent}
          handler={handleNavMenu}
        />
        {/* <Search display={currentContent} close={closeContent} handler={handleNavMenu} /> */}
        {!isLandscape ? (
          <StoreHome
            currentVideoIndex={currentVideoIndex}
            isBottomContent={isBottomContent}
            changeVideoIndex={changeVideoIndex}
            handler={handleNavMenu}
            isBottomContent={isBottomContent}
            display={currentContent}
          />
        ) : null}
        <MystoriesHome
          isLandscape={isLandscape}
          isBottomContent={isBottomContent}
          handler={handleNavMenu}
          display={currentContent}
        />
        <Player
          isLandscape={isLandscape}
          isBottomContent={isBottomContent}
          style={{ visibility: isBottomContent ? 'visible' : 'hidden' }}
          initialVolume={0.6}
          stationId={stationId}
          display={currentContent}
          handler={handleNavMenu}
        />{' '}
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

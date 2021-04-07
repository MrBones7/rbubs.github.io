import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BackgroundSceneList from '../../ui/BackgroundSceneList';

const BackgroundVideoPlayer = (props) => { 
  // store values for the current scene being displayed
  const [currentScene, setCurrentScene] = useState({ 
    name: 'enter', 
    player: 'enter_0', 
    posterSrc: undefined, 
    prevPlayer: undefined 
  });

  // store number of loops for looping scene
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    if (currentScene.player !== currentScene.prevPlayer) {
      playNextScene();  
    }

  }, [currentScene.player, currentScene.prevPlayer]);

  let videoTimer = null;

  // display the next current video
  const playNextScene = () => {
    // DOM handle for the player and wrapper
    var playerWrapper, player, prevPlayer;
    playerWrapper =  document.querySelector(`.${currentScene.player}`);
    player = document.querySelector(`.${currentScene.player} > video`);

    // play the video for the current scene
    playerWrapper.style.display = "inline";
    player.pause();
    player.addEventListener("canplay", function onCanPlay() {
      player.removeEventListener("canplay", onCanPlay);
      player.play();  
    });
    player.load();

    /*
    // short delay to remove potential loading flash between scenes
    if (currentScene.prevPlayer !== undefined) {
      //videoTimer = setTimeout(() =>  {
        prevPlayer = document.querySelector(`.${currentScene.prevPlayer}`);
        if (prevPlayer) {
          prevPlayer.style.display = "none";
        }
      //}, 350);
    } 
    */
    
    if (currentScene.prevPlayer !== undefined) {
      player.addEventListener("playing", function onPlaying() {
        console.log('onPlaying');
        player.removeEventListener("playing", onPlaying);
        prevPlayer = document.querySelector(`.${currentScene.prevPlayer}`);
        if (prevPlayer) {
          prevPlayer.style.display = "none";
        }
      });
    }

    // call handleVideoEnd when each video ends
    player.addEventListener('ended', handleVideoEnd, false);   
  }

  // replay the current scene
  const playLoopScene = (props) => {
    // DOM handle for the player and wrapper
    var playerWrapper, player, prevPlayer;
    playerWrapper =  document.querySelector(`.${currentScene.player}`);
    player = document.querySelector(`.${currentScene.player} > video`);

    console.log('Loops', loopCount);
    player.play();

    // call handleVideoEnd when each video ends
    player.addEventListener('ended', handleVideoEnd, false); 
  }

  // set the number of times to loop main loop or sub loop
  // to a pseudo-random number between min and max
  // defaults to 3 for both min and max
  // loopType {string} - can be 'main' or 'sub'
  const setLoop = (loopType) => {
    let max, min;

    if (loopType === 'main') {
      max = props.videoSrc[props.currentVideoIndex]["mainLoopMaxLoops"] || 3;
      min = props.videoSrc[props.currentVideoIndex]["mainLoopMinLoops"] || 3;
    } else if (loopType === 'sub') {
      max = props.videoSrc[props.currentVideoIndex]["subLoopMaxLoops"] || 3;
      min = props.videoSrc[props.currentVideoIndex]["subLoopMinLoops"] || 3;
    } else {
      max = 3;
      min = 3;
    }

    min = Math.ceil(min);
    max = Math.floor(max);
    setLoopCount(Math.floor(Math.random() * (max - min + 1) + min));  
  }

  // check to see if a video exists
  // used in switching between video sets
  const checkVideoExists = (videoIndex, scene) => {
    return (props.videoSrc[videoIndex] && 
      props.videoSrc[videoIndex]["scenes"] && 
      props.videoSrc[videoIndex]["scenes"][scene]) 
      ? 
      true : false;
  }

  // get a new video set when exiting
  const getNewVideoSet = (index) => {
    // and either increment to next video set (currentVideoIndex + 1),
    // decrement to the previous video (currentVideoIndex - 1) 
    // or if video doesn't exist, return to video set 0.
    const nextVideoIndex = checkVideoExists((props.currentVideoIndex * 1) + index, 'enter')
      ? (props.currentVideoIndex * 1) + index : 0

    props.changeVideoIndex(nextVideoIndex);
    //const scenes = listScenes();
    //setSceneList(scenes);
    return nextVideoIndex;
  }

  // advances to the next scene when each video ends
  const handleVideoEnd = (event) => {
    event.preventDefault();
    event.srcElement.removeEventListener("ended", handleVideoEnd);     // cleanup event handler

    switch (currentScene.name) {
      case "enter": {
        // set number of loops for main loop
        setLoop('main');
  
        setCurrentScene({ 
          name: 'mainLoop',
          player: `mainLoop_${props.currentVideoIndex}`,
          posterSrc: null,
          prevPlayer: `${currentScene.player}`
        });

        break;        
      }

      case "mainLoop": {
        // if exit previous has been clicked, advance to the exit previous scene
        if (props.exit === 'prev') {
          props.resetExit();
          setCurrentScene({ 
            name: 'exitPrev',
            player: `exitPrev_${props.currentVideoIndex}`,
            posterSrc: null,
            prevPlayer: currentScene.player
          });
        // if exit next has been clicked, advance to the exit next scene
        } else if (props.exit === 'next') {
          props.resetExit();
          setCurrentScene({ 
            name: 'exitNext',
            player: `exitNext_${props.currentVideoIndex}`,
            posterSrc: null,
            prevPlayer: currentScene.player
          }); 
        // if no exit buttons have been clicked       
        } else {
          // in video sets where mainLoopToSubLoop scene does not exist, continue the mainLoop by resetting the loopCount  
          var transitionExists = document.querySelector(`.mainLoopToSubLoop_${props.currentVideoIndex} > video`);          
          if  (!transitionExists) {
            setLoop('main');
          }

          // loop as many times as specified in loopCount
          /*if (loopCount > 0 && currentScene.prevPlayer !== currentScene.player) {
            setCurrentScene({ 
              name: currentScene.name,
              player: currentScene.player,
              posterSrc: currentScene.posterSrc,
              prevPlayer: currentScene.player
            }); 
            //setLoopCount(loopCount - 1);
            playNextScene();
          // after looping loopCount number of times, transition
          } else {*/
            // advance to mainLoopToSubLoop
            const nextScene = 'mainLoopToSubLoop';
            
            // set number of loops for sub loop
            setLoop('sub');

            setCurrentScene({ 
              name: nextScene,
              player: `${nextScene}_${props.currentVideoIndex}`,  
              posterSrc: null,
              prevPlayer: currentScene.player
            }); 
          // }
        }
        break;    
      }

      case "mainLoopToSubLoop": {
        setCurrentScene({ 
          name: 'subLoop',
          player: `subLoop_${props.currentVideoIndex}`,  
          posterSrc: null,
          prevPlayer: currentScene.player
        });
        break;
      }

      case "subLoop": {
        // loop as many times as specified in loopCount
        // cancel the loop if exit is clicked
        /*
        if (loopCount > 1 && !props.exit) {
          setCurrentScene({ 
            name: currentScene.name,
            player: currentScene.player,
            posterSrc: currentScene.posterSrc,
            prevPlayer: currentScene.player
          });
          playLoopScene();
        // after looping loopCount number of times, transition
        } else { */
          // in video sets where subLoopToMainLoop scene does not exist
          // advance directly to mainLoop
          // otherwise advance to subLoopToMainLoop
          const transitionExists = document.querySelector(`.subLoopToMainLoop_${props.currentVideoIndex} > video`);
          const nextScene = transitionExists ? 'subLoopToMainLoop' : 'mainLoop';

          // set number of loops for main loop
          setLoop('main'); 

          setCurrentScene({ 
            name: nextScene,
            player: `${nextScene}_${props.currentVideoIndex}`,
            posterSrc: null,
            prevPlayer: currentScene.player
          });
        // }
        break;        
      }

      case "subLoopToMainLoop": {
        setCurrentScene({ 
          name: 'mainLoop',
          player: `mainLoop_${props.currentVideoIndex}`,  
          posterSrc: null,
          prevPlayer: currentScene.player
        });
        break;        
      }

      case "exitNext": {       
        const newVideoIndex = getNewVideoSet(1);

        setCurrentScene({ 
          name: 'enter',
          player: `enter_${newVideoIndex}`,  
          posterSrc: null,
          prevPlayer: currentScene.player
        });   
        break;        
      }   
      
      case "exitPrev": {
        const newVideoIndex = getNewVideoSet(-1);

        setCurrentScene({ 
          name: 'enter',
          player: `enter_${newVideoIndex}`,  
          posterSrc: null,
          prevPlayer: currentScene.player
        });
        break;        
      }        
    }
  }

  return <BackgroundSceneList
            currentVideoIndex={props.currentVideoIndex}
            videoSrc={props.videoSrc} />
};

BackgroundVideoPlayer.propTypes = {
  changeVideoIndex: PropTypes.func.isRequired,
  className: PropTypes.any,
  currentVideoIndex: PropTypes.number.isRequired,
  exit: PropTypes.string,  
  resetExit: PropTypes.func.isRequired,
  videoSrc: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default BackgroundVideoPlayer;
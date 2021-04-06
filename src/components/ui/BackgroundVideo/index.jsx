import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-background-video-player';
class BackgroundVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'enter_0',     
      currentPosterSrc: undefined,
      currentScene: 'enter',
      loopCount: null,
      prevPlayer: undefined,
      sceneList: undefined,      
      windowHeight: window.innerHeight,      
      windowWidth: window.innerWidth
    };

    this.getNewVideoSet = this.getNewVideoSet.bind(this);     
    this.listScenes = this.listScenes.bind(this);   
    this.playNextScene = this.playNextScene.bind(this);    
  }

  async componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    await this.listScenes();  
    this.playNextScene();
  }

  videoTimer = null;

  componentWillUnmount() {
    clearTimeout(this.videoTimer);
    window.removeEventListener('resize', this.handleResize);
    this.setState = (state, callback) => {
      return;
    };
  }

  // creates an array of scenes in a video set, removing any empty scenes
  listScenes = async () => {
    const sceneList = Object.keys(this.props.videoSrc[this.props.currentVideoIndex].scenes)
      .filter(scene => this.props.videoSrc[this.props.currentVideoIndex]["scenes"][scene] !== null);

    this.setState({
      sceneList: sceneList
    });
  }

  // display the next current video
  playNextScene = () => {
    // DOM handle for the player and wrapper
    var playerWrapper, player, prevPlayer;
    playerWrapper =  document.querySelector(`.${this.state.currentPlayer}`);
    player = document.querySelector(`.${this.state.currentPlayer} > video`);

    // play the video for the current scene
    playerWrapper.style.display = "inline";
    player.pause();
    player.addEventListener("canplay", function onCanPlay() {
      player.removeEventListener("canplay", onCanPlay);
      player.play();
    });
    player.load();

    // short delay to remove potential loading flash between scenes
    if (this.state.prevPlayer !== undefined) {
      this.videoTimer = setTimeout(() =>  {
        prevPlayer = document.querySelector(`.${this.state.prevPlayer}`);
        if (prevPlayer) {
          prevPlayer.style.display = "none";
        }
      }, 350);
    }

    // call handleVideoEnd when each video ends
    player.addEventListener('ended', this.handleVideoEnd, false);   
  }

  // replay the current scene
  playLoopScene = () => {  
    // DOM handle for the player and wrapper
    var playerWrapper, player, prevPlayer;
    playerWrapper =  document.querySelector(`.${this.state.currentPlayer}`);
    player = document.querySelector(`.${this.state.currentPlayer} > video`);

    console.log('Loops', this.state.loopCount);
    player.play();

    // call handleVideoEnd when each video ends
    player.addEventListener('ended', this.handleVideoEnd, false); 
  }

  // set the number of times to loop main loop or sub loop
  // to a pseudo-random number between min and max
  // defaults to 3 for both min and max
  // loopType {string} - can be 'main' or 'sub'
  setLoopCount = (loopType) => {
    let max, min;

    if (loopType === 'main') {
      max = this.props.videoSrc[this.props.currentVideoIndex]["mainLoopMaxLoops"] || 3;
      min = this.props.videoSrc[this.props.currentVideoIndex]["mainLoopMinLoops"] || 3;
    } else {
      max = this.props.videoSrc[this.props.currentVideoIndex]["subLoopMaxLoops"] || 3;
      min = this.props.videoSrc[this.props.currentVideoIndex]["subLoopMinLoops"] || 3;
    }   

    min = Math.ceil(min);
    max = Math.floor(max);
    this.setState({
      loopCount: Math.floor(Math.random() * (max - min + 1) + min)
    });
  }

  // check to see if a video exists
  // used in switching between video sets
  checkVideoExists = (videoIndex, scene) => {
    if (this.props.videoSrc[videoIndex] && 
    this.props.videoSrc[videoIndex]["scenes"] && 
    this.props.videoSrc[videoIndex]["scenes"][scene]) {
      return true;
    } else {
      return false;
    }
  }

  // get a new video set when exiting
  getNewVideoSet = async (index) => {
    // and either increment to next video set (currentVideoIndex + 1),
    // decrement to the previous video (currentVideoIndex - 1) 
    // or if video doesn't exist, return to video set 0.
    const nextVideoIndex = this.checkVideoExists((this.props.currentVideoIndex * 1) + index, 'enter')
      ? (this.props.currentVideoIndex * 1) + index : 0

    this.props.changeVideoIndex(nextVideoIndex);
    await this.listScenes();
    return nextVideoIndex;
  }

  // advances to the next scene when each video ends
  handleVideoEnd = async (event) => {
    event.preventDefault();
    event.srcElement.removeEventListener("ended", this.handleVideoEnd);     // cleanup event handler
    switch (this.state.currentScene) {
      case "enter": {
        // set number of loops for main loop
        this.setLoopCount('main');
        
        this.setState(
          prevState => {
            return {
              currentPlayer: `mainLoop_${this.props.currentVideoIndex}`,
              currentScene: 'mainLoop',
              prevPlayer: prevState.currentPlayer
            };
          },
          this.playNextScene);
        break;        
      }

      case "mainLoop": {
        // if exit previous has been clicked, advance to the exit previous scene
        if (this.props.exit === 'prev') {
          this.props.resetExit();
          this.setState(
            prevState => {
              return {
                currentPlayer: `exitPrev_${this.props.currentVideoIndex}`,              
                currentScene: 'exitPrev',
                prevPlayer: prevState.currentPlayer
              };
            },
            this.playNextScene);  
        // if exit next has been clicked, advance to the exit next scene
        } else if (this.props.exit === 'next') {
          this.props.resetExit();          
          this.setState(
            prevState => {
              return {
                currentPlayer: `exitNext_${this.props.currentVideoIndex}`,              
                currentScene: 'exitNext',
                prevPlayer: prevState.currentPlayer
              };
            },
            this.playNextScene);  
        // if no exit buttons have been clicked       
        } else {
          // in video sets where mainLoopToSubLoop scene does not exist, continue the mainLoop by resetting the loopCount  
          var testPlayer = document.querySelector(`.mainLoopToSubLoop_${this.props.currentVideoIndex} > video`);          
          if  (testPlayer === null) {
            this.setLoopCount('main');
          }

          // loop as many times as specified in loopCount
          if (this.state.loopCount > 1) {
            this.setState(
              prevState => {
                return {
                  loopCount: (this.state.loopCount * 1) - 1,       
                  prevPlayer: prevState.currentPlayer
                };
              },
              this.playLoopScene);
          // after looping loopCount number of times, transition
          } else {
            // advance to mainLoopToSubLoop
            const nextScene = 'mainLoopToSubLoop';
            
            // set number of loops for sub loop
            this.setLoopCount('sub');

            this.setState(
              prevState => {
                return {
                  currentPlayer: `${nextScene}_${this.props.currentVideoIndex}`,              
                  currentScene: `${nextScene}`,
                  prevPlayer: prevState.currentPlayer
                };
              },
              this.playNextScene);
          }
        }
        break;    
      }

      case "mainLoopToSubLoop": {
        this.setState(
          prevState => {
            return {
              currentPlayer: `subLoop_${this.props.currentVideoIndex}`,              
              currentScene: 'subLoop',
              prevPlayer: prevState.currentPlayer
            };
          },
          this.playNextScene);
          break;               
      }

      case "subLoop": {
        // loop as many times as specified in loopCount
        // cancel the loop if exit is clicked
        if (this.state.loopCount > 1 && !this.props.exit) {
          this.setState(
            prevState => {
              return {
                loopCount: (this.state.loopCount * 1) - 1,       
                prevPlayer: prevState.currentPlayer
              };
            },
            this.playLoopScene);
        // after looping loopCount number of times, transition
        } else { 
          // in video sets where subLoopToMainLoop scene does not exist
          // advance directly to mainLoop
          // otherwise advance to subLoopToMainLoop
          const testPlayer = document.querySelector(`.subLoopToMainLoop_${this.props.currentVideoIndex} > video`);
          const nextScene = (testPlayer === null) ? 'mainLoop' : 'subLoopToMainLoop';

          // set number of loops for main loop
          this.setLoopCount('main'); 

          this.setState(
            prevState => {
              return {
                currentPlayer: `${nextScene}_${this.props.currentVideoIndex}`,              
                currentScene: `${nextScene}`,
                prevPlayer: prevState.currentPlayer
              };
            },
            this.playNextScene);
        }
        break;        
      }

      case "subLoopToMainLoop": {
        this.setState(
          prevState => {
            return {
              currentPlayer: `mainLoop_${this.props.currentVideoIndex}`,
              currentScene: 'mainLoop',
              prevPlayer: prevState.currentPlayer
            };
          },
          this.playNextScene);
        break;        
      }

      case "exitNext": {       
        const newVideoIndex = await this.getNewVideoSet(1);

        this.setState(
          prevState => {
            return {
              currentPlayer: `enter_${newVideoIndex}`,
              currentScene: 'enter',
              prevPlayer: prevState.currentPlayer
            };
          },
          this.playNextScene);
        break;        
      }   
      
      case "exitPrev": {
        const newVideoIndex = await this.getNewVideoSet(-1);

        this.setState(
          prevState => {
            return {
              currentPlayer: `enter_${newVideoIndex}`,
              currentScene: 'enter',
              prevPlayer: prevState.currentPlayer
            };
          },
          this.playNextScene);
        break;        
      }        
    }
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  render() {  
    { 
      if (this.state.sceneList) { 
        const hasExitScene = this.state.sceneList.includes('exitPrev') || this.state.sceneList.includes('exitNext');

        return (   
          <div style={{ position: 'absolute', width: ' 100%', height: '100%' }}>
            {
              this.state.sceneList.map(scene => {
                if (scene) {
                  return <VideoPlayer 
                    autoPlay={false}
                    className={`${scene}_${this.props.currentVideoIndex}`}
                    containerHeight={this.state.windowHeight}
                    containerWidth={this.state.windowWidth}
                    key={`${scene}_${this.props.currentVideoIndex}`}
                    loop={false}
                    muted
                    poster={this.state.currentPosterSrc}
                    src={[{ src: `${this.props.videoSrc[this.props.currentVideoIndex]["scenes"][scene]}`,
                        type: 'video/mp4' }]}
                    style={{display: 'none'}}
                  />
                }
              })
            }
          </div>
        );
      } else {
        return (
          <div style={{ position: 'absolute', width: ' 100%', height: '100%' }}></div>
        );
      }
    };
  }
}

BackgroundVideoPlayer.propTypes = {
  changeVideoIndex: PropTypes.func.isRequired,
  className: PropTypes.any,
  currentVideoIndex: PropTypes.number.isRequired,
  exit: PropTypes.string,  
  resetExit: PropTypes.func.isRequired,
  videoSrc: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default BackgroundVideoPlayer;
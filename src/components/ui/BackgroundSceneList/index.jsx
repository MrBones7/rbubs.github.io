import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-background-video-player';

const BackgroundSceneList = (props) => {
  // creates an array of scenes from a video set, removing any empty scenes
  const listScenes = () => (
    Object.keys(props.videoSrc[props.currentVideoIndex].scenes)
      .filter(scene => props.videoSrc[props.currentVideoIndex].scenes[scene] !== null)
  );

  // store list of scenes for the current video set
  const [sceneList, setSceneList] = useState([]);

  useEffect(() => {
    setSceneList(listScenes());
  }, [props.currentVideoIndex]);

  // custom hook for window resizing
  const useWindowResize = () => {
    // store window resizing values
    const [windowSize, setWindowSize] = useState({
      height: window.innerHeight,
      width: window.innerWidth,
    });

    useEffect(() => {
      // timeoutId for debounce mechanism
      let timeoutId = null;

      // handler called on window resize
      const handleResize = () => {
        // prevent execution of previous setTimeout
        clearTimeout(timeoutId);

        // debounce 150 milliseconds
        timeoutId = setTimeout(() => setWindowSize({
          height: window.innerHeight,
          width: window.innerWidth,
        }), 150);
      };

      // set resize listener
      window.addEventListener('resize', handleResize);

      // clean up function
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeoutId);
        timeoutId = null;
      };
    }, []);

    return windowSize;
  };

  const windowSize = useWindowResize();

  // show mobile videos is screen width is less than 855px (Galaxy S1 Ultra viewport)
  const videoSuffix = windowSize.width < 855 ? 'mp4-mobile.mp4' : 'mp4.mp4';

  if (sceneList && sceneList.length > 0) {
    return (
      <div style={{ position: 'absolute', width: ' 100%', height: '100%' }}>
        {
          sceneList.map(scene => {
            if (scene) {
              return (
                <VideoPlayer 
                  autoPlay={false}
                  className={`${scene}_${props.currentVideoIndex}`}
                  containerHeight={windowSize.height}
                  containerWidth={windowSize.width}
                  key={`${scene}_${props.currentVideoIndex}`}
                  loop={false}
                  muted
                  src={[{ src: `${props.videoSrc[props.currentVideoIndex].scenes[scene]}${videoSuffix}`, type: 'video/mp4' }]}
                  style={{ display: 'none' }}
                />
              );
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

BackgroundSceneList.propTypes = {
  currentVideoIndex: PropTypes.number.isRequired, 
  videoSrc: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const detectVideoIndexChange = (prevProps, nextProps) => {
  if (nextProps.currentVideoIndex !== prevProps.currentVideoIndex) {
    return false;
  } else {
    return true;
  }
}

export default React.memo(BackgroundSceneList, detectVideoIndexChange);
import React from 'react';
import Mint from '../../../assets/img/mint.svg';
import Play from '../../../assets/img/play.svg';

const StoryDetails = ({ isPlaying, menuSelect, isMyStories, storyData, isStore }) => {
  const {
    fields: {
      artistName,
      storyThumbnail,
      storyName,
      storyDescription,
      noOfEpisodes,
      seasons,
      status,
    },
  } = storyData;
  return !status ? null : (
    <div
      className="card mt-3"
      id="MystoriesInDetails"
      onClick={(e) => menuSelect(e, storyData.fields)}
    >
      <div className="d-flex justify-content-center align-items-center">
        <div className="playing">
          <img width="100%" height="100%" src={storyThumbnail[0].url} alt="card" />
          <span className="play-btn mobile-view">
            {isStore ? <img src={Mint} alt="mint" width="50px"></img> : <img src={Play} alt="play" width="50px"></img>}
          </span>
        </div>
        <div className="ml-2 store-info">
          <p className="m-0 titel mb-2">{storyName}</p>
          <div className="w-100 d-flex align-items-center justify-content-between mt-2">
            <span>
              By
              <span className="label label-primary ml-1">{artistName}</span>
            </span>
            <span className="label label-default desktop-view ml-2">
              {seasons.length} {seasons.length > 1 ? <>seasons</> : <>season</>}
            </span>
            <span className="label label-default ml-2 desktop-view">
              {noOfEpisodes.length} {noOfEpisodes.length > 1 ? <>Episodes</> : <>Episode</>}
            </span>
            {isMyStories ? (
              <>
                {isPlaying ? (
                  <span className="label label-default ml-2 desktop-view">playing</span>
                ) : (
                  <span className="label label-primary ml-2 desktop-view">play</span>
                )}
              </>
            ) : // <span className="label label-primary ml-2 d-flex justify-content-center align-items-center br-10 desktop-view">
            //   <svg
            //     xmlns="http://www.w3.org/2000/svg"
            //     width="12"
            //     height="12"
            //     viewBox="0 0 12 12"
            //     fill="none"
            //   >
            //     <path
            //       d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z"
            //       fill="white"
            //     />
            //   </svg>
            //   <span className="ml-2">owned</span>
            // </span>
            null}
          </div>
        </div>
      </div>
      <div className="desktop-view right-arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="24"
          viewBox="0 0 13 24"
          fill="none"
          className="ml-2"
        >
          <path
            d="M1.79841e-06 20.5714L8.125 12L2.99735e-07 3.42857L1.625 -1.42062e-07L13 12L1.625 24L1.79841e-06 20.5714Z"
            fill="#9346C7"
          />
        </svg>
      </div>
    </div>
  );
};

export default StoryDetails;

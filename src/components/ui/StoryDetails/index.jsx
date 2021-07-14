import React from 'react';

const StoryDetails = ({ isPlaying, menuSelect, isMyStories, storyData }) => {
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
    <div className="card mt-3" id="MystoriesInDetails" onClick={(e) => menuSelect(e, storyData.fields)}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="playing">
          <img width="100%" height="100%" src={storyThumbnail[0].url} alt="card" />
          <span className="play-btn mobile-view">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="22"
              viewBox="0 0 56 22"
              fill="none"
            >
              <path
                d="M0 11C0 4.92487 4.92487 0 11 0H45C51.0751 0 56 4.92487 56 11C56 17.0751 51.0751 22 45 22H11C4.92487 22 0 17.0751 0 11Z"
                fill="white"
              />
              <path
                d="M9.05344 7.1236C8.95375 7.05262 8.83644 7.01045 8.71437 7.0017C8.5923 6.99296 8.47017 7.01798 8.36138 7.07403C8.25259 7.13008 8.16132 7.215 8.09758 7.31947C8.03383 7.42394 8.00008 7.54394 8 7.66632V14.3337C8.00008 14.4561 8.03383 14.5761 8.09758 14.6805C8.16132 14.785 8.25259 14.8699 8.36138 14.926C8.47017 14.982 8.5923 15.007 8.71437 14.9983C8.83644 14.9896 8.95375 14.9474 9.05344 14.8764L13.7206 11.5427C13.807 11.481 13.8775 11.3996 13.9261 11.3052C13.9747 11.2108 14 11.1062 14 11C14 10.8938 13.9747 10.7892 13.9261 10.6948C13.8775 10.6004 13.807 10.519 13.7206 10.4573L9.05344 7.1236Z"
                fill="#9346C7"
              />
              <path
                d="M21.5195 11.9941V15H19.7617V6.46875H23.0898C23.7305 6.46875 24.293 6.58594 24.7773 6.82031C25.2656 7.05469 25.6406 7.38867 25.9023 7.82227C26.1641 8.25195 26.2949 8.74219 26.2949 9.29297C26.2949 10.1289 26.0078 10.7891 25.4336 11.2734C24.8633 11.7539 24.0723 11.9941 23.0605 11.9941H21.5195ZM21.5195 10.5703H23.0898C23.5547 10.5703 23.9082 10.4609 24.1504 10.2422C24.3965 10.0234 24.5195 9.71094 24.5195 9.30469C24.5195 8.88672 24.3965 8.54883 24.1504 8.29102C23.9043 8.0332 23.5645 7.90039 23.1309 7.89258H21.5195V10.5703ZM29.2656 13.5879H32.998V15H27.5078V6.46875H29.2656V13.5879ZM38.9453 13.2422H35.8633L35.2773 15H33.4082L36.584 6.46875H38.2129L41.4062 15H39.5371L38.9453 13.2422ZM36.3379 11.8184H38.4707L37.3984 8.625L36.3379 11.8184ZM44.2656 10.3125L46.041 6.46875H47.9629L45.1621 11.9062V15H43.375V11.9062L40.5742 6.46875H42.502L44.2656 10.3125Z"
                fill="#9346C7"
              />
            </svg>
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
            ) : (
              <span className="label label-primary ml-2 d-flex justify-content-center align-items-center br-10 desktop-view">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z"
                    fill="white"
                  />
                </svg>
                <span className="ml-2">owned</span>
              </span>
            )}
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

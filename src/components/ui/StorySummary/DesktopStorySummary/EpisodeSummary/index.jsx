import React from 'react';
import Mint from '../../../../../assets/img/mint.svg';
import Play from '../../../../../assets/img/play.svg';

const EpisodeSummary = ({ episodeSummary, isEpisodeLoading, isStore }) => {
  return isEpisodeLoading ? (
    <>Loading</>
  ) : (
    <div className="w-50">
      <p className="namet m-0">
        <p className="textBlue d-flex ">
          <span>{episodeSummary.fields.seasonName}{' '}</span>
          <span className="label label-default">
            minted: <br />
            {10}/{99}
          </span>
        </p>
        <span>{episodeSummary.fields.sceneName}</span>
      </p>
      <div className="storyDetailsContent">
        <div className="episodeSummaryImg">
          <img src={episodeSummary.fields.thumbnail[0].url} alt="image" className="w-100" />
          <span className="mint-btn">
            {isStore ? <img src={Mint} alt="mint" /> : <img src={Play} alt="play" />}
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <span className="label label-primary d-flex justify-content-center align-items-center">
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
            <span className="ml-2 text-right">
              owned: <br />
              10
            </span>
          </span>
          {/* <span className="label label-default text-right w-80">
            minted: <br />
            {10}/{99}
          </span> */}
          <span className="label label-primary padding-10 fnt-14">
            {episodeSummary.fields.price} ETH
          </span>
        </div>
        <div className="description">
          <p>{episodeSummary.fields.sceneDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeSummary;

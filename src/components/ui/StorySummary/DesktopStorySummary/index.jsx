import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EpisodeSummary from './EpisodeSummary';
import cardSmallImage from '../../../../assets/img/card.svg';
import Arrow from '../../../../assets/img/arrow.svg';
import ArrowUp from '../../../../assets/img/arrowup.svg';
import Poster from '../../../../assets/img/poster1.png';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { getEpisodeDetails, getStoryDetails } from '../../../../redux/actions';

const DesktopStorySummary = () => {
  const { currentStory, isStoryLoading, currentSeason, currentEpisode, isEpisodeLoading } =
    useSelector((state) => state.storeData);
  const { storyName, artistName, storyDescription, seasons, noOfEpisodes } = currentStory;

  const [value, setValue] = useState(seasons[0]);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const fetchEpisodeDetails = (episodeId) => {
    dispatch(getEpisodeDetails({ id: episodeId }));
  };

  useEffect(() => {
    if (!isStoryLoading) {
      fetchEpisodeDetails(currentSeason.fields.Episodes[0]);
    }
  }, [currentSeason]);

  return (
    <div className="bg-white store-description p-3 mt-4 desktop-view">
      <div className="d-flex justify-content-between position-relative">
        <div className="w-50">
          <div className="d-flex px-2 justify-content-center align-items-center">
            <h3 onClick={toggleOpen} className="m-0 store-titel mr-2">
              {storyName}
            </h3>
            {isOpen ? (
              <img
                onClick={toggleOpen}
                src={Arrow}
                alt="arrow"
                className="arrow-bg cursor-pointer"
              />
            ) : (
              <img
                onClick={toggleOpen}
                src={ArrowUp}
                alt="arrowup"
                className="arrowup-bg cursor-pointer"
              />
            )}
          </div>
          {isOpen ? (
            <div className="description">
              <p>{storyDescription}</p>
            </div>
          ) : null}
          <div className="d-flex justify-content-between align-items-center pb-2 store-info">
            <span>
              By
              <span className="label label-primary ml-1">{artistName}</span>
            </span>
            <span className="label label-default">
              {seasons.length} {seasons.length > 1 ? <>seasons</> : <>season</>}
            </span>
          </div>
          <Paper square className="box-shadow-none">
            <Tabs
              value={value}
              textColor="primary"
              indicatorColor="primary"
              onChange={(event, newValue) => {
                setValue(newValue);
                dispatch(getStoryDetails({ id: newValue }));
              }}
              aria-label="wrapped label tabs example"
            >
              {seasons.map((season, i) => {
                return <Tab key={i} value={season} label={`season ${i + 1}`} />;
              })}
            </Tabs>
          </Paper>
          <div className="episodesSelectDiv">
            {isStoryLoading ? (
              <span style={{color: '#666666', fontSize:16, fontWeight:'normal'}}>Loading...</span>
            ) : (
              currentSeason.fields.Episodes.map((episode, i) => {
                return !isStoryLoading ? (
                  <div
                    onClick={() => fetchEpisodeDetails(episode)}
                    key={i}
                    className="card mt-3 p-0"
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="w-80">
                        <img
                          src={currentSeason.fields.thumbnails[i].url}
                          alt="card"
                          className="w-100"
                        />
                      </div>
                      <div className="ml-2 d-flex align-items-center justify-content-between">
                        <p>
                          {currentSeason.fields.sceneNames[i]} <br />
                          0001/9999
                        </p>
                        <span className="label label-default ml-4 br-10">playing</span>
                      </div>
                    </div>
                    <div className="right-arrow right-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="24"
                        viewBox="0 0 13 24"
                        fill="none"
                      >
                        <path
                          d="M1.79841e-06 20.5714L8.125 12L2.99735e-07 3.42857L1.625 -1.42062e-07L13 12L1.625 24L1.79841e-06 20.5714Z"
                          fill="#666666"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <>Loading...</>
                );
              })
            )}
          </div>
        </div>
        <div className="vertical-line"></div>
        <EpisodeSummary episodeSummary={currentEpisode} isEpisodeLoading={isEpisodeLoading} />
      </div>
    </div>
  );
};

export default DesktopStorySummary;

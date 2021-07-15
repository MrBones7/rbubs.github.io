import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Mint from '../../../../assets/img/mint.svg';
import Play from '../../../../assets/img/play.svg';
import Arrow from '../../../../assets/img/arrow.svg';
import ArrowUp from '../../../../assets/img/arrowup.svg';
import TabPanelContent from './TabPanelContent.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getEpisodeDetails, getStoryDetails } from '../../../../redux/actions';

const MobileStorySummary = ({ isStore }) => {
  const { currentStory, isStoryLoading, currentSeason, currentEpisode, isEpisodeLoading } =
    useSelector((state) => state.storeData);
  const { storyName, artistName, storyDescription, seasons, noOfEpisodes, storyThumbnail } =
    currentStory;

  const [value, setValue] = useState(seasons[0]);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white store-description p-2 mt-4 mobile-view">
      <div className="episodeSummaryImg">
        <img src={storyThumbnail[0].url} alt="image" className="w-100" />
        <span className="mint-btn">
          {isStore ? <img src={Mint} alt="mint" /> : <img src={Play} alt="play" />}
        </span>
      </div>
      <div className="d-flex px-2 justify-content-center align-items-center">
        <h3 onClick={toggleOpen} className="m-0 store-titel mr-2">
          {storyName}
        </h3>
        {isOpen ? (
          <img onClick={toggleOpen} src={Arrow} alt="arrow" className="arrow-bg" />
        ) : (
          <img onClick={toggleOpen} src={ArrowUp} alt="arrowup" className="arrowup-bg" />
        )}
      </div>

      <div className="px-2">
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
        <div>
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
          {isStoryLoading ? (
            <span style={{ color: '#666666', fontSize: 16, fontWeight: 'normal' }}>Loading...</span>
          ) : (
            <TabPanelContent isStore={isStore} value={value} currentSeason={currentSeason} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileStorySummary;

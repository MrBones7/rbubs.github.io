import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import cardImage from '../../../../assets/img/store_in_details.svg';
import Arrow from '../../../../assets/img/arrow.svg';
import ArrowUp from '../../../../assets/img/arrowup.svg';
import TabPanelContent from './TabPanelContent.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getEpisodeDetails, getStoryDetails } from '../../../../redux/actions';

const MobileStorySummary = () => {
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
      <div className="playing">
        <img src={storyThumbnail[0].url} alt="image" className="w-100" />
        <span className="play-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="22"
            viewBox="0 0 80 22"
            fill="none"
          >
            <path
              d="M0 11C0 4.92487 4.92487 0 11 0H69C75.0752 0 80 4.92487 80 11C80 17.0751 75.0752 22 69 22H11C4.92487 22 0 17.0751 0 11Z"
              fill="white"
            />
            <path
              d="M9.05344 7.1236C8.95375 7.05262 8.83644 7.01045 8.71437 7.0017C8.5923 6.99296 8.47017 7.01798 8.36138 7.07403C8.25259 7.13008 8.16132 7.215 8.09758 7.31947C8.03383 7.42394 8.00008 7.54394 8 7.66632V14.3337C8.00008 14.4561 8.03383 14.5761 8.09758 14.6805C8.16132 14.785 8.25259 14.8699 8.36138 14.926C8.47017 14.982 8.5923 15.007 8.71437 14.9983C8.83644 14.9896 8.95375 14.9474 9.05344 14.8764L13.7206 11.5427C13.807 11.481 13.8775 11.3996 13.9261 11.3052C13.9747 11.2108 14 11.1062 14 11C14 10.8938 13.9747 10.7892 13.9261 10.6948C13.8775 10.6004 13.807 10.519 13.7206 10.4573L9.05344 7.1236Z"
              fill="#9346C7"
            />
            <path
              d="M20.5195 11.9941V15H18.7617V6.46875H22.0898C22.7305 6.46875 23.293 6.58594 23.7773 6.82031C24.2656 7.05469 24.6406 7.38867 24.9023 7.82227C25.1641 8.25195 25.2949 8.74219 25.2949 9.29297C25.2949 10.1289 25.0078 10.7891 24.4336 11.2734C23.8633 11.7539 23.0723 11.9941 22.0605 11.9941H20.5195ZM20.5195 10.5703H22.0898C22.5547 10.5703 22.9082 10.4609 23.1504 10.2422C23.3965 10.0234 23.5195 9.71094 23.5195 9.30469C23.5195 8.88672 23.3965 8.54883 23.1504 8.29102C22.9043 8.0332 22.5645 7.90039 22.1309 7.89258H20.5195V10.5703ZM28.2656 13.5879H31.998V15H26.5078V6.46875H28.2656V13.5879ZM37.9453 13.2422H34.8633L34.2773 15H32.4082L35.584 6.46875H37.2129L40.4062 15H38.5371L37.9453 13.2422ZM35.3379 11.8184H37.4707L36.3984 8.625L35.3379 11.8184ZM43.2656 10.3125L45.041 6.46875H46.9629L44.1621 11.9062V15H42.375V11.9062L39.5742 6.46875H41.502L43.2656 10.3125ZM55.5469 13.2422H52.4648L51.8789 15H50.0098L53.1855 6.46875H54.8145L58.0078 15H56.1387L55.5469 13.2422ZM52.9395 11.8184H55.0723L54 8.625L52.9395 11.8184ZM60.5625 13.5879H64.2949V15H58.8047V6.46875H60.5625V13.5879ZM67.0664 13.5879H70.7988V15H65.3086V6.46875H67.0664V13.5879Z"
              fill="#9346C7"
            />
          </svg>
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
          {isStoryLoading ? <span style={{color: '#666666', fontSize:16, fontWeight:'normal'}}>Loading...</span> : <TabPanelContent value={value} currentSeason={currentSeason} />}
        </div>
      </div>
    </div>
  );
};

export default MobileStorySummary;

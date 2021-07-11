import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Arrow from '../../../../../../assets/img/arrow.svg';
import { Typography } from '@material-ui/core';
import '../../../../Mystories/Mystories.Styles.css';
import { getEpisodeDetails } from '../../../../../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const AccordianPanel = ({ currentSeason }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [owned, setOwned] = React.useState(true);
  const dispatch = useDispatch();

  const { currentEpisode, isEpisodeLoading } = useSelector((state) => state.storeData);

  const handleChange = (panel) => (event, newExpanded) => {
    dispatch(getEpisodeDetails({ id: panel }));
    setExpanded(newExpanded ? panel : false);
  };

  return currentSeason.fields.Episodes.map((episode, i) => {
    return <Accordion
      square
      expanded={expanded === episode}
      onChange={handleChange(episode)}
      className="box-shadow-none accordion-bg my-2"
    >
      <AccordionSummary
        expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg" />}
        className="px-12 py-5"
      >
        <Typography className="namet">
          0{i+1} — {currentSeason.fields.sceneNames[i]}
        </Typography>
        {owned ? (
          <div>
            <span className="label label-primary ml-2 d-flex justify-content-center align-items-center br-10">
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
          </div>
        ) : null}
      </AccordionSummary>
      <AccordionDetails className="flex-direction-column">
        {!isEpisodeLoading ? (
          <div>
            <div className="box">
              <img className="inDetailImg" src={currentEpisode.fields.thumbnail[0].url} />
            </div>
            <div className="description">
              <p>{currentEpisode.fields.sceneDesc}</p>
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
                  15
                </span>
              </span>
              <span className="label label-default text-right w-80">
                minted: <br />
                0337/9999
              </span>
              <span className="label label-primary padding-10 fnt-14">
                {currentEpisode.fields.price} ETH
              </span>
            </div>
          </div>
        ) : (
          <>Loading...</>
        )}
      </AccordionDetails>
    </Accordion>;
  });
};

export default AccordianPanel;

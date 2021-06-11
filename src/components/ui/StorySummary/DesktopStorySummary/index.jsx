import React, { useState } from 'react';
import EpisodeSummary from './EpisodeSummary';
import cardSmallImage from '../../../../assets/img/card.svg';
import Arrow from '../../../../assets/img/arrow.svg';
import ArrowUp from '../../../../assets/img/arrowup.svg';
import Poster from '../../../../assets/img/poster1.png';

const DesktopStorySummary = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [episodeSummary, setEpisodeSummary] = useState({
    seasonName: 'Season 1',
    episodeName: '01 - Deep Dive',
    mintedCopies: '034',
    totalCopies: '1000',
    price: '10',
    owned: '10',
  });

  return (
    <div className="bg-white store-description p-3 mt-4 desktop-view">
      <div className="d-flex justify-content-between position-relative">
        <div className="w-50">
          <div className="d-flex px-2 justify-content-center align-items-center">
            <h3 className="m-0 store-titel mr-2">Crypto fisherman with very long name</h3>
            {isOpen ? (
              <img onClick={toggleOpen} src={Arrow} alt="arrow" className="arrow-bg cursor-pointer" />
            ) : (
              <img onClick={toggleOpen} src={ArrowUp} alt="arrowup" className="arrowup-bg cursor-pointer" />
            )}
          </div>
          {isOpen ? (
            <div className="description">
              <p>
                rebase.art is a project ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                ultricies in odio eget bibendum. Donec libero orci, suscipit in tempor ac, interdum
                eget nunc.
              </p>
            </div>
          ) : null}
          <div className="d-flex justify-content-between align-items-center pb-2 store-info">
            <span>
              By
              <span className="label label-primary ml-1">ABCDEFGHIJ</span>
            </span>
            <span className="label label-default">3 seasons</span>
          </div>
          <div className="episodesSelectDiv">
            <div className="card mt-3 p-0">
              <div className="d-flex justify-content-center align-items-center">
                <div className="w-80">
                  <img src={cardSmallImage} alt="card" className="w-100" />
                </div>
                <div className="ml-2 d-flex align-items-center justify-content-between">
                  <p>
                    01 — Deep Dive <br />
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
            <div className="card mt-3 p-0">
              <div className="d-flex justify-content-center align-items-center">
                <div className="w-80">
                  <img src={Poster} alt="card" className="w-100" />
                </div>
                <div className="ml-2 d-flex align-items-center justify-content-between">
                  <p>
                    02 — Deep Dive <br />
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
            <div className="card mt-3 p-0">
              <div className="d-flex justify-content-center align-items-center">
                <div className="w-80">
                  <img src={cardSmallImage} alt="card" className="w-100" />
                </div>
                <div className="ml-2 d-flex align-items-center justify-content-between">
                  <p>
                    03 — Deep Dive <br />
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
          </div>
        </div>
        <div className="vertical-line"></div>
        <EpisodeSummary episodeSummary={episodeSummary} />
      </div>
    </div>
  );
};

export default DesktopStorySummary;
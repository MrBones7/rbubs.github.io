import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cardImage from '../../../assets/img/store_in_details.svg';
import cardSmallImage from '../../../assets/img/card.svg';
import Arrow from '../../../assets/img/arrow.svg';
import './Store.styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const StoreInDetails = ({ display, close, handler }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  if (display !== 'store-in-details') {
    return null;
  }
  const backToStores = event => {
    event.preventDefault();
    handler('browseStories');
  }

  return (
    <div id="content-store" className="mystories-list">
      <div className="header">
        <div className="left">
          <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={backToStores}>
            <path d="M13 3.42857L4.875 12L13 20.5714L11.375 24L8.58275e-07 12L11.375 -1.76529e-06L13 3.42857Z" fill="white" />
          </svg>
          <span className="ml-3">Back to store</span>
        </div>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={close}>
          <path d="M16 0C12.8355 0 9.74207 0.938383 7.11088 2.69649C4.4797 4.45459 2.42894 6.95344 1.21793 9.87706C0.00693254 12.8007 -0.309921 16.0177 0.307443 19.1214C0.924806 22.2251 2.44866 25.0761 4.6863 27.3137C6.92394 29.5513 9.77487 31.0752 12.8786 31.6926C15.9823 32.3099 19.1993 31.9931 22.1229 30.7821C25.0466 29.5711 27.5454 27.5203 29.3035 24.8891C31.0616 22.2579 32 19.1645 32 16C32 13.8988 31.5861 11.8183 30.7821 9.87706C29.978 7.93585 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 0 16 0ZM20.336 18.064C20.486 18.2127 20.605 18.3897 20.6862 18.5847C20.7675 18.7796 20.8093 18.9888 20.8093 19.2C20.8093 19.4112 20.7675 19.6203 20.6862 19.8153C20.605 20.0103 20.486 20.1873 20.336 20.336C20.1873 20.486 20.0103 20.605 19.8153 20.6862C19.6204 20.7675 19.4112 20.8093 19.2 20.8093C18.9888 20.8093 18.7797 20.7675 18.5847 20.6862C18.3897 20.605 18.2127 20.486 18.064 20.336L16 18.256L13.936 20.336C13.7873 20.486 13.6103 20.605 13.4153 20.6862C13.2204 20.7675 13.0112 20.8093 12.8 20.8093C12.5888 20.8093 12.3797 20.7675 12.1847 20.6862C11.9897 20.605 11.8127 20.486 11.664 20.336C11.514 20.1873 11.395 20.0103 11.3138 19.8153C11.2325 19.6203 11.1907 19.4112 11.1907 19.2C11.1907 18.9888 11.2325 18.7796 11.3138 18.5847C11.395 18.3897 11.514 18.2127 11.664 18.064L13.744 16L11.664 13.936C11.3627 13.6347 11.1935 13.2261 11.1935 12.8C11.1935 12.3739 11.3627 11.9653 11.664 11.664C11.9653 11.3627 12.3739 11.1935 12.8 11.1935C13.2261 11.1935 13.6347 11.3627 13.936 11.664L16 13.744L18.064 11.664C18.3653 11.3627 18.7739 11.1935 19.2 11.1935C19.6261 11.1935 20.0347 11.3627 20.336 11.664C20.6373 11.9653 20.8065 12.3739 20.8065 12.8C20.8065 13.2261 20.6373 13.6347 20.336 13.936L18.256 16L20.336 18.064Z" fill="white" />
        </svg>
      </div>
      <div className="bg-white store-description pb-2 mt-4 mobile-view">
        <img src={cardImage} alt="image" className="w-100" />
        <div className="d-flex px-2 justify-content-center align-items-center">
          <h3 className="m-0 store-titel mr-2">Crypto fisherman with very long name</h3>
          <img src={Arrow} alt="arrow" className="arrow-bg" />
        </div>
        <div className="px-2">
          <div className="description">
            <p>rebase.art is a project ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies in odio eget bibendum. Donec libero orci, suscipit in tempor ac, interdum eget nunc.</p>
          </div>
          <div className="d-flex justify-content-between align-items-center pb-2 store-info">
            <span>
              By
            <span className="label label-primary ml-1">ABCDEFGHIJ</span>
            </span>
            <span className="label label-default">3 seasons</span>
          </div>
          <div>
            <Paper square className="box-shadow-none">
              <Tabs value={value} textColor="primary" indicatorColor="primary"
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                aria-label="wrapped label tabs example">
                <Tab value="one" label="season 1" />
                <Tab value="two" label="season 2" />
                <Tab value="three" label="season 3" />
              </Tabs>
            </Paper>
            {value === 'one' &&
              <TabPanel value={value} index="one" className="tabs-bg bg-white">
                <Accordion className="box-shadow-none accordion-bg my-2">
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg" />}
                    className="px-12 py-5">
                    <Typography className="namet">
                      01 — Deep Dive
                  </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex-direction-column">
                    <div>
                      <div className="box"></div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <span className="label label-primary d-flex justify-content-center align-items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white" />
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
                          $100 DAI
                      </span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="box-shadow-none accordion-bg my-2">
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg" />}>
                    <Typography className="namet">
                      01 — Deep Dive <br />
                    0001/9999
                  </Typography>
                    <div>
                      <span className="label label-primary ml-2 d-flex justify-content-center align-items-center br-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white" />
                        </svg>
                        <span className="ml-2">
                          owned
                      </span>
                      </span>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails className="flex-direction-column">
                    <div>
                      <div className="box"></div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <span className="label label-primary d-flex justify-content-center align-items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white" />
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
                          $100 DAI
                      </span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="box-shadow-none accordion-bg my-2">
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg" />}>
                    <Typography className="namet">
                      01 — Deep Dive <br />
                    0001/9999
                  </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex-direction-column">
                    <div>
                      <div className="box"></div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <span className="label label-primary d-flex justify-content-center align-items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white" />
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
                          $100 DAI
                      </span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </TabPanel>
            }
            {value === 'two' &&
              <TabPanel value={value} index="two" className="tabs-bg bg-white">
                <Accordion className="box-shadow-none accordion-bg my-2">
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg" />}
                    className="px-12 py-5">
                    <Typography className="namet">
                      01 — Deep Dive
                  </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex-direction-column">
                    <div>
                      <div className="box"></div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <span className="label label-primary d-flex justify-content-center align-items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white" />
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
                          $100 DAI
                      </span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="box-shadow-none accordion-bg my-2">
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg" />}>
                    <Typography className="namet">
                      01 — Deep Dive <br />
                    0001/9999
                  </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex-direction-column">
                    <div>
                      <div className="box"></div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <span className="label label-primary d-flex justify-content-center align-items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white" />
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
                          $100 DAI
                      </span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </TabPanel>
            }
            {value === 'three' &&
              <TabPanel value={value} index="three" className="tabs-bg bg-white">
                <Accordion className="box-shadow-none accordion-bg my-2">
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg" />}
                    className="px-12 py-5">
                    <Typography className="namet">
                      01 — Deep Dive
                  </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex-direction-column">
                    <div>
                      <div className="box"></div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <span className="label label-primary d-flex justify-content-center align-items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white" />
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
                          $100 DAI
                      </span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </TabPanel>
            }
          </div>
        </div>
      </div>
      <div className="bg-white store-description p-3 mt-4 desktop-view">
        <div className="d-flex justify-content-between position-relative">
          <div className="w-50">
            <div className="d-flex px-2 justify-content-center align-items-center">
              <h3 className="m-0 store-titel mr-2">Crypto fisherman with very long name</h3>
              <img src={Arrow} alt="arrow" className="arrow-bg" />
            </div>
            <div className="description">
              <p>rebase.art is a project ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies in odio eget bibendum. Donec libero orci, suscipit in tempor ac, interdum eget nunc.</p>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-2 store-info">
              <span>
                By
              <span className="label label-primary ml-1">ABCDEFGHIJ</span>
              </span>
              <span className="label label-default">2 seasons</span>
            </div>
            <div>
              <Paper square className="box-shadow-none">
                <Tabs value={value} textColor="primary" indicatorColor="primary"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  aria-label="wrapped label tabs example">
                  <Tab value="four" label="season 1" />
                  <Tab value="five" label="season 2" />
                </Tabs>
              </Paper>
              {value === 'four' &&
                <TabPanel value={value} index="four" className="tabs-bg bg-white">
                <div className="card mt-3 p-0">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="w-80">
                      <img src={cardSmallImage} alt="card" className="w-100"/>
                    </div>
                    <div className="ml-2 d-flex align-items-center justify-content-between">
                      <p>
                        01 — Deep Dive <br />
                        0001/9999
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="label label-primary ml-2 d-flex justify-content-center align-items-center br-10 desktop-view">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
                          </svg>
                          <span className="ml-2">
                            owned
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="right-arrow right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="24" viewBox="0 0 13 24" fill="none">
                      <path d="M1.79841e-06 20.5714L8.125 12L2.99735e-07 3.42857L1.625 -1.42062e-07L13 12L1.625 24L1.79841e-06 20.5714Z" fill="#9346C7"/>
                    </svg>
                  </div>
                </div>
                <div className="card mt-3 p-0">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="w-80">
                      <img src={cardSmallImage} alt="card" className="w-100"/>
                    </div>
                    <div className="ml-2 d-flex align-items-center justify-content-between">
                      <p>
                        01 — Deep Dive <br />
                        0001/9999
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="label label-primary ml-2 d-flex justify-content-center align-items-center br-10 desktop-view">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
                          </svg>
                          <span className="ml-2">
                            owned
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="right-arrow right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="24" viewBox="0 0 13 24" fill="none">
                      <path d="M1.79841e-06 20.5714L8.125 12L2.99735e-07 3.42857L1.625 -1.42062e-07L13 12L1.625 24L1.79841e-06 20.5714Z" fill="#666666"/>
                    </svg>
                  </div>
                </div>
              </TabPanel>
              }
              {value === 'five' &&
                <TabPanel value={value} index="five" className="tabs-bg bg-white">
                 <div className="card mt-3 p-0">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="w-80">
                      <img src={cardSmallImage} alt="card" className="w-100"/>
                    </div>
                    <div className="ml-2 d-flex align-items-center justify-content-between">
                      <p>
                        01 — Deep Dive <br />
                        0001/9999
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="label label-primary ml-2 d-flex justify-content-center align-items-center br-10 desktop-view">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
                          </svg>
                          <span className="ml-2">
                            owned
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="right-arrow right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="24" viewBox="0 0 13 24" fill="none">
                      <path d="M1.79841e-06 20.5714L8.125 12L2.99735e-07 3.42857L1.625 -1.42062e-07L13 12L1.625 24L1.79841e-06 20.5714Z" fill="#666666"/>
                    </svg>
                  </div>
                </div>
                <div className="card mt-3 p-0">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="w-80">
                      <img src={cardSmallImage} alt="card" className="w-100"/>
                    </div>
                    <div className="ml-2 d-flex align-items-center justify-content-between">
                      <p>
                        01 — Deep Dive <br />
                        0001/9999
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="label label-primary ml-2 d-flex justify-content-center align-items-center br-10 desktop-view">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
                          </svg>
                          <span className="ml-2">
                            owned
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="right-arrow right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="24" viewBox="0 0 13 24" fill="none">
                      <path d="M1.79841e-06 20.5714L8.125 12L2.99735e-07 3.42857L1.625 -1.42062e-07L13 12L1.625 24L1.79841e-06 20.5714Z" fill="#666666"/>
                    </svg>
                  </div>
                </div>
                </TabPanel>
              }
            </div>
          </div>
          <div className="vertical-line"></div>
          <div className="w-50">
          <p className="namet m-0">
            Season 1, EPISODE: <br />
            01 - Deep Dive
          </p>
          <img src={cardImage} alt="image" className="w-100" />
          <div className="d-flex align-items-center justify-content-between mt-2">
            <span className="label label-primary d-flex justify-content-center align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white" />
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
              $100 DAI
            </span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInDetails;
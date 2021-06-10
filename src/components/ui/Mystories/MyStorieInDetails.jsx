import React from 'react';
import PropTypes from 'prop-types';
import cardImage from '../../../assets/img/store_in_details.svg';
import cardSmallImage from '../../../assets/img/card.svg';
import Arrow from '../../../assets/img/arrow.svg';
import './Mystories.Styles.css';
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


const MyStorieInDetails = ({ display, close, handler}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  if (display !== 'MystoriesInDetails') {
    return null;
  }
	const backToStores = event => {
    event.preventDefault();
    handler('myStories');
  }

  return (
    <div id="content-store" className="mystories-list">
      <div className="header">
        <div className="left">
          <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={backToStores}>
            <path d="M13 3.42857L4.875 12L13 20.5714L11.375 24L8.58275e-07 12L11.375 -1.76529e-06L13 3.42857Z" fill="white"/>
          </svg>
          <span className="ml-3">Back to my stories</span>
        </div>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={close}>
          <path d="M16 0C12.8355 0 9.74207 0.938383 7.11088 2.69649C4.4797 4.45459 2.42894 6.95344 1.21793 9.87706C0.00693254 12.8007 -0.309921 16.0177 0.307443 19.1214C0.924806 22.2251 2.44866 25.0761 4.6863 27.3137C6.92394 29.5513 9.77487 31.0752 12.8786 31.6926C15.9823 32.3099 19.1993 31.9931 22.1229 30.7821C25.0466 29.5711 27.5454 27.5203 29.3035 24.8891C31.0616 22.2579 32 19.1645 32 16C32 13.8988 31.5861 11.8183 30.7821 9.87706C29.978 7.93585 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 0 16 0ZM20.336 18.064C20.486 18.2127 20.605 18.3897 20.6862 18.5847C20.7675 18.7796 20.8093 18.9888 20.8093 19.2C20.8093 19.4112 20.7675 19.6203 20.6862 19.8153C20.605 20.0103 20.486 20.1873 20.336 20.336C20.1873 20.486 20.0103 20.605 19.8153 20.6862C19.6204 20.7675 19.4112 20.8093 19.2 20.8093C18.9888 20.8093 18.7797 20.7675 18.5847 20.6862C18.3897 20.605 18.2127 20.486 18.064 20.336L16 18.256L13.936 20.336C13.7873 20.486 13.6103 20.605 13.4153 20.6862C13.2204 20.7675 13.0112 20.8093 12.8 20.8093C12.5888 20.8093 12.3797 20.7675 12.1847 20.6862C11.9897 20.605 11.8127 20.486 11.664 20.336C11.514 20.1873 11.395 20.0103 11.3138 19.8153C11.2325 19.6203 11.1907 19.4112 11.1907 19.2C11.1907 18.9888 11.2325 18.7796 11.3138 18.5847C11.395 18.3897 11.514 18.2127 11.664 18.064L13.744 16L11.664 13.936C11.3627 13.6347 11.1935 13.2261 11.1935 12.8C11.1935 12.3739 11.3627 11.9653 11.664 11.664C11.9653 11.3627 12.3739 11.1935 12.8 11.1935C13.2261 11.1935 13.6347 11.3627 13.936 11.664L16 13.744L18.064 11.664C18.3653 11.3627 18.7739 11.1935 19.2 11.1935C19.6261 11.1935 20.0347 11.3627 20.336 11.664C20.6373 11.9653 20.8065 12.3739 20.8065 12.8C20.8065 13.2261 20.6373 13.6347 20.336 13.936L18.256 16L20.336 18.064Z" fill="white" />
        </svg>
      </div>
      <div className="bg-white store-description p-2 mt-4 mobile-view">
        <div className="playing">
          <img src={cardImage} alt="image" className="w-100" />
          <span className="play-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="22" viewBox="0 0 80 22" fill="none">
              <path d="M0 11C0 4.92487 4.92487 0 11 0H69C75.0752 0 80 4.92487 80 11C80 17.0751 75.0752 22 69 22H11C4.92487 22 0 17.0751 0 11Z" fill="white"/>
              <path d="M9.05344 7.1236C8.95375 7.05262 8.83644 7.01045 8.71437 7.0017C8.5923 6.99296 8.47017 7.01798 8.36138 7.07403C8.25259 7.13008 8.16132 7.215 8.09758 7.31947C8.03383 7.42394 8.00008 7.54394 8 7.66632V14.3337C8.00008 14.4561 8.03383 14.5761 8.09758 14.6805C8.16132 14.785 8.25259 14.8699 8.36138 14.926C8.47017 14.982 8.5923 15.007 8.71437 14.9983C8.83644 14.9896 8.95375 14.9474 9.05344 14.8764L13.7206 11.5427C13.807 11.481 13.8775 11.3996 13.9261 11.3052C13.9747 11.2108 14 11.1062 14 11C14 10.8938 13.9747 10.7892 13.9261 10.6948C13.8775 10.6004 13.807 10.519 13.7206 10.4573L9.05344 7.1236Z" fill="#9346C7"/>
              <path d="M20.5195 11.9941V15H18.7617V6.46875H22.0898C22.7305 6.46875 23.293 6.58594 23.7773 6.82031C24.2656 7.05469 24.6406 7.38867 24.9023 7.82227C25.1641 8.25195 25.2949 8.74219 25.2949 9.29297C25.2949 10.1289 25.0078 10.7891 24.4336 11.2734C23.8633 11.7539 23.0723 11.9941 22.0605 11.9941H20.5195ZM20.5195 10.5703H22.0898C22.5547 10.5703 22.9082 10.4609 23.1504 10.2422C23.3965 10.0234 23.5195 9.71094 23.5195 9.30469C23.5195 8.88672 23.3965 8.54883 23.1504 8.29102C22.9043 8.0332 22.5645 7.90039 22.1309 7.89258H20.5195V10.5703ZM28.2656 13.5879H31.998V15H26.5078V6.46875H28.2656V13.5879ZM37.9453 13.2422H34.8633L34.2773 15H32.4082L35.584 6.46875H37.2129L40.4062 15H38.5371L37.9453 13.2422ZM35.3379 11.8184H37.4707L36.3984 8.625L35.3379 11.8184ZM43.2656 10.3125L45.041 6.46875H46.9629L44.1621 11.9062V15H42.375V11.9062L39.5742 6.46875H41.502L43.2656 10.3125ZM55.5469 13.2422H52.4648L51.8789 15H50.0098L53.1855 6.46875H54.8145L58.0078 15H56.1387L55.5469 13.2422ZM52.9395 11.8184H55.0723L54 8.625L52.9395 11.8184ZM60.5625 13.5879H64.2949V15H58.8047V6.46875H60.5625V13.5879ZM67.0664 13.5879H70.7988V15H65.3086V6.46875H67.0664V13.5879Z" fill="#9346C7"/>
            </svg>
          </span>
        </div>
        <div className="d-flex px-2 justify-content-center align-items-center">
          <h3 className="m-0 store-titel mr-2">Crypto fisherman with very long name</h3>
          <img src={Arrow} alt="arrow" className="arrow-bg"/>
        </div>
        <div className="px-2">
          <div className="description">
            <p>rebase.radio is a project ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies in odio eget bibendum. Donec libero orci, suscipit in tempor ac, interdum eget nunc.</p>
          </div>
          <div className="d-flex justify-content-between align-items-center pb-2 store-info">
            <span>
              By
              <span className="label label-primary ml-1">ABCDEFGHIJ</span>
            </span>
            <span className="label label-default">15 episodes</span>
          </div>
          <div>
            <Paper square className="box-shadow-none">
              <Tabs value={value} textColor="primary" indicatorColor="primary"
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                aria-label="wrapped label tabs example">
                <Tab value="one" label="season 1"  />
                <Tab value="two" label="season 2"  />
                <Tab value="three" label="season 3" />
              </Tabs>
            </Paper>
            {value === 'one' &&
              <TabPanel value={value} index="one" className="tabs-bg bg-white">
                <Accordion className="box-shadow-none accordion-bg my-2">
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg"/>}
                  className="px-12 py-5">
                    <Typography className="namet">
                      01 — Deep Dive
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex-direction-column">
                    <div>
                      <div className="box"></div>
                      <div className="d-flex align-items-center justify-content-between mt-2">
                        <span className="label label-primary d-flex justify-content-center align-items-center br-10">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
                          </svg>
                          <span className="ml-2 text-right">
                            owned: 1
                          </span>
                        </span>
                        <span className="label label-primary padding-6 br-10 d-flex justify-content-center align-items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none" className="mr-2">
                              <path d="M18 16.757C18 13.8888 16.3278 11.4112 13.9091 10.2572V5.99603C13.9091 5.60794 13.7736 5.23271 13.523 4.93715L9.62642 0.292991C9.46278 0.0976636 9.23011 0 9 0C8.76989 0 8.53722 0.0976636 8.37358 0.292991L4.47699 4.93715C4.22812 5.23331 4.09138 5.60835 4.09091 5.99603V10.2572C1.67216 11.4112 0 13.8888 0 16.757H4.00142C3.94261 16.9421 3.91193 17.1425 3.91193 17.3687C3.91193 17.9367 4.10625 18.4918 4.45909 18.9313C4.7471 19.2907 5.12853 19.563 5.56108 19.7178C6.1517 21.1056 7.49403 22 9 22C9.74403 22 10.4651 21.779 11.0813 21.3626C11.6847 20.9565 12.1526 20.3886 12.4364 19.7178C12.8687 19.5639 13.2502 19.2926 13.5384 18.9339C13.8917 18.4904 14.0846 17.9394 14.0855 17.3713C14.0855 17.1554 14.0574 16.9498 14.0062 16.7596L18 16.757ZM9 6.88785C9.32115 6.89444 9.62695 7.02731 9.85175 7.25794C10.0766 7.48858 10.2025 7.79861 10.2025 8.1215C10.2025 8.44438 10.0766 8.75441 9.85175 8.98505C9.62695 9.21568 9.32115 9.34855 9 9.35514C8.67884 9.34855 8.37306 9.21568 8.14825 8.98505C7.92344 8.75441 7.79752 8.44438 7.79752 8.1215C7.79752 7.79861 7.92344 7.48858 8.14825 7.25794C8.37306 7.02731 8.67884 6.89444 9 6.88785ZM11.9685 17.9958C11.8355 18.0729 11.6821 18.1037 11.5312 18.0832L11.0327 18.0215L10.9611 18.5201C10.823 19.4942 9.97926 20.2292 9 20.2292C8.02074 20.2292 7.17699 19.4942 7.03892 18.5201L6.96733 18.0189L6.46875 18.0832C6.31718 18.1013 6.16382 18.0698 6.03153 17.9932C5.80909 17.8647 5.67102 17.6257 5.67102 17.3661C5.67102 17.0937 5.82187 16.8675 6.04432 16.7544H11.9582C12.1832 16.8701 12.3315 17.0963 12.3315 17.3661C12.329 17.6283 12.1909 17.8699 11.9685 17.9958Z" fill="white"/>
                          </svg>
                          Store
                        </span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="box-shadow-none accordion-bg my-2">
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg"/>}>
                    <Typography className="namet">
                      01 — Deep Dive <br />
                      0001/9999
                    </Typography>
                    <div>
                      <span className="label label-primary ml-2 d-flex justify-content-center align-items-center br-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
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
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
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
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg"/>}>
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
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
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
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg"/>}
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
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
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
                        <span className="label label-primary padding-10 fnt-14 br-10">
                          $100 DAI
                        </span>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="box-shadow-none accordion-bg my-2">
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg"/>}>
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
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
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
                  <AccordionSummary expandIcon={<img src={Arrow} alt="arrow" className="arrow-bg"/>}
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
                            <path d="M6 0C2.68468 0 0 2.68468 0 6C0 9.31531 2.68468 12 6 12C9.31531 12 12 9.31531 12 6C12 2.68468 9.31531 0 6 0ZM9.54955 4.9009L5.65766 8.79279C5.36937 9.08108 4.9009 9.08108 4.61261 8.79279L4.34234 8.52252L2.5045 6.68468C2.21622 6.3964 2.21622 5.92793 2.5045 5.63964L2.77477 5.36937C3.06306 5.08108 3.53153 5.08108 3.81982 5.36937L5.13513 6.68468L8.23423 3.58558C8.52252 3.2973 8.99099 3.2973 9.27928 3.58558L9.54955 3.85585C9.83784 4.14414 9.83784 4.61261 9.54955 4.9009Z" fill="white"/>
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
              <p>rebase.radio is a project ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies in odio eget bibendum. Donec libero orci, suscipit in tempor ac, interdum eget nunc.</p>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-2 store-info">
              <span>
                By
              <span className="label label-primary ml-1">ABCDEFGHIJ</span>
              </span>
              <span className="label label-default">2 seasons</span>
            </div>
            <div>
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
                      <span className="label label-default ml-4 br-10">
                        playing
                      </span>
                    </div>
                  </div>
                  <div className="right-arrow right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="24" viewBox="0 0 13 24" fill="none">
                      <path d="M1.79841e-06 20.5714L8.125 12L2.99735e-07 3.42857L1.625 -1.42062e-07L13 12L1.625 24L1.79841e-06 20.5714Z" fill="#666666"/>
                    </svg>
                  </div>
                </div>
            </div>
          </div>
          <div className="vertical-line"></div>
          <div className="w-50">
          <p className="namet m-0">
            Season 1, EPISODE: <br />
            01 - Deep Dive
          </p>
          <div className="playing">
            <img src={cardImage} alt="image" className="w-100" />
            <span className="play-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="22" viewBox="0 0 80 22" fill="none">
                <path d="M0 11C0 4.92487 4.92487 0 11 0H69C75.0751 0 80 4.92487 80 11C80 17.0751 75.0751 22 69 22H11C4.92487 22 0 17.0751 0 11Z" fill="white"/>
                <path d="M11.3333 16C11.7917 16 12.1667 15.625 12.1667 15.1667V6.83333C12.1667 6.375 11.7917 6 11.3333 6H8.83333C8.375 6 8 6.375 8 6.83333V15.1667C8 15.625 8.375 16 8.83333 16H11.3333Z" fill="#666666"/>
                <path d="M17.1667 16C17.625 16 18 15.625 18 15.1667V6.83333C18 6.375 17.625 6 17.1667 6H14.6667C14.2083 6 13.8333 6.375 13.8333 6.83333V15.1667C13.8333 15.625 14.2083 16 14.6667 16H17.1667Z" fill="#666666"/>
                <path d="M24.5195 11.9941V15H22.7617V6.46875H26.0898C26.7305 6.46875 27.293 6.58594 27.7773 6.82031C28.2656 7.05469 28.6406 7.38867 28.9023 7.82227C29.1641 8.25195 29.2949 8.74219 29.2949 9.29297C29.2949 10.1289 29.0078 10.7891 28.4336 11.2734C27.8633 11.7539 27.0723 11.9941 26.0605 11.9941H24.5195ZM24.5195 10.5703H26.0898C26.5547 10.5703 26.9082 10.4609 27.1504 10.2422C27.3965 10.0234 27.5195 9.71094 27.5195 9.30469C27.5195 8.88672 27.3965 8.54883 27.1504 8.29102C26.9043 8.0332 26.5645 7.90039 26.1309 7.89258H24.5195V10.5703ZM32.2656 13.5879H35.998V15H30.5078V6.46875H32.2656V13.5879ZM41.9453 13.2422H38.8633L38.2773 15H36.4082L39.584 6.46875H41.2129L44.4062 15H42.5371L41.9453 13.2422ZM39.3379 11.8184H41.4707L40.3984 8.625L39.3379 11.8184ZM47.2656 10.3125L49.041 6.46875H50.9629L48.1621 11.9062V15H46.375V11.9062L43.5742 6.46875H45.502L47.2656 10.3125ZM53.6113 15H51.8535V6.46875H53.6113V15ZM62.1836 15H60.4258L57.0039 9.38672V15H55.2461V6.46875H57.0039L60.4316 12.0938V6.46875H62.1836V15ZM70.4688 13.9219C70.1523 14.3008 69.7051 14.5957 69.127 14.8066C68.5488 15.0137 67.9082 15.1172 67.2051 15.1172C66.4668 15.1172 65.8184 14.957 65.2598 14.6367C64.7051 14.3125 64.2754 13.8438 63.9707 13.2305C63.6699 12.6172 63.5156 11.8965 63.5078 11.0684V10.4883C63.5078 9.63672 63.6504 8.90039 63.9355 8.2793C64.2246 7.6543 64.6387 7.17773 65.1777 6.84961C65.7207 6.51758 66.3555 6.35156 67.082 6.35156C68.0938 6.35156 68.8848 6.59375 69.4551 7.07812C70.0254 7.55859 70.3633 8.25977 70.4688 9.18164H68.7578C68.6797 8.69336 68.5059 8.33594 68.2363 8.10938C67.9707 7.88281 67.6035 7.76953 67.1348 7.76953C66.5371 7.76953 66.082 7.99414 65.7695 8.44336C65.457 8.89258 65.2988 9.56055 65.2949 10.4473V10.9922C65.2949 11.8867 65.4648 12.5625 65.8047 13.0195C66.1445 13.4766 66.6426 13.7051 67.2988 13.7051C67.959 13.7051 68.4297 13.5645 68.7109 13.2832V11.8125H67.1113V10.5176H70.4688V13.9219Z" fill="#666666"/>
              </svg>
            </span>
          </div>
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

export default MyStorieInDetails;
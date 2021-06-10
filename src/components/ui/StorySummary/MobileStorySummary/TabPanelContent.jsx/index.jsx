import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import AccordianPanel from './AccodianPanel';

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const TabPanelContent = ({ value, seasonContent }) => {
  return (
    <TabPanel value={value} index={value} className="tabs-bg bg-white">
      {seasonContent.map((season, i) => {
        return <AccordianPanel key={i} owned={season.owned} />;
      })}
    </TabPanel>
  );
};

export default TabPanelContent;

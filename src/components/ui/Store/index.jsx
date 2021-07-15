import React, { useState, useEffect } from 'react';
import whiteLogo from '../../../assets/img/white_store.svg';
import './Store.styles.css';

const StoreHome = ({ display, handler, isBottomContent }) => {
	
	const openStores = event => {
    event.preventDefault();
    handler('browseStories');
  }
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  console.log(display)

  if(display === "MystoriesInDetails") return null
  
	return (
		<div style={{visibility : isBottomContent ? 'visible' : 'hidden'}} id="store-home" className={`cursor-pointer ${display}`} aria-expanded="false" onClick={openStores}>
			<div className="d-flex align-items-center">
				<span>Open Store</span>
        <img style={{ marginLeft: "10px"}} src={whiteLogo} alt="white_store"></img>
			</div>
		</div>
	);
};

export default StoreHome;
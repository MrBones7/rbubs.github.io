import React from 'react';
import './Mystories.Styles.css';
import Button from '@material-ui/core/Button';
import StoryDetails from '../StoryDetails';

const MyStories = ({ display, close, handler }) => {
  if (display !== 'myStories') {
    return null;
  }
  const menuSelect = (event) => {
    event.preventDefault();
    handler(event.currentTarget.id);
  };

  return (
    <div id="content-store" className="mystories-list">
      <div className="header">
        <div className="left">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16ZM25.6945 9.88816C25.6954 9.88776 25.6947 9.89684 25.6897 9.91658C25.6912 9.89843 25.6937 9.88856 25.6945 9.88816ZM25.3356 10.6102C24.8388 10.6379 24.1757 10.7425 23.3493 10.9555C22.7844 11.1011 22.1723 11.2897 21.5225 11.5197C21.9916 12.0972 22.3719 12.7497 22.6427 13.4565C23.1662 13.0091 23.6352 12.5737 24.0433 12.1577C24.641 11.5485 25.0631 11.0265 25.3356 10.6102ZM23.1035 15.6682C26.4041 13.0396 28.2462 10.5593 27.5406 9.3371C26.835 8.11504 23.7663 8.46999 19.8401 10.0138C18.7325 9.30187 17.4145 8.88889 16 8.88889C12.0726 8.88889 8.88889 12.0726 8.88889 16C8.88889 16.1113 8.89145 16.2219 8.8965 16.332C5.59599 18.9605 3.75401 21.4408 4.45961 22.6629C5.16516 23.8849 8.23377 23.53 12.16 21.9862C13.2676 22.6981 14.5856 23.1111 16 23.1111C19.9274 23.1111 23.1111 19.9274 23.1111 16C23.1111 15.8888 23.1086 15.7781 23.1035 15.6682ZM10.4776 20.4804C10.0085 19.9029 9.62812 19.2504 9.35733 18.5436C8.83388 18.991 8.36497 19.4264 7.95685 19.8423C7.35913 20.4515 6.93705 20.9735 6.66461 21.3898C7.1614 21.3621 7.8245 21.2575 8.65092 21.0445C9.2157 20.8989 9.82776 20.7103 10.4776 20.4804ZM5.85985 21.3397C5.86063 21.3392 5.87043 21.3419 5.8869 21.3497C5.86731 21.3442 5.85907 21.3403 5.85985 21.3397ZM6.30563 22.1118C6.30475 22.1122 6.30551 22.1032 6.31052 22.0834C6.30901 22.1016 6.3065 22.1114 6.30563 22.1118ZM26.1133 10.6503C26.1329 10.6558 26.1411 10.6597 26.1403 10.6603C26.1395 10.6608 26.1297 10.6581 26.1133 10.6503Z"
              fill="white"
            />
          </svg>
          <span className="ml-2">My Stories</span>
        </div>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={close}
        >
          <path
            d="M16 0C12.8355 0 9.74207 0.938383 7.11088 2.69649C4.4797 4.45459 2.42894 6.95344 1.21793 9.87706C0.00693254 12.8007 -0.309921 16.0177 0.307443 19.1214C0.924806 22.2251 2.44866 25.0761 4.6863 27.3137C6.92394 29.5513 9.77487 31.0752 12.8786 31.6926C15.9823 32.3099 19.1993 31.9931 22.1229 30.7821C25.0466 29.5711 27.5454 27.5203 29.3035 24.8891C31.0616 22.2579 32 19.1645 32 16C32 13.8988 31.5861 11.8183 30.7821 9.87706C29.978 7.93585 28.7994 6.17203 27.3137 4.68629C25.828 3.20055 24.0641 2.022 22.1229 1.21793C20.1817 0.413852 18.1012 0 16 0ZM20.336 18.064C20.486 18.2127 20.605 18.3897 20.6862 18.5847C20.7675 18.7796 20.8093 18.9888 20.8093 19.2C20.8093 19.4112 20.7675 19.6203 20.6862 19.8153C20.605 20.0103 20.486 20.1873 20.336 20.336C20.1873 20.486 20.0103 20.605 19.8153 20.6862C19.6204 20.7675 19.4112 20.8093 19.2 20.8093C18.9888 20.8093 18.7797 20.7675 18.5847 20.6862C18.3897 20.605 18.2127 20.486 18.064 20.336L16 18.256L13.936 20.336C13.7873 20.486 13.6103 20.605 13.4153 20.6862C13.2204 20.7675 13.0112 20.8093 12.8 20.8093C12.5888 20.8093 12.3797 20.7675 12.1847 20.6862C11.9897 20.605 11.8127 20.486 11.664 20.336C11.514 20.1873 11.395 20.0103 11.3138 19.8153C11.2325 19.6203 11.1907 19.4112 11.1907 19.2C11.1907 18.9888 11.2325 18.7796 11.3138 18.5847C11.395 18.3897 11.514 18.2127 11.664 18.064L13.744 16L11.664 13.936C11.3627 13.6347 11.1935 13.2261 11.1935 12.8C11.1935 12.3739 11.3627 11.9653 11.664 11.664C11.9653 11.3627 12.3739 11.1935 12.8 11.1935C13.2261 11.1935 13.6347 11.3627 13.936 11.664L16 13.744L18.064 11.664C18.3653 11.3627 18.7739 11.1935 19.2 11.1935C19.6261 11.1935 20.0347 11.3627 20.336 11.664C20.6373 11.9653 20.8065 12.3739 20.8065 12.8C20.8065 13.2261 20.6373 13.6347 20.336 13.936L18.256 16L20.336 18.064Z"
            fill="white"
          />
        </svg>
      </div>
      <StoryDetails isPlaying={true} menuSelect={menuSelect} isMyStories={true} />
      <StoryDetails isPlaying={false} menuSelect={menuSelect} isMyStories={true}/>
      <div className="line-Mystories mobile-view"></div>
      <div className="mobile-view">
        <Button
          variant="contained"
          color="primary"
          className="d-flex justify-content-center align-items-center btn-browse-all-stories"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM20.8485 15.4116C23.2374 16.5455 24.8889 18.9798 24.8889 21.798L20.9444 21.8005C20.9949 21.9874 21.0227 22.1894 21.0227 22.4015C21.0218 22.9598 20.8313 23.5011 20.4823 23.9369C20.1977 24.2893 19.821 24.5559 19.3939 24.7071C19.1136 25.3662 18.6515 25.9242 18.0556 26.3232C17.447 26.7323 16.7348 26.9495 16 26.9495C14.5126 26.9495 13.1869 26.0707 12.6035 24.7071C12.1763 24.555 11.7996 24.2875 11.5152 23.9343C11.1667 23.5025 10.9747 22.9571 10.9747 22.399C10.9747 22.1768 11.0051 21.9798 11.0631 21.798H7.11111C7.11111 18.9798 8.76263 16.5455 11.1515 15.4116V11.2247C11.152 10.8438 11.287 10.4753 11.5328 10.1843L15.3813 5.62121C15.5429 5.42929 15.7727 5.33333 16 5.33333C16.2273 5.33333 16.4571 5.42929 16.6187 5.62121L20.4672 10.1843C20.7146 10.4747 20.8485 10.8434 20.8485 11.2247V15.4116ZM16.8412 12.4646C16.6192 12.238 16.3172 12.1075 16 12.101C15.6828 12.1075 15.3808 12.238 15.1588 12.4646C14.9367 12.6913 14.8124 12.9959 14.8124 13.3131C14.8124 13.6304 14.9367 13.935 15.1588 14.1616C15.3808 14.3882 15.6828 14.5188 16 14.5253C16.3172 14.5188 16.6192 14.3882 16.8412 14.1616C17.0633 13.935 17.1876 13.6304 17.1876 13.3131C17.1876 12.9959 17.0633 12.6913 16.8412 12.4646ZM18.5 23.101C18.649 23.1212 18.8005 23.0909 18.9318 23.0152C19.1515 22.8914 19.2879 22.654 19.2904 22.3965C19.2904 22.1313 19.1439 21.9091 18.9217 21.7955H13.0808C12.8611 21.9066 12.7121 22.1288 12.7121 22.3965C12.7121 22.6515 12.8485 22.8864 13.0682 23.0126C13.1988 23.0879 13.3503 23.1189 13.5 23.101L13.9924 23.0379L14.0631 23.5303C14.1995 24.4874 15.0328 25.2096 16 25.2096C16.9672 25.2096 17.8005 24.4874 17.9369 23.5303L18.0076 23.0404L18.5 23.101Z"
              fill="white"
            />
          </svg>
          <span className="text-transform-uppercase">browse all stories</span>
        </Button>
      </div>
    </div>
  );
};

export default MyStories;

import React from 'react';
import NewsContext from './NewsContext';

const NewsState = props => {
  const darkStatusBar = '#1e293b';
  const lightStatusBar = '#cbd5e1';
  return (
    <NewsContext.Provider value={{darkStatusBar, lightStatusBar}}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsState;

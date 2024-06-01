import React from 'react';
import style from './index.module.scss';

const Preloader = () => {
  return (
    <div className={style.preloader}>
      <div className={style.containerPreloader}>
        <span className={style.preloaderRound}></span>
      </div>
    </div>
  )
};

export default Preloader;
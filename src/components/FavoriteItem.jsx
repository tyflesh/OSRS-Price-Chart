import React from 'react';

const FavoriteItem = ({ name, icon, handleSearch }) => {

  return (
    <div className='single-fav-item' onClick={() => handleSearch({ name })}>
      <img src={icon} className='fav-item-icon'></img>
      <p className='fav-item-name'>{name}</p>
    </div>
  )
}

export default FavoriteItem;
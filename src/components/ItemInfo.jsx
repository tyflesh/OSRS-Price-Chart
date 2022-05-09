import React from 'react';
import { Skeleton, Loader, Button, Transition } from '@mantine/core';

const ItemInfo = ({ itemData, searching, favorited, handleFavorite }) => {
  let heartType;
  if (favorited) {
    heartType = 'solid'
  } else {
    heartType = 'regular'
  }

  if (!itemData && !searching) {
    return (<div className='starting-text'>Start by searching for an item in Old School RuneScape</div>)
  } else {
    return searching
      ? (
        <div className='item-info-skeleton'>
          <Skeleton className='item-icon-skeleton' height={80} circle mb="xl" />
          <span className='item-name-skeleton'>
            <Skeleton height={25} width={200} radius="xl" />
          </span>
          <div className='item-description-skeleton'>
            <Skeleton height={12} mt={6} width={300} radius="xl" />
          </div>
        </div>
      )
      :
      (
        <div className='item-info'>
          <img src={itemData.icon_large} className='item-icon'></img>
          <div className='item-name-and-description'>
            <span className='item-name'>{itemData.name}</span>
            <button
              onClick={() => handleFavorite()}
              className='favorite-button'>
              <i className={`fa-${heartType} fa-heart`}></i>
            </button>
            <div className='item-description'>{itemData.description}</div>
          </div>
        </div >
      )
  }
}

export default ItemInfo;

import React from 'react';
import FavoriteItem from './FavoriteItem.jsx';
import { ScrollArea, Divider } from '@mantine/core';

const FavoritesList = ({ favoriteList, handleSearch }) => {

  return (
    <ScrollArea className='favorites-scroll' style={{ height: 870 }} scrollbarSize={15} scrollHideDelay={500}>
      <div className='favorites'>
        {favoriteList.map((item, i) => {
          return (
            <div key={i}>
              <Divider my="sm" />
              <FavoriteItem name={item.name} icon={item.icon}
                handleSearch={handleSearch}
              />
            </div>
          )
        })}
      </div>
    </ScrollArea>
    // <div className='favorites'>
    //   {favoriteList.map((item, i) => {
    //     return (
    //       <FavoriteItem name={item.name} icon={item.icon}
    //         handleSearch={handleSearch} key={i}
    //       />
    //     )
    //   })}
    // </div>
  )
}

export default FavoritesList;

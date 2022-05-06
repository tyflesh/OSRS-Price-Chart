import React from 'react';
import reactDOM from 'react-dom';
import { MantineProvider, Divider, Drawer, Button, Notification } from '@mantine/core';
import './main.css';
import ChartComponent from './components/ChartComponent.jsx';
import Search from './components/Search.jsx';
import ItemInfo from './components/ItemInfo.jsx';
import FavoritesList from './components/FavoritesList.jsx';
const { searchItem, addFavorite, removeFavorite, getFavorites } = require('./requests.js');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: null,
      searching: false,
      favorited: false,
      favoriteList: [],
      favsOpened: false,
      notify: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentDidMount() {
    // this.handleSearch({ name: 'dragon longsword' });

    getFavorites()
      .then(result => {
        this.setState({
          favoriteList: result.data
        });
      })
      .catch(err => {
        console.error(err);
      })

  }

  handleSearch(text) {
    this.toggleSearching();

    searchItem(text)
      .then(result => {
        this.setState({
          itemData: result.data,
          favorited: result.data.favorite,
          searching: false,
        })
        console.log(result.data);
      })
      .catch(err => {
        console.log('error handling search: ');
        console.error(err);
        this.setState({
          searching: false
        })
      })
  }

  toggleSearching() {
    this.setState({
      searching: true,
      favsOpened: false,
    })
  }

  handleFavorite(itemName) {
    const { favorited, itemData } = this.state;
    this.toggleFavorite();

    if (favorited) {
      removeFavorite({ name: itemData.name, icon: itemData.icon })
        .then((result) => {
          console.log('removed from favorites');
          this.setState({
            favoriteList: result.data
          })
          console.log('favorites (after removal): --------');
          console.table(result.data);
        })
    } else {
      addFavorite({ name: itemData.name, icon: itemData.icon })
        .then((result) => {
          console.log('added to favorites');
          this.setState({
            favoriteList: result.data
          })
          console.log('favorites (after adding): --------');
          console.table(result.data);
        })
    }
  }

  toggleFavorite() {
    this.setState({
      favorited: !this.state.favorited
    })
  }

  toggleFavoriteDrawer() {
    this.setState({
      favsOpened: true
    })
  }

  render() {
    const { itemData, searching, favorited,
      favsOpened, favoriteList, notify } = this.state;

    return (
      <MantineProvider>
        <h1>OSRS Item Prices
          <Button className='favorites-drawer-button' color="teal" size="md"
            onClick={() => this.toggleFavoriteDrawer()}>
            Favorites
          </Button>
          <Divider my="sm" />
        </h1>
        <div className='search-and-item-info'>
          <Search handleSearch={this.handleSearch} />
          <ItemInfo itemData={itemData} searching={searching}
            favorited={favorited} handleFavorite={this.handleFavorite} />
          <Drawer
            opened={favsOpened}
            onClose={() => {
              this.setState({
                favsOpened: false
              })
            }}
            title="Favorites"
            padding="xl"
            size="xl"
            position="right"
          >
            <FavoritesList favoriteList={favoriteList} handleSearch={this.handleSearch} />
          </Drawer>
        </div>
        <ChartComponent itemData={itemData} searching={searching} />
      </MantineProvider >
    );
  }
}

reactDOM.render(<App />, document.getElementById('root'));
import React from 'react';
import { Button } from '@mantine/core';
import { TextInput } from '@mantine/core';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  render() {
    const { name } = this.state;
    const { handleSearch } = this.props;

    return (
      <div className='item-search'>
        <TextInput
          icon={<i className="fa-duotone fa-magnifying-glass-dollar"></i>}
          placeholder="Seach an item"
          value={name}
          onChange={(e) => this.handleNameChange(e)}
          size="md"
          className='search-text-input'
        />
        <Button color="teal" size='md'
          onClick={() => handleSearch(this.state)}
          className='search-button'>
          <i className="fa-solid fa-chart-line-up search-button-icon"></i>
        </Button>
      </div >
    )
  }
}

export default Search;
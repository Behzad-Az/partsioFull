import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

@connect(state => ({
  email: state.homePage.get('email'),
  emailStatus: state.homePage.get('emailStatus')
}))

export default class HomePage extends Component {
  static propTypes = {
    email: PropTypes.string,
    emailStatus: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleChange = this._handleChange.bind(this);
    this._getSearchResults = this._getSearchResults.bind(this);
  }

  _handleChange(event) {
    // this.props.dispatch(handleChange(event));
  }

  _getSearchResults() {
    const searchText = 'hello how';
    fetch(`/api/search_results?text=hello&resultsOffset=0&searchText=${searchText}`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(console.log)
    .catch(console.error);
  }

  render() {

    return (
      <div className='search-bar'>
        <div className='field has-addons'>
          <div className='control'>
            <input className='input' type='text' placeholder='Find a repository' />
          </div>
          <div className='control'>
            <a className='button is-info'>
              Search
            </a>
          </div>
        </div>
      </div>
    );
  }
}

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
    // this._submitEmail = this._submitEmail.bind(this);
    this._getSearchResults = this._getSearchResults.bind(this);
  }

  _handleChange(event) {
    this.props.dispatch(handleChange(event));
  }

  _getSearchResults() {
    // const searchText = 'hello how';
    // fetch(`/api/search_results?text=hello&resultsOffset=0&searchText=${searchText}`, {
    //   method: 'GET',
    //   credentials: 'same-origin'
    // })
    // .then(response => response.json())
    // .then(console.log)
    // .catch(console.error);
  }

  render() {
    return (
      <div className='search-page'>
        <div className='main-container'>
          <h1 className='title is-2 has-text-centered'>
            part·si·o
          </h1>
          <p className='has-text-centered'>
            A Better-Together Approach to Inventory Management
          </p>
          <div className='field has-addons'>
            <div className='control is-expanded has-icons-left'>
              <input className='input' type='text' placeholder='Find a repository' />
              <span className='icon is-small is-left'>
                <i className='fa fa-search' />
              </span>
            </div>
            <div className='control'>
              <a className='button is-info'>
                Search
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

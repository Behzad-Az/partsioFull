import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { spSetAsyncLoading, spHandleChange, spConcatResults } from 'actions/SearchPage';
import ResultsContainer from 'components/SearchPage/ResultsContainer.jsx';

@connect(state => ({
  asyncLoading: state.searchPage.get('asyncLoading'),
  searchText: state.searchPage.get('searchText')
}))

export default class SearchPage extends Component {
  static propTypes = {
    asyncLoading: PropTypes.bool,
    searchText: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleEnterKey = this._handleEnterKey.bind(this);
    this._getSearchResults = this._getSearchResults.bind(this);
  }

  _handleEnterKey(event) {
    if (event.keyCode === 13 && !this.props.asyncLoading) {
      this._getSearchResults();
    }
  }

  _getSearchResults() {
    const { searchText, dispatch } = this.props;
    dispatch(spSetAsyncLoading(true));
    fetch(`/api/search_results?text=hello&resultsOffset=0&searchText=${searchText}&freshReload=true`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(resJSON => dispatch(spConcatResults(resJSON)))
    .catch(() => dispatch(spSetAsyncLoading(false)));
  }

  render() {
    const { asyncLoading, dispatch } = this.props;
    return (
      <div className='search-page'>
        <div className='main-container'>
          <p className='title is-2 has-text-centered'>
            <i className='fa fa-cog has-text-justified' style={{ verticalAlign: 'bottom' }} /> part·si·o
          </p>
          <div className='field has-addons'>
            <div className='control is-expanded has-icons-left'>
              <input
                className='input'
                type='text'
                name='searchText'
                placeholder='e.g. butterfly valve 150# 24in'
                onKeyUp={this._handleEnterKey}
                onChange={event => dispatch(spHandleChange(event))}
              />
              <span className='icon is-small is-left'>
                <i className='fa fa-search' />
              </span>
            </div>
            <div className='control'>
              <button
                className={`button is-info ${asyncLoading ? 'is-loading' : ''}`}
                onClick={this._getSearchResults}
                disabled={asyncLoading}
              >
                Search
              </button>
            </div>
          </div>
          <ResultsContainer />
        </div>
      </div>
    );
  }
}

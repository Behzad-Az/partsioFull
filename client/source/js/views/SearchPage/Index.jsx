import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { spHandleChange, spConcatResults } from 'actions/SearchPage';
import ResultsContainer from 'components/SearchPage/ResultsContainer.jsx';

@connect(state => ({
  searchText: state.searchPage.get('searchText')
}))

export default class SearchPage extends Component {
  static propTypes = {
    searchText: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleChange = this._handleChange.bind(this);
    this._getSearchResults = this._getSearchResults.bind(this);
  }

  _handleChange(event) {
    this.props.dispatch(spHandleChange(event));
  }

  _getSearchResults() {
    const { searchText, dispatch } = this.props;
    fetch(`/api/search_results?text=hello&resultsOffset=0&searchText=${searchText}&freshReload=true`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(resJSON => dispatch(spConcatResults(resJSON)))
    .catch(console.error);
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
              <input
                className='input'
                type='text'
                name='searchText'
                placeholder='e.g. butterfly valve 150# 24in'
                onChange={this._handleChange}
              />
              <span className='icon is-small is-left'>
                <i className='fa fa-search' />
              </span>
            </div>
            <div className='control'>
              <button className='button is-info' onClick={this._getSearchResults}>
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

// <div className='field is-grouped is-grouped-centered'>
//   <p className='control'>
//     <a className='button is-outlined'>
//       <label className='checkbox'>
//         <input type='checkbox' />
//         Static Equip
//       </label>
//     </a>
//   </p>
//   <p className='control'>
//     <a className='button is-outlined'>
//       <label className='checkbox'>
//         <input type='checkbox' />
//         Rotating Equip
//       </label>
//     </a>
//   </p>
//   <p className='control'>
//     <a className='button is-outlined'>
//       <label className='checkbox'>
//         <input type='checkbox' />
//         Electrical
//       </label>
//     </a>
//   </p>
//   <p className='control'>
//     <a className='button is-outlined'>
//       <label className='checkbox'>
//         <input type='checkbox' />
//         Instrumentation
//       </label>
//     </a>
//   </p>
// </div>
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import { spConcatResults, spCloseGallery, spChngGalleryImg } from 'actions/SearchPage';
import ResultRow from './ResultRow.jsx';

@connect(state => ({
  searchResults: state.searchPage.get('searchResults'),
  prevSearchText: state.searchPage.get('prevSearchText'),
  noMoreResult: state.searchPage.get('noMoreResult'),
  gallerySettings: state.searchPage.get('gallerySettings')
}))

export default class ResultsContainer extends Component {
  static propTypes = {
    searchResults: PropTypes.array,
    prevSearchText: PropTypes.string,
    noMoreResult: PropTypes.bool,
    gallerySettings: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._loadMoreResults = this._loadMoreResults.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
  }

  _loadMoreResults() {
    const { prevSearchText, searchResults, dispatch } = this.props;
    fetch(`/api/search_results?text=hello&resultsOffset=${searchResults.length}&searchText=${prevSearchText}&freshReload=false`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(resJSON => dispatch(spConcatResults(resJSON)))
    .catch(console.error);
  }

  _renderFooter() {
    const { noMoreResult, searchResults } = this.props;
    if (searchResults.length) {
      return (
        <p className='has-text-centered'>
          <button
            className='button is-info'
            disabled={noMoreResult}
            onClick={this._loadMoreResults}
          >
            {noMoreResult ? 'No more matching result' : 'Load More'}
          </button>
        </p>
      );
    } else if (noMoreResult) {
      return (
        <p className='has-text-centered'>
          No matching result found.
        </p>
      );
    }
  }

  render() {
    const { searchResults, dispatch } = this.props;
    const { isOpen, currentImage, images } = this.props.gallerySettings;
    return (
      <div className='results-container'>
        { searchResults.map(result => <ResultRow key={result._id} item={result} /> ) }
        <Lightbox
          currentImage={currentImage}
          images={images}
          isOpen={isOpen}
          onClickImage={null}
          onClickNext={() => dispatch(spChngGalleryImg('next'))}
          onClickPrev={() => dispatch(spChngGalleryImg('prev'))}
          onClickThumbnail={index => dispatch(spChngGalleryImg(index))}
          onClose={() => dispatch(spCloseGallery())}
          showThumbnails={true}
          theme={undefined}
        />
        { this._renderFooter() }
      </div>
    );
  }
}

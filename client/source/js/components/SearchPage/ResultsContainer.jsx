import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import { spSetAsyncLoading, spConcatResults, spCloseGallery, spChngGalleryImg } from 'actions/SearchPage';
import ResultRow from './ResultRow.jsx';
import DocsModal from './DocsModal.jsx';
import ContactModal from './ContactModal.jsx';

@connect(state => ({
  asyncLoading: state.searchPage.get('asyncLoading'),
  searchResults: state.searchPage.get('searchResults'),
  prevSearchText: state.searchPage.get('prevSearchText'),
  noMoreResult: state.searchPage.get('noMoreResult'),
  galleryParams: state.searchPage.get('galleryParams')
}))

export default class ResultsContainer extends Component {
  static propTypes = {
    asyncLoading: PropTypes.bool,
    searchResults: PropTypes.array,
    prevSearchText: PropTypes.string,
    noMoreResult: PropTypes.bool,
    galleryParams: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._getMoreResults = this._getMoreResults.bind(this);
    this._renderModals = this._renderModals.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
  }

  _getMoreResults() {
    const { prevSearchText, searchResults, dispatch } = this.props;
    dispatch(spSetAsyncLoading(true));
    fetch(`/api/search_results?text=hello&resultsOffset=${searchResults.length}&searchText=${prevSearchText}&freshReload=false`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(resJSON => dispatch(spConcatResults(resJSON)))
    .catch(() => dispatch(spSetAsyncLoading(false)));
  }

  _renderModals() {
    const { searchResults, dispatch } = this.props;
    if (searchResults.length) {
      const { isOpen, currentImage, images } = this.props.galleryParams;
      return (
        <div className='modals'>
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
          <DocsModal />
          <ContactModal />
        </div>
      );
    }
  }

  _renderFooter() {
    const { noMoreResult, searchResults, asyncLoading } = this.props;
    if (searchResults.length) {
      return (
        <p className='has-text-centered'>
          <button
            className={`button is-info ${asyncLoading ? 'is-loading' : ''}`}
            disabled={noMoreResult || asyncLoading}
            onClick={this._getMoreResults}
          >
            { noMoreResult ? 'No more matching result' : 'Load More' }
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
    return (
      <div className='results-container'>
        { this.props.searchResults.map(result => <ResultRow key={result._id} item={result} /> ) }
        { this._renderModals() }
        { this._renderFooter() }
      </div>
    );
  }
}

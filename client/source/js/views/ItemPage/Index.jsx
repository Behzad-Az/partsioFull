import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { ipGetItemInfo } from 'actions/ItemPage';

@connect(state => ({
  asyncLoading: state.itemPage.get('asyncLoading'),
  asyncError: state.itemPage.get('asyncError'),
  dataLoaded: state.itemPage.get('dataLoaded'),
  item: state.itemPage.get('item')
}))

export default class ItemPage extends Component {
  static propTypes = {
    asyncLoading: PropTypes.bool,
    asyncError: PropTypes.object,
    dataLoaded: PropTypes.bool,
    item: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._decodeCompanyRating = this._decodeCompanyRating.bind(this);
    this._renderCompAfterData = this._renderCompAfterData.bind(this);
  }

  componentDidMount() {
    const { location, dispatch } = this.props;
    const params = queryString.parse(location.search);
    dispatch(ipGetItemInfo(params.id));
  }

  _decodeCompanyRating() {
    const { company_rating, company_name } = this.props.item._source;
    switch (company_rating) {
      case 'A':
        return <small><i className='fa fa-industry' /> A+ Reseller <i className='fa fa-check-circle' /></small>
      default:
        return <small><i className='fa fa-industry' /> {company_name}</small>
    }
  }

  _renderCompAfterData() {
    const { asyncLoading, asyncError, dataLoaded, item, dispatch } = this.props;
    if (asyncLoading) {
      return (
        <p className='has-text-centered'>
          <i className='fa fa-cog fa-spin fa-3x fa-fw' />
          <span className='sr-only'>Loading...</span>
        </p>
      );
    } else if (dataLoaded && !asyncError) {
      const { title, search_text, photos, docs, id } = item._source;
      const numPhotos = photos.length;
      const numDocs = docs.length;
      return (
        <div className='box'>
          <article className='media'>
            <div className='media-left'>
              <p className='control'>
                <button
                  className='button is-fullwidth'
                  title={numDocs ? 'See Attachments' : 'No attachment available'}
                  disabled={!numDocs}
                  onClick={null}
                >
                  <span className='icon is-small'>
                    <img src='http://www.iconninja.com/files/557/581/101/attachment-attach-files-clip-files-documents-icon.svg' />
                  </span>
                  <span>Docs</span>
                </button>
              </p>
              <button
                className='image is-128x128 button is-outlined'
                title={numPhotos ? 'See Images' : 'No photo available'}
                disabled={!numPhotos}
                onClick={null}
              >
                <img src={numPhotos ? photos[0].link : 'http://www.royallepagesudbury.ca/images/no-image.png'} alt='Images' />
                { numPhotos ? <p className='has-text-centered is-size-7 has-text-grey'>Images</p> : null }
              </button>
            </div>
            <div className='media-content'>
              <div className='content'>
                <p>
                  <strong>{title}</strong>
                  <br />
                  { this._decodeCompanyRating() }
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                </p>
              </div>
              <nav className='level is-mobile'>
                <div className='level-left'>
                  <a
                    className='level-item'
                    title='Contact Seller'
                    onClick={null}
                  >
                    <span className='icon is-small'><i className='fa fa-reply' /></span>
                  </a>
                  <a className='level-item'>
                    <span className='icon is-small'><i className='fa fa-retweet' /></span>
                  </a>
                  <a className='level-item' title='Add to Wishlist'>
                    <span className='icon is-small'><i className='fa fa-heart' /></span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
      );
    } else {
      return (
        <p className='has-text-centered'>
          <i className='fa fa-exclamation-triangle' /> Error while loading up... Please try again later.
        </p>
      );
    }
  }

  render() {
    return (
      <div className='item-page'>
        <div className='main-container'>
          <p className='title is-2 has-text-centered'>
            <i className='fa fa-cog has-text-justified' style={{ verticalAlign: 'bottom' }} /> part·si·o
          </p>
          { this._renderCompAfterData() }
        </div>
      </div>
    );
  }
}

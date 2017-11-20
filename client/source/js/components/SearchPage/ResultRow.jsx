import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { spOpenGallery, spToggleModal } from 'actions/SearchPage';

@connect()

export default class ResultRow extends Component {
  static propTypes = {
    item: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._decodeCompanyRating = this._decodeCompanyRating.bind(this);
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

  render() {
    const { dispatch, item } = this.props;
    const { title, search_text, photos, docs, id, price } = item._source;
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
                onClick={() => dispatch(spToggleModal({ id: 'docsModal', docs }))}
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
              onClick={() => dispatch(spOpenGallery(photos))}
            >
              <img src={numPhotos ? photos[0].link : 'http://www.royallepagesudbury.ca/images/no-image.png'} alt='Images' />
              { numPhotos ? <p className='has-text-centered is-size-7 has-text-grey'>Images</p> : null }
            </button>
          </div>
          <div className='media-content'>
            <div className='content'>
              <p className='header'>
                <Link to={`/item?id=${id}`}><strong>{title}</strong></Link>
              </p>
              <p className='meta'>
                <hr />
                <i className='fa fa-check-circle' /> A+ Reseller | <i className='fa fa-map' /> Canada | <i className='fa fa-clock-o' /> Brad New | <i className='fa fa-truck' /> Avail. Now | <i className='fa fa-dollar' /> {price}
                <hr />
              </p>
              <p className='comments' style={{ whiteSpace: 'pre-wrap' }}>
                { search_text }
              </p>
            </div>
            <nav className='level is-mobile'>
              <div className='level-left'>
                <a
                  className='level-item'
                  title='Contact Seller'
                  onClick={() => dispatch(spToggleModal({ id: 'contactModal', item }))}
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
  }
}

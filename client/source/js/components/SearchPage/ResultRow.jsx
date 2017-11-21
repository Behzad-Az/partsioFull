import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { spOpenGallery, spToggleModal, spFlagItem, spLikeItem } from 'actions/SearchPage';

@connect(state => ({
  flaggedItems: state.searchPage.get('flaggedItems'),
  likedItems: state.searchPage.get('likedItems')
}))

export default class ResultRow extends Component {
  static propTypes = {
    flaggedItems: PropTypes.object,
    likedItems: PropTypes.object,
    item: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._renderComment = this._renderComment.bind(this);
    this._setupContactModal = this._setupContactModal.bind(this);
  }

  _renderComment() {
    let { id, search_text } = this.props.item._source;
    if (search_text.length > 280) {
      return (
      <p className='comments' style={{ whiteSpace: 'pre-wrap' }}>
        { `${search_text.slice(0, 277)}...` } <Link to={`/item?id=${id}`}>More</Link>
      </p>
      );
    } else {
      return (
        <p className='comments' style={{ whiteSpace: 'pre-wrap' }}>
          { search_text }
        </p>
      );
    }
  }

  _setupContactModal() {
    const { item, dispatch } = this.props;
    dispatch(spToggleModal({
      id: 'contactModal',
      itemId: item._source.id,
      fromName: '',
      fromEmail: '',
      fromPhone: '',
      subject: `Re: ${item._source.title}`,
      content: '',
      asyncLoading: false,
      postStatus: null
    }));
  }

  render() {
    const { item, flaggedItems, likedItems, dispatch } = this.props;
    const { id, title, photos, docs, price } = item._source;
    const numPhotos = photos.length;
    const numDocs = docs.length;
    return (
      <div className='box'>
        <article className='media'>
          <div className='media-left'>
            <div className='control'>
              <button
                className='button is-fullwidth'
                title={numDocs ? 'See attachments' : 'No attachment available'}
                disabled={!numDocs}
                onClick={() => dispatch(spToggleModal({ id: 'docsModal', docs }))}
              >
                <span className='icon is-small'>
                  <img src='assets/svg/attachment.svg' />
                </span>
                <span>Docs</span>
              </button>
            </div>
            <div className='control'>
              <button
                className='image is-128x128 button is-outlined'
                title={numPhotos ? 'See photos' : 'No photo available'}
                disabled={!numPhotos}
                onClick={() => dispatch(spOpenGallery(photos))}
              >
                <img src={numPhotos ? `/imagesapi/${photos[0].name}` : 'http://www.royallepagesudbury.ca/images/no-image.png'} alt='Photo' />
                { numPhotos ? <p className='has-text-centered is-size-7 has-text-grey'>Photos</p> : null }
              </button>
            </div>
            <p className='control has-text-centered'>
              <Link to={`/item?id=${id}`}>More Info</Link>
            </p>
          </div>
          <div className='media-content'>
            <div className='content'>
              <p className='header'>
                <Link to={`/item?id=${id}`}><strong>{title}</strong></Link>
              </p>
              <hr />
              <p className='meta'>
                <i className='fa fa-check-circle' /> A+ Reseller | <i className='fa fa-map' /> Canada | <i className='fa fa-clock-o' /> Brad New | <i className='fa fa-truck' /> Avail. Now | <i className='fa fa-dollar' /> {price}
              </p>
              <hr />
              { this._renderComment() }
            </div>
            <nav className='level is-mobile'>
              <div className='level-left'>
                <a
                  className='level-item has-text-grey'
                  title='Contact Seller'
                  onClick={this._setupContactModal}
                >
                  <span className='icon is-small'><i className='fa fa-reply' /></span>
                </a>
                <a
                  className={likedItems.has(id) ? 'level-item' : 'level-item has-text-grey'}
                  title='Save to favorites'
                  onClick={() => dispatch(spLikeItem(id))}
                >
                  <span className='icon is-small'><i className='fa fa-heart' /></span>
                </a>
                <a
                  className={flaggedItems.has(id) ? 'level-item' : 'level-item has-text-grey'}
                  title='Report'
                  onClick={() => dispatch(spFlagItem(id))}
                >
                  <span className='icon is-small'><i className='fa fa-flag' /></span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    );
  }
}

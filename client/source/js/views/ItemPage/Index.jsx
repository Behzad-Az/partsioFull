import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Lightbox from 'react-images';
import { ipGetItemInfo } from 'actions/ItemPage';
import { spOpenGallery, spCloseGallery, spChngGalleryImg } from 'actions/SearchPage';

@connect(state => ({
  asyncLoading: state.itemPage.get('asyncLoading'),
  asyncError: state.itemPage.get('asyncError'),
  dataLoaded: state.itemPage.get('dataLoaded'),
  item: state.itemPage.get('item'),
  galleryParams: state.searchPage.get('galleryParams')
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
    this._renderDocsTable = this._renderDocsTable.bind(this);
    this._renderGallery = this._renderGallery.bind(this);
    this._renderIntroTile = this._renderIntroTile.bind(this);
    this._renderDocsTile = this._renderDocsTile.bind(this);
    this._renderPhotosTile = this._renderPhotosTile.bind(this);
    this._renderCommentsTile = this._renderCommentsTile.bind(this);
    this._renderContactTile = this._renderContactTile.bind(this);
    this._renderCompAfterData = this._renderCompAfterData.bind(this);
  }

  componentDidMount() {
    const { location, dispatch } = this.props;
    const params = queryString.parse(location.search);
    dispatch(ipGetItemInfo(params.id));
  }

  _renderDocsTable() {
    const { docs } = this.props.item._source;
    if (docs.length) {
      return docs.map((doc, index) =>
        <tr key={index} style={{ cursor: 'pointer' }}>
          <td>{doc.title}</td>
          <td className='has-text-centered'><i className='fa fa-file-text-o' /></td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>No attachment</td>
          <td className='has-text-centered'><i className='fa fa-frown-o' /></td>
        </tr>
      );
    }
  }

  _renderGallery() {
    const { item, galleryParams, dispatch } = this.props;
    const { photos } = item._source;
    if (photos.length) {
      const { isOpen, currentImage, images } = galleryParams;
      return (
        <figure className='image'>
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
          <img src={photos[0].link} />
        </figure>
      );
    } else {
      return (
        <figure className='image is-square'>
          <img src='http://www.entechdesigns.com/new_site/wp-content/themes/en-tech/images/not_available_icon.jpg' />
        </figure>
      );
    }
  }

  _renderIntroTile() {
    const { title, price } = this.props.item._source;
    return (
      <article className='intro tile is-child notification is-purple'>
        <p className='title has-text-white'>
          {title}
        </p>
        <div className='metas'>
          <p className='meta has-text-white'>
            <i className='fa fa-check-circle' /> A+ Reseller
          </p>
          <p className='meta has-text-white'>
            <i className='fa fa-map' /> Canada
          </p>
          <p className='meta has-text-white'>
            <i className='fa fa-clock-o' /> Brad New
          </p>
          <p className='meta has-text-white'>
            <i className='fa fa-truck' /> Avail. Now
          </p>
          <p className='meta has-text-white'>
            <i className='fa fa-dollar' /> {price}
          </p>
        </div>
        <hr />
        <div className='actions'>
          <p className='has-text-centered has-text-white is-inline-block' style={{ width: '50%', cursor: 'pointer' }}>
            <i className='fa fa-heart' title='Save to Favorites' />
          </p>
          <p className='has-text-centered has-text-white is-inline-block' style={{ width: '50%', cursor: 'pointer'  }}>
            <i className='fa fa-flag' title='Report' />
          </p>
        </div>
        <hr />
        <div className='field'>
          <div className='control'>
            <button className='button is-fullwidth'>Buy Now!</button>
          </div>
        </div>
      </article>
    );
  }

  _renderDocsTile() {
    const { docs } = this.props.item._source;
    let header;
    console.log("i'm here 2: ", docs.length);
    switch (docs.length) {
      case 0:
        header = 'No Attachment';
        break;
      case 1:
        header = '1 Doc';
        break;
      default:
        header = `${docs.length} Docs`;
        break;
    }
    return (
      <article className='tile is-child notification is-purple'>
        <p className='title has-text-white'>
          <i className='fa fa-paperclip' /> {header}
        </p>
        <table className='table is-fullwidth is-hoverable'>
          <thead>
            <tr>
              <th style={{ width: '70%' }}>Title</th>
              <th style={{ width: '30%' }} className='has-text-centered'><i className='fa fa-cloud-download' /></th>
            </tr>
          </thead>
          <tbody>
            { this._renderDocsTable() }
          </tbody>
        </table>
      </article>
    );
  }

  _renderPhotosTile() {
    const { item, dispatch } = this.props;
    const { photos } = item._source;
    let header;
    switch (photos.length) {
      case 0:
        header = 'Photos';
        break;
      case 1:
        header = '1 Photo';
        break;
      default:
        header = `${photos.length} Photos`;
        break;
    }
    return (
      <article
        className='tile is-child notification is-purple'
        style={{ cursor: photos.length ? 'pointer' : 'auto' }}
        onClick={() => photos.length ? dispatch(spOpenGallery(photos)) : null}
      >
        <p className='title has-text-white'>
          <i className='fa fa-camera' /> {header}
        </p>
        { this._renderGallery() }
      </article>
    );
  }

  _renderCommentsTile() {
    const { search_text } = this.props.item._source;
    return (
      <article className='tile is-child notification is-purple'>
        <p className='title has-text-white'>
          <i className='fa fa-comment-o' /> Comments
        </p>
        <p className='content has-text-white' style={{ whiteSpace: 'pre-wrap' }}>
          { search_text }
        </p>
      </article>
    );
  }

  _renderContactTile() {
    const { item } = this.props;
    const subject = item ? `Re: ${item._source.title} for Sale` : 'Re: Item for Sale';
    return (
      <article className='tile is-child notification is-purple'>
        <div className='content'>
          <p className='title has-text-white'>
            <i className='fa fa-reply' /> Contact
          </p>
          <div className='content'>
            <div className='field'>
              <label className='label has-text-white'>From</label>
              <div className='control has-icons-left'>
                <input className='input' type='text' placeholder='Name' />
                <span className='icon is-small is-left'>
                  <i className='fa fa-user' />
                </span>
              </div>
            </div>
            <div className='field'>
              <div className='control has-icons-left has-icons-right'>
                <input className='input' type='email' placeholder='Email' />
                <span className='icon is-small is-left'>
                  <i className='fa fa-envelope' />
                </span>
                <span className='icon is-small is-right'>
                  <i className='fa fa-check' />
                </span>
              </div>
            </div>
            <div className='field has-addons'>
              <div className='control'>
                <a className='button is-static'>
                  +1
                </a>
              </div>
              <div className='control is-expanded'>
                <input className='input' type='tel' placeholder='Phone number (optional)' />
              </div>
            </div>
            <div className='field'>
              <label className='label has-text-white'>Subject</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='e.g. Bidding on your item for sale'
                  defaultValue={subject}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label has-text-white'>Message</label>
              <div className='control'>
                <textarea className='textarea' placeholder='Textarea' />
              </div>
            </div>
            <div className='field is-grouped'>
              <div className='control'>
                <button className='button'>Submit</button>
              </div>
              <div className='control'>
                <button className='button is-text has-text-white'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
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
      return (
        <div className='tile is-ancestor'>
          <div className='tile is-vertical is-8'>
            <div className='tile'>
              <div className='tile is-parent is-vertical'>
                { this._renderIntroTile() }
                { this._renderDocsTile() }
              </div>
              <div className='tile is-parent'>
                { this._renderPhotosTile() }
              </div>
            </div>
            <div className='tile is-parent'>
              { this._renderCommentsTile() }
            </div>
          </div>
          <div className='tile is-parent'>
            { this._renderContactTile() }
          </div>
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
          <hr />
          { this._renderCompAfterData() }
        </div>
      </div>
    );
  }
}

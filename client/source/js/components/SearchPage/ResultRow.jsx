import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { spOpenGallery, spCloseGallery, spChngGalleryImg } from 'actions/SearchPage';
// import { css, StyleSheet } from 'aphrodite/no-important';
import Lightbox from 'react-images';

@connect(state => ({
  gallerySettings: state.searchPage.get('gallerySettings'),
}))

export default class ResultRow extends Component {
  static propTypes = {
    gallerySettings: PropTypes.object,
    item: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._decodeCompanyRating = this._decodeCompanyRating.bind(this);
  }

  _decodeCompanyRating() {
    const { company_rating, company_name } = this.props.item._source;

    switch (this.props.item._source.company_rating) {
      case 'A':
        return <small><i className='fa fa-industry' /> A+ Reseller <i className='fa fa-check-circle' /></small>
      default:
        return <small><i className='fa fa-industry' /> {company_name}</small>
    }

  }

  render() {
    const { dispatch } = this.props;
    const { isOpen, currentImage, images } = this.props.gallerySettings;
    const { title, search_text, photo_links } = this.props.item._source;
    return (
      <div className='box'>
        <article className='media'>
          <div className='media-left'>
            <figure className='image is-128x128' onClick={() => dispatch(spOpenGallery(photo_links))}>
              <img src={photo_links[0]} alt='Image' />
            </figure>
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
                <a className='level-item'>
                  <span className='icon is-small'><i className='fa fa-reply' /></span>
                </a>
                <a className='level-item'>
                  <span className='icon is-small'><i className='fa fa-retweet' /></span>
                </a>
                <a className='level-item'>
                  <span className='icon is-small'><i className='fa fa-heart' /></span>
                </a>
              </div>
            </nav>
          </div>
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
        </article>
      </div>
    );
  }
}

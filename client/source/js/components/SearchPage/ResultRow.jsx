import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { spOpenGallery } from 'actions/SearchPage';

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
    switch (this.props.item._source.company_rating) {
      case 'A':
        return <small><i className='fa fa-industry' /> A+ Reseller <i className='fa fa-check-circle' /></small>
      default:
        return <small><i className='fa fa-industry' /> {company_name}</small>
    }
  }

  render() {
    const { dispatch } = this.props;
    const { title, search_text, photos } = this.props.item._source;
    return (
      <div className='box'>
        <article className='media'>
          <div className='media-left'>

            <p className='control'>
              <button className='button is-fullwidth' title='See Documents' disabled>
                <span className='icon is-small'>
                  <img src='http://www.iconninja.com/files/557/581/101/attachment-attach-files-clip-files-documents-icon.svg' />
                </span>
                <span>Docs</span>
              </button>
            </p>

            <button className='image is-128x128 button is-outlined' title='See Images' onClick={() => dispatch(spOpenGallery(photos))}>
              <img src={photos[0].link} alt='Images' />
              <p className='has-text-centered is-size-7 has-text-grey'>Images</p>
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
                <a className='level-item' title='Contact Seller'>
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

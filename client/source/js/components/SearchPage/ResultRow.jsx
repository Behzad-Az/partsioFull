import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ResultRow extends Component {
  static propTypes = {
    item: PropTypes.object
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
    const { title, search_text } = this.props.item._source;
    return (
      <div className='box'>
        <article className='media'>
          <div className='media-left'>
            <figure className='image is-64x64'>
              <img src='https://bulma.io/images/placeholders/128x128.png' alt='Image' />
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
        </article>
      </div>
    );
  }
}

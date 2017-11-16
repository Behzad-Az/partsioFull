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
    this._renderDocsTable = this._renderDocsTable.bind(this);
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
          <td><i className='fa fa-frown-o' /></td>
        </tr>
      );
    }

    // return (
    //   <tbody>
    //     { docs.map((doc, index) =>
    //       <tr key={index} style={{ cursor: 'pointer' }}>
    //         <td>{doc.title}</td>
    //         <td className='has-text-centered'><i className='fa fa-file-text-o' /></td>
    //       </tr>
    //     )}
    //     { !docs[0] && <tr><td>No attachment</td><td><i className='fa fa-frown-o' /></td></tr> }
    //   </tbody>

    // );
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
      const { title, search_text, photos, id } = item._source;
      const numPhotos = photos.length;
      // const numDocs = docs.length;
      // return (
      //   <div className='box'>
      //     <article className='media'>
      //       <div className='media-left'>
      //         <p className='control'>
      //           <button
      //             className='button is-fullwidth'
      //             title={numDocs ? 'See Attachments' : 'No attachment available'}
      //             disabled={!numDocs}
      //             onClick={null}
      //           >
      //             <span className='icon is-small'>
      //               <img src='http://www.iconninja.com/files/557/581/101/attachment-attach-files-clip-files-documents-icon.svg' />
      //             </span>
      //             <span>Docs</span>
      //           </button>
      //         </p>
      //         <button
      //           className='image is-128x128 button is-outlined'
      //           title={numPhotos ? 'See Images' : 'No photo available'}
      //           disabled={!numPhotos}
      //           onClick={null}
      //         >
      //           <img src={numPhotos ? photos[0].link : 'http://www.royallepagesudbury.ca/images/no-image.png'} alt='Images' />
      //           { numPhotos ? <p className='has-text-centered is-size-7 has-text-grey'>Images</p> : null }
      //         </button>
      //       </div>
      //       <div className='media-content'>
      //         <div className='content'>
      //           <p>
      //             <strong>{title}</strong>
      //             <br />
      //             { this._decodeCompanyRating() }
      //             <br />
      //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
      //           </p>
      //         </div>
      //         <nav className='level is-mobile'>
      //           <div className='level-left'>
      //             <a
      //               className='level-item'
      //               title='Contact Seller'
      //               onClick={null}
      //             >
      //               <span className='icon is-small'><i className='fa fa-reply' /></span>
      //             </a>
      //             <a className='level-item'>
      //               <span className='icon is-small'><i className='fa fa-retweet' /></span>
      //             </a>
      //             <a className='level-item' title='Add to Wishlist'>
      //               <span className='icon is-small'><i className='fa fa-heart' /></span>
      //             </a>
      //           </div>
      //         </nav>
      //       </div>
      //     </article>
      //   </div>
      // );
      return (
        <div className='tile is-ancestor'>
          <div className='tile is-vertical is-8'>
            <div className='tile'>
              <div className='tile is-parent is-vertical'>
                <article className='tile is-child notification is-primary'>
                  <p className='title'>{title}</p>
                  <p className='subtitle'>{ this._decodeCompanyRating() }</p>
                </article>
                <article className='tile is-child notification is-warning'>
                  <p className='title'>
                    <i className='fa fa-paperclip' /> Docs
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
              </div>
              <div className='tile is-parent'>
                <article className='tile is-child notification is-info'>
                  <p className='title'>
                    <i className='fa fa-camera' /> Photos
                  </p>
                  <p className='subtitle'>With an image</p>
                  <figure className='image is-square'>
                    <img src={photos[0].link} />
                  </figure>
                </article>
              </div>
            </div>
            <div className='tile is-parent'>
              <article className='tile is-child notification is-danger'>
                <p className='title'>
                  <i className='fa fa-comment-o' /> Comments
                </p>
                <div className='content'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                </div>
              </article>
            </div>
          </div>
          <div className='tile is-parent'>
            <article className='tile is-child notification is-success'>
              <div className='content'>
                <p className='title'>
                  <i className='fa fa-reply' /> Contact
                </p>

                <div className='content form'>

                  <div className='field'>
                    <label className='label'>From</label>
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
                    <label className='label'>Subject</label>
                    <div className='control'>
                      <input className='input' type='text' placeholder='e.g. Bidding on your item for sale' />
                    </div>
                  </div>


                  <div className='field'>
                    <label className='label'>Message</label>
                    <div className='control'>
                      <textarea className='textarea' placeholder='Textarea' />
                    </div>
                  </div>



                  <div className='field is-grouped'>
                    <div className='control'>
                      <button className='button is-link'>Submit</button>
                    </div>
                    <div className='control'>
                      <button className='button is-text'>Cancel</button>
                    </div>
                  </div>






                </div>
              </div>
            </article>
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

  // render() {
  //   return (
  //     <div className='item-page'>
  //       <div className='main-container'>
  //         <p className='title is-2 has-text-centered'>
  //           <i className='fa fa-cog has-text-justified' style={{ verticalAlign: 'bottom' }} /> part·si·o
  //         </p>
  //         { this._renderCompAfterData() }
  //       </div>
  //     </div>
  //   );
  // }

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

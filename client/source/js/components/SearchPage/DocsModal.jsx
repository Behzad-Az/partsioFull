import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { spToggleModal } from 'actions/SearchPage';
import download from 'components/Global/download';

@connect(state => ({
  modalParams: state.searchPage.get('modalParams'),
}))

export default class docsModal extends Component {
  static propTypes = {
    modalParams: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._getDocDownload = this._getDocDownload.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._renderDocList = this._renderDocList.bind(this);
  }

  _getDocDownload(doc) {
    const { name, title } = doc;
    fetch(`/api/docs?name=${name}`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.status === 200) { return response.blob(); }
      else { throw 'Unable to download file'; }
    })
    .then(blob => download(blob, title))
    .catch(err => console.error('Error -', err));
  }

  _closeModal() {
    this.props.dispatch(spToggleModal({ id: null }));
  }

  _renderDocList() {
    const { docs } = this.props.modalParams;
    if (docs && docs[0]) {
      return (
        <table className='table is-fullwidth is-hoverable'>
          <thead>
            <tr>
              <th style={{ width: '70%' }}>Title</th>
              <th style={{ width: '30%' }} className='has-text-centered'><i className='fa fa-cloud-download' /></th>
            </tr>
          </thead>
          <tbody>
            { docs.map((doc, index) =>
              <tr key={index} style={{ cursor: 'pointer' }} onClick={() => this._getDocDownload(doc)}>
                <td>{doc.title}</td>
                <td className='has-text-centered'><i className='fa fa-file-text-o' /></td>
              </tr>
            )}
          </tbody>
        </table>
      );
    }
  }

  render() {
    const { id, docs } = this.props.modalParams;
    return (
      <div className={id === 'docsModal' ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={this._closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>
              Attachments
            </p>
            <button className='delete' onClick={this._closeModal}></button>
          </header>
          <section className='modal-card-body'>
            { this._renderDocList() }
          </section>
        </div>
      </div>
    );
  }
}

import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { spToggleModal } from 'actions/SearchPage';

@connect(state => ({
  modalParams: state.searchPage.get('modalParams'),
}))

export default class ContactModal extends Component {
  static propTypes = {
    modalParams: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._closeModal = this._closeModal.bind(this);
  }

  _closeModal() {
    this.props.dispatch(spToggleModal({ id: null }));
  }

  render() {
    const { id } = this.props.modalParams;
    return (
      <div className={id === 'contactModal' ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={this._closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>
              Contact Seller
            </p>
            <button className='delete' onClick={this._closeModal}></button>
          </header>
          <section className='modal-card-body'>
            <p>TBD</p>
          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success'>Send</button>
            <button className='button' onClick={this._closeModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}

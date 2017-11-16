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
    this._renderBody = this._renderBody.bind(this);
  }

  _closeModal() {
    this.props.dispatch(spToggleModal({ id: null }));
  }

  _renderBody() {
    const { item } = this.props.modalParams;
    if (item) {
      const subject = item ? `Re: ${item._source.title} for Sale` : 'Re: Item for Sale';
      return (
        <section className='modal-card-body'>
          <div className='field is-horizontal'>
            <div className='field-label is-normal'>
              <label className='label'>From</label>
            </div>
            <div className='field-body'>
              <div className='field'>
                <p className='control is-expanded has-icons-left'>
                  <input className='input' type='text' placeholder='Name' />
                  <span className='icon is-small is-left'>
                    <i className='fa fa-user' />
                  </span>
                </p>
              </div>
              <div className='field'>
                <p className='control is-expanded has-icons-left has-icons-right'>
                  <input className='input' type='email' placeholder='Email' />
                  <span className='icon is-small is-left'>
                    <i className='fa fa-envelope' />
                  </span>
                  <span className='icon is-small is-right'>
                    <i className='fa fa-check' />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className='field is-horizontal'>
            <div className='field-label'></div>
            <div className='field-body'>
              <div className='field is-expanded'>
                <div className='field has-addons'>
                  <p className='control'>
                    <a className='button is-static'>
                      +1
                    </a>
                  </p>
                  <p className='control is-expanded'>
                    <input className='input' type='tel' placeholder='Phone number (optional)' />
                  </p>
                </div>
                <p className='help'>Include area code</p>
              </div>
            </div>
          </div>
          <div className='field is-horizontal'>
            <div className='field-label is-normal'>
              <label className='label'>Subject</label>
            </div>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    placeholder='e.g. Bidding on your item for sale'
                    defaultValue={subject}
                  />
                </div>
                <p className='help is-danger'>
                  This field is required
                </p>
              </div>
            </div>
          </div>
          <div className='field is-horizontal'>
            <div className='field-label is-normal'>
              <label className='label'>Message</label>
            </div>
            <div className='field-body'>
              <div className='field'>
                <div className='control'>
                  <textarea className='textarea' placeholder='Type your message here'></textarea>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return (
        <section className='modal-card-body has-text-centered'>
          <i className='fa fa-cog fa-spin fa-3x fa-fw' />
          <span className='sr-only'>Loading...</span>
        </section>
      );
    }
  }

  render() {
    return (
      <div className={this.props.modalParams.id === 'contactModal' ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={this._closeModal}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>
              Contact Seller
            </p>
            <button className='delete' onClick={this._closeModal}></button>
          </header>
          { this._renderBody() }
          <footer className='modal-card-foot'>
            <button className='button is-success'>Send</button>
            <button className='button' onClick={this._closeModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}

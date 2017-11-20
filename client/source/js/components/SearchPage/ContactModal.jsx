import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { spToggleModal, spHandleModalChng } from 'actions/SearchPage';

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
    this._postMsg = this._postMsg.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  _postMsg() {
    const { modalParams, dispatch } = this.props;
    let event = {
      target: { name: 'asyncLoading', value: true }
    };
    dispatch(spHandleModalChng(event));
    fetch('/api/messages', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(modalParams)
    })
    .then(response => {
      event = {
        target: { name: 'postStatus', value: response.ok ? 'ok' : 'fail' }
      };
      dispatch(spHandleModalChng(event));
    })
    .catch(() => {
      event = {
        target: { name: 'postStatus', value: 'fail' }
      };
      dispatch(spHandleModalChng(event));
    })
    .then(() => {
      event = {
        target: { name: 'asyncLoading', value: false }
      };
      dispatch(spHandleModalChng(event));
    });
  }

  _closeModal() {
    this.props.dispatch(spToggleModal({ id: null }));
  }

  _renderPostStatus() {
    const { postStatus } = this.props.modalParams;
    if (postStatus === 'ok') {
      return <p className='help is-success'>Successfully sent!</p>
    } else if (postStatus === 'fail') {
      return <p className='help is-danger'>Unable to send.</p>
    }
  }

  render() {
    const { modalParams, dispatch } = this.props;
    const { id, item, fromName, fromEmail, fromPhone, subject, content, asyncLoading } = modalParams;
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
            <div className='field is-horizontal'>
              <div className='field-label is-normal'>
                <label className='label'>From</label>
              </div>
              <div className='field-body'>
                <div className='field'>
                  <p className='control is-expanded has-icons-left'>
                    <input
                      className='input'
                      type='text'
                      placeholder='Name'
                      name='fromName'
                      onChange={event => dispatch(spHandleModalChng(event))}
                    />
                    <span className='icon is-small is-left'>
                      <i className='fa fa-user' />
                    </span>
                  </p>
                </div>
                <div className='field'>
                  <p className='control is-expanded has-icons-left has-icons-right'>
                    <input
                      className='input'
                      type='email'
                      placeholder='Email'
                      name='fromEmail'
                      onChange={event => dispatch(spHandleModalChng(event))}
                    />
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
              <div className='field-label' />
              <div className='field-body'>
                <div className='field is-expanded'>
                  <div className='field has-addons'>
                    <p className='control'>
                      <a className='button is-static'>
                        +1
                      </a>
                    </p>
                    <p className='control is-expanded'>
                      <input
                        className='input'
                        type='tel'
                        placeholder='Phone number (optional)'
                        name='fromPhone'
                        onChange={event => dispatch(spHandleModalChng(event))}
                      />
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
                      name='subject'
                      placeholder='e.g. Bidding on your item for sale'
                      value={subject}
                      onChange={event => dispatch(spHandleModalChng(event))}
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
                    <textarea
                      className='textarea'
                      name='content'
                      placeholder='Type your message here'
                      onChange={event => dispatch(spHandleModalChng(event))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className='modal-card-foot'>
            <button
              className={asyncLoading ? 'button is-success is-loading' : 'button is-success'}
              disabled={asyncLoading}
              onClick={this._postMsg}
            >
              Send
            </button>
            <button
              className={asyncLoading ? 'button is-loading' : 'button'}
              disabled={asyncLoading}
              onClick={this._closeModal}
            >
              Cancel
            </button>
            { this._renderPostStatus() }
          </footer>
        </div>
      </div>
    );
  }
}

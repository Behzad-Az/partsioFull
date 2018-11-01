import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { hpHandleChange, hpSetEmailStatus } from 'actions/HomePage';

@connect(state => ({
  email: state.homePage.get('email'),
  emailStatus: state.homePage.get('emailStatus')
}))

export default class HomePage extends Component {
  static propTypes = {
    email: PropTypes.string,
    emailStatus: PropTypes.string,
    dispatch: PropTypes.func
  }

  constructor() {
    super();
    this._handleChange = this._handleChange.bind(this);
    this._postEmailAddress = this._postEmailAddress.bind(this);
  }

  componentDidMount() {
    document.title = 'PARTSio - Inventory is Better-Together';
  }

  _handleChange(event) {
    this.props.dispatch(hpHandleChange(event));
  }

  _postEmailAddress() {
    const { dispatch, email } = this.props;
    fetch('/api/email_entries', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(resJSON => dispatch(hpSetEmailStatus(resJSON.emailStatus)))
    .catch(console.error);
  }

  render() {
    const { email, emailStatus } = this.props;
    return (
      <div className='home-page'>

        <header className='lchco-header'>
          <div className='lchco-container-lrg'>
            <div className='lchco-col-12 lchco-spread'>
              <div>
                <a className='lchco-logo'>
                  <i className='fa fa-cog has-text-justified' style={{ verticalAlign: 'middle' }} /> part·si·o
                </a>
              </div>
              <div>

              </div>
            </div>
          </div>
          <div className='lchco-container-lrg lchco-flex'>
            <div className='lchco-col-6 lchco-centervertical'>
              <h1 className='lchco-heading'>
                Better-Together Approach to Inventory Management
              </h1>
              <h2 className='lchco-paragraph'>
                PARTSio is a collaborative tool for industrial inventory management that helps its clients reduce lead times, liquidate excess inventory, and optimize stock levels.
                <br />Our clients benefit greatly by sharing inventory information such as excess levels and procurement needs.
                <br />Then our app, through powerful, secure, and confidential data analytics, connects supply and demand for industrial equipment amongst peer corporations, and iteratively develops longer term optimal inventory plans.
              </h2>
              {
              /*
              <div className='lchco-ctas'>
                <Link className='lchco-ctas-button' to='/search?query=36in-150lb-butterfly-valve'>
                  <i className='fa fa-search' /> sample EZ search page
                </Link>
              </div>
              <div className='lchco-ctas'> -->
                <Link className='lchco-ctas-button' to='item?id=lqNk4vEXeJM'>
                  <i className='fa fa-file-text-o' /> sample equipment page
                </Link>
              </div>
              */
              }
              <div className='lchco-ctas'>
                <input
                  className='lchco-ctas-input'
                  type='text'
                  placeholder='Your Email Address'
                  name='email'
                  value={email}
                  onChange={this._handleChange} />
                <button className='lchco-ctas-button' onClick={this._postEmailAddress}>
                  Sign Up
                </button>
              </div>
              <h4 className='lchco-paragraph'>{emailStatus}</h4>
            </div>
            <div className='lchco-col-6 lchco-sidedevices'>
              <div className='lchco-computeriphone'>
                <div className='lchco-computer'>
                  <div className='lchco-mask'>
                    <img className='lchco-mask-img' src='assets/img/UnderConstruction.jpg' />
                  </div>
                </div>
                <div className='lchco-iphone'>
                  <div className='lchco-mask'>
                    <img className='lchco-mask-img' src='assets/img/CominSoonMobile.png' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className='lchco-feature3'>
          <div className='lchco-container-lrg lchco-flex'>
            <div className='lchco-col-4'>
              <b className='lchco-emoji'>
                💻️ 🚛 💵
              </b>
              <h3 className='lchco-subheading'>
                Scenario: Excess
                <br/>Inventory Liquidation
              </h3>
              <p className='lchco-paragraph'>
                An oil extraction company was moving forward with a major expansion project when the commodity prices deflated. Despite already having procured over $220M worth of parts, management deemed the project no longer viable and canceled the project. Jessica, the lead project engineer, is tasked with liquidating the assets. She contacts PARTSio and our team of computer wizards export the inventory data from her company's database and make it easily searchable on our platform. Within days, Jessica begins receiving bids from all around the world on her excess inventory. She manages to liquidate $220M worth of parts in less than six months. All she had to do was contact PARTSio and respond to the bids that flooded her inbox.
              </p>
            </div>
            <div className='lchco-col-4'>
              <b className='lchco-emoji'>
                💻️ 🚑 🛠️
              </b>
              <h3 className='lchco-subheading'>
                Scenario: Emergency
                <br/>Part Procurement
              </h3>
              <p className='lchco-paragraph'>
                A control valve on a critical system at a pulp mill has failed. Ben, the maintenance engineer, is assigned to remedy the situation as quickly as possible to prevent a costly unplanned shutdown. Ben knows he can expect four months lead time for a replacement in kind, and other solutions require extensive and expensive engineering modifications. He searches PARTSio and finds that one of their reputable peers in a neighboring state carries an excess brand new control valve fit for his application. He connects with the neighboring plant through PARTSio and verifies the technical information. PARTSio then enables the transaction. The new control valve is delivered to Ben within two days and installed flawlessly right away.
              </p>
            </div>
            <div className='lchco-col-4'>
              <b className='lchco-emoji'>
                🏢 ➕ 🏣
              </b>
              <h3 className='lchco-subheading'>
                Scenario: Inventory
                <br/>Consolidation
              </h3>
              <p className='lchco-paragraph'>
                Two mining companies operating in Nevada have signed up for PARTSio. Our platform automatically connects to their inventory databases and tracks the inflow and outflow of parts on a daily basis. Our algorithms determine the optimum stock levels and predict the mean time between orders for each part. Our algorithm also identifies items that are shared between the two sites and develops a consolidated inventory model showing how much each facility could save by working together and reducing the stock levels at both sites. Over two years, each facility saves 15% in their inventory procurement and carrying costs without compromising equipment availability, reliability, or maintainability.
              </p>
            </div>
          </div>
        </div>
        <div className='lchco-socialproof'>
          <div className='lchco-container-sml lchco-text-center'>
            <div className='lchco-col-12'>
              <h4 className='lchco-heading'>
                Some people think we're pretty neat.
              </h4>
            </div>
          </div>
          <div className='lchco-container-lrg'>
            <div className='lchco-logos lchco-flex'>

              <img className='lchco-col-4' src='assets/svg/Eldorado.svg' />

              <img className='lchco-col-4' src='assets/svg/NewGold.svg' />

              <img className='lchco-col-4' src='assets/svg/Kinross.svg' />
            </div>
          </div>
        </div>
        <div className='lchco-footer'>
          <div className='lchco-container-sml lchco-text-center'>
            <div className='lchco-col-12'>
              <h5 className='lchco-subheading'>
                Coming Soon!
              </h5>
              <h5 className='lchco-heading'>
                A Better-Together Approach to Inventory Management
              </h5>
              {
              /*
              <div className='lchco-ctas'>
                <Link className='lchco-ctas-button' to='/search?query=36in-150lb-butterfly-valve'>
                  <i className='fa fa-search' /> sample EZ search page
                </Link>
              </div>
              <div className='lchco-ctas'>
                <Link className='lchco-ctas-button' to='item?id=lqNk4vEXeJM'>
                  <i className='fa fa-file-text-o' /> sample equipment page
                </Link>
              </div>
              */
              }
              <div className='lchco-ctas'>
                <input
                  className='lchco-ctas-input'
                  type='text'
                  placeholder='Your Email Address'
                  name='email'
                  value={email}
                  onChange={this._handleChange} />
                <button className='lchco-ctas-button' onClick={this._postEmailAddress}>
                  Sign Up
                </button>
              </div>
              <h4 className='lchco-paragraph'>{emailStatus}</h4>
            </div>
          </div>
          <div className='lchco-container-sml lchco-footer-nav'>
            <div className='lchco-col-12 lchco-text-center'>
              <div>

              </div>
              <br />
              <div>
                <span>
                  © 2018 PARTSio.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

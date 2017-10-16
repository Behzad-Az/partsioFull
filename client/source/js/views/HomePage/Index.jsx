import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleChange, setEmailStatus } from 'actions/HomePage';

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
    this._submitEmail = this._submitEmail.bind(this);
  }

  _handleChange(event) {
    this.props.dispatch(handleChange(event));
  }

  _submitEmail() {
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
    .then(resJSON => dispatch(setEmailStatus(resJSON.emailStatus)))
    .catch(console.error);
  }

  render() {
    const { email, emailStatus } = this.props;
    return (
      <div className='home-page'>

        <header className='header'>
          <div className='container-lrg'>
            <div className='col-12 spread'>
              <div>
                <a className='logo'>
                  part·si·o
                </a>
              </div>
              <div>
                <a className='nav-link' href='#'>
                  Twitter
                </a>
                <a className='nav-link' href='#'>
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className='container-lrg flex'>
            <div className='col-6 centervertical'>
              <h1 className='heading'>
                Better-Together Approach to Inventory Management
              </h1>
              <h2 className='paragraph'>
                PARTSio is a collaborative tool for industrial inventory management that helps its clients reduce lead times, liquidate excess inventory, and optimize stock levels.
                <div>We believe our clients can benefit greatly by sharing just the right amount of information with their peers such as excess inventory levels and procurement needs.</div>
                <div>Our app facilitates the resulting collaboration securely and confidentially, and connects demand and supply for industrial equipment amongst peer corporations.<br/></div>
              </h2>
              <div className='ctas'>
                <input
                  className='ctas-input'
                  type='text'
                  placeholder='Your Email Address'
                  name='email'
                  value={email}
                  onChange={this._handleChange} />
                <button className='ctas-button' onClick={this._submitEmail}>
                  Sign Up
                </button>
              </div>
              <h4 className='paragraph'>{emailStatus}</h4>
            </div>
            <div className='col-6 sidedevices'>
              <div className='computeriphone'>
                <div className='computer'>
                  <div className='mask'>
                    <img className='mask-img' src='assets/img/UnderConstruction.jpg' />
                  </div>
                </div>
                <div className='iphone'>
                  <div className='mask'>
                    <img className='mask-img' src='assets/img/CominSoonMobile.png' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className='feature3'>
          <div className='container-lrg flex'>
            <div className='col-4'>
              <b className='emoji'>
                ⚙️ 🚑 🛠️
              </b>
              <h3 className='subheading'>
                Scenario: Emergency
                <br/>Part Procurement
              </h3>
              <p className='paragraph'>
                A control valve on a critical system at a pulp mill has failed. Ben, the maintenance engineer, is assigned to remedy the situation as quickly as possible to prevent a costly unplanned shutdown. Ben knows he can expect four months lead time for a replacement in kind, and other solutions require extensive and expensive engineering modifications. He searches PARTSio and finds that one of their reputable peers in a neighboring state carries an excess brand new control valve fit for his application. He connects with the neighboring plant through PARTSio and verifies the technical information. PARTSio then enables the transaction. The new control valve is delivered to Ben within two days and installed flawlessly right away.
              </p>
            </div>
            <div className='col-4'>
              <b className='emoji'>
                ⚙️ 🚛 🛠️
              </b>
              <h3 className='subheading'>
                Scenario: Excess
                <br/>Inventory Liquidation
              </h3>
              <p className='paragraph'>
                An oil extraction company was moving forward with a major expansion project when the commodity prices deflated. Despite already having procured over $220M worth of parts, management deemed the project no longer viable and canceled the project. Jessica, the lead project engineer, is tasked with liquidating the assets. She contacts PARTSio and our team of computer wizards export the inventory data from her company's database and make it easily searchable on our platform. Within days, Jessica begins receiving bids from all around the world on her excess inventory. She manages to liquidate $220M worth of parts in less than six months. All she had to do was contact PARTSio and respond to the bids that flooded her inbox.
              </p>
            </div>
            <div className='col-4'>
              <b className='emoji'>
                🏢 ➕ 🏣
              </b>
              <h3 className='subheading'>
                Scenario: Inventory
                <br/>Consolidation
              </h3>
              <p className='paragraph'>
                Two mining companies operating in Nevada have signed up for PARTSio. Our platform automatically connects to their inventory databases and tracks the inflow and outflow of parts on a daily basis. Our algorithms determine the optimum stock levels and predict the mean time between orders for each part. Our algorithm also identifies items that are shared between the two sites and develops a consolidated inventory model showing how much each facility could save by working together and reducing the stock levels at both sites. Over two years, each facility saves 15% in their inventory procurement and carrying costs without compromising equipment availability, reliability, or maintainability.
              </p>
            </div>
          </div>
        </div>
        <div className='socialproof'>
          <div className='container-sml text-center'>
            <div className='col-12'>
              <h4 className='heading'>
                Some people think we're pretty neat.
              </h4>
            </div>
          </div>
          <div className='container-lrg'>
            <div className='logos flex'>
              <img className='col-4' src='assets/img/Suncor.svg' />
              <img className='col-4' src='assets/img/Eldorado.svg' />
              <img className='col-4' src='assets/img/ARCResources.svg' />
              <img className='col-4' src='assets/img/NewGold.svg' />
              <img className='col-4' src='assets/img/Pengrowth.svg' />
              <img className='col-4' src='assets/img/Kinross.svg' />
            </div>
          </div>
        </div>
        <div className='footer'>
          <div className='container-sml text-center'>
            <div className='col-12'>
              <h5 className='heading'>
                Coming Soon!<br/>
                A Better-Together Approach to Inventory Management
              </h5>
              <div className='ctas'>
                <input
                  className='ctas-input'
                  type='text'
                  placeholder='Your Email Address'
                  name='email'
                  value={email}
                  onChange={this._handleChange} />
                <button className='ctas-button' onClick={this._submitEmail}>
                  Sign Up
                </button>
              </div>
              <h4 className='paragraph'>{emailStatus}</h4>
            </div>
          </div>
          <div className='container-sml footer-nav'>
            <div className='col-12 text-center'>
              <div>
                <a className='nav-link'>
                  Twitter
                </a>
                <a className='nav-link'>
                  Facebook
                </a>
                <a className='nav-link'>
                  Contact
                </a>
              </div>
              <br />
              <div>
                <span>
                  © 2017 PARTSio.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

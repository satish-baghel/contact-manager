import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/spiner';
import classnames from 'classnames';
class clientDetail extends Component {
  state = {
    showBalaceUpdate: false,
    balaceUpdateAmount: '',
  };
  // Update Balance
  balanceSubmit = e => {
    e.preventDefault();
    const { clients, firestore } = this.props;
    const { balaceUpdateAmount } = this.state;
    if (balaceUpdateAmount === '') {
      alert('Enter Amount');
    } else {
      const clientUpdate = {
        balance: parseFloat(balaceUpdateAmount),
      };
      // Update in firestore

      firestore
        .update({ collection: 'clients', doc: clients.id }, clientUpdate)
        .then(balaceUpdateAmount === '');
    }
  };
  // Delete Click

  onClickDelete = () => {
    const { clients, firestore, history } = this.props;
    firestore
      .delete({ collection: 'clients', doc: clients.id })
      .then(history.push('/'));
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { clients } = this.props;
    const { showBalaceUpdate, balaceUpdateAmount } = this.state;

    let balanceForm = '';
    // If balance from should display
    if (showBalaceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              name='balaceUpdateAmount'
              value={balaceUpdateAmount}
              onChange={this.onChange}
            />
            <div className='input-group-append'>
              <input
                type='submit'
                value='Update'
                className='btn btn-outline-dark'
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = '';
    }
    if (clients) {
      return (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/' className='btn btn-link'>
                <i className='fas fa-arrow-circle-left' />
                Back To Dashboard
              </Link>
            </div>
            <div className='col-md-6'>
              <div className='btn-group float-right'>
                <Link
                  to={`/client/edit/${clients.id}`}
                  className='btn btn-dark'
                >
                  Edit
                </Link>

                <button className='btn btn-danger' onClick={this.onClickDelete}>
                  {' '}
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className='card'>
            <h3 className='card-header'>
              {clients.firstName} {clients.lastName}
            </h3>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-8 col-sm-6'>
                  <h4>
                    Client ID:{' '}
                    <span className='text-secondary'>{clients.id}</span>
                  </h4>
                </div>
                <div className='col-md-4 col-sm-6'>
                  <h3 className='pull-right'>
                    Balance:
                    <span
                      className={classnames({
                        'text-danger': clients.balance > 0,
                        'text-success': clients.balance === 0,
                      })}
                    >
                      ${parseFloat(clients.balance).toFixed(2)}
                    </span>
                    <small>
                      {' '}
                      <a
                        href='#!'
                        onClick={() =>
                          this.setState({
                            showBalaceUpdate: !this.state.showBalaceUpdate,
                          })
                        }
                      >
                        <i className='fas fa-pencil-alt'></i>
                      </a>
                    </small>
                  </h3>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className='list-group'>
                <li className='list-group-item'>
                  Contact Email: {clients.email}
                </li>
                <li className='list-group-item'>
                  Contact Phone: {clients.phone}
                </li>
                <li className='list-group-item'></li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

clientDetail.propTypes = {
  firestore: PropTypes.object.isRequired,
};
export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    clients: ordered.client && ordered.client[0],
  }))
)(clientDetail);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
} from '../../action/settingsAction';

class settings extends Component {
  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };
  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };
  AllowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };
  render() {
    const {
      DisableBalanceOnAdd,
      DisableBalanceOnEdit,
      AllowRegistration,
    } = this.props.settings;
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/' className='btn btn-link'>
              <i className='fas fa-arrow-circle-left' /> Back Dashboard
            </Link>
          </div>
        </div>
        <div className='card'>
          <div className='card-header'>Edit Settings</div>
          <div className='card-body'>
            <form>
              <div className='form-group'>
                <label>Allow Registraction</label>
                <input
                  type='checkbox'
                  name='allowRegistration'
                  checked={!!AllowRegistration}
                  onChange={this.AllowRegistrationChange}
                />
              </div>
              <div className='form-group'>
                <label>Disable Balance on Add</label>
                <input
                  type='checkbox'
                  name='disableBalanceOnAdd'
                  checked={!!DisableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
              </div>
              <div className='form-group'>
                <label>Disable Balance on Edit</label>
                <input
                  type='checkbox'
                  name='disableBalanceOnEdit'
                  checked={!!DisableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
};
export default connect((state, props) => ({
  auth: state.firebase.auth,
  settings: state.settings,
}))(settings);

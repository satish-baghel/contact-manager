import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const alert = props => {
  const { message, messageType } = props;
  return (
    <div
      classNames={classnames('alert ', {
        'alert-success': messageType === 'success',
        'alert-danger': messageType === 'error',
      })}
    >
      {message}
    </div>
  );
};
alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
};

export default alert;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

const AlertComp = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Alert key={alert.id} variant={`${alert.alertType}`}>
      {alert.msg}
    </Alert>
  ));

Alert.propTypes = {
  alerts: PropTypes.array
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(AlertComp);

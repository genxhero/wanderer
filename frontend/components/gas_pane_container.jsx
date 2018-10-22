import React from 'react';
import {connect} from 'redux';
import {withRouter} from 'react-router-dom';
import GasPane from './gas_pane';

const dummyState = {butter: "I see you"}

const mapStateToProps = dummyState => ({
     butter
});

const mapDispatchToProps = dispatch => ({
       
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GasPane));
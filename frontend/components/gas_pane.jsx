import React from 'react';
import {withRouter} from 'react-router-dom';

class GasPane extends React.Component {
constructor(props){
    super(props);
}

render(){
    return (
        <div className="gas-pane-page">
        
            <div className="gas-pane-head">
                <h1>you are in the gas pane</h1>
            </div>

            <div className="results-area">
                <div className="results-list">
                    <h3>This is a list of results</h3>
                </div>

                <div className="map-section">
                    
                </div>

                <div className="result-details">
                    <h3>Details for any given result go here</h3>
                </div>
            </div>
            
        </div>
    );
}

}

export default withRouter(GasPane);
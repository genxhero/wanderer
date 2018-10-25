import React from 'react';

class GasPaneHead extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          foodSelected: false,
          hotelSelected: false,
          barSelected: false
        }
    }
    
    render() {
    return <div className="gas-pane-head">
        <div className="gas-pane-form-container">
          <form className="gas-pane-form">
            <div className="gas-pane-input">
              <input id="start-loc"className="gas-pane-input-field" type="text" placeholder="Where to??" />
              <div className="percent-container">
                <span className="percent-label">How full is you tank?</span><span className="percent-sign">%</span>
                <input id="tank-percent" className="gas-pane-input-field" type="text" placeholder="100" />

              </div>
              
            </div>

            <div className="gas-pane-checkboxes">
            <span className="gas-pane-choices-label">After how many hours of driving will you...</span>
            <input className="gas-pane-choice" placeHolder="Be hungry like the wolf"></input>
            <input className="gas-pane-choice" placeHolder="Have to stop for the night"></input>

            </div>
            <div className="button-div">
              <input className="gas-pane-submit" type="submit" value="Do It!!" />
              <div className="gas-pane-text-bg" />
              <div className="gas-pane-submit-shadow" />
            </div>
          </form>
        </div>
      </div>;
  }
}

export default GasPaneHead;

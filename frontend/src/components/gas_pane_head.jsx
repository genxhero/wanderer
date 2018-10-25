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
          <form className="gas-pane-form" onSubmit="">
            <div className="gas-pane-input">
              <input id="start-loc"className="gas-pane-input-field" type="text" placeholder="Where to??" />
              <input id="tank-percent" className="gas-pane-input-field" type="text" placeholder="Percent Full" />
             
            </div>

            <div className="gas-pane-checkboxes">

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

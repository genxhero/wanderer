import React from 'react';

class GasPaneHead extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
    return (
      <div className="gas-pane-head">
       
        <div className="gas-pane-form-container">
           <form className="gas-pane-form"> 
              <div className="gas-pane-input">
                  <input 
                    className="gas-pane-input-field"
                    type="text"
                    placeholder = "Where are you starting from?"
                    >
                  </input>
                  <input 
                    className="gas-pane-input-field"
                    type="text"
                    placeholder="Percentage of full tank"
                    >
                  </input>
            </div>

            <div className="gas-pane-checkboxes">
                   
            </div>
                <input
                className ="gas-pane-submit"
                type="submit"
                >
                
                </input>

            </form>
        </div>

      </div>
    )
  }
}

export default GasPaneHead;

import React from 'react';

class GasPaneHead extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          foodSelected: false,
          hotelSelected: false,
          barSelected: false,
          funmode: false
        }
        this.shadowSubmit = this.shadowSubmit.bind(this);
        this.toggleFunmode = this.toggleFunmode.bind(this);
    }
 
    toggleFunmode() {
      if (this.state.funmode === false) {
         this.setState({funmode: true});
       } else {
        this.setState({ funmode: false });
       } 
    }
    

    
  shadowSubmit(){
    const vroom = new Audio();
    console.log("the script is running");
    vroom.src = "https://s3-us-west-1.amazonaws.com/wayfarer-sounds/BMW%2BDRIVEBY.mp3";
    vroom.play();
    const shadow = document.getElementsByClassName('shadow-submit')[0];
    shadow.click();
}
    
    render() {

    return <div className="gas-pane-head">
        <button className="cool-mode" onClick={this.toggleFunmode} />
        <div className="gas-pane-form-container">
          <form className="gas-pane-form" onSubmit="">
            <div className="gas-pane-input">
              <input id="start-loc" className="gas-pane-input-field" type="text" placeholder="Where to??" />
              <div className="percent-container">
                <span
                  className={
                    this.state.funmode === true
                      ? "percent-label-fun"
                      : "percent-label"
                  }
                >
                  How full is you tank?
                </span>
                <span className="percent-sign">%</span>
                <input id="tank-percent" className="gas-pane-input-field" type="text" placeholder="100" />
              </div>
            </div>

          <div className={this.state.funmode === true ? "gas-pane-checkboxes-fun": "gas-pane-checkboxes"}>
              <span className={this.state.funmode === true ? "gas-pane-choices-label-fun": "gas-pane-choices-label"}>
                After how many hours of driving will you...
              </span>
              <input className="gas-pane-choice" placeHolder="Be hungry like the wolf" />
              <input className="gas-pane-choice" placeHolder="Have to stop for the night" />
            </div>
            <div className="button-div">
              <div className="gas-pane-submit" onClick={this.shadowSubmit}>
                <span>DO IT!</span>
              </div>
              <div className="gas-pane-text-bg" />
              <div className="gas-pane-submit-shadow" />
            </div>
            <input type="submit" className="shadow-submit" />
          </form>
        </div>
      </div>;
  }
}

export default GasPaneHead;

import React from 'react';
import ReserveModal from './ReserveModal';
const moment = require('moment');
moment().format();

//reserve button
class Reserve extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibility: 'hidden'
    };

    this.numReservedDates = this.props.numReservedDates;
    this.handleOutsideReserveModalClick = this.handleOutsideReserveModalClick.bind(this);
    this.toggleReserveModal = this.toggleReserveModal.bind(this);
  }

  toggleReserveModal() {
    if(this.numReservedDates) {
      let visibility;
      if(this.state.visibility === "hidden") {
        visibility = "visible";
      } else {
        visibility = "hidden";
      }
      this.setState({
        visibility,
      });
    }
  }

  handleOutsideReserveModalClick(e) {
    if (this.state.visibility === "visible" && !this.node.contains(e.target)) {
      this.toggleReserveModal();
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideReserveModalClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideReserveModalClick, false);
  }

  render() {
    return (
      <div className="reserve">
        <button className="reserveButton" id="reserve" onClick={this.toggleReserveModal}>Reserve</button>
        <div ref={node => this.node = node}>
            <ReserveModal visibility={this.state.visibility}
                          toggleReserveModal={this.toggleReserveModal}/>
        </div>
      </div>
    );
  }
}

export default Reserve;

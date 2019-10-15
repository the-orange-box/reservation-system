import React from'react';

class GuestsDropdown extends React.Component{
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  render() {


    return (
      <div ref={node => this.node = node}>
        <span className="guestsDropdown" id="guestsDropdown" style={{visibility: this.props.guestVisibility}}>A Simple Popup!</span>
      </div>
    );
  }

  handleClick(e) {
    if (this.props.guestVisibility === "visible" && !this.node.contains(e.target)) {
      console.log(this.node);
      console.log(e);
      this.props.toggleGuestsDropdown();
    }
  }
}

export default GuestsDropdown;
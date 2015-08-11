import React from 'react';


export default class InfoOverlay extends React.Component {
  constructor(props) {
    super(props);
  }

  renderContent() {  }

  render() {
    var content = this.renderContent();

    return (
      <div className="layout-overlay">
        <button className="back-navigation" onClick={this.props.onClose.bind(this)}><i className="fa fa-chevron-left"></i><span className="aria-text">Back</span></button>
        {content}
      </div>
    )
  }
}

InfoOverlay.propTypes = {
  onClose: React.PropTypes.func
};
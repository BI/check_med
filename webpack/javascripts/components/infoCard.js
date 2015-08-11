import React from 'react';


export default class InfoCard extends React.Component {
  constructor(props) {
    super(props);
  }

  renderContent() {  }

  render() {
    var content = this.renderContent();

    return (
      <div className="row">
        <div className="column small-12">
          <div className="layout-card">
            <button className="close" onClick={this.props.onClose.bind(this)}><i className="fa fa-times"></i><span className="aria-text">Close</span></button>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

InfoCard.propTypes = {
  onClose: React.PropTypes.func
};
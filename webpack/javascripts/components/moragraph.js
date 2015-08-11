import React from 'react';

//We should probably add a tolerance here to make sure we're not adding more stuff than we're removing.

export default class Moragraph extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {isCollapsed: true};
  }

  hasOverflowingText() {
    return this.props.content.length > this.props.collapsedCharCount;
  }

  renderContent() { 
    if(!this.hasOverflowingText() || !this.state.isCollapsed) {
      return this.props.content;
    }

    return this.props.content.slice(0, this.props.collapsedCharCount)+'...';
  }

  buttonLabel() {
    if (this.state.isCollapsed) {
      return this.props.expandButtonLabel+" ▾";
    } else {
      return this.props.collapseButtonLabel+" ▴";
    }
  }

  button() {
    if (!this.hasOverflowingText()) {
      return null;
    }

    var label = this.buttonLabel();
    
    return (<span><br/><button className="mg-toggle-button" onClick={this.toggleCollapsed.bind(this)}>{label}</button></span>);
  }

  toggleCollapsed() {
    this.setState({isCollapsed: (!this.state.isCollapsed) });
  }

  render() {
    var content = this.renderContent();
    
    return (
      <p key={this.props.key} className="moragraph">
        <span className="mg-content">{content}</span>
        {this.button()}
      </p>
    )
  }
}

Moragraph.propTypes = {
  content: React.PropTypes.string.isRequired,
  collapsedCharCount: React.PropTypes.number.isRequired,
  expandButtonLabel: React.PropTypes.string,
  collapseButtonLabel: React.PropTypes.string
};

Moragraph.defaultProps = {
  expandButtonLabel: "more",
  collapseButtonLabel: "less"
}
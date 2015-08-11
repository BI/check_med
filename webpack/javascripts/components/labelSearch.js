var Searcher = require('../util/openfda').drugLabelSearcher;
import React from 'react';
import _ from 'lodash';
import classes from 'classnames';

export default class LabelSearch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {shownItems: [], errorText: null, inFlightCount: 0, isEmpty: true};
    this.searchCount = 0;

    //former componentWillMount
    this.newSuggestions = _.debounce(function(){
      var value = React.findDOMNode(this.refs.searchBar).value;

      if(value === null || value === "") {
        this.setState({shownItems: []});
        return;
      }

      this.searchCount += 1;
      this.setState({inFlightCount: this.state.inFlightCount+1});
      Searcher.getAll(value, this.updateShownItems.bind(this, this.searchCount));
    }, 500).bind(this);
  }

  updateShownItems(searchCount, err, res) {
    this.setState({inFlightCount: this.state.inFlightCount-1});
    var errorText = null;
    if (err)
      errorText = res.statusText;
    if (searchCount === this.searchCount)
      this.setState({shownItems: res.body.results, errorText: errorText});

  }

  onChange(event) {
    this.newSuggestions();

    this.props.onChange();
    this.setState({isEmpty: event.target.value == ""});
  }

  onSelectItem(itemIndex) {
    var searchBar = React.findDOMNode(this.refs.searchBar);
    this.props.onSelect(this.state.shownItems[itemIndex]);
    searchBar.value = null;
    this.setState({shownItems: [], isEmpty: true});
  }

  render() {
    var options = {};

    var containerClasses = classes("row labelSearch", {
      "loading": this.state.inFlightCount > 0,
    }, {"isEmpty": this.state.isEmpty});

    var inputClasses = classes("ls-searchBar");

    if(this.state.shownItems) {
      options = this.state.shownItems.map(function(item, index) {
        return (<li className="ls-option">
            <button onClick={this.onSelectItem.bind(this, index)} key={index}>
              <span className="ls-optionTitle"><span className="label-brandName">{item.openfda.brand_name}</span> <span className="label-genericName">({item.openfda.generic_name})</span></span>
              <span className="ls-optionManufacturerName">{item.openfda.manufacturer_name}</span>
            </button>
          </li>)
      }, this);
    }

    if(this.state.errorText) {
      options = <li className="ls-option ls-errorText">{this.state.errorText}</li>
    }

    return (
      <div className={containerClasses}>
        <div className="column column-justLanded small-12">
          <label><span className="aria-text">Add a drug...</span>
            <input className={inputClasses} type="text" ref="searchBar" placeholder="add a drug..." onChange={this.onChange.bind(this)}/>
          </label>
          <ul className="ls-optionList">
            {options}
          </ul>
        </div>
      </div>
    )
  }

};

LabelSearch.propTypes = {
  onSelect: React.PropTypes.func,
};

LabelSearch.defaultProps = {
  onSelect: function(){},
};

import React from 'react';
import InfoCard from './infoCard';
import Moragraph from './moragraph';
var Searcher = require('../util/openfda').drugLabelSearcher;
var EventSummary = require('../util/openfda').eventSummaryDataFetcher;

var CURRENT_RECALLS = ["ongoing", "on-going", "pending"];

//These two refer to the ids in drugDetailsOverlay. Make sure they match up.
var GENERAL = 0;
var ADVERSE_EVENTS = 5;

var charLimit = 300;

export default class DrugSummary extends InfoCard {
  constructor(props) {
    super(props);

    this.state = {recall: null, adverseEventCount: 0};
  }

  componentDidMount() {
    Searcher.getRecallById(this.props.drugLabel.openfda.spl_id, this.onReturnRecall.bind(this));

    var seriousMap = {
      "Serious": "1",
      "Not Serious": "2",
    };

    EventSummary("serious", seriousMap, this.props.drugLabel.openfda.brand_name, this.updateAdverseEventCount.bind(this));
  }

  updateAdverseEventCount(dataSet) {
    console.log(dataSet);
    var data = dataSet.datasets[0].data;
    var adverseEventCount = data[0] + data[1];
    if (adverseEventCount !== adverseEventCount)
      adverseEventCount = 0;

    this.setState({adverseEventCount: adverseEventCount}); //serious + not serious
  }

  onReturnRecall(err, res) {
    if(err) {
      return;
    }

    var recall = res.body.results[0];
    var status = recall.status.toLowerCase();
    if(CURRENT_RECALLS.indexOf(status) === -1) {
      return;
    }

    this.setState({recall: recall});
  }

  makeRecall(drugLabel, drugRecall) {
    if(drugRecall == null) {
      return null;
    }

    var recallClass = drugRecall.classification;

    return (
      <div className="row label-recall">
        <div className="columns small-12">
          <i className="fa fa-exclamation-circle"></i>
          <span className="label-recall-text">This item is currently under a <span className="label-recall-badge">{recallClass} <i data-tooltip aria-haspopup="true" className="fa fa-info-circle has-tip" title="
Class I recall: a situation in which there is a reasonable probability that the use of or exposure to a violative product will cause serious adverse health consequences or death.&#013;
Class II recall: a situation in which use of or exposure to a violative product may cause temporary or medically reversible adverse health consequences or where the probability of serious adverse health consequences is remote.&#013;
Class III recall: a situation in which use of or exposure to a violative product is not likely to cause adverse health consequences."></i></span> recall.</span><button className="label-openRecall" onClick={this.props.onOpenRecall.bind(this, drugLabel, drugRecall)}>RECALL REPORT <i className="fa fa-chevron-right"></i></button>
        </div>
      </div>
    )
  }

  makeWarnings(drugLabel) {
    var warnings = [];

    var hybridWarning = null;
    var warningContent = null;

    if(drugLabel.pregnancy_or_breast_feeding) {
      warnings.push(<h3 className="label-warning" key="hw"><i className="fa fa-warning"></i> Pregnant or Nursing Mothers</h3>);
      warnings.push(<Moragraph key="hc" content={drugLabel.pregnancy_or_breast_feeding.toString()} collapsedCharCount={charLimit} />);
    }

    if(drugLabel.pregnancy) {
      warnings.push(<h3 className="label-warning" key="pw"><i className="fa fa-warning"></i> Pregnant Mothers</h3>);
      warnings.push(<Moragraph key="pc" content={drugLabel.pregnancy.toString()} collapsedCharCount={charLimit} />);
    }

    if(drugLabel.nursing_mothers) {
      warnings.push(<h3 className="label-warning" key="nw"><i className="fa fa-warning"></i> Nursing Mothers</h3>);
      warnings.push(<Moragraph key="nc" content={drugLabel.nursing_mothers.toString()} collapsedCharCount={charLimit} />);
    }

    return warnings
  }

  //called by infocard's render
  renderContent() {
    var drugLabel = this.props.drugLabel;

    var brandName = drugLabel.openfda.brand_name;
    var genericName = drugLabel.openfda.generic_name;
    var manufacturer = drugLabel.openfda.manufacturer_name;
    var dosage = drugLabel.dosage_and_administration;

    if (dosage) {
      dosage = dosage.toString();
    } else {
      dosage = "";
    }

    var recall = this.makeRecall(drugLabel, this.state.recall);
    var warnings = this.makeWarnings(drugLabel);

    return (
      <div className="label-info">
        <div className="row">
          <div className="columns small-12">
            <h2 className="label-heading">
              <div className="label-title">
                <span className="label-brandName">{brandName}</span> <span className="label-genericName">({genericName})</span>
              </div>
              <div className="label-manufacturer">{manufacturer}</div>
            </h2>
          </div>
        </div>
        {recall}
        <div className="row">
          <div className="columns small-12">
            {warnings}
            <p key="dosage"><span className="label-badge">Dosage</span> <Moragraph content={dosage} collapsedCharCount={charLimit} /></p>
            <div className="columns small-12">
              <button className="label-left-control" onClick={this.props.onOpenDetails.bind(this, drugLabel, ADVERSE_EVENTS)}>{parseInt(this.state.adverseEventCount).toLocaleString()} reported adverse events</button>
              <button className="label-control" onClick={this.props.onOpenDetails.bind(this, drugLabel, GENERAL)}>Full Details <i className="fa fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //render() from InfoCard
}

DrugSummary.propTypes = {
  drugLabel: React.PropTypes.object.isRequired,
  onOpenDetails: React.PropTypes.func.isRequired,
  onOpenRecall: React.PropTypes.func.isRequired,
};

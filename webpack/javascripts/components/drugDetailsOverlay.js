import React from 'react';
import InfoOverlay from './infoOverlay.js';
import classes from 'classnames';
import Charts from 'react-chartjs';

var BarChart = Charts.Bar;
var EventDataFetcher = require('../util/openfda').eventDataFetcher;
var EventSummaryDataFetcher = require('../util/openfda').eventSummaryDataFetcher;

var GENERAL = 0;
var DOSAGE = 1;
var PREGNANCY_WARNINGS = 2;
var GENERAL_WARNINGS = 3;
var PATIENT_INFO = 4;
var ADVERSE_EVENTS = 5; //If you change this one, you also need to change the id in drugSummaryCard

var CONTROL_SWAP_WIDTH = 600;

export default class DrugDetails extends InfoOverlay {
  constructor(props) {
    super(props);

    var condensation = window.innerWidth < props.controlSwapWidth;
    this.state = { display: this.props.targetPage || GENERAL, 
                   condenseControl: condensation};

    if (window.addEventListener) {
      window.addEventListener('resize', this.onResize.bind(this), false);
    } else if (window.attachEvent) {
      window.attachEvent('onresize', this.onResize.bind(this));
    } else {
      window.onresize = this.onResize.bind(this);
    }
  }

  componentDidMount() {
    var eventTypeMap = {
      "Death": "seriousnessdeath",
      "Life Threatening": "seriousnesslifethreatening",
      "Disabling": "serisousnessdisabling",
      "Birth Defect": "seriousnesscongenitalanomali",
      "Hospitalization": "seriousnesshospitalization",
      "Other Serious Event": "seriousnessother",
    };

    EventDataFetcher(eventTypeMap, this.props.drugLabel.openfda.brand_name, this.updateEventData.bind(this));

    var seriousMap = {
      "Serious": "1",
      "Not Serious": "2",
    };

    EventSummaryDataFetcher("serious", seriousMap, this.props.drugLabel.openfda.brand_name, this.updateEventSummaryData.bind(this));
  }

  chartOptions() {
    return {
      scaleLabel : "<%= ' ' + parseInt(value).toLocaleString() %>",
      tooltipTemplate : "<%if (label){%><%=label%>: <%}%><%=value.toLocaleString()%>",
      responsive: false
    };
  }

  onResize() {
    var condensation = window.innerWidth < this.props.controlSwapWidth;
    this.setState({condenseControl: condensation});
  }

  changeDisplayMode(newMode) {
    this.setState({display: newMode});
  }

  updateEventData(dataSet) {
    this.setState({seriousEventCountsByCategory: dataSet});
  }

  updateEventSummaryData(dataSet) {
    this.setState({eventCountsBySerious: dataSet});
  }

  generateContent(drugLabel, contentObj) {
    var content = [];

    for(var title in contentObj)
    {
      var field = contentObj[title];
      var description = drugLabel[field];
      
      if(!description) {
        continue;
      }

      var keyVar = title.toLowerCase().replace(" ", "");

      content.push(<h3 className="label-field" key={keyVar + "heading"}>{title}</h3>);
      content.push(<p key={keyVar + "content"}>{description}</p>);
    }

    return content.length === 0 ? (<p>No information for this section is available.</p>) : content;
  }

  seriousEventCountsByCategory(){
    return this.state.seriousEventCountsByCategory;
  }

  eventCountsBySerious(){
    return this.state.eventCountsBySerious;
  }

  makeDosageContent() {
    var drugLabel = this.props.drugLabel;

    return this.generateContent(drugLabel, {
      "Dosage": "dosage_and_administration",
    });
  }

  makeGeneralContent() {
    var drugLabel = this.props.drugLabel;

    return this.generateContent(drugLabel, {
      "Purpose": "purpose",
      "Active Ingredient": "active_ingredient",
      "Inactive Ingredient": "inactive_ingredient",
      "Storage and Handling": "storage_and_handling",
      "Questions": "questions",
    });
  }

  makePregnancyContent() {
    var drugLabel = this.props.drugLabel;

    return this.generateContent(drugLabel, {
      "Pregnant or Nursing": "pregnancy_or_breast_feeding",
      "Pregnant": "pregnancy",
      "Nursing": "nursing_mothers",
      "Effect on Pregnancy": "teratogenic_effects",
      "Labor and Delivery": "labor_and_delivery",
      "Children": "pediatric_use",
      "Reproduction": "nonteratogenic_effects",
    });
  }

  makeWarningContent() {
    var drugLabel = this.props.drugLabel;

    return this.generateContent(drugLabel, {
      "Serious Warnings": "boxed_warnings",
      "User Safety": "user_safety_warnings",
      "Warnings and Precautions": "warnings_and_precautions",
      "Warnings": "warnings",
      "Precautions": "precautions",
      "General Precautions": "general_precautions",
      "Geriatric Use": "geriatric_use",
    });
  }

  makePatientContent() {
    var drugLabel = this.props.drugLabel;

    return this.generateContent(drugLabel, {
      "General Patient Information": "information_for_patients",
      "Keep out of Reach of Children": "keep_out_of_reach_of_children",
      "Do Not Use": "do_not_use",
      "When Using": "when_using",
      "Stop Use": "stop_use",
      "Consult a Doctor": "ask_doctor",
      "Consult a Medical Professional": "ask_doctor_or_pharmacist",
      "Other Information": "other_safety_information",
    });
  }

  makeAdverseEventsContent() {
    var drugLabel = this.props.drugLabel;
    var width, height;

    height = '400px';
    width = '325px';

    var summaryChart;
    if (this.eventCountsBySerious())
      summaryChart = (<BarChart data={this.eventCountsBySerious()} width={width} height={height} options={this.chartOptions()} />);

    var categoryChart;
    if (this.seriousEventCountsByCategory())
      categoryChart = (<BarChart data={this.seriousEventCountsByCategory()} width={width} height={height} options={this.chartOptions()} />)

    return (
      <div>
        <div className="row">
          <p className="column small-12">The following information is from the FDA Adverse Event Reporting System (FAERS) as reported since January 1, 2004.</p>
          <p className="column small-12">For more information go to the <a target="new" href="http://www.fda.gov/Drugs/GuidanceComplianceRegulatoryInformation/Surveillance/AdverseDrugEffects/">FDA site</a>.</p>
        </div>
        <div className="row chart-container">
          <div className="column small-12 medium-6">
            <h3>Adverse Events Summary</h3>
            {summaryChart}
          </div>
          <div className="column small-12 medium-6">
            <h3>Serious Adverse Events by Category</h3>
            {categoryChart}
          </div>
        </div>
      </div>);
  }

  makeContent() {
    switch(this.state.display) {
      case DOSAGE:
        return (<div className="row"><div className="column small-12">{this.makeDosageContent()}</div></div>);
      case GENERAL:
        return (<div className="row"><div className="column small-12">{this.makeGeneralContent()}</div></div>);
      case PREGNANCY_WARNINGS:
        return (<div className="row"><div className="column small-12">{this.makePregnancyContent()}</div></div>);
      case GENERAL_WARNINGS:
        return (<div className="row"><div className="column small-12">{this.makeWarningContent()}</div></div>);
      case PATIENT_INFO:
        return (<div className="row"><div className="column small-12">{this.makePatientContent()}</div></div>);
      case ADVERSE_EVENTS:
        return this.makeAdverseEventsContent();
    }

    return null;
  }

  makeControlContainer(elements) {
    if(this.state.condenseControl) {
      var onChange = function(event) {
        var value = parseInt(event.target.value);
        this.changeDisplayMode(value);
      };

      return <select className="label-details-controls" selectedIndex={this.state.display} onChange={onChange.bind(this)}>{elements}</select>
    }

    return <ul className="label-details-controls">{elements}</ul>
  }

  makeControlItem(label, type) {
    var isSelected = this.state.display === type;

    var controlClasses = classes("label-details-control", {"selected": isSelected});

    return this.state.condenseControl
      ? (<option className={controlClasses} key={type} selected={isSelected} value={type}>{label}</option>)
      : (<li className={controlClasses} key={type}><button selected={isSelected} onClick={this.changeDisplayMode.bind(this, type)}>{label}</button></li>)
  }

  makeControl() {
    var controls = [];

    controls.push(this.makeControlItem("General", GENERAL));
    controls.push(this.makeControlItem("Dosage", DOSAGE));
    controls.push(this.makeControlItem("Pregnancy Warnings", PREGNANCY_WARNINGS));
    controls.push(this.makeControlItem("General Warnings", GENERAL_WARNINGS));
    controls.push(this.makeControlItem("Patient Info", PATIENT_INFO));
    controls.push(this.makeControlItem("Adverse Events", ADVERSE_EVENTS));

    return this.makeControlContainer(controls);
  }

  renderContent() {
    var drugLabel = this.props.drugLabel;

    var brandName = drugLabel.openfda.brand_name;
    var genericName = drugLabel.openfda.generic_name;
    var manufacturer = drugLabel.openfda.manufacturer_name;

    var displayControls = this.makeControl();
    var content = this.makeContent();

    return (
      <div  className="layout-table">
        <div className="fixed-header">
          <h2 className="label-heading">
            <div className="label-title">
              <span className="label-brandName">{brandName}</span> <span className="label-genericName">({genericName})</span>
            </div>
            <div className="label-manufacturer">{manufacturer}</div>
          </h2>
          <div className="row label-details-overview">
            <div className="column small-12">
              {displayControls}
            </div>
          </div>
        </div>
        <div ref="tabContent" className="overflow-y tabContent">
          {content}
        </div>
      </div>
    );
  }
};

DrugDetails.propTypes = {
  drugLabel: React.PropTypes.object.isRequired,
  controlSwapWidth: React.PropTypes.number,
};

DrugDetails.defaultProps = {
  controlSwapWidth: CONTROL_SWAP_WIDTH,
};
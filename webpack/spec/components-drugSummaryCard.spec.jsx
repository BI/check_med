var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var DrugSummary = require('../javascripts/components/drugSummaryCard.js');
var findClass = TestUtils.findRenderedDOMComponentWithClass;
var scryClass = TestUtils.scryRenderedDOMComponentsWithClass;

describe("DrugSummary functionality", function() {
  var drugSummary, props, drugLabel;

  beforeEach(function() {
    drugLabel = {
      openfda: {}
    };

    props = {
      onClose: function(event) {},
      onOpenDetails: function(drugLabel) {},
      onOpenRecall: function(drugLabel, drugRecall) {},
      drugLabel: drugLabel,
    };

    spyOn(props, "onOpenDetails");
    spyOn(props, "onOpenRecall");

    drugSummary = TestUtils.renderIntoDocument(<DrugSummary {...props} />);
  });

  it("calls the open details functionality when clicked", function() {
    var openDetails = findClass(drugSummary, "label-control");
    TestUtils.Simulate.click(openDetails);

    expect(props.onOpenDetails).toHaveBeenCalled(); //can't do "calledWith" because objects get copied
  });

  it("calls the recall alert function when clicked", function() {
    var recall = { status: "Ongoing" }
    var response = { body: { results:[recall] } }
    drugSummary.onReturnRecall(null, response);

    var openRecall = findClass(drugSummary, "label-openRecall");
    TestUtils.Simulate.click(openRecall);

    expect(props.onOpenRecall).toHaveBeenCalled(); //can't do "calledWith" because objects get copied
  });
});

describe("DrugSummary content", function() {
  var drugSummary, props, drugLabel;

  beforeEach(function() {
    drugLabel = {
      openfda: {}
    };

    props = {
      onClose: function(event) {},
      onOpenDetails: function(drugLabel) {},
      onOpenRecall: function(drugLabel, drugRecall) {},
      drugLabel: drugLabel,
    };
  });

  it('shows pregnancy warnings', function() {
    drugLabel.pregnancy_or_breast_feeding ="xxx";
    drugLabel.pregnancy ="xxx";
    drugLabel.nursing_mothers ="xxx";

    drugSummary = TestUtils.renderIntoDocument(<DrugSummary {...props} />);

    var warnings = scryClass(drugSummary, "label-warning");

    expect(warnings.length).toBe(3);
  });

  it('shows a recall warning', function() {
    drugSummary = TestUtils.renderIntoDocument(<DrugSummary {...props} />);

    var recall = { status: "Ongoing" }
    var response = { body: { results:[recall] } }
    drugSummary.onReturnRecall(null, response);

    var alerts = scryClass(drugSummary, "label-recall");
    expect(alerts.length).toBe(1);
  });
});
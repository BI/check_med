var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var DrugDetails = require('../javascripts/components/drugDetailsOverlay.js');
var findClass = TestUtils.findRenderedDOMComponentWithClass;
var findElement = TestUtils.findRenderedDOMComponentWithTag;
var scryClass = TestUtils.scryRenderedDOMComponentsWithClass;

describe("DrugDetails", function() {
  var props;

  beforeEach(function() {
    var drugLabel = { openfda: {} };
    drugLabel.boxed_warnings = "boxed_warnings"; //in warnings
    drugLabel.purpose = "purpose"; //in general

    props = {
      drugLabel: drugLabel,
      controlSwapWidth: 0,
      onClose: function(event) {},
    };

  });

  it("changes view modes when you click it (with tabs)", function() {
    var drugDetails = TestUtils.renderIntoDocument(<DrugDetails {...props} />);

    var title = findClass(drugDetails, "label-field");

    expect(title.getDOMNode().textContent).toBe("Purpose");

    var controls = scryClass(drugDetails, "label-details-control");
    controls = controls.map(function(li) {
      return findElement(li, "button");
    });

    var warningControl = controls.filter(function(item) {
      return item.getDOMNode().textContent === "General Warnings";
    }).pop();

    TestUtils.Simulate.click(warningControl);

    title = findClass(drugDetails, "label-field");

    expect(title.getDOMNode().textContent).toBe("Serious Warnings");
  });

});
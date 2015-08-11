var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var DrugRecall = require('../javascripts/components/drugRecallAlert.js');
var findClass = TestUtils.findRenderedDOMComponentWithClass;
var scryClass = TestUtils.scryRenderedDOMComponentsWithClass;

describe("DrugRecall functionality", function() {
  var drugRecall, props;

  beforeEach(function() {
    var recall = { openfda: {} };
    var label = { openfda: {} };
    props = {
      drugRecall: recall,
      drugLabel: label,
      onClose: function(event) {}
    };

    spyOn(props, "onClose");

    drugRecall = TestUtils.renderIntoDocument(<DrugRecall {...props} />);
  });

  it("calls onClose when you click the close button", function() {
    var closeButton = findClass(drugRecall, "back-navigation");
    TestUtils.Simulate.click(closeButton);

    expect(props.onClose).toHaveBeenCalled();
  });
});
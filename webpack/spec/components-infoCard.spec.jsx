var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var InfoCard = require('../javascripts/components/infoCard.js');
var findClass = TestUtils.findRenderedDOMComponentWithClass;

describe("InfoCard", function() {
  var infoCard, props;

  beforeEach(function() {
    props = {
      onClose: function(event) { console.log("close"); }
    };

    spyOn(props, "onClose");

    infoCard = TestUtils.renderIntoDocument(<InfoCard {...props} />);
  });

  it("calls onClose when you click the close button", function() {
    var closeButton = findClass(infoCard, "close");
    TestUtils.Simulate.click(closeButton);

    expect(props.onClose).toHaveBeenCalled();
  });

});
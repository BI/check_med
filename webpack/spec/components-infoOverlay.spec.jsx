var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var InfoOverlay = require('../javascripts/components/infoOverlay.js');
var findClass = TestUtils.findRenderedDOMComponentWithClass;

describe("InfoOverlay", function() {
  var infoOverlay, props;

  beforeEach(function() {
    props = {
      onClose: function(event) { console.log("close"); }
    };

    spyOn(props, "onClose");

    infoOverlay = TestUtils.renderIntoDocument(<InfoOverlay {...props} />);
  });

  it("calls onClose when you click the close button", function() {
    var closeButton = findClass(infoOverlay, "back-navigation");
    TestUtils.Simulate.click(closeButton);

    expect(props.onClose).toHaveBeenCalled();
  });

});
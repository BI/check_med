var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Moragraph = require('../javascripts/components/moragraph.js');
var findClass = TestUtils.findRenderedDOMComponentWithClass;

describe("Moragraph", function() {
  var moraGraph, props;

  beforeEach(function() {
    props = {
      content: "some test content",
      collapsedCharCount: 9
    };

    moraGraph = TestUtils.renderIntoDocument(<Moragraph {...props} />);
  });

  it("renders truncated text by default", function() {
    var content = findClass(moraGraph, 'mg-content').props.children;
    expect(content).toEqual('some test...');
  });

  it("renders full text when expanded", function() {
    var moreButton = findClass(moraGraph, 'mg-toggle-button');
    TestUtils.Simulate.click(moreButton);
    var content = findClass(moraGraph, 'mg-content').props.children;
    expect(content).toEqual('some test content');
  });

  it("renders truncated text after it has been collapsed", function() {
    var moreButton = findClass(moraGraph, 'mg-toggle-button');
    TestUtils.Simulate.click(moreButton);
    TestUtils.Simulate.click(moreButton);
    var content = findClass(moraGraph, 'mg-content').props.children;
    expect(content).toEqual('some test...');
  });

});

describe("Moragraph", function() {
  var moraGraph, props;

  beforeEach(function() {
    props = {
      content: "some test content",
      collapsedCharCount: 100
    };

    moraGraph = TestUtils.renderIntoDocument(<Moragraph {...props} />);
  });

  it("renders text as normal if under the character limit", function() {
    var content = findClass(moraGraph, 'mg-content').props.children;
    expect(content).toEqual('some test content');
  });

});
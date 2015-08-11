var DataFetcher = require('../javascripts/util/openfda/src/eventDataFetcher');


describe("EventDataFetcher year creator", function() {
  it("works with single digit month/day", function() {
    var now = new Date("2015-06-09");

    var format = DataFetcher._getInPastYear(now);

    expect(format).toBe("{20050609 TO 20150609}");
  });

  it("works with double digit month/day", function() {
    var now = new Date("2015-11-19");

    var format = DataFetcher._getInPastYear(now);

    expect(format).toBe("{20051119 TO 20151119}");
  });
});
var luceneConvenience = require('../javascripts/util/openfda/index.js').luceneConvenience;
var fragmentMatcher = luceneConvenience.fragmentMatcher;
var multiFieldFragmentSearch = luceneConvenience.multiFieldFragmentSearch;

describe("fragmentMatcher", function() {

  it("handles 'Ibu'", function() {
    expect(fragmentMatcher('Ibu')).toEqual('{Ibtzzzz TO Ibv}');
  });

  it("handles 'Iba'", function() {
    expect(fragmentMatcher('Iba')).toEqual('{Ib TO Ibb}');
  });

  it("handles 'a'", function() {
    expect(fragmentMatcher('a')).toEqual('{a TO b}');
  });

  it("handles 'z'", function() {
    expect(fragmentMatcher('z')).toEqual('{z TO zzzzz}');
  });

  it("handles 'd'", function() {
    expect(fragmentMatcher('d')).toEqual('{czzzz TO e}');
  });

  it("handles 'Ibz'", function() {
    expect(fragmentMatcher('Ibz')).toEqual('{Ibyzzzz TO Ibzzzzz}');
  });

  it("handles numeric characters", function() {
    expect(fragmentMatcher('2')).toEqual('{1zzzz TO 3}');
    expect(fragmentMatcher('22')).toEqual('{21zzzz TO 23}');
    expect(fragmentMatcher('20')).toEqual('{2 TO 21}');
    expect(fragmentMatcher('0')).toEqual('{0 TO 1}');
    expect(fragmentMatcher('29')).toEqual('{28zzzz TO 29zzzz}');
    expect(fragmentMatcher('9')).toEqual('{9 TO 9zzzz}');
  });

  it("truncates at non-alphanumerics", function(){
    expect(fragmentMatcher('Ibu-')).toEqual('{Ibtzzzz TO Ibv}');
    expect(fragmentMatcher('Ibu-p')).toEqual('{Ibtzzzz TO Ibv}');
  });

});

describe("multiFieldFragmentSearch", function(){

  it("handles a single fragment on multiple fields", function() {
    expect(multiFieldFragmentSearch('Ibu', ['f1','f2','f3'])).toEqual('f1:{Ibtzzzz TO Ibv} OR f2:{Ibtzzzz TO Ibv} OR f3:{Ibtzzzz TO Ibv}');
  });

  it("handles multiple fragments on multiple fields", function() {
    expect(multiFieldFragmentSearch('Ibu Liq', ['f1','f2','f3'])).toEqual('(f1:{Ibtzzzz TO Ibv} OR f2:{Ibtzzzz TO Ibv} OR f3:{Ibtzzzz TO Ibv}) AND (f1:{Lipzzzz TO Lir} OR f2:{Lipzzzz TO Lir} OR f3:{Lipzzzz TO Lir})');
  });

  it("handles a single fragment, on a single field", function() {
    expect(multiFieldFragmentSearch('Ibu', ['f1'])).toEqual('f1:{Ibtzzzz TO Ibv}');
  });

});
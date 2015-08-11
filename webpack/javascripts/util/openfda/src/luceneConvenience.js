function	fragmentMatcher(val) {
  var nonAlpha = val.search(/[^a-zA-Z0-9]/);
  var value = val;
  if (nonAlpha > 0) {
    value = val.substring(0,nonAlpha); 
  }
  var base = value.length === 1 ? value : value.substring(0, value.length-1);
  var lastCharCode = value.charCodeAt(value.length-1);
  var lastChar = value.charAt(value.length-1).toLowerCase();

  // Common Case
  var startStr = base + String.fromCharCode(lastCharCode-1) + "zzzz";
  var endStr = base + String.fromCharCode(lastCharCode+1);

  // Edge Cases
  if (lastChar === "a" || lastChar === "0"){
    if (value.length > 1){
      startStr = base;
    } else {
      startStr = base;
      endStr = String.fromCharCode(lastCharCode+1);
    }
  } else if (lastChar === "z" || lastChar === "9") {
    if (value.length > 1){
      endStr = base + lastChar + "zzzz";
    } else {
      startStr = base;
      endStr = base + "zzzz";
    }
  } else if (!isNaN(parseInt(lastChar))) {
    if (value.length === 1) {
      startStr = (parseInt(lastChar) - 1).toString() + "zzzz";
      endStr = (parseInt(lastChar) + 1).toString();
    }
  } else {
    if (value.length === 1) {
      startStr = String.fromCharCode(lastCharCode-1) + "zzzz";
      endStr = String.fromCharCode(lastCharCode+1);
    }
  }

  return "{" + startStr + " TO " + endStr + "}";
}

function splitTerms(value) {
  return value.trim().split(' ');
}

function searchFields(value, fields){
  var luceneSearch = fragmentMatcher(value);
  if (fields.length === 1)
    return fields[0] + ':' + luceneSearch;

  return fields.map(function(field){
    return field + ':' + luceneSearch;
  }).join(' OR ');
}

module.exports = {
  multiFieldFragmentSearch: function(value, fields) {
    var terms = splitTerms(value);
    if (terms.length === 1)
      return searchFields(terms[0], fields);

    return terms.map(function(term){
      return '(' + searchFields(term, fields) + ')';
    }).join(' AND ');
  },
  fragmentMatcher: fragmentMatcher
};
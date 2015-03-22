this.parse = function(s) {
  return s.split(',').map(function(val) {
    var kv = val.split('/').map(function(kv) { return kv; });
    if(kv.length == 2) {
      return {
        user: kv[0].trim(),
        repo: kv[1].trim()
      }
    }
    return null;
  });
}
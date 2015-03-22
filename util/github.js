var GitHubApi = require('github');

module.exports = function(host, pathPrefix) {

  var github = {};

  github.client = function(token) {
    var c = new GitHubApi({
      version: '3.0.0',
      protocol: 'https',
      host: host,
      pathPrefix: pathPrefix
    });
    c.authenticate({
      type: 'oauth',
      token: token
    });
    return c;
  }

  return github;
}
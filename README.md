# Griffel :tophat:

Griffel is a derivate from [tripit/slate](https://github.com/tripit/slate) with the biggest difference being that it fetches documentation markdown from GitHub repos based on whatever the user has access to.

The idea behind everything is to store documentation close to the code (preferably inside the the code repositories to avoid derivation) while at the same offer a beautiful central documentation hub.

## How it works

1. User authenticates with his or her GitHub account...
2. ...Griffel fetches the documentations that the user has access to from the configured GitHub repositories...
3. ...and compiles everything into a uniformed visually appealing documentation view.

### Demo

A demo application is available on [https://griffel-demo.herokuapp.com](https://griffel-demo.herokuapp.com)

## Features
* Super crisp UI thanks to the beautiful people over at [tripit/slate](https://github.com/tripit/slate) :bow:
* Multi repository support, meaning that one can easily pull in API documentations from various code repositories to a central documentation hub.
* Documentation written in Markdown.
* Per-user access control. Users will only see documentation for the repositories he or she has access to.
* Works with both private and public repositories.
* GitHub Enterprise support.

## Installation

Griffel is designed to run on [Heroku](http://heroku.com) but can easily be deployed wherever.

### Get the good stuff
```
$ git clone git://github.com/hnrc/griffel.git
$ cd griffel
$ npm install
```

### Environment variables
Griffel is [Twelve-factor](http://12factor.net) compatible and therefore reads its [configuration from the environment](http://12factor.net/config).

#### Required variables
* `COOKIE_SECRET` - Used to sign session cookies
* `GH_CALLBACK_URL` - GitHub callback URL used during authentication
	* Example: `http://example.com/auth/callback`
* `GH_CLIENT_ID` - A client ID for your GitHub Application
	* Wat? Have a look at [Basics of Authentication](https://developer.github.com/guides/basics-of-authentication/)
* `GH_CLIENT_SECRET` - A client secret for your GitHub Application
* `GH_REPOS` - A comma separated list with the repos that we're gonna fetch documentation
	* Example: `hnrc/griffel-demo-kittn,hnrc/griffel-demo-doges`

#### Optional variables
* `DOC_PATH` - A path to wherever you've placed your documentation markdown. (Default: `api-spec.md`)
* `GH_HOST` - The host to your GitHub instance if your running GitHub Enterprise
* `GH_API_PATH_PREFIX` - Something like `/api/v3` is usually needed for GitHub Enterprise

### Fire up the engine
```
$ node app.js
```

or if you're into [Heroku](http://heroku.com) and [foreman](https://github.com/ddollar/foreman):

```
$ foreman start
```

## Contribute

Pull requests are always welcome :beers:

## Credits
* [tripit/slate](https://github.com/tripit/slate) :heart:
* [mikedeboer/node-github](https://github.com/mikedeboer/node-github)

module.exports = function(app, github, markdown) {

  app.get('/', function(req, res) {
    if(req.session.token) {
      res.render('layout', {content: markdown});
    } else {
      res.redirect('/auth/sign-in');
    }
  });

}
module.exports = function(app) {
  app.use('/api/*', (req, res) => {
    return res.status(404).send({
      message: 'route not found'
    });
  });

  app.use('/*', (req, res) => {
    return res.status(404).render('404');
  });
};

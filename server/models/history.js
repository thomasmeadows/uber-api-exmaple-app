module.exports = function(app) {
  const SchemaTypes = app.mongooseDB.Schema.Types;
  return app.mongooseDB.model('History', {
    user: SchemaTypes.Oid,
    status: String,
    distance: Number,
    product_id: String,
    start_time: Number,
    start_city: SchemaTypes.Object,
    end_time: Number,
    request_id: String,
    request_time: Number
  });
};

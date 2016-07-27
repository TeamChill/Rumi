let server = require('./server');
let db = require('./db/config');

db.sync().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    
    console.log('Listening....');
  });
});

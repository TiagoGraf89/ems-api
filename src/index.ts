import app from './App'

const port = process.env.PORT || 3000

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*"); // TODO: Change this in config file to lock down
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Expires");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Accept", "application/json");
	next();
});

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
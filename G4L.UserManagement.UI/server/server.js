const jsonServer = require("json-server");
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const useData = require("../server/data/goals");

server.get("/api/goals", (req, res, next) => {
  res.status(200).send(useData.goals);
});

server.listen(58760, () => {
  console.log("JSON Server Listening on port 58760");
});

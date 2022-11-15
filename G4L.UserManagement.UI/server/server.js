const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const useData = require('../server/data/attendences');

server.get('/api/attendences',(req,res,next)=>{
    res.status(200).send(useData.getAttendence);
});

server.listen(58760,()=>{
    console.log("JSON Server Listening on port 58760");
})
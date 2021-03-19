const http = require('http')

// this is a unit test function for post requests
function PostRequests(dataIn, path, method){
  data = JSON.stringify(dataIn);
  const options = {
    hostname: 'localhost',
    port: 1337,
    path: path,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    
    res.on('data', d => {
      console.log('Succes on sending POST request on path: '+path);
      console.log('using data: '+ data);
      process.stdout.write(d)
    });
  });
  
  req.on('error', error => {
    console.log('error while sending POST request on path: '+path);
    console.log('using data: '+ data);
  });
  
  req.write(data);
  req.end();
}

// dans notre exemple on va d'abords insérer
// avec un utilisateur qui existe '999'
// et ensuite avec un utilisateur qui n'existe pas '66666'
listeRequests = [
  {
    data: {
      key: '999',
      X: Math.random() * 10,
      Y: Math.random() * 10,
      Z: Math.random() * 10
    },
    path: '/accelerometers',
    method: 'POST'
  },
  {
    data: {
      key: '66666',
      X: Math.random() * 10,
      Y: Math.random() * 10,
      Z: Math.random() * 10
    },
    path: '/accelerometers',
    method: 'POST'
  },
];



// starting the tests
listeRequests.forEach(iterFunc);

function iterFunc(value){
  switch(value.method){
    case 'POST':
      testPostRequests(value.data, value.path, value.method);
      break;
    case 'GET':
      testGetRequests(value.data, value.path, value.method);
      break;
    default: console.log('error with method, not post nor get');
  }
}
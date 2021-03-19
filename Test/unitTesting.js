const http = require('http')

// this is a unit test function for get requests
function testGetRequests(data, path, method){
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
      console.log('Succes on sending GET request on path: '+path);
      //process.stdout.write(d)
    });
  });
  
  req.on('error', error => {
    console.log('Error on sending GET request on path: '+path);
  });
  
  req.write(data);
  req.end();
}

// this is a unit test function for post requests
function testPostRequests(dataIn, path, method){
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

// requests to test with
listeRequests = [
  {
    data: '',
    path: '/coordinates',
    method: 'GET'
  },
  {
    data: '',
    path: '/accelerometers',
    method: 'GET'
  },
  {
    data: '',
    path: '/users',
    method: 'GET'
  },
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
      key: '999',
      lat: Math.random() * 10,
      lon: Math.random() * 10,
      adress: Math.random().toString(26).substring(10)
    },
    path: '/coordinates',
    method: 'POST'
  },
  {
    data: {
      key: (Math.floor(Math.random() * 10)+15).toString(),
      firstName: Math.random().toString(26).substring(10),
      lastName: Math.random().toString(26).substring(10)
    },
    path: '/users',
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
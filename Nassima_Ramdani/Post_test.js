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
    }
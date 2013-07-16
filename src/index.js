/*

  (The MIT License)

  Copyright (C) 2005-2013 Kai Davenport

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

/*

	digger main API
	
*/


var path = require('path');

var exports = module.exports = {

  version:require(__dirname + '/../package.json').version,

  /*
  
    export utils for supplier modules
    
  */
  utils:require('digger-utils'),
  
  /*
  
    container

    client framework
    
  */
	container:require('./container/proto').factory,
  proto:require('./container/proto'),
  create:require('./container/proto').factory,
  selector:require('./container/selector'),

  supplychain:require('./container/supplychain'),
  
  /*
  
    network

    messaging framework
    
  */
  promise:require('./request/promise'),
  request:require('./request/request').factory,
  response:require('./request/response').factory,
  contract:require('./request/contract').factory,
  async:require('./request/async').async,
  pipe:require('./request/async').pipe,
  merge:require('./request/async').merge,
  series:require('./request/async').series,
  parallel:require('./request/async').merge,



  browserapi_path:function(){
    return path.normalize(__dirname + '/../build/container.js');
  }




}
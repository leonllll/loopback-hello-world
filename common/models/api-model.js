'use strict';

module.exports = function(APIModel) {
  APIModel.remoteMethod('testRequestValidation', {
    description: 'test the validation of the request data',
    accepts: [
      {arg: 'data', type: 'APIRequestModel', required: true, description: 'Request Data', http: {source: 'body'}}
    ], // 请求参数的type一定要设置成相应Request Model，LoopBack会自动完成数据格式的转换
    returns: {arg: 'result', type: 'boolean', description: '', root: true},
    http: {path: '/validation', verb: 'post', status: 200, errorStatus: 500}
  });

  APIModel.testRequestValidation = function(data) {
    if (!data.isValid()) { // 调用isValid方法来校验输入数据
      var err = new Error('Invalid Request Data');
      err.statusCode = 400;
      err.stack = data.errors; // 获取错误信息
      throw err;
    }
    return Promise.resolve(true);
  };
};

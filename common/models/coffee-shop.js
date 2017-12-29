'use strict';

module.exports = function(CoffeeShop) {
  // Validation方法
  CoffeeShop.validatesLengthOf('name', {min: 2, message: {min: 'is too short'}});
  CoffeeShop.validatesInclusionOf('city', {in: ['Beijing', 'Shanghai']});
  // 自定义的Validation方法
  CoffeeShop.validate('name', function(err) {
    if (this.name && this.name.length > 15) {
      return err();
    }
  }, {
    message: 'is too long'
  });

  // 1. 注册一个remoteMethod
  CoffeeShop.remoteMethod('status', {
    description: 'get the status of a CoffeeShop',
    accepts: [
      {arg: 'id', type: 'string', required: true, description: 'CoffeeShop Id', http: {source: 'path'}}
    ], // 定义输入参数格式，支持在path/body/query中携带参数
    returns: {arg: 'has', type: 'object', description: '', root: true}, // 定义返回结果的格式
    http: {path: '/:id/status', verb: 'get', status: 200, errorStatus: 500} // 定义HTTP相关属性
  });

  // 2. 定义相应的remoteMethod
  /*CoffeeShop.status = function(id, cb) { // 用callback的方式返回结果
    CoffeeShop.findById(id).then(shop => {
      if (!shop) {
        var error = new Error('Coffee Shop ' + id + ' can not be found');
        error.statusCode = 404;
        return cb(error);
      }
      var status = 'Coffee Shop ' + id + ' is open now';
      cb(null, status);
    });
  };*/
  
  CoffeeShop.status = function(id) { // 直接return一个Promise
    return CoffeeShop.findById(id).then(shop => {
      if (!shop) {
        var error = new Error('Coffee Shop ' + id + ' can not be found');
        error.statusCode = 404;
        throw error;
      }
      var status = 'Coffee Shop ' + id + ' is open now';
      return status;
    });
  };
};

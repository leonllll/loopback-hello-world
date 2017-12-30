'use strict';

module.exports = function(APIRequestModel) {
  APIRequestModel.validatesLengthOf('param1', {max: 6, message: {max: 'length is too long'}});
  APIRequestModel.validatesExclusionOf('param2', {in: ['string'], message: 'can not be `string`'});
}

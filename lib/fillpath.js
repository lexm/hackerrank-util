'use strict';

exports.fillPath = function(download) {
  if(download.indexOf('/') === -1) {
    return process.cwd() + '/' + download;
  } else {
    return download;
  }
}

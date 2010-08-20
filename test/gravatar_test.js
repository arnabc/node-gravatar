var assert = require('assert'),
crypto = require('crypto');

var gravatar = require('./../lib/gravatar');

var url =  gravatar.get('arnabc@webgyani.com');
// test default rating
assert.ok( url.indexOf( 'r=G' ) > -1, 'Default Rating test failed' );
// test size
assert.ok( url.indexOf('s=96') > -1, 'Default size test failed' );

url = gravatar.get( 'arnabc@webgyani.com', 'PG', 120 );
assert.ok( url.indexOf('r=PG') > -1, 'Specified size test failed');
assert.ok( url.indexOf('s=120') > -1, 'Specified rating test failed' );

var md5 = crypto.createHash('md5').update('arnabc@webgyani.com').digest('hex');
assert.ok( url.indexOf( md5 ) > -1, 'MD5 digest mismatch' );

assert.throws( function () {
                   var u = gravatar.get();
               } );

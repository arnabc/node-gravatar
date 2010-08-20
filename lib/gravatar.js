// we need crypto module for making md5 hash
var crypto = require('crypto');

var Gravatar = module.exports = function () {
    // stores the generated email id and corresponding md5 hash
    // so that we don't need to generate the same hash again and again
    var md5 = {};

    // list of allowed ratings
    var RATINGS = [ 'G', 'PG', 'R', 'X' ];

    // default URL for gravatar
    var G_URL = 'http://www.gravatar.com/avatar/';

    // default size
    var DEFAULT_ICON_SIZE = 96;

    // default rating
    var DEFAULT_RATING = 'G';

    // default location for users who has no Gravatar avatar
    var DEFAULT_ICON_PATH = undefined;


    // method converts the specified object to Gravatar compatible URL
    // with querystring params
    function getURL ( ob ) {
        // extract the email and then remove the key from
        // the object itself
        var email = ob.email;
        delete ob.email;

        var params = [];
        for ( var k in ob ) {
            // exclude undefined/null properties but not empty => '' or '0'
            if( typeof ob[k] !== 'undefined' && ob[k] !== null )
                params[ params.length ] = k + '=' + encodeURIComponent( ob[k] );
        }

        return G_URL + email + '?' + params.join('&');
    }

    return {
        // method to generate the gravatar image URL
        // @param {String} email - required
        // @param {String} rating - optional
        // @param {Number} size - optional
        // @param {String} defaultForMissing - optional image for non-existent email account in gravatar.com
        get: function ( email, rating, size, defaultForMissing ) {
            var qs = {};

            if( !email )
                throw Error('[Error] Invalid email, email is :' + email );

            // remove all whitespace and lowercase all letters in the email before md5 hashing
            email = email.toLowerCase().trim();

            if( !md5[ email ] ) {
                // md5 hash
                qs.email = crypto.createHash( 'md5' ).update( email ).digest( 'hex' );

                // store it in the hash to avoid rehashing everytime
                md5[ email ] = qs.email;
            }
            else
                qs.email = md5[ email ];

            // if specified rating does not match with any of these
            // then it defaults to G
            qs.r = rating && RATINGS.indexOf( rating ) >= 0 ? rating : DEFAULT_RATING;

            // size can be 1 to 512, anything other than defaults to 96
            qs.s = size && size >= 1 && size <= 512 ? size : DEFAULT_ICON_SIZE;

            // if default image URL specified then use that
            qs.d = defaultForMissing || DEFAULT_ICON_PATH;


            return getURL( qs );
        },

        // method to set the default values of the optional items once
        // so that there is no need to pass optional values everytime
        // for customization.
        //
        // Remember that arguments passed during "get()" method call will always
        // get preference over default values.
        //
        // @param {String} rating
        // @param {Number} size
        // @param {String} defaultForMissing
        setDefaultOptions: function ( rating, size, defaultForMissing ) {
            if( rating )
                DEFAULT_RATING = rating;

            if( size )
                DEFAULT_ICON_SIZE = size;

            if( defaultForMissing )
                DEFAULT_ICON_PATH = defaultForMissing;
        }
    };

}();

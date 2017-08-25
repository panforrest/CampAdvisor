"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var superagent = _interopRequire(require("superagent"));

module.exports = {

    get: function (endpoint, params, callback) {
        superagent.get(endpoint).query(null).set("Accept", "application/json") //.set('accepte', 'app/json')
        .end(function (err, response) {
            //.result((err, result)=>{
            if (err) {
                // var err = err.message || err
                callback(err, null); //alert(err)
                return;
            }

            callback(null, response.body);
        });
    },

    // get: (endpoint, params, callback) => {
    //     superagent
    //     .get(endpoint)
    //     .query(null)
    //     .set('Accept', 'application/json')   //.set('accepte', 'app/json')
    //        .end((err, response)=>{   //.result((err, result)=>{
    //            if (err) {
    //             // var err = err.message || err
    //             callback(err, null)//alert(err)
    //                return
    //            }

    //            callback(null, response.body)//console.log(JSON.stringify(response.body))
    //        })          
    // },

    post: function (endpoint, params, callback) {
        superagent.post(endpoint) //.get(endpoint)
        .send(params) //.query(params)
        .set("Accept", "application/json").end(function (err, response) {
            if (err) {
                callback(err, null);
                return;
            }
            console.log("APIManager: " + JSON.stringify(response.body));
            var confirmation = response.body.confirmation;
            if (confirmation != "success") {
                callback({ message: response.body.message }, null);
                return;
            }

            callback(null, response.body);
        });
    },

    upload: function (endpoint, file, params, callback) {
        console.log("APIManager - upload: ");
        var uploadRequest = superagent.post(endpoint);

        uploadRequest.attach("file", file);
        Object.keys(params).forEach(function (key) {
            uploadRequest.field(key, params[key]);
        });

        uploadRequest.end(function (err, resp) {
            if (err) {
                callback(err, null);
                return;
            }

            callback(null, resp);
        });
    }
};
//console.log(JSON.stringify(response.body))
//callback(null, response.result)
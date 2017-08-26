"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// import Time from 'react-time'
// import React from 'react'

// export default {

//     formattedDate: (timestamp) => {
//         var now = new Date()
//         var timestamp = new Date(timestamp)
//         var diff = now-timestamp

//         var date = null
//         if (diff > 24*60*1000)
//             return <Time value={timestamp} format="MMM DD, YYYY" />

//         return <Time value={timestamp} titleFormat="YYYY/MM/DD HH:mm" relative />
//     }

// }


var Time = _interopRequire(require("react-time"));

var React = _interopRequire(require("react"));

module.exports = {

    formattedDate: function (timestamp) {
        // var now = new Date()
        var timestamp = new Date(timestamp);
        return React.createElement(Time, { value: timestamp, titleFormat: "YYYY/MM/DD HH:mm", relative: true });
    }

};
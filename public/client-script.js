

$(document).ready( function () {
  console.log('jquery handshake');
}; // end doc ready

$.ajax( function () {
    url: '/booth',
    type: 'json',
    success: function (data) {
      console.log('ajax success get /booth' data);
    }; // end success

}) // end ajax

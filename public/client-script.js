console.log('sourced');

// start doc ready
$(document).ready(function(){
  console.log('muggles ready');

  // start on click
  $('.createEmployee').on('click', function(){
    console.log('clicks');
    // create object to send
    var objectToSend={
      first_name: $('#firstNameIn').val(),
      last_name: $('#lastNameIn').val()
    };
    console.log(objectToSend);

     // start ajax call
     $.ajax({
       type: 'POST',
       url: '/employee',
       data: objectToSend,
       // start success
       success: function(data){
          console.log('server hit', data);
          $('#firstNameIn').val('');
          $('#lastNameIn').val('');
          displayEmployees(data);
       } // end success

     }); // end ajax call
  });   // end on click
  
}); // end doc ready

  var displayEmployees = function(){
    console.log( 'in displayEmployees' );
    $.ajax({
      type: 'GET',
      url: '/employee',
      success: function (data) {
        console.log( "in get displayEmployees", data );
        $('#employeesOutput').empty();
        for (var i = 0; i < data.length; i++) {
          var statusButton = '<button id="statusButton">' + data[i].status + '</button>';
          $('#employeesOutput').append('<li>' + data[i].last_name + ', ' + data[i].first_name + ' ' + statusButton + '</li>');
        }
        displayBooths();
      } // end success
    }); // end ajax call

  }; // end displayEmployees
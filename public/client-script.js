console.log('sourced');

var tableChangeHandler = function() {

  console.log( $( this ).data('table-id') );
  
  $.ajax({
    url: '/booth',
    type: 'PUT',
    dataType: 'json',
    data: { id: $( this ).data('table-id'), serverId: $( this ).val() },
  });
  

};

var getserverSelection = function() {


  
  return select;

};

var displayBooths = function() {

  console.log( "Display Booths" );

  $.ajax({
    url: '/employee',
    type: 'GET',
    dataType: 'json',
    success: function( data ) {

      console.log( "Got Employees" );

      var select = function ( currentServer, tableId ) {

      var thing = $("<select />", {class:'server-selection'});

            thing.on( 'change', tableChangeHandler );
            
            for( var i = 0; i < data.length; i++ ) {
              var option = $("<option />").val( data[i].first_name + " " + data[i].last_name ).html( data[i].first_name + " " + data[i].last_name );

              if( data[i].id === currentServer ) option.attr("selected", "true");

                  option.data( 'server-id', data[i].id );

                  option.val( data[i].id );
                  
              thing.append( option );
            }

            thing.data( 'table-id', tableId );

        return thing;


      };

      console.log( "Select", select );

      console.log( "Employees select loop done" );

    // Get all the booths
      $.ajax({
        url: '/booth',
        type: 'GET',
        dataType: 'json',
        success: function( data ) {
          // When I get them and they are sexy
          console.log( "Sexy momma.", data );

          // Empty the output
          $('#tablesOutput').empty();

          // Create a new container
          var container = $("<div />", {class:'tables'});

          // For every booth
          for( var i = 0; i < data.length; i++ ) {

            // Create a div
            var div = $('<div />');

            // Create a name element
            var name = $('<span>Table Name: ' + data[i].name + ' - </span>');

            // Create a capacity element
            var capacity = $('<span>Capacity: ' + data[i].capacity + ' - </span>');

            // Append that crap
            div.append( name ).append( capacity ).append( select( data[i].server_id, data[i].id ) );

            container.append( div );

          }

          console.log( "Container:", container );

          $("#tablesOutput").append( container );
        }
      });




    }





  });

  
  

};

// start doc ready
$(document).ready(function(){
  displayBooths()
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

  //start booth on click
  $('.createTable').on('click', function(){
    console.log( "in createTable" );
    $.ajax({
      url: '/booth',
      type: 'POST',
      dataType: 'json',
      data: {
          name: $('#nameIn').val(),
          capacity: $('#capacityIn').val()
      },
      success: function() {

        console.log( "I hate matt." );

        $('#nameIn').val('');

        displayBooths();

      }
    });
    
    console.log( "create" );
  }); //end on click

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
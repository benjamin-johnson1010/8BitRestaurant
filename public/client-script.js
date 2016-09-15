console.log('sourced');

// start doc ready
$(document).ready(function(){
  console.log('muggles ready');

  // start on click
  $('.createEmployee').on('click', function(){
    console.log('clicks');
    var newEmployee={
      first_name: $('#firstNameIn').val(),
      last_name: $('#lastNameIn').val()
    };
    console.log(newEmployee);

     // start ajax call
     $.ajax({
       type: 'POST',
       url: '/employee',
       data: newEmployee,
       success: function(data){
          console.log('server hit');
       }

     }); // end ajax call
  }); // end on click
}); // end doc ready

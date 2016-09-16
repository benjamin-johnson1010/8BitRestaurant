console.log('sourced');


$(document).ready(function(){
console.log('muggles ready');

$('.createEmployee').on('click', function(){
  console.log('clicks');
var newEmployee={
  first_name: $('#firstNameIn').val(),
  last_name: $('#lastNameIn').val()
};
console.log(newEmployee);
 $.ajax({
   type: 'POST',
   url: '/employee',
   data: newEmployee,
   success: function(data){
      console.log('server hit');
   } // end success

 }); // end ajax
}); // end on click

$('#createTable').on('click', function(){
  console.log('in create table');

var tableName = $('#nameIn').val();
var capacity = $('#capacityIn').val();

var tableObject = {
  name: tableName,
  capacity: capacity
};

$.ajax( function () {
    url: '/booth',
    type: 'POST',
    data: tableObject,
    success: function (data) {
      console.log('ajax success get /booth' data);
    }; // end success
}) // end ajax



}); // end doc ready

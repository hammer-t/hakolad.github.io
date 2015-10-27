$('document').ready(function() {

$.ajax({
  method: "POST",
  url: "http://www.atelier-hammer.fr/test.php",
  data: { name: "John", location: "Boston" }
})
  .done(function( msg ) {
    alert( "Data Saved: " + msg );
  });

});
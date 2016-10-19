// If user clicks wikipedia picture, points them to a random article
$("#random-article").on("click", function(){
	window.open("https://en.wikipedia.org/wiki/Special:Random");
});

// Hover text for picture
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

//If user clicks the search button
$("#button-search").on("click", function(){
  console.log("pie");
  printResults();

});

//If user presses the enter key
$("#search").keydown(function(event){
    if(event.keyCode == 13){
      event.preventDefault();
      printResults();  
    }
});

// Algorithm to output query to user
function printResults(){

  //Refresh results
  $(".container-fluid").css("height", "auto");
  $('.vertical-center').css("transform", "translateY(5%)");
  $('.vertical-center').css("height", "0%");
  $('#results').empty();
  $('#body').css("overflow-y", "visible");

  // Get search from user and construct a url
	var searchResult = document.getElementById('search').value;
  var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchResult + "&srinfo=&srprop=snippet&format=json&callback=?";
  var output = ' ';

    //API Call
	  $.getJSON(url, function(json) {
      
      var getResults = document.getElementById('results');
   
      var list = $('ul.results');
      $.each(json.query.search, function(i) {

        var li = $('<li/>').appendTo(list);
        setTimeout(function(){ 
          li.addClass('show'); 
        }, 10);


        var outputLink = $('<a/>').attr('href', "https://en.wikipedia.org/wiki/" + json.query.search[i].title);
        outputLink.attr('target', "_blank");

        outputLink.appendTo(li);

        var outputTitles = $('<h3/>').text(json.query.search[i].title);
        outputTitles.appendTo(outputLink);
        
        var outputInfo = $('<p/>').text(strip(json.query.search[i].snippet));
        outputInfo.appendTo(outputLink);

      });//End .each() function

      //Turn HTML into plain text (remove HTML tags)
      function strip(html)
      {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText;
      }

    });// End getJSON() function

    }
    






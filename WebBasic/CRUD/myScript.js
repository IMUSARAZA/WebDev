console.log("Hello World");

loadStories();

function loadStories() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    error: function(response) {
      console.error("An error has occurred:", response); 
    },
    success: storiesResponseArrived,
  }); 
}

function storiesResponseArrived(data) {
  
  data.forEach(function(stories) {
 
    console.log("iD:", stories.id);
    console.log("title:", stories.title);
    console.log("body:", stories.body);
  });
}




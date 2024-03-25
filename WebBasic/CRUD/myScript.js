// Load posts
loadPosts();

function loadPosts() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    error: function(response) {
      console.error("An error has occurred:", response); 
    },
    success: postsResponseArrived,
  }); 
}

function postsResponseArrived(data) {
  data.forEach(function(post) {
    console.log("ID:", post.id);
    console.log("Title:", post.title);
    console.log("Body:", post.body);
  });
}

// Delete
function deletePost(postId) {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts/" + postId,
    method: "DELETE",
    error: function(response) {
      console.error("An error has occurred while deleting post:", response); 
    },
    success: function() {
      console.log("Post with ID", postId, "has been deleted successfully.");
    }
  });
}

// Replace
function replacePost(postId, newPostData) {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts/" + postId,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(newPostData),
    error: function(response) {
      console.error("An error has occurred while replacing post:", response); 
    },
    success: function() {
      console.log("Post with ID", postId, "has been replaced successfully.");
    }
  });
}
a

// ---------- PORT OVER DARK MODE AND USERNAME -----------
// Welcome Message can appear either on the hamburger bar or on the regular bar
const body = document.querySelector("body");
const welcomeMessage = document.getElementById("welcomeMessage");

document.addEventListener("DOMContentLoaded", function () {
  const darkMode = localStorage.getItem("darkMode");

  if (darkMode === "enabled") {
    makeDark();
  }
  const username = localStorage.getItem("username");
  greetUser(username);
});

function greetUser(username) {
  welcomeMessage.textContent = `👋 hello ${username}!`;
}

//now let's add the stuff we want to change in dark mode
// then new commetns background shold be white
//the welcome message letters should be white
//the nav bar should be dark background and its text white
const welcomeMessageDark = document.getElementById("welcomeMessage");
const navMenuDark = document.querySelector(".nav-menu");
function makeDark() {
  body.style.background = "black";
  body.style.color = "white";
  welcomeMessageDark.style.color = "white";
  navMenuDark.style.background = "black";
  navLink.forEach(function (link) {
    link.style.color = "white";
  });
}

// ---------- NEW POST -----------

const postedContentLog = document.getElementById("postedContentLog");
console.log(postedContentLog);

const postButton = document.getElementById("postButton");
const postText = document.getElementById("postText");

postButton.addEventListener("click", function () {
  makePost();
});

function makePost() {
  //create new post paragraph and add styling
  const newPost = document.createElement("div");
  newPost.textContent = postText.value;
  newPost.classList.add("jsFlex");

  const postDate = getCurrentDate(); // Get the current date
  newPost.dataset.date = postDate; 

  postedContentLog.appendChild(newPost);
  newPost.classList.add("lightModeBorder");

  // Append the post date to the new post element
  const postDateElement = document.createElement("span");
  postDateElement.textContent = postDate;
  newPost.appendChild(postDateElement);
  //and then add button under new post
  makeLikeButton(newPost);
  makeComment(newPost);
}
function getCurrentDate() {
  const currentDate = new Date();
  return currentDate.toLocaleString(); // Format the date as a string
}

/*I learned that when using callbacks- let's say makeLikeButton- it's actioned on the event listener above.
Below we define what makeLikeButton does, and in order for it to access the newPost variable, we have to first call the function under makePost- so now newPost is within the parent scope of makePost to be able to access that newPost variable. And then underneath when we define that function we ensure to add newPost as the parameter so it knows which newPost we are referring to*/

function makeLikeButton(newPost) {
  const likeButton = document.createElement("button");
  likeButton.textContent = "Like ❤️ 👍";
  likeButton.classList.add("jsButton");

  //add count
  newPost.appendChild(likeButton);
  countLikes(likeButton);
}

//----- Making new commment-------
function makeComment(newPost) {
  //we define these variables within because they should only appear when new post is made
  //Creating the box where comment can be typed
  //this selects all the new comments
  const comments = newPost.querySelectorAll(".jsNewComment");

  if (comments.length >= 4) {
    postedContentLog.classList.add("postedContentLog");
    // Limit the number of comments to 4; comments is a NodeList of elements with the class .jsNewComment within the newPost container. We will only add postedConentLog
  }

  const newCommentBox = document.createElement("div");
  const newCommentBoxInput = document.createElement("input");
  newCommentBoxInput.setAttribute("type", "text");
  newCommentBox.appendChild(newCommentBoxInput); // Appending the input field to the comment box
  newCommentBox.classList.add("jsFlex");

  //Creating the comment button
  const commentButton = document.createElement("button");
  commentButton.textContent = "Comment";
  commentButton.classList.add("jsButton");

  //Adding event listener to what commentButton should do once clicked
  commentButton.addEventListener("click", function () {
    addCommentText(newCommentBox, newCommentBoxInput);
  });

  //appendingStuff- adding box to type new comment and comment button under new post

  newPost.appendChild(newCommentBox);
  newCommentBox.appendChild(commentButton);
}

//--------- -------
function addCommentText(newCommentBox, newCommentBoxInput) {
  const commentText = newCommentBoxInput.value;
  console.log(commentText);

  //creating element for commentParagraph
  const newComment = document.createElement("div");
  newComment.textContent = commentText;
  newComment.classList.add("lightModeBorder", "jsNewComment");
  newCommentBox.appendChild(newComment);

  newCommentBoxInput.value = ""; //resetting input box so users can type new comment
  deleteCommentText(newComment, newCommentBox);
}

//--------- -------
//Delete comment - we create the deletteButton and then we format the Delete Button. When clicked on, the button makes the new comment that populate blank and we remove the class to avoid havin the formatting still remain there
function deleteCommentText(newComment, newCommentBox) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  newComment.appendChild(deleteButton);
  deleteButton.classList.add("jsDeleteButton");
  deleteButton.addEventListener("click", function () {
    newComment.innerHTML = "";
    newComment.classList.remove("lightModeBorder", "jsNewComment");
  });
}

// ---------- POST INTERACTIVE STUFF-----------
/*Let's count how many likes. We intialize with a variable of 0 and then we have the count update by adding 1 each time it's clicked. The inner text of the button is updated to reflect that count of likes. WE initialize outside the function, otherwise if declared inside, each time its clicked we would start with value of 0 and add 1, therefore it would always return 1. */

let numberLikes = 0;
function countLikes(likeButton) {
  likeButton.addEventListener("click", function () {
    numberLikes = numberLikes + 1;
    likeButton.textContent = `Like ❤️ 👍 ${numberLikes}`;
  });
}

/*To find post */
// We create the search button, and then we add event listener the to search button. Only when the search button is clicked, do we then define what the search term is. We ensure the search term show loewr case

// function findPost() {
//   const searchButton = document.getElementById("searchButton");
//   console.log(searchButton);
//   searchButton.addEventListener("click", function () {
//     const searchTerm = document
//       .getElementById("searchTerm")
//       .value.toLowerCase();
//     console.log(newPostArray);
//     console.log("hello", searchTerm);
//   });
// }

function findPost() {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", searchNow);
}

function searchNow() {
  const searchTerm = document.getElementById("searchTerm").value.toLowerCase();
  const posts = [...postedContentLog.children];

  const filteredPosts = posts.filter(function (post) {
    return post.textContent.toLowerCase().includes(searchTerm);
  });

  postedContentLog.innerHTML = ""; // ensuring that postedContent is cleared first so that results can append 

  filteredPosts.forEach((post) => postedContentLog.appendChild(post));
}

findPost();

//TO SORT BY DATE
const sortByDateDropdown = document.getElementById("sortByDate");
sortByDateDropdown.addEventListener("change", function () {
  const selectedOption = sortByDateDropdown.value;
  // Call a function to sort posts based on the selected option
  sortPosts(selectedOption);
});

// depending on the selectedOption: assign different sorting functions to the sortingFunction variable.
console.dir(postedContentLog);
function sortPosts(selectedOption) {
  let sortingFunction; // creating a local variable, representing how do we want to compare two posts
  if (selectedOption === "oldest") {
    sortingFunction = (a, b) =>
      new Date(a.dataset.date) - new Date(b.dataset.date);
  } else if (selectedOption === "newest") {
    sortingFunction = (a, b) =>
      new Date(b.dataset.date) - new Date(a.dataset.date);
  } else {
    console.error(`Unexpected selectedOption ${selectedOption}`);
    return;
  }

  const posts = [...postedContentLog.children];
  posts
    .sort(sortingFunction)
    .forEach((post) => postedContentLog.appendChild(post));
}

// ---------- HAMBURGER -----------

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// To ensure that the hamburger menu closes when we click a link
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

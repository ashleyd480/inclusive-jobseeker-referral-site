# Inclusive Jobseeker Social Site

---

# INTRO - no caps ////

This project was created in my 4th week of coding bootcamp at General Assembly using JavavScript, HTML, and CSS.

## Purpose:

I've created the basic framework for a hypothetical site called Refer-all.
This social site allows users to share job referal opportunities to other users who are seeking jobs.
Users can

- Use the like button and comment button to directly engage with referrals
- Search for referral opportunities based on keyword to get ones that match your preference.
- Sort referral opportunities based on date postest to get the freshest ones.



---

# SECTIONS

Below is a breakdown of my page sections.

## Login Page

This page prompts users for a username and password. Navigation to the homepage is only permitted with valid credentials. Although actual authentication is not required, the interface simulates this process.

The page includes a header with the website's name and a theme toggle switch (light/dark mode), with the theme choice persisting post-login.

A warning message appears if the login form is submitted with empty fields.
Placeholder buttons for Facebook and Google login are included but for now don't function

## Home Page

This page houses the main page where referrals can be posted and interacted with by liking and commenting on posts. Each post displayPosts like counts and provide a comment section with a maximum display of four comments; additional comments can be viewed by scrolling.

Newer posts are prioritized to show at the top. It includes sorting functionality (date ascending/descending). There is also a search feature for filtering posts by text content.

The page is mobile responsive, built with mobile first in mind. On desktop, I utilize Fetch API to retrieve a random photo from an open API source, and that is built into an aside on the right side of the page.

## Navigation bar

On mobile devices (less than or equal to 768px):

- The navigation bar displays the the website name and a personalized greeting ("Hi, {username}") in the header.
- A hamburger menu replaces the header content when activated, displaying links and a user profile picture.

## About Page

This features a brief description of the mission of Refer-All's website and includes a giphy.

---

# FUNCTIONALITY

This is how I got things to work.

## Log In Page

Upon page load, an event listener appended to the sign in button runs a checkInfo function when clicked. If it returns true (in other words, only when username and password are not blank), then the sign in button will redirect to the Home Page.

The checkInfo function also will checks for missing username and/or password. The missing field will have an error message appended below along with a red border. This is done respectively with .textContent and .classList.add. To ensure no incorrect border is added, we nest if/else statements that allow us to remove the red border if the section is filled in.

## Dark Mode

The dark mode toggle once toggled on will change the background and text color of the page to accommodate dark mode. It is then saved to local storage. This "allows JavaScript sites and apps to save key-value pairs in a web browser with no expiration date." It is then ported over to the Home Page This way, whatever the user chooses- say you chose dark mode and your login page is dark, then your next page on signing in will be dark.

On the home page, upon load, it checks if dark mode was enabled in local storage and makes the page dark mode as well. Some additional styling was added to ensure that other aspects of the page correctly conform to dark mode.

## Welcome Message (Home)

The username is saved to local storage through localStorage.setItem as well. String interpolation is then used to display the welcome message. This allows for a more customized feel.

## New Posts

The homepage includes an freeform box to write a post. Only when the Post button is clicked then is the post added to postedContentLog div (which the bottom section under the search and sort-by dropdown.)
To reset the input box for a new post so that previously typed content doesn't show, we do newCommentBoxInput.value = "".

The date is displayed with new Date() function and this is appended to posts.

Callback functions are then used to for making the list button and making a comment. We chain it that way because they would only exist if a post was made.

## Like and Like Counter

The like button is then created and appended under each post. An event listener is added so that the like count increases. The function initalized with a variable outside with value of 0. Then with each click, the count increases by 1. This amount is then appended to the like button's inner text with string interpolation.

## Comment

A comment box appears under each post as a div and within an input box exists for the user to type a comment. We do it this way in order to append other items under the comment box. Input can't have child elements, so we had to start with a div.

To avoid old comments from staying in the input box, we clear it out each time with This is done by "newCommentBoxInput.value = "", thus allowing us to reset.

Next a comment button is created and appended below. Each time, this comment button is clicked, the user's input is then logged below in another created div. Each div then has a delete button created and added. Once the delete button is clicked, the user's comment is deleted.

## Search

To allow the posts to be searched, a local variable array was initialized. This way, each time a post is made, its information of content (what the user types), date, and comments are all added into an object. Each post has this object of key value pairs. These are then pushed into an array.
[Post 1 Object, Post 2 Object, etc]

When the search button is clicked, the function checks what the user is searching for. It filters the array of new posts by checking if they include the search term.

Then, to display these results... another function clears out the postedContentLog to make room to display the results and then appends the matching posts below in a div we create called searchedPost. The text content will be whatever each matching post has- represented via searchedPost.textContent = post.content. Similarly that is how the comments are added.

## Sort By

We use the sorting function to sort the array of posts based on what the user selects in the dropdown- oldest firs tor newest first. It uses the same concept of the array of posts containing the information. Keep in mind, we created the date variable in a post and this then is used to determine sort order.

This sorted content is then displayed below.

## Fetch API

We use math random to pick a random picture from our picture API. This random number is the index of the array of pictures we choose from. We get the download URL from the object pair and this URL is then appended to the image element we have created to show in HTML.

---

# STYLING

## Accesibility

The page was designed to be more accessible in terms of being easier on the eyes by not having the items be too small. The height & font size of input fields along with sign in for username and password were increased. The font-size is adjusted by the mediumFont and largeFont class.

Flexbox is used to position elements on page. Margins, padding, gaps were used to better space apart elements to avoid crowding of content. Thick borders are used to better seperate the aside and the central content.

Additonally, placeholders are added to the input boxes to make it easier to understand what is needed in each field.

## Scroll bar

Each post should only display 4 comments. Then, a scroll bar should appear. This is done by counting how many comments in the node and if greater than 4, then display the scroll bar. We found that keeping the container to 500px and the overflow:scroll, it allowed it to fit the 4.

## Misc

To avoid the buttons being too overly large, custom sizing was applied using width definitions in CSS. Formatting is also applied via classList.add to our DOM elements in javscript- including borders and indents, allowing each comment to be in its own box.

## Credits

Credit to https://codepen.io/davidelrizzo/pen/vEYvyv for the login button formatting CSS. It utilized the before psuedo element so that the logo appears a the front.
I simplified the code by removing the styling for hover and focus actions. I also made the width of the buttons to be 90% to match the GA wireframe.

Credit to https://dev.to/devggaurav/let-s-build-a-responsive-navbar-and-hamburger-menu-using-html-css-and-javascript-4gci for the hamburger tutorial.

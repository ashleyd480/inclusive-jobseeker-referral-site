// ====== SIGN IN VALIDATION
let uname = document.getElementById("uname");
let psw = document.getElementById("psw");
const signInButton = document.getElementById("signInButton");

const errorMessage = document.getElementById("errorMessage");

console.log(errorMessage);

/*Prevent default behavior when the sign-in button is clicked, otherwise a anchor tag URL overrides and lets sign In button always be clicked*/
/* checkInfo() is called, and its return value is used as the condition for the if */

document.addEventListener("DOMContentLoaded", function () {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    makeDark();
    darkModeBtn.checked = true;
  }
  signInButton.addEventListener("click", function (event) {
    if (checkInfo()) window.location.href = "blog.html";
  });
});

/* Added variables to define input for username and password to keep it DRY later in funcitons, and thus more easily understandable to  */
/*Learned to define within function so that it executes once user has had chance to input username and password input*/
/*We seperate the lines so it's easier to read - first doing the red Error Border, then error message  then verifying if both username and password are filled in */
function checkInfo() {
  let username = uname.value.trim();
  localStorage.setItem("username", username);
  let password = psw.value.trim();
  if (username !== "") {
    uname.classList.remove("redErrorBorder");
  } else {
    uname.classList.add("redErrorBorder");
  }
  if (password !== "") {
    psw.classList.remove("redErrorBorder");
  } else {
    psw.classList.add("redErrorBorder");
  }
  if (username === "" && password === "") {
    errorMessage.textContent = "Please enter username and password.";
  } else if (username === "") {
    errorMessage.textContent = "Please enter username";
  } else if (password === "") {
    errorMessage.textContent = "Please enter password";
  }
  return !(username === "" || password === ""); //we want to check if username or password are not blank (this is done with the ! symbol. This return of true or false is then hoisted into the signInButton event listener which will only redirect to blog.html if that return statement returns true. It will only return true if both username and password are not empty. If only one is filled out --> it would evaluate to true or false---> true and then ! negates to false
}
//==========DARK MODE=====================

const darkModeBtn = document.querySelector(
  "#darkModeBtn input[type='checkbox']"
);

const body = document.querySelector("body");

const websiteHeader = document.querySelector(".websiteHeader");

const logIn = document.querySelector(".logIn");
console.log(logIn);

darkModeBtn.addEventListener(
  "change",

  function (event) {
    if (darkModeBtn.checked) {
      makeDark();
    } else {
      makeLight();
    }
  }
);

function makeDark() {
  websiteHeader.classList.toggle("darkModeBorder");
  logIn.classList.add("darkModeBorder");
  body.style.background = "black";
  body.style.color = "white";
  localStorage.setItem("darkMode", "enabled");
}

function makeLight() {
  websiteHeader.classList.remove("darkModeBorder");
  logIn.classList.remove("darkModeBorder");
  body.style.background = ""; // Revert to default background color
  body.style.color = ""; // Revert to default text color
  localStorage.setItem("darkMode", "disabled");
}

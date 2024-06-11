// Variables
const logInForm = document.querySelector('#login-credentials');
const darkModeSwitch = document.getElementById('darkModeSwitch');
const body = document.querySelector("body");
const password = document.getElementById("password");

// Prevent site from showing password
password.type = "password";

// Redirect to home page after login and authenticate
logInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    window.location.href = "../home-page/homepage.html";
    console.log("Redirecting to homepage...");
});

// Social media button alerts
const socialMediaButtons = {
    google: "Google Log-in Button clicked",
    facebook: "Facebook Log-in Button clicked"
};

Object.keys(socialMediaButtons).forEach(id => {
    document.getElementById(id).onclick = () => alert(socialMediaButtons[id]);
});

// Dark mode toggle
darkModeSwitch.addEventListener('change', function() {
    const isDarkMode = this.checked;
    localStorage.setItem('dark', isDarkMode);
    body.classList.toggle('dark', isDarkMode);
    console.log("Toggle on/off");
});

// Set the initial state of the dark mode switch based on localStorage
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('dark') === 'true';
    darkModeSwitch.checked = isDarkMode;
    body.classList.toggle('dark', isDarkMode);
});

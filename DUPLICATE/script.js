// script.js

// Modal handling
const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');
const openSignup = document.getElementById('openSignup');
const closeSignup = document.getElementById('closeSignup');
const closeLogin = document.getElementById('closeLogin');
const logoutBtn = document.getElementById('logoutBtn');

openSignup.onclick = function() {
  signupModal.style.display = 'block';
};

closeSignup.onclick = function() {
  signupModal.style.display = 'none';
};

closeLogin.onclick = function() {
  loginModal.style.display = 'none';
};

// Dummy signup functionality
document.getElementById('signupSubmit').onclick = function() {
  alert('Signup Successful! Now please login.');
  signupModal.style.display = 'none';
};

// Dummy login functionality
document.getElementById('loginSubmit').onclick = function() {
  alert('Login Successful!');
  loginModal.style.display = 'none';
  openSignup.style.display = 'none';
  logoutBtn.style.display = 'block';
};

// Logout functionality
logoutBtn.onclick = function() {
  alert('Logged Out!');
  openSignup.style.display = 'block';
  logoutBtn.style.display = 'none';
};

// Close modals on window click
window.onclick = function(event) {
  if (event.target === signupModal) {
    signupModal.style.display = 'none';
  }
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
};

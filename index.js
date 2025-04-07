// Open/Close Modal
function openModal(type) {
    document.getElementById(type + 'Modal').style.display = 'block';
  }
  
  function closeModal(type) {
    document.getElementById(type + 'Modal').style.display = 'none';
  }
  
  // Sign Up Logic
  function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
  
    if (!name || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('foodiezUsers')) || [];
  
    // Check if email already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      alert('Email already registered. Please log in.');
      return;
    }
  
    users.push({ name, email, password });
    localStorage.setItem('foodiezUsers', JSON.stringify(users));
    alert(`Thanks for signing up, ${name}!`);
    closeModal('signup');
  }
  
  // Login Logic
  function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem('foodiezUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      alert(`Welcome back, ${user.name}!`);
      closeModal('login');
      document.querySelector('.auth-buttons').innerHTML = `
        <span>Logged in as <strong>${user.name}</strong></span>
        <button onclick="logout()">Logout</button>
      `;
    } else {
      alert('Incorrect email or password.');
    }
  }
  
  // Logout Logic
  function logout() {
    alert('You have been logged out.');
    location.reload();
  }
  
  
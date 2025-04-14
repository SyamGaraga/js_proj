// ===== Modal Handling =====
function openModal(type) {
  document.getElementById(type + 'Modal').style.display = 'block';
}

function closeModal(type) {
  document.getElementById(type + 'Modal').style.display = 'none';
}

// ===== Signup Logic =====
function signup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  if (!name || !email || !password) {
    alert('Please fill out all fields.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('foodiezUsers')) || [];

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

// ===== Login Logic =====
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
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    closeModal('login');
    updateAuthUI(user);
  } else {
    alert('Incorrect email or password.');
  }
}

// ===== Logout Logic =====
function logout() {
  localStorage.removeItem('loggedInUser');
  alert('You have been logged out.');
  location.reload();
}

// ===== Auth UI Update =====
function updateAuthUI(user) {
  document.querySelector('.auth-buttons').innerHTML = `
    <span>Logged in as <strong>${user.name}</strong></span>
    <button onclick="logout()">Logout</button>
  `;
}

// ===== Cart =====
function saveRecipe(recipeName) {
  let cart = JSON.parse(localStorage.getItem('foodiezCart')) || [];

  if (cart.includes(recipeName)) {
    alert(`${recipeName} is already in your cart.`);
    return;
  }

  cart.push(recipeName);
  localStorage.setItem('foodiezCart', JSON.stringify(cart));
  updateCartUI();
  updateCartCount();
  alert(`${recipeName} added to your cart!`);
}

function removeRecipe(index) {
  let cart = JSON.parse(localStorage.getItem('foodiezCart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('foodiezCart', JSON.stringify(cart));
  updateCartUI();
  updateCartCount();
}

function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem('foodiezCart')) || [];
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }

  cart.forEach((recipe, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${recipe}
      <button onclick="removeRecipe(${index})" style="margin-left:10px;">Remove</button>
    `;
    cartList.appendChild(li);
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('foodiezCart')) || [];
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.textContent = `(${cart.length})`;
  }
}

function orderRecipe(recipeName) {
  alert(`Order placed for: ${recipeName}`);
  // Optional: Redirect or modal
}

// ===== Initialize on Page Load =====
window.onload = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (user) updateAuthUI(user);

  updateCartUI();
  updateCartCount();
};


function navigateToRecipe(recipeName) {
  window.location.href = `recipe-details.html?recipe=${encodeURIComponent(recipeName)}`;
}


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
  
  
  function saveRecipe(button) {
    const card = button.closest('.card'); // or .recipe-card, depending on your class
    const recipeName = card.querySelector('p').textContent; // assuming the recipe name is in a <p> tag
  
    let cart = JSON.parse(localStorage.getItem('foodiezCart')) || [];
  
    if (cart.includes(recipeName)) {
      alert(`${recipeName} is already saved in your cart.`);
      return;
    }
  
    cart.push(recipeName);
    localStorage.setItem('foodiezCart', JSON.stringify(cart));
    renderCart();
    alert(`${recipeName} has been saved to your cart!`);
  }
  

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem('foodiezCart')) || [];
    const cartItems = document.getElementById('cartItems');
  
    cartItems.innerHTML = '';
    if (cart.length === 0) {
      cartItems.innerHTML = '<li>Your cart is empty.</li>';
      return;
    }
  
    cart.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item}
        <button onclick="removeFromCart('${item}')">Remove</button>
      `;
      cartItems.appendChild(li);
    });
  }
  
  function removeFromCart(recipeName) {
    let cart = JSON.parse(localStorage.getItem('foodiezCart')) || [];
    cart = cart.filter(item => item !== recipeName);
    localStorage.setItem('foodiezCart', JSON.stringify(cart));
    renderCart();
  }

  // Array to store cart items
let recipeCart = [];

// Save recipe and update cart
function saveRecipe(recipeName) {
  // Avoid adding duplicates
  if (recipeCart.includes(recipeName)) {
    alert(`${recipeName} is already in your cart.`);
    return;
  }

  recipeCart.push(recipeName);
  updateCartUI();
  alert(`${recipeName} added to your cart!`);
}

// Remove recipe from cart
function removeRecipe(index) {
  recipeCart.splice(index, 1);
  updateCartUI();
}

// Update Cart UI
function updateCartUI() {
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = ''; // Clear current list

  recipeCart.forEach((recipe, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${recipe}
      <button onclick="removeRecipe(${index})" style="margin-left:10px;">Remove</button>
    `;
    cartList.appendChild(li);
  });
}

function orderRecipe(recipeName) {
  alert(`Order placed for: ${recipeName}`);
  // You could later redirect to an order page or open a modal
  // window.location.href = '/order.html?item=' + encodeURIComponent(recipeName);
}


  
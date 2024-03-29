document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  chrome.storage.local.get('fortiloginpass', function (data) {
    if (data.fortiloginpass) {
      const { username, password } = data.fortiloginpass;
      usernameInput.value = username;
      passwordInput.value = password;
    }
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    saveData();
  });
  passwordInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveData();
    }
  });

  function saveData() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    chrome.storage.local.set({ 'fortiloginpass': { username, password } }, function () {
      console.log('Data saved successfully');
      window.close();
    });
  }
  togglePassword.addEventListener('click', function () {
    togglePasswordText();
  });

  function togglePasswordText() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePassword.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      togglePassword.textContent = 'Show';
    }
  }
});



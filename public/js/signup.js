document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector('.needs-validation');

  if (!form) return; // prevents errors if form not found

  form.addEventListener('submit', function (event) {

    const passwordEl = document.getElementById("password");
    const confirmPasswordEl = document.getElementById("confirmPassword");

    const password = passwordEl.value;
    const confirmPassword = confirmPasswordEl.value;

    // reset previous state
    confirmPasswordEl.classList.remove("is-invalid");

    if (password !== confirmPassword) {
      event.preventDefault();
      event.stopPropagation();

      confirmPasswordEl.classList.add("is-invalid");
      return;
    }

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');

  });

});
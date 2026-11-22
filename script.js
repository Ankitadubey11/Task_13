
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const strengthText = document.getElementById("strengthText");
const strengthCount = document.getElementById("strengthCount");
const progressBar = document.getElementById("progressBar");

const togglePassword = document.getElementById("togglePassword");
const resetButton = document.getElementById("resetButton");
const matchMessage = document.getElementById("matchMessage");

// Password requirement elements
const requirements = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

// Check password strength
function checkPassword() {

    const value = password.value;

    const checks = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[@#$!%^&*(),.?":{}|<>]/.test(value)
    };

    let score = 0;

    // Update checklist
    for (let key in checks) {

        if (checks[key]) {
            score++;

            requirements[key].classList.add("valid");

            requirements[key].textContent =
                "✓ " + requirements[key].textContent.substring(2);

        } else {
            requirements[key].classList.remove("valid");

            requirements[key].textContent =
                "✗ " + requirements[key].textContent.substring(2);
        }
    }

    // Update strength
    strengthCount.textContent = score + "/5";

    if (value.length === 0) {

        strengthText.textContent = "Enter a password";
        progressBar.style.width = "0%";
        progressBar.style.background = "#ddd";

    } else if (score <= 2) {

        strengthText.textContent = "Weak Password";
        progressBar.style.width = "33%";
        progressBar.style.background = "#e74c3c";

    } else if (score <= 4) {

        strengthText.textContent = "Medium Password";
        progressBar.style.width = "66%";
        progressBar.style.background = "#f39c12";

    } else {

        strengthText.textContent = "Strong Password";
        progressBar.style.width = "100%";
        progressBar.style.background = "#27ae60";
    }

    checkMatch();
}

// Check password matching
function checkMatch() {

    if (confirmPassword.value === "") {
        matchMessage.textContent = "";
    }

    else if (password.value === confirmPassword.value) {
        matchMessage.textContent = "✓ Passwords Match";
        matchMessage.style.color = "#27ae60";
    }

    else {
        matchMessage.textContent = "✗ Passwords Do Not Match";
        matchMessage.style.color = "#e74c3c";
    }
}

// Detect password input
password.addEventListener("input", checkPassword);

// Detect confirm password input
confirmPassword.addEventListener("input", checkMatch);

// Show / Hide password
togglePassword.addEventListener("click", function() {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    }

    else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

// Reset everything
resetButton.addEventListener("click", function() {

    password.value = "";
    confirmPassword.value = "";

    togglePassword.textContent = "Show";
    password.type = "password";

    checkPassword();
    checkMatch();
});

// Regular expressions for contact form
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const zip = document.getElementById('zip');

const usernameError = document.getElementById('username-error')
const emailError = document.getElementById('email-error')
const phoneError = document.getElementById('phone-error')
const zipError = document.getElementById('zip-error')

// Username expression
username.addEventListener('input', function (e) {
    let pattern = /^[\w]{6,20}$/;
    let currentValue = e.target.value;
    let valid = pattern.test(currentValue);

    if (valid) {
        usernameError.style.display = 'none'
    } else {
        usernameError.style.display = 'block'
    }
})

// Email expression
email.addEventListener('input', function (e) {
    let pattern = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{3,8})(\.[a-z]{2,8})?$/
    let currentValue = e.target.value;
    let valid = pattern.test(currentValue);

    if (valid) {
        emailError.style.display = 'none'
    } else {
        emailError.style.display = 'block'
    }
})

// Phone number expression
phone.addEventListener('input', function (e) {
    let pattern = /^\d{3}-\d{3}-\d{4}?$/
    let currentValue = e.target.value;
    let valid = pattern.test(currentValue);

    if (valid) {
        phoneError.style.display = 'none'
    } else {
        phoneError.style.display = 'block'
    }
})

// Zip code expression
zip.addEventListener('input', function (e) {
    let pattern = /^\d{5}?$/;
    let currentValue = e.target.value;
    let valid = pattern.test(currentValue);

    if (valid) {
        zipError.style.display = 'none'
    } else {
        zipError.style.display = 'block'
    }
})

// Send button message
function showMessage() {
    alert();
}
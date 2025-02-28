document.addEventListener("DOMContentLoaded", function () {
    // Adding event listener to "Get Started" button
    document.querySelector(".hero-btn").addEventListener("click", function () {
        // Display an alert when the "Get Started" button is clicked
        alert("Welcome to SkillSwap! Start your learning journey.");
    });
});

// Select the dark mode toggle button
const toggleDarkModeButton = document.querySelector('.dark-mode-btn');

// Add event listener to the dark mode toggle button
toggleDarkModeButton.addEventListener('click', () => {
    // Toggle the 'dark-mode' class on the body element
    document.body.classList.toggle('dark-mode');
    
    // Check if the 'dark-mode' class is applied
    if (document.body.classList.contains('dark-mode')) {
        // Change button icon to sun if dark mode is enabled
        toggleDarkModeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        // Change button icon to moon if dark mode is disabled
        toggleDarkModeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});
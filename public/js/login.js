document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Email validation
    if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
        displayError('emailError', 'Please enter a valid email address.');
        return;
    }

    // Password validation
    if (password.length < 8) {
        displayError('passwordError', 'Password must be at least 8 characters.');
        return;
    }

    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            alert("Login failed (server error)");
            return;
        }

        const data = await response.json();

        if (!data.success) {
            alert(data.message || "Invalid login credentials");
            return;
        }

        alert("Login successful");
        location.assign('/user/dashboard');

    } catch (err) {
        alert("Network error: " + err.message);
    }
});

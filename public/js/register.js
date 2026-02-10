document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm-password").value;
    const nameRegex = /^[A-Za-z]{2,}$/;
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!firstname || !lastname || !email || !password || !confirm_password) {
        alert("All fields are required.");
        return;
    }

    if (!nameRegex.test(firstname)) {
       alert("Invalid first name.");
       return;
    }
    if (!nameRegex.test(lastname)) {
        alert("Invalid last name.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email address.");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Invalid password. It must be at least 8 characters long and contain at least one letter and one number");
        return;
    }

    if (password !== confirm_password) {
        alert("Passwords do not match.");
        return ;
    }

    const response = await fetch('/auth/register',{
        method : 'post',
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify({firstname, lastname, email, password, confirm_password})
    });

    console.log(response.body);
    const data = await response.json();
    if(!data.success)
    {
        throw new Error( data.message );
    }
    alert("registration successful");
    window.location.href = '/html/login.html';
});
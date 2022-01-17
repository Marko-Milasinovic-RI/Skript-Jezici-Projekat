function init() {
    document.cookie = 'token=;SameSite=Lax';

    document.getElementById("loginBtn").addEventListener("click", e => {
        e.preventDefault();

        const data = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };

        if (data.password == "" || data.password.length < 10) {
            alert("Username or password is not accepted.");
            return;
        }

        if (data.username == "" || data.username.length < 2) {
            alert("Username or password is not accepted.");
            return;
        }

        fetch("http://localhost:9001/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
            .then(res => res.json()).then(el => {
                if (el.msg) {
                    document.getElementById("password").value = "";
                    alert(el.msg);
                } else {
                    document.cookie = 'token=${el.token};SameSite=Lax';
                    window.location.href = "/admin/index";
                }
            });
    });
}
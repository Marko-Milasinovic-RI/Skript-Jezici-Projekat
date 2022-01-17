function init() {
    let currentId;
    const userIds = [];
    const users = [{}];

    const allCookies = document.cookie.split("=");
    const jwt = allCookies[allCookies.length - 1];
    if (!jwt) { window.location.href = '/admin/login'; }

    document.getElementById("logoutBtn").addEventListener("click", e => {
        document.cookie = 'token=;SameSite=Lax';
        window.location.href = '/admin/login';
    });

    document.getElementById("homeBtn").addEventListener("click", e => {
        window.location.href = '/admin/index';
    });


    function addListeners() {
        let maxSize = userIds.length;

        for (let i = 0; i < maxSize; i++) {
            document.getElementById(userIds[i]).addEventListener("click", e => {
                currentId = userIds[i];
                const isMod = document.getElementById("moderatorBtnUp");
                isMod.checked = false;
                if (users[i + 1].role == "MODERATOR") { isMod.checked = true; }

                const username = document.getElementById("usernameUp");
                username.value = "";
                username.value += users[i + 1].username;
                const email = document.getElementById("emailUp");
                email.value = "";
                email.value += users[i + 1].email;
                const firstname = document.getElementById("firstnameUp");
                firstname.value = "";
                firstname.value += users[i + 1].firstname;
                const lastname = document.getElementById("lastnameUp");
                lastname.value = "";
                lastname.value += users[i + 1].lastname;
            });

            document.getElementById(userIds[i] + "d").addEventListener("click", e => {
                const data = {"id": userIds[i]};
                fetch('http://localhost:10001/api/users', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ${token}'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(el => {
                        if (el.msg) {
                            alert(el.msg);
                        } else {
                            window.location.href = "/admin/users";
                        }
                    });
            });
        }
    }

    fetch('http://localhost:10001/api/users', {
        headers: { 'Authorization': 'Bearer ${token}' }
    })
        .then(res => res.json()).then(data => {
        const lst = document.getElementById('userList');

        data.forEach(userInstance => {
            userIds.push(userInstance.id);
            users.push(userInstance);
            lst.innerHTML =
                '<li id="liId">'
                + 'ID: ${el.id}, Username: ${el.username}, First name: ${el.firstname}, Last name: ${el.lastname}, Role: ${el.role}, E-mail: ${el.email} '
                + '<button id=${el.id + "d"} class="listButtonDelete">Delete</button>'
                + '<button id=${el.id} class="listButtonEdit">Edit</button>'
                + '</li>'
            ;
        });
        addListeners();
    }).catch(err => {
        window.location.href = '/admin/index';
        console.log("An error has occured: " + err);
    });

    document.getElementById("registerBtn").addEventListener("click", e => {
        e.preventDefault();

        var role = "";
        const moderatorBtn = document.getElementById("moderatorBtn");

        if (moderatorBtn.checked) {
            role = "MODERATOR";
        } else {
            role = "USER";
        }

        const payload = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            role: role
        };

        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (payload.username == "" || payload.username.length < 2 || payload.username.length > 49) {
            alert("Username is not valid, please try again.");
            return;
        } else if (payload.email == "" || !re.test(payload.email)) {
            alert("E-mail is not valid, please try again.");
            return;
        }else if (payload.password == "" || payload.password < 9) {
            alert("Invalid password is not valid, please try again.")
            return;
        } else if (payload.firstname == "" || payload.firstname < 2) {
            alert("First name is not valid, please try again.");
            return;
        } else if (payload.lastname == "" || payload.lastname < 2) {
            alert("Last name is not valid, please try again.");
            return;
        }

        fetch("http://localhost:9001/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(el => {
                if (el.err) {
                    console.log("An error has occured: " + el.err);
                    alert(el.err);
                } else {
                    window.location.href = "/admin/users";
                }
            }).catch(err => console.log("An error has occured = " + err));
    });

    document.getElementById("updateBtn").addEventListener("click", e => {
        e.preventDefault();

        var role = "";
        const isModBtn = document.getElementById("moderatorBtnUp");

        if (isModBtn.checked) {
            role = "MODERATOR";
        } else {
            role = "USER";
        }

        const payload = {
            id: currentId,
            role: role,
            username: document.getElementById("usernameUp").value,
            email: document.getElementById("emailUp").value,
            firstname: document.getElementById("firstnameUp").value,
            lastname: document.getElementById("lastnameUp").value
        };

        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (payload.username.trim() == "" || payload.trim().username.length < 3 || payload.username.length > 20) {
            alert("Username is not valid, please try again.");
            return;
        } else if (payload.email.trim() == "" || !re.test(payload.trim().email)) {
            alert("E-mail is not valid, please try again.");
            return;
        }else if (payload.firstname.trim() == "" || payload.trim().firstname < 2) {
            alert("First name is not valid, please try again.");
            return;
        } else if (payload.lastname.trim() == "" || payload.trim().lastname < 2) {
            alert("Last name is not valid, please try again.");
            return;
        }

        fetch("http://localhost:10001/api/users", { // ovo trazi put metodu u usersRoute.js
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ${token}'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json()).then(singleInstance => {
                if (singleInstance.err) {
                    console.log("An error has occurred: " + singleInstance.err);
                    alert(singleInstance.err);
                } else {
                    window.location.href = "/admin/users";
                }
            }).catch(err => console.log("An error has occurred: " + err));

    });
}
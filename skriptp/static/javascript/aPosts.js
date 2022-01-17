function init() {
    let currId;
    const apostIdList = [];
    const apostsList = [{}];
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

    fetch('http://localhost:10001/api/aposts', {
        headers: {
            'Authorization': 'Bearer ${token}'
        }
    })
        .then(res => res.json())
        .then(payload => {
            const lst = document.getElementById('apostList');

            payload.forEach(singleInstance => {
                apostIdList.push(singleInstance.id);
                apostsList.push(singleInstance);
                lst.innerHTML =
                '<li id="liId">'
                + 'ID: ${singleInstance.id}, Title: ${singleInstance.title}, Author: ${singleInstance.author}, Content: ${singleInstance.content}, Date: ${singleInstance.date}'
                + '<button id=${singleInstance.id + "d"} class="listButtonDelete">Delete</button>'
                + '<button id=${singleInstance.id} class="listButtonEdit">Edit</button>'
                + '</li>';
            });
            addListeners();
        }).catch(err => console.log("An error has occurred: " + err));

    function addListeners() {
        let maxSize = apostIdList.length;

        for (let i = 0; i < maxSize; i++) {
            document.getElementById(apostIdList[i]).addEventListener("click", e => {
                currId = apostIdList[i];

                const title = document.getElementById("titleUp");
                title.value = "";
                title.value += apostsList[i + 1].title;

                const author = document.getElementById("authorUp");
                author.value = "";
                author.value += apostsList[i + 1].author;

                const content = document.getElementById("contentUp");
                content.value = "";
                content.value += apostsList[i + 1].content;

                const date = document.getElementById("dateUp");
                date.value = "";
                date.value += apostsList[i + 1].date;
            });

            document.getElementById(apostIdList[i] + "d").addEventListener("click", e => {
                const data = {"id": apostIdList[i]};
                fetch('http://localhost:10001/api/aposts', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ${token}'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(apostInstance => {
                        if (apostInstance.err) {
                            console.log("An error has occurred: " + apostInstance.err);
                            alert(apostInstance.msg);
                        } else {
                            window.location.href = "/admin/aposts";
                        }
                    });
            });
        }
    }

    document.getElementById("createBtn").addEventListener("click", e => {
        e.preventDefault();

        const payload = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            content: document.getElementById("content").value,
            date: document.getElementById("date").value
        };

        if (payload.title.trim() == "") {
            alert("Title is not valid, please try again.");
            return;
        }  else if (payload.author.trim() == "") {
            alert("Author is not valid, please try again.");
            return;
        } else if (payload.trajanje.trim() == "") {
            alert("Content is not valid, please try again.");
            return;
        } else if (payload.date.trim() == "") {
            alert("Date is not valid, please try again.");
            return;
        }

        fetch("http://localhost:10001/api/aposts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ${token}'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json()).then(apostInstance => {
                if (apostInstance.err) {
                    console.log("An error has occurred: " + apostInstance.err);
                    alert(apostInstance.err);
                } else {
                    window.location.href = "/admin/aposts";
                }
            }).catch(err => console.log("An error has occurred: " + err));
    });

    document.getElementById("updateBtn").addEventListener("click", e => {
        e.preventDefault();

        const payload = {
            id: currId,
            title: document.getElementById("titleUp").value,
            author: document.getElementById("authorUp").value,
            content: document.getElementById("contentUp").value,
            date: document.getElementById("dateUp").value
        };

        if (payload.title.trim() == "") {
            alert("Please input the title.");
            return;
        } else if (payload.author.trim() == "") {
            alert("Please input the author.");
            return;
        } else if (payload.content.trim() == "") {
            alert("Please input the content.");
            return;
        } else if (payload.date.trim() == "") {
            alert("Please input the date.");
            return;
        }

        fetch("http://localhost:10001/api/aposts", {
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
                    window.location.href = "/admin/aposts";
                }
            }).catch(err => console.log("An error has occurred: " + err));
    });
}
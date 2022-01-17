function init() {

    const cookies = document.cookie.split("=");
    const jwt = cookies[cookies.length - 1];
    var check = true;

    if (!jwt) { window.location.href = '/admin/login'; }

    document.getElementById("homeBtn").addEventListener("click", e => {
        window.location.href = '/admin/index';
    });

    document.getElementById("usersBtn").addEventListener("click", e => {
        window.location.href = '/admin/users';
    });

    document.getElementById("logoutBtn").addEventListener("click", e => {
        document.cookie = 'token=;SameSite=Lax';
        window.location.href = '/admin/login';
    });

    document.getElementById("adminPostsBtn").addEventListener("click", e => {
        window.location.href = '/admin/adminPosts';
    });

    document.getElementById("aPostsBtn").addEventListener("click", e => {
        window.location.href = '/admin/aposts';
    });

    document.getElementById("creatorPostsBtn").addEventListener("click", e => {
        window.location.href = '/admin/creatorPosts';
    });

    document.getElementById("cPostsBtn").addEventListener("click", e => {
        window.location.href = '/admin/cposts';
    });

    function removeFunc() {
        var elem = document.getElementById("div1");
        elem.parentNode.removeChild(elem);
        return false;
    }
}
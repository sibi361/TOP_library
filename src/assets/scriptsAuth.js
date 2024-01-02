function setCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    document
        .querySelector("#submit")
        .addEventListener("click", () =>
            document.querySelector("input[type='submit']").click()
        );

    form.addEventListener(
        "submit",
        async (e) => {
            e.preventDefault();
            let host = "/api/login";
            if (document.location.pathname.includes("register"))
                host = "/api/register";
            await fetch(
                `${host}?username=${
                    document.querySelector("input[name='username']").value
                }&password=${
                    document.querySelector("input[name='password']").value
                }`,
                { method: "POST" }
            )
                .then((r) => {
                    if (r.status === 429) return alert("Please slow down");
                    else return r.json();
                })
                .then((r) => {
                    if (!r) return;
                    if (r.goto) {
                        if (r.token) setCookie("token", r.token);
                        document.location = r.goto;
                    } else alert(r.msg);
                });
        },
        false
    );
});

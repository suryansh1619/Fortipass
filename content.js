function fillLoginForm() {
    chrome.storage.local.get("fortiloginpass", function (data) {
        const { username = "", password = "" } = data.fortiloginpass || {};
        if (!document.querySelector("#ft_un").value && !document.querySelector("#ft_pd").value) {
            const messageContainer = document.querySelector(".message-container");
            if (messageContainer) {
                const h1Text = messageContainer.querySelector("h1").textContent.trim();
                if (h1Text === "Authentication Failed") {
                    alert("Authentication Failed. Stopping login.");
                    return;
                }
            }
            document.querySelector("#ft_un").value = username;
            document.querySelector("#ft_pd").value = password;
            document.querySelector("form").submit();
            setTimeout(fillLoginForm, 1000);
        }
    });
}

fillLoginForm();

const uri = "https://jx33limv7e.execute-api.us-east-1.amazonaws.com/user/api"

async function postAPI(url, data) {
    const response = await fetch(url, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });
    var res = await response.json();
    return res;
}

async function login(username, password) {
    const res = await postAPI(`${uri}/checkUser`, {
        username:username.value, //username.value
        password:password.value //password.value
    });
    console.log(res);
    if(res.status=="success") {
        if(res.founduser==0) alert("User not found");
        if(res.founduser==1) {
            alert("Logged in, redirect to submission page");
            window.location.replace("./submit.html");
        }
    }
}

async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const res = await postAPI(`${uri}/googleLogin`, {
        token:response.credential
    });
    if(res.status=="success") {
        if(res.founduser==0) {
            const res = await postAPI(`${uri}/googleRegister`, {
                token:response.credential
            });
            handleCredentialResponse(response);
        }
        if(res.founduser==1) {
            alert("Logged in, redirect to submission page");
            window.location.replace("./submit.html");
        }
    }
}

window.onload = function () {
    google.accounts.id.initialize({
      client_id: "180082793503-7vcdjgij896hbj6ivtrschipu6tl6lfa.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large", width: "360"}  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}
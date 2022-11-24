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

async function register(username, password) {
    const res = await postAPI(uri, {
        username:username.value, //username.value
        password:password.value //password.value
    });
    if(res.status=="success") {
        alert("Sign up completed, redirect to log in");
        window.location.replace("./index.html");;
    }
}


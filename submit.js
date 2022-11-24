const uri = "https://il1b9v4kje.execute-api.us-east-1.amazonaws.com/image/api"

async function postAPI(url, data) {
    const response = await fetch(url, {
        method:"POST",
        /*headers:{
            "Content-Type":"multipart/form-data"
        },*/
        body:data.content
    });
    var res = await response.json();
    return res;
}

async function upload(file){
    console.log(`fn is running with ${file.files[0]}`);
    var image = file.files[0];

    var img = new Image();

    img.src = window.URL.createObjectURL(image);

    img.onload = async function() {
        var image_width = img.naturalWidth;
        var image_height = img.naturalHeight;
        var image_size = image.size;
        var image_type = image.type;

        window.URL.revokeObjectURL( img.src );

        console.log(image_height);
        console.log(image_width);
        console.log(image_size);
        console.log(image_type);

        if (image_height > 200 || image_width > 200) {
            alert("Dimension of an image must not exceed 200px x 200px");
        }
        else if (image_size > 51200) {
            alert("Image size must not exceed 50KB");
        }
        else if (image_type != "image/jpeg") {
            alert("Image type must be .JPEG or .JPG");
        }
        else {
            var formData = new FormData();

            formData.append("image", image);

            const res = await postAPI(`${uri}/upload`, {
                content: formData
            });
            console.log(res);
            alert("Image uploaded");
        }
    }
}

function logout() {
    alert("Logging out, redirect to log in.");
    window.location.replace("index.html");
}
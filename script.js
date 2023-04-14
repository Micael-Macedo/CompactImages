const userPhoto = document.querySelector("#user_avatar");
userPhoto.addEventListener("change", (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        createCanva(reader.result)
    }
    reader.readAsDataURL(file)
})
function createCanva(imagemBase64) {
    let image = document.createElement("img")
    image.src = imagemBase64
    image.onload = (e) => {
        let canvas = document.createElement("canvas")
        let context = canvas.getContext("2d")
        let ratio =  300 /  e.target.width
        canvas.width = 300
        canvas.height = ratio * e.target.height
    
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        let new_image_url = context.canvas.toDataURL("image/jpeg", 100)
        let new_image = document.createElement("img")
        new_image.src = new_image_url
        new_image.id = "user_image"
        $(".avatar img").remove()
        $(".avatar").append(new_image);
    }
}
$(document).ready(function () {
    if(localStorage.getItem("usuario")){
        let Usuario = JSON.parse(localStorage.getItem("usuario"))
        $("#form").remove();
        $("#user").append(`
        <img src="${Usuario.imagem}" />
        <h2>Seja bem vindo ${Usuario.nickname}</h2>
        <p>Nome completo: ${Usuario.name}</p>
        <p>email: ${Usuario.email}</p>
        <button onclick="Logout()">Logout</button>
        `)
    }
});
function cadastro(){
    let name = $("#name").val()
    let senha = $("#senha").val()
    let email = $("#email").val()
    let imagem = $("#user_image").attr("src");
    nickname = name.split(" ")
    nickname = nickname[0];
    let usuario = {
        "name": name,
        "nickname": nickname,
        "senha": senha,
        "email": email,
        "imagem": imagem,
    }
    if(usuario.email != "" && usuario.name != "" && usuario.senha != ""){
        localStorage.setItem("usuario", JSON.stringify(usuario))
    }else{
        localStorage.clear()
    }
    window.location.reload()
}
function Logout(){
    localStorage.clear()
    window.location.reload()
}

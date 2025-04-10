
const key = "591a1fb042efb578c61dd73bc04e35dc";

function colocarDadosNaTela(dados) {
    if (dados && dados.main) {
        document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
        document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
        document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
        document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
        document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    } else {
        mostrarErro("Cidade não encontrada. Tente novamente.");
        document.querySelector(".cidade").innerHTML = "";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".texto-previsao").innerHTML = "";
        document.querySelector(".umidade").innerHTML = "";
        document.querySelector(".img-previsao").src = "";
    }
}



async function buscarCidade(cidade) {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade},Brasil&appid=${key}&lang=pt_br&units=metric`);
    const dados = await resposta.json();

    colocarDadosNaTela(dados);
    mudarImagemFundo();
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value.trim();
    if (cidade) {
        buscarCidade(cidade);
    } else {
        alert("Por favor, digite uma cidade.");
    }
}

function mudarImagemFundo() {
    const randomNum = Math.floor(Math.random() * 1000);
    const imgUrl = `https://picsum.photos/1920/1089?random=${randomNum}`;

    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
        document.body.style.transition = 'background-image 0.5s ease-in-out';
        document.body.style.backgroundImage = `url("${imgUrl}")`;
    };
}


window.onload = () => {
    mudarImagemFundo();
    buscarCidade("Recife,Brasil");
};
function mostrarErro(mensagem) {
    const erroBox = document.getElementById("mensagem-erro");
    erroBox.innerText = mensagem;
    erroBox.style.display = "block";


    setTimeout(() => {
        erroBox.style.display = "none";
    }, 4000);
}

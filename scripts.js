
const key = "591a1fb042efb578c61dd73bc04e35dc";

function colocarDadosNaTela(dados) {
    if (dados && dados.main) {
        console.log(dados);
        document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
        document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
        document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
        document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
        document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    } else {
        document.querySelector(".cidade").innerHTML = "Cidade não encontrada.";
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
    mudarImagemFundo(); // Muda a imagem de fundo imediatamente
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

    const img = new Image(); // Cria um novo objeto de imagem
    img.src = imgUrl; // Define a fonte da nova imagem

    img.onload = () => {
        document.body.style.transition = 'background-image 0.5s ease-in-out';
        document.body.style.backgroundImage = `url("${imgUrl}")`;
    };
}

// Chama a função ao carregar a página
window.onload = () => {
    mudarImagemFundo();
    buscarCidade("Recife,Brasil"); // Garante que "Recife" seja a cidade inicial
};

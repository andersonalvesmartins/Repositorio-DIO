/*Nesta atividade, vamos criar uma página que carrega fotos aleatórias de gatinhos sempre que clicamos em um botão.
Utilize a API https://thatcopy.pw/catapi/rest para fazer as chamadas com o método fetch();
Utilize seus conhecimentos na manipulação do DOM para criar a imagem e ativar o evento de clique do botão!
*/

const BASE_URL = 'https://thatcopy.pw/catapi/rest/';     //endereço da API que fornece imagens de gatos aleatórias.
const catButton = document.getElementById('change-cat'); //botão para trocar a imagem da pagina web que chama esse script

const getCats = async () => {
    try {
        const data = await fetch(BASE_URL); //O retorno do Fetch é uma Promise e por isso tem o await
        const json = await data.json();     //Converte o objeto data para o formato JSON
        return json.webpurl;                //Retorna para página apenas o endereço da imagem webp do gato.
    } catch (e) {
        console.log(e.message);
        alert(e.message);
    }
}

const loadImage = async () => {
    const catImg = document.getElementById('cat'); //Pega o objeto img da pagina 
    catImg.src = await getCats();                  //e aplica ao src dela o return do getCats
};

//Listener do clique do botão da pagina.
catButton.addEventListener('click', loadImage);

loadImage();
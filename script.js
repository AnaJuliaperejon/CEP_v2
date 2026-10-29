const campoCep = document.getElementById('cep');
const btnBuscar = document.getElementById('btnBuscar');
const divMensagem = document.getElementById('mensagem');
const divResultado = document.getElementById('resultado');

const spanLogradouro = document.getElementById('logradouro');
const spanBairro = document.getElementById('bairro');
const spanCidade = document.getElementById('cidade');
const spanUF = document.getElementById('uf');
const spanDDD = document.getElementById('ddd');

btnBuscar.addEventListener('click', buscarCep);

campoCep.addEventListener('keypress', (tecla) => {
    if(tecla.key === 'Enter') buscarCep();
});

async function buscarCep() {
    const valorinput = campoCep.value.trim().replace(/\D/g, '');

    esconderElemento(divMensagem);
    esconderElemento(divResultado);

    if(valorinput.length !== 8){
        mostrarMensagem('Por favor, digite um CEP válido com 8 números.', 'erro');
        return
    }

    mostrarMensagem('buscando endereço...', 'info');

    try{

        const url = `https://viacep.com.br/ws/${valorinput}/json`
        const resposta = await fetch(url);
        const dados = await resposta.json();
        if (dados.erro){
            mostrarMensagem('CEP não encontrado na base de dados', 'erro')
            return
        }
        spanLogradouro.textContent = dados.logradouro || 'Não informado';
        spanBairro.textContent = dados.bairro || 'Não informado';
        spanCidade.textContent = dados.localidade;
        spanUF.textContent = dados.uf;
        spanDDD.textContent = dados.ddd || 'N/A';
        esconderElemento(divMensagem);
        divResultado.classList.remove('oculto');
    }catch(erro){
        console.error('Erro na requisição: ', erro);
        mostrarMensagem('Erro de conexão ao buscar CEP. Tente novamente mais tarde.', 'erro');

    }
}
function mostrarMensagem(texto, tipo){
    divMensagem.textContent = texto;
    divMensagem.className = `mensagem ${tipo}`;
}
function esconderElemento(elemento){
    elemento.classList.add('oculto');
}
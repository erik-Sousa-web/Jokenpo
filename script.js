// Variáveis para o placar
let placarJogador = 0;
let placarGuerreiro = 0;

const escolhasPossiveis = ['pedra', 'papel', 'tesoura'];
const nomeBot = "Guerreiro";

// Mapeamento de texto para ícone (emojis)
const iconesJogadas = {
    'pedra': '🪨',
    'papel': '📄',
    'tesoura': '✂️'
};

// Referências aos elementos HTML
const instrucaoInicial = document.getElementById('instrucao-inicial');
const botoesEscolha = document.getElementById('escolhas');
const jogadorEscolhaIcone = document.getElementById('jogador-escolha-icone');
const guerreiroEscolhaIcone = document.getElementById('guerreiro-escolha-icone');
const divResultado = document.getElementById('resultado');
const placarJogadorSpan = document.getElementById('placar-jogador');
const placarGuerreiroSpan = document.getElementById('placar-guerreiro');
const controlesFinaisDiv = document.getElementById('controles-finais');
const mensagemFinalDiv = document.getElementById('mensagem-final');

// Função principal chamada ao clicar em qualquer botão de escolha
function jogarJokenpo(escolhaJogador) {
    // Esconde a instrução inicial
    instrucaoInicial.style.display = 'none';
    
    const escolhaGuerreiro = gerarEscolhaGuerreiro();
    const resultado = determinarVencedor(escolhaJogador, escolhaGuerreiro);
    
    // Atualiza os ícones visuais
    atualizarIconesJogadas(escolhaJogador, escolhaGuerreiro);
    
    // Atualiza o placar e exibe o resultado da rodada
    atualizarPlacar(resultado);
    exibirResultado(escolhaJogador, escolhaGuerreiro, resultado);

    // Garante que o placar e o resultado da rodada estejam visíveis
    divResultado.style.display = 'block'; 
    document.getElementById('placar').style.display = 'block'; 

    // Mostra os controles finais após a primeira jogada
    controlesFinaisDiv.style.display = 'flex';
}

// 1. Gera uma escolha aleatória para o bot
function gerarEscolhaGuerreiro() {
    const indiceAleatorio = Math.floor(Math.random() * escolhasPossiveis.length);
    return escolhasPossiveis[indiceAleatorio];
}

// 2. Determina o resultado da rodada
function determinarVencedor(jogador, guerreiro) {
    if (jogador === guerreiro) {
        return 'Empate';
    }

    if (
        (jogador === 'pedra' && guerreiro === 'tesoura') ||
        (jogador === 'papel' && guerreiro === 'pedra') ||
        (jogador === 'tesoura' && guerreiro === 'papel')
    ) {
        return 'Você Venceu';
    } else {
        return nomeBot + ' Venceu';
    }
}

// 3. Atualiza as variáveis do placar e o HTML
function atualizarPlacar(resultado) {
    if (resultado === 'Você Venceu') {
        placarJogador++;
    } else if (resultado === nomeBot + ' Venceu') {
        placarGuerreiro++;
    }

    placarJogadorSpan.textContent = placarJogador;
    placarGuerreiroSpan.textContent = placarGuerreiro;
}

// 4. Exibe o resultado da rodada e as jogadas na tela
function exibirResultado(jogador, guerreiro, resultado) {
    let mensagem = '';
    let cor = 'white'; 

    if (resultado === 'Você Venceu') {
        cor = '#00bcd4'; // Azul Ciano (Vitória)
        mensagem = `🎉 Você Venceu!`;
    } else if (resultado === nomeBot + ' Venceu') {
        cor = '#ff007f'; // Rosa Vibrante (Derrota)
        mensagem = `😔 ${nomeBot} Venceu!`;
    } else {
        cor = '#ffc107'; // Amarelo (Empate)
        mensagem = `💛 Empate!`;
    }

    divResultado.innerHTML = `
        <p style="color: ${cor}; font-size: 1.6em; font-weight: bold; animation: popUp 0.5s ease-out;">${mensagem}</p>
        <p>Você jogou: <span style="text-transform: capitalize;">${jogador}</span></p>
        <p>${nomeBot} jogou: <span style="text-transform: capitalize;">${guerreiro}</span></p>
    `;
}

// 5. Atualiza os ícones visuais para a animação
function atualizarIconesJogadas(jogador, guerreiro) {
    jogadorEscolhaIcone.textContent = iconesJogadas[jogador];
    guerreiroEscolhaIcone.textContent = iconesJogadas[guerreiro];

    // Adiciona classe para animar
    jogadorEscolhaIcone.classList.add('animated');
    guerreiroEscolhaIcone.classList.add('animated');

    // Remove a classe após a animação para poder animar novamente
    setTimeout(() => {
        jogadorEscolhaIcone.classList.remove('animated');
        guerreiroEscolhaIcone.classList.remove('animated');
    }, 500); // Duração da animação
}


// 6. Reinicia o jogo (placar e visual)
function reiniciarJogo() {
    placarJogador = 0;
    placarGuerreiro = 0;
    placarJogadorSpan.textContent = placarJogador;
    placarGuerreiroSpan.textContent = placarGuerreiro;

    // --- Torna elementos visíveis ---
    botoesEscolha.style.display = 'flex'; 
    divResultado.style.display = 'block'; 
    document.getElementById('placar').style.display = 'block'; 

    divResultado.innerHTML = ''; 
    mensagemFinalDiv.innerHTML = ''; 
    mensagemFinalDiv.style.display = 'none'; 

    // Reseta os ícones visuais
    jogadorEscolhaIcone.textContent = '?';
    guerreiroEscolhaIcone.textContent = '?';
    
    // Esconde os controles finais até que uma nova jogada seja feita
    controlesFinaisDiv.style.display = 'none';
    
    // Coloca os botões originais de volta na div de controle
    controlesFinaisDiv.innerHTML = `
        <button onclick="reiniciarJogo()" class="btn-controle">Jogar Novamente</button>
        <button onclick="finalizarJogo()" class="btn-controle btn-finalizar">Finalizar Jogo</button>
    `;

    // Mostra a instrução inicial novamente
    instrucaoInicial.style.display = 'block';
}


// 7. Finaliza o jogo e mostra a mensagem final
function finalizarJogo() {
    // --- ESCONDE ELEMENTOS PARA A TELA FINAL ---
    botoesEscolha.style.display = 'none'; 
    divResultado.style.display = 'none'; 
    document.getElementById('placar').style.display = 'none'; 
    controlesFinaisDiv.style.display = 'none'; 

    let mensagemPrincipal = '';
    let classeCor = '';

    if (placarJogador > placarGuerreiro) {
        mensagemPrincipal = `🥳 Parabéns! Você é o grande campeão!`;
        classeCor = 'vitoria';
    } else if (placarGuerreiro > placarJogador) {
        mensagemPrincipal = `😅 Você é muito fraco! Tente novamente!`;
        classeCor = 'derrota';
    } else {
        mensagemPrincipal = `💛 O jogo terminou em um glorioso empate!`;
        classeCor = 'empate';
    }

    // NOVO: Separando a mensagem e o placar em duas linhas
    const placarFinalMensagem = `Placar final: ${placarJogador} x ${placarGuerreiro}!`;

    mensagemFinalDiv.innerHTML = `
        <p class="one-line-text">${mensagemPrincipal}</p>
        <p class="one-line-text">${placarFinalMensagem}</p>
    `;

    mensagemFinalDiv.className = ''; 
    mensagemFinalDiv.classList.add(classeCor);
    mensagemFinalDiv.style.display = 'block';

    // Adiciona APENAS o botão para jogar novamente na tela final
    const botoesAposFinal = `<button onclick="reiniciarJogo()" class="btn-controle">Jogar Novamente</button>`;
    controlesFinaisDiv.innerHTML = botoesAposFinal;
    controlesFinaisDiv.style.display = 'flex';
}

// Inicializa o placar e reseta o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', reiniciarJogo);
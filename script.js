let filaMissoes = []; //Para armazenar ordenação
let ultimoID = 0;

const inputPrior = document.getElementById('prioridade')
const inputDistancia = document.getElementById('distancia')
const formulario = document.getElementById('FormMissao');

        formulario.addEventListener('submit', function(event) {
            // Previne que a página recarregue
            event.preventDefault();
            ultimoID++;

            const inputOrigem = document.getElementById('origem').value;
            const inputDestino = document.getElementById('destino').value;
            const inputCarga = document.getElementById('carga').value;
    
             // Converter para números para respeitar os tipos int e float
            const inputPrior = parseInt(document.getElementById('prioridade').value);
            const inputDistancia = parseFloat(document.getElementById('distancia').value);

            // 5. Captura o valor do input pelo ID
            const novaMissao = {
                id: ultimoID,
                origem: document.getElementById('origem').value,
                destino: document.getElementById('destino').value,
                carga: document.getElementById('carga').value,
                prioridade: parseInt(document.getElementById('prioridade').value),
                distancia: parseFloat(document.getElementById('distancia').value),
                status: "pendente"
            }

            filaMissoes.push(novaMissao);
    
    // Toda vez que adicionar, organizamos e mostramos
    organizarEMostrar();
    this.reset(); // Limpa o formulário

    // 3. Exibe o JSON da fila inteira para conferência
    console.log("Próxima missão a ser executada:", filaMissoes[0]);

            enviarMissaoHospitalar(
                ultimoID,
                inputOrigem,
                inputDestino,
                inputCarga,
                inputPrior,
                inputDistancia,
                "pendente"
            )
        });
/* Começo API hospitalar: */

function enviarMissaoHospitalar(missaoId, origem, destino, carga, prioridade, distancia, status) {
    // Criar o objeto de dados
    const payload = {
        id: missaoId,
        origem: origem,
        destino: destino,
        carga: carga,
        prioridade: prioridade,
        distancia: distancia,
        status_missao: status
    }

    const jsonPayload = JSON.stringify(payload, null, 4); // O '4' serve para indentar e facilitar a leitura

    // Exibir o JSON (simulando o envio)
    console.log("--- Enviando dados para a API ---");
    console.log(jsonPayload);
    
    return jsonPayload;
}
/*Fim API*/

function organizarEMostrar() {
    // 1. Organiza por prioridade e distância (regras anteriores)
    filaMissoes.sort((a, b) => {
        if (a.prioridade !== b.prioridade) return a.prioridade - b.prioridade;
        return a.distancia - b.distancia;
    });

    renderizarLista();
}

//Mostrar os dados do robô
let statusRobo = {
    operando: false,
    latencia: 114,
    localizacaoAtual: "Base", 
    bateria: 12,
    missaoAtualId: null,
    atualizacao: new Date().toISOString().slice(11, 19),
    statusMissaoFalhou: false,
    falhouId: null
};

function renderizarLista() {
    const container = document.getElementById('listaMissoesContainer');
    if (filaMissoes.length === 0) {
        container.innerHTML = "<p>Nenhuma missão pendente.</p>";
        return;
    }

    let html = `
        <table border="1" style="width:100%; border-collapse: collapse; text-align: left;">
            <thead>
                <tr style="background-color: rgb(169, 184, 231);">
                    <th>ID</th>
                    <th>Origem -> Destino</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>`;

    filaMissoes.forEach(missao => {
        let botoes = "";

        //Para mudar status
        if (missao.status === "pendente") {
            botoes = `
                <button onclick="mudarStatus(${missao.id}, 'em andamento')">Iniciar</button>
                <button onclick="removerMissao(${missao.id})" style="color: red;">Cancelar</button>
            `;
        } else if (missao.status === "em andamento") {
            botoes = `
                <button onclick="removerMissao(${missao.id})" style="color: green;">Concluída</button>
                <button onclick="mudarStatus(${missao.id}, 'pendente')" style="color: orange;">Falha</button>
            `;
        }

        html += `
            <tr>
                <td>#${missao.id}</td>
                <td>${missao.origem} -> ${missao.destino}</td>
                <td>${missao.prioridade}</td>
                <td><strong>${missao.status.toUpperCase()}</strong></td>
                <td>${botoes}</td>
            </tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

// Para mudar o status da missão
function mudarStatus(idBuscado, novoStatus) {
    const missao = filaMissoes.find(m => m.id === idBuscado);
    if (novoStatus === 'pendente' && missao.status === 'em andamento') {
            statusRobo.statusMissaoFalhou = true; // Ativa o erro
            statusRobo.falhouId = idBuscado;
        } else {
            statusRobo.statusMissaoFalhou = false; // Limpa o erro se iniciar outra ou concluir
        }

        missao.status = novoStatus;
        atualizarLogicaRobo();
        
        organizarEMostrar(); 
        alerta()
        
        // Avisando a API
        console.log(`Missão ${idBuscado} agora está: ${novoStatus}`);
}


// Quando a missão é cancelada
function removerMissao(idBuscado) {
    filaMissoes = filaMissoes.filter(m => m.id !== idBuscado);
    atualizarLogicaRobo();
    renderizarLista();
    console.log(`Missão ${idBuscado} removida do sistema.`);
}

//Quando a missão for concluída:
function concluirMissao(idBuscado) {
    // Remove a missão da lista (filtra apenas as que NÃO são o ID clicado)
    filaMissoes = filaMissoes.filter(m => m.id !== idBuscado);
    renderizarLista();
    console.log(`Missão ${idBuscado} removida.`);
}

function atualizarLogicaRobo() {
    // Busca se existe alguma missão na fila com status "em andamento"
    const missaoAtiva = filaMissoes.find(m => m.status === "em andamento");

    if (missaoAtiva) {
        statusRobo.operando = true;
        statusRobo.missaoAtualId = missaoAtiva.id;
        statusRobo.localizacaoAtual = missaoAtiva.origem;
    } else {
        statusRobo.operando = false;
        statusRobo.missaoAtualId = null;
    }

    exibirStatusRoboNoHTML();
    alerta()
}

///Exibindo o status do robô
function exibirStatusRoboNoHTML() {
    const painel = document.getElementById('statusRoboPainel'); // Crie uma div com este ID no HTML
    const latencia = statusRobo.latencia+" ms"
    
    painel.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 10px; background: #f9f9f9; border-radius: 8px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
            <strong> Status do Robô:</strong><br>
            • Bateria: ${statusRobo.bateria}%<br>
            • Latência: ${latencia}<br>
            • Status operacional: ${statusRobo.operando ? " Executando Missão" : "💤 Não executando Missão (Aguardando)"}<br>
            • Missão Atual: ${statusRobo.missaoAtualId || "Nenhum"}<br>
            • Última atualização: ${statusRobo.atualizacao}
        </div>
    `;
}

//Exibindo alerta. Há três tipos de alerta: bateria baixa, alta latência e missão falha
function alerta(){
    const painel = document.getElementById('alertas');
    const latencia = statusRobo.latencia
    const bateria = statusRobo.bateria
    const falha = statusRobo.statusMissaoFalhou

    painel.innerHTML = "";

    if(bateria<20){
        painel.innerHTML += `
        <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; background: #f14545; border-radius: 8px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
            <strong> O robô está com a bateria fraca (Abaixo de 20%)</strong><br>
        </div>
    `;
    }
    if (latencia>100){
    painel.innerHTML += `
        <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; background: #ef862f; border-radius: 8px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
            <strong> A latência do robô está maior que 100 ms</strong><br>
        </div>
    `;
    }
    if(falha){
        painel.innerHTML += `
        <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; background: #e9e147; border-radius: 8px; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">
            <strong>A Missão ${statusRobo.falhouId || "não registrada"} falhou</strong><br>
        </div>
    `;
    }
}

/*Mostrar para o usuário que o valor da prioridade precisa ser entre 1 a 3 */
inputPrior.addEventListener('input', function() {
let valorPrior = parseInt(this.value);

    if (valorPrior < 1) {
        window.alert("Valor precisa ser entre 1 a 3")
        this.value = 1;
    } 

    else if (valorPrior > 3) {
        window.alert("Valor precisa ser entre 1 a 3")
        this.value = 3;
    }
});

/*Mostrar para o usuário que o valor da distância precisa ser maior que 0 */
inputDistancia.addEventListener('input', function() {
let valorDistancia = parseInt(this.value);

    if (valorDistancia < 1) {
        window.alert("Valor precisa ser maior que zero")
        this.value = 1;
    } 
});
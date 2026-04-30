# Testes
1. Teste de cadastro de missão
* ID do Teste: MI-01.
* Objetivo/Resumo: Validar o cadastramento de missões.
* Pré-condições: não há nenhuma pré-condição necessária.
* Passos: 1. Abrir página, 2. Digitar o ponto de origem, 3. Digitar o ponto de destino, 4. Digitar o tipo de carga, 5. Inserir a prioridade, 6. Digitar a Distância, 7. Clicar em Enviar.
* Dados de Teste: origem: Farmácia; destino: UTI; tipo de carga: remédio; prioridade: 1; distancia: 30.
* Resultado Esperado: A missão vai ser mostrada na tabela "Missões Pendentes".
* Resultado Real: Não apresentou falha


2. Teste do status
* ID do Teste: MI-02.
* Objetivo/Resumo: Garantir que os botões mudem de estado.
* Pré-condições: É necessário ter cadastrado pelo menos uma missão.
* Passos: 1. Clicar em "Iniciar".
* Dados de Teste: não é necessário dados.
* Resultado Esperado: Dois botões irão ser mudados. Será visualizado os botões depois da mudança: "Concluída" e "Falha".
* Resultado Real: Não apresentou falha.

3. Teste de alerta (bateria)
* ID do Teste: MI-03.
* Objetivo/Resumo: Garantir que apareça um alerta quando a bateria do robô estiver abaixo de 20%.
* Pré-condições: É necessário ter cadastrado pelo menos uma missão e ter clicado no botão "Iniciar" ou "Cancelar" em ações.
* Passos: 1. Clicar em "Iniciar".
* Dados de Teste: A bateria do robô precisa estar abaixo de 20%.
* Resultado Esperado: Irá aparecer o alerta: "O robô está com a bateria fraca (Abaixo de 20%)".
* Resultado Real: Não apresentou falha.
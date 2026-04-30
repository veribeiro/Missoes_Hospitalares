# Missoes Hospitalares

<p>Projeto: Top Frame Hospitalar Adaptativo para Robô Autônomo</p>

<h3>Objetivo do Projeto</h3>
Sistema de logística robótica hospitalar desenvolvido para gerenciar e otimizar o transporte de recursos médicos. Esse sistema simula o deslocamento do robô entre postos de atendimento.

##
<h3>Funcionalidades implementadas</h3>

* Cadastrar missões;

* Simular o recebimento de dados de missões em uma API em JSON via console;
  
* Visualizar em uma tabela todas as missões que foram solicitados, com seus respectivos id's, o local de origem até o destino, prioridade, status e ação;

* Visualizar status de cada missão (Se está pendente, em andamento ou concluído) de acordo o que o robô está executando;
  
* Modificar a ação do robô em uma missão (Iniciar, Cancelar, Concluída, Falha);
  
* Visualizar os dados do robô (bateria, latência, status operacional, missão que está executando e o horário que houve a solicitação do robô para executar alguma missão);

* Visualizar alertas de possíveis problemas do robô (como bateria baixa, latência alta e se alguma missão falhou)

##
<h3>Tecnologias utilizadas</h3>

* HTML

* CSS

* JavaScript

##
<h3>Instruções para executar localmente</h3>
-Clone o repositório:

No git bash execute:

```
git clone https://github.com/veribeiro/Missoes_Hospitalares.git
```
Acesse até a pasta do projeto

```
cd Missoes_Hospitalares
```
##
<h3>link do sistema publicado</h3>

Link do projeto: <https://veribeiro.github.io/Missoes_Hospitalares/>

##
<h3>Limitações conhecidas</h3>
Não possuir API: Nesse projeto, não é possível criar uma API, só simular ela. 

Simulação robô: na parte do robô executar tarefas, também é só uma simulação.

Por esses fatores, não é um projeto de aplicação real.

##
<h3>Decisões técnicas tomadas</h3>
Para cadastrar uma missão, optei fazer utilizando o formulário HTML para inserção de dados. Já o JavaScript foi utilizado na manipulação desses dados para influenciar a ordem das missões a serem executadas e os status do robô.
<br><br>

Além disso, para a integração REST simulada implementei uma função que simula envio de status para uma API hospitalar e exibe o JSON enviado via console.

//sobre a aula 04-Async Await sem mistério
//para executar os testes na sequencia e tempo adequado é preciso implementar uma promessa, que no TS é o objeto Promisse.

//todas as funçoes no Playwright (goto, getByRole, getByRole, etc) trabalham com promessas


//FUNÇÃO SEM PROMESSA
// function buscarUsuario(): string {
//     let nome = ''
//     //Simulação de uma operação demorada (API, banco, etc.)
//     setTimeout(() => {
//         nome = 'Papito'
//     }, 2000)
//     return nome
// }

//FUNÇÃO COM PROMESSA
function buscarUsuario(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Papito'), 2000)
    })
}

//quando trabalhamos com funções assincronas que aguradam pela resolução de uma pormessa, usamos o async e await indicando ao TS que precisa aguardar o cumprimento da promessa; se form sem promessa como a function comentada acima usamos sem async
async function exibirUsuario() {
    
    console.log('Antes')

    const nome = await buscarUsuario()
    console.log(nome)

    console.log('Depois')
}

exibirUsuario()

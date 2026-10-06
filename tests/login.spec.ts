//essa linha carrega os 3 protagonistas de qualquer teste em PWT: o test, o expect e o page
//se vc entender esses 3 protagonista entenderá 80% do que aocntece en qualquer teste automatizado em PWT
import { test, expect } from 'playwright/test'

//o test é uma função que o play exporta e tras duas coisas: registra o teste no testrunner e depois ele define o que vai ser executado, no caso, os steps. Ele recebe dois argumentos:  o nome do teste e a função assincrona que implementa o corpo do teste (que está ente chaves)
// já a função page passada como objeto entre chaves (que é o que chamamos em JS de desestruturação) injeta automaticamente fixtures (objetos prontos para usar). Cada teste ganha seu próprio page do zero! Por isso que um teste nunca contamina o outro, pois cada teste tem seu próprio contexto, seu proprio page (isolado e dependente).
test('Deve autenticar no controle de missões', async ({ page }) => {
    //PREPARAÇÃO:
    //o page faz as ações
    await page.goto('http://localhost:3000/mission-control/login')
    //Checkpoint
    const title = page.getByRole('heading', { name: 'Mission Control' })
    //await é um callback por causa do navegador ser assincrono então espera a promessa
    await expect(title).toBeVisible()

    //AÇÃO:
    //essa estratégia de locator não é a melhor para trabalhar com Playwright. É a mais básica!
    //Playwright já tem funções que faciliatm o uso da ferramenta
    //await page.locator('input[type=email]').fill('buzz@lunarpass.dev')
    //await page.locator('input[type=password]').fill('pwd123')

    //por exemplo...
    //await page.getByRole('textbox', { name: 'E-mail' }).fill('buzz@lunarpass.dev')
    //await page.getByRole('textbox', { name: 'Senha' }).fill('pwd123')

    //existindo placeholder...
    //await page.getByPlaceholder('vc@teste.com').fill('teste@teste.com')

    //ou, existindo o label, simplesmente...
    await page.getByLabel('E-mail').fill('buzz@lunarpass.dev')
    await page.getByLabel('Senha').fill('pwd123')
    await page.getByRole('button', { name: 'Entrar' }).click()

    //RESULTADO ESPERADO:s
    //validação se está na página esperada apóps o login...
    //o button de logout não tem name mas o Playwright localiza name pela tag title também
    const logoutButton = page.getByRole('button', { name: 'Sair' })
    //o expect faz as verificações. sempre recebe um localizador e faz o encademento de uma
    //função de verificação
    await expect(logoutButton).toBeVisible()


    //Temporário
    //await page.waitForTimeout(5000)

    //OU SEJA:
    //o test é a estrutura, o page é ação e o expect é a verificação
})

test('Não deve autenticar com senha incorreta', async ({ page }) => {
    //Arrange - preparação do cenário
    await page.goto('http://localhost:3000/mission-control/login')
    const title = page.getByRole('heading', { name: 'Mission Control' })
    await expect(title).toBeVisible()

    // Act - execução da ação
    await page.getByLabel('E-mail').fill('buzz@lunarpass.dev')
    await page.getByLabel('Senha').fill('abc123')
    await page.getByRole('button', { name: 'Entrar' }).click()

    // Assert - verificar o resultado
    
    //usei esse abaixo apenas por teste. O Playwright tem uma espera implicíta de até 5s
    //await page.waitForTimeout(2000)
    const alert = page.locator('p[role=alert]')
    //se não colocar o await abaixo ele tentar fazer a validação tão logo a página seja carregada
    await expect(alert).toHaveText('E-mail ou senha inválidos.')
})

test('Não deve autenticar com e-mail não cadastrado', async ({ page }) => {
    //Arrange - preparação do cenário
    await page.goto('http://localhost:3000/mission-control/login')
    const title = page.getByRole('heading', { name: 'Mission Control' })
    await expect(title).toBeVisible()

    // Act - execução da ação
    await page.getByLabel('E-mail').fill('404@lunarpass.dev')
    await page.getByLabel('Senha').fill('pwd123')
    await page.getByRole('button', { name: 'Entrar' }).click()

    // Assert - verificar o resultado

    // const alert = page.locator('p[role=alert]')
    //substitui a estratégia acima por essa abaixo
    const alert = page.getByRole('alert')
    
    await expect(alert).toHaveText('E-mail ou senha inválidos.')
})
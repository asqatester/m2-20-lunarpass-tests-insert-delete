import { test, expect } from 'playwright/test'
import { LoginPage } from '../pages/login.page'
import { NavBar } from '../pages/components/navbar'

//loginPage deixou de ser const e passou a ser variável e criada de forma global a fimde que todos os testes consigam ter acesso a ela
let loginPage: LoginPage
let navbar: NavBar

//esse gancho será executado antes de cada teste
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    navbar = new NavBar(page)

    // Arrange - preparação do cenário
    await loginPage.go()
})

test('deve autenticar no controle de missões', async ({ page }) => {
    // Act - Execução da ação
    await loginPage.login('buzz@lunarpass.dev', 'pwd123')

    // Assert - verificar o resultado

    //todo assert precisa do expect explicito, mas nesse caso está embutido na função isLoggeduser(). Não está errado, mas o recomendável é que a verificação fique explícita dentro do teste. Então a aula Componentes e PageObjects mostrou como tratar isso
    //await.loginPage.isLoggedUser()

    //e na aula Componentes e PageObjects passanmos a usar essa implementação primeiro sendo logoutButton uma função
    //await expect(loginPage.logoutButton()).toBeVisible()

    //e por fim essa quando convertemos o elemento como propriedade (veja login.page.ts)
    // await expect(loginPage.logoutButton).toBeVisible()

     //porém finalizamos após a componentização e criação de navbar
      await expect(navbar.logout).toBeVisible()
})

test('não deve autenticar com senha incorreta', async ({ page }) => {
    // Act - execução da ação
    await loginPage.login('buzz@lunarpass.dev', '12345')

    // Assert - verificar o resultado
    await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('não deve autenticar com e-mail não cadastrado', async ({ page }) => {
    // Act - execução da ação
    await loginPage.login('404@lunarpass.dev', 'pwd123')

    // Assert - verificar o resultado
    const alert = page.getByRole('alert')
    await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('não deve autenticar quando a senha não é informada', async ({ page }) => {
    // Act - execução da ação
    await loginPage.login('404@lunarpass.dev', '')

    // Assert - verificar o resultado
    const alert = page.getByRole('alert')
    await expect(loginPage.alert).toHaveText('Informe a senha')
})

test('não deve autenticar quando o e-mail não é informado', async ({ page }) => {
    // Act - execução da ação
    await loginPage.login('', 'pwd123')

    // Assert - verificar o resultado
    const alert = page.getByRole('alert')
    await expect(loginPage.alert).toHaveText('Informe um e-mail válido')
})

test('não deve autenticar quando não informo nem e-mail e nem senha', async ({ page }) => {
    // Act - execução da ação
    await loginPage.login('', 'pwd123')

    // Assert - verificar o resultado
    const alert = page.getByRole('alert')
    await expect(loginPage.alert).toHaveText('Informe um e-mail válido')
})
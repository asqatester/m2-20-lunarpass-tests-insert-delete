import { Page, Locator, expect } from '@playwright/test'


//padrão de projeto de PageObjects diz que devo implementar propriedades e funções que representam apenas aquela página

export class LoginPage {
    //readonly é somente leitura
    readonly page: Page
    readonly alert: Locator
    //isso abaixo saiu após criarmos a navbar.ts
    // readonly logoutButton: Locator

    constructor(page: Page) {
        this.page = page
        this.alert = page.getByRole('alert')
        //isso abaixo saiu após criarmos a navbar.ts
        //  this.logoutButton = page.getByRole('button', { name: 'Sair' })
    }

    async go() {
        await this.page.goto('http://localhost:3000/mission-control/login')

        const title = this.page.getByRole('heading', { name: 'Mission Control' })
        await expect(title).toBeVisible()
    }

    async login(email: string, password: string) {
        await this.page.getByLabel('E-mail').fill(email)
        await this.page.getByLabel('Senha').fill(password)
        await this.page.getByRole('button', { name: 'Entrar' }).click()
    }

    //  função tratada na aula Componentes e PageObjects e substituida pela logoutButton()
    //  async isLoggedUser(){
    //      const logoutButton = this.page.getByRole('button', {name: 'Sair'})
    //      await expect(logoutButton).toBeVisible()
    //}

    //porém, não há necessidade de colocar esse elemento na função abaixo se o mesmo pode ser declarado como uma propriedade redonly (veja isso declarado na abertura dessa classe acima e no construtor)

    //logoutButton() {
    //  return this.page.getByRole('button', { name: 'Sair' })//a busca de elementos não precisa de await
    //}

}
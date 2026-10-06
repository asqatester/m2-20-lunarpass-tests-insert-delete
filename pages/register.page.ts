import { Page, Locator, expect } from '@playwright/test'

//contrato
import { Mission } from '../support/mission'

export class RegisterPage {
    readonly page: Page
    readonly title: Locator
    readonly alert: Locator

    constructor(page: Page) {
        this.page = page
        this.title = page.getByRole('heading', { name: 'Programar missão' })
        this.alert =page.getByRole('alert')
    }

    //atender ao contrato Mission
    async submit(mission: Mission) {
        await this.page.getByRole('textbox', { name: 'ID da missão' }).fill(mission.id)
        await this.page.getByRole('textbox', { name: 'Foguete' }).fill(mission.rocket)
        await this.page.getByLabel('Base lunar').selectOption(mission.lunarBase)
        await this.page.getByRole('textbox', { name: 'Data de partida' }).fill(mission.departureDate)
        await expect(this.page.getByTestId('mission-form-return-date')).toContainText(mission.returnDate)
        await this.page.getByRole('spinbutton', { name: 'Preço por passagem (USD)' }).fill(mission.price)

        await this.page.getByRole('button', { name: 'Salvar missão' }).click()
    }
}
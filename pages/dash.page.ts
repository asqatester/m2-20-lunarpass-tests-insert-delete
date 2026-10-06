import { Page, Locator, expect } from '@playwright/test'

export class DashPage {
    readonly page: Page
    readonly addButton: Locator

    constructor(page: Page) {
        this.page = page
        this.addButton = page.getByRole('button', { name: 'Nova missão' })
    }
}
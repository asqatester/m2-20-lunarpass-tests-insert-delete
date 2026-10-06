//essa classe foi criada por se tratar de componentes identificados no header  e não elemetos de uma única page

import { Page, Locator, expect } from '@playwright/test'

export class NavBar {
    readonly page: Page
    readonly logout: Locator

    constructor(page: Page) {
        this.page = page
        this.logout = page.getByRole('button', { name: 'Sair' })
    }
}
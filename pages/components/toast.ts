//essa classe foi criada por se tratar de componentes identificados no header  e não elemetos de uma única page

import { Page, Locator, expect } from '@playwright/test'

export class Toast {
    readonly page: Page
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.message = page.getByRole('listitem')
    }
}
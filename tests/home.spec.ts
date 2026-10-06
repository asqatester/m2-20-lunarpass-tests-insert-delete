import { test, expect } from '@playwright/test'

test('deve validar o titulo na aba do navegador', async ({ page }) => {
  // ARRANGE - preparação do cenário
  await page.goto('http://localhost:3000/')

  //ACT - Execução da ação
  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/Playwright/)
  await expect(page).toHaveTitle('Lunar Pass — Passagens para a Lua')

  // sobre substring que vem por padrão ao criar um projeto PW (que tem o barra barra)
  // se quiser testar só o nome da aplicação, uso o entre barras (/ /), aí ele faz um substring 
  // que usa o modelo de contains e não de igual pra fazer a verificação. Assim ele apenas 
  // acessa a aba do navegador e verifica se contem o texto indicado

  // ASSERT - Execução da ação
  //await expect(page).toHaveTitle(/Lunas Pass/) //esse é para falhar msm
  await expect(page).toHaveTitle(/Lunar Pass/)

})

test('deve exibir o slogan na homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/')

 const slogan = page.getByRole('heading', {name: 'Sua viagem para a Lua começa aqui.'})
 await expect(slogan).toBeVisible()
})



describe('Dashboard test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    const buttons = cy.get('button')

    buttons.should('have.length', 3)
  })

  it('Should go to /student/list when click on second button', () => {
    cy.visit('/')
    const button = cy.get('button').eq(1)
    button.click()
    cy.location('href').should('eq', 'http://localhost:4200/student/list')
  })
})

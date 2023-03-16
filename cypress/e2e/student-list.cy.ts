describe('Student list test', () => {
  beforeEach(() => {
    const endPoint = 'http://127.0.0.1:5000/api/v1/students/simple'
    cy.intercept('GET', endPoint, {fixture: 'students.json'}).as('students')
    cy.visit('/student/list')
  })

  it('Should render 3 rows in the table', () => {
    const rows = cy.get('table tbody').find('tr')
    rows.should('have.length', 3)
  })

  it('Should check every student checkboxes', () => {
    const headerCheckbox = cy.get('#check-uncheck-all')
    const studentCheckboxes = cy.get('table tbody tr>td input.student-check')
    headerCheckbox.check()
    studentCheckboxes.should('be.checked')
  })

  it('Should uncheck every student checkboxes if header was unchecked', () => {
    const headerCheckbox = cy.get('#check-uncheck-all')
    const studentCheckboxes = cy.get('table tbody tr>td input.student-check')
    headerCheckbox.check()
    headerCheckbox.uncheck()
    studentCheckboxes.should('not.be.checked')
  })

  it('Should uncheck header checkbox if at least one student checkbox is unchecked', () => {
    const headerCheckbox = cy.get('#check-uncheck-all')
    const studentCheckbox = cy.get('table tbody tr>td input.student-check').eq(1)
    headerCheckbox.check()
    studentCheckbox.uncheck()
    headerCheckbox.should('not.be.checked')
  })

  it('Should check back header, if user check all of student-checkbox', () => {
    const headerCheckbox = cy.get('#check-uncheck-all')
    const studentCheckbox = cy.get('table tbody tr>td input.student-check').eq(1)
    headerCheckbox.check()
    studentCheckbox.uncheck()
    studentCheckbox.check()
    headerCheckbox.should('be.checked')
  })

  it('Should display table on id ascending order', () => {
    const firstTd = cy.get('table tbody tr td:nth-child(2)')
    firstTd.contains('1')
  })

  it('Should sort table on descending order after click on Id header', () => {
    const idTdHeader = cy.get('table thead tr th:nth-child(2)')
    idTdHeader.click()
    const firstTd = cy.get('table tbody tr td:nth-child(2)')
    firstTd.contains(3)
  })

  it ('Should sort table on lastName ascending after click on Lastname header', () => {
    const tdHeader = cy.get('table thead tr th:nth-child(3)')
    tdHeader.click()
    const firstTd = cy.get('table tbody tr td:nth-child(3)')
    firstTd.contains('Aubert')
  })

  it ('Should sort table on lastName descending order after click on Lastname header', () => {
    const tdHeader = cy.get('table thead tr th:nth-child(3)')
    tdHeader.click().click()
    const firstTd = cy.get('table tbody tr td:nth-child(3)')
    firstTd.contains('Zigtop')
  })
})

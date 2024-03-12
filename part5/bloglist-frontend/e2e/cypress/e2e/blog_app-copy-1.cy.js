describe('Blog app', function () {
  /* it('front page can be opened', function() {
    cy.request('POST','http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000/')
    cy.contains('Log into application')
    //cy.contains('sucessfully logged in!')
  }) */
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const u1 = {
      name: 'one',
      username: 'testuserone',
      password: 'pwone'
    }

    const u2 = {
      name: 'two',
      username: 'testusertwo',
      password: 'pw2'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', u1)
    cy.request('POST', 'http://localhost:3001/api/users/', u2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log into application')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function () {
    it('succeeds with right credentials', function () {
      cy.get('#username', { force: true }).type('testuserone')
      cy.get('#password', { force: true }).type('pwone')
      //cy.get('#login-button').click({force: true})
      cy.get('#login-button', { force: true }).click()
      cy.contains('testuserone - sucessfully logged in!')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username', { force: true }).type('testuserone')
      cy.get('#password', { force: true }).type('wrong pw')
      cy.get('#login-button', { force: true }).click()
      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    it('A blog can be created', function () {
      cy.get('#username', { force: true }).type('testuserone')
      cy.get('#password', { force: true }).type('pwone')
      cy.get('#login-button', { force: true }).click()
      //cy.get('#login-button').click({force: true})
      cy.contains('testuserone - sucessfully logged in!')
      cy.contains('create a new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#create-button').click({ force: true })
      cy.contains('test title')
    })
    it('user can add likes', function () {
      cy.get('#username', { force: true }).type('testuserone')
      cy.get('#password', { force: true }).type('pwone')
      cy.get('#login-button', { force: true }).click()
      cy.contains('create a new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#create-button').click({ force: true })
      cy.contains('test title')
      cy.wait(1000)
      cy.contains('Show').click()
      cy.contains('0').contains('like').click()
      cy.get('#like-button').click()
      cy.contains('1')
    })
    it('user can delete blog', function () {
      cy.get('#username', { force: true }).type('testuserone')
      cy.get('#password', { force: true }).type('pwone')
      cy.get('#login-button', { force: true }).click()
      cy.contains('create a new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#create-button').click()
      cy.get('#show-button').click()
      cy.get('#remove-button').click()
      cy.wait(5000)
      cy.contains('test title').should('not.exist')
    })
    it('only user who created their blog can delete it', function () {
      cy.get('#username', { force: true }).type('testuserone')
      cy.get('#password', { force: true }).type('pwone')
      cy.get('#login-button', { force: true }).click()
      cy.contains('create a new blog').click()
      cy.get('#title').type('about to be deleted by user who created it')
      cy.get('#author').type('test author')
      cy.get('#url').type('http://testurl.com')
      cy.get('#create-button').click()
      cy.contains('Show').click()
      cy.get('#remove-button').click()
      //cy.contains('about to be deleted by user who created it').should('not.exist')
    })
    it('blogs are ordered by likes', function () {
      cy.get('#username', { force: true }).type('testuserone')
      cy.get('#password', { force: true }).type('pwone')
      cy.get('#login-button', { force: true }).click()
      cy.contains('create a new blog').click()
      cy.get('#title').type('most liked blog')
      cy.get('#author').type('kkkk')
      cy.get('#url').type('https://www.obrigado.com')
      cy.get('#create-button').click({ force: true })

      cy.contains('create a new blog').click()
      cy.get('#title').type('second most liked blog')
      cy.get('#author').type('gggg')
      cy.get('#url').type('https://www.obrigadissimo.com')
      cy.get('#create-button').click({ force: true })

      cy.contains('most liked blog')
      cy.get('#show-button').click()
      cy.get('button').contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'most liked blog')
      cy.get('.blog').eq(1).should('contain', 'second most liked blog')
    })
  })
})
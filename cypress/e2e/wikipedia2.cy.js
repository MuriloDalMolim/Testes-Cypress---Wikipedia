describe('CCH Cypress - Wikipedia (Versão Otimizada)', () => {

    beforeEach(() => {
        cy.viewport(1280, 720)                  // Ajusta o tamanho da tela no navegador
        cy.visit('https://pt.wikipedia.org/')   // Faz com que o navegador abra a home do site
    })

    it('1# Buscar por algum conteúdo', () => {
        
        cy.get('#searchInput').type('software')     // Encontra o campo de busca e digita a palavra "software" 
        cy.get('form#searchform button').click()    // Encontra e clica no botão de pesquisar

        cy.url().should('include', '/wiki/Software')                    // Captura URL atual e verifica se "/wiki/Software" esta incluído
        cy.get('#firstHeading').should('have.text', 'Software')         // Verifica se o título da página possui a palavra "Software"
    })


    it('2# Navegar pelo menu lateral', () => {
        
        cy.get('#vector-main-menu-dropdown').click()    // Encontra e clica no menu da barra lateral
        cy.get('#n-randompage a').click()               // Encontra e clica no campo de página aleatória

        cy.url().should('not.include', 'Página_principal')  // Captura a URL atual e verifica se "Página_principal não esta incluído"
        cy.get('#firstHeading').should('be.visible')        // Verifica se a página carregou com conteúdo, olhando para o firstHeading
    })


    it('3# Alterar o idioma da página', () => {
        
        // Encontra e clica forçadamente no primeiro link para mudar o idioma 
        cy.get('.interlanguage-link-target[lang="en"]').first().click({ force: true }) 

        cy.origin('https://en.wikipedia.org', () => {                  // Cria uma sessão segura para a página em inglês
            cy.url().should('include', 'en.wikipedia.org')             // Captura a URL atual e verifica se o domínio esta na versão em inglês
            cy.contains('Welcome to Wikipedia').should('be.visible')   // Procura por um texto que só existe na versão em inglês
        })
    })

    
    it('4# Verificação visual', () => {
        
        cy.get('.mw-logo').should('be.visible')     // Procura pela logo e verifica se ela carregou corretamente
        cy.get('#footer').should('be.visible')      // Procura pelo rodapé e verifica se ela carregou corretamente
        cy.get('#footer-info-copyright').should('be.visible') // Procura pelos direitos autorais e verifica se eles carregaram corretamente 
    })

})
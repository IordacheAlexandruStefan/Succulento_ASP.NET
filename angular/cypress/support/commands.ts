Cypress.Commands.add('login', (username, password) => {
    cy.visit('/account'); // Navighează la pagina de login
    cy.get('input[name="username"]').type(username); // Completează câmpul utilizator
    cy.get('input[name="password"]').type(password); // Completează câmpul parolă
    cy.get('button[type="submit"]').click(); // Apasă pe butonul de login
  });

  Cypress.Commands.add('randCart', () => {
      const user = ['admin', 'user'];
      const choice = Math.round(Math.random());

      cy.login(user[choice], 'Password123!');

      cy.get('.grid-item').then((products) => {
          const productCount = products.length;
          const uniqueProducts = [];

          // Creează o listă de produse unice și număr de click-uri random pentru fiecare
          const randomProductCount = Math.floor(Math.random() * (productCount - Math.floor(productCount/2))) + Math.floor(productCount/2); // Număr random de produse unice între 1 și total
          while (uniqueProducts.length < randomProductCount) {
              const randomIndex = Math.floor(Math.random() * productCount); // Index random
              if (!uniqueProducts.includes(randomIndex)) {
                  uniqueProducts.push(randomIndex);
              }
          }

          // Adaugă produsele în coș pe baza array-urilor generate
          uniqueProducts.forEach((productIndex, i) => {
              cy.get('.grid-item').eq(productIndex).find('button.add-to-cart-btn').click();
          });

          cy.get('a.nav-link[routerLink="/cart"]').click();

          // Verifică numărul de produse unice în coș
          cy.get('.cart-item').should('have.length', uniqueProducts.length);
      });
  });
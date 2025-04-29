describe('Shop', () => {
    it('should display the list of products for regular User', () => {
        cy.login('user', 'Password123!');
        cy.get('.grid-item').should('have.length.greaterThan', 0);
    });

    it('should display the list of products for Admin User', () => {
        cy.login('admin', 'Password123!');
        cy.get('.grid-item').should('have.length.greaterThan', 0);
    });

    it('should add products to the cart for regular User', () => {
        cy.login('user', 'Password123!');

        cy.get('.grid-item').then((products) => {
            const productCount = products.length;
            const uniqueProducts = [];
            const clickCounts = [];

            // Creează o listă de produse unice și număr de click-uri random pentru fiecare
            const randomProductCount = Math.floor(Math.random() * productCount) + 1; // Număr random de produse unice între 1 și total
            while (uniqueProducts.length < randomProductCount) {
                const randomIndex = Math.floor(Math.random() * productCount); // Index random
                if (!uniqueProducts.includes(randomIndex)) {
                    uniqueProducts.push(randomIndex);
                    clickCounts.push(Math.floor(Math.random() * 5) + 1); // Număr random de click-uri între 1 și 5
                }
            }

            // Adaugă produsele în coș pe baza array-urilor generate
            uniqueProducts.forEach((productIndex, i) => {
            for (let j = 0; j < clickCounts[i]; j++) {
                cy.get('.grid-item').eq(productIndex).find('button.add-to-cart-btn').click(); // Click pe produsul specific
            }
            });

            cy.get('a.nav-link[routerLink="/cart"]').click();

            // Verifică numărul de produse unice în coș
            cy.get('.cart-item').should('have.length', uniqueProducts.length);

            // Verifică cantitățile pentru fiecare produs
            uniqueProducts.forEach((productIndex, i) => {
                cy.get('.cart-item')
                .eq(i)
                .find('input[type="number"]') // Selector pentru câmpul cantitate
                .should('have.value', String(clickCounts[i])); // Verifică dacă valoarea cantității este corectă
            });
        });
    });

    it('should add products to the cart for Admin User', () => {
        cy.login('admin', 'Password123!');

        cy.get('.grid-item').then((products) => {
            const productCount = products.length;
            const uniqueProducts = [];
            const clickCounts = [];

            // Creează o listă de produse unice și număr de click-uri random pentru fiecare
            const randomProductCount = Math.floor(Math.random() * productCount) + 1; // Număr random de produse unice între 1 și total
            while (uniqueProducts.length < randomProductCount) {
                const randomIndex = Math.floor(Math.random() * productCount); // Index random
                if (!uniqueProducts.includes(randomIndex)) {
                    uniqueProducts.push(randomIndex);
                    clickCounts.push(Math.floor(Math.random() * 5) + 1); // Număr random de click-uri între 1 și 5
                }
            }

            // Adaugă produsele în coș pe baza array-urilor generate
            uniqueProducts.forEach((productIndex, i) => {
            for (let j = 0; j < clickCounts[i]; j++) {
                cy.get('.grid-item').eq(productIndex).find('button.add-to-cart-btn').click(); // Click pe produsul specific
            }
            });

            cy.get('a.nav-link[routerLink="/cart"]').click();

            // Verifică numărul de produse unice în coș
            cy.get('.cart-item').should('have.length', uniqueProducts.length);

            // Verifică cantitățile pentru fiecare produs
            uniqueProducts.forEach((productIndex, i) => {
                cy.get('.cart-item')
                .eq(i)
                .find('input[type="number"]') // Selector pentru câmpul cantitate
                .should('have.value', String(clickCounts[i])); // Verifică dacă valoarea cantității este corectă
            });
        });
    });
});
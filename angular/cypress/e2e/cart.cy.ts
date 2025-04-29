describe('Cart', () => {
    beforeEach(() => {
        cy.randCart();
    });

    it('should clear the cart', () => {
        cy.get('.cart-actions button').first().click();
        cy.get('.cart-item').should('have.length', 0);
    });

    it('should remove items from the cart', () => {
        cy.get('.cart-item').then((initialProducts) => {
          const itemstoRemove = Math.floor(Math.random() * initialProducts.length/2) + 1; // Număr random de elemente de șters
          const itemsRemoved = []; // Stochează produsele șterse
      
          for (let i = 0; i < itemstoRemove; i++) {
            cy.get('.cart-item') // Obține lista actualizată a produselor
              .then((products) => {
                const itemtoRemove = Math.floor(Math.random() * products.length); // Index random pentru produs
                cy.wrap(products[itemtoRemove]) // Selectează produsul de șters
                  .find('p.product-name') // Obține numele produsului
                  .invoke('text') // Extrage textul
                  .then((name) => {
                    itemsRemoved.push(name); // Adaugă numele în lista de produse șterse
                  });
      
                cy.wrap(products[itemtoRemove]) // Selectează produsul de șters
                  .find('button[class="remove-button"]').click(); // Apasă pe butonul de ștergere
              });
          }
      
          // Verifică numărul de produse din coș după ștergeri
          cy.get('.cart-item').should('have.length', initialProducts.length - itemstoRemove);
      
          // Verifică că produsele șterse nu mai există
          itemsRemoved.forEach((removedItem) => {
            cy.get('.cart-item').should('not.contain.text', removedItem); // Verifică că produsul nu mai este prezent
          });
        });
      });

    it('should modify the quantity and price of the products manually', () => {
        cy.get('.cart-item').then((products) => {
            var total = 0;

            for(let i = 0; i < products.length; i++) {
                var originalPrice: number;
                cy.get('.cart-item')
                    .eq(i)
                    .find('p.item-total')
                    .invoke('text') // Obține textul din elementul `p.item-total`
                    .then((text) => {
                        originalPrice = Number(text.replace('$', '').replace(',', '')); // Elimină `$` și `,` și convertește în număr
                    });
                const randQuantity = Math.floor(Math.random() * 50) + 50; // generăm o cantitate între 50 şi 100
                cy.get('.cart-item').eq(i).find('input[type="number"]').clear().type(String(randQuantity));
                cy.get('.cart-item').eq(i).find('input[type="number"]').should('have.value', String(randQuantity));
                cy.get('.cart-item')
                    .eq(i)
                    .find('p.item-total')
                    .invoke('text') // Obține textul din elementul `p.item-total`
                    .then((text) => {
                        const extractedPrice = Number(text.replace('$', '').replace(',', '')); // Elimină `$` și `,` și convertește în număr
                        expect(extractedPrice.toFixed(2)).to.equal((originalPrice * randQuantity).toFixed(2)); // Validează că prețul este corect
                        total += Number(extractedPrice.toFixed(2));
                    });
            }

            cy.get('.cart-actions')
                .find('span.final-price')
                .invoke('text')
                .then((text) => {
                    const price = Number(text.replace('Total: $', '').replace(',', ''))
                    expect(price.toFixed(2)).to.equal(total.toFixed(2))
                });
        });
    });

    it('should modify the quantity and price of the products through buttons', () => {
        cy.get('.cart-item').then((products) => {
            var total = 0;

            for(let i = 0; i < products.length; i++) {
                var originalPrice: number;
                cy.get('.cart-item')
                    .eq(i)
                    .find('p.item-total')
                    .invoke('text') // Obține textul din elementul `p.item-total`
                    .then((text) => {
                        originalPrice = Number(text.replace('$', '').replace(',', '')); // Elimină `$` și `,` și convertește în număr
                    });
                const randQuantityplus = Math.floor(Math.random() * 25) + 10; // generăm numărul de apăsări a tastei + între 10 şi 35
                const randQuantityminus = Math.floor(Math.random() * 5) + 5; // generăm numărul de apăsări a tastei - între 5 şi 10
                for(let j = 0; j < randQuantityplus; j++) {
                    cy.get('.cart-item').eq(i).find('.quantity-controls button').last().click();
                }
                for(let j = 0; j < randQuantityminus; j++) {
                    cy.get('.cart-item').eq(i).find('.quantity-controls button').first().click();
                }
                cy.get('.cart-item').eq(i).find('input[type="number"]').should('have.value', String(randQuantityplus - randQuantityminus + 1));
                cy.get('.cart-item')
                    .eq(i)
                    .find('p.item-total')
                    .invoke('text') // Obține textul din elementul `p.item-total`
                    .then((text) => {
                        const extractedPrice = Number(text.replace('$', '').replace(',', '')); // Elimină `$` și `,` și convertește în număr
                        expect(extractedPrice.toFixed(2)).to.equal((originalPrice * (randQuantityplus - randQuantityminus + 1)).toFixed(2)); // Validează că prețul este corect
                        total += Number(extractedPrice.toFixed(2));
                    });
            }

            cy.get('.cart-actions')
                .find('span.final-price')
                .invoke('text')
                .then((text) => {
                    const price = Number(text.replace('Total: $', '').replace(',', ''))
                    expect(price.toFixed(2)).to.equal(total.toFixed(2))
                });
        });
    });
});
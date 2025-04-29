describe('Admin Dashboard', () => {
    beforeEach(() => {
      cy.login('admin', 'Password123!');
      cy.get('a.nav-link[routerLink="/admin"]').click();
    });
  
    it('should display the list of products', () => {
      cy.get('table.table tbody tr').should('have.length.greaterThan', 0);
    });
  
    it('should add new products', () => {
      cy.get('table.table tbody tr').then((initialProducts) => {
        const randProducts = Math.floor(Math.random() * 19) + 1; // Număr aleatoriu de produse
        const prices = [];
    
        for (let i = 0; i < randProducts; i++) {
          cy.get('input#productName').type(`New Succulent ${i + 1}`);
          cy.get('input#productDescription').type(`The ${i + 1}nth beautiful succulent`);
          const randPrice = (Math.random() * 98.99 + 1).toFixed(2); // Generare preț aleatoriu cu 2 zecimale
          cy.get('input#productPrice').type(randPrice);
          prices.push(randPrice);
          cy.get('input#productImageUrl').type(`http://example.com/succulent${i + 1}.jpg`);
          cy.get('button[type="submit"]').click();
        }
    
        // Verifică numărul total de produse
        cy.get('table.table tbody tr').should('have.length', initialProducts.length + randProducts);
    
        for (let i = initialProducts.length; i < initialProducts.length + randProducts; i++) {
          cy.get('table.table tbody tr').eq(i).within(() => {
            // Verifică celulele individuale (numele, descrierea și prețul)
            cy.get('td').eq(0).should('have.text', `New Succulent ${i - initialProducts.length + 1}`);
            cy.get('td').eq(1).should('have.text', `The ${i - initialProducts.length + 1}nth beautiful succulent`);
            cy.get('td').eq(2).should('have.text', `$${prices[i - initialProducts.length]}`);
          });
        }
      });
    });    
  
    it('should edit all products with "New Succulent" prefix randomly', () => {
      const editMatchingRows = (rowIndex = 0) => {
        // Obținem numărul total de rânduri din tabel în starea curentă a DOM-ului
        cy.get('table.table tbody tr')
          .its('length')
          .then((totalRows) => {
            if (rowIndex < totalRows) {
              // Reinterogăm rândul curent ca să ne asigurăm că este actualizat
              cy.get('table.table tbody tr').eq(rowIndex)
                .find('td').eq(0)
                .invoke('text')
                .then((text) => {
                  if (text.includes('New Succulent')) {
                    // Determină aleator dacă se editează rândul (50% șansă)
                    const shouldEdit = Math.random() > 0.5;
                    if (shouldEdit) {
                      cy.log(`Editing product at row ${rowIndex}`);
                      cy.get('table.table tbody tr').eq(rowIndex)
                        .find('button.btn-primary')
                        .click();
        
                      // Definim noile valori pentru nume și preț
                      const newName = `Updated Succulent ${rowIndex + 1}`;
                      const newPrice = (Math.random() * 100).toFixed(2);
        
                      // Edităm produsul
                      cy.get('input#productName').clear().type(newName);
                      cy.get('input#productPrice').clear().type(newPrice);
                      cy.get('button[type="submit"]').click();
        
                      // După actualizare, reinterogăm rândul pentru a verifica modificările
                      cy.get('table.table tbody tr').eq(rowIndex).within(() => {
                        cy.get('td').eq(0).should('have.text', newName);
                        cy.get('td')
                          .eq(2)
                          .should(
                            'have.text',
                            `$${Number(newPrice).toLocaleString('en-US', {
                              minimumFractionDigits: 2
                            })}`
                          );
                      });
                    }
                  }
                })
                .then(() => {
                  // Trecem la următorul rând indiferent că am editat sau nu
                  editMatchingRows(rowIndex + 1);
                });
            } else {
              cy.log('Finished editing matching products.');
            }
          });
      };
    
      editMatchingRows();
    });    

    it('should delete all products that contain "Succulent"', () => {
      const deleteNextSucculent = () => {
        cy.get('table.table tbody tr').then(($rows) => {
          // Căutăm primul rând care conține textul "Succulent"
          const matchingRow = $rows.toArray().find((row) => {
            return Cypress.$(row).find('td').first().text().includes('Succulent');
          });
          
          if (matchingRow) {
            // Am găsit un rând cu "Succulent", deci îl ștergem
            cy.wrap(matchingRow).find('button.btn-danger').click().then(() => {
              // Așteptăm puțin pentru ca DOM-ul să se actualizeze
              cy.wait(500);
              // Reapelăm funcția pentru a căuta următorul rând corespunzător
              deleteNextSucculent();
            });
          } else {
            // Nu mai avem produse cu "Succulent", deci finalizăm
            cy.log('All products containing "Succulent" have been deleted.');
          }
        });
      };
    
      // Pornim procesul de ștergere
      deleteNextSucculent();
    
      // Verificăm că în tabel nu mai apare niciun produs cu "Succulent"
      cy.get('table.table tbody tr').each((row) => {
        cy.wrap(row)
          .find('td')
          .first()
          .invoke('text')
          .should('not.include', 'Succulent');
      });
    });    
    
    it('should not be accessible as a regular User', () => {
      cy.visit('/account');
      cy.get('button[class="btn btn-warning"]').click();
      cy.login('user', 'Password123!');
      cy.get('a.nav-link[routerLink="/admin"]').should('not.exist');
    });
  });
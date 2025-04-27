describe('Account', () => {
    beforeEach(() => {
      cy.visit('/account');
    });

    it('should fail for invalid password format', () => {
      cy.get('button[class="btn btn-secondary"]').click();

      cy.get('input[name="username"]').type('usertest1');
      cy.get('input[name="password"]').type('Password123'); // Parolă invalidă conform cerințelor
      cy.get('input[name="nume"]').type('Userescu');
      cy.get('input[name="prenume"]').type('Useru');
      cy.get('input[name="email"]').type('user1.userescu@gmail.com');
      cy.get('button[type="submit"]').click();
  
      // Verifică dacă mesajul de eroare apare pe pagină
      cy.get('.error-message').should('contain.text', 'Password must contain at least one capital letter, one small letter, a number, and a special character.');
    });

    it('should register successfully with valid password format', () => {
        cy.get('button[class="btn btn-secondary"]').click();

        cy.get('input[name="username"]').type('usertest');
        cy.get('input[name="password"]').type('Password123!');
        cy.get('input[name="nume"]').type('Userescu');
        cy.get('input[name="prenume"]').type('Useru');
        cy.get('input[name="email"]').type('user.userescu@gmail.com');
        cy.get('button[type="submit"]').click();

        // Verifică dacă mesajul de succes apare pe pagină
        cy.get('.success-message').should('contain.text', 'Registration successful!');
    });

    it('should fail to register for username that already exists', () => {
        cy.get('button[class="btn btn-secondary"]').click();

        cy.get('input[name="username"]').type('usertest');
        cy.get('input[name="password"]').type('Password123!');
        cy.get('input[name="nume"]').type('Userescu');
        cy.get('input[name="prenume"]').type('Useru');
        cy.get('input[name="email"]').type('user3.userescu@ghendama.com');
        cy.get('button[type="submit"]').click();

        // Verifică dacă mesajul de eroare apare pe pagină
        cy.get('.error-message').should('contain.text', 'Username is already taken.');
    });

    it('should fail to login with wrong credentials', () => {
        cy.login('usertest1','Password123!');

        // Verifică dacă mesajul de eroare apare pe pagină
        cy.get('.error-message').should('contain.text', 'Username or password are wrong.');

        cy.login('usertest','Password123');

        // Verifică dacă mesajul de eroare apare pe pagină
        cy.get('.error-message').should('contain.text', 'Username or password are wrong.');
    });

    it('should login with correct credentials', () => {
        cy.login('usertest','Password123!');

        // Verifică dacă URL-ul s-a schimbat (ne-a autetificat)
        cy.url().should('include', '/shop');
    });

    it('should edit account information', () => {
        cy.login('usertest','Password123!');
        cy.wait(500);
        cy.visit('/account');

        // Stub pentru alerta de succes
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        // Actualizează câmpurile de editare
        cy.get('input[name="nume"]').type('UserescuNou');
        cy.get('input[name="prenume"]').type('UseruNou');
        cy.get('input[name="email"]').type('user.userescu@Nou.com');
        cy.get('button[type="submit"]').click();

        // Verificăm că alerta a fost apelată cu mesajul de succes așteptat
        cy.then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith('User updated successfully.');
        });
    });

    it('should delete account', () => {
        cy.login('usertest','Password123!');
        cy.wait(500);
        cy.visit('/account');

        // Stub pentru alerta de succes
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        // Ştergem contul
        cy.get('button[class="btn btn-danger"]').click();
        
        // Verificăm că alerta a fost apelată cu mesajul de succes așteptat
        cy.then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith('Account removed successfully.');
        });
    });
});
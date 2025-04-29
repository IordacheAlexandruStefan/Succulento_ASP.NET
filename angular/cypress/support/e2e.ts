// Exemplu pentru e2e.js
import './commands';

// Poți adăuga orice configurație globală aici
Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('Uncaught exception:', err);
  return false; // Previne întreruperea testelor
});
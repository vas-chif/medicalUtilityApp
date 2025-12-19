/**
 * @file it-IT/helpPage.ts
 * @description Italian translations for Help Page
 * @author Vasile Chifeac
 * @created 2025-12-19
 */

export default {
  title: 'Aiuto e Supporto',
  subtitle: 'Guide e FAQ per Medical Utility Pro',

  faq: {
    title: 'Domande Frequenti (FAQ)',
    items: [
      {
        q: 'Come funziona la modalità offline?',
        a: "L'applicazione è una Progressive Web App (PWA). Una volta installata sul dispositivo, può funzionare anche senza connessione internet per la maggior parte delle funzionalità.",
      },
      {
        q: 'I calcoli sono validati?',
        a: 'Sì, tutti i calcolatori sono basati su formule cliniche standard e letteratura scientifica validata. Tuttavia, verificare sempre i risultati.',
      },
      {
        q: 'Come posso segnalare un errore?',
        a: 'Puoi segnalare bug o errori direttamente tramite la pagina GitHub del progetto o contattando il supporto tecnico.',
      },
    ],
  },

  support: {
    title: 'Supporto Tecnico',
    text: 'Per ulteriore assistenza, contattare il team di sviluppo.',
    emailLabel: 'Email Supporto',
    action: 'Contattaci',
  },

  contactForm: {
    title: 'Contattaci',
    name: 'Nome',
    email: 'Email',
    message: 'Messaggio',
    send: 'Invia Messaggio',
    cancel: 'Annulla',
    success: 'Messaggio inviato con successo!',
    error: "Errore durante l'invio. Riprova più tardi.",
    terms: 'Accetto i Termini e Condizioni e la Privacy Policy',
    validation: {
      required: 'Campo obbligatorio',
      email: 'Inserisci un indirizzo email valido',
      terms: 'Devi accettare i termini per continuare',
    },
  },
};

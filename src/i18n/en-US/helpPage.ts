/**
 * @file en-US/helpPage.ts
 * @description English translations for Help Page
 * @author Vasile Chifeac
 * @created 2025-12-19
 */

export default {
  title: 'Help & Support',
  subtitle: 'Guides and FAQs for Medical Utility Pro',

  faq: {
    title: 'Frequently Asked Questions (FAQ)',
    items: [
      {
        q: 'How does offline mode work?',
        a: 'The application is a Progressive Web App (PWA). Once installed on your device, it can work without an internet connection for most features.',
      },
      {
        q: 'Are calculations validated?',
        a: 'Yes, all calculators are based on standard clinical formulas and validated scientific literature. However, always verify results.',
      },
      {
        q: 'How can I report a bug?',
        a: 'You can report bugs or errors directly via the project GitHub page or by contacting technical support.',
      },
    ],
  },

  support: {
    title: 'Technical Support',
    text: 'For further assistance, please contact the development team.',
    emailLabel: 'Support Email',
    action: 'Contact Us',
  },

  contactForm: {
    title: 'Contact Us',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    cancel: 'Cancel',
    success: 'Message sent successfully!',
    error: 'Error sending message. Please try again later.',
    terms: 'I accept the Terms and Conditions and Privacy Policy',
    validation: {
      required: 'Required',
      email: 'Please enter a valid email address',
      terms: 'You must accept the terms to continue',
    },
  },
};

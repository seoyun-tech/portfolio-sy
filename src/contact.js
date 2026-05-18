import emailjs from '@emailjs/browser';

const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

emailjs.init({ publicKey: PUBLIC_KEY });

export function initContactForm(formEl) {
  if (!formEl || formEl.dataset.emailjsInit) return;
  formEl.dataset.emailjsInit = '1';

  const btn      = formEl.querySelector('[type="submit"]');
  const feedback = formEl.querySelector('.form-feedback');

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    btn.disabled = true;
    btn.textContent = 'Sending…';
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formEl);
      feedback.textContent = "Message sent! I'll get back to you soon.";
      feedback.className = 'form-feedback is-success';
      btn.textContent = 'Sent!';
      formEl.reset();
    } catch {
      feedback.textContent = 'Something went wrong. Please try again.';
      feedback.className = 'form-feedback is-error';
      btn.disabled = false;
      btn.textContent = 'Send';
    }
  });
}

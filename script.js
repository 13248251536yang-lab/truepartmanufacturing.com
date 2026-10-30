document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('quoteForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.innerHTML : '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }
      if (status) status.textContent = 'Sending your inquiry. Please wait...';

      const formData = new FormData(form);
      formData.append('access_key', 'b360fe64-dc6f-4b19-97e9-19c1cf53c37a');
      formData.append('subject', 'New website inquiry - Truepart Manufacturing');
      formData.append('from_name', 'Truepart Manufacturing Website');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        if (result.success) {
          form.reset();
          if (status) status.textContent = 'Thank you. Your inquiry has been sent successfully. We will get back to you soon.';
        } else {
          if (status) status.textContent = 'Sorry, your inquiry could not be sent. Please try again or email truepartmanufacturing@gmail.com.';
        }
      } catch (error) {
        if (status) status.textContent = 'A connection error occurred. Please try again or email truepartmanufacturing@gmail.com.';
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }
      }
    });
  }
});

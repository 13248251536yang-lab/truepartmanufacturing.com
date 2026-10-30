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
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const company = String(data.get('company') || '').trim();
      const email = String(data.get('email') || '').trim();
      const project = String(data.get('project') || '').trim();
      const subject = encodeURIComponent('Manufacturing inquiry from ' + (company || name));
      const body = encodeURIComponent(
        'Hello Truepart Manufacturing,\n\n' +
        'Name: ' + name + '\n' +
        'Company: ' + company + '\n' +
        'Email: ' + email + '\n\n' +
        'Project details:\n' + project + '\n\n' +
        'Best regards,\n' + name
      );
      // Replace this placeholder with your real sales email before publishing.
      window.location.href = 'mailto:REPLACE-WITH-YOUR-EMAIL@example.com?subject=' + subject + '&body=' + body;
    });
  }
});

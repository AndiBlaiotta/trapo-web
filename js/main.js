// TRAPO - Scripts

document.addEventListener('DOMContentLoaded', () => {

  // Header con sombra al scrollear
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Toggle menú mobile
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Cerrar al clickear un link
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Scroll reveal con IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('visible'));
  }

  // Validación y envío del form de cotización
  const form = document.querySelector('#quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const required = ['nombre', 'telefono', 'email', 'tipoServicio'];
      let valid = true;
      required.forEach(name => {
        const field = form.querySelector(`[name="${name}"]`);
        if (!field || !field.value.trim()) {
          valid = false;
          field?.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      if (!valid) {
        alert('Por favor completá los campos obligatorios.');
        return;
      }

      // Armar mensaje de WhatsApp en formato de lista
      const lineas = [
        '*Nueva solicitud de cotización - TRAPO*',
        '',
        `👤 *Nombre:* ${data.get('nombre')}`,
        `📱 *Teléfono:* ${data.get('telefono')}`,
        `✉️ *Email:* ${data.get('email')}`,
        '',
        `🧹 *Tipo de servicio:* ${data.get('tipoServicio')}`,
      ];

      const frecuencia = data.get('frecuencia');
      if (frecuencia) lineas.push(`📅 *Frecuencia:* ${frecuencia}`);

      const ubicacion = data.get('ubicacion');
      if (ubicacion) lineas.push(`📍 *Ubicación:* ${ubicacion}`);

      const mensaje = data.get('mensaje');
      if (mensaje && mensaje.trim()) {
        lineas.push('');
        lineas.push(`💬 *Detalles adicionales:*`);
        lineas.push(mensaje.trim());
      }

      lineas.push('');
      lineas.push('_Mensaje enviado desde limpiezatrapo.com_');

      const texto = lineas.join('\n');
      const wa = `https://wa.me/5491149898607?text=${encodeURIComponent(texto)}`;
      window.open(wa, '_blank');
    });
  }

});

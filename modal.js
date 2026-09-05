// ==================== TELEGRAM BOT INTEGRATSIYASI ====================
const TELEGRAM_CONFIG = {
  token: '8961832617:AAELgbWLCXW5i8pBF4ZdXnKqjzT70Zfewys',
  chatId: '7751388515'
};

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('courseModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const leadForm = document.getElementById('telegramLeadForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccessMessage');
  const errorMsg = document.getElementById('formErrorMessage');
  const courseSelect = document.getElementById('selectedCourse');
  const phoneInput = document.getElementById('studentPhone');
  const nameInput = document.getElementById('studentName');

  if (!modal) return;

  window.openCourseModal = function(courseName = '') {
    if (courseName && courseSelect) {
      for (let opt of courseSelect.options) {
        if (opt.value.toLowerCase().includes(courseName.toLowerCase()) || 
            opt.text.toLowerCase().includes(courseName.toLowerCase())) {
          opt.selected = true;
          break;
        }
      }
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (nameInput) setTimeout(() => nameInput.focus(), 150);
  };

  function closeCourseModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    clearErrors();
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeCourseModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeCourseModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeCourseModal();
  });

  document.addEventListener('click', (e) => {
    const target = e.target.closest('.open-modal-btn, [data-course], a[href="#apply"], a[href="#contact"], button, .btn');
    if (!target) return;
    const txt = (target.textContent || '').toLowerCase();
    if (target.hasAttribute('data-course') || target.classList.contains('open-modal-btn') || 
        txt.includes('yozilish') || txt.includes("ro'yxat") || txt.includes('ariza')) {
      e.preventDefault();
      const course = target.getAttribute('data-course') || '';
      window.openCourseModal(course);
    }
  });

  if (phoneInput) {
    phoneInput.value = '+998 ';
    phoneInput.addEventListener('input', (e) => {
      let raw = e.target.value.replace(/\D/g, '');
      if (!raw.startsWith('998')) raw = '998' + raw;
      let f = '+998';
      if (raw.length > 3) f += ' ' + raw.substring(3, 5);
      if (raw.length > 5) f += ' ' + raw.substring(5, 8);
      if (raw.length > 8) f += ' ' + raw.substring(8, 10);
      if (raw.length > 10) f += ' ' + raw.substring(10, 12);
      e.target.value = f;
    });
    phoneInput.addEventListener('keydown', (e) => {
      if ((e.key === 'Backspace' || e.key === 'Delete') && phoneInput.value.trim() === '+998') {
        e.preventDefault();
      }
    });
  }

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  }

  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const digitsOnly = phoneVal.replace(/\D/g, '');
      const courseVal = courseSelect ? courseSelect.value : '';
      const formatVal = document.querySelector('input[name="format"]:checked')?.value || 'Oflayn';

      let isValid = true;
      if (nameVal.length < 3) {
        document.getElementById('nameError').textContent = 'To\'liq ism-familiyangizni kiriting';
        isValid = false;
      }
      if (digitsOnly.length !== 12) {
        document.getElementById('phoneError').textContent = 'Telefon raqamni to\'liq kiriting (+998 90 123 45 67)';
        isValid = false;
      }
      if (!courseVal) {
        document.getElementById('courseError').textContent = 'Iltimos, kursni tanlang';
        isValid = false;
      }

      if (!isValid) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Yuborilmoqda...</span>';
      successMsg.style.display = 'none';
      errorMsg.style.display = 'none';

      const text = `🎯 <b>Yangi o'quvchi arizasi! (Tayanch Ta'lim)</b>\n\n` +
                   `👤 <b>Ism:</b> ${escapeHTML(nameVal)}\n` +
                   `📞 <b>Telefon:</b> ${phoneVal}\n` +
                   `📚 <b>Kurs:</b> ${escapeHTML(courseVal)}\n` +
                   `🏛 <b>Format:</b> ${escapeHTML(formatVal)}\n` +
                   `📅 <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`;

      try {
        const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CONFIG.chatId,
            text: text,
            parse_mode: 'HTML'
          })
        });

        const data = await res.json();
        if (data.ok) {
          leadForm.reset();
          phoneInput.value = '+998 ';
          successMsg.style.display = 'block';
          setTimeout(() => { closeCourseModal(); }, 3000);
        } else {
          throw new Error(data.description || 'Xatolik');
        }
      } catch (err) {
        console.error(err);
        errorMsg.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Arizani tasdiqlash</span>';
      }
    });
  }
});

/* global html2pdf */

// Восстановление данных из localStorage при загрузке
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.editable').forEach(el => {
    const saved = localStorage.getItem(el.id);
    if (saved) el.innerHTML = saved;
  });
});

// Сохранение при выходе из редактирования
document.addEventListener('blur', (e) => {
  if (e.target.classList.contains('editable')) {
    localStorage.setItem(e.target.id, e.target.innerHTML);

    // Анимация сохранения
    e.target.classList.add('saved');
    setTimeout(() => {
      e.target.classList.remove('saved');
    }, 1000);
  }
}, true);



// Экспорт в PDF
document.getElementById('download-btn').addEventListener('click', () => {
  const element = document.getElementById('content');
  const rect = element.getBoundingClientRect();
  const topOffset = Math.round(rect.top);

  const fixedElements = [...document.querySelectorAll('*')].filter(el => {
    const style = window.getComputedStyle(el);
    return style.position === 'fixed' || style.position === 'sticky';
  });

  fixedElements.forEach(el => (el.style.display = 'none'));



  element.style.marginTop = `-${topOffset}px`;


  const opt = {
    margin: 0,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, scrollY: 0 },
    jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' },

  };

  html2pdf()
    .from(element)
    .set(opt)
    .save()
    .finally(() => {
      element.style.marginTop = '';
      fixedElements.forEach(el => (el.style.display = ''));
    });
});


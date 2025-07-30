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
// Перед генерацией PDF сделайте элементы не редактируемыми
document.querySelectorAll('[contenteditable="true"]').forEach(el => {
  el.setAttribute('data-contenteditable', 'true');
  el.setAttribute('contenteditable', 'false');
});
// Экспорт в PDF
document.getElementById('download-btn').addEventListener('click', () => {
  const element = document.querySelector('.resume');
const opt = {
  margin: 1,
  filename: 'resume.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true
  },
  jsPDF: {
    unit: 'cm',
    format: 'a4',
    orientation: 'portrait'
  }
};

  html2pdf().set(opt).from(element).save();
});
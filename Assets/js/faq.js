fetch('./Assets/faq.json')
  .then(response => response.json())
  .then(data => {
    const faqList = document.getElementById('faq-list');
    data.forEach((item, index) => {
      const faq = document.createElement('div');
      faq.classList.add('faq');

      faq.innerHTML = `
        <div class="question">${index + 1}. ${item.question}</div>
        <div class="answer" style="display: none;">${item.answer}</div>
      `;

      faqList.appendChild(faq);
    });
    const questions = document.querySelectorAll('.question');
    questions.forEach(q => {
      q.addEventListener('click', () => {
        q.classList.toggle('active');
        const answer = q.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      });
    });
  })
  .catch(error => console.error('Erro ao carregar o FAQ:', error));

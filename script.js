const typeEl = document.getElementById('type');
const bonusEl = document.getElementById('bonus');
const penaltyEl = document.getElementById('penalty');
const noteEl = document.getElementById('note');
const rollBtn = document.getElementById('roll');
const resultEl = document.getElementById('result');
const historyEl = document.getElementById('history');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function roll() {
  const outcome = OracleEngine.roll({
    type: typeEl.value,
    bonus: bonusEl.value,
    penalty: penaltyEl.value
  });
  const typeLabel = typeEl.options[typeEl.selectedIndex].text;
  const note = noteEl.value.trim();

  resultEl.classList.remove('shake');
  void resultEl.offsetWidth;
  resultEl.classList.add('shake');

  document.querySelector('.result-label').textContent =
    `${typeLabel.toUpperCase()} · DADO ${outcome.raw} · AJUSTE ${outcome.adjustment >= 0 ? '+' : ''}${outcome.adjustment}`;
  document.querySelector('.dice').textContent = String(outcome.total).padStart(2, '0');
  document.querySelector('.outcome').textContent = outcome.title;
  document.querySelector('.description').textContent =
    outcome.description + (note ? ` · ${note}` : '');

  const empty = historyEl.querySelector('.empty');
  if (empty) empty.remove();

  const li = document.createElement('li');
  li.className = 'entry';
  li.innerHTML = `<span>${escapeHtml(note || typeLabel)} · ${escapeHtml(outcome.title)}<small>Bruto: ${outcome.raw} | Ajuste: ${outcome.adjustment >= 0 ? '+' : ''}${outcome.adjustment}</small></span><b>${String(outcome.total).padStart(2, '0')}</b>`;
  historyEl.prepend(li);
}

rollBtn.addEventListener('click', roll);
document.getElementById('clear').addEventListener('click', () => {
  historyEl.innerHTML = '<li class="empty">Nenhuma rolagem registrada.</li>';
});

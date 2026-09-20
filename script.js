const form = document.querySelector("#form-habits");
const nlwSetup = new NLWSetup(form);
const button = document.querySelector('header button');

button.addEventListener('click', add);
form.addEventListener('change', save);

function getToday() {
  return new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

function add(){
  const today = getToday();
  const dayExists = nlwSetup.dayExists(today);
  if(dayExists) {
    toggleMessage('Dia já incluso 🔴', true);
    return;
  }
  nlwSetup.addDay(today);
  toggleMessage('Adicionado com sucesso 🟢', false);
}

function toggleMessage(msg, isError = false) {
  let toast = document.querySelector('#toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.background = isError ? '#f87171' : '#8b5cf6';
  toast.style.color = '#fff';
  toast.style.zIndex = '1000';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.remove(), 2500);
}

function save() {
  localStorage.setItem('NLWSetup@habits', JSON.stringify(nlwSetup.data));
}

const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {};
nlwSetup.setData(data);
nlwSetup.load();
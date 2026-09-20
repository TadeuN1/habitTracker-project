const form = document.querySelector("#form-habits");
const nlwSetup = new NLWSetup(form);
const button = document.querySelector('header button');
button.addEventListener('click', add);
form.addEventListener('change', save);
const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

function add(){
  const dayExists = nlwSetup.dayExists(today);
  if(dayExists) {
    return toggleMessage('Dia já incluso', true);
  }
  nlwSetup.addDay(today);
  toggleMessage('Adicionado com sucesso');
}
function save() {
    localStorage.setItem('NLWSetup@habits', JSON.stringify(nlwSetup.data));
}
const data= JSON.parse(localStorage.getItem("NLWSetup@habits")) || {}
nlwSetup.setData(data)
nlwSetup.load()

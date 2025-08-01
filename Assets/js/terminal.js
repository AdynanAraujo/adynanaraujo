const editor = document.getElementById('editor');
const output = document.getElementById('output');
const container = document.getElementById('container');
let bugs = [];
let chaosActive = false;

function spawnBugs(qtd = 40) {
  removeBugs();
  for (let i = 0; i < qtd; i++) {
    const bug = document.createElement('div');
    bug.classList.add('bug');
    bug.style.top = `${Math.random() * window.innerHeight}px`;
    bug.style.left = `${Math.random() * window.innerWidth}px`;
    bug.style.animationDuration = `${1.5 + Math.random() * 2}s`;
    document.body.appendChild(bug);
    bugs.push(bug);
  }
}

function removeBugs() {
  bugs.forEach(bug => bug.remove());
  bugs = [];
}

function activateChaos() {
  if (chaosActive) return;
  chaosActive = true;
  document.body.classList.add('flash');
  container.classList.add('shake');
  spawnBugs(50);
}

function deactivateChaos() {
  chaosActive = false;
  document.body.classList.remove('flash');
  container.classList.remove('shake');
  removeBugs();
}

function activeCodeEditor() {
  const iframe = document.getElementById('editorCodigo');
  iframe.style.display = "";
}

function desactiveCodeEditor() {
  const iframe = document.getElementById('editorCodigo');
  iframe.style.display = "none";
}

function closeTerminal() {
  const terminal = document.getElementById('container');
  terminal.style.display = "none";
}

function codeEditor(language) {
  const iframe = document.getElementById('editorCodigo');
  if (iframe) {
    iframe.src = `https://onecompiler.com/embed/${language}`;
    iframe.style.display = "";
  } else {
    console.error("Iframe com ID 'editorCodigo' não encontrado.");
  }
}

editor.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const command = editor.value.trim().toLowerCase();
    if (command === '') return;


    const line = document.createElement('div');
    line.innerHTML = `> <span translate="no"> ${command} </span>`;
    output.appendChild(line);


    while (output.children.length > 3) {
      output.removeChild(output.firstChild);
    }

    let recognized = false;

    switch (true) {

      case /code now (\w+)/.test(command): {
        const match = command.match(/code now (\w+)/);
        const language = match ? match[1] : null;
        if (language) {
          activeCodeEditor();
          codeEditor(language);
          recognized = true;
        }
        break;
      }


      case command.trim() === "code now": {
        const warning = document.createElement('div');
        warning.style.color = 'yellow';
        warning.textContent = 'Por favor, especifique a linguagem após "code now". Exemplo: code now python';
        output.appendChild(warning);
        recognized = true;
        break;
      }

      case command.includes('bug'):
        activateChaos();
        recognized = true;
        break;

      case command.includes('code close'):
        desactiveCodeEditor();
        recognized = true;
        break;

      case command.includes('exit'):
        closeTerminal();
        recognized = true;
        break;

      case command.includes('help'):
        const help = document.createElement('div');

        const texto = `[ code now ] Abre o editor de código
[ code close ] Fecha o editor
[ bug ] Cria bugs na tela
[ exit ] Fecha o terminal`;

        function formatarTextoComNoTranslate(text) {
          const linhas = text.split('\n');
          return linhas.map(linha =>
            linha.replace(/\[([^\]]+)\]/g, '<span translate="no">[$1]</span>')
          ).join('<br>');
        }

        help.innerHTML = formatarTextoComNoTranslate(texto);
        output.appendChild(help);
        recognized = true;
        break;

    }


    if (!recognized) {
      const notFound = document.createElement('div');
      notFound.style.color = 'red';

      notFound.innerHTML = `<span translate="no">'${command}'</span> não é comando válido.`;

      output.appendChild(notFound);
    }



    while (output.children.length > 3) {
      output.removeChild(output.firstChild);
    }

    output.scrollTop = output.scrollHeight;
    editor.value = '';
  }
});

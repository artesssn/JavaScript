// Coloque as 4 imagens na mesma pasta do HTML com estes nomes:
const IMAGEM_COMUM = "bau-comum.png";
const IMAGEM_RARO = "bau-raro.png";
const IMAGEM_EPICO = "bau-epico.png";
const IMAGEM_LENDARIO = "bau-lendario.png";

const RARIDADES = ["comum", "raro", "epico", "lendario"];
let idxRaridade = 0;
let jaExplodiu = false;

const imagemBau = document.getElementById("imagemBau");
const badgeRaridade = document.getElementById("badgeRaridade");
const bau = document.getElementById("bau");
const hint = document.getElementById("hint");
const finalOverlay = document.getElementById("finalOverlay");

const BADGE_CLASSES = ["raridade-comum", "raridade-raro", "raridade-epico", "raridade-lendario"];
const LABELS = ["Comum", "Raro", "Épico", "Lendário"];
const IMAGENS = [IMAGEM_COMUM, IMAGEM_RARO, IMAGEM_EPICO, IMAGEM_LENDARIO];

function setBadgeClass(idx) {
  for (const cls of BADGE_CLASSES) badgeRaridade.classList.remove(cls);
  badgeRaridade.classList.add(BADGE_CLASSES[idx]);
}

function atualizarVisual() {
  const raridade = RARIDADES[idxRaridade];
  bau.dataset.raridade = raridade;

  imagemBau.src = IMAGENS[idxRaridade];
  imagemBau.alt = `Baú ${LABELS[idxRaridade].toLowerCase()}`;

  badgeRaridade.textContent = LABELS[idxRaridade];
  setBadgeClass(idxRaridade);

  if (idxRaridade === RARIDADES.length - 1) {
    hint.textContent = "Agora clique de novo… (vai explodir e mostrar a surpresa).";
  } else {
    hint.textContent = "Raridades: Comum → Raro → Épico → Lendário → Explosão.";
  }
}

function mostrarFinal() {
  finalOverlay.classList.add("is-visible");
  finalOverlay.setAttribute("aria-hidden", "false");
}

function esconderFinal() {
  finalOverlay.classList.remove("is-visible");
  finalOverlay.setAttribute("aria-hidden", "true");
}

function explodirEFinal() {
  if (jaExplodiu) return;
  jaExplodiu = true;

  // trava interações do baú
  bau.style.pointerEvents = "none";
  bau.classList.add("exploding");

  // após a animação do baú, mostra a tela final
  window.setTimeout(() => {
    mostrarFinal();
  }, 520);
}

function proximoClique() {
  if (jaExplodiu) return;

  const noLendario = idxRaridade === RARIDADES.length - 1;
  if (noLendario) {
    explodirEFinal();
    return;
  }

  idxRaridade += 1;
  atualizarVisual();
}

bau.addEventListener("click", proximoClique);

// Acessibilidade: Enter/Espaço também clicam
bau.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    proximoClique();
  }
});

// Fecha a tela final clicando fora do card
finalOverlay.addEventListener("click", (e) => {
  if (e.target === finalOverlay) esconderFinal();
});

// garante que o visual inicial está correto
atualizarVisual();


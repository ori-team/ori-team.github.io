// Aplica o tema (claro/escuro) ANTES da pintura — sem flash.
// Ordem: escolha salva → preferência do sistema → claro.
(function () {
  try {
    var saved = localStorage.getItem("oriteam-theme");
    var theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();

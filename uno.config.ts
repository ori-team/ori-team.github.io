import { defineConfig, presetWind3 } from "unocss";

// Preflight desligado de propósito: o Starlight já traz seu próprio reset.
// Aqui usamos o Uno só para utilitários de layout/espaçamento.
export default defineConfig({
  presets: [presetWind3({ preflight: false })],
});

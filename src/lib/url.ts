// URLs internas respeitando o `base` do Astro (ex.: /oriteam-website no Pages).
// <a href="/x"> puro NÃO recebe o base automaticamente — use sempre siteUrl().
export function siteUrl(path = "/"): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

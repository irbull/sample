# 🏷️ Compteur de balises HTML

Un outil CLI rapide qui récupère une page web et produit une analyse visuelle et catégorisée de toutes les balises HTML qu’elle contient — avec les quantités et des graphiques en barres, directement dans votre terminal.

## Exemple de sortie

```
🌐 Récupération : https://ianbull.com/

✅ 19.3 KB de HTML récupérés

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ANALYSE DES BALISES POUR https://ianbull.com/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total des balises trouvées : 181
  Types de balises uniques   : 30
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Document  (3 au total)
  ────────────────────────────────────────
  <html              1  █
  <head              1  █
  <body              1  █

🏗️  Structure  (46 au total)
  ────────────────────────────────────────
  <div              23  ███████████████████████
  <span             16  ████████████████
  ...
```

## Prérequis

- [Bun](https://bun.sh) v1.0 ou version ultérieure

## Utilisation

```bash
bun run tag-counter.ts
```

L’URL cible est définie en haut de `tag-counter.ts` :

```ts
const URL = "https://ianbull.com/";
```

Modifiez-la avec n’importe quelle URL que vous souhaitez analyser.

## Catégories de balises

Les balises sont regroupées en huit catégories :

| Catégorie | Exemples |
|---|---|
| 📄 Document | `html`, `head`, `body` |
| 🏗️ Structure | `div`, `span`, `section`, `header`, `nav`, `main`, `footer`, … |
| 📝 Texte | `p`, `a`, `h1`–`h6`, `strong`, `em`, `code`, `blockquote`, … |
| 📋 Liste | `ul`, `ol`, `li`, `dl`, `dt`, `dd`, `menu` |
| 🖼️ Média | `img`, `video`, `audio`, `svg`, `canvas`, `iframe`, … |
| 📊 Tableau | `table`, `thead`, `tbody`, `tr`, `th`, `td`, … |
| 📬 Formulaire | `form`, `input`, `button`, `select`, `textarea`, … |
| 🔧 Métadonnées | `meta`, `title`, `link`, `script`, `style`, … |

Toute balise qui ne correspond à aucune catégorie connue est listée sous **❓ Autres**.

## Fonctionnement

1. **Récupération** — Télécharge le HTML brut de l’URL cible à l’aide de l’API native `fetch`.
2. **Extraction** — Parcourt le HTML avec une expression régulière afin de collecter chaque nom de balise ouvrante.
3. **Comptage** — Compte les occurrences de chaque balise unique.
4. **Catégorisation** — Associe chaque balise à sa catégorie via la table de correspondance `TAG_CATEGORIES`.
5. **Affichage** — Affiche sur stdout un résumé trié avec graphiques en barres (les balises de chaque catégorie sont triées par nombre décroissant).
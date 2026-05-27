const fs = require('fs');
const sharp = require('sharp');

const size = 1400;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 1400 1400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path id="topArc" d="M 190 700 A 510 510 0 0 1 1210 700" />
    <path id="botArc" d="M 1210 700 A 510 510 0 0 1 190 700" />
  </defs>

  <!-- Badge -->
  <circle cx="700" cy="700" r="620" fill="#142A4F"/>
  <circle cx="700" cy="700" r="500" fill="#0096AA"/>

  <!-- Center softball -->
  <circle cx="700" cy="740" r="350" fill="#FFEABC"/>
  <path d="M 485 500 C 350 615, 350 870, 485 985" fill="none" stroke="#CC3939" stroke-width="16" stroke-linecap="round"/>
  <path d="M 915 500 C 1050 615, 1050 870, 915 985" fill="none" stroke="#CC3939" stroke-width="16" stroke-linecap="round"/>

  <!-- Vancouver Island silhouette (stylized) -->
  <path d="M 630 205
           L 695 195 L 760 220 L 810 265 L 852 330 L 880 400
           L 886 455 L 865 505 L 832 548 L 820 595 L 835 640
           L 820 685 L 792 730 L 768 780 L 740 828 L 725 875
           L 705 922 L 670 963 L 628 995 L 588 1012 L 550 1000
           L 532 960 L 538 910 L 560 860 L 548 808 L 525 748
           L 500 682 L 490 615 L 500 560 L 520 505 L 540 450
           L 555 395 L 570 338 Z"
        fill="#FFFFFF"/>

  <!-- Accent cutouts -->
  <circle cx="845" cy="660" r="18" fill="#0096AA"/>
  <circle cx="785" cy="760" r="12" fill="#0096AA"/>
  <circle cx="665" cy="920" r="10" fill="#0096AA"/>

  <!-- Side stars -->
  <polygon points="245,700 263,737 304,742 274,769 281,810 245,791 209,810 216,769 186,742 227,737"
           fill="#F35A48"/>
  <polygon points="1155,700 1173,737 1214,742 1184,769 1191,810 1155,791 1119,810 1126,769 1096,742 1137,737"
           fill="#F35A48"/>

  <!-- Ring text -->
  <text font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="700" fill="#FFFFFF" letter-spacing="2">
    <textPath href="#topArc" startOffset="50%" text-anchor="middle">VANCOUVER ISLAND</textPath>
  </text>

  <text font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="700" fill="#FFFFFF" letter-spacing="2">
    <textPath href="#botArc" startOffset="50%" text-anchor="middle">GIRLS SOFTBALL</textPath>
  </text>
</svg>`;

const svgPath = '/workspace/vancouver_island_girls_softball_logo.svg';
const pngPath = '/workspace/vancouver_island_girls_softball_logo.png';

(async () => {
  fs.writeFileSync(svgPath, svg, 'utf8');
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(pngPath);
  console.log(svgPath);
  console.log(pngPath);
})();

const fs = require('fs');

const lines = fs.readFileSync('/workspace/carnarvon_one_pager.txt', 'utf8').split('\n');
const escapePdf = s => s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
let ops = ['BT', '/F1 9 Tf', '42 754 Td', '11 TL'];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (i === 0) ops.push('/F2 15 Tf');
  else if (/^(VERDICT|WHAT IT OFFERS|2026 PRICE SNAPSHOT|WHERE|WHY IT CAN BE WORTH IT|WATCH-OUTS|NEARBY ALTERNATIVES|BOTTOM LINE)$/.test(line)) ops.push('/F2 10 Tf');
  else ops.push('/F1 9 Tf');
  ops.push(`(${escapePdf(line)}) Tj`, 'T*');
}
ops.push('ET');
const stream = ops.join('\n');
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'
];
let pdf = '%PDF-1.4\n', offsets = [0];
objects.forEach((obj, i) => { offsets.push(Buffer.byteLength(pdf)); pdf += `${i+1} 0 obj\n${obj}\nendobj\n`; });
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;
for (let i = 1; i < offsets.length; i++) pdf += `${String(offsets[i]).padStart(10,'0')} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
fs.writeFileSync('/workspace/carnarvon_club_one_pager.pdf', pdf, 'ascii');

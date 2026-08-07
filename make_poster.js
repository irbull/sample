const fs = require('fs');

const W=612,H=792;
const C={cream:[0.96,0.88,0.68],navy:[0.08,0.12,0.18],rust:[0.72,0.18,0.08],orange:[0.94,0.39,0.08],gold:[0.98,0.67,0.12],olive:[0.34,0.39,0.16],white:[1,0.97,0.88]};
const rgb=c=>`${c[0]} ${c[1]} ${c[2]}`;
const esc=s=>s.replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
let p=[];
const fill=c=>p.push(`${rgb(c)} rg`), stroke=c=>p.push(`${rgb(c)} RG`);
const rect=(x,y,w,h,c)=>{fill(c);p.push(`${x} ${y} ${w} ${h} re f`)};
const line=(x1,y1,x2,y2,c,w=1)=>{stroke(c);p.push(`${w} w ${x1} ${y1} m ${x2} ${y2} l S`)};
const circle=(x,y,r,c,sc=null,sw=1)=>{fill(c); if(sc){stroke(sc);p.push(`${sw} w`)} p.push(`${x-r} ${y} m ${x-r} ${y+r*.5523} ${x-r*.5523} ${y+r} ${x} ${y+r} c ${x+r*.5523} ${y+r} ${x+r} ${y+r*.5523} ${x+r} ${y} c ${x+r} ${y-r*.5523} ${x+r*.5523} ${y-r} ${x} ${y-r} c ${x-r*.5523} ${y-r} ${x-r} ${y-r*.5523} ${x-r} ${y} c ${sc?'B':'f'}`)};
const text=(x,y,size,font,c,s,align='left')=>{fill(c); let approx=s.length*size*.53; if(align==='center')x-=approx/2;if(align==='right')x-=approx;p.push(`BT /${font} ${size} Tf ${x} ${y} Td (${esc(s)}) Tj ET`)};

// warm paper and offset-print border
rect(0,0,W,H,C.cream); rect(16,16,W-32,H-32,C.navy); rect(22,22,W-44,H-44,C.cream);

// radiating retro bands
const bands=[[C.rust,615],[C.orange,588],[C.gold,561],[C.olive,534],[C.navy,507]];
for(const [c,y] of bands){fill(c);p.push(`22 ${y} m 590 ${y+24} l 590 ${y-4} l 22 ${y-28} l h f`)}

// sun and rays
circle(306,441,116,C.gold,C.navy,7);
for(let i=0;i<18;i++){
 const a=i*Math.PI/9, r1=126,r2=i%2?144:156;
 line(306+Math.cos(a)*r1,441+Math.sin(a)*r1,306+Math.cos(a)*r2,441+Math.sin(a)*r2,C.rust,5);
}

// ball trio inside sun
circle(250,449,35,C.white,C.navy,4);
// baseball seams
p.push(`${rgb(C.rust)} RG 2 w 235 421 m 251 438 253 460 265 477 c S`);
p.push(`${rgb(C.rust)} RG 2 w 265 421 m 250 438 247 461 236 477 c S`);
for(let y=433;y<=464;y+=10){line(242,y,248,y+4,C.rust,1.4);line(257,y,263,y-4,C.rust,1.4)}

circle(306,420,36,C.orange,C.navy,4);
// basketball seams
line(270,420,342,420,C.navy,2); line(306,384,306,456,C.navy,2);
p.push(`${rgb(C.navy)} RG 2 w 277 398 m 298 409 314 431 335 442 c S`);
p.push(`${rgb(C.navy)} RG 2 w 277 442 m 298 431 314 409 335 398 c S`);

circle(363,452,35,C.white,C.navy,4);
// softball stitches and label
p.push(`${rgb(C.rust)} RG 2 w 337 434 m 350 425 375 424 389 437 c S`);
p.push(`${rgb(C.rust)} RG 2 w 337 470 m 350 479 375 480 389 467 c S`);

// top headline, shadow gives screen-print effect
text(306,711,53,'F3',C.rust,'CARNARVON','center');
text(302,716,53,'F3',C.gold,'CARNARVON','center');
text(306,667,31,'F2',C.navy,'BALL CLUB','center');
text(306,642,11,'F1',C.navy,'PLAY BOLD  -  GROW TOGETHER  -  HAVE A BALL','center');

// central 3-sport callout
rect(76,313,460,58,C.navy);
text(306,347,21,'F2',C.white,'BASEBALL  /  FASTBALL  /  BASKETBALL','center');
text(306,325,11,'F1',C.gold,'BEGINNERS TO COMPETITORS  -  YOUTH PROGRAMS','center');

// lower content, retro ticket blocks
rect(62,222,148,66,C.olive);rect(232,222,148,66,C.orange);rect(402,222,148,66,C.rust);
text(136,260,15,'F2',C.white,'SPRING','center'); text(136,240,12,'F1',C.white,'SEASONS','center');
text(306,260,15,'F2',C.white,'FALL BALL','center'); text(306,240,12,'F1',C.white,'& NIGHT LEAGUE','center');
text(476,260,15,'F2',C.white,'CLINICS','center'); text(476,240,12,'F1',C.white,'& SELECT TEAMS','center');

text(306,185,17,'F2',C.navy,'SIX PARKS ACROSS OAK BAY + SAANICH','center');
text(306,160,12,'F1',C.navy,"GIRLS' BASKETBALL  -  CO-ED BASEBALL  -  FAST-PITCH SOFTBALL",'center');

// footer CTA
rect(72,73,468,59,C.gold);
text(306,105,24,'F2',C.navy,'STEP UP TO THE PLATE!','center');
text(306,84,13,'F1',C.navy,'PROGRAMS + REGISTRATION:  CARNARVON.CA','center');
text(306,47,9,'F1',C.navy,'VICTORIA, BRITISH COLUMBIA  /  COMMUNITY-RUN, PLAYER-FOCUSED','center');

const stream=p.join('\n');
const objs=[
'<< /Type /Catalog /Pages 2 0 R >>',
'<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>',
`<< /Length ${Buffer.byteLength(stream,'ascii')} >>\nstream\n${stream}\nendstream`,
'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-BoldOblique /Encoding /WinAnsiEncoding >>',
'<< /Type /Font /Subtype /Type1 /BaseFont /ZapfChancery-MediumItalic /Encoding /WinAnsiEncoding >>'
];
let pdf='%PDF-1.4\n', offs=[0];
objs.forEach((o,i)=>{offs.push(Buffer.byteLength(pdf,'ascii'));pdf+=`${i+1} 0 obj\n${o}\nendobj\n`});
const xref=Buffer.byteLength(pdf,'ascii');
pdf+=`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`;
for(let i=1;i<offs.length;i++)pdf+=`${String(offs[i]).padStart(10,'0')} 00000 n \n`;
pdf+=`trailer\n<< /Size ${objs.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
fs.writeFileSync('/workspace/poster.pdf',pdf,'ascii');

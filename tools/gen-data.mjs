import fs from 'node:fs';
const idx = JSON.parse(fs.readFileSync('exercises/index.json', 'utf8'));
const exs = idx.map(x => JSON.parse(fs.readFileSync(`exercises/${x.id}.json`, 'utf8')));
const curriculum = JSON.parse(fs.readFileSync('curriculum.json', 'utf8'));
const header = '// Generated from exercises/*.json and curriculum.json.
'
  + '// Exercise content derives from validator.js (MIT, commit 9ff3424), for teaching only.
'
  + 'window.EXERCISES = ';
const body = header + JSON.stringify(exs, null, 2) + ';

'
  + 'window.CURRICULUM = ' + JSON.stringify(curriculum, null, 2) + ';
';
fs.writeFileSync('data.js', body);
console.log('exercises:', exs.length, '| chapters:', curriculum.chapters.length);

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const DIR = 'exercises';
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json') && f !== 'index.json').sort();

const MUTATIONS = {
  'c02-luhn-check': [
    { name: '阈值 product > 9 → > 10', find: 'product > 9', replace: 'product > 10' },
    { name: '翻倍状态不再翻转', find: 'second = !second;', replace: 'second = second;' },
    { name: '初始翻倍位错误', find: 'let second = false;', replace: 'let second = true;' },
  ],
  'c04-is-date': [
    { name: '回退缺陷：固定用格式分隔符', find: `const dateDelimiter = options.strictMode
      ? formatDelimiter
      : options.delimiters.find(delimiter => input.indexOf(delimiter) !== -1);`, replace: 'const dateDelimiter = formatDelimiter;' },
    { name: '2 位年边界 < → <=', find: 'parsedYear < currentYearLastTwoDigits', replace: 'parsedYear <= currentYearLastTwoDigits', equivalent: '仅当 2 位年份等于当前年份后两位时不同；2026 与 1926 均非闰年，isDate 布尔输出不可区分' },
    { name: '严格模式也采用输入分隔符', find: `const dateDelimiter = options.strictMode
      ? formatDelimiter
      : options.delimiters.find(delimiter => input.indexOf(delimiter) !== -1);`, replace: `const dateDelimiter = options.delimiters.find(delimiter => input.indexOf(delimiter) !== -1);` },
  ],
  'c07-is-base64': [
    { name: '回退缺陷：padding 恒 true', find: 'padding: !options?.urlSafe', replace: 'padding: true' },
    { name: '删除空串特判', find: `  if (str === '') return true;`, replace: '' },
    { name: 'padding 长度条件取反', find: 'if (options.padding && str.length % 4 !== 0) return false;', replace: 'if (options.padding && str.length % 4 === 0) return false;' },
  ],
  'c09-is-strong-password': [
    { name: '删除 minUniqueChars 判定', find: `        && analysis.symbolCount >= options.minSymbols
        && analysis.uniqueChars >= options.minUniqueChars;`, replace: '        && analysis.symbolCount >= options.minSymbols;' },
    { name: '阈值 >= → >', find: 'analysis.uniqueChars >= options.minUniqueChars', replace: 'analysis.uniqueChars > options.minUniqueChars' },
    { name: '计分权重 0.5 → 0.6', find: 'pointsPerRepeat: 0.5', replace: 'pointsPerRepeat: 0.6' },
  ],
  'c03-is-isbn': [
    { name: 'ISBN-10 权重 +1', find: 'checksum += (i + 1) * sanitizedIsbn.charAt(i);', replace: 'checksum += (i + 2) * sanitizedIsbn.charAt(i);' },
    { name: 'ISBN-13 权重翻转', find: 'checksum += factor[i % 2] * sanitizedIsbn.charAt(i);', replace: 'checksum += factor[(i + 1) % 2] * sanitizedIsbn.charAt(i);' },
    { name: '尾位 X 记 10 → 5', find: 'checksum += 10 * 10;', replace: 'checksum += 10 * 5;' },
  ],
  'c10-is-credit-card': [
    { name: '删除 mir 机构', find: 'mir: /^220[0-4][0-9]{12}$/,', replace: '// mir removed' },
    { name: 'Mir BIN 上界 2204 → 2203', find: '220[0-4]', replace: '220[0-3]' },
    { name: '跳过 Luhn 校验', find: 'return isLuhnNumber(card);', replace: 'return true;' },
  ],
  'c11-is-json': [
    { name: '回退缺陷：null 当对象接受', find: "(!!obj && typeof obj === 'object')", replace: "(typeof obj === 'object')" },
    { name: 'allow_any_value 失效', find: 'if (options.allow_any_value) {', replace: 'if (false) {' },
    { name: 'allow_primitives 少 true', find: 'primitives = [null, false, true];', replace: 'primitives = [null, false];' },
  ],
  'c12-is-mongo-id': [
    { name: '长度 24 → 23', find: 'str.length === 24', replace: 'str.length === 23' },
    { name: '删除十六进制校验', find: 'isHexadecimal(str) && str.length === 24', replace: 'str.length === 24' },
    { name: '十六进制正则只留数字', find: 'const hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;', replace: 'const hexadecimal = /^(0x|0h)?[0-9]+$/i;' },
  ],

  'capstone-signup': [
    { name: '删除日期回读校验', find: 'return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;', replace: 'return true;' },
    { name: '删除大写要求', find: ' && /[A-Z]/.test(password)', replace: '' },
    { name: 'email check disabled', find: 'if (!/^', replace: 'if (false && /^' },
  ],

};

function buildContext(code, entry) {
  const ctx = vm.createContext({ console });
  vm.runInContext(code, ctx, { timeout: 3000 });
  vm.runInContext(`globalThis.__entry = ${entry};`, ctx, { timeout: 1000 });
  if (typeof ctx.__entry !== 'function') throw new Error(`entry function ${entry} not found`);
  return ctx;
}

function runTests(ctx, tests) {
  return tests.map(t => {
    try {
      const v = vm.runInContext(`(${t.expr})`, ctx, { timeout: 1500 });
      return { name: t.name, expr: t.expr, pass: v === true, value: v };
    } catch (e) {
      return { name: t.name, expr: t.expr, pass: false, error: e.message };
    }
  });
}

let out = ['# Repo Gym 审计矩阵', '', '> 独立审计：参考解必须全过，起始代码必须至少挂 1 条；每个参考解做 3 个语义变异，测试必须抓住。', ''];
let totalMutants = 0, killedMutants = 0, equivalentMutants = 0;

for (const f of files) {
  const ex = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  out.push(`## ${ex.id} · ${ex.type}`, '');

  const solCtx = buildContext(ex.reference_solution, ex.entry);
  const sol = runTests(solCtx, ex.tests);
  const solPass = sol.filter(r => r.pass).length;
  out.push(`- 参考解：${solPass}/${sol.length} 通过`);
  if (solPass !== sol.length) {
    for (const r of sol.filter(r => !r.pass)) out.push(`  - ❌ ${r.name} :: ${r.expr}${r.error ? ' — ' + r.error : ''}`);
  }

  const startCtx = buildContext(ex.starter_code, ex.entry);
  const start = runTests(startCtx, ex.tests);
  const startFail = start.filter(r => !r.pass).length;
  out.push(`- 起始代码：${start.length - startFail}/${start.length} 通过，失败 ${startFail} 条`);
  for (const r of start.filter(r => !r.pass)) out.push(`  - 挂：${r.name}`);

  const muts = MUTATIONS[ex.id] || [];
  out.push('', '| 变异 | 结果 |', '|---|---|');
  for (const m of muts) {
    totalMutants++;
    const count = ex.reference_solution.split(m.find).length - 1;
    if (count !== 1) {
      out.push(`| ${m.name} | ⚠️ find 命中 ${count} 次，跳过 |`);
      continue;
    }
    const mutated = ex.reference_solution.replace(m.find, m.replace);
    let killed = false, detail = '';
    try {
      const mctx = buildContext(mutated, ex.entry);
      const res = runTests(mctx, ex.tests);
      const fails = res.filter(r => !r.pass);
      killed = fails.length > 0;
      detail = killed ? `被 ${fails.length} 条测试抓住` : '存活（测试未覆盖）';
    } catch (e) {
      killed = true;
      detail = '变异代码无法运行（视为抓住）: ' + e.message;
    }
    if (killed) killedMutants++;
    else if (m.equivalent) { equivalentMutants++; detail = '等价变异：' + m.equivalent; }
    out.push(`| ${m.name} | ${killed ? '✅ ' + detail : (m.equivalent ? '➖ ' + detail : '❌ ' + detail)} |`);
  }
  out.push('');
}

out.push('## 汇总', '', `- 变异体：${killedMutants}/${totalMutants} 被抓住，${equivalentMutants} 个证明为等价变异`);
fs.writeFileSync('audit.md', out.join('\n') + '\n');
console.log(out.join('\n'));

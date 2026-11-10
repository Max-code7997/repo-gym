// 题目数据：由 work/exercises/*.json 与 work/curriculum.json 生成。
// 数据来源：validator.js（MIT，commit 9ff3424），仅用于教学演示。
window.EXERCISES = [
  {
    "id": "c02-luhn-check",
    "title": "补全 Luhn 校验和核心算法",
    "type": "fillin",
    "difficulty": "medium",
    "source": "src/lib/util/algorithms.js:26",
    "entry": "luhnCheck",
    "description": "背景：luhnCheck 是 validator.js 内部的 Luhn（mod 10）校验和算法工具（src/lib/util/algorithms.js，被 isTaxID 的部分税号校验复用；仓库中 isLuhnNumber 另有一份等价内联实现供 isCreditCard 使用），约定入参为只含数字的字符串（含末位校验位），返回布尔值。要求：补全函数核心循环——从最右位（校验位，不翻倍）向左遍历，未翻倍位直接累加数字；翻倍位将数字乘 2，乘积大于 9 时按位拆开求和（如 15 -> 1+5=6）后累加；每处理完一位翻转翻倍状态；最终校验和能被 10 整除返回 true。非数字字符经 parseInt 产生 NaN 时应自然传导为 false，无需特判。验收标准：函数签名与返回约定不变，全部测试表达式通过；只补全被挖空的实现，不得引入依赖或改动其余代码。",
    "starter_code": "// luhnCheck —— Luhn（mod 10）校验和（fillin 起点）\n// 仓库来源：src/lib/util/algorithms.js（validator.js 13.15.35）\n// 契约：入参 str 为只含数字的字符串（含末位校验位）；返回布尔值。\n// 算法要求：\n//   1) 从最右一位（校验位）开始向左遍历，最右位不翻倍；\n//   2) 未翻倍位：数字直接累加；\n//   3) 翻倍位：数字乘 2，乘积大于 9 时按位拆开求和（如 15 -> 1+5=6）后累加；\n//   4) 每处理完一位，翻倍状态取反；\n//   5) 总和能被 10 整除返回 true。\n//   非数字字符经 parseInt 得到 NaN，应自然传导为 false，无需特判。\n\nfunction luhnCheck(str) {\n  let checksum = 0;\n  let second = false;\n\n  // TODO: 补全核心循环（从 str.length - 1 遍历到 0）\n  //  - 数字转换：parseInt(str[i], 10)\n  //  - second 为 true 时翻倍并处理乘积大于 9 的情况\n  //  - 每轮结束后翻转 second\n\n  return checksum % 10 === 0;\n}\n",
    "reference_solution": "// luhnCheck —— Luhn（mod 10）校验和（参考实现，与仓库 src/lib/util/algorithms.js:26 一致）\nfunction luhnCheck(str) {\n  let checksum = 0;\n  let second = false;\n  for (let i = str.length - 1; i >= 0; i--) {\n    if (second) {\n      const product = parseInt(str[i], 10) * 2;\n      if (product > 9) {\n        // sum digits of product and add to checksum\n        checksum += product.toString().split('').map(a => parseInt(a, 10)).reduce((a, b) => a + b, 0);\n      } else {\n        checksum += product;\n      }\n    } else {\n      checksum += parseInt(str[i], 10);\n    }\n    second = !second;\n  }\n  return checksum % 10 === 0;\n}\n",
    "tests": [
      {
        "name": "经典 Luhn 示例（维基百科）",
        "expr": "luhnCheck('79927398713') === true",
        "name_en": "Classic Luhn example (Wikipedia)"
      },
      {
        "name": "16 位 Visa 测试号",
        "expr": "luhnCheck('4111111111111111') === true",
        "name_en": "16-digit Visa test number"
      },
      {
        "name": "15 位 Amex 测试号（奇数长度）",
        "expr": "luhnCheck('378282246310005') === true",
        "name_en": "15-digit Amex test number (odd length)"
      },
      {
        "name": "16 位 Mastercard 测试号",
        "expr": "luhnCheck('5555555555554444') === true",
        "name_en": "16-digit Mastercard test number"
      },
      {
        "name": "单个 0 边界",
        "expr": "luhnCheck('0') === true",
        "name_en": "Single 0 boundary"
      },
      {
        "name": "校验位 +1 即失败",
        "expr": "luhnCheck('79927398714') === false",
        "name_en": "Check digit +1 fails"
      },
      {
        "name": "末位改动即失败",
        "expr": "luhnCheck('4111111111111112') === false",
        "name_en": "Changing the last digit fails"
      },
      {
        "name": "非数字字符传导为 false",
        "expr": "luhnCheck('7992739871x') === false",
        "name_en": "Non-digit characters propagate to false"
      }
    ],
    "hints": [
      "最右位是校验位且不翻倍；翻倍状态从右向左逐位交替，处理完一位就取反。",
      "乘积大于 9 时不要直接累加乘积：把十位与个位相加（15 -> 6），字符串拆位或减 9 均可。",
      "奇数与偶数长度都要正确：分别用 79927398713 与 4111111111111111 自测。"
    ],
    "explanation": "参考实现从最右位开始遍历，用 second 标记翻倍位：未翻倍位直接累加 parseInt 后的数字；翻倍位先乘 2，乘积大于 9 时按位拆开求和（等价于减 9），随后每轮翻转 second，最后 checksum % 10 === 0。常见坑：从左往右遍历导致奇偶长度下翻倍位错位；乘积大于 9 时直接累加乘积；忘记翻转 second；对非数字字符做特判——原实现依赖 parseInt 的 NaN 传导使结果为 false，无需（也不应）特判。",
    "title_en": "Complete the Luhn checksum loop",
    "description_en": "Context: luhnCheck is validator.js's internal Luhn (mod 10) checksum helper (src/lib/util/algorithms.js). It takes a string of digits including the check digit and returns a boolean. Task: fill in the core loop — walk from the rightmost digit (the check digit, never doubled) to the left; add undoubled digits directly; for doubled positions multiply by 2 and, if the product is greater than 9, sum its digits (15 -> 1+5=6) before adding; flip the doubling flag after each digit. Return true when the total is divisible by 10. Non-digit characters become NaN via parseInt and should naturally fall through to false; no special case is needed. Acceptance: keep the signature and return contract, pass all tests, and only fill in the missing implementation without adding dependencies or changing other code.",
    "hints_en": [
      "The rightmost digit is the check digit and is never doubled; the doubling flag alternates as you move left — flip it after every digit.",
      "When the product is greater than 9, do not add the product directly: add its two digits (15 -> 6). Splitting the string or subtracting 9 both work.",
      "Both odd and even lengths must work: test with 79927398713 and 4111111111111111."
    ],
    "explanation_en": "The reference walks from the right with a second flag. Undoubled positions add parseInt(value); doubled positions multiply by 2 and, when the product is greater than 9, add the two digits (equivalent to subtracting 9). Flip second after every digit and return checksum % 10 === 0. Common traps: iterating left to right so the doubling parity is wrong for odd/even lengths; adding the product directly when it is above 9; forgetting to flip the flag; special-casing non-digits — the original relies on parseInt's NaN propagating to false, so no special case is needed."
  },
  {
    "id": "c04-is-date",
    "title": "修复 isDate 误拒默认选项下的合法日期",
    "type": "bugfix",
    "difficulty": "medium",
    "source": "src/lib/isDate.js:24",
    "entry": "isDate",
    "description": "背景：isDate 按格式解析日期字符串并验证真实存在：默认格式 YYYY/MM/DD；默认分隔符表为 ['/', '-']；非严格模式下输入可使用分隔符表中任一分隔符（允许与格式所用分隔符不同），严格模式（strictMode: true）则强制输入与格式长度、分隔符一致；各字段位数必须与占位符一致（如 DD 对应两位日）；2 月日期通过构造 UTC 日期回读日号校验（闰年规则由此保证）；非字符串输入走 Date 对象兜底分支；兼容旧式 isDate(input, '格式字符串') 传参。用户反馈：isDate('2020-02-19') 与 isDate('15-07-2002', 'DD/MM/YYYY') 等带连字符的合法日期被误拒（返回 false）。要求：定位并最小化修复该缺陷，不得改变上述其余文档化行为。验收标准：全部测试表达式通过，修复只触及缺陷根因，不引入新依赖。",
    "starter_code": "// isDate —— 校验格式化日期字符串（bugfix 起点）\n// 仓库来源：src/lib/isDate.js（validator.js 13.15.35）\n// merge / default_date_options / isValidFormat / zip 与仓库实现一致。\n\nfunction merge(obj = {}, defaults) {\n  if (typeof obj !== 'object' || obj === null) {\n    obj = {};\n  }\n  for (const key in defaults) {\n    if (typeof obj[key] === 'undefined') {\n      obj[key] = defaults[key];\n    }\n  }\n  return obj;\n}\n\nconst default_date_options = {\n  format: 'YYYY/MM/DD',\n  delimiters: ['/', '-'],\n  strictMode: false,\n};\n\nfunction isValidFormat(format) {\n  return /(^(y{4}|y{2})[.\\/-](m{1,2})[.\\/-](d{1,2})$)|(^(m{1,2})[.\\/-](d{1,2})[.\\/-]((y{4}|y{2})$))|(^(d{1,2})[.\\/-](m{1,2})[.\\/-]((y{4}|y{2})$))/gi.test(format);\n}\n\nfunction zip(date, format) {\n  const zippedArr = [],\n    len = Math.max(date.length, format.length);\n\n  for (let i = 0; i < len; i++) {\n    zippedArr.push([date[i], format[i]]);\n  }\n\n  return zippedArr;\n}\n\nfunction isDate(input, options) {\n  if (typeof options === 'string') { // 兼容旧式 isDate(input [, format])\n    options = merge({ format: options }, default_date_options);\n  } else {\n    options = merge(options, default_date_options);\n  }\n  if (typeof input === 'string' && isValidFormat(options.format)) {\n    if (options.strictMode && input.length !== options.format.length) return false;\n    const formatDelimiter = options.delimiters\n      .find(delimiter => options.format.indexOf(delimiter) !== -1);\n    const dateDelimiter = formatDelimiter;\n    const dateAndFormat = zip(\n      input.split(dateDelimiter),\n      options.format.toLowerCase().split(formatDelimiter)\n    );\n    const dateObj = {};\n\n    for (const [dateWord, formatWord] of dateAndFormat) {\n      if (!dateWord || !formatWord || dateWord.length !== formatWord.length) {\n        return false;\n      }\n\n      dateObj[formatWord.charAt(0)] = dateWord;\n    }\n\n    let fullYear = dateObj.y;\n\n    // 年份不允许以连字符开头\n    if (fullYear.startsWith('-')) {\n      return false;\n    }\n\n    if (dateObj.y.length === 2) {\n      const parsedYear = parseInt(dateObj.y, 10);\n\n      if (isNaN(parsedYear)) {\n        return false;\n      }\n\n      const currentYearLastTwoDigits = new Date().getFullYear() % 100;\n\n      if (parsedYear < currentYearLastTwoDigits) {\n        fullYear = `20${dateObj.y}`;\n      } else {\n        fullYear = `19${dateObj.y}`;\n      }\n    }\n\n    let month = dateObj.m;\n\n    if (dateObj.m.length === 1) {\n      month = `0${dateObj.m}`;\n    }\n\n    let day = dateObj.d;\n\n    if (dateObj.d.length === 1) {\n      day = `0${dateObj.d}`;\n    }\n\n    return new Date(`${fullYear}-${month}-${day}T00:00:00.000Z`).getUTCDate() === +dateObj.d;\n  }\n\n  if (!options.strictMode) {\n    return Object.prototype.toString.call(input) === '[object Date]' && isFinite(input);\n  }\n\n  return false;\n}\n",
    "reference_solution": "// isDate —— 校验格式化日期字符串（参考实现，与仓库 src/lib/isDate.js 一致）\n\nfunction merge(obj = {}, defaults) {\n  if (typeof obj !== 'object' || obj === null) {\n    obj = {};\n  }\n  for (const key in defaults) {\n    if (typeof obj[key] === 'undefined') {\n      obj[key] = defaults[key];\n    }\n  }\n  return obj;\n}\n\nconst default_date_options = {\n  format: 'YYYY/MM/DD',\n  delimiters: ['/', '-'],\n  strictMode: false,\n};\n\nfunction isValidFormat(format) {\n  return /(^(y{4}|y{2})[.\\/-](m{1,2})[.\\/-](d{1,2})$)|(^(m{1,2})[.\\/-](d{1,2})[.\\/-]((y{4}|y{2})$))|(^(d{1,2})[.\\/-](m{1,2})[.\\/-]((y{4}|y{2})$))/gi.test(format);\n}\n\nfunction zip(date, format) {\n  const zippedArr = [],\n    len = Math.max(date.length, format.length);\n\n  for (let i = 0; i < len; i++) {\n    zippedArr.push([date[i], format[i]]);\n  }\n\n  return zippedArr;\n}\n\nfunction isDate(input, options) {\n  if (typeof options === 'string') { // 兼容旧式 isDate(input [, format])\n    options = merge({ format: options }, default_date_options);\n  } else {\n    options = merge(options, default_date_options);\n  }\n  if (typeof input === 'string' && isValidFormat(options.format)) {\n    if (options.strictMode && input.length !== options.format.length) return false;\n    const formatDelimiter = options.delimiters\n      .find(delimiter => options.format.indexOf(delimiter) !== -1);\n    const dateDelimiter = options.strictMode\n      ? formatDelimiter\n      : options.delimiters.find(delimiter => input.indexOf(delimiter) !== -1);\n    const dateAndFormat = zip(\n      input.split(dateDelimiter),\n      options.format.toLowerCase().split(formatDelimiter)\n    );\n    const dateObj = {};\n\n    for (const [dateWord, formatWord] of dateAndFormat) {\n      if (!dateWord || !formatWord || dateWord.length !== formatWord.length) {\n        return false;\n      }\n\n      dateObj[formatWord.charAt(0)] = dateWord;\n    }\n\n    let fullYear = dateObj.y;\n\n    // 年份不允许以连字符开头\n    if (fullYear.startsWith('-')) {\n      return false;\n    }\n\n    if (dateObj.y.length === 2) {\n      const parsedYear = parseInt(dateObj.y, 10);\n\n      if (isNaN(parsedYear)) {\n        return false;\n      }\n\n      const currentYearLastTwoDigits = new Date().getFullYear() % 100;\n\n      if (parsedYear < currentYearLastTwoDigits) {\n        fullYear = `20${dateObj.y}`;\n      } else {\n        fullYear = `19${dateObj.y}`;\n      }\n    }\n\n    let month = dateObj.m;\n\n    if (dateObj.m.length === 1) {\n      month = `0${dateObj.m}`;\n    }\n\n    let day = dateObj.d;\n\n    if (dateObj.d.length === 1) {\n      day = `0${dateObj.d}`;\n    }\n\n    return new Date(`${fullYear}-${month}-${day}T00:00:00.000Z`).getUTCDate() === +dateObj.d;\n  }\n\n  if (!options.strictMode) {\n    return Object.prototype.toString.call(input) === '[object Date]' && isFinite(input);\n  }\n\n  return false;\n}\n",
    "tests": [
      {
        "name": "默认格式下连字符分隔（非严格）",
        "expr": "isDate('2020-02-19') === true",
        "name_en": "Hyphen delimiter under default format (non-strict)"
      },
      {
        "name": "闰年 2 月 29 日",
        "expr": "isDate('2020/02/29') === true",
        "name_en": "Leap-year 29 February"
      },
      {
        "name": "非闰年 2 月 29 日",
        "expr": "isDate('2019-02-29') === false",
        "name_en": "29 February in a non-leap year"
      },
      {
        "name": "4 月 31 日不存在",
        "expr": "isDate('2020-04-31') === false",
        "name_en": "31 April does not exist"
      },
      {
        "name": "混合分隔符拒绝",
        "expr": "isDate('2020/03-15') === false",
        "name_en": "Mixed delimiters rejected"
      },
      {
        "name": "缺少日字段",
        "expr": "isDate('2024-05') === false",
        "name_en": "Missing day field"
      },
      {
        "name": "严格模式长度不符",
        "expr": "isDate('2021/1/31', { format: 'YYYY/MM/DD', strictMode: true }) === false",
        "name_en": "Strict-mode length mismatch"
      },
      {
        "name": "旧式字符串 format 兼容",
        "expr": "isDate('15-07-2002', 'DD/MM/YYYY') === true",
        "name_en": "Legacy string format compatibility"
      },
      {
        "name": "严格模式拒绝不同分隔符",
        "expr": "isDate('2021-01-31', { format: 'YYYY/MM/DD', strictMode: true }) === false",
        "name_en": "Strict mode rejects a different delimiter"
      },
      {
        "name": "2 位年份映射到 19xx",
        "expr": "isDate('99/01/01', 'YY/MM/DD') === true",
        "name_en": "Two-digit year maps to 19xx"
      },
      {
        "name": "2 位年份映射世纪后闰年成立",
        "expr": "isDate('00/02/29', 'YY/MM/DD') === true",
        "name_en": "Two-digit year mapping: leap year holds"
      },
      {
        "name": "2 位年份映射世纪后非闰年拒绝",
        "expr": "isDate('99/02/29', 'YY/MM/DD') === false",
        "name_en": "Two-digit year mapping: non-leap year rejected"
      }
    ],
    "hints": [
      "先复现再定位：isDate('2020-02-19') 为 false。注意格式分隔符与输入分隔符在非严格模式下是两次独立查找。",
      "检查 dateDelimiter 的取值来源：只有 strictMode 为 true 时才应固定使用格式分隔符。",
      "修复后回归确认：混合分隔符（'2020/03-15'）仍被拒绝，严格模式与位数一致性检查不受影响。"
    ],
    "explanation": "参考实现中 formatDelimiter 在格式串中查找分隔符，dateDelimiter 在非严格模式下按输入中实际出现的分隔符查找（strictMode 为 true 时才固定用格式分隔符），二者分别用于切分输入与格式。本缺陷把 dateDelimiter 直接固定成了 formatDelimiter，导致输入使用连字符（默认允许）时整段被当作一个字段与格式逐位比较而失败。常见坑：把两次分隔符查找合并；顺手改动 zip 或位数检查导致 '2021/1/31' 对 DD 的行为变化；忽略 2 月校验依赖 getUTCDate 回读（Date 构造会把 2019-02-29 自动溢出为 3 月 1 日）。",
    "title_en": "Fix isDate rejecting valid dates under default options",
    "description_en": "Context: isDate parses a date string by format and checks that the date really exists. The default format is YYYY/MM/DD and the default delimiter set is ['/', '-']. In non-strict mode the input may use any delimiter from the set (it may differ from the format's delimiter); strict mode (strictMode: true) forces the input to match the format's length and delimiter. Each field's width must match its placeholder (DD means a two-digit day). February dates are verified by constructing a UTC date and reading the day back, which also enforces leap years. Non-string inputs fall back to the Date-object branch. The legacy isDate(input, 'format') call is supported. User report: valid hyphenated dates such as isDate('2020-02-19') and isDate('15-07-2002', 'DD/MM/YYYY') are wrongly rejected (return false). Task: locate and minimally fix the defect without changing the other documented behaviour. Acceptance: all tests pass, the fix touches only the root cause, and no dependencies are added.",
    "hints_en": [
      "Reproduce first, then locate: isDate('2020-02-19') is false. Note that the format delimiter and the input delimiter are two separate lookups in non-strict mode.",
      "Check where dateDelimiter comes from: it should be pinned to the format delimiter only when strictMode is true.",
      "After the fix, confirm the regression cases: mixed delimiters ('2020/03-15') are still rejected, and the strict-mode and width checks are unaffected."
    ],
    "explanation_en": "In the reference, formatDelimiter looks up a delimiter in the format string; dateDelimiter looks up the delimiter actually present in the input when strictMode is false (it is pinned to the format delimiter only in strict mode). The two are used to split the input and the format respectively. The defect pins dateDelimiter to formatDelimiter, so a hyphenated input (allowed by default) is compared as one field against the format and fails. Common traps: merging the two delimiter lookups; touching zip or the width check so '2021/1/31' behaves differently against DD; forgetting that February validation depends on the getUTCDate read-back (constructing a Date rolls 2019-02-29 into March 1)."
  },
  {
    "id": "c07-is-base64",
    "title": "修复 isBase64 URL-safe 模式的默认行为",
    "type": "bugfix",
    "difficulty": "easy",
    "source": "src/lib/isBase64.js:9",
    "entry": "isBase64",
    "description": "背景：isBase64 校验标准或 URL-safe Base64。文档契约：不传 options 时按标准 Base64 处理且默认要求 padding（长度须为 4 的倍数）；urlSafe: true 时默认不要求 padding，且字符集额外允许 - 与 _（此时 + 与 / 反而非法）；显式传入 padding 时始终覆盖默认值；空串视为合法；非字符串入参抛 TypeError。用户反馈：isBase64('PDw_Pz8-Pg', { urlSafe: true }) 返回 false，但按契约它应当合法；怀疑默认选项处理被改动过。要求：定位并最小化修复，不得影响标准 Base64 默认要求 padding 的行为与显式 padding 的覆盖能力。验收标准：全部测试表达式通过。",
    "starter_code": "// isBase64 —— 校验标准 / URL-safe Base64（bugfix 起点）\n// 仓库来源：src/lib/isBase64.js（validator.js 13.15.35）\n// assertString / merge 与仓库实现一致。\n\nfunction assertString(input) {\n  if (typeof input !== 'string') {\n    const invalidType = input === null ? 'null' : typeof input;\n    throw new TypeError(`Expected a string but received a ${invalidType}`);\n  }\n}\n\nfunction merge(obj = {}, defaults) {\n  if (typeof obj !== 'object' || obj === null) {\n    obj = {};\n  }\n  for (const key in defaults) {\n    if (typeof obj[key] === 'undefined') {\n      obj[key] = defaults[key];\n    }\n  }\n  return obj;\n}\n\nconst base64WithPadding = /^[A-Za-z0-9+/]+={0,2}$/;\nconst base64WithoutPadding = /^[A-Za-z0-9+/]+$/;\nconst base64UrlWithPadding = /^[A-Za-z0-9_-]+={0,2}$/;\nconst base64UrlWithoutPadding = /^[A-Za-z0-9_-]+$/;\n\nfunction isBase64(str, options) {\n  assertString(str);\n  options = merge(options, { urlSafe: false, padding: true });\n\n  if (str === '') return true;\n\n  if (options.padding && str.length % 4 !== 0) return false;\n\n  let regex;\n  if (options.urlSafe) {\n    regex = options.padding ? base64UrlWithPadding : base64UrlWithoutPadding;\n  } else {\n    regex = options.padding ? base64WithPadding : base64WithoutPadding;\n  }\n\n  return (!options.padding || str.length % 4 === 0) && regex.test(str);\n}\n",
    "reference_solution": "// isBase64 —— 校验标准 / URL-safe Base64（参考实现，与仓库 src/lib/isBase64.js 一致）\n\nfunction assertString(input) {\n  if (typeof input !== 'string') {\n    const invalidType = input === null ? 'null' : typeof input;\n    throw new TypeError(`Expected a string but received a ${invalidType}`);\n  }\n}\n\nfunction merge(obj = {}, defaults) {\n  if (typeof obj !== 'object' || obj === null) {\n    obj = {};\n  }\n  for (const key in defaults) {\n    if (typeof obj[key] === 'undefined') {\n      obj[key] = defaults[key];\n    }\n  }\n  return obj;\n}\n\nconst base64WithPadding = /^[A-Za-z0-9+/]+={0,2}$/;\nconst base64WithoutPadding = /^[A-Za-z0-9+/]+$/;\nconst base64UrlWithPadding = /^[A-Za-z0-9_-]+={0,2}$/;\nconst base64UrlWithoutPadding = /^[A-Za-z0-9_-]+$/;\n\nfunction isBase64(str, options) {\n  assertString(str);\n  options = merge(options, { urlSafe: false, padding: !options?.urlSafe });\n\n  if (str === '') return true;\n\n  if (options.padding && str.length % 4 !== 0) return false;\n\n  let regex;\n  if (options.urlSafe) {\n    regex = options.padding ? base64UrlWithPadding : base64UrlWithoutPadding;\n  } else {\n    regex = options.padding ? base64WithPadding : base64WithoutPadding;\n  }\n\n  return (!options.padding || str.length % 4 === 0) && regex.test(str);\n}\n",
    "tests": [
      {
        "name": "默认接受带 padding 的标准 Base64",
        "expr": "isBase64('Zm9vYmE=') === true",
        "name_en": "Default accepts standard Base64 with padding"
      },
      {
        "name": "长度恰为 4 倍数的无填充串默认通过",
        "expr": "isBase64('Zm9vYmFy') === true",
        "name_en": "Unpadded string of length 4 passes by default"
      },
      {
        "name": "padding 不完整",
        "expr": "isBase64('Zg=') === false",
        "name_en": "Incomplete padding"
      },
      {
        "name": "默认模式拒绝长度非 4 倍数",
        "expr": "isBase64('12345') === false",
        "name_en": "Default mode rejects lengths not divisible by 4"
      },
      {
        "name": "urlSafe 默认不要求 padding",
        "expr": "isBase64('PDw_Pz8-Pg', { urlSafe: true }) === true",
        "name_en": "urlSafe does not require padding by default"
      },
      {
        "name": "urlSafe 字符集不含 + 与 /",
        "expr": "isBase64('This+isa/bad+base64Url==', { urlSafe: true }) === false",
        "name_en": "urlSafe alphabet excludes + and /"
      },
      {
        "name": "urlSafe 与显式 padding 并用",
        "expr": "isBase64('SGVsbG8-', { urlSafe: true, padding: true }) === true",
        "name_en": "urlSafe with explicit padding"
      },
      {
        "name": "空串视为合法",
        "expr": "isBase64('') === true",
        "name_en": "Empty string is valid"
      }
    ],
    "hints": [
      "默认选项在 merge 的第二个参数里生成；注意 padding 的默认值在标准与 urlSafe 两种模式下并不相同。",
      "可对照 urlSafe 用例：10 位无填充的 urlSafe 串不应被长度检查拒绝。",
      "显式 { padding: true } 或 { padding: false } 应始终覆盖默认值，merge 只补未定义的键。"
    ],
    "explanation": "参考实现用 merge(options, { urlSafe: false, padding: !options?.urlSafe }) 生成默认值：标准 Base64 默认 padding 为 true，urlSafe 默认为 false；显式传入的 padding 因键已存在而不被覆盖。本缺陷把默认值统一写成 padding: true，导致 urlSafe 模式下无填充（长度非 4 倍数）的合法串被长度检查误拒。常见坑：把默认值统一成 true 或 false；把默认值判断挪进 urlSafe 分支导致标准模式行为漂移；忽略空串提前返回的约定与 assertString 的类型守卫。",
    "title_en": "Fix isBase64's URL-safe default behaviour",
    "description_en": "Context: isBase64 validates standard or URL-safe Base64. Contract: without options it uses standard Base64 and requires padding by default (length must be a multiple of 4); with urlSafe: true it does not require padding by default, and the alphabet additionally allows - and _ (so + and / are invalid in that mode); an explicit padding value always overrides the default; the empty string is valid; non-string input throws TypeError. User report: isBase64('PDw_Pz8-Pg', { urlSafe: true }) returns false, but the contract says it is valid; the default options handling is suspected. Task: locate and minimally fix the defect without breaking the standard default-padding behaviour or the explicit padding override. Acceptance: all tests pass.",
    "hints_en": [
      "The defaults are produced in the second argument to merge; note that the default padding differs between standard and urlSafe modes.",
      "Compare with the urlSafe case: a 10-character unpadded urlSafe string must not be rejected by the length check.",
      "An explicit { padding: true } or { padding: false } must always override the default; merge only fills keys whose value is undefined."
    ],
    "explanation_en": "The reference uses merge(options, { urlSafe: false, padding: !options?.urlSafe }): standard Base64 defaults padding to true, urlSafe defaults it to false; an explicit padding key is already present, so merge does not overwrite it. The defect hard-codes padding: true, so a valid unpadded urlSafe string (length not a multiple of 4) is rejected by the length check. Common traps: making the default always true or always false; moving the default into the urlSafe branch so standard mode drifts; ignoring the early return for the empty string and the assertString type guard."
  },
  {
    "id": "c09-is-strong-password",
    "title": "为 isStrongPassword 新增 minUniqueChars 选项",
    "type": "feature",
    "difficulty": "easy",
    "source": "src/lib/isStrongPassword.js:85",
    "entry": "isStrongPassword",
    "description": "背景：isStrongPassword 统计口令构成（长度、唯一字符数 uniqueChars、大小写 / 数字 / 符号计数），布尔模式下逐项与阈值比较；returnScore: true 时改为按计分规则（uniqueChars × pointsPerUnique + 重复字符 × pointsPerRepeat + 类别奖励）返回数值分数。需求：新增 minUniqueChars 选项——加入默认选项表且默认 0；布尔判定中唯一字符数少于阈值返回 false（等于阈值通过）；默认 0 时与现状行为完全一致（向后兼容，其余阈值照常生效）；returnScore 模式完全不受该选项影响。验收标准：全部测试表达式通过，含默认行为回归与 returnScore 不受影响的断言；不改变现有选项语义与计分公式。",
    "starter_code": "// isStrongPassword —— 口令强度判定 / 计分（feature 起点：现状实现）\n// 仓库来源：src/lib/isStrongPassword.js（validator.js 13.15.35）\n// assertString / merge / countChars / analyzePassword / scorePassword 与仓库实现一致。\n\nfunction assertString(input) {\n  if (typeof input !== 'string') {\n    const invalidType = input === null ? 'null' : typeof input;\n    throw new TypeError(`Expected a string but received a ${invalidType}`);\n  }\n}\n\nfunction merge(obj = {}, defaults) {\n  if (typeof obj !== 'object' || obj === null) {\n    obj = {};\n  }\n  for (const key in defaults) {\n    if (typeof obj[key] === 'undefined') {\n      obj[key] = defaults[key];\n    }\n  }\n  return obj;\n}\n\nconst upperCaseRegex = /^[A-Z]$/;\nconst lowerCaseRegex = /^[a-z]$/;\nconst numberRegex = /^[0-9]$/;\nconst symbolRegex = /^[-#!$@£%^&*()_+|~=`{}\\[\\]:\";'<>?,.\\/\\\\ ]$/;\n\nconst defaultOptions = {\n  minLength: 8,\n  minLowercase: 1,\n  minUppercase: 1,\n  minNumbers: 1,\n  minSymbols: 1,\n  returnScore: false,\n  pointsPerUnique: 1,\n  pointsPerRepeat: 0.5,\n  pointsForContainingLower: 10,\n  pointsForContainingUpper: 10,\n  pointsForContainingNumber: 10,\n  pointsForContainingSymbol: 10,\n};\n\nfunction countChars(str) {\n  let result = {};\n  Array.from(str).forEach((char) => {\n    let curVal = result[char];\n    if (curVal) {\n      result[char] += 1;\n    } else {\n      result[char] = 1;\n    }\n  });\n  return result;\n}\n\nfunction analyzePassword(password) {\n  let charMap = countChars(password);\n  let analysis = {\n    length: password.length,\n    uniqueChars: Object.keys(charMap).length,\n    uppercaseCount: 0,\n    lowercaseCount: 0,\n    numberCount: 0,\n    symbolCount: 0,\n  };\n  Object.keys(charMap).forEach((char) => {\n    if (upperCaseRegex.test(char)) {\n      analysis.uppercaseCount += charMap[char];\n    } else if (lowerCaseRegex.test(char)) {\n      analysis.lowercaseCount += charMap[char];\n    } else if (numberRegex.test(char)) {\n      analysis.numberCount += charMap[char];\n    } else if (symbolRegex.test(char)) {\n      analysis.symbolCount += charMap[char];\n    }\n  });\n  return analysis;\n}\n\nfunction scorePassword(analysis, scoringOptions) {\n  let points = 0;\n  points += analysis.uniqueChars * scoringOptions.pointsPerUnique;\n  points += (analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat;\n  if (analysis.lowercaseCount > 0) {\n    points += scoringOptions.pointsForContainingLower;\n  }\n  if (analysis.uppercaseCount > 0) {\n    points += scoringOptions.pointsForContainingUpper;\n  }\n  if (analysis.numberCount > 0) {\n    points += scoringOptions.pointsForContainingNumber;\n  }\n  if (analysis.symbolCount > 0) {\n    points += scoringOptions.pointsForContainingSymbol;\n  }\n  return points;\n}\n\nfunction isStrongPassword(str, options = null) {\n  assertString(str);\n  const analysis = analyzePassword(str);\n  options = merge(options || {}, defaultOptions);\n  if (options.returnScore) {\n    return scorePassword(analysis, options);\n  }\n  return analysis.length >= options.minLength\n        && analysis.lowercaseCount >= options.minLowercase\n        && analysis.uppercaseCount >= options.minUppercase\n        && analysis.numberCount >= options.minNumbers\n        && analysis.symbolCount >= options.minSymbols;\n}\n",
    "reference_solution": "// isStrongPassword —— 口令强度判定 / 计分（参考实现：现状 + minUniqueChars 选项）\n\nfunction assertString(input) {\n  if (typeof input !== 'string') {\n    const invalidType = input === null ? 'null' : typeof input;\n    throw new TypeError(`Expected a string but received a ${invalidType}`);\n  }\n}\n\nfunction merge(obj = {}, defaults) {\n  if (typeof obj !== 'object' || obj === null) {\n    obj = {};\n  }\n  for (const key in defaults) {\n    if (typeof obj[key] === 'undefined') {\n      obj[key] = defaults[key];\n    }\n  }\n  return obj;\n}\n\nconst upperCaseRegex = /^[A-Z]$/;\nconst lowerCaseRegex = /^[a-z]$/;\nconst numberRegex = /^[0-9]$/;\nconst symbolRegex = /^[-#!$@£%^&*()_+|~=`{}\\[\\]:\";'<>?,.\\/\\\\ ]$/;\n\nconst defaultOptions = {\n  minLength: 8,\n  minLowercase: 1,\n  minUppercase: 1,\n  minNumbers: 1,\n  minSymbols: 1,\n  minUniqueChars: 0,\n  returnScore: false,\n  pointsPerUnique: 1,\n  pointsPerRepeat: 0.5,\n  pointsForContainingLower: 10,\n  pointsForContainingUpper: 10,\n  pointsForContainingNumber: 10,\n  pointsForContainingSymbol: 10,\n};\n\nfunction countChars(str) {\n  let result = {};\n  Array.from(str).forEach((char) => {\n    let curVal = result[char];\n    if (curVal) {\n      result[char] += 1;\n    } else {\n      result[char] = 1;\n    }\n  });\n  return result;\n}\n\nfunction analyzePassword(password) {\n  let charMap = countChars(password);\n  let analysis = {\n    length: password.length,\n    uniqueChars: Object.keys(charMap).length,\n    uppercaseCount: 0,\n    lowercaseCount: 0,\n    numberCount: 0,\n    symbolCount: 0,\n  };\n  Object.keys(charMap).forEach((char) => {\n    if (upperCaseRegex.test(char)) {\n      analysis.uppercaseCount += charMap[char];\n    } else if (lowerCaseRegex.test(char)) {\n      analysis.lowercaseCount += charMap[char];\n    } else if (numberRegex.test(char)) {\n      analysis.numberCount += charMap[char];\n    } else if (symbolRegex.test(char)) {\n      analysis.symbolCount += charMap[char];\n    }\n  });\n  return analysis;\n}\n\nfunction scorePassword(analysis, scoringOptions) {\n  let points = 0;\n  points += analysis.uniqueChars * scoringOptions.pointsPerUnique;\n  points += (analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat;\n  if (analysis.lowercaseCount > 0) {\n    points += scoringOptions.pointsForContainingLower;\n  }\n  if (analysis.uppercaseCount > 0) {\n    points += scoringOptions.pointsForContainingUpper;\n  }\n  if (analysis.numberCount > 0) {\n    points += scoringOptions.pointsForContainingNumber;\n  }\n  if (analysis.symbolCount > 0) {\n    points += scoringOptions.pointsForContainingSymbol;\n  }\n  return points;\n}\n\nfunction isStrongPassword(str, options = null) {\n  assertString(str);\n  const analysis = analyzePassword(str);\n  options = merge(options || {}, defaultOptions);\n  if (options.returnScore) {\n    return scorePassword(analysis, options);\n  }\n  return analysis.length >= options.minLength\n        && analysis.lowercaseCount >= options.minLowercase\n        && analysis.uppercaseCount >= options.minUppercase\n        && analysis.numberCount >= options.minNumbers\n        && analysis.symbolCount >= options.minSymbols\n        && analysis.uniqueChars >= options.minUniqueChars;\n}\n",
    "tests": [
      {
        "name": "默认阈值下强口令通过（仓库种子）",
        "expr": "isStrongPassword('etV*p%Nr6w&H%FeF') === true",
        "name_en": "Strong password passes default thresholds (repo seed)"
      },
      {
        "name": "默认行为回归：缺大写缺数字仍拒绝",
        "expr": "isStrongPassword('password!') === false",
        "name_en": "Default regression: missing uppercase and digit still rejected"
      },
      {
        "name": "minUniqueChars 低于唯一字符数时通过",
        "expr": "isStrongPassword('etV*p%Nr6w&H%FeF', { minUniqueChars: 13 }) === true",
        "name_en": "minUniqueChars below the unique count passes"
      },
      {
        "name": "唯一字符数低于阈值拒绝",
        "expr": "isStrongPassword('etV*p%Nr6w&H%FeF', { minUniqueChars: 14 }) === false",
        "name_en": "Unique count below the threshold is rejected"
      },
      {
        "name": "重复字符口令被唯一字符阈值过滤",
        "expr": "isStrongPassword('Aaaa111!', { minUniqueChars: 5 }) === false",
        "name_en": "Repeated-character password filtered by the unique threshold"
      },
      {
        "name": "等于阈值按 >= 语义通过",
        "expr": "isStrongPassword('Aaaa111!', { minUniqueChars: 4 }) === true",
        "name_en": "Equal to the threshold passes (>= semantics)"
      },
      {
        "name": "returnScore 模式不受 minUniqueChars 影响",
        "expr": "isStrongPassword('etV*p%Nr6w&H%FeF', { returnScore: true, minUniqueChars: 99 }) === 54.5",
        "name_en": "returnScore mode is unaffected by minUniqueChars"
      },
      {
        "name": "returnScore 基线计分",
        "expr": "isStrongPassword('abc', { returnScore: true }) === 13",
        "name_en": "returnScore baseline"
      }
    ],
    "hints": [
      "uniqueChars 已由 analyzePassword 统计好，布尔判定链末尾追加一个比较即可。",
      "minUniqueChars: 0 加入 defaultOptions 后，0 阈值应使新比较恒真，保证旧调用不变。",
      "returnScore 分支在布尔判定之前返回，新选项不应进入 scorePassword。"
    ],
    "explanation": "参考实现把 minUniqueChars: 0 写入 defaultOptions，并在布尔判定链末尾追加 analysis.uniqueChars >= options.minUniqueChars：默认 0 时比较恒真，向后兼容；returnScore 分支在此之前返回，计分公式不变。常见坑：把阈值检查放进 scorePassword 导致计分随新选项变化；用 > 而非 >= 使等于阈值被误拒；破坏 options 为 null 时的合并路径（merge(options || {}, defaultOptions)）影响默认值；忘记同步更新默认选项表导致与 undefined 比较。",
    "title_en": "Add a minUniqueChars option to isStrongPassword",
    "description_en": "Context: isStrongPassword analyses a password (length, uniqueChars, lowercase/uppercase/digit/symbol counts). In boolean mode it compares each count with a threshold; with returnScore: true it returns a numeric score (uniqueChars x pointsPerUnique + repeated chars x pointsPerRepeat + category bonuses). Task: add a minUniqueChars option — include it in the default options with a default of 0; in boolean mode return false when uniqueChars is below the threshold (equal to the threshold passes); with the default 0, behaviour must be identical to today (backwards compatible, other thresholds still apply); returnScore mode must be completely unaffected. Acceptance: all tests pass, including the default-behaviour regression and the returnScore assertions; existing option semantics and the scoring formula are unchanged.",
    "hints_en": [
      "uniqueChars is already computed by analyzePassword; append one comparison to the end of the boolean chain.",
      "Add minUniqueChars: 0 to defaultOptions so a zero threshold makes the new comparison always true and old callers are unaffected.",
      "The returnScore branch returns before the boolean chain; the new option must not enter scorePassword."
    ],
    "explanation_en": "The reference adds minUniqueChars: 0 to defaultOptions and appends analysis.uniqueChars >= options.minUniqueChars to the boolean chain: with the default 0 the comparison is always true, so it is backwards compatible. The returnScore branch returns earlier and the scoring formula is unchanged. Common traps: putting the threshold inside scorePassword so scores change with the new option; using > instead of >= so equality is wrongly rejected; breaking the merge path when options is null (merge(options || {}, defaultOptions)); forgetting to add the option to the default table so it is compared with undefined."
  },
  {
    "id": "c03-is-isbn",
    "title": "补全 isISBN 的 ISBN-10/13 校验和算法",
    "type": "fillin",
    "difficulty": "medium",
    "source": "src/lib/isISBN.js:7",
    "entry": "isISBN",
    "description": "背景：isISBN 校验图书国际标准书号，支持 ISBN-10（mod 11 校验，尾位可为 X）与 ISBN-13（1/3 交替加权 mod 10 校验）两种版本：options 兼容对象式 { version: 10|13 } 与旧式版本参数（如 '13'），不传 options 时先按 10 位再按 13 位自动尝试；空格与连字符在校验前清洗；格式不符（含 X 出现在非尾位）直接拒绝。要求：补全两个版本被挖空的核心校验和循环——ISBN-10：前 9 位按位置 1..9 加权求和，尾位数字按 10 加权、尾位 X 记 10×10，总和能被 11 整除才合法；ISBN-13：前 12 位按 1、3 交替加权求和，尾位应等于 (10 - 总和 mod 10) mod 10。验收标准：函数签名与 options 兼容分支不变，全部测试表达式通过；只补全被挖空的实现，不得引入依赖或改动其余代码。",
    "starter_code": "// isISBN —— 校验 ISBN-10 / ISBN-13（fillin 起点）\n// 仓库来源：src/lib/isISBN.js（validator.js 13.15.35）\n// 契约：options 可传 { version: 10|13 } 或旧式版本参数；不传时先按 10 位、再按 13 位尝试；\n//      空格与连字符先清洗；格式不符（含 X 出现在非尾位）直接拒绝。\n\nfunction assertString(input) {\n  if (input === undefined || input === null) throw new TypeError(`Expected a string but received a ${input}`);\n  if (input.constructor.name !== 'String') throw new TypeError(`Expected a string but received a ${input.constructor.name}`);\n}\n\nconst possibleIsbn10 = /^(?:[0-9]{9}X|[0-9]{10})$/;\nconst possibleIsbn13 = /^(?:[0-9]{13})$/;\nconst factor = [1, 3];\n\nfunction isISBN(isbn, options) {\n  assertString(isbn);\n\n  // For backwards compatibility:\n  // isISBN(str [, version]), i.e. `options` could be used as argument for the legacy `version`\n  const version = String(options?.version || options);\n\n  if (!(options?.version || options)) {\n    return isISBN(isbn, { version: 10 }) || isISBN(isbn, { version: 13 });\n  }\n\n  const sanitizedIsbn = isbn.replace(/[\\s-]+/g, '');\n\n  let checksum = 0;\n\n  if (version === '10') {\n    if (!possibleIsbn10.test(sanitizedIsbn)) {\n      return false;\n    }\n\n    // TODO: 补全 ISBN-10 校验和（mod 11）\n    //  - 前 9 位：checksum += (i + 1) * sanitizedIsbn.charAt(i)，i 从 0 到 8\n    //  - 尾位：X 记 10 * 10，数字记 10 * 数字\n    //  - 下方判定已保留：checksum % 11 === 0 时返回 true\n\n    if ((checksum % 11) === 0) {\n      return true;\n    }\n  } else if (version === '13') {\n    if (!possibleIsbn13.test(sanitizedIsbn)) {\n      return false;\n    }\n\n    // TODO: 补全 ISBN-13 校验和（1/3 加权）\n    //  - 前 12 位：checksum += factor[i % 2] * sanitizedIsbn.charAt(i)，i 从 0 到 11\n    //  - 下方判定已保留：尾位等于 (10 - checksum % 10) % 10 时返回 true\n\n    if (sanitizedIsbn.charAt(12) - ((10 - (checksum % 10)) % 10) === 0) {\n      return true;\n    }\n  }\n\n  return false;\n}\n",
    "reference_solution": "// isISBN —— 校验 ISBN-10 / ISBN-13（参考实现，与仓库 src/lib/isISBN.js 一致）\n\nfunction assertString(input) {\n  if (input === undefined || input === null) throw new TypeError(`Expected a string but received a ${input}`);\n  if (input.constructor.name !== 'String') throw new TypeError(`Expected a string but received a ${input.constructor.name}`);\n}\n\nconst possibleIsbn10 = /^(?:[0-9]{9}X|[0-9]{10})$/;\nconst possibleIsbn13 = /^(?:[0-9]{13})$/;\nconst factor = [1, 3];\n\nfunction isISBN(isbn, options) {\n  assertString(isbn);\n\n  // For backwards compatibility:\n  // isISBN(str [, version]), i.e. `options` could be used as argument for the legacy `version`\n  const version = String(options?.version || options);\n\n  if (!(options?.version || options)) {\n    return isISBN(isbn, { version: 10 }) || isISBN(isbn, { version: 13 });\n  }\n\n  const sanitizedIsbn = isbn.replace(/[\\s-]+/g, '');\n\n  let checksum = 0;\n\n  if (version === '10') {\n    if (!possibleIsbn10.test(sanitizedIsbn)) {\n      return false;\n    }\n\n    for (let i = 0; i < version - 1; i++) {\n      checksum += (i + 1) * sanitizedIsbn.charAt(i);\n    }\n\n    if (sanitizedIsbn.charAt(9) === 'X') {\n      checksum += 10 * 10;\n    } else {\n      checksum += 10 * sanitizedIsbn.charAt(9);\n    }\n\n    if ((checksum % 11) === 0) {\n      return true;\n    }\n  } else if (version === '13') {\n    if (!possibleIsbn13.test(sanitizedIsbn)) {\n      return false;\n    }\n\n    for (let i = 0; i < 12; i++) {\n      checksum += factor[i % 2] * sanitizedIsbn.charAt(i);\n    }\n\n    if (sanitizedIsbn.charAt(12) - ((10 - (checksum % 10)) % 10) === 0) {\n      return true;\n    }\n  }\n\n  return false;\n}\n",
    "tests": [
      {
        "name": "合法 ISBN-10（不带版本自动识别）",
        "expr": "isISBN('9992158107') === true",
        "name_en": "Valid ISBN-10 (auto-detect, no version)"
      },
      {
        "name": "尾位为 X 的合法 ISBN-10（对象式版本）",
        "expr": "isISBN('080442957X', { version: 10 }) === true",
        "name_en": "Valid ISBN-10 ending in X (object version)"
      },
      {
        "name": "合法 ISBN-13（旧式字符串版本）",
        "expr": "isISBN('9783161484100', '13') === true",
        "name_en": "Valid ISBN-13 (legacy string version)"
      },
      {
        "name": "ISBN-10 校验位错误",
        "expr": "isISBN('9992158108', '10') === false",
        "name_en": "Wrong ISBN-10 check digit"
      },
      {
        "name": "ISBN-13 校验位错误",
        "expr": "isISBN('9783161484110', '13') === false",
        "name_en": "Wrong ISBN-13 check digit"
      },
      {
        "name": "带连字符与空格的合法编号",
        "expr": "isISBN('978-3-16-148410-0') === true && isISBN('0 8044 2957-X', { version: 10 }) === true",
        "name_en": "Valid number with hyphens and spaces"
      },
      {
        "name": "非法长度与错误尾位 X",
        "expr": "isISBN('12345') === false && isISBN('97831614841001') === false && isISBN('999215810X') === false",
        "name_en": "Invalid length and wrong trailing X"
      },
      {
        "name": "X 只能出现在 ISBN-10 尾位",
        "expr": "isISBN('08044X2957', '10') === false && isISBN('978316148410X', '13') === false",
        "name_en": "X only allowed in the last ISBN-10 position"
      }
    ],
    "hints": [
      "ISBN-10 的加权从左到右按位置 1..9 递增（charAt 返回字符串，参与乘法会自动转数字）；ISBN-13 用 factor[i % 2] 即 1、3 交替。",
      "尾位特殊处理：ISBN-10 的 X 记 10 * 10；ISBN-13 的校验位应等于 (10 - checksum % 10) % 10，判定行已保留，只需把前 12 位的和算对。",
      "自测样本：'9992158107' 与 '080442957X'（10 位）、'9783161484100'（13 位）；带连字符输入依赖清洗分支。"
    ],
    "explanation": "参考实现与仓库 src/lib/isISBN.js 一致：ISBN-10 对前 9 位按 (i + 1) 加权求和（仓库写法 i < version - 1，version 为字符串 '10'，减法后即 9），尾位 X 记 10×10、数字记 10×数字，总和 mod 11 为 0 合法；ISBN-13 对前 12 位按 factor[i % 2]（1、3 交替）加权，尾位应等于 (10 - 总和 mod 10) mod 10。常见坑：把 ISBN-13 也按 mod 11 判定；加权方向写成从右往左（ISBN-10 的位置权重从左数起，与 Luhn 相反）；忘记 X 只在 ISBN-10 尾位合法；改动不传 options 时的自动识别分支。",
    "title_en": "Complete the ISBN-10/13 checksum algorithms",
    "description_en": "Context: isISBN validates ISBNs in two versions: ISBN-10 (mod 11, last character may be X) and ISBN-13 (alternating 1/3 weights, mod 10). options accepts either an object ({ version: 10|13 }) or the legacy version argument (e.g. '13'); without options it tries 10 digits first, then 13. Spaces and hyphens are stripped before validation; invalid shapes (including an X outside the last position of ISBN-10) are rejected. Task: fill in the two missing checksum loops. ISBN-10: weight the first nine digits by position 1..9, weight the last digit by 10, count a trailing X as 10x10, and accept when the total is divisible by 11. ISBN-13: weight the first twelve digits alternately by 1 and 3; the last digit must equal (10 - total mod 10) mod 10. Acceptance: keep the signature and options branches, pass all tests, and only fill in the missing implementation.",
    "hints_en": [
      "ISBN-10 weights increase left to right by position 1..9 (charAt returns a string; multiplication coerces it to a number). ISBN-13 uses factor[i % 2], i.e. 1 and 3 alternating.",
      "Last-position handling: an ISBN-10 X counts as 10 * 10; the ISBN-13 check digit should equal (10 - checksum % 10) % 10. The decision line is already present — just compute the first twelve digits correctly.",
      "Samples: '9992158107' and '080442957X' (10 digits), '9783161484100' (13 digits). Hyphenated inputs depend on the cleaning branch."
    ],
    "explanation_en": "The reference matches src/lib/isISBN.js. ISBN-10 sums the first nine digits with weight (i + 1) (the repo writes i < version - 1, where version is the string '10', so the subtraction yields 9), counts a trailing X as 10x10 and a digit as 10x digit, then accepts when the total mod 11 is 0. ISBN-13 weights the first twelve digits with factor[i % 2] (1, 3 alternating); the check digit must equal (10 - total mod 10) mod 10. Common traps: applying mod 11 to ISBN-13; weighting from right to left (ISBN-10 weights start from the left, unlike Luhn); allowing X anywhere except the last position of ISBN-10; changing the auto-detection branch when options are omitted."
  },
  {
    "id": "c10-is-credit-card",
    "title": "为 isCreditCard 新增 mir 发卡机构",
    "type": "feature",
    "difficulty": "medium",
    "source": "src/lib/isCreditCard.js:25",
    "entry": "isCreditCard",
    "description": "背景：isCreditCard 按发卡机构正则加 Luhn 校验判定银行卡号：options.provider 指定机构（不区分大小写），命中机构表 cards 后先过该机构正则、再过 Luhn；provider 不在机构表中会抛 Error；不传 provider 时要求命中机构表全量正则之一（allCards，由 cards 自动构建）再过 Luhn；连字符与空格先清洗。需求：新增发卡机构 mir（BIN 段 2200–2204，共 16 位），机构正则为 /^220[0-4][0-9]{12}$/；默认路径（不传 provider）也应接受 Mir 号；现有机构行为与未知 provider 抛错行为不变。验收标准：全部测试表达式通过，含两个 Luhn 合法的 Mir 号 '2200000000000004' 与 '2204123456789015'。",
    "starter_code": "// isCreditCard —— 校验银行卡号（feature 起点：现状实现，机构表尚无 Mir）\n// 仓库来源：src/lib/isCreditCard.js、src/lib/isLuhnNumber.js（validator.js 13.15.35）\n// 契约：options.provider 指定机构（不区分大小写）；机构命中后先过机构正则再过 Luhn；\n//      未知 provider 抛 Error；不传 provider 时须命中机构表全量正则之一（allCards）再过 Luhn；\n//      连字符与空格先清洗。\n\nfunction assertString(input) {\n  if (input === undefined || input === null) throw new TypeError(`Expected a string but received a ${input}`);\n  if (input.constructor.name !== 'String') throw new TypeError(`Expected a string but received a ${input.constructor.name}`);\n}\n\n// 内联自 src/lib/isLuhnNumber.js\nfunction isLuhnNumber(str) {\n  assertString(str);\n  const sanitized = str.replace(/[- ]+/g, '');\n  let sum = 0;\n  let digit;\n  let tmpNum;\n  let shouldDouble;\n  for (let i = sanitized.length - 1; i >= 0; i--) {\n    digit = sanitized.substring(i, (i + 1));\n    tmpNum = parseInt(digit, 10);\n    if (shouldDouble) {\n      tmpNum *= 2;\n      if (tmpNum >= 10) {\n        sum += ((tmpNum % 10) + 1);\n      } else {\n        sum += tmpNum;\n      }\n    } else {\n      sum += tmpNum;\n    }\n    shouldDouble = !shouldDouble;\n  }\n  return !!((sum % 10) === 0 ? sanitized : false);\n}\n\nconst cards = {\n  amex: /^3[47][0-9]{13}$/,\n  dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,\n  discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,\n  jcb: /^(?:2131|1800|35\\d{3})\\d{11}$/,\n  mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,\n  unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,\n  visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/,\n};\n\nconst allCards = (() => {\n  const tmpCardsArray = [];\n  for (const cardProvider in cards) {\n    // istanbul ignore else\n    if (cards.hasOwnProperty(cardProvider)) {\n      tmpCardsArray.push(cards[cardProvider]);\n    }\n  }\n  return tmpCardsArray;\n})();\n\nfunction isCreditCard(card, options = {}) {\n  assertString(card);\n  const { provider } = options;\n  const sanitized = card.replace(/[- ]+/g, '');\n  if (provider && provider.toLowerCase() in cards) {\n    // specific provider in the list\n    if (!(cards[provider.toLowerCase()].test(sanitized))) {\n      return false;\n    }\n  } else if (provider && !(provider.toLowerCase() in cards)) {\n    /* specific provider not in the list */\n    throw new Error(`${provider} is not a valid credit card provider.`);\n  } else if (!allCards.some(cardProvider => cardProvider.test(sanitized))) {\n    // no specific provider\n    return false;\n  }\n  return isLuhnNumber(card);\n}\n",
    "reference_solution": "// isCreditCard —— 校验银行卡号（参考实现：现状 + mir 发卡机构）\n\nfunction assertString(input) {\n  if (input === undefined || input === null) throw new TypeError(`Expected a string but received a ${input}`);\n  if (input.constructor.name !== 'String') throw new TypeError(`Expected a string but received a ${input.constructor.name}`);\n}\n\n// 内联自 src/lib/isLuhnNumber.js\nfunction isLuhnNumber(str) {\n  assertString(str);\n  const sanitized = str.replace(/[- ]+/g, '');\n  let sum = 0;\n  let digit;\n  let tmpNum;\n  let shouldDouble;\n  for (let i = sanitized.length - 1; i >= 0; i--) {\n    digit = sanitized.substring(i, (i + 1));\n    tmpNum = parseInt(digit, 10);\n    if (shouldDouble) {\n      tmpNum *= 2;\n      if (tmpNum >= 10) {\n        sum += ((tmpNum % 10) + 1);\n      } else {\n        sum += tmpNum;\n      }\n    } else {\n      sum += tmpNum;\n    }\n    shouldDouble = !shouldDouble;\n  }\n  return !!((sum % 10) === 0 ? sanitized : false);\n}\n\nconst cards = {\n  amex: /^3[47][0-9]{13}$/,\n  dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,\n  discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,\n  jcb: /^(?:2131|1800|35\\d{3})\\d{11}$/,\n  mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,\n  mir: /^220[0-4][0-9]{12}$/,\n  unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,\n  visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/,\n};\n\nconst allCards = (() => {\n  const tmpCardsArray = [];\n  for (const cardProvider in cards) {\n    // istanbul ignore else\n    if (cards.hasOwnProperty(cardProvider)) {\n      tmpCardsArray.push(cards[cardProvider]);\n    }\n  }\n  return tmpCardsArray;\n})();\n\nfunction isCreditCard(card, options = {}) {\n  assertString(card);\n  const { provider } = options;\n  const sanitized = card.replace(/[- ]+/g, '');\n  if (provider && provider.toLowerCase() in cards) {\n    // specific provider in the list\n    if (!(cards[provider.toLowerCase()].test(sanitized))) {\n      return false;\n    }\n  } else if (provider && !(provider.toLowerCase() in cards)) {\n    /* specific provider not in the list */\n    throw new Error(`${provider} is not a valid credit card provider.`);\n  } else if (!allCards.some(cardProvider => cardProvider.test(sanitized))) {\n    // no specific provider\n    return false;\n  }\n  return isLuhnNumber(card);\n}\n",
    "tests": [
      {
        "name": "默认路径接受 Mir 号（2200 段）",
        "expr": "isCreditCard('2200000000000004') === true",
        "name_en": "Default path accepts a Mir number (2200 range)"
      },
      {
        "name": "provider 'mir' 接受 Mir 号（2204 段）",
        "expr": "isCreditCard('2204123456789015', { provider: 'mir' }) === true",
        "name_en": "provider 'mir' accepts a Mir number (2204 range)"
      },
      {
        "name": "provider 'mir' 接受 Mir 号（2200 段）",
        "expr": "isCreditCard('2200000000000004', { provider: 'mir' }) === true",
        "name_en": "provider 'mir' accepts a Mir number (2200 range)"
      },
      {
        "name": "BIN 越界（2205 开头且 Luhn 合法）被拒",
        "expr": "isCreditCard('2205123456789014') === false",
        "name_en": "Out-of-range BIN (2205, Luhn-valid) rejected"
      },
      {
        "name": "校验位错误（Luhn 不过）被拒",
        "expr": "isCreditCard('2200000000000005') === false",
        "name_en": "Wrong check digit (Luhn failure) rejected"
      },
      {
        "name": "provider 'mir' 拒绝非 Mir 号",
        "expr": "isCreditCard('4111111111111111', { provider: 'mir' }) === false",
        "name_en": "provider 'mir' rejects a non-Mir number"
      },
      {
        "name": "现有机构不变：Visa 默认与指定 provider 均通过",
        "expr": "isCreditCard('4111111111111111') === true && isCreditCard('4111111111111111', { provider: 'visa' }) === true",
        "name_en": "Existing issuers unchanged: Visa passes by default and by provider"
      },
      {
        "name": "现有机构不变：校验位错误与机构不符被拒",
        "expr": "isCreditCard('4111111111111112', { provider: 'visa' }) === false && isCreditCard('2200000000000004', { provider: 'visa' }) === false",
        "name_en": "Existing issuers unchanged: wrong check digit and issuer mismatch rejected"
      }
    ],
    "hints": [
      "机构表 cards 是唯一注册点：默认路径用的 allCards 就是从 cards 的值构建的，在表里加一行 mir 就同时覆盖 provider 与默认两条路径。",
      "Mir 的 BIN 段是 2200–2204，正则 /^220[0-4][0-9]{12}$/，共 4 + 12 = 16 位；'2205123456789014' 虽然 Luhn 合法，但 BIN 越界应被拒。",
      "改动最小化：不要动 Luhn 实现、provider 分支与未知 provider 抛错逻辑，现有机构行为必须原样。"
    ],
    "explanation": "参考实现只在 cards 表中新增一行 mir: /^220[0-4][0-9]{12}$/。默认路径的 allCards 数组在加载时由 cards 构建，自动包含 mir，因此 '2200000000000004' 不带 provider 也能通过；provider 路径经 provider.toLowerCase() in cards 命中 mir，先过机构正则、再过 isLuhnNumber。'2205123456789014' Luhn 合法但 2205 不在 220[0-4] 内，被机构正则拒绝——这保证实现不能退化成只查 Luhn。常见坑：只改默认分支而忘了机构表（provider: 'mir' 会落入未知 provider 抛错分支）；正则位数少写一位（{11}）；顺手\"修复\"mastercard 的正则或重构 provider 分支导致现有行为漂移。",
    "title_en": "Add the Mir issuer to isCreditCard",
    "description_en": "Context: isCreditCard validates card numbers with a per-issuer regex plus Luhn. options.provider selects an issuer (case-insensitive); after a hit in the cards table the number must pass that issuer's regex and then Luhn. An unknown provider throws Error. Without a provider the number must match one of allCards (built automatically from cards) and then pass Luhn. Hyphens and spaces are stripped first. Task: add the Mir issuer (BIN range 2200-2204, 16 digits) with regex /^220[0-4][0-9]{12}$/. The default path (no provider) must also accept Mir numbers; existing issuers and the unknown-provider throw must be unchanged. Acceptance: all tests pass, including the two Luhn-valid Mir numbers '2200000000000004' and '2204123456789015'.",
    "hints_en": [
      "The cards table is the single registration point: the default path uses allCards, built from the values of cards, so one mir entry covers both the provider and default paths.",
      "Mir BINs are 2200-2204; the regex is /^220[0-4][0-9]{12}$/, 4 + 12 = 16 digits. '2205123456789014' is Luhn-valid but its BIN is out of range and must be rejected.",
      "Keep the change minimal: do not touch the Luhn implementation, the provider branch or the unknown-provider throw; existing issuer behaviour must stay identical."
    ],
    "explanation_en": "The reference adds one line, mir: /^220[0-4][0-9]{12}$/, to the cards table. allCards is built from cards at load time, so '2200000000000004' passes without a provider; with provider: 'mir' the provider.toLowerCase() in cards check hits mir, then the issuer regex and isLuhnNumber run. '2205123456789014' is Luhn-valid but 2205 is outside 220[0-4], so the issuer regex rejects it — proof that the implementation cannot degrade into a Luhn-only check. Common traps: changing only the default branch and forgetting the issuer table (provider: 'mir' would fall into the unknown-provider throw); writing {11} instead of {12}; changing the mastercard regex or refactoring the provider branch and drifting existing behaviour."
  },
  {
    "id": "c11-is-json",
    "title": "修复 isJSON 默认模式误收 null 的缺陷",
    "type": "bugfix",
    "difficulty": "medium",
    "source": "src/lib/isJSON.js:10",
    "entry": "isJSON",
    "description": "背景：isJSON 判定字符串是否为合法 JSON：默认只接受 JSON 对象与数组，'null'、'123'、'true' 等字面量均拒绝；allow_primitives: true 时额外接受 null/false/true 字面量；allow_any_value: true 时接受任何能被 JSON.parse 成功解析的值；解析失败一律返回 false。用户反馈：isJSON('null') 在默认选项下返回 true，而按契约默认模式应拒绝 'null'——怀疑最终判定把 null 当成了对象。要求：定位并最小化修复该缺陷，不得改变 allow_primitives / allow_any_value 与解析失败的行为，不引入新依赖。验收标准：全部测试表达式通过，修复只触及缺陷根因。",
    "starter_code": "// isJSON —— 校验 JSON 字符串（bugfix 起点）\n// 仓库来源：src/lib/isJSON.js、src/lib/util/{assertString, includesArray, merge}.js（validator.js 13.15.35）\n// 契约：默认只接受对象与数组；allow_primitives 额外接受 null/false/true；\n//      allow_any_value 接受任何可解析值；解析失败返回 false。\n\nfunction assertString(input) {\n  if (input === undefined || input === null) throw new TypeError(`Expected a string but received a ${input}`);\n  if (input.constructor.name !== 'String') throw new TypeError(`Expected a string but received a ${input.constructor.name}`);\n}\n\nfunction merge(obj = { }, defaults) {\n  if (typeof obj !== 'object' || obj === null) {\n    obj = {};\n  }\n  for (const key in defaults) {\n    if (typeof obj[key] === 'undefined') {\n      obj[key] = defaults[key];\n    }\n  }\n  return obj;\n}\n\n// 内联自 src/lib/util/includesArray.js\nconst includes = (arr, val) => arr.some(arrVal => val === arrVal);\n\nconst default_json_options = {\n  allow_primitives: false,\n  allow_any_value: false,\n};\n\nfunction isJSON(str, options) {\n  assertString(str);\n  try {\n    options = merge(options, default_json_options);\n    const obj = JSON.parse(str);\n\n    // When allow_any_value is true, accept anything that JSON.parse successfully parses\n    if (options.allow_any_value) {\n      return true;\n    }\n\n    let primitives = [];\n    if (options.allow_primitives) {\n      primitives = [null, false, true];\n    }\n\n    return includes(primitives, obj) || (typeof obj === 'object');\n  } catch (e) { /* ignore */ }\n  return false;\n}\n",
    "reference_solution": "// isJSON —— 校验 JSON 字符串（参考实现，与仓库 src/lib/isJSON.js 一致）\n\nfunction assertString(input) {\n  if (input === undefined || input === null) throw new TypeError(`Expected a string but received a ${input}`);\n  if (input.constructor.name !== 'String') throw new TypeError(`Expected a string but received a ${input.constructor.name}`);\n}\n\nfunction merge(obj = { }, defaults) {\n  if (typeof obj !== 'object' || obj === null) {\n    obj = {};\n  }\n  for (const key in defaults) {\n    if (typeof obj[key] === 'undefined') {\n      obj[key] = defaults[key];\n    }\n  }\n  return obj;\n}\n\n// 内联自 src/lib/util/includesArray.js\nconst includes = (arr, val) => arr.some(arrVal => val === arrVal);\n\nconst default_json_options = {\n  allow_primitives: false,\n  allow_any_value: false,\n};\n\nfunction isJSON(str, options) {\n  assertString(str);\n  try {\n    options = merge(options, default_json_options);\n    const obj = JSON.parse(str);\n\n    // When allow_any_value is true, accept anything that JSON.parse successfully parses\n    if (options.allow_any_value) {\n      return true;\n    }\n\n    let primitives = [];\n    if (options.allow_primitives) {\n      primitives = [null, false, true];\n    }\n\n    return includes(primitives, obj) || (!!obj && typeof obj === 'object');\n  } catch (e) { /* ignore */ }\n  return false;\n}\n",
    "tests": [
      {
        "name": "默认接受 JSON 对象",
        "expr": "isJSON('{\"key\": \"value\"}') === true",
        "name_en": "Default accepts a JSON object"
      },
      {
        "name": "默认接受 JSON 数组",
        "expr": "isJSON('[1, 2, 3]') === true",
        "name_en": "Default accepts a JSON array"
      },
      {
        "name": "默认应拒绝 null 字面量（缺陷现场）",
        "expr": "isJSON('null') === false",
        "name_en": "Default should reject the null literal (defect)"
      },
      {
        "name": "默认拒绝数字与字符串字面量",
        "expr": "isJSON('123') === false && isJSON('\"abc\"') === false",
        "name_en": "Default rejects number and string literals"
      },
      {
        "name": "allow_primitives 接受 null/true/false",
        "expr": "isJSON('null', { allow_primitives: true }) === true && isJSON('true', { allow_primitives: true }) === true && isJSON('false', { allow_primitives: true }) === true",
        "name_en": "allow_primitives accepts null/true/false"
      },
      {
        "name": "allow_primitives 不放松数字与字符串",
        "expr": "isJSON('123', { allow_primitives: true }) === false && isJSON('\"abc\"', { allow_primitives: true }) === false",
        "name_en": "allow_primitives does not relax numbers or strings"
      },
      {
        "name": "allow_any_value 接受任意可解析值",
        "expr": "isJSON('123', { allow_any_value: true }) === true && isJSON('null', { allow_any_value: true }) === true && isJSON('\"abc\"', { allow_any_value: true }) === true",
        "name_en": "allow_any_value accepts any parsable value"
      },
      {
        "name": "非法 JSON 一律拒绝",
        "expr": "isJSON('{a: 1}') === false && isJSON(\"{'a': 1}\") === false && isJSON('{\"a\": 1,}') === false",
        "name_en": "Invalid JSON is always rejected"
      }
    ],
    "hints": [
      "先复现：isJSON('null') 返回 true。注意 JSON.parse('null') 的结果是 null，而 typeof null === 'object'。",
      "契约要求默认只接受对象/数组：null 虽 typeof 为 object，却不是合法的默认接受值。检查最终 return，看谁该挡住它。",
      "修复是最小化的：恢复真值守卫即可；includes(primitives, obj) 与 primitives = [null, false, true] 的写法和仓库一致，不要动。"
    ],
    "explanation": "参考实现把最终判定恢复为 includes(primitives, obj) || (!!obj && typeof obj === 'object')：JSON.parse('null') 得到 null，而 typeof null === 'object' 是 JS 的历史设定，缺陷版本因此把 'null' 当对象接受；!!obj 先挡住 null（它是唯一 typeof 为 object 的假值），再谈类型判断。allow_primitives 分支用解析后的值与 [null, false, true] 严格相等匹配，不受守卫影响；allow_any_value 在解析成功后提前返回 true。常见坑：把 typeof 判断改成 Array.isArray 或 .constructor 检查导致普通对象被拒；顺手改 includes 的参数或 primitives 内容导致 allow_primitives 行为漂移；把守卫挪到 JSON.parse 之前影响 allow_any_value。",
    "title_en": "Fix isJSON accepting null in default mode",
    "description_en": "Context: isJSON checks whether a string is valid JSON. By default it accepts only JSON objects and arrays; literals such as 'null', '123' and 'true' are rejected. With allow_primitives: true it additionally accepts the null/false/true literals; with allow_any_value: true it accepts anything JSON.parse can parse; a parse failure always returns false. User report: isJSON('null') returns true with default options, but the contract says default mode should reject 'null' — the final check seems to treat null as an object. Task: locate and minimally fix the defect without changing allow_primitives, allow_any_value or the parse-failure behaviour, and without adding dependencies. Acceptance: all tests pass; the fix touches only the root cause.",
    "hints_en": [
      "Reproduce first: isJSON('null') returns true. JSON.parse('null') is null, and typeof null === 'object'.",
      "The contract accepts only objects/arrays by default: null has typeof 'object' but is not an accepted default value. Inspect the final return to see what should block it.",
      "The fix is minimal: restore the truthiness guard. Keep includes(primitives, obj) and primitives = [null, false, true] exactly as the repo has them."
    ],
    "explanation_en": "The reference restores the final check to includes(primitives, obj) || (!!obj && typeof obj === 'object'). JSON.parse('null') produces null, and typeof null === 'object' is a historical JS quirk, so the defective version accepts 'null' as an object; !!obj blocks null (the only falsy value whose typeof is 'object') before the type check. The allow_primitives branch matches the parsed value against [null, false, true] with strict equality and is unaffected by the guard; allow_any_value returns true early after a successful parse. Common traps: replacing typeof with Array.isArray or a .constructor check so plain objects are rejected; changing includes' arguments or the primitives list so allow_primitives drifts; moving the guard before JSON.parse and affecting allow_any_value."
  },
  {
    "id": "c12-is-mongo-id",
    "title": "补全 isMongoId 的核心判断",
    "type": "fillin",
    "difficulty": "easy",
    "source": "src/lib/isMongoId.js:5",
    "entry": "isMongoId",
    "description": "背景：isMongoId 判定字符串是否为合法 MongoDB ObjectId：长度恰为 24 的十六进制串（大小写均可），底层复用 isHexadecimal（正则允许 0x/0h 前缀，长度约束由 isMongoId 把关）；非字符串入参抛 TypeError。要求：补全核心判断——先校验十六进制（复用已内联的 isHexadecimal）、再校验长度为 24，保留函数签名。验收标准：全部测试表达式通过；只补全被挖空的实现，不得引入依赖或改动其余代码。",
    "starter_code": "// isMongoId —— 校验 MongoDB ObjectId（fillin 起点）\n// 仓库来源：src/lib/isMongoId.js、src/lib/isHexadecimal.js（validator.js 13.15.35）\n// 契约：合法 ObjectId 是长度恰为 24 的十六进制串（大小写均可）。\n\nfunction assertString(input) {\n  if (input === undefined || input === null) throw new TypeError(`Expected a string but received a ${input}`);\n  if (input.constructor.name !== 'String') throw new TypeError(`Expected a string but received a ${input.constructor.name}`);\n}\n\nconst hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;\n\n// 内联自 src/lib/isHexadecimal.js\nfunction isHexadecimal(str) {\n  assertString(str);\n  return hexadecimal.test(str);\n}\n\nfunction isMongoId(str) {\n  assertString(str);\n\n  // TODO: 补全核心判断——字符串是十六进制（复用 isHexadecimal），且长度恰为 24\n}\n",
    "reference_solution": "// isMongoId —— 校验 MongoDB ObjectId（参考实现，与仓库 src/lib/isMongoId.js 一致）\n\nfunction assertString(input) {\n  if (input === undefined || input === null) throw new TypeError(`Expected a string but received a ${input}`);\n  if (input.constructor.name !== 'String') throw new TypeError(`Expected a string but received a ${input.constructor.name}`);\n}\n\nconst hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;\n\n// 内联自 src/lib/isHexadecimal.js\nfunction isHexadecimal(str) {\n  assertString(str);\n  return hexadecimal.test(str);\n}\n\nfunction isMongoId(str) {\n  assertString(str);\n  return isHexadecimal(str) && str.length === 24;\n}\n",
    "tests": [
      {
        "name": "合法 24 位十六进制",
        "expr": "isMongoId('507f1f77bcf86cd799439011') === true",
        "name_en": "Valid 24-character hex"
      },
      {
        "name": "全大写十六进制",
        "expr": "isMongoId('507F1F77BCF86CD799439011') === true",
        "name_en": "All-uppercase hex"
      },
      {
        "name": "大小写混合",
        "expr": "isMongoId('507f1F77BCf86cd799439011') === true",
        "name_en": "Mixed case"
      },
      {
        "name": "23 位被拒",
        "expr": "isMongoId('507f1f77bcf86cd79943901') === false",
        "name_en": "23 characters rejected"
      },
      {
        "name": "25 位被拒",
        "expr": "isMongoId('507f1f77bcf86cd7994390111') === false",
        "name_en": "25 characters rejected"
      },
      {
        "name": "24 位但含非十六进制字符 g",
        "expr": "isMongoId('507f1f77bcf86cd79943901g') === false",
        "name_en": "24 characters containing non-hex g"
      },
      {
        "name": "空串被拒",
        "expr": "isMongoId('') === false",
        "name_en": "Empty string rejected"
      },
      {
        "name": "带连字符的分段串被拒",
        "expr": "isMongoId('507f1f77-bcf8-6cd7-9943-9011') === false",
        "name_en": "Hyphenated string rejected"
      }
    ],
    "hints": [
      "核心判断就一行：isHexadecimal(str) && str.length === 24，先字符集后长度。",
      "大小写由 isHexadecimal 正则的 /i 标志处理，不需要额外 toLowerCase。",
      "空串、含 g、带连字符都倒在十六进制这关；23 位与 25 位倒在长度这关——两类检查缺一不可。"
    ],
    "explanation": "参考实现与仓库一致：return isHexadecimal(str) && str.length === 24。isHexadecimal 的正则 /^(0x|0h)?[0-9A-F]+$/i 天然支持大小写并放行 0x/0h 前缀，长度约束由 isMongoId 把关（'0x' 加 22 位十六进制恰好 24 位也会被接受，这是仓库现状）。常见坑：只查长度不查字符集（'507f1f77bcf86cd79943901g' 长度对但含 g）；只查字符集不查长度；用 parseInt(str, 16) 判断会放行前缀合法、尾部掺假的串——parseInt 停在第一个非法字符处并不返回 NaN。",
    "title_en": "Complete the core check in isMongoId",
    "description_en": "Context: isMongoId checks whether a string is a valid MongoDB ObjectId: exactly 24 hexadecimal characters (either case). It reuses isHexadecimal (whose regex allows an 0x/0h prefix; the length constraint is enforced by isMongoId). Non-string input throws TypeError. Task: complete the core check — validate hexadecimal first (using the inlined isHexadecimal), then length 24; keep the signature. Acceptance: all tests pass; only fill in the missing implementation, without dependencies or changes to other code.",
    "hints_en": [
      "The core check is one line: isHexadecimal(str) && str.length === 24 — character set first, then length.",
      "Case is handled by the /i flag in isHexadecimal's regex; no extra toLowerCase is needed.",
      "The empty string, a string with g, and hyphenated strings fail the hex check; 23- and 25-character strings fail the length check — both checks are required."
    ],
    "explanation_en": "The reference matches the repo: return isHexadecimal(str) && str.length === 24. isHexadecimal's regex /^(0x|0h)?[0-9A-F]+$/i is case-insensitive and allows the 0x/0h prefix; isMongoId enforces the length (so '0x' plus 22 hex characters, exactly 24 characters, is accepted — that is the repo's current behaviour). Common traps: checking length without the character set ('507f1f77bcf86cd79943901g' has the right length but contains g); checking the set without length; using parseInt(str, 16), which stops at the first invalid character and does not return NaN."
  },
  {
    "id": "capstone-signup",
    "title": "毕业项目：注册表单校验器",
    "type": "project",
    "difficulty": "hard",
    "source": "综合项目（第 1–4 章）",
    "entry": "validateSignup",
    "description": "把前四章拼成一个真实功能：实现 validateSignup(payload)，返回 { ok, errors }。payload 含 name / email / password / birthdate 四个字段；errors 只包含出错的字段，值是稳定的错误码。\n\n规则：\n1) name：去掉首尾空格后长度 2–40，否则 name_invalid。\n2) email：满足简单邮箱形状（本地部@域名.后缀），否则 email_invalid。\n3) password：至少 8 位，且同时含小写、大写、数字和符号 !@#$%^&* 中至少一个，否则 password_weak。\n4) birthdate：YYYY-MM-DD 的真实日期（2020-02-30 不合法），不能晚于 2026-11-10，且以 2026-11-10 为基准年满 13 岁（生日不晚于 2013-11-10）。错误码依次为 birthdate_invalid / birthdate_future / birthdate_too_young。\n\n验收：12 条测试表达式全过；返回对象的 ok 与 errors 必须同时正确。",
    "starter_code": "// validateSignup(payload) -> { ok, errors }\n// 规则见题面。errors 的键是字段名，值是错误码。\nfunction validateSignup(payload) {\n  // TODO: 实现 name / email / password / birthdate 四项校验\n  return { ok: false, errors: {} };\n}",
    "reference_solution": "// validateSignup —— 注册表单校验（毕业项目参考实现）\nfunction isValidDateString(s) {\n  if (typeof s !== 'string' || !/^\\d{4}-\\d{2}-\\d{2}$/.test(s)) return false;\n  var y = parseInt(s.slice(0, 4), 10);\n  var m = parseInt(s.slice(5, 7), 10);\n  var d = parseInt(s.slice(8, 10), 10);\n  if (m < 1 || m > 12 || d < 1 || d > 31) return false;\n  var dt = new Date(Date.UTC(y, m - 1, d));\n  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;\n}\n\nfunction validateSignup(payload) {\n  var p = payload || {};\n  var errors = {};\n\n  var name = typeof p.name === 'string' ? p.name.trim() : '';\n  if (name.length < 2 || name.length > 40) errors.name = 'name_invalid';\n\n  var email = typeof p.email === 'string' ? p.email.trim() : '';\n  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) errors.email = 'email_invalid';\n\n  var password = typeof p.password === 'string' ? p.password : '';\n  var strong = password.length >= 8 &&\n    /[a-z]/.test(password) && /[A-Z]/.test(password) &&\n    /[0-9]/.test(password) && /[!@#$%^&*]/.test(password);\n  if (!strong) errors.password = 'password_weak';\n\n  var birthdate = p.birthdate;\n  if (!isValidDateString(birthdate)) {\n    errors.birthdate = 'birthdate_invalid';\n  } else {\n    var born = Date.UTC(+birthdate.slice(0, 4), +birthdate.slice(5, 7) - 1, +birthdate.slice(8, 10));\n    var today = Date.UTC(2026, 10, 10);\n    var cutoff = Date.UTC(2013, 10, 10);\n    if (born > today) errors.birthdate = 'birthdate_future';\n    else if (born > cutoff) errors.birthdate = 'birthdate_too_young';\n  }\n\n  return { ok: Object.keys(errors).length === 0, errors: errors };\n}",
    "tests": [
      {
        "name": "完整合法表单通过",
        "expr": "validateSignup({ name: 'Ada Lovelace', email: 'ada@example.com', password: 'Str0ng!pass', birthdate: '2010-12-10' }).ok === true",
        "name_en": "Fully valid form passes"
      },
      {
        "name": "姓名过短被拒",
        "expr": "validateSignup({ name: 'A', email: 'ada@example.com', password: 'Str0ng!pass', birthdate: '2010-12-10' }).errors.name === 'name_invalid'",
        "name_en": "Too-short name rejected"
      },
      {
        "name": "邮箱缺少点号被拒",
        "expr": "validateSignup({ name: 'Ada', email: 'ada.example.com', password: 'Str0ng!pass', birthdate: '2010-12-10' }).errors.email === 'email_invalid'",
        "name_en": "Email missing the dot rejected"
      },
      {
        "name": "口令缺大写/数字/符号被拒",
        "expr": "validateSignup({ name: 'Ada', email: 'ada@example.com', password: 'weakpass', birthdate: '2010-12-10' }).errors.password === 'password_weak'",
        "name_en": "Password missing uppercase/digit/symbol rejected"
      },
      {
        "name": "口令全大写被拒",
        "expr": "validateSignup({ name: 'Ada', email: 'ada@example.com', password: 'STR0NG!PASS', birthdate: '2010-12-10' }).errors.password === 'password_weak'",
        "name_en": "All-uppercase password rejected"
      },
      {
        "name": "不存在的日期被拒",
        "expr": "validateSignup({ name: 'Ada', email: 'ada@example.com', password: 'Str0ng!pass', birthdate: '2010-02-30' }).errors.birthdate === 'birthdate_invalid'",
        "name_en": "Non-existent date rejected"
      },
      {
        "name": "差一天满 13 岁被拒",
        "expr": "validateSignup({ name: 'Ada', email: 'ada@example.com', password: 'Str0ng!pass', birthdate: '2013-11-11' }).errors.birthdate === 'birthdate_too_young'",
        "name_en": "One day short of 13 rejected"
      },
      {
        "name": "未来日期被拒",
        "expr": "validateSignup({ name: 'Ada', email: 'ada@example.com', password: 'Str0ng!pass', birthdate: '2027-01-01' }).errors.birthdate === 'birthdate_future'",
        "name_en": "Future date rejected"
      },
      {
        "name": "刚满 13 岁通过（边界）",
        "expr": "validateSignup({ name: 'Ada', email: 'ada@example.com', password: 'Str0ng!pass', birthdate: '2013-11-10' }).ok === true",
        "name_en": "Exactly 13 passes (boundary)"
      },
      {
        "name": "空对象四个字段全部报错",
        "expr": "validateSignup({}).ok === false && Object.keys(validateSignup({}).errors).length === 4",
        "name_en": "Empty object reports all four fields"
      },
      {
        "name": "邮箱缺少后缀点号被拒",
        "expr": "validateSignup({ name: 'Ada', email: 'ada@example', password: 'Str0ng!pass', birthdate: '2010-12-10' }).errors.email === 'email_invalid'",
        "name_en": "Email missing the suffix dot rejected"
      },
      {
        "name": "口令全小写被拒",
        "expr": "validateSignup({ name: 'Ada', email: 'ada@example.com', password: 'str0ng!pass', birthdate: '2010-12-10' }).errors.password === 'password_weak'",
        "name_en": "All-lowercase password rejected"
      }
    ],
    "hints": [
      "先写一个 isValidDateString：用 Date.UTC 构造日期，再回读年/月/日确认没有被滚动。",
      "把四个字段的校验写成分段 if，错误码只在失败时写入 errors；最后用 Object.keys(errors).length === 0 计算 ok。",
      "年龄边界用 Date.UTC 比较时间戳：生日时间戳大于 2013-11-10 就未满 13 岁，等于则刚好通过。"
    ],
    "explanation": "这题的关键不是把四个规则堆在一起，而是让错误码稳定、边界可验证。日期用 UTC 回读法处理 2 月 30 日、闰年等滚动问题；年龄用固定基准日 2026-11-10 比较时间戳，避免运行环境时区影响。",
    "title_en": "Capstone: registration form validator",
    "description_en": "Combine the first four chapters into one real feature: implement validateSignup(payload) returning { ok, errors }. payload has name / email / password / birthdate; errors contains only the invalid fields, each value a stable error code.\n\nRules:\n1) name: 2-40 characters after trimming, otherwise name_invalid.\n2) email: a simple email shape (local@domain.suffix), otherwise email_invalid.\n3) password: at least 8 characters with at least one lowercase, uppercase, digit and symbol from !@#$%^&*, otherwise password_weak.\n4) birthdate: a real YYYY-MM-DD date (2020-02-30 is invalid), not after 2026-11-10, and at least 13 years old relative to 2026-11-10 (birthday on or before 2013-11-10). Error codes in order: birthdate_invalid / birthdate_future / birthdate_too_young.\n\nAcceptance: all 12 test expressions pass; both ok and errors must be correct.",
    "hints_en": [
      "Write isValidDateString first: construct the date with Date.UTC, then read year/month/day back to confirm it did not roll over.",
      "Write the four field checks as separate if blocks; write an error code only when a check fails; compute ok with Object.keys(errors).length === 0.",
      "Use Date.UTC timestamps for the age boundary: a birthday after 2013-11-10 means under 13; equality passes."
    ],
    "explanation_en": "The point is not to pile four rules together but to keep error codes stable and boundaries testable. Dates use the UTC read-back trick for 30 February and leap years; age compares timestamps against the fixed reference date 2026-11-10, so the runtime time zone does not matter."
  }
];

window.CURRICULUM = {
  "course": {
    "title": "JavaScript 校验与解析",
    "subtitle": "从真实代码里学会校验、解析与边界处理",
    "levelTitles": [
      "Newcomer",
      "Apprentice",
      "Practitioner",
      "Engineer",
      "Maintainer"
    ],
    "levelSteps": [
      0,
      50,
      110,
      160,
      200
    ],
    "title_en": "JavaScript Validation & Parsing",
    "subtitle_en": "Learn validation, parsing and boundary handling from real code"
  },
  "chapters": [
    {
      "id": "ch1",
      "number": "01",
      "title": "校验和",
      "subtitle": "让错误无所遁形",
      "lesson": {
        "title": "校验和：一位数字的重量",
        "minutes": 6,
        "sections": [
          {
            "h": "输错一位，系统怎么知道？",
            "p": "银行卡、ISBN、身份证号都带一位校验位。它不是随机的：由前面的数字按固定规则算出来。只要规则对上，大部分手滑错误——输错一位、相邻两位写反——会被立刻发现。",
            "code": "",
            "h_en": "One wrong digit — how does the system know?",
            "p_en": "Bank cards, ISBNs and ID numbers all carry a check digit. It is not random: it is computed from the digits before it. When the rule matches, most slips — a mistyped digit, two adjacent digits swapped — are caught immediately."
          },
          {
            "h": "Luhn：从右往左，隔位翻倍",
            "p": "Luhn 是最常见的 mod 10 校验。从最右位开始，隔一位把数字乘 2；乘积大于 9 时把两位相加（15 变成 1+5=6）；全部加起来能被 10 整除就通过。",
            "code": "function luhn(s) {\n  let sum = 0, double = false;\n  for (let i = s.length - 1; i >= 0; i--) {\n    let d = +s[i];\n    if (double) { d *= 2; if (d > 9) d -= 9; }\n    sum += d; double = !double;\n  }\n  return sum % 10 === 0;\n}",
            "h_en": "Luhn: right to left, double every other digit",
            "p_en": "Luhn is the most common mod 10 check. Start at the rightmost digit and double every second digit; if the product is greater than 9, add its two digits (15 becomes 1+5=6); if the total is divisible by 10, the number passes."
          },
          {
            "h": "ISBN：mod 11 与 1/3 加权",
            "p": "ISBN-10 用 1 到 10 的权重做 mod 11，余数为 0 才合法；因为模 11 可能出现 10，所以最后一位允许写成 X。ISBN-13 用 1 和 3 交替加权做 mod 10，和 Luhn 是两种不同的规则。",
            "code": "",
            "h_en": "ISBN: mod 11 and 1/3 weighting",
            "p_en": "ISBN-10 uses weights 1 to 10 and a mod 11 check; the remainder must be 0. Because mod 11 can produce 10, the last character may be written as X. ISBN-13 uses alternating weights 1 and 3 with a mod 10 check — a different rule from Luhn."
          },
          {
            "h": "校验和防不了什么",
            "p": "校验和只擅长发现随机错误，不防伪造：知道规则的人可以构造一个校验通过的假号码。所以真实系统还要做长度、前缀、业务库、风控等检查。",
            "code": "",
            "h_en": "What a checksum cannot do",
            "p_en": "A checksum is good at catching random errors, not forgery: anyone who knows the rule can construct a fake number that passes. Real systems also check length, prefixes, business databases and risk rules."
          }
        ],
        "keyIdea": "校验位是廉价的第一道过滤器：先排除手滑，再谈业务。",
        "practice": "先做 Luhn，再做 ISBN：一个练循环，一个练两套规则并存。",
        "lede": "校验和是最便宜的错误检测：一位数字，能挡住大量手滑。",
        "title_en": "Checksums: the weight of one digit",
        "lede_en": "A checksum is the cheapest error detector: one digit can catch a lot of typos.",
        "keyIdea_en": "A check digit is a cheap first filter: rule out slips before talking about business rules.",
        "practice_en": "Do Luhn first, then ISBN: one trains a loop, the other two rules living side by side."
      },
      "exerciseIds": [
        "c02-luhn-check",
        "c03-is-isbn"
      ],
      "title_en": "Checksums",
      "subtitle_en": "Make errors visible"
    },
    {
      "id": "ch2",
      "number": "02",
      "title": "标识符与卡号",
      "subtitle": "固定格式的秘密",
      "lesson": {
        "title": "标识符与卡号：格式只是门卫",
        "minutes": 6,
        "sections": [
          {
            "h": "长度、字符集、前缀",
            "p": "很多标识符的合法性由三件事决定：长度、允许的字符集、前缀范围。MongoDB 的 ObjectId 是 24 位十六进制；Visa 卡号以 4 开头；Mir 的 BIN 在 2200 到 2204 之间。正则通常只检查这三件事。",
            "code": "",
            "h_en": "Length, character set, prefix",
            "p_en": "Many identifiers are defined by three things: length, allowed characters, and a prefix range. A MongoDB ObjectId is 24 hexadecimal characters; a Visa card starts with 4; Mir BINs range from 2200 to 2204. A regex usually checks only these three things."
          },
          {
            "h": "正则之后还有校验和",
            "p": "卡号即使命中机构正则，也要过 Luhn 校验。机构正则回答像不像，Luhn 回答数字本身有没有抄错。两层都过，才算格式合法。",
            "code": "",
            "h_en": "After the regex comes the checksum",
            "p_en": "Even if a card number matches an issuer regex, it still has to pass Luhn. The issuer regex answers 'does it look right'; Luhn answers 'was a digit copied wrong'. Both layers must pass for the format to be valid."
          },
          {
            "h": "格式合法不等于真实存在",
            "p": "一个 16 位数字可以通过所有格式检查，但仍然是编造的。格式校验只负责挡住明显错误；真实开卡、账户状态要查业务系统。",
            "code": "",
            "h_en": "Format-valid is not real",
            "p_en": "A 16-digit number can pass every format check and still be invented. Format validation only blocks obvious mistakes; real card issuance and account status live in a business system."
          }
        ],
        "keyIdea": "格式校验是门卫，不是数据库。",
        "practice": "先用正则在 BIN 表里选机构，再用 Luhn 排除抄错。",
        "lede": "卡号、ObjectId 这类标识符，格式只是第一层，校验和才是第二层。",
        "title_en": "Identifiers & card numbers: format is only the gatekeeper",
        "lede_en": "For identifiers such as card numbers and ObjectIds, format is the first layer; the checksum is the second.",
        "keyIdea_en": "Format validation is a gatekeeper, not a database.",
        "practice_en": "Use the regex to pick an issuer from the BIN table, then Luhn to rule out a miscopied digit."
      },
      "exerciseIds": [
        "c10-is-credit-card",
        "c12-is-mongo-id"
      ],
      "title_en": "Identifiers & Card Numbers",
      "subtitle_en": "The secret behind fixed formats"
    },
    {
      "id": "ch3",
      "number": "03",
      "title": "时间与编码",
      "subtitle": "日期、Base64 与它们的坑",
      "lesson": {
        "title": "时间与编码：日期会骗人，Base64 不是加密",
        "minutes": 7,
        "sections": [
          {
            "h": "日期字符串会骗人",
            "p": "new Date('2020-02-30') 不会报错，它会滚动到 3 月 1 日。判断日期是否真实存在，常用做法是构造 UTC 日期再回读：年、月、日必须和输入一致。闰年规则也因此自动生效。",
            "code": "const dt = new Date(Date.UTC(2020, 1, 30));\ndt.getUTCMonth(); // 2 -> March\ndt.getUTCDate();  // 1 -> not 30",
            "h_en": "Date strings can lie",
            "p_en": "new Date('2020-02-30') does not throw; it rolls over to March 1. To check whether a date really exists, construct a UTC date and read it back: year, month and day must match the input. Leap-year rules then apply automatically."
          },
          {
            "h": "分隔符与两位年份",
            "p": "同一套格式可以接受斜杠和连字符，严格模式则要求输入分隔符和格式一致。两位年份还要决定世纪：validator.js 以当前年份的后两位为界，小于它归到 20xx，否则归到 19xx。",
            "code": "",
            "h_en": "Delimiters and two-digit years",
            "p_en": "One format can accept slashes and hyphens; strict mode requires the input delimiter to match the format. Two-digit years also need a century: validator.js uses the last two digits of the current year as the boundary — lower goes to 20xx, otherwise 19xx."
          },
          {
            "h": "Base64 不是加密",
            "p": "Base64 只是把任意字节映射到 64 个可打印字符，任何人都能解码。标准字母表用 + 和 /，URL-safe 版本换成 - 和 _；padding 用 = 补齐到 4 的倍数。",
            "code": "",
            "h_en": "Base64 is not encryption",
            "p_en": "Base64 maps arbitrary bytes to 64 printable characters; anyone can decode it. The standard alphabet uses + and /, the URL-safe variant uses - and _; padding with = brings the length to a multiple of 4."
          }
        ],
        "keyIdea": "日期要回读，编码要分清字母表和 padding。",
        "practice": "一道题练日期回读，一道题练默认值与 URL-safe 的耦合。",
        "lede": "日期字符串会滚动，Base64 不是加密——两个最容易被想当然的地方。",
        "title_en": "Time & encoding: dates lie, Base64 is not encryption",
        "lede_en": "Date strings roll over, and Base64 is not encryption — two things that are easy to take for granted.",
        "keyIdea_en": "Read dates back; know the alphabet and padding of an encoding.",
        "practice_en": "One exercise trains date round-tripping; the other trains defaults and URL-safe coupling."
      },
      "exerciseIds": [
        "c04-is-date",
        "c07-is-base64"
      ],
      "title_en": "Time & Encoding",
      "subtitle_en": "Dates, Base64 and their traps"
    },
    {
      "id": "ch4",
      "number": "04",
      "title": "数据与安全",
      "subtitle": "JSON 与口令的边界",
      "lesson": {
        "title": "数据与安全：解析成功不等于类型正确",
        "minutes": 6,
        "sections": [
          {
            "h": "解析成功不等于类型正确",
            "p": "JSON.parse('null') 是合法的，JSON.parse('123') 也是。很多接口只接受对象或数组，所以校验器要区分能解析和是我们要的类型。allow_primitives 和 allow_any_value 就是在放松这层限制。",
            "code": "JSON.parse('null');  // null\nJSON.parse('123');   // 123\nJSON.parse('{a:1}'); // SyntaxError",
            "h_en": "Parsing successfully is not the right type",
            "p_en": "JSON.parse('null') is valid, and so is JSON.parse('123'). Many APIs only accept objects or arrays, so a validator must distinguish 'parses' from 'is the type we want'. allow_primitives and allow_any_value relax that boundary."
          },
          {
            "h": "口令强度不是字符种类堆砌",
            "p": "长度、大小写、数字、符号是常见门槛，但 Aaaa111! 依然很弱。唯一字符数能挡住大量重复；真正的强度还取决于是否出现在泄露库、是否可预测。",
            "code": "",
            "h_en": "Password strength is not a pile of character classes",
            "p_en": "Length, case, digits and symbols are common gates, but Aaaa111! is still weak. The number of unique characters blocks heavy repetition; real strength also depends on breach lists and predictability."
          },
          {
            "h": "校验的边界",
            "p": "前端校验只改善体验，不能替代服务端校验。格式合法不代表安全：限流、哈希存储、泄露检测、二次验证，都不在正则能解决的范围内。",
            "code": "",
            "h_en": "The boundary of validation",
            "p_en": "Client-side validation improves the experience; it cannot replace server-side checks. A valid format does not mean safe: rate limiting, hashed storage, breach detection and second-factor checks are outside what a regex can do."
          }
        ],
        "keyIdea": "校验器负责说不合法，不负责说安全。",
        "practice": "一道题练 JSON 的类型边界，一道题练口令的唯一字符阈值。",
        "lede": "能解析不等于类型正确，字符种类多不等于口令强。",
        "title_en": "Data & security: parsing successfully is not the same as having the right type",
        "lede_en": "Parsing successfully does not mean the type is right; many character classes do not make a password strong.",
        "keyIdea_en": "A validator says invalid; it does not say safe.",
        "practice_en": "One exercise trains JSON type boundaries; the other trains the unique-character threshold."
      },
      "exerciseIds": [
        "c11-is-json",
        "c09-is-strong-password"
      ],
      "title_en": "Data & Security",
      "subtitle_en": "Boundaries of JSON and passwords"
    },
    {
      "id": "ch5",
      "number": "05",
      "title": "毕业项目",
      "subtitle": "把四章拼成一个功能",
      "lesson": {
        "title": "毕业项目：注册表单校验器",
        "minutes": 8,
        "sections": [
          {
            "h": "把四章拼起来",
            "p": "注册表单同时涉及字符串、邮箱、口令和日期。你要写一个 validateSignup(payload)，返回 { ok, errors }；errors 只包含出错的字段，值是错误码。",
            "code": "validateSignup({\n  name: 'Ada',\n  email: 'ada@example.com',\n  password: 'Str0ng!pass',\n  birthdate: '2010-12-10'\n}); // { ok: true, errors: {} }",
            "h_en": "Put the four chapters together",
            "p_en": "A registration form touches strings, email, passwords and dates. Implement validateSignup(payload) returning { ok, errors }; errors contains only the invalid fields, and each value is an error code."
          },
          {
            "h": "规则",
            "p": "name 去掉首尾空格后 2 到 40 个字符；email 需要满足简单的邮箱形状；password 至少 8 位，且包含小写、大写、数字和符号 !@#$%^&* 中的至少一个；birthdate 必须是 YYYY-MM-DD 的真实日期，不能是未来，且以 2026-11-10 为基准年满 13 岁。",
            "code": "",
            "h_en": "Rules",
            "p_en": "name: 2-40 characters after trimming; email: a simple email shape; password: at least 8 characters with at least one lowercase, uppercase, digit and symbol from !@#$%^&*; birthdate: a real YYYY-MM-DD date, not in the future, and at least 13 years old relative to 2026-11-10."
          },
          {
            "h": "验收",
            "p": "12 条测试覆盖：全合法、四个字段分别出错、未来日期、刚满 13 岁、空对象。先让参考解全过，再让起始代码至少挂一条。",
            "code": "",
            "h_en": "Acceptance",
            "p_en": "12 tests cover: a fully valid form, each field failing, a future date, exactly 13 years old, and an empty object. Make the reference solution pass all of them, and the starter fail at least one."
          }
        ],
        "keyIdea": "校验的顺序不重要，错误码的稳定性很重要——调用方要靠它做提示。",
        "practice": "做完这一题，你就是这门课的 Maintainer。",
        "lede": "把四章的规则拼成一个注册表单校验器。",
        "title_en": "Capstone: registration form validator",
        "lede_en": "Combine the rules from four chapters into one registration form validator.",
        "keyIdea_en": "Order does not matter; stable error codes do — callers use them to show messages.",
        "practice_en": "Finish this and you are the Maintainer of this course."
      },
      "exerciseIds": [
        "capstone-signup"
      ],
      "title_en": "Capstone",
      "subtitle_en": "Combine the four chapters"
    }
  ]
};

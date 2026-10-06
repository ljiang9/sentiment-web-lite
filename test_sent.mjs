// test_sent.mjs — 情感分析纯函数 Node 断言。
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import assert from "node:assert";

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, "index.html"), "utf-8");
const m = html.match(/\/\/ ===== 纯函数：词典法情感[\s\S]*?\/\/ ===== SENT_LOGIC_END =====/);
assert.ok(m, "未找到情感纯函数标记");
const f = new Function(`${m[0]}\nreturn { analyze };`)();

assert.strictEqual(f.analyze("这个产品很好，我很喜欢").label, "正面");
assert.strictEqual(f.analyze("这个太差了，非常失望").label, "负面");
// 否定翻转
assert.strictEqual(f.analyze("并不满意").label, "负面");
// 中性
assert.strictEqual(f.analyze("今天周三").label, "中性");

console.log("OK: sentiment-web-lite 全部用例通过");
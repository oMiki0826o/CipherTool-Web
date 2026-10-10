import { affine, atbash, caesar, railFence, railFenceDecode, rot13, vigenere } from "./ciphers";
import { base64Decode, base64Encode, hexDecode, hexEncode, morseDecode, morseEncode, urlDecode, urlEncode } from "./encodings";
export type Tool = { slug: string; name: string; english: string; description: string; fields: { key: string; label: string; type: "number" | "text"; defaultValue?: string; placeholder?: string }[]; transform: (text: string, fields: Record<string, string>, decrypt?: boolean) => string };
const number = (key: string, label: string, value: string) => ({ key, label, type: "number" as const, defaultValue: value });
export const tools: Tool[] = [
  { slug: "caesar", name: "凱撒密碼", english: "Caesar cipher", description: "以固定位移替換英文字母。", fields: [number("shift", "位移", "3")], transform: (text, fields, decrypt) => caesar(text, (Number(fields.shift) || 0) * (decrypt ? -1 : 1)) },
  { slug: "rot13", name: "ROT13", english: "ROT13", description: "固定位移 13 格的可逆替換。", fields: [], transform: text => rot13(text) },
  { slug: "atbash", name: "Atbash", english: "Atbash", description: "將字母表前後對調。", fields: [], transform: text => atbash(text) },
  { slug: "vigenere", name: "維吉尼亞密碼", english: "Vigenère cipher", description: "使用關鍵字輪替位移。", fields: [{ key: "keyword", label: "關鍵字", type: "text", defaultValue: "MIKI" }], transform: (text, fields, decrypt) => vigenere(text, fields.keyword, decrypt) },
  { slug: "affine", name: "仿射密碼", english: "Affine cipher", description: "以乘法與加法參數替換字母。", fields: [number("a", "乘數 a", "5"), number("b", "位移 b", "8")], transform: (text, fields, decrypt) => affine(text, Number(fields.a) || 1, Number(fields.b) || 0, decrypt) },
  { slug: "rail-fence", name: "欄柵密碼", english: "Rail fence cipher", description: "把文字沿鋸齒路徑排列。", fields: [number("rails", "欄數", "3")], transform: (text, fields, decrypt) => decrypt ? railFenceDecode(text, Number(fields.rails) || 3) : railFence(text, Number(fields.rails) || 3) },
  { slug: "base64", name: "Base64", english: "Base64", description: "將 UTF-8 文字轉成 Base64。", fields: [], transform: (text, _, decrypt) => decrypt ? base64Decode(text) : base64Encode(text) },
  { slug: "hex", name: "十六進位", english: "Hex encoding", description: "在 UTF-8 文字與十六進位位元組間轉換。", fields: [], transform: (text, _, decrypt) => decrypt ? hexDecode(text) : hexEncode(text) },
  { slug: "url", name: "URL 編碼", english: "URL encoding", description: "安全處理 URL 中的特殊字元。", fields: [], transform: (text, _, decrypt) => decrypt ? urlDecode(text) : urlEncode(text) },
  { slug: "morse", name: "摩斯密碼", english: "Morse code", description: "在文字與點劃符號間轉換。", fields: [], transform: (text, _, decrypt) => decrypt ? morseDecode(text) : morseEncode(text) },
];
export const getTool = (slug: string) => tools.find(tool => tool.slug === slug);

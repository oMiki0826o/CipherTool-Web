import { affine, alberti, atbash, autokey, bacon, beaufort, caesar, columnar, kamasutra, playfair, polybius, railFence, railFenceDecode, rot13, scytale, substitution, vigenere } from "./ciphers";
import { base32Decode, base32Encode, base64Decode, base64Encode, hexDecode, hexEncode, morseDecode, morseEncode, urlDecode, urlEncode } from "./encodings";
export type Tool = { slug: string; name: string; english: string; description: string; fields: { key: string; label: string; type?: "number" | "text"; defaultValue?: string; placeholder?: string }[]; transform: (text: string, fields: Record<string, string>, decrypt?: boolean) => string };
const number = (key: string, label: string, value: string) => ({ key, label, type: "number" as const, defaultValue: value });
export const tools: Tool[] = [
  { slug: "caesar", name: "凱撒密碼", english: "Caesar cipher", description: "以固定位移替換英文字母。", fields: [number("shift", "位移", "3")], transform: (text, fields, decrypt) => caesar(text, (Number(fields.shift) || 0) * (decrypt ? -1 : 1)) },
  { slug: "rot13", name: "ROT13", english: "ROT13", description: "固定位移 13 格的可逆替換。", fields: [], transform: text => rot13(text) },
  { slug: "atbash", name: "Atbash", english: "Atbash", description: "將字母表前後對調。", fields: [], transform: text => atbash(text) },
  { slug: "vigenere", name: "維吉尼亞密碼", english: "Vigenère cipher", description: "使用關鍵字輪替位移。", fields: [{ key: "keyword", label: "關鍵字", type: "text", defaultValue: "MIKI" }], transform: (text, fields, decrypt) => vigenere(text, fields.keyword, decrypt) },
  { slug: "affine", name: "仿射密碼", english: "Affine cipher", description: "以乘法與加法參數替換字母。", fields: [number("a", "乘數 a", "5"), number("b", "位移 b", "8")], transform: (text, fields, decrypt) => affine(text, Number(fields.a) || 1, Number(fields.b) || 0, decrypt) },
  { slug: "rail-fence", name: "欄柵密碼", english: "Rail fence cipher", description: "把文字沿鋸齒路徑排列。", fields: [number("rails", "欄數", "3")], transform: (text, fields, decrypt) => decrypt ? railFenceDecode(text, Number(fields.rails) || 3) : railFence(text, Number(fields.rails) || 3) },
  { slug: "substitution", name: "單表替換", english: "Simple substitution", description: "使用自訂 26 字母替換表。", fields: [{ key: "alphabet", label: "替換表", defaultValue: "QWERTYUIOPASDFGHJKLZXCVBNM" }], transform: (text, fields, decrypt) => substitution(text, fields.alphabet, decrypt) },
  { slug: "beaufort", name: "博福特密碼", english: "Beaufort cipher", description: "一種可逆的關鍵字替換密碼。", fields: [{ key: "keyword", label: "關鍵字", defaultValue: "LEMON" }], transform: (text, fields) => beaufort(text, fields.keyword) },
  { slug: "autokey", name: "自動密鑰", english: "Autokey cipher", description: "以明文延伸關鍵字的維吉尼亞變體。", fields: [{ key: "keyword", label: "起始關鍵字", defaultValue: "QUEENLY" }], transform: (text, fields, decrypt) => autokey(text, fields.keyword, decrypt) },
  { slug: "columnar", name: "欄位換位", english: "Columnar transposition", description: "依關鍵字順序讀取文字欄位。", fields: [{ key: "keyword", label: "關鍵字", defaultValue: "ZEBRAS" }], transform: (text, fields, decrypt) => columnar(text, fields.keyword, decrypt) },
  { slug: "scytale", name: "天書棒", english: "Scytale", description: "以固定欄數重新排列文字。", fields: [number("columns", "欄數", "4")], transform: (text, fields, decrypt) => scytale(text, Number(fields.columns) || 4, decrypt) },
  { slug: "polybius", name: "波利比奧斯方格", english: "Polybius square", description: "以五乘五方格表示英文字母。", fields: [], transform: (text, _, decrypt) => polybius(text, decrypt) },
  { slug: "playfair", name: "普雷費爾密碼", english: "Playfair cipher", description: "以關鍵字建立五乘五字母方格。", fields: [{ key: "keyword", label: "關鍵字", defaultValue: "MONARCHY" }], transform: (text, fields, decrypt) => playfair(text, fields.keyword, decrypt) },
  { slug: "bacon", name: "培根密碼", english: "Bacon cipher", description: "以 A 與 B 的五位群組表示字母。", fields: [], transform: (text, _, decrypt) => bacon(text, decrypt) },
  { slug: "kamasutra", name: "卡馬蘇特拉密碼", english: "Kamasutra cipher", description: "依成對字母表互換字母。", fields: [{ key: "pairs", label: "字母配對", defaultValue: "AB CD EF GH IJ KL MN OP QR ST UV WX YZ" }], transform: (text, fields) => kamasutra(text, fields.pairs) },
  { slug: "alberti", name: "阿爾貝蒂轉盤", english: "Alberti cipher disk", description: "以位移模擬可調式密碼轉盤。", fields: [number("position", "轉盤位置", "7")], transform: (text, fields, decrypt) => alberti(text, Number(fields.position) || 0, decrypt) },
  { slug: "base64", name: "Base64", english: "Base64", description: "將 UTF-8 文字轉成 Base64。", fields: [], transform: (text, _, decrypt) => decrypt ? base64Decode(text) : base64Encode(text) },
  { slug: "base32", name: "Base32", english: "Base32", description: "將 UTF-8 文字轉成 Base32。", fields: [], transform: (text, _, decrypt) => decrypt ? base32Decode(text) : base32Encode(text) },
  { slug: "hex", name: "十六進位", english: "Hex encoding", description: "在 UTF-8 文字與十六進位位元組間轉換。", fields: [], transform: (text, _, decrypt) => decrypt ? hexDecode(text) : hexEncode(text) },
  { slug: "url", name: "URL 編碼", english: "URL encoding", description: "安全處理 URL 中的特殊字元。", fields: [], transform: (text, _, decrypt) => decrypt ? urlDecode(text) : urlEncode(text) },
  { slug: "morse", name: "摩斯密碼", english: "Morse code", description: "在文字與點劃符號間轉換。", fields: [], transform: (text, _, decrypt) => decrypt ? morseDecode(text) : morseEncode(text) },
];
export const getTool = (slug: string) => tools.find(tool => tool.slug === slug);

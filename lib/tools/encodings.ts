export function base64Encode(text: string): string { const bytes = new TextEncoder().encode(text); let binary = ""; bytes.forEach(byte => { binary += String.fromCharCode(byte); }); return btoa(binary); }
export function base64Decode(text: string): string { const binary = atob(text); return new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0))); }
export const hexEncode = (text: string) => Array.from(new TextEncoder().encode(text), byte => byte.toString(16).padStart(2, "0")).join(" ");
export function hexDecode(text: string): string { const clean = text.replace(/\s+/g, ""); if (!/^(?:[0-9a-f]{2})*$/i.test(clean)) throw new Error("Hex 內容必須是成對的十六進位字元"); return new TextDecoder().decode(Uint8Array.from(clean.match(/.{2}/g) ?? [], pair => parseInt(pair, 16))); }
export const urlEncode = (text: string) => encodeURIComponent(text);
export const urlDecode = (text: string) => decodeURIComponent(text);
const morse: Record<string, string> = { A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----." };
export const morseEncode = (text: string) => text.toUpperCase().split(" ").map(word => [...word].map(char => morse[char] ?? char).join(" ")).join(" / ");
export function morseDecode(text: string): string { const reverse = Object.fromEntries(Object.entries(morse).map(([key, value]) => [value, key])); return text.split("/").map(word => word.trim().split(/\s+/).map(code => reverse[code] ?? code).join("")).join(" "); }

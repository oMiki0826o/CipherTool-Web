import { describe, expect, it } from "vitest";
import { affine, atbash, caesar, railFence, railFenceDecode, rot13, vigenere } from "./ciphers";

describe("classic ciphers", () => {
  it("handles Caesar and reversible substitutions", () => { expect(caesar("Abc xyz!", 3)).toBe("Def abc!"); expect(caesar("Def abc!", -3)).toBe("Abc xyz!"); expect(rot13("Hello")).toBe("Uryyb"); expect(atbash("Abc XYZ")).toBe("Zyx CBA"); });
  it("handles keyword and rail fence ciphers", () => { expect(vigenere("Attack at dawn", "LEMON")).toBe("Lxfopv ef rnhr"); expect(railFenceDecode(railFence("WE ARE DISCOVERED", 3), 3)).toBe("WE ARE DISCOVERED"); });
  it("supports affine encryption", () => { expect(affine("AFFINE", 5, 8)).toBe("IHHWVC"); expect(affine("IHHWVC", 5, 8, true)).toBe("AFFINE"); });
});

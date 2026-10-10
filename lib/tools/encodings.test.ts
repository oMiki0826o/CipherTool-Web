import { describe, expect, it } from "vitest";
import { base64Decode, base64Encode, hexDecode, hexEncode, morseDecode, morseEncode, urlDecode, urlEncode } from "./encodings";

describe("encodings", () => {
  it("round trips Unicode text", () => { const value = "Miki 測試"; expect(base64Decode(base64Encode(value))).toBe(value); expect(hexDecode(hexEncode(value))).toBe(value); expect(urlDecode(urlEncode(value))).toBe(value); });
  it("round trips Morse", () => { expect(morseDecode(morseEncode("SOS TEST"))).toBe("SOS TEST"); });
});

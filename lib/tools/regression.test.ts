import { describe, expect, it } from "vitest";
import { affine, autokey, cardano, columnar, enigma, hill, pigpen, playfair, railFence, railFenceDecode, scytale } from "./ciphers";
import { base32Decode, hexDecode } from "./encodings";

describe("regression and input validation", () => {
 it("autokey extends plaintext on encryption and decryption", () => { const plain="AAAA";expect(autokey(plain,"B")).toBe("BAAA");expect(autokey(autokey(plain,"B"),"B",true)).toBe(plain); });
 it("preserves Unicode scalar values in transpositions", () => {const plain="A🙂B🌟C中";expect(railFenceDecode(railFence(plain,3),3)).toBe(plain);expect(columnar(columnar(plain,"ZEBRAS"),"ZEBRAS",true)).toBe(plain);expect(scytale(scytale(plain,3),3,true)).toBe(plain);});
 it("rejects non-invertible affine and hill keys", () => {expect(()=>affine("HELLO",2,1)).toThrow();expect(()=>hill("HELLO","2,4,2,4")).toThrow();});
 it("roundtrips fixed-size Cardano blocks", () => {const plain="ABCDEFGHIJKLMNOP";expect(cardano(cardano(plain),true)).toBe(plain);expect(()=>cardano("A".repeat(17))).toThrow();});
 it("maps all 26 pigpen letters", () => {const coded=pigpen("ABCDEFGHIJKLMNOPQRSTUVWXYZ");expect(Array.from(new Set(coded)).length).toBe(26);expect(pigpen(coded,true)).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");});
 it("Enigma I is reciprocal and steps rotors", () => {const plain="HELLOWORLD";expect(enigma(enigma(plain,"AAA"),"AAA")).toBe(plain);expect(enigma(plain,"AAA")).not.toBe(enigma(plain,"BAA"));});
 it("Playfair handles repeated X letters", () => {expect(playfair("XX","MONARCHY")).toHaveLength(4);});
 it("rejects invalid UTF-8 and malformed Base32", () => {expect(()=>hexDecode("ff")).toThrow();expect(()=>base32Decode("M=======" )).toThrow();});
});

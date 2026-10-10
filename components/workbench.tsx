"use client";
import { useMemo, useState } from "react";
import { getTool, tools } from "@/lib/tools";

export function Workbench({ initialSlug = "caesar" }: { initialSlug?: string }) {
  const [slug, setSlug] = useState(initialSlug);
  const [decrypt, setDecrypt] = useState(false);
  const [text, setText] = useState("Meet me at seven.");
  const [options, setOptions] = useState<Record<string, string>>({ shift: "3", keyword: "Miki", rails: "3", a: "5", b: "8" });
  const tool = getTool(slug) ?? tools[0];
  const result = useMemo(() => {
    try { return tool.transform(text, options, decrypt); } catch (error) { return error instanceof Error ? error.message : "輸入格式不正確"; }
  }, [text, options, tool, decrypt]);
  const update = (key: string, value: string) => setOptions((current) => ({ ...current, [key]: value }));
  return <section className="workbench" aria-label="CipherTool 工作台">
    <div className="tool-picker"><label htmlFor="tool">工具</label><select id="tool" value={slug} onChange={(event) => setSlug(event.target.value)}>{tools.map((item) => <option key={item.slug} value={item.slug}>{item.name} · {item.english}</option>)}</select><p>{tool.description}</p><label className="mode-toggle"><input type="checkbox" checked={decrypt} onChange={(event) => setDecrypt(event.target.checked)} /> 解碼／解密模式</label></div>
    <div className="fields">{tool.fields.map((field) => <label key={field.key}>{field.label}<input value={options[field.key] ?? field.defaultValue ?? ""} onChange={(event) => update(field.key, event.target.value)} placeholder={field.placeholder} /></label>)}</div>
    <div className="editor-grid"><label>輸入文字<textarea value={text} onChange={(event) => setText(event.target.value)} rows={8} /></label><label>結果<textarea value={result} readOnly rows={8} /></label></div>
    <div className="workbench-foot"><a href={`./tools/${tool.slug}/`}>開啟獨立工具頁</a><button onClick={() => navigator.clipboard?.writeText(result)}>複製結果</button></div>
  </section>;
}

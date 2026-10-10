"use client";
import { useMemo, useState } from "react";
import { getTool, tools } from "@/lib/tools";

export function Workbench({ initialSlug = "caesar" }: { initialSlug?: string }) {
 const [slug,setSlug]=useState(initialSlug);
 const [decrypt,setDecrypt]=useState(false);
 const [input,setInput]=useState("Meet me at seven.");
 const [values,setValues]=useState<Record<string,Record<string,string>>>({});
 const [notice,setNotice]=useState("");
 const tool=getTool(slug)??tools[0];
 const fields=Object.fromEntries(tool.fields.map(field=>[field.key,values[slug]?.[field.key]??field.defaultValue??""]));
 const outcome=useMemo(()=>{try{return {result:tool.transform(input,fields,decrypt),error:""};}catch(error){return {result:"",error:error instanceof Error?error.message:"輸入格式不正確"};}},[tool,input,decrypt,values,slug]);
 const update=(key:string,value:string)=>setValues(current=>({...current,[slug]:{...current[slug],[key]:value}}));
 const root=process.env.NEXT_PUBLIC_BASE_PATH??"";
 const copy=async()=>{try{await navigator.clipboard.writeText(outcome.result);setNotice("已複製結果");}catch{setNotice("無法複製，請手動選取結果");}};
 const download=()=>{const blob=new Blob([outcome.result],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download=`${slug}-result.txt`;link.click();URL.revokeObjectURL(url);};
 return <section className="workbench" aria-label="CipherTool 工作台">
 <div className="tool-picker"><label htmlFor="tool">工具</label><select id="tool" value={slug} onChange={event=>{setSlug(event.target.value);setNotice("");}}>{tools.map(item=><option key={item.slug} value={item.slug}>{item.name} · {item.english}</option>)}</select><p>{tool.description}</p><label className="mode-toggle"><input type="checkbox" checked={decrypt} onChange={event=>setDecrypt(event.target.checked)}/> 解碼／解密模式</label></div>
 <div className="fields">{tool.fields.map(field=><label key={field.key}>{field.label}<input type={field.type??"text"} value={fields[field.key]} onChange={event=>update(field.key,event.target.value)} placeholder={field.placeholder}/></label>)}</div>
 <div className="editor-grid"><label>輸入文字<textarea value={input} onChange={event=>setInput(event.target.value)} rows={8}/></label><label>結果<textarea value={outcome.result} readOnly rows={8} aria-invalid={Boolean(outcome.error)}/></label></div>
 {outcome.error&&<p className="workbench-error" role="alert">{outcome.error}</p>}
 <div className="workbench-foot"><a href={`${root}/tools/${tool.slug}/`}>開啟獨立工具頁</a><div className="workbench-actions"><button type="button" onClick={()=>{setInput("");setNotice("");}}>清除輸入</button><button type="button" onClick={download} disabled={Boolean(outcome.error)||!outcome.result}>下載 TXT</button><button type="button" onClick={copy} disabled={Boolean(outcome.error)||!outcome.result}>複製結果</button></div></div>
 {notice&&<p role="status" className="workbench-notice">{notice}</p>}
 </section>;
}

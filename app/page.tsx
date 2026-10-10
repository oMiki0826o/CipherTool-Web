import { ThemeToggle } from "@/components/theme-toggle";
import { Workbench } from "@/components/workbench";
import { tools } from "@/lib/tools";

export default function Home() {
  return <main className="site-shell"><header className="site-header"><a className="brand" href="./">CipherTool <span>WEB</span></a><nav><a href="#workbench">工作台</a><a href="#tools">工具索引</a><a href="https://github.com/oMiki0826o/CipherTool" target="_blank" rel="noreferrer">原始專案</a><ThemeToggle /></nav></header><section className="hero"><p className="eyebrow">文字工具室 / 01</p><h1>把文字換一種<br /><em>讀法。</em></h1><p className="lead">經典密碼與文字編碼，直接在瀏覽器裡使用。內容只在你的裝置上處理，不需要登入，也不會上傳。</p></section><div id="workbench"><Workbench /></div><section id="tools" className="tool-index"><div><p className="eyebrow">工具目錄</p><h2>工具索引</h2></div><div className="tool-list">{tools.map((tool, index) => <a className="tool-row" href={`./tools/${tool.slug}/`} key={tool.slug}><span>{String(index + 1).padStart(2, "0")}</span><strong>{tool.name}</strong><small>{tool.english} · {tool.description}</small><b>查看</b></a>)}</div></section><footer>CipherTool Web · 靜態工具 · 僅供學習與文字處理</footer></main>;
}

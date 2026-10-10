import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Workbench } from "@/components/workbench";
import { getTool, tools } from "@/lib/tools";

export function generateStaticParams() { return tools.map((tool) => ({ slug: tool.slug })); }
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return <main className="site-shell tool-page"><header className="site-header"><a className="brand" href="../../">CipherTool <span>WEB</span></a><nav><a href="../../">← 工作台</a><ThemeToggle /></nav></header><section className="hero compact"><p className="eyebrow">TOOL / {tool.slug.toUpperCase()}</p><h1>{tool.name}</h1><p className="lead">{tool.description}</p></section><Workbench initialSlug={tool.slug} /></main>;
}

/**
 * 论文标签：PDF / Code / Agent / VLM 等
 * 主色系用于 PDF/Link 等，副色系用于 Code/Agent/VLM/Dataset 等
 */
export default function PublicationTag({ text, href }: { text: string; href?: string }) {
  const isSecondary = ['Code', 'New', 'Demo', 'Agent', 'VLM', 'Dataset'].some((t) =>
    text.toLowerCase().includes(t.toLowerCase())
  )
  const className = isSecondary
    ? 'border-secondary/40 bg-secondary/20 text-secondary'
    : 'border-primary/40 bg-primary/20 text-primary'
  const tag = (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium uppercase ${className}`}
    >
      {text}
    </span>
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {tag}
      </a>
    )
  }
  return tag
}

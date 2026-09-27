import './AiFab.css'

export default function AiFab() {
  const openDrawer = () => {
    window.dispatchEvent(new CustomEvent('open-ai-drawer'))
  }

  return (
    <button
      className="ai-fab"
      onClick={openDrawer}
      aria-label="Chat with AI about Mohd Jibraan"
    >
      <span className="ai-fab-spark">✦</span>
      <span className="ai-fab-label">AI</span>
    </button>
  )
}

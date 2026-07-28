import seriesData from "../data/stm-series.json";

const { posts } = seriesData;
const sections = [...new Set(posts.map(entry => entry.section))];

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function buildStmReadingGuideHtml() {
  const sectionBlocks = sections
    .map(section => {
      const items = posts
        .filter(entry => entry.section === section)
        .map(
          entry => `
            <li>
              <a href="/posts/${entry.slug}/">
                <span class="stm-guide-title">${escapeHtml(entry.title)}</span>
                <span class="stm-guide-desc">${escapeHtml(entry.description)}</span>
              </a>
            </li>`
        )
        .join("");

      return `
        <section class="stm-guide-section">
          <h3>${escapeHtml(section)}</h3>
          <ol>${items}</ol>
        </section>`;
    })
    .join("");

  return `
    <nav class="stm-reading-guide not-prose" aria-label="STM project reading guide">
      <h2>Project Reading Guide</h2>
      ${sectionBlocks}
    </nav>`;
}

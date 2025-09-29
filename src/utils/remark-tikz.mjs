import { visit } from 'unist-util-visit';

/**
 * Remark plugin to convert TikZ code blocks to client-side renderable format
 */
export function remarkTikz() {
  return function transformer(tree) {
    // Find all tikz code blocks
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'tikz') {
        try {
          // Wrap TikZ code in tikzpicture environment if not already wrapped
          let tikzCode = node.value.trim();
          if (!tikzCode.includes('\\begin{tikzpicture}')) {
            tikzCode = `\\begin{tikzpicture}[scale=1]\n${tikzCode}\n\\end{tikzpicture}`;
          }
          
          // Create HTML node with TikZ script that will be rendered client-side
          const htmlNode = {
            type: 'html',
            value: `<div class="tikz-container" style="text-align: center; margin: 1rem 0;">
              <script type="text/tikz">
                ${tikzCode}
              </script>
            </div>`
          };
          
          // Replace the code node with the HTML node
          parent.children[index] = htmlNode;
        } catch (error) {
          console.warn(`Failed to process TikZ diagram: ${error.message}`);
          // Keep the original code block as fallback
        }
      }
    });
  };
}
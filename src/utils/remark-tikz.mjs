import { visit } from 'unist-util-visit';
import tikzjax from 'node-tikzjax';
const { tex2svg } = tikzjax;

/**
 * Remark plugin to render TikZ diagrams as SVG
 */
export function remarkTikz() {
  return async function transformer(tree) {
    const tikzNodes = [];
    
    // Find all tikz code blocks
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'tikz') {
        tikzNodes.push({ node, index, parent });
      }
    });
    
    // Process each tikz node
    for (const { node, index, parent } of tikzNodes) {
      try {
        // Wrap TikZ code in tikzpicture environment if not already wrapped
        let tikzCode = node.value.trim();
        if (!tikzCode.includes('\\begin{tikzpicture}')) {
          tikzCode = `\\begin{tikzpicture}[scale=1]\n${tikzCode}\n\\end{tikzpicture}`;
        }
        
        // Render TikZ to SVG
        const svgResult = await tex2svg(tikzCode);
        
        if (svgResult && svgResult.svg) {
          // Create HTML node with the SVG
          const htmlNode = {
            type: 'html',
            value: `<div class="tikz-diagram" style="text-align: center; margin: 1rem 0;">${svgResult.svg}</div>`
          };
          
          // Replace the code node with the HTML node
          parent.children[index] = htmlNode;
        }
      } catch (error) {
        console.warn(`Failed to render TikZ diagram: ${error.message}`);
        // Keep the original code block as fallback
      }
    }
  };
}
import { visit } from "unist-util-visit";
import { buildStmReadingGuideHtml } from "./stm-reading-guide.mjs";

const READING_GUIDE_MARKER = "stm-reading-guide";

export function remarkStmReadingGuide() {
  return (tree, file) => {
    if (!file.path?.includes("stm-global.md")) return;

    visit(tree, "html", (node, index, parent) => {
      if (!node.value?.includes(READING_GUIDE_MARKER)) return;

      parent.children[index] = {
        type: "html",
        value: buildStmReadingGuideHtml(),
      };
    });
  };
}

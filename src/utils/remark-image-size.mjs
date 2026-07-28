import { visit } from "unist-util-visit";

const TWO_NUMBER_PATTERN = /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)$/;
const ONE_NUMBER_PATTERN = /^(\d+(?:\.\d+)?)$/;

function parseSize(text) {
  if (!text) return null;

  const trimmed = text.trim();
  const pair = trimmed.match(TWO_NUMBER_PATTERN);

  if (pair) {
    return {
      width: `${pair[1]}%`,
      height: `${pair[2]}%`,
    };
  }

  const single = trimmed.match(ONE_NUMBER_PATTERN);

  if (single) {
    return {
      width: `${single[1]}%`,
      height: `${single[1]}%`,
    };
  }

  return null;
}

function parseAltSize(alt) {
  if (!alt) return null;

  const match = alt.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*$/);
  if (!match) return null;

  return {
    alt: match[1].trim(),
    size: {
      width: `${match[2]}%`,
      height: `${match[3]}%`,
    },
  };
}

function applyImageSize(node, size) {
  node.data = node.data || {};
  node.data.hProperties = {
    ...(node.data.hProperties || {}),
    style: `width: ${size.width}; height: ${size.height};`,
  };
}

export function remarkImageSize() {
  return tree => {
    visit(tree, "image", node => {
      const titleSize = parseSize(node.title);
      if (titleSize) {
        applyImageSize(node, titleSize);
        node.title = null;
        return;
      }

      const altSize = parseAltSize(node.alt);
      if (altSize) {
        node.alt = altSize.alt;
        applyImageSize(node, altSize.size);
      }
    });
  };
}

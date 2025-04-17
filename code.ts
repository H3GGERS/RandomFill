// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// code.ts

// List of color token names to pull from
const colorTokenNames = ['Token/Primary', 'Token/Secondary', 'Token/Accent', 'Token/Neutral'];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const selection = figma.currentPage.selection;

if (selection.length === 0) {
  figma.notify("Please select at least one object.");
  figma.closePlugin();
} else {
  // Get all paint styles in the document
  const allPaintStyles = figma.getLocalPaintStyles();

  // Filter to only styles that match the token names
  const colorTokens = allPaintStyles.filter(style => colorTokenNames.includes(style.name));

  if (colorTokens.length === 0) {
    figma.notify("No matching color tokens found.");
    figma.closePlugin();
  } else {
    for (const node of selection) {
      if ("fills" in node) {
        const randomStyle = getRandomElement(colorTokens);
        node.fillStyleId = randomStyle.id;
      }
    }
    figma.notify("Random color tokens assigned!");
    figma.closePlugin();
  }
}
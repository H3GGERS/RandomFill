// code.ts

// Plugin: Set Random Fill Color
// Description: Sets the fill color of all selected fillable nodes to a randomly generated color

function getRandomColor(): RGB {
  return {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  };
}

const selection = figma.currentPage.selection;

if (selection.length === 0) {
  figma.notify("Please select one or more objects.");
  figma.closePlugin();
} else {
  for (const node of selection) {
    if ("fills" in node && Array.isArray(node.fills)) {
      const newPaint: Paint = {
        type: "SOLID",
        color: getRandomColor(),
      };
      node.fills = [newPaint];
    }
  }
  figma.notify("Applied random colors to selected elements.");
  figma.closePlugin();
}

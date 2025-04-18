// code.ts

// Plugin: Set Random Fill from Custom Gradient
// Description: Randomly assigns a color to selected nodes by sampling from a linear gradient

function hexToRgb(hex: string): RGB {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function interpolateColor(c1: RGB, c2: RGB, t: number): RGB {
  return {
    r: lerp(c1.r, c2.r, t),
    g: lerp(c1.g, c2.g, t),
    b: lerp(c1.b, c2.b, t),
  };
}

function getColorFromGradient(t: number): RGB {
  const red = hexToRgb("#e34842");   // 0%
  const mid = hexToRgb("#424553");   // 50%
  const green = hexToRgb("#66c868"); // 100%

  if (t <= 0.5) {
    return interpolateColor(red, mid, t * 2);
  } else {
    return interpolateColor(mid, green, (t - 0.5) * 2);
  }
}

const selection = figma.currentPage.selection;

if (selection.length === 0) {
  figma.notify("Please select one or more objects.");
  figma.closePlugin();
} else {
  for (const node of selection) {
    if ("fills" in node && Array.isArray(node.fills)) {
      const t = Math.random();
      const color = getColorFromGradient(t);
      const newPaint: Paint = {
        type: "SOLID",
        color,
      };
      node.fills = [newPaint];
    }
  }
  figma.notify("Applied colors from gradient to selection.");
  figma.closePlugin();
}

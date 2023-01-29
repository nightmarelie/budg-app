export const Colors = Object.freeze({
  black: "#3D3E46",
  white: "#FFF",
  transparent: "transparent",
});

export type Color = (typeof Colors)[keyof typeof Colors];

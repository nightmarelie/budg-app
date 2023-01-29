import React, { FC, ReactNode, useMemo } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Colors } from "./colors";

const createTheme = () =>
  extendTheme({
    colors: {
      ...Colors,
    },
    fonts: {
      body: "Rubik, sans-serif",
      heading: "Rubik, sans-serif",
    },
    letterSpacings: {
      widest: "0.25em",
    },
    shadows: {
      actionSheet: "0px -9px 16px rgba(155, 159, 163, 0.15)",
      md: "0px 4px 16px rgba(98, 98, 98, 0.1)",
      buttonLight: "0px 8px 16px rgba(117, 119, 121, 0.2)",
      buttonDark: "0px 8px 16px rgba(13, 18, 28, 0.3)",
      buttonBlue: "0px 8px 16px rgba(35, 80, 133, 0.35)",
      buttonOrange: "0px 8px 16px rgba(191, 110, 65, 0.32)",
      outline: "0 !important",
    },
    sizes: {
      11: "2.75rem",
      13: "3.25rem",
      15: "3.75rem",
      22: "5.5rem",
      "4xs": "12rem",
    },
    space: {
      11: "2.75rem",
      13: "3.25rem",
      15: "3.75rem",
      22: "5.5rem",
    },
    styles: {
      global: {
        body: {
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          margin: 0,
          color: "black",
          textRendering: "optimizeLegibility",
          fontSmooth: "antialiased",
          WebkitFontSmoothing: "antialiased",
          WebkitTapHighlightColor: "transparent",
          backgroundColor: "transparent",
          userSelect: "initial",
        },
        "#__next": {
          display: "block",
          flex: 1,
        },
      },
    },
    components: {},
  });

export const defaultTheme = createTheme();

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const theme = useMemo(() => createTheme(), []);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

import { extendTheme } from "@chakra-ui/react";

const themes = {
  colors: {
    brand: {
      100: "#ff0000",
      80: "#ff1a1a",
    },
  },
  shadows: {
    outline: 'white'
  }
};
const theme = extendTheme(themes);

export default theme;
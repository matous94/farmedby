import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#7cb342"
    },
    secondary: {
      main: "#5e35b1"
    }
  }
  // components: {
  //   MuiTableCell: {
  //     styleOverrides: {
  //       root: {
  //         paddingLeft: "12px",
  //         paddingRight: "12px"
  //       }
  //     }
  //   }
  // }
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;

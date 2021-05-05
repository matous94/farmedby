import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7cb342"
    },
    secondary: {
      main: "#5e35b1"
    }
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingLeft: "12px",
          paddingRight: "12px"
        }
      }
    }
  }
});

export default theme;

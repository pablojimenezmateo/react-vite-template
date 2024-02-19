import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

// Use https://themera.vercel.app/ to generate a color palette
const theme = extendTheme({
  config,
  colors: {
    main: "#321A42",
    brand: {
      "50": "#F3EDF8",
      "100": "#DECCEB",
      "200": "#C9ABDE",
      "300": "#B48AD1",
      "400": "#A069C4",
      "500": "#8B48B7",
      "600": "#6F3A92",
      "700": "#532B6E",
      "800": "#371D49",
      "900": "#1C0E25",
    },
    comments: {
      edit_button: "#BEE3F8", // blue.100
      add_button: "#C6F6D5", // green.100
      hide_button: "#C6F6D5", // green.100
      delete_button: "#FED7D7", // red.100
      cancel_button: "#FED7D7", // red.100
    },
    card: {
      doctor_action_needed: "#ED8936", // orange
      nutritionist_action_needed: "#F95278", // magenta
      patient_action_needed: "#4299E1", // blue
      pm_action_needed: "#ECC94B", // yellow
      sample_ready: "#48BB78", // green
      default: "#CBD5E0", // gray.300
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "gray",
      },
    },
  },
});

export default theme;

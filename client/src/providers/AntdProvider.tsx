import { ConfigProvider, theme } from "antd";
import type { ThemeConfig } from "antd";

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#3b82f6",
    borderRadius: 6,
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  algorithm: theme.defaultAlgorithm,
  components: {
    Layout: {
      headerBg: "#ffffff",
      siderBg: "#fafafa",
    },
    Menu: {
      itemBg: "transparent",
      subMenuItemBg: "transparent",
    },
    Card: {
      paddingLG: 20,
    },
    Button: {
      borderRadius: 6,
    },
    Input: {
      borderRadius: 6,
    },
  },
};

interface AntdProviderProps {
  children: React.ReactNode;
}

export function AntdProvider({ children }: AntdProviderProps) {
  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
}

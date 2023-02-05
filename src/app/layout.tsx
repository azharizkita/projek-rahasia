"use client";

import { GlobalContextProvider } from "@/contexts/GlobalContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const _customTheme = {
  components: {
    Modal: {
      baseStyle: () => ({
        overlay: {
          zIndex: "123123123123",
        },
        dialog: {
          zIndex: "123123123124",
        },
        dialogContainer: {
          zIndex: "123123123125",
        },
      }),
    },
  },
};

const customTheme = extendTheme(_customTheme);

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main style={{ width: "100vw", height: "100vh" }}>
          <ChakraProvider resetCSS theme={customTheme}>
            <GlobalContextProvider>{children}</GlobalContextProvider>
          </ChakraProvider>
        </main>
      </body>
    </html>
  );
}

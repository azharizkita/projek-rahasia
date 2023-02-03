"use client";

import { ChakraProvider } from "@chakra-ui/react";

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
        <ChakraProvider resetCSS>{children}</ChakraProvider>
      </body>
    </html>
  );
}

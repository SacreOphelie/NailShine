import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  sassOptions: {
    includePaths: ["src/styles"],
    // Colle ce code en haut de TOUS les fichiers .scss automatiquement
    prependData: `@use "variables" as *;`,
  },
};

export default nextConfig;
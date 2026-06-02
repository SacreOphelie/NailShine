import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  sassOptions: {
    includePaths: ["src/styles"],
    // Colle ce code en haut de TOUS les fichiers .scss automatiquement
    additionalData: `@use "variables" as *;`,
  },
};

export default nextConfig;
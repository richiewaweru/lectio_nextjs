import { defineConfig } from "tsup";
import { resolve } from "path";

export default defineConfig({
	entry: ["src/lib/index.ts"],
	format: ["esm"],
	dts: false,
	sourcemap: true,
	clean: true,
	external: ["react", "react-dom", "next"],
	banner: { js: '"use client";' },
	esbuildOptions(options) {
		options.alias = { "@": resolve(__dirname, "src") };
	},
});

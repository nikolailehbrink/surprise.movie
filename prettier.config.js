// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
    tailwindFunctions: ['cn', 'clsx'],
    plugins: ['prettier-plugin-tailwindcss'],
}

export default config

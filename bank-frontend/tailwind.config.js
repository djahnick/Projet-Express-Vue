module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // Ajoutez cette ligne pour inclure Flowbite :
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Ajoutez Flowbite en tant que plugin ici
    require('flowbite/plugin')
  ],
}

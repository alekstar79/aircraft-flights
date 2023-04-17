import webFontLoader from 'webfontloader'

/**
* Performs download of google fonts
*/
export default function loadFonts()
{
  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap']
    }
  })
}

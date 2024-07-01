// copy the text given to it copy clipboard []
// copies the code or text

// DOM
// CSS OM
//BOM :=>
// we have certain set features
// clipboard -> copy the text

const useCopy = () => {
  // accept text and returns a function to display the text
  const copy = async (text) => {
    // options to copy the data in the browser otherwise no use
    if (!navigator?.clipboard) {
      // if not enabled
      console.warn(" Clipboard is not enabled or available ");
      return;
    } else {
      // async method so try catch
      try {
        await navigator.clipboard.writeText(text); // accepts the text and copies it to the clipboard
      } catch (err) {
        console.error(` There was error copying text :  ${text} `, err);
      }
    }
  };
  return copy;
};

import Az from "az";

export default async function (array) {
  // Function to initialize Az.Morph
  function initMorph(path) {
    return new Promise((resolve, reject) => {
      Az.Morph.init(path, () => {
        resolve();
      });
    });
  }

  // Function to get gender of the noun
  async function analyzeWord(word) {
    try {
      // Initialize Az.Morph
      await initMorph("/dicts");

      // Analyze the word
      const parses = Az.Morph(word);

      if (parses.length > 0) {
        return parses[0].tag.GNdr || plur;
      }
    } catch (error) {
      console.error("Error initializing or analyzing:", error);
    }
  }

  const genderMapping = {
    femn: "ЖР",
    masc: "МР",
    neut: "СР",
    plur: "МН",
  };

  let result = [];
  for (let i = 0; i < ar.length; i += 1) {
    let n = ar[i];
    let g = await analyzeWord(n);
    const gender = genderMapping[g];

    result.push([n, gender || null]);
  }
  
  return JSON.stringify(result);
}

let products = [
  {
    id: 1,
    nama: "Apel",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-FqVB0I2bP7M%2FU9RLuaLRC2I%2FAAAAAAAAA18%2F0CPwPy-poNE%2Fs1600%2FKandungan-Gizi-Dan-Manfaat-Buah-Apel.jpg&f=1&nofb=1",
    caption: "wah enak apel",
  },
  {
    id: 2,
    nama: "Duren",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-6NabAIFLkjs%2FUe4wbiyn0yI%2FAAAAAAAAQdM%2FM2VeSCoGni8%2Fs1600%2Fduren.jpg&f=1&nofb=1",
    caption: "wah enak duren",
  },
  {
    id: 3,
    nama: "Mangga",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.zepto.store%2Fmy%2Fwp-content%2Fuploads%2F2020%2F03%2FMangga-Susu-Susu-Mango.jpg&f=1&nofb=1",
    caption: "wah enak mangga",
  },
  {
    nama: "rambutan",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.healthbenefitstimes.com%2F9%2Fgallery%2Frambutan%2FPeeled-Rambutan.jpg&f=1&nofb=1",
    caption: "wah enak rambutan",
    id: 4,
  },
  {
    nama: "pisang ",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwiratech.co.id%2Fwp-content%2Fuploads%2F2018%2F11%2Fmanfaat-Buah-pisang.jpg&f=1&nofb=1",
    caption: "wah enak pisang",
    id: 5,
  },
];
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send(products);
});

module.exports = router;

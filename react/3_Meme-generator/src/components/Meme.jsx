import React from "react"
import "/src/styles/Meme.css"


function Meme() {
  const [memeImg, setMemeImg] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: ""
  })

  const [allMemes, setAllMemes] = React.useState([])

  if (memeImg.randomImage === "" && allMemes.length > 0) {
    changeMemeImage()
  }

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes")
      const data = await res.json()
      setAllMemes(data.data.memes)
    }
    getMemes()
  }, [])

  function changeMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const randomMemeImage = allMemes[randomNumber].url

    setMemeImg(prevMemeImg => ({
      ...prevMemeImg,
      randomImage: randomMemeImage
    }))
  }

  function handleInputChange(event) {
    const {name, value} = event.target
    setMemeImg(prevMemeImg => ({
      ...prevMemeImg,
      [name]: value
    }))
  }

  function downloadMeme() {
    const memeImage = document.querySelector(".meme-image");
  
    html2canvas(memeImage, { useCORS: true })
      .then((canvas) => {
        const dataURL = canvas.toDataURL('image/png');
  
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', dataURL);
        downloadLink.setAttribute('download', 'meme.png');
  
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      });
  }

  return (
    <div className="container">
      <div className="inputs">
        <input
          type="text"
          maxLength="50"
          autoComplete="off"
          placeholder="Top Text"
          onChange={handleInputChange}
          name="topText"
          value={memeImg.topText}
        />
        <input
          type="text"
          maxLength="50"
          autoComplete="off"
          placeholder="Bottom Text"
          onChange={handleInputChange}
          name="bottomText"
          value={memeImg.bottomText}
        />
      </div>
      <button onClick={changeMemeImage}>Get a new meme image 🖼</button>
      <div className="meme-image">
        <img src={memeImg.randomImage} alt="Meme Image" width="200"/>
        <div className="meme--text top">{memeImg.topText}</div>
        <div className="meme--text bottom">{memeImg.bottomText}</div>
      </div>
      <div className="download-meme">
        <button onClick={downloadMeme}>Download Meme</button>
      </div>
    </div>
  )
}

export default Meme
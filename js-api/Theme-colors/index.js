document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
  const color = document.querySelector("input").value.slice(1);
  const scheme = document.querySelector("select").value;

  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}`).
    then(response => response.json()).
    then(data => {
      let colorsHtml = ""
      data.colors.forEach(color => {
        colorsHtml += `
          <div class="color-container" style="background: ${color.hex.value};"></div>
          <p class="color-hex">${color.hex.value}</p>
        `
      })
      document.querySelector("main").innerHTML = colorsHtml;
    })
});

class Dog {
  constructor(data) {
    Object.assign(this, data)
  }

  getDogHtml() {
    const {name, avatar, age, bio} = this
    return `
      <div class="dog-image">
        <img src="${avatar}" alt="dog image">
      </div>
      <div class="dog-info">
        <div>
          <h2>${name}, ${age}</h2>
        </div>
        <div>
          <p>${bio}</p>
        </div>
      </div>
    `
  }
}

export default Dog;
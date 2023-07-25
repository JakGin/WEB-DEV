class Dog {
  constructor(data) {
    Object.assign(this, data)
  }

  setHasBeenSwiped(value) {
    this.hasBeenSwiped = value
  }

  setHasBeenLiked(value) {
    this.hasBeenLiked = value
  }

  

  getDogHtml() {
    const {name, avatar, age, bio} = this
    
    return `
      <div class="dog-image">
        <img src="${avatar}" alt="dog image">
      </div>
      <div class="dog-badge"></div>
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
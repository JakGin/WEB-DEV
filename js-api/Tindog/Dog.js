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

  getDogBadgeHtml() {
    const {hasBeenSwiped, hasBeenLiked} = this
    const dogBadgeUrl = hasBeenSwiped && hasBeenLiked ?
      "./images/badge-like.png" : hasBeenSwiped ?
      "./images/badge-nope.png" : ""

    const dogBadgeHtml = dogBadgeUrl ? 
      `
        <div class="dog-badge">
          <img src="${dogBadgeUrl}">
        </div>
      `
      : ""

    return dogBadgeHtml
  }

  getDogHtml() {
    const {name, avatar, age, bio} = this
    const dogBadgeHtml = this.getDogBadgeHtml()
    
    return `
      <div class="dog-image">
        <img src="${avatar}" alt="dog image">
      </div>
      ${dogBadgeHtml}
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
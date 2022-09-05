const itemsWrap = document.querySelector('.items')
// All tags: animal, landscape, people, bright, dark, sport
const itemTags = [
  {
    url: '1.jpg',
    tags: ['landscape', 'dark']
  },
  {
    url: '2.jpg',
    tags: ['animal', 'bright']
  },
  {
    url: '3.jpg',
    tags: ['people', 'bright']
  },
  {
    url: '4.jpg',
    tags: ['animal', 'dark', 'landscape']
  },
  {
    url: '5.jpg',
    tags: ['people', 'dark', 'sport']
  },
  {
    url: '6.jpg',
    tags: ['people', 'bright']
  },
  {
    url: '7.jpg',
    tags: ['landscape', 'bright']
  },
  {
    url: '8.jpg',
    tags: ['landscape', 'bright']
  },
  {
    url: '9.jpg',
    tags: ['animal', 'bright']
  },
]
let activeFilters = []

const observer = new IntersectionObserver(handleImg)

updateImg()

function handleImg(myImg) {
  myImg.forEach(elem => {
    if (elem.intersectionRatio > 0) {
      elem.target.src = elem.target.getAttribute('data-src')
    }
  });
}

document.querySelectorAll('.filters button').forEach(elem => {
  elem.addEventListener('click', e => {
    if (e.target.classList.contains('clear')) {
      document.querySelectorAll('.filters button').forEach(item => {
        item.classList.remove('active')
        activeFilters = []
      })
    }
    else {
      e.target.classList.toggle('active')
      if (e.target.classList.contains('active')) { 
        activeFilters.push(e.target.textContent.toLowerCase()) 
      }
      else {
        activeFilters.splice(activeFilters.indexOf(e.target.textContent.toLowerCase()), 1)
      }
    }
    console.log(activeFilters)
    updateImg()
  })
})

function updateImg() {
  itemsWrap.innerHTML = ''
  for (let i = 0; i < itemTags.length; i++) {
    if (!activeFilters.toString()) {
      let elem = document.createElement('img')
      elem.setAttribute('data-src', 'img/' + itemTags[i].url)
      itemsWrap.appendChild(elem)
      observer.observe(elem)
    }
    else {
      if (activeFilters.some(item => itemTags[i].tags.includes(item))) {
        let elem = document.createElement('img')
        elem.setAttribute('data-src', 'img/' + itemTags[i].url)
        itemsWrap.appendChild(elem)
        observer.observe(elem)
      }
    }
  }
}
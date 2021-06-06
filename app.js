const ajax = new XMLHttpRequest()
const NEWS_URL = `https://api.hnpwa.com/v0/news/1.json`
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@id.json`
const container = document.getElementById('root')

function getData(url) {
  ajax.open('get', url, false)
  ajax.send()
  return JSON.parse(ajax.response)
}

function newsFeed() {
  const newsFeed = getData(NEWS_URL)
  const newsList = [`<ul>`]
  for (let i = 0; i < newsFeed.length; i++) {
    newsList.push(`
  <li> 
    <a href=#${newsFeed[i].id}>${newsFeed[i].title} (${newsFeed[i].comments_count})</a>
  </li>
  `)
  }
  newsList.push(`</ul>`)
  container.innerHTML = newsList.join('')
}

function newsDetail() {
  const id = location.hash.slice(1)
  const newsContent = getData(CONTENT_URL.replace('@id', id))

  container.innerHTML = `
    <h1>${newsContent.title}</h1> 
    <div>
      <a href="#"> 목록으로 </a>
    </div>
    `
}

function router() {
  const routhPath = location.hash

  switch (routhPath) {
    case '':
      newsFeed()
      break
    default:
      newsDetail()
  }
}

window.addEventListener('hashchange', router)

router()

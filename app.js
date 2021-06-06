const ajax = new XMLHttpRequest()
const NEWS_URL = `https://api.hnpwa.com/v0/news/1.json`
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@id.json`
const container = document.getElementById('root')
const content = document.createElement('div')
ajax.open('get', NEWS_URL, false)
ajax.send()

const newsFeed = JSON.parse(ajax.response)
const ul = document.createElement('ul')

window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1)

  ajax.open('get', CONTENT_URL.replace('@id', id), false)
  ajax.send()
  const newsContent = JSON.parse(ajax.response)
  const title = document.createElement('h1')
  title.innerHTML = newsContent.title
  content.appendChild(title)
})
for (let i = 0; i < newsFeed.length; i++) {
  const li = document.createElement('li')
  const a = document.createElement('a')
  a.href = `#${newsFeed[i].id}`
  a.innerText = `${newsFeed[i].title} (${newsFeed[i].comments_count})`

  li.appendChild(a)
  ul.appendChild(li)
}

container.appendChild(ul)
container.appendChild(content)

const ajax = new XMLHttpRequest()
const NEWS_URL = `https://api.hnpwa.com/v0/news/1.json`

ajax.open('get', NEWS_URL, false)
ajax.send()

const newsFeed = JSON.parse(ajax.response)
const ul = document.createElement('ul')

for (let i = 0; i < newsFeed.length; i++) {
  const li = document.createElement('li')
  li.innerText = newsFeed[i].title
  ul.append(li)
}

document.getElementById('root').append(ul)

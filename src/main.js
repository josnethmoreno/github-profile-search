import './style.css'

const API = 'https://api.github.com/users/'

// Listen event submit form
const app = document.querySelector('.app-user')
const formContent = document.querySelector('.form-search-content');
const form = document.querySelector('.form');
const input = document.querySelector('.form-input');

form.addEventListener('submit', (event) => {
	event.preventDefault()
	if (!input.value.trim()) {
		input.placeholder = "Debes ingresar un nombre"
		formContent.classList.add('error');
		return
	} 
	formContent.classList.remove('error')
	const username = input.value;

	getUserData(username)

	form.reset()
})


// Query API Github
async function getUserData(username) {
	try {
		const response = await fetch(API + username)
		if(!response.ok) { throw new Error("Can't find user") } 
		const data = await response.json()
		console.log('si ejecuta')
		showUserData(data)
	} catch(err) {
		app.innerHTML = `<i class='bx bx-fw bx-error' style="color:var(--color-danger);"></i>No se ha encontrado el usuario ${username}`
		console.error(err)
	}
}

function showUserData(data){
	const userData = `
		<div class="user-content">

      <div class="user-info">
        <div class="user-info-header">
          <div>
            <img class="user-img" src="${data.avatar_url}" alt="" width="110">
          </div>
          <div>
            <h3 class="user-name">${data.name}</h3>
            <a href="${data.html_url}">
              <p class="user-username">${data.login}</p>
            </a>
            <p class="user-date">${data.created_at}</p>
          </div>
        </div>
        <p class="user-description">${data.bio}</p>
      </div>

      <div class="user-stats-content">
        <div class="user-repos">
          <h5>Repos</h5>
          <p>${data.public_repos}</p>
        </div>
        <div class="user-followers">
          <h5>Followers</h5>
          <p>${data.followers}</p>
        </div>
        <div class="user-following">
          <h5>Following</h5>
          <p>${data.following}</p>
        </div>
      </div>

      <div class="user-contact-content">
        <p class="user-address">
          <i class='bx bx-fw bxs-map'></i>${data.location}
        </p>
        <p class="user-website">
          <i class='bx bx-fw bx-link'></i><a href="https://${data.blog}">${data.blog}</a>
        </p>
        <p class="user-twitter">
          <i class='bx bx-fw bxl-twitter'></i><a href="https://twitter.com/${data.twitter_username}">${data.twitter_username}
          </a>
        </p>
        <p class="user-company">
          <i class='bx bx-fw bxs-building'></i>${data.company}
        </p>
      </div>

    </div>
	`

	app.innerHTML = userData;
}

const body = document.getElementById('body')
const btnTheme = document.querySelector('.app-button-theme')

const switchTheme = () => {
 if (body.classList.contains('dark')) {
		body.classList.replace('dark', 'light')
		btnTheme.innerHTML = `Dark <i class='bx bx-moon'></i>`
		return
 }
 if (body.classList.contains('light')) {
 	console.log('aja')
		body.classList.replace('light', 'dark') 
		btnTheme.innerHTML = `Light <i class='bx bx-sun'></i>`
 }
}

btnTheme.addEventListener('click', switchTheme)
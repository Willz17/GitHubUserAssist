const profile_url = 'https://api.github.com/users/'
const REPOS_URL = 'https://api.github.com/users/willz01/repos'
const SETTING_URL = 'https://github.com/settings/profile'

const profile_button = document.getElementById('profile')

document.addEventListener('load', polluteRepos())


async function polluteProfile(name = "Willz01") {

  const section = document.getElementById('display');
  section.innerHTML = ""
  let p_data = await fetch(profile_url + name)
  let data = await p_data.json();

  if (data.message == "Not Found") {
    section.innerText = "User not found!"
  } else {
    console.log(data);

    let p_photo = data.avatar_url
    let p_name = data.name
    let p_company = data.company
    let p_bio = data.bio
    let p_location = data.location

    console.log({ p_photo, p_name, p_company, p_bio, p_location });

    const img = document.createElement('img')
    img.classList.add('img')
    img.src = p_photo

    const userName = document.createElement('display-5')
    userName.innerText = " " + p_name


    const companyName = document.createElement('h6')
    companyName.classList.add('display-7')
    companyName.innerText = "Company: " + p_company

    const location = document.createElement('h6')
    location.classList.add('display-7')
    location.innerText = "Location: " + p_location

    const bio = document.createElement('details')
    const summary = document.createElement('summary')

    bio.innerText = p_bio
    summary.innerText = "Bio"


    bio.appendChild(summary)


    section.appendChild(img)
    section.appendChild(userName)
    section.appendChild(companyName)
    section.appendChild(location)
    section.append(bio)
  }



}
// default display
profile_button.addEventListener('click', (e) => {
  polluteProfile()
})

// searching up a user
document.getElementById('userName').addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    let u_name = e.target.value
    console.log(u_name);
    polluteProfile(u_name)
  }

})




async function polluteRepos() {
  const section = document.getElementById('display');
  section.innerHTML = ""
  let p_data = await fetch(REPOS_URL)
  let data = await p_data.json();
  console.log(data[0]);

  for (let i = 0; i < data.length; i++) {

    // name, owner, visibility, visit (button),language, created-at

    const name = document.createElement('h6')
    name.classList.add('display-7')
    name.innerText = 'Repository name: ' + data[i].full_name

    const owner = document.createElement('h6')
    owner.classList.add('display-7')
    owner.innerText = 'Username: ' + data[i].owner.login

    const created_at = document.createElement('span')
    created_at.classList.add('badge')
    created_at.classList.add('bg-warning')
    created_at.classList.add('text-dark')
    created_at.innerText = data[i].created_at

    const button_visit = document.createElement('span')
    button_visit.classList.add('badge')
    button_visit.classList.add('bg-warning')
    button_visit.innerHTML = `<a href='${data[i].html_url}' target="_blank">visit`

    const lang = document.createElement('span')
    lang.classList.add('badge')
    lang.classList.add('bg-danger')
    lang.classList.add('text-warning')
    let langFormatted = ` ${data[i].language} `
    lang.innerText = langFormatted




    section.appendChild(name)
    section.appendChild(owner)
    section.append(created_at)
    section.appendChild(lang)
    section.appendChild(button_visit)
    section.appendChild(document.createElement('hr'))

  }
}
document.getElementById('repos').addEventListener('click', (e) => {
  polluteRepos()
})

import { getImageUrl } from '@/lib/sanity';

function getLinks(project) {
  const links = [];

  if (project.url) {
    links.push(`<a href="${project.url}" target="_blank">Application</a>`)
  }
  if (project.repository) {
    links.push(`<a href="${project.repository}" target="_blank">Github</a>`)
  }

  return links.length ? links.join('\r\n') : '';
}

function renderSkillsList(items) {
  const skills = items.map((item) => {
    if (item.website) {
      return `<li><a href="${item.website}" target="_blank">${item.title}</a></li>`
    }
    return `<li><span>${item.title}</span></li>`
  })

  return skills.length ? skills.join('\r\n') : '';
}

export function projectCard(project) {
  return `
    <div class="card project">
      <div class="inner flex-col-1">
        <img src="${getImageUrl(project.mainImage).size(400,400)}" alt="Screenshot of ${project.title}" class="card">
        <div class="card-content">
          <h3 class="sm-card-title text-primary">${project.title}</h3>
          <p>${project.description[0].children[0].text}</p>
        </div>
        <div class="card-action links">${getLinks(project)}</div>
      </div>
    </div>`;
}

export function skillsCard(list) {
  return `
    <div class="skills-list">
      <h3 class="text-primary">${list.title}</h3>
      <ul class="flex-col-1">${renderSkillsList(list.skills)}</ul>
    </div>`
}
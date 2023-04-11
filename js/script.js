import {
  fetchFeaturedProjects,
  fetchProfile,
  fetchSkills,
  getImageUrl,
} from './sanity';

import { featuredProjectCard, projectCard, skillsCard } from './templates';

const profile = await fetchProfile();
const projects = await fetchFeaturedProjects();
const skillLists = await fetchSkills();

const grid = document.getElementById('card-grid');
const featuredProject = document.getElementById('featured-project');
const skillsListsSection = document.getElementById('skills-lists');

const year = new Date().getFullYear();
const copyrightText = document.createTextNode(year);

document.querySelector('.copyright').appendChild(copyrightText);

if (profile) {
  if (profile.bio) {
    document.querySelector(
      '#about-section #about-info .about-text'
    ).textContent = profile.bio;
  }
  if (profile.email) {
    const mailto = `mailto:${profile.email}`;

    document.querySelector('#email-link').href = mailto;
    document.querySelector('#email-link .contact-link').textContent =
      profile.email;

    document.querySelector('#email-link').classList.remove('hide');
  }
  if (profile.github) {
    document.querySelector('#github-link').href = profile.github;
    document.querySelector('#github-link .contact-link').textContent =
      profile.github_user || 'Github';

    document.querySelector('#github-link').classList.remove('hide');
  }
  if (profile.linkedin) {
    document.querySelector('#linkedin-link').href = profile.linkedin;
    document.querySelector('#linkedin-link .contact-link').textContent =
      profile.linkedin_user || 'Profile';
    document.querySelector('#linkedin-link').classList.remove('hide');
  }
  if (profile.website) {
    document.querySelector('#website-link').href = profile.website;
    document.querySelector('#website-link .contact-link').textContent =
      profile.website_name || 'Link';
    document.querySelector('#website-link').classList.remove('hide');
  }
  if (profile.image) {
    const profileImageSrc = getImageUrl(profile?.image).size(300, 300).url();

    document.querySelector('#about-section #ray-img img').src = profileImageSrc;
  }
}

if (projects.length) {
  projects.forEach((project, index) => {
    if (index === 0) {
      const markup = featuredProjectCard(project);

      featuredProject.insertAdjacentHTML('beforeend', markup);
    } else {
      const markup = projectCard(project);

      grid.insertAdjacentHTML('beforeend', markup);
    }
  });
}

if (skillLists.length) {
  skillLists.forEach((list) => {
    const markup = skillsCard(list);

    skillsListsSection.insertAdjacentHTML('beforeend', markup);
  });
}

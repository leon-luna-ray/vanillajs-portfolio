import {
  fetchHomePage,
  getImageUrl,
  portableTextToHTML
} from '@/js/sanity';
import { projectCard, skillsCard } from '@/js/templates';
import '@/assets/styles/main.css';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchHomePage();

  const grid = document.getElementById('card-grid');
  const skillsListsSection = document.getElementById('skills-lists');

  const year = new Date().getFullYear();
  const copyrightText = document.createTextNode(year);

  document.querySelector('.copyright').appendChild(copyrightText);
  if (data?.profile) {
    if (data?.profile.bio) {
      document.querySelector(
        '#about-section #about-info .about-text'
      ).textContent = data?.profile.bio;
    }
    if (data?.profile.email) {
      const mailto = `mailto:${data?.profile.email}`;

      document.querySelector('#email-link').href = mailto;
      document.querySelector('#email-link .contact-link').textContent =
        data?.profile.email;

      document.querySelector('#email-link').classList.remove('hide');
    }
    if (data?.profile.github) {
      document.querySelector('#github-link').href = data?.profile.github;
      document.querySelector('#github-link .contact-link').textContent =
        data?.profile.github_user || 'Github';

      document.querySelector('#github-link').classList.remove('hide');
    }
    if (data?.profile.linkedin) {
      document.querySelector('#linkedin-link').href = data?.profile.linkedin;
      document.querySelector('#linkedin-link .contact-link').textContent =
        data?.profile.linkedin_user || 'Profile';
      document.querySelector('#linkedin-link').classList.remove('hide');
    }
    if (data?.profile.title) {
      const title = document.createTextNode(data?.profile.title);

      document.querySelector('#logo .job-title').append(title);
    }
    if (data?.profile.website) {
      document.querySelector('#website-link').href = data?.profile.website;
      document.querySelector('#website-link .contact-link').textContent =
        data?.profile.website_name || 'Link';
      document.querySelector('#website-link').classList.remove('hide');
    }
    if (data?.profile.image) {
      const profileImageSrc = getImageUrl(data?.profile.image).size(300, 300).url();

      document.querySelector('#about-section #ray-img img').src = profileImageSrc;
      document.querySelector('#about-section #ray-img img').alt = data?.profile.image.altText || 'Profile picture';
    }
    if (data?.profile.greeting) {
      document.querySelector('#hero-text').textContent = data?.profile.greeting;
    }
  }

  if (data?.projects) {
    document.querySelector('#projects-intro').innerHTML = portableTextToHTML(data?.projects.description);
    data?.projects.projects.forEach((project, index) => {
      const card = projectCard(project);

      grid.insertAdjacentHTML('beforeend', card);
    });
  }

  if (data?.skillsGroups.length) {
    data?.skillsGroups.forEach((list) => {
      const markup = skillsCard(list);

      skillsListsSection.insertAdjacentHTML('beforeend', markup);
    });
  }
})
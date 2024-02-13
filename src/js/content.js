import { addSEOTags } from './meta';
import {
  fetchHomePage,
  getImageUrl,
  portableTextToHTML
} from '@/js/sanity';
import { projectCard, skillsCard } from '@/js/templates';
import '@/assets/styles/main.css';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchHomePage();
  const pageURL = window.location.href;

  const grid = document.getElementById('card-grid');
  const skillsListsSection = document.getElementById('skills-lists');

  const year = new Date().getFullYear();
  const copyrightText = document.createTextNode(year);

  document.querySelector('.copyright').appendChild(copyrightText);

  if (data?.page?.aboutSection?.title) {
    document.querySelector('#about-info .section-title').textContent = data.page.aboutSection.title;
  }
  if (data?.page?.aboutSection?.body) {
    document.querySelector(
      '#about-section #about-info .about-text'
    ).innerHTML = portableTextToHTML(data.page.aboutSection.body);
  }
  if (data?.profile) {

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
    if (data?.page.heroSection.intro) {
      document.querySelector('#hero-text').textContent = data?.page.heroSection.intro;
    }
  }

  // Projects
  if (data?.projects) {
    data?.projects.projects.forEach((project, index) => {
      const card = projectCard(project);

      grid.insertAdjacentHTML('beforeend', card);
    });
  }
  if (data?.page?.projectsSection?.title) {
    document.querySelector('#project-section .section-title').textContent = data.page.projectsSection.title;

  }
  if (data?.page?.projectsSection?.body) {
    document.querySelector('#project-section .section-body').innerHTML = portableTextToHTML(data.page.projectsSection.body);

  }

  // Skills
  if (data?.page?.skillsSection?.title) {
    document.querySelector('#skills-section .section-title').textContent = data.page.skillsSection.title;

  }
  if (data?.page?.skillsSection?.body) {
    document.querySelector('#skills-section .section-body').innerHTML = portableTextToHTML(data.page.skillsSection.body);
  }
  if (data?.skillsGroups.length) {
    data?.skillsGroups.forEach((list) => {
      const markup = skillsCard(list);

      skillsListsSection.insertAdjacentHTML('beforeend', markup);
    });
  }

  // Contact
  if (data?.page?.contactSection?.title) {
    document.querySelector('#contact-section .section-title').textContent = data?.page?.contactSection?.title;
  }
  if (data?.page?.contactSection?.body) {
    document.querySelector('#contact-section .section-body').innerHTML = portableTextToHTML(data.page.contactSection.body);
  }

  // SEO
  if (data) {
    addSEOTags(data.global.title, data.page.seoDescription, pageURL, getImageUrl(data.page.seoImage))
  }
})


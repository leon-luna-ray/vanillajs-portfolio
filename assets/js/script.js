import { client, fetchProfile } from './sanity';
import imageUrlBuilder from '@sanity/image-url';

// Materialize Image Code
// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.materialboxed');
//   var instances = M.Materialbox.init(elems, options);
// });

const profile = await fetchProfile();
// const projects = await fetchFeaturedProjects();
// const skillLists = await fetchSkills();
const builder = imageUrlBuilder(client);

function getImageUrl(source) {
  return builder.image(source);
}

const aboutSection = document.getElementById('about-section');
const aboutNav = document.getElementById('about-nav');
// const projectSection = document.getElementById('project-section');
// contactNav.addEventListener('click', sectionJump(contactSection));
const year = new Date().getFullYear();

if (profile) {
  const profileImageSrc = getImageUrl(profile?.image).size(300, 300).url();

  document.querySelector('#about-section #ray-img img').src = profileImageSrc;
  document.querySelector('#about-section #about-info .about-text').textContent =
    profile.bio;
}

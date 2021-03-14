// Materialize Image Code
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems, options);
  });

const aboutNav = document.getElementById('about-nav');
// const aboutNav = document.getElementById('project-nav');
// const aboutNav = document.getElementById('contact-nav');

const aboutSection = document.getElementById('about-section');
// const projectSection = document.getElementById('project-section');
// const contactSection = document.getElementById('contact-section');

function sectionJump(section) {
  section.scrollIntoView(true);
};

// Nav event listeners
aboutNav.addEventListener('click', sectionJump(aboutSection));
// projectNav.addEventListener('click', sectionJump(projectSection));
// contactNav.addEventListener('click', sectionJump(contactSection));
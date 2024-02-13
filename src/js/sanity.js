import { createClient } from '@sanity/client';
import { toHTML } from '@portabletext/to-html';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-04-08',
});

// Images
const builder = imageUrlBuilder(client);
export function getImageUrl(source) {
  return builder.image(source);
}

// Text
export function portableTextToHTML(portableTextBlocks) {
  return toHTML(portableTextBlocks)
}

// API Queries
const queryGlobalSettings = `*[_type == "globalSettings"][0]`
const querySkillsGroups = `*[_type == "skillsList"] | order(title) {title, "skills" : skills[] -> {title, website}}`;
const queryPageType = (type, slug) => `*[_type == '${type}' && slug.current == '${slug}']{
  ...,
  "seoImage": seoImage.asset -> {
    _id,
    title,
    altText,
    description
  }
}[0]`;
const queryProfile = `*[_type == "profileDetails"][0]{
    ...,
    "image": image.asset->{
      _id,
      title,
      altText,
      description,
    }
  }`
const queryProjectGroup = (slug) => {
  return `*[_type == "projectGroup" && slug.current == "${slug}"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      projects[]->{
        _id, 
        intro, 
        "mainImage": mainImage.asset->{
          _id,
          title,
          altText,
          description,
        }, 
        slug, 
        status, 
        title, 
        technologies[]->{_id, title, slug,},
      },
    }[0]`;
}

// API Requests
export async function fetchHomePage() {
  const query = `{
      "global": ${queryGlobalSettings},
      "profile": ${queryProfile},
      "page": ${queryPageType('homePage', 'vanillajs-portfolio-home')},
      "projects": ${queryProjectGroup('vanillajs-portfolio')},
      "skillsGroups": ${querySkillsGroups}
  }`;
  const data = await client.fetch(query);

  return data;
}
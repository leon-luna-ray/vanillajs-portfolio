import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { toHTML } from '@portabletext/to-html';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-04-08',
});

const builder = imageUrlBuilder(client);

export function getImageUrl(source) {
  return builder.image(source);
}

export function portableTextToHTML(portableTextBlocks) {
  return toHTML(portableTextBlocks)
}

export async function fetchProfile() {
  const query = `*[_type == "profileDetails"][0]{
    ...,
    "image": image.asset->{
      _id,
      title,
      altText,
      description,
    },
  }`;
  const profile = await client.fetch(query);

  return profile;
}

export async function fetchFeaturedProjects() {
  const query = `*[_type == "project" && featured] | order(_updatedAt desc)`;
  const projects = await client.fetch(query);

  return projects;
}

export async function fetchSkills() {
  const query = `*[_type == "skillsList"] | order(title) {title, "skills" : skills[] -> {title, website}}`;
  const skills = await client.fetch(query);

  return skills;
}

export async function fetchProjectGroup(slug) {
  const query = `*[_type == "projectGroup" && slug.current == "${slug}"] | order(title asc) {
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
      url,
      customUrl,
    },
  }`;

  const projectGroup = await client.fetch(query);

  return projectGroup[0];
}
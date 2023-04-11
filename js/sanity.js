import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-04-08',
})

const builder = imageUrlBuilder(client);

export function getImageUrl(source) {
  return builder.image(source);
}

export async function fetchProfile() {
  const profile = await client.fetch('*[_type == "profileDetails"][0]')
  return profile
}

export async function fetchFeaturedProjects() {
  const projects = await client.fetch('*[_type == "project" && featured] | order(_updatedAt desc)')
  return projects
}

export async function fetchSkills() {
  const skills = await client.fetch('*[_type == "skillsList"]')
  return skills;
}

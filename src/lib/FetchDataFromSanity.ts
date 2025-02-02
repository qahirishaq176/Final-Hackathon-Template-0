import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Replace with your dataset name (e.g., 'production')
  useCdn: false, // Set to true for faster responses (but might show stale data)
  apiVersion: '2023-01-01', // Use a recent date for latest API features
});

export async function getProducts() {
    try {
      const products = await client.fetch(`*[_type == "product"][0...8]`);
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
  
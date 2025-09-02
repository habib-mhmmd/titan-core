interface Category {
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: 'Thumbnail Design',
    slug: 'thumbnail-design',
    description: ''
  },
  {
    name: 'Poster Design',
    slug: 'poster-design',
    description: ''
  },
  {
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    description: ''
  },
  {
    name: 'Animation',
    slug: 'animation',
    description: 'Exploring accessibility and user experience'
  },
  {
    name: 'Social Media Design',
    slug: 'social-media-design',
    description: ''
  },
  {
    name: 'Astro JS',
    slug: 'astro-js',
    description: 'Everything about Astro JS framework and development'
  },
  {
    name: 'SEO',
    slug: 'seo',
    description: 'Search engine optimization strategies and best practices'
  },
  
];

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}
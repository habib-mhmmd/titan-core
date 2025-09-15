interface Category {
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: 'Poster Design',
    slug: 'poster-design',
    description: ''
  },
  {
    name: 'Thumbnail Design',
    slug: 'thumbnail-design',
    description: ''
  },
  {
    name: 'Social Media Design',
    slug: 'social-media-design',
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
    description: ''
  },
  
];

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}
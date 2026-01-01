import { ImageSize } from '../types';

export const IMAGE_SIZES: ImageSize[] = [
  {
    id: 'instagram-square',
    name: 'Instagram Square',
    width: 1080,
    height: 1080,
    category: 'Social Media',
    description: 'Instagram post (1:1)'
  },
  {
    id: 'instagram-portrait',
    name: 'Instagram Portrait',
    width: 1080,
    height: 1350,
    category: 'Social Media',
    description: 'Instagram post (4:5)'
  },
  {
    id: 'instagram-story',
    name: 'Instagram Story',
    width: 1080,
    height: 1920,
    category: 'Social Media',
    description: 'Instagram/Facebook Story (9:16)'
  },
  {
    id: 'facebook-post',
    name: 'Facebook Post',
    width: 1200,
    height: 630,
    category: 'Social Media',
    description: 'Facebook feed post'
  },
  {
    id: 'facebook-cover',
    name: 'Facebook Cover',
    width: 820,
    height: 312,
    category: 'Social Media',
    description: 'Facebook page cover'
  },
  {
    id: 'twitter-post',
    name: 'Twitter Post',
    width: 1200,
    height: 675,
    category: 'Social Media',
    description: 'Twitter/X post (16:9)'
  },
  {
    id: 'twitter-header',
    name: 'Twitter Header',
    width: 1500,
    height: 500,
    category: 'Social Media',
    description: 'Twitter/X profile header'
  },
  {
    id: 'linkedin-post',
    name: 'LinkedIn Post',
    width: 1200,
    height: 627,
    category: 'Social Media',
    description: 'LinkedIn feed post'
  },
  {
    id: 'linkedin-cover',
    name: 'LinkedIn Cover',
    width: 1584,
    height: 396,
    category: 'Social Media',
    description: 'LinkedIn profile cover'
  },
  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail',
    width: 1280,
    height: 720,
    category: 'Social Media',
    description: 'YouTube video thumbnail'
  },
  {
    id: 'youtube-banner',
    name: 'YouTube Banner',
    width: 2560,
    height: 1440,
    category: 'Social Media',
    description: 'YouTube channel banner'
  },
  {
    id: 'pinterest-pin',
    name: 'Pinterest Pin',
    width: 1000,
    height: 1500,
    category: 'Social Media',
    description: 'Pinterest pin (2:3)'
  },
  {
    id: 'og-image',
    name: 'Open Graph',
    width: 1200,
    height: 630,
    category: 'Web',
    description: 'OG image for social sharing'
  },
  {
    id: 'hero-desktop',
    name: 'Hero Desktop',
    width: 1920,
    height: 1080,
    category: 'Web',
    description: 'Website hero section (desktop)'
  },
  {
    id: 'hero-mobile',
    name: 'Hero Mobile',
    width: 750,
    height: 1334,
    category: 'Web',
    description: 'Website hero section (mobile)'
  },
  {
    id: 'blog-featured',
    name: 'Blog Featured',
    width: 1200,
    height: 800,
    category: 'Web',
    description: 'Blog post featured image'
  },
  {
    id: 'thumbnail-small',
    name: 'Thumbnail Small',
    width: 300,
    height: 300,
    category: 'Web',
    description: 'Small thumbnail'
  },
  {
    id: 'thumbnail-medium',
    name: 'Thumbnail Medium',
    width: 600,
    height: 600,
    category: 'Web',
    description: 'Medium thumbnail'
  },
  {
    id: 'thumbnail-large',
    name: 'Thumbnail Large',
    width: 1000,
    height: 1000,
    category: 'Web',
    description: 'Large thumbnail'
  },
  {
    id: 'email-header',
    name: 'Email Header',
    width: 600,
    height: 200,
    category: 'Email',
    description: 'Email newsletter header'
  },
  {
    id: 'email-banner',
    name: 'Email Banner',
    width: 600,
    height: 300,
    category: 'Email',
    description: 'Email newsletter banner'
  },
  {
    id: 'wallpaper-desktop',
    name: 'Desktop Wallpaper',
    width: 1920,
    height: 1080,
    category: 'Wallpaper',
    description: 'Desktop wallpaper (Full HD)'
  },
  {
    id: 'wallpaper-4k',
    name: '4K Wallpaper',
    width: 3840,
    height: 2160,
    category: 'Wallpaper',
    description: 'Desktop wallpaper (4K UHD)'
  },
  {
    id: 'wallpaper-mobile',
    name: 'Mobile Wallpaper',
    width: 1080,
    height: 1920,
    category: 'Wallpaper',
    description: 'Mobile device wallpaper'
  },
  {
    id: 'print-a4',
    name: 'A4 Print',
    width: 2480,
    height: 3508,
    category: 'Print',
    description: 'A4 size at 300 DPI'
  },
  {
    id: 'print-letter',
    name: 'Letter Print',
    width: 2550,
    height: 3300,
    category: 'Print',
    description: 'US Letter at 300 DPI'
  },
  {
    id: 'business-card',
    name: 'Business Card',
    width: 1050,
    height: 600,
    category: 'Print',
    description: 'Standard business card (3.5x2 in at 300 DPI)'
  },
  {
    id: 'flyer-a5',
    name: 'A5 Flyer',
    width: 1748,
    height: 2480,
    category: 'Print',
    description: 'A5 flyer at 300 DPI'
  },
  {
    id: 'poster-small',
    name: 'Small Poster',
    width: 3000,
    height: 4000,
    category: 'Print',
    description: '18x24 inch poster at 150 DPI'
  },
  {
    id: 'square-small',
    name: 'Square 500px',
    width: 500,
    height: 500,
    category: 'General',
    description: 'Small square format'
  },
  {
    id: 'square-medium',
    name: 'Square 1000px',
    width: 1000,
    height: 1000,
    category: 'General',
    description: 'Medium square format'
  },
  {
    id: 'square-large',
    name: 'Square 2000px',
    width: 2000,
    height: 2000,
    category: 'General',
    description: 'Large square format'
  },
  {
    id: 'hd',
    name: 'HD 720p',
    width: 1280,
    height: 720,
    category: 'General',
    description: 'HD resolution (16:9)'
  },
  {
    id: 'full-hd',
    name: 'Full HD 1080p',
    width: 1920,
    height: 1080,
    category: 'General',
    description: 'Full HD resolution (16:9)'
  },
  {
    id: '2k',
    name: '2K',
    width: 2048,
    height: 1080,
    category: 'General',
    description: '2K resolution'
  },
  {
    id: '4k',
    name: '4K UHD',
    width: 3840,
    height: 2160,
    category: 'General',
    description: '4K Ultra HD resolution'
  }
];

export const CATEGORIES = Array.from(new Set(IMAGE_SIZES.map(size => size.category)));

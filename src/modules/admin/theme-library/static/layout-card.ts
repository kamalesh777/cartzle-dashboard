import type { LayoutCardTypes } from '../types'

// storefront pages array
export const pagesArray = [
  {
    id: 'home',
    label: 'Home',
    children: 'Home',
    icon: 'square-pen',
  },
  {
    id: 'product_list',
    label: 'Product List',
    children: 'About',
    icon: 'eye',
  },
  {
    id: 'product_details',
    label: 'Product Details',
    children: 'Contact',
    icon: 'settings',
  },
]

// navbar array
const navBarArray = {
  id: 'navbar',
  label: 'Navbar',
  icon: 'menu',
  children: [
    {
      id: 'modern',
      label: 'Modern',
    },
    {
      id: 'minimal',
      label: 'Minimal',
    },
    {
      id: 'sticky',
      label: 'Sticky',
    },
    {
      id: 'classic',
      label: 'Classic',
    },
    {
      id: 'mega-menu',
      label: 'Mega Menu',
    },
  ],
}

// slider array
const sliderArray = {
  id: 'slider',
  label: 'Slider',
  icon: 'layers',
  children: [
    {
      id: 'image-slider',
      label: 'Image Slider',
    },
    {
      id: 'video-slider',
      label: 'Video Slider',
    },
    {
      id: 'testimonial',
      label: 'Testimonial',
    },
    {
      id: 'hero-banner',
      label: 'Hero Banner',
    },
    {
      id: 'product--list-slider',
      label: 'Product List',
    },
    {
      id: 'brand-slider',
      label: 'Brand / Logo',
    },
    {
      id: 'blog-post',
      label: 'Blog Post',
    },
  ],
}

export const layoutConfigArray: LayoutCardTypes[] = [navBarArray, sliderArray]

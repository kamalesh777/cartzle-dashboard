import type { LayoutCardTypes } from '../types'

// storefront pages array
export const pagesArray = [
  {
    key: 'home',
    label: 'Home',
    children: 'Home',
    icon: 'square-pen',
  },
  {
    key: 'product_list',
    label: 'Product List',
    children: 'About',
    icon: 'eye',
  },
  {
    key: 'product_details',
    label: 'Product Details',
    children: 'Contact',
    icon: 'settings',
  },
]

// navbar array
const navBarArray = {
  key: 'navbar',
  label: 'Navbar',
  icon: 'menu',
  children: [
    {
      key: 'modern',
      label: 'Modern',
    },
    {
      key: 'minimal',
      label: 'Minimal',
    },
    {
      key: 'sticky',
      label: 'Sticky',
    },
    {
      key: 'classic',
      label: 'Classic',
    },
    {
      key: 'mega-menu',
      label: 'Mega Menu',
    },
  ],
}

// slider array
const sliderArray = {
  key: 'slider',
  label: 'Slider',
  icon: 'layers',
  children: [
    {
      key: 'image-slider',
      label: 'Image Slider',
    },
    {
      key: 'video-slider',
      label: 'Video Slider',
    },
    {
      key: 'testimonial',
      label: 'Testimonial',
    },
    {
      key: 'hero-banner',
      label: 'Hero Banner',
    },
    {
      key: 'product-slider',
      label: 'Product Slider',
    },
    {
      key: 'brand-slider',
      label: 'Brand Slider',
    },
    {
      key: 'blog-post',
      label: 'Blog Post',
    },
  ],
}

export const layoutConfigArray: LayoutCardTypes[] = [navBarArray, sliderArray]

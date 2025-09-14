// Base types for common properties
export type ResponsiveValue<T> =
  | T
  | {
      xs?: T
      sm?: T
      md?: T
      lg?: T
      xl?: T
    }

export type ColorValue = string // hex, rgb, rgba, etc.
export type SpacingValue = string | number // px, rem, %, etc.
export type SizeValue = string | number

// Animation and interaction types
export interface AnimationConfig {
  type?: 'fadeIn' | 'slideIn' | 'scaleIn' | 'bounce' | 'none'
  duration?: number // in ms
  delay?: number // in ms
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
}

export interface HoverEffect {
  scale?: number
  opacity?: number
  backgroundColor?: ColorValue
  borderColor?: ColorValue
  transform?: string
}

// Base component interface
export interface BaseComponent {
  id: string
  name: string
  type:
    | 'text'
    | 'image'
    | 'button'
    | 'icon'
    | 'card'
    | 'grid'
    | 'column'
    | 'row'
    | 'section'
    | 'carousel'
    | 'spacer'
    | 'divider'
  visible?: boolean
  className?: string
  customCSS?: string
  animation?: AnimationConfig
  children?: ComponentConfig[]
}

// Style properties that can be applied to any component
export interface StyleProps {
  // Layout
  width?: ResponsiveValue<SizeValue>
  height?: ResponsiveValue<SizeValue>
  minWidth?: ResponsiveValue<SizeValue>
  maxWidth?: ResponsiveValue<SizeValue>
  minHeight?: ResponsiveValue<SizeValue>
  maxHeight?: ResponsiveValue<SizeValue>

  // Spacing
  margin?: ResponsiveValue<SpacingValue>
  marginTop?: ResponsiveValue<SpacingValue>
  marginRight?: ResponsiveValue<SpacingValue>
  marginBottom?: ResponsiveValue<SpacingValue>
  marginLeft?: ResponsiveValue<SpacingValue>
  padding?: ResponsiveValue<SpacingValue>
  paddingTop?: ResponsiveValue<SpacingValue>
  paddingRight?: ResponsiveValue<SpacingValue>
  paddingBottom?: ResponsiveValue<SpacingValue>
  paddingLeft?: ResponsiveValue<SpacingValue>

  // Background
  backgroundColor?: ColorValue
  backgroundImage?: string
  backgroundSize?: 'cover' | 'contain' | 'auto' | string
  backgroundPosition?: string
  backgroundRepeat?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'

  // Border
  border?: string
  borderWidth?: SpacingValue
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none'
  borderColor?: ColorValue
  borderRadius?: ResponsiveValue<SpacingValue>

  // Shadow
  boxShadow?: string
  textShadow?: string

  // Position
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  top?: SpacingValue
  right?: SpacingValue
  bottom?: SpacingValue
  left?: SpacingValue
  zIndex?: number

  // Transform
  transform?: string
  transformOrigin?: string

  // Opacity and filters
  opacity?: number
  filter?: string

  // Overflow
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto'
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto'
}

// Typography properties
export interface TypographyProps {
  fontSize?: ResponsiveValue<SizeValue>
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | number
  fontFamily?: string
  fontStyle?: 'normal' | 'italic' | 'oblique'
  lineHeight?: number | string
  letterSpacing?: SpacingValue
  textAlign?: ResponsiveValue<'left' | 'center' | 'right' | 'justify'>
  textDecoration?: 'none' | 'underline' | 'line-through' | 'overline'
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  color?: ColorValue
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line'
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word'
}

// Flex properties
export interface FlexProps {
  display?: 'flex' | 'inline-flex'
  flexDirection?: ResponsiveValue<'row' | 'column' | 'row-reverse' | 'column-reverse'>
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justifyContent?: ResponsiveValue<
    'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  >
  alignItems?: ResponsiveValue<'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'>
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'
  gap?: ResponsiveValue<SpacingValue>
  rowGap?: ResponsiveValue<SpacingValue>
  columnGap?: ResponsiveValue<SpacingValue>

  // Flex item properties
  flex?: string | number
  flexGrow?: number
  flexShrink?: number
  flexBasis?: SizeValue
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  order?: number
}

// Grid properties
export interface GridProps {
  display?: 'grid' | 'inline-grid'
  gridTemplateColumns?: ResponsiveValue<string>
  gridTemplateRows?: ResponsiveValue<string>
  gridTemplateAreas?: string
  gridAutoColumns?: string
  gridAutoRows?: string
  gridAutoFlow?: 'row' | 'column' | 'row dense' | 'column dense'
  gap?: ResponsiveValue<SpacingValue>
  rowGap?: ResponsiveValue<SpacingValue>
  columnGap?: ResponsiveValue<SpacingValue>

  // Grid item properties
  gridColumn?: string
  gridRow?: string
  gridArea?: string
  justifySelf?: 'start' | 'end' | 'center' | 'stretch'
  alignSelf?: 'start' | 'end' | 'center' | 'stretch'
}

// Individual component type definitions
export interface TextComponent extends BaseComponent {
  type: 'text'
  props: StyleProps &
    TypographyProps & {
      content: string
      tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
      truncate?: boolean
      maxLines?: number
      hoverEffect?: HoverEffect
    }
}

export interface ImageComponent extends BaseComponent {
  type: 'image'
  props: StyleProps & {
    src: string
    alt: string
    title?: string
    lazy?: boolean
    objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
    objectPosition?: string
    aspectRatio?: string
    placeholder?: string
    fallbackSrc?: string
    hoverEffect?: HoverEffect & {
      zoom?: number
    }
  }
}

export interface ButtonComponent extends BaseComponent {
  type: 'button'
  props: StyleProps &
    TypographyProps & {
      text: string
      href?: string
      target?: '_blank' | '_self' | '_parent' | '_top'
      variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
      size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
      disabled?: boolean
      loading?: boolean
      loadingText?: string
      leftIcon?: string
      rightIcon?: string
      fullWidth?: boolean
      hoverEffect?: HoverEffect
      onClick?: string // JavaScript function name or code
    }
}

export interface IconComponent extends BaseComponent {
  type: 'icon'
  props: StyleProps & {
    name: string
    library?: 'lucide' | 'heroicons' | 'fontawesome' | 'material' | 'custom'
    size?: SizeValue
    color?: ColorValue
    strokeWidth?: number
    hoverEffect?: HoverEffect
    clickable?: boolean
    href?: string
    onClick?: string
  }
}

export interface CardComponent extends BaseComponent {
  type: 'card'
  props: StyleProps & {
    title?: string
    subtitle?: string
    description?: string
    image?: string
    imagePosition?: 'top' | 'bottom' | 'left' | 'right' | 'background'
    imageAspectRatio?: string
    href?: string
    target?: '_blank' | '_self'
    hoverable?: boolean
    hoverEffect?: HoverEffect & {
      lift?: boolean
      liftHeight?: SpacingValue
    }
    header?: ComponentConfig[]
    footer?: ComponentConfig[]
  }
}

export interface RowComponent extends BaseComponent {
  type: 'row'
  props: StyleProps &
    FlexProps & {
      wrap?: boolean
      reverse?: boolean
      verticalAlign?: 'top' | 'middle' | 'bottom' | 'stretch'
      horizontalAlign?: 'left' | 'center' | 'right' | 'space-between' | 'space-around' | 'space-evenly'
    }
}

export interface ColumnComponent extends BaseComponent {
  type: 'column'
  props: StyleProps &
    FlexProps & {
      span?: ResponsiveValue<number>
      offset?: ResponsiveValue<number>
      push?: ResponsiveValue<number>
      pull?: ResponsiveValue<number>
      reverse?: boolean
      verticalAlign?: 'top' | 'middle' | 'bottom' | 'stretch'
      horizontalAlign?: 'left' | 'center' | 'right'
    }
}

export interface GridComponent extends BaseComponent {
  type: 'grid'
  props: StyleProps &
    GridProps & {
      columns?: ResponsiveValue<number>
      autoFit?: boolean
      minColumnWidth?: SizeValue
      maxColumns?: number
      equalHeight?: boolean
    }
}

export interface SectionComponent extends BaseComponent {
  type: 'section'
  props: StyleProps & {
    title?: string
    subtitle?: string
    description?: string
    containerMaxWidth?: SizeValue
    fullWidth?: boolean
    centerContent?: boolean
    tag?: 'section' | 'div' | 'main' | 'article' | 'aside' | 'header' | 'footer'
  }
}

export interface CarouselComponent extends BaseComponent {
  type: 'carousel'
  props: StyleProps & {
    autoPlay?: boolean
    interval?: number
    loop?: boolean
    showDots?: boolean
    showArrows?: boolean
    showProgress?: boolean
    slidesToShow?: ResponsiveValue<number>
    slidesToScroll?: number
    centerMode?: boolean
    fade?: boolean
    vertical?: boolean
    rtl?: boolean
    pauseOnHover?: boolean
    swipe?: boolean
    draggable?: boolean
    adaptiveHeight?: boolean
    variableWidth?: boolean
  }
}

export interface SpacerComponent extends BaseComponent {
  type: 'spacer'
  props: StyleProps & {
    height?: ResponsiveValue<SizeValue>
  }
}

export interface DividerComponent extends BaseComponent {
  type: 'divider'
  props: StyleProps & {
    orientation?: 'horizontal' | 'vertical'
    variant?: 'solid' | 'dashed' | 'dotted'
    thickness?: SpacingValue
    color?: ColorValue
    label?: string
    labelPosition?: 'left' | 'center' | 'right'
  }
}

// Union type for all components
export type ComponentConfig =
  | TextComponent
  | ImageComponent
  | ButtonComponent
  | IconComponent
  | CardComponent
  | RowComponent
  | ColumnComponent
  | GridComponent
  | SectionComponent
  | CarouselComponent
  | SpacerComponent
  | DividerComponent

// SEO and metadata
export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
  robots?: string
  schema?: Record<string, any>
}

// Global theme configuration
export interface ThemeConfig {
  colors?: {
    primary?: ColorValue
    secondary?: ColorValue
    success?: ColorValue
    warning?: ColorValue
    error?: ColorValue
    info?: ColorValue
    background?: ColorValue
    surface?: ColorValue
    text?: ColorValue
    textSecondary?: ColorValue
    border?: ColorValue
    [key: string]: ColorValue | undefined
  }
  typography?: {
    fontFamily?: {
      sans?: string
      serif?: string
      mono?: string
      [key: string]: string | undefined
    }
    fontSize?: {
      xs?: SizeValue
      sm?: SizeValue
      base?: SizeValue
      lg?: SizeValue
      xl?: SizeValue
      [key: string]: SizeValue | undefined
    }
    fontWeight?: {
      light?: number
      normal?: number
      medium?: number
      semibold?: number
      bold?: number
      [key: string]: number | undefined
    }
  }
  spacing?: {
    xs?: SpacingValue
    sm?: SpacingValue
    md?: SpacingValue
    lg?: SpacingValue
    xl?: SpacingValue
    [key: string]: SpacingValue | undefined
  }
  borderRadius?: {
    none?: SpacingValue
    sm?: SpacingValue
    md?: SpacingValue
    lg?: SpacingValue
    full?: SpacingValue
    [key: string]: SpacingValue | undefined
  }
  shadows?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
    [key: string]: string | undefined
  }
  breakpoints?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    [key: string]: number | undefined
  }
}

// Device and context configuration
export interface DeviceConfig {
  type: 'desktop' | 'tablet' | 'mobile'
  width: number
  height: number
  userAgent?: string
}

export interface ContextConfig {
  device: DeviceConfig
  locale?: string
  timezone?: string
  currency?: string
  user?: {
    id?: string
    role?: string
    preferences?: Record<string, any>
  }
  feature_flags?: Record<string, boolean>
}

// Main layout configuration interface
export interface LayoutConfig {
  // Basic information
  id: string
  name: string
  path: string
  version?: string
  status?: 'draft' | 'published' | 'archived'

  // Metadata
  seo?: SEOConfig
  meta?: Record<string, any>

  // Theme and styling
  theme?: ThemeConfig
  customCSS?: string

  // Layout components
  components: ComponentConfig[]

  // Conditional rendering rules
  conditions?: {
    id: string
    name: string
    rules: {
      field: string // e.g., 'user.role', 'device.type', 'feature_flags.newFeature'
      operator:
        | 'equals'
        | 'not_equals'
        | 'contains'
        | 'not_contains'
        | 'greater_than'
        | 'less_than'
        | 'in'
        | 'not_in'
      value: any
    }[]
    operator?: 'AND' | 'OR'
    componentIds: string[] // Components to show/hide based on rules
  }[]

  // Global settings
  settings?: {
    containerMaxWidth?: SizeValue
    defaultSpacing?: SpacingValue
    animationsEnabled?: boolean
    lazyLoadImages?: boolean
    enableAnalytics?: boolean
    analyticsId?: string
    enableA11y?: boolean
    a11yOptions?: {
      focusOutline?: boolean
      reducedMotion?: boolean
      highContrast?: boolean
    }
  }

  // Timestamps and versioning
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  createdBy?: string
  updatedBy?: string

  // Preview and testing
  previewUrl?: string
  testingConfig?: {
    abTest?: {
      id: string
      variants: {
        id: string
        name: string
        weight: number
        components: ComponentConfig[]
      }[]
    }
  }
}

// Helper types for the admin interface
export interface ComponentLibraryItem {
  type: ComponentConfig['type']
  name: string
  icon: string
  category: 'layout' | 'content' | 'media' | 'form' | 'navigation' | 'other'
  description?: string
  preview?: string
  defaultProps: Partial<ComponentConfig['props']>
}

export interface LayoutTemplate {
  id: string
  name: string
  description?: string
  category: string
  preview: string
  config: Partial<LayoutConfig>
}

// Export utility type for type checking
export type ComponentType = ComponentConfig['type']
export type ComponentProps<T extends ComponentType> = Extract<ComponentConfig, { type: T }>['props']

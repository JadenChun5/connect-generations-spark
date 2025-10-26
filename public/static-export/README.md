# ElderConnect - Static HTML Export for WordPress

This folder contains static HTML/CSS versions of the ElderConnect demonstration website. These files are designed to be used as a reference by WordPress developers to recreate the design as a custom WordPress theme.

## Files Included

- `index.html` - Homepage with hero section, value propositions, and benefits
- `features.html` - Features page (coming soon)
- `demo.html` - Demo page (coming soon)
- `about.html` - About page (coming soon)
- `connect.html` - Contact page (coming soon)
- `styles.css` - Shared stylesheet with all design system variables

## Design System

### Colors
- Primary: #9b87f5 (Purple)
- Secondary: #F97316 (Orange)
- Accent: #0EA5E9 (Blue)
- Background: #FFFFFF
- Foreground: #1A1F2C

### Typography
- Body Font: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
- Headings: Bold weight
- Body: 1.6 line-height

### Components Used
- Fixed header with blur backdrop
- Gradient hero sections
- Card-based layouts
- Grid systems (CSS Grid)
- Hover animations
- Responsive design (mobile-first)

## WordPress Implementation Notes

### Recommended Approach

1. **Create a Custom Theme**
   - Use these HTML files as templates
   - Convert to WordPress template files (header.php, footer.php, page.php, etc.)
   - Implement WordPress Loop for dynamic content

2. **Page Builder Alternative**
   - Use Elementor, Divi, or Gutenberg
   - Recreate layouts using builder widgets
   - Copy CSS custom properties for consistent styling

3. **CSS Variables**
   - All colors use CSS custom properties (`:root`)
   - Easy to theme and customize
   - Can be integrated with WordPress Customizer

4. **Components to Build**
   - Header (sticky, with navigation)
   - Hero sections (full-height, with gradients)
   - Card grids (benefits, features)
   - Stats display
   - CTA sections
   - Footer

### Required WordPress Features

- Custom Post Types: None needed (uses standard Pages)
- Plugins Suggested: 
  - Contact Form 7 or WPForms (for contact page)
  - Custom CSS plugin (for design system variables)
- Menus: Single main navigation menu
- Widgets: Footer area

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Images Needed

You'll need to replace placeholder content with actual images:
- Hero background image
- Feature icons/illustrations
- Team photos (for About page)
- Senior center photos

## Color Palette for WordPress

```css
/* Add to WordPress Customizer or theme CSS */
:root {
    --primary: #9b87f5;
    --primary-soft: #E5DEFF;
    --secondary: #F97316;
    --secondary-soft: #FED7AA;
    --accent: #0EA5E9;
    --background: #FFFFFF;
    --foreground: #1A1F2C;
    --muted: #6E59A5;
    --border: #E5DEFF;
}
```

## Content Structure

### Homepage
1. Header (fixed navigation)
2. Hero Section (full height, gradient background)
3. "How It Works" - User type selection
4. Benefits Grid (6-8 benefit cards)
5. Stats Section (3 key statistics)
6. CTA Section
7. Footer

### Features Page
- Features grid with icons
- Detailed benefit descriptions
- CTA sections

### Demo Page
- Interactive dashboard previews
- Tabbed interface (Student/Staff views)
- Feature highlights

### About Page
- Mission statement
- Values section
- History/story
- Team section
- CTA

### Contact Page
- Contact form
- Location information
- Social media links

## Next Steps

1. Set up WordPress installation
2. Create child theme or custom theme
3. Convert HTML structure to PHP template files
4. Integrate WordPress functions (wp_head, wp_footer, etc.)
5. Create custom menus and navigation
6. Add content through WordPress admin
7. Test responsive design
8. Optimize for performance

## Support

For questions about this export or implementation guidance, please refer to the WordPress Codex or hire a WordPress developer familiar with custom theme development.

---

**Note:** These are static reference files. They do not include WordPress functionality, backend integration, or dynamic content. A WordPress developer will need to convert these into a functioning WordPress theme.

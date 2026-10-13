<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Enelle Beauty Bar – E-commerce Expansion Plan

## 1) Project Goal

We are evolving the current beauty and salon website into a hybrid storefront + service brand site inspired by the structure and conversion flow of a premium hair retail website.

The target direction is:

- a strong luxury aesthetic
- full homepage merchandising
- product discovery through collections and category filtering
- premium product cards with pricing and category tags
- trust-building sections like best sellers, product education, and FAQ
- customer account journey for sign-up and checkout
- service booking and lead generation
- searchable content covering both products and services

This project must be planned and content-driven before implementation begins. We will not build a full storefront without the business owner providing the product inventory, brand copy, pricing rules, image assets, and customer journey inputs.

## 1A) Working Model and Ownership

This project will follow a clear split of responsibility:

- The business owner is responsible for business content, product data, pricing, brand direction, and approved assets.
- The developer is responsible for architecture, homepage structure, component hierarchy, catalog UX, admin workflow design, and implementation planning.
- Homepage layout and section order will be designed by the developer, based on the reference direction and the business goals, while the owner supplies the actual copy, categories, products, and brand position.
- Categories and collections will first be defined in the shared Google Sheet so the owner can agree on naming, structure, and organization before the admin system is introduced.
- Once content is approved, an admin/dashboard interface will be built so the owner can later manage product catalog data, categories, product assignments, and basic catalog updates without requiring a developer for every edit.

This means the owner is not expected to design the page layout. The owner is expected to provide the business truth: what they sell, how they describe it, what pricing and categories they want, and which products or sections are important.

## 2) Strategic Direction

### Website inspiration goals

The new site should reflect the structure and feel of a premium hair extension / beauty retail website, including:

- large, clean, full-width hero carousel on the homepage
- strong headline messaging and CTA blocks
- featured products section with price logic such as “From …”
- collection discovery blocks
- sections for “Shop All Products”, “Best Sellers”, “Super Double Drawn Hairs”, “Hair Tools and Accessories”
- educational content blocks such as “What you need to know”
- product imagery that feels luxury, premium, and conversion-focused
- storefront footer with strong navigation and contact details

### Business objective

The website must support both:

1. retail sales through a product storefront
2. brand trust and service conversion through booking, consultation, and FAQs

This means the experience should feel like a retail brand while still supporting salon services and consultation flows.

## 3) Required Site Architecture

### Core pages

- Home
- About
- Services
- Contact
- FAQ
- Collections
- Product detail pages
- Search results
- Cart
- Checkout / order flow
- User profile / account
- Sign up / login
- Social auth flow

### Collection pages

- `/collections`
- `/collections/:slug`
- collection navigation with filtering
- category-based browsing for hair types, collections, tools, accessories, bundles, etc.

### Catalog requirements

- list view with products
- filters for availability, price range, sort order, and stock state
- total product count after filtering
- category and subcategory segmentation
- product cards containing image, name, price, CTA, labels, and product attributes

### Search requirements

- global search for products and services
- results should display both product and service match types
- support for keywords, terms, and categories

### User/account requirements

- sign-up with email + password
- social auth (Google / Facebook / Apple if applicable)
- profile dashboard
- saved address and ordering preferences
- order history
- account management for customers

## 4) Homepage Content Structure to Match the Reference

The homepage should be built from content blocks, not hardcoded sections only. Each block must map to business-owned content.

The developer will architect the homepage layout based on the reference flow, while the owner will supply the actual business copy, image references, product set, and approved selling priorities.

### Required homepage zones

1. Hero carousel
   - primary headline
   - supporting text
   - CTA links
   - multiple slides
   - background/product images

2. Shop All Products
   - product grid or highlight strip
   - product names
   - pricing strategy (“From …”)
   - category tags

3. Shop by Category
   - categories such as hair bundles, closures, frontals, wigs, tools, accessories, bundles, etc.
   - category cards with icon or image

4. Best Sellers
   - curated top-performing items
   - rating if available
   - short product description

5. Super Double Drawn Hairs
   - seasonal or flagship collection highlight
   - descriptive editorial section
   - CTA to collection page

6. What You Need to Know
   - educational brand content
   - hair care / product guidance / buying tips
   - customer trust content

7. Hair Tools and Accessories
   - curated product cards
   - CTA to accessory collection

8. Footer
   - brand philosophy
   - navigation
   - contact information
   - social links
   - service area/location details
   - policy links

### Homepage content ownership

- Owner provides: headline copy, category names, product priorities, brand tone, section messaging, approved images, CTA text
- Developer provides: section architecture, card layout, spacing, visual hierarchy, responsive structure, content placeholders, component system

## 5) Admin and Catalog Management Requirements

The website will eventually include an admin/dashboard area so the business owner can manage the storefront after launch without direct code edits.

### Admin interface scope

- create, edit, and deactivate products
- create and edit categories
- create and edit collections
- assign one or more categories to each product
- mark featured products and best sellers
- set product price, availability, stock state, and product labels
- upload and assign product images
- manage homepage featured placements and hero content
- manage FAQs, services, and contact information

### Admin workflow

1. Categories and collections are first defined in the Google Sheet for approval.
2. Once approved, the admin system is built to support them as editable data records.
3. The owner can then manage live catalog data via the dashboard.
4. The website reads from the approved catalog structure and renders the storefront dynamically.

This sequencing keeps the project structured and prevents the owner from creating a messy catalog without a planned data model.

## 6) Catalog and Collection Requirements

### Collection model

Each collection should have:

- slug
- collection name
- short description
- long description (optional)
- category image/banner
- filterable attributes
- SEO title and meta description
- associated products

### Catalog filtering requirements

Minimum filter set:

- Availability
- Price range
- Sort by: newest / featured / price low-high / price high-low / popularity
- Product count after filtering

### Collection page behavior

- default list of visible products
- filter chips or sidebar options
- category page slug route such as `/collections/peruviana`
- pagination or load more support if inventory grows
- product count summary displayed

### Product requirements

Each product must have:

- name
- SKU / internal code
- category / subcategory
- collection association
- short description
- long description
- price
- compare price (optional)
- price label format (“From …” where relevant)
- image gallery
- availability status
- stock count if tracked
- featured / bestseller flag
- tags or labels
- shipping note if needed

## 6) Content and Asset Requirements to Collect from Business Owner

The following will be required before build execution can continue.

### A. Brand and identity content

- brand story
- brand voice and tone
- target customer profile
- core values
- service philosophy
- business location(s)
- contact details
- WhatsApp / social contact links

### B. Product catalog content

- full product list
- product names
- product blurbs/descriptions
- collections and categories
- pricing list
- images for each product
- product attributes (length, texture, color, type, texture, density, style, etc.)
- availability status
- products to mark as best sellers
- products to feature on homepage

### C. Homepage content

- hero slide text
- hero image set
- CTA labels
- section headings
- promotional text
- seasonal campaign banners

### D. Service content

- service list
- pricing for services
- service descriptions
- booking lead information
- service FAQs
- service area details

### E. FAQ content

- common questions
- answers
- product usage guidance
- shipping and order policy information

### F. Legal and policy content

- shipping policy
- return and exchange policy
- privacy policy
- terms and conditions
- payment and refund details

### G. SEO / marketing content

- keywords
- collection-level SEO descriptions
- product-level SEO meta fields
- campaign pages if needed
- social proof / testimonials

## 7) Suggested Google Sheet Structure for the Business Owner

Create one master spreadsheet with tabs for each content domain.

### Tab 1: Brand Overview

Columns:

- Brand name
- Business mission
- Tagline
- Brand colors
- Brand personality
- Target audience
- Unique selling points
- Location
- Contact email
- Phone
- WhatsApp link
- Instagram link
- Facebook link

### Tab 2: Homepage Content

Columns:

- Section name
- Headline
- Subheadline
- CTA text
- CTA link
- Image description
- Notes

### Tab 3: Product Catalog

Columns:

- Product ID
- Product name
- Collection
- Category
- Subcategory
- Price
- Price label
- Short description
- Long description
- Availability
- Featured
- Best seller
- Image URL / file name
- SKU
- Tags
- Notes

### Tab 4: Categories and Collections

Columns:

- Collection name
- Slug
- Parent category
- Banner image
- Description
- Featured order
- Products in collection
- SEO title
- SEO description
- Status (draft / approved / active)
- Notes

This tab must be completed and approved before the admin dashboard is built, since the structure is the foundation for the catalog manager.

### Tab 5: Services

Columns:

- Service name
- Category
- Price
- Description
- Booking CTA
- Duration
- image
- featured

### Tab 6: FAQs

Columns:

- Question
- Answer
- Category
- Published
- Notes

### Tab 7: Testimonials

Columns:

- Customer name
- Review text
- Rating
- Source
- Approved

### Tab 8: Policies and Legal

Columns:

- Policy type
- Link or content
- Last reviewed
- Owner approval status

### Tab 9: Assets / Media Library

Columns:

- Asset type
- File name
- Source
- Usage purpose
- Approved
- Notes

## 8) Required Owner Collaboration Workflow

We must follow a clear process to keep the owner involved without overwhelming her.

### Phase 1 – Discovery and direction

- agree on storefront style and conversion goals
- review competitor direction and required luxury retail feel
- identify top categories and collections
- approve the functional scope
- confirm ownership split: owner provides business content, developer architects layout and system

### Phase 2 – Content collection

- owner fills out the Google Sheet
- owner provides product photos and brand assets
- owner confirms pricing, categories, and best sellers
- owner provides service content and legal text
- owner confirms collection and category names before admin build

### Phase 3 – Design and content review

- developer drafts homepage section architecture and component layout
- review homepage wireframe and section layout
- confirm final messaging and CTA flow
- review product card and collection behavior design
- agree on the approved catalog structure before admin implementation

### Phase 4 – Build

- implement homepage, collections, product, search, cart, account, and services flows
- build the admin data model for categories, collections, and products
- map CMS or data-driven structure to the content sheet
- ensure all sections are connected to real content

### Phase 5 – QA and launch readiness

- test filters, product count, search, cart, account flow, service booking flow
- verify all content fields and media are present
- check responsive mobile and desktop behavior
- confirm admin functions work with approved category and product structure

## 9) Definition of Ready Before Build Work Starts

We should not start full implementation until all of the following are approved:

- homepage structure agreed and designed by the developer
- category list agreed and documented in the Google Sheet
- collection list agreed and documented in the Google Sheet
- product catalog or sample product set approved
- pricing format confirmed
- image set collection status confirmed
- service and FAQ content provided
- legal and policy content reviewed
- account/auth flow requirements confirmed
- admin catalog requirements reviewed
- Google Sheet completed and approved by the business owner

## 10) Implementation Guardrails

- Build in content-driven blocks, not hardcoded content only.
- Keep catalog and collections flexible so categories can be added later.
- Structure the data model to support both products and services in one reusable search system.
- Design with mobile-first conversion in mind.
- Keep the storefront premium and uncluttered.
- Ensure the homepage can feature merchants’ top products without manual hardcoding for every item.

## 11) Immediate Next Step

The next action is to prepare and share the Google Sheets with the business owner and ask her to complete the following first:

1. brand overview and business details
2. all products with pricing and category assignment
3. all category and collection names
4. homepage messaging and CTA copy
5. assets and product images
6. service list and FAQs
7. legal policies and contact details

After that content is approved, we will implement the homepage layout, catalog architecture, and the admin dashboard for ongoing product management.

## 12) Rules for This Project

- No full storefront build before content approval.
- The developer owns the front-end architecture and homepage layout design.
- The owner owns the business truth: products, pricing, categories, collections, and brand messaging.
- Categories and collections must be approved in the sheet before the admin system is built.
- Every section must correspond to a real business-owned data source.
- Product and collection pages must be planned as reusable catalog modules.
- Search should include both products and services.
- User account and cart flows must be treated as essential storefront features, not optional extras.
- We will review progress with the business owner in short structured checkpoints.

This plan is the working baseline for the project. It should be updated as more business content is supplied and as the owner confirms final requirements.

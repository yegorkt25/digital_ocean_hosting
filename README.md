```
b deploy
├─ backend
│  ├─ .htaccess
│  ├─ bin
│  │  ├─ data.json
│  │  ├─ doctrine
│  │  └─ migrate_data
│  ├─ composer.json
│  ├─ composer.lock
│  ├─ Dockerfile
│  ├─ index.php
│  ├─ src
│  │  ├─ .env
│  │  ├─ Controller
│  │  │  └─ GraphQL.php
│  │  ├─ DBConn.php
│  │  ├─ Entities
│  │  │  ├─ AttributeItem.php
│  │  │  ├─ BaseEntity.php
│  │  │  ├─ BaseMethods.php
│  │  │  ├─ Category.php
│  │  │  ├─ Currency.php
│  │  │  ├─ Order.php
│  │  │  ├─ OrderDetail.php
│  │  │  ├─ OrderDetailsAttribute.php
│  │  │  ├─ OrderStatus.php
│  │  │  ├─ Product.php
│  │  │  ├─ ProductAttribute.php
│  │  │  ├─ ProductGallery.php
│  │  │  └─ ProductPrice.php
│  │  ├─ Resolvers
│  │  │  └─ SchemaResolver.php
│  │  └─ Services
│  │     ├─ IOrderService.php
│  │     ├─ IProductService.php
│  │     ├─ OrderService.php
│  │     └─ ProductService.php
│  └─
│
├─ docker-compose.yml
└─ frontend
   ├─ .dockerignore
   ├─ dist
   │  ├─ assets
   │  │  ├─ image-BN5lyJ9l.png
   │  │  ├─ index-Cz4QL_3d.js
   │  │  └─ index-U2JE5jsS.css
   │  ├─ index.html
   │  └─ vite.svg
   ├─ Dockerfile
   ├─ eslint.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  └─ vite.svg
   ├─ README.md
   ├─ src
   │  ├─ App.css
   │  ├─ App.tsx
   │  ├─ AppStyles.tsx
   │  ├─ assets
   │  │  ├─ cart.svg
   │  │  ├─ cartButton.png
   │  │  ├─ cartButton.svg
   │  │  ├─ logo.svg
   │  │  └─ react.svg
   │  ├─ components
   │  │  ├─ Cart
   │  │  │  ├─ Cart.tsx
   │  │  │  ├─ CartProductInfo.tsx
   │  │  │  ├─ CountSelector.tsx
   │  │  │  ├─ ShowSwatchAttribute.tsx
   │  │  │  ├─ ShowTextAttribute.tsx
   │  │  │  └─ styles
   │  │  │     └─ CartStyles.tsx
   │  │  ├─ Navbar
   │  │  │  ├─ Navbar.tsx
   │  │  │  ├─ NavCategory.tsx
   │  │  │  └─ styles
   │  │  │     └─ NavStyles.tsx
   │  │  ├─ ProductDetails
   │  │  │  ├─ Info.tsx
   │  │  │  ├─ PhotoGallery.tsx
   │  │  │  ├─ ProductDetails.tsx
   │  │  │  ├─ styles
   │  │  │  │  └─ ProductDetailsStyles.tsx
   │  │  │  ├─ SwatchSelector.tsx
   │  │  │  └─ TextSelector.tsx
   │  │  └─ ProductList
   │  │     ├─ ProductCard.tsx
   │  │     ├─ ProductList.tsx
   │  │     └─ styles
   │  │        └─ ProductListStyles.tsx
   │  ├─ index.css
   │  ├─ main.tsx
   │  ├─ MetaTags.tsx
   │  ├─ Requests.ts
   │  ├─ Types.ts
   │  └─ vite-env.d.ts
   ├─ tsconfig.app.json
   ├─ tsconfig.json
   ├─ tsconfig.node.json
   └─ vite.config.ts

```

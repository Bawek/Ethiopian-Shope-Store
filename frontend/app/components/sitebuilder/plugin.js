import "./BlockStyles/file.css";
export const plugin1 = (editor, opts = {}) => {
  const labels = {
    // Navigation
    header1: true,
    header2: true,
    navbar1: true,

    // Hero Sections
    hero1: true,
    hero2: true,
    hero3: true,

    // E-commerce
    productCard1: true,
    productCard2: true,
    productGrid: true,
    productShowcase: true,
    shoppingCart: true,
    checkoutForm: true,

    // Forms
    contactForm1: true,
    contactForm2: true,
    newsletter: true,
    fileUpload: true,
    loginForm: true,

    // Gallery & Media
    imageGallery1: true,
    imageGallery2: true,
    videoEmbed: true,

    // Testimonials
    testimonial1: true,
    testimonial2: true,
    testimonialSlider: true,

    // Blog/Content
    blogPost1: true,
    blogPost2: true,
    contentSection: true,

    // About/Team
    aboutSection: true,
    teamGrid: true,

    // Footer
    footer1: true,
    footer2: true,
    footer3: true,

    // Dashboard/UI
    dashboardCard: true,
    statsGrid: true,
    pricingTable: true,
    faqSection: true
  };

  const categories = {
    navigation: "Navigation",
    hero: "Hero Sections",
    ecommerce: "E-Commerce",
    forms: "Forms",
    media: "Media & Gallery",
    testimonials: "Testimonials",
    blog: "Blog & Content",
    about: "About & Team",
    footer: "Footers",
    ui: "UI Components"
  };

  opts = { labels: labels, categories: categories };
  loadComponents(editor, opts);
};

const loadComponents = (editor, options) => {
  const { labels, categories } = options;
  // =============================================
  // E-Commerce – Horizontal Card Product Grid
  // =============================================
// =============================================
// E-Commerce – Single Product Listing
// =============================================
if (labels?.productCard2) {
  editor.BlockManager.add("productCard2", {
    label: "Single Product",
    category: categories?.ecommerce,
    attributes: { class: "productSingle-preview" },
    content: `
    <section id="product-section" class="bg-gray-50 py-12">
      <div id="product-container" class="max-w-7xl mx-auto px-4">
        <h2 id="product-title" class="text-2xl font-bold mb-6">Product Title</h2>
        <div id="product-card" class="bg-white p-4 rounded-lg shadow-md max-w-sm mx-auto">
          <img id="product-image" src="https://via.placeholder.com/300x200" alt="Product Image" class="w-full h-48 object-cover rounded" />
          <h3 id="product-name" class="mt-2 text-lg font-semibold">Product Title</h3>
          <p id="product-price" class="text-gray-600">$29.99</p>
          <button id="product-buy-btn" class="mt-2 w-full bg-indigo-600 text-white py-2 rounded">Buy Now</button>
        </div>
      </div>
    </section>
    `
  });
}



  // =============================================
  // Navigation Components
  // =============================================
  if (labels?.header1) {
    editor.BlockManager.add("header1", {
      label: "Header - Standard",
      category: categories?.navigation,
      attributes: { class: "header1-preview" },
      content: `
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-8 w-auto" src="https://via.placeholder.com/150x50" alt="Logo">
              </div>
              <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Home</a>
                <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Products</a>
                <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">About</a>
                <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Contact</a>
              </nav>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:items-center">
              <button class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <span class="sr-only">Cart</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              <button class="ml-4 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <span class="sr-only">Account</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
            <div class="-mr-2 flex items-center sm:hidden">
              <button type="button" class="mobile-menu-toggle inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                <span class="sr-only">Open main menu</span>
                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      `
    });
  }

  // =============================================
  // Hero Sections
  // =============================================
  if (labels?.hero1) {
    editor.BlockManager.add("hero1", {
      label: "Hero - Centered Content",
      category: categories?.hero,
      attributes: { class: "hero1-preview" },
      content: `
      <div class="bg-indigo-700">
        <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            <span class="block">Boost your online presence</span>
            <span class="block">Start using our platform today.</span>
          </h2>
          <p class="mt-4 text-lg leading-6 text-indigo-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores quibusdam numquam harum illum ab exercitationem.</p>
          <a href="#" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
            Get started
          </a>
        </div>
      </div>
      `
    });
  }

  // =============================================
  // E-Commerce Components
  // =============================================
  if (labels?.productCard1) {
    editor.BlockManager.add("productCard1", {
      label: "Product Card - Basic",
      category: categories?.ecommerce,
      attributes: { class: "productCard1-preview" },
      content: `
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="relative">
          <img class="w-full h-48 object-cover" src="https://via.placeholder.com/300x200" alt="Product image">
          <div class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Premium Headphones</h3>
          <div class="flex items-center mb-2">
            <div class="flex text-yellow-400">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            </div>
            <span class="text-gray-600 text-xs ml-2">(24 reviews)</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold text-gray-900">$199.99</span>
            <span class="text-sm line-through text-gray-500">$249.99</span>
          </div>
          <button class="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
      `
    });
  }

  if (labels?.shoppingCart) {
    editor.BlockManager.add("shoppingCart", {
      label: "Shopping Cart",
      category: categories?.ecommerce,
      attributes: { class: "shoppingCart-preview" },
      content: `
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6">Your Cart (3)</h2>
        
        <div class="divide-y divide-gray-200">
          <!-- Cart Item 1 -->
          <div class="py-4 flex">
            <div class="flex-shrink-0">
              <img class="h-24 w-24 rounded-md object-cover" src="https://via.placeholder.com/150" alt="Product image">
            </div>
            <div class="ml-4 flex-1">
              <div class="flex justify-between">
                <h3 class="text-lg font-medium text-gray-900">Wireless Headphones</h3>
                <p class="text-lg font-medium text-gray-900">$99.99</p>
              </div>
              <p class="mt-1 text-sm text-gray-500">Black</p>
              <div class="mt-2 flex items-center">
                <button class="text-gray-500 hover:text-gray-700">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="mx-2 text-gray-700">1</span>
                <button class="text-gray-500 hover:text-gray-700">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button class="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
              </div>
            </div>
          </div>
          
          <!-- Cart Item 2 -->
          <div class="py-4 flex">
            <div class="flex-shrink-0">
              <img class="h-24 w-24 rounded-md object-cover" src="https://via.placeholder.com/150" alt="Product image">
            </div>
            <div class="ml-4 flex-1">
              <div class="flex justify-between">
                <h3 class="text-lg font-medium text-gray-900">Smart Watch</h3>
                <p class="text-lg font-medium text-gray-900">$199.99</p>
              </div>
              <p class="mt-1 text-sm text-gray-500">Silver</p>
              <div class="mt-2 flex items-center">
                <button class="text-gray-500 hover:text-gray-700">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="mx-2 text-gray-700">1</span>
                <button class="text-gray-500 hover:text-gray-700">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button class="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 border-t border-gray-200 pt-6">
          <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$299.98</p>
          </div>
          <p class="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div class="mt-6">
            <a href="#" class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Checkout
            </a>
          </div>
          <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
            <p>
              or <a href="#" class="text-indigo-600 font-medium hover:text-indigo-500">Continue Shopping<span aria-hidden="true"> &rarr;</span></a>
            </p>
          </div>
        </div>
      </div>
      `
    });
  }

  // =============================================
  // Form Components
  // =============================================
  if (labels?.loginForm) {
    editor.BlockManager.add("loginForm", {
      label: "Login Form",
      category: categories?.forms,
      attributes: { class: "loginForm-preview" },
      content: `
      <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</a>
          </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form class="space-y-6" action="#" method="POST">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                <div class="mt-1">
                  <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <div class="mt-1">
                  <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                  <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>

                <div class="text-sm">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                </div>
              </div>

              <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
              </div>
            </form>

            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Sign in with Facebook</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
                    </svg>
                  </a>
                </div>

                <div>
                  <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Sign in with Twitter</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 004.8 7.723v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 002 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>

                <div>
                  <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Sign in with GitHub</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    });
  }

  // =============================================
  // Media & Gallery Components
  // =============================================
  if (labels?.imageGallery1) {
    editor.BlockManager.add("imageGallery1", {
      label: "Image Gallery - Grid",
      category: categories?.media,
      attributes: { class: "imageGallery1-preview" },
      content: `
      <div class="bg-white">
        <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Gallery</h2>

          <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div class="group relative">
              <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img src="https://via.placeholder.com/300x300" alt="Gallery image 1" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" class="absolute inset-0"></span>
                      Product Image
                    </a>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">Category</p>
                </div>
              </div>
            </div>

            <div class="group relative">
              <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img src="https://via.placeholder.com/300x300" alt="Gallery image 2" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" class="absolute inset-0"></span>
                      Product Image
                    </a>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">Category</p>
                </div>
              </div>
            </div>

            <div class="group relative">
              <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img src="https://via.placeholder.com/300x300" alt="Gallery image 3" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" class="absolute inset-0"></span>
                      Product Image
                    </a>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">Category</p>
                </div>
              </div>
            </div>

            <div class="group relative">
              <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img src="https://via.placeholder.com/300x300" alt="Gallery image 4" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" class="absolute inset-0"></span>
                      Product Image
                    </a>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">Category</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    });
  }

  // =============================================
  // Testimonial Components
  // =============================================
  if (labels?.testimonialSlider) {
    editor.BlockManager.add("testimonialSlider", {
      label: "Testimonial Slider",
      category: categories?.testimonials,
      attributes: { class: "testimonialSlider-preview" },
      content: `
      <div class="bg-white">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 class="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by customers worldwide
          </h2>
          <div class="mt-12">
            <div class="relative">
              <!-- Slider container -->
              <div class="overflow-hidden">
                <div class="flex transition-transform duration-300 ease-in-out">
                  <!-- Testimonial 1 -->
                  <div class="flex-shrink-0 w-full">
                    <div class="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-3xl">
                      <div class="flex items-center">
                        <img class="h-12 w-12 rounded-full" src="https://via.placeholder.com/150" alt="Customer photo">
                        <div class="ml-4">
                          <div class="text-lg font-medium text-gray-900">Sarah Williams</div>
                          <div class="text-indigo-600">CEO, Company Inc.</div>
                        </div>
                      </div>
                      <div class="mt-4 text-gray-600">
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
                      </div>
                      <div class="mt-6 flex items-center">
                        <div class="flex text-yellow-400">
                          <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                          <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                          <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                          <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                          <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                        </div>
                        <span class="ml-2 text-gray-600 text-sm">Posted on January 15, 2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                `
    });
  }
  // =============================================
  // Blog/Content Components
  // =============================================
  if (labels?.blogPost1) {
    editor.BlockManager.add("blogPost1", {
      label: "Blog Post - Standard",
      category: categories?.blog,
      attributes: { class: "blogPost1-preview" },
      content: `
    <article class="max-w-3xl mx-auto px-4 py-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">How to Build a Successful SaaS Product</h1>
        <div class="flex items-center text-sm text-gray-500">
          <span class="mr-4">By Jane Doe</span>
          <time datetime="2023-05-15">May 15, 2023</time>
          <span class="mx-4">•</span>
          <span>5 min read</span>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">SaaS</span>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Startups</span>
        </div>
      </header>
      
      <div class="prose max-w-none">
        <img src="https://via.placeholder.com/800x450" alt="Blog post image" class="w-full h-auto rounded-lg mb-6">
        
        <p class="text-lg text-gray-700 mb-4">Building a successful SaaS product requires more than just great code. It demands a deep understanding of your customers, a solid business model, and relentless execution.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Your Market</h2>
        <p class="text-gray-700 mb-4">Before writing a single line of code, you need to validate your idea. Conduct market research to identify:</p>
        <ul class="list-disc pl-6 mb-4 text-gray-700">
          <li class="mb-2">Target customer pain points</li>
          <li class="mb-2">Existing solutions and their shortcomings</li>
          <li class="mb-2">Market size and growth potential</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Building an MVP</h2>
        <p class="text-gray-700 mb-4">Your Minimum Viable Product should focus on solving one core problem exceptionally well. Avoid feature creep at this stage.</p>
        
        <blockquote class="border-l-4 border-indigo-500 pl-4 italic text-gray-700 my-6">
          "Perfection is the enemy of progress. Ship early, ship often, and iterate based on real user feedback."
        </blockquote>
        
        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Growth Strategies</h2>
        <p class="text-gray-700 mb-4">Once you have product-market fit, focus on scalable growth channels:</p>
        <ol class="list-decimal pl-6 mb-4 text-gray-700">
          <li class="mb-2">Content marketing</li>
          <li class="mb-2">Referral programs</li>
          <li class="mb-2">Strategic partnerships</li>
        </ol>
      </div>
      
      <footer class="mt-12 pt-6 border-t border-gray-200">
        <div class="flex items-center">
          <img class="h-12 w-12 rounded-full" src="https://via.placeholder.com/150" alt="Author">
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">Jane Doe</h3>
            <p class="text-gray-600">Founder & CEO at SaaS Company</p>
            <div class="flex mt-2 space-x-4">
              <a href="#" class="text-gray-500 hover:text-gray-700">
                <span class="sr-only">Twitter</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-700">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </article>
    `
    });
  }

  // =============================================
  // About/Team Components
  // =============================================
  if (labels?.teamGrid) {
    editor.BlockManager.add("teamGrid", {
      label: "Team Grid",
      category: categories?.about,
      attributes: { class: "teamGrid-preview" },
      content: `
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">Meet the talented people behind our success.</p>
        </div>
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article class="flex flex-col items-center justify-center">
            <img class="aspect-[2/3] w-full rounded-2xl object-cover" src="https://via.placeholder.com/400x600" alt="Team member">
            <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">Alex Johnson</h3>
            <p class="text-base leading-7 text-indigo-600">CEO & Founder</p>
            <p class="mt-4 text-base leading-7 text-gray-600 text-center">Visionary leader with 15+ years of industry experience.</p>
            <div class="mt-6 flex gap-x-4">
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Twitter</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </article>

          <article class="flex flex-col items-center justify-center">
            <img class="aspect-[2/3] w-full rounded-2xl object-cover" src="https://via.placeholder.com/400x600" alt="Team member">
            <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">Sarah Chen</h3>
            <p class="text-base leading-7 text-indigo-600">CTO</p>
            <p class="mt-4 text-base leading-7 text-gray-600 text-center">Technical architect with expertise in scalable systems.</p>
            <div class="mt-6 flex gap-x-4">
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">GitHub</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 12.017C20 6.484 15.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </article>

          <article class="flex flex-col items-center justify-center">
            <img class="aspect-[2/3] w-full rounded-2xl object-cover" src="https://via.placeholder.com/400x600" alt="Team member">
            <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">Michael Rodriguez</h3>
            <p class="text-base leading-7 text-indigo-600">Head of Product</p>
            <p class="mt-4 text-base leading-7 text-gray-600 text-center">Product strategist focused on user-centered design.</p>
            <div class="mt-6 flex gap-x-4">
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Dribbble</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
    `
    });
  }

  // =============================================
  // Footer Components
  // =============================================
  if (labels?.footer1) {
    editor.BlockManager.add("footer1", {
      label: "Footer - Standard",
      category: categories?.footer,
      attributes: { class: "footer1-preview" },
      content: `
    <footer class="bg-gray-900">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8 xl:col-span-1">
            <img class="h-10" src="https://via.placeholder.com/150x50" alt="Company logo">
            <p class="text-gray-300 text-base">
              Making the world a better place through technology and innovation.
            </p>
            <div class="flex space-x-6">
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">GitHub</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 12.017C20 6.484 15.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold text-gray-300 tracking-wider uppercase">Solutions</h3>
                <ul class="mt-4 space-y-4">
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Marketing</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Analytics</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Commerce</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Insights</a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                <ul class="mt-4 space-y-4">
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Pricing</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Documentation</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Guides</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">API Status</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                <ul class="mt-4 space-y-4">
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">About</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Blog</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Jobs</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Press</a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                <ul class="mt-4 space-y-4">
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Privacy</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Terms</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">Cookie Policy</a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-400 hover:text-white">GDPR</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-gray-800 pt-8">
          <p class="text-base text-gray-400 text-center">
            &copy; 2023 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    `
    });
  }

  // =============================================
  // Dashboard/UI Components
  // =============================================
  if (labels?.dashboardCard) {
    editor.BlockManager.add("dashboardCard", {
      label: "Dashboard Card",
      category: categories?.ui,
      attributes: { class: "dashboardCard-preview" },
      content: `
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                Total Revenue
              </dt>
              <dd>
                <div class="text-lg font-medium text-gray-900">
                  $45,231.89
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-4 sm:px-6">
        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
            View all<span class="sr-only"> Total Revenue stats</span>
          </a>
        </div>
      </div>
    </div>
    `
    });
  }
}

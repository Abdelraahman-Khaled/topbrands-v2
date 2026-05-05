"use client"
import { useSearchParams } from "next/navigation";


import { Suspense } from "react";
import StaggerContainer from "../components/StaggerContainer";
import StaggerItem from "../components/StaggerItem";
import AnimatedCard from "../components/AnimatedCard";
import LocalizedLink from "../components/LocalizedLink";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const categories = [
    { id: 'food-beverages', name: 'Food & Beverages', icon: 'ri-restaurant-line', color: 'bg-brand-teal', textColor: 'text-white' },
    { id: 'snacks-confectionery', name: 'Snacks & Confectionery', icon: 'ri-cake-3-line', color: 'bg-brand-coral', textColor: 'text-white' },
    { id: 'dairy-products', name: 'Dairy Products', icon: 'ri-cup-line', color: 'bg-brand-teal', textColor: 'text-white' },
    { id: 'non-food-fmcg', name: 'Non-Food FMCG', icon: 'ri-shopping-bag-3-line', color: 'bg-brand-coral', textColor: 'text-white' },
  ];

  const allProducts = [
    // Food & Beverages
    { id: 1, name: 'Premium Olive Oil', category: 'food-beverages', brand: 'PINAR', image: 'https://readdy.ai/api/search-image?query=premium%20olive%20oil%20bottle%20elegant%20packaging%20professional%20product%20photography%20clean%20white%20background%20high%20quality%20food%20product&width=400&height=400&seq=prod-food-001&orientation=squarish', description: 'Extra virgin olive oil, cold pressed' },
    { id: 2, name: 'Natural Fruit Juice', category: 'food-beverages', brand: 'Halta', image: 'https://readdy.ai/api/search-image?query=natural%20fruit%20juice%20bottle%20colorful%20packaging%20professional%20product%20photography%20clean%20white%20background%20refreshing%20beverage&width=400&height=400&seq=prod-food-002&orientation=squarish', description: '100% natural fruit juice, no added sugar' },
    { id: 3, name: 'Tomato Paste', category: 'food-beverages', brand: 'Regional Brand', image: 'https://readdy.ai/api/search-image?query=tomato%20paste%20can%20premium%20packaging%20professional%20product%20photography%20clean%20white%20background%20food%20product&width=400&height=400&seq=prod-food-003&orientation=squarish', description: 'Premium quality tomato paste' },
    { id: 4, name: 'Cooking Oil', category: 'food-beverages', brand: 'PINAR', image: 'https://readdy.ai/api/search-image?query=cooking%20oil%20bottle%20golden%20color%20professional%20product%20photography%20clean%20white%20background%20kitchen%20essential&width=400&height=400&seq=prod-food-004&orientation=squarish', description: 'Pure vegetable cooking oil' },
    { id: 5, name: 'Instant Coffee', category: 'food-beverages', brand: 'International', image: 'https://readdy.ai/api/search-image?query=instant%20coffee%20jar%20premium%20packaging%20professional%20product%20photography%20clean%20white%20background%20aromatic%20beverage&width=400&height=400&seq=prod-food-005&orientation=squarish', description: 'Premium instant coffee blend' },
    { id: 6, name: 'Green Tea', category: 'food-beverages', brand: 'Halta', image: 'https://readdy.ai/api/search-image?query=green%20tea%20box%20elegant%20packaging%20professional%20product%20photography%20clean%20white%20background%20healthy%20beverage&width=400&height=400&seq=prod-food-006&orientation=squarish', description: 'Natural green tea leaves' },

    // Snacks & Confectionery
    { id: 7, name: 'Chocolate Biscuits', category: 'snacks-confectionery', brand: 'Ülker', image: 'https://readdy.ai/api/search-image?query=chocolate%20biscuits%20package%20premium%20snack%20professional%20product%20photography%20clean%20white%20background%20delicious%20treat&width=400&height=400&seq=prod-snack-001&orientation=squarish', description: 'Crispy biscuits with chocolate coating' },
    { id: 8, name: 'Potato Chips', category: 'snacks-confectionery', brand: 'Jacker', image: 'https://readdy.ai/api/search-image?query=potato%20chips%20bag%20crispy%20snack%20professional%20product%20photography%20clean%20white%20background%20salty%20treat&width=400&height=400&seq=prod-snack-002&orientation=squarish', description: 'Crispy salted potato chips' },
    { id: 9, name: 'Wafer Rolls', category: 'snacks-confectionery', brand: 'Ülker', image: 'https://readdy.ai/api/search-image?query=wafer%20rolls%20package%20cream%20filled%20professional%20product%20photography%20clean%20white%20background%20sweet%20snack&width=400&height=400&seq=prod-snack-003&orientation=squarish', description: 'Cream-filled wafer rolls' },
    { id: 10, name: 'Mixed Nuts', category: 'snacks-confectionery', brand: 'Regional Brand', image: 'https://readdy.ai/api/search-image?query=mixed%20nuts%20package%20premium%20quality%20professional%20product%20photography%20clean%20white%20background%20healthy%20snack&width=400&height=400&seq=prod-snack-004&orientation=squarish', description: 'Premium roasted mixed nuts' },
    { id: 11, name: 'Chocolate Bar', category: 'snacks-confectionery', brand: 'Ülker', image: 'https://readdy.ai/api/search-image?query=chocolate%20bar%20premium%20packaging%20professional%20product%20photography%20clean%20white%20background%20sweet%20confectionery&width=400&height=400&seq=prod-snack-005&orientation=squarish', description: 'Rich milk chocolate bar' },
    { id: 12, name: 'Crackers', category: 'snacks-confectionery', brand: 'Jacker', image: 'https://readdy.ai/api/search-image?query=crackers%20box%20savory%20snack%20professional%20product%20photography%20clean%20white%20background%20crispy%20biscuit&width=400&height=400&seq=prod-snack-006&orientation=squarish', description: 'Savory wheat crackers' },

    // Dairy Products
    { id: 13, name: 'Fresh Milk', category: 'dairy-products', brand: 'PINAR', image: 'https://readdy.ai/api/search-image?query=fresh%20milk%20carton%20white%20packaging%20professional%20product%20photography%20clean%20white%20background%20dairy%20product&width=400&height=400&seq=prod-dairy-001&orientation=squarish', description: 'Fresh pasteurized whole milk' },
    { id: 14, name: 'Natural Yogurt', category: 'dairy-products', brand: 'PINAR', image: 'https://readdy.ai/api/search-image?query=natural%20yogurt%20cup%20white%20packaging%20professional%20product%20photography%20clean%20white%20background%20creamy%20dairy&width=400&height=400&seq=prod-dairy-002&orientation=squarish', description: 'Creamy natural yogurt' },
    { id: 15, name: 'White Cheese', category: 'dairy-products', brand: 'Regional Brand', image: 'https://readdy.ai/api/search-image?query=white%20cheese%20package%20feta%20style%20professional%20product%20photography%20clean%20white%20background%20dairy%20product&width=400&height=400&seq=prod-dairy-003&orientation=squarish', description: 'Traditional white cheese' },
    { id: 16, name: 'Butter', category: 'dairy-products', brand: 'PINAR', image: 'https://readdy.ai/api/search-image?query=butter%20block%20golden%20yellow%20professional%20product%20photography%20clean%20white%20background%20dairy%20essential&width=400&height=400&seq=prod-dairy-004&orientation=squarish', description: 'Pure creamy butter' },
    { id: 17, name: 'Cream Cheese', category: 'dairy-products', brand: 'International', image: 'https://readdy.ai/api/search-image?query=cream%20cheese%20tub%20spreadable%20professional%20product%20photography%20clean%20white%20background%20smooth%20dairy&width=400&height=400&seq=prod-dairy-005&orientation=squarish', description: 'Smooth spreadable cream cheese' },
    { id: 18, name: 'Labneh', category: 'dairy-products', brand: 'Regional Brand', image: 'https://readdy.ai/api/search-image?query=labneh%20yogurt%20cheese%20middle%20eastern%20dairy%20professional%20product%20photography%20clean%20white%20background%20traditional&width=400&height=400&seq=prod-dairy-006&orientation=squarish', description: 'Traditional strained yogurt' },

    // Non-Food FMCG
    { id: 19, name: 'Dish Soap', category: 'non-food-fmcg', brand: 'International', image: 'https://readdy.ai/api/search-image?query=dish%20soap%20bottle%20green%20liquid%20professional%20product%20photography%20clean%20white%20background%20cleaning%20product&width=400&height=400&seq=prod-nonfood-001&orientation=squarish', description: 'Powerful grease-cutting dish soap' },
    { id: 20, name: 'Laundry Detergent', category: 'non-food-fmcg', brand: 'Regional Brand', image: 'https://readdy.ai/api/search-image?query=laundry%20detergent%20box%20powder%20professional%20product%20photography%20clean%20white%20background%20cleaning%20essential&width=400&height=400&seq=prod-nonfood-002&orientation=squarish', description: 'High-efficiency laundry powder' },
    { id: 21, name: 'Hand Soap', category: 'non-food-fmcg', brand: 'International', image: 'https://readdy.ai/api/search-image?query=hand%20soap%20bottle%20liquid%20pump%20professional%20product%20photography%20clean%20white%20background%20hygiene%20product&width=400&height=400&seq=prod-nonfood-003&orientation=squarish', description: 'Antibacterial hand wash' },
    { id: 22, name: 'Tissue Paper', category: 'non-food-fmcg', brand: 'Regional Brand', image: 'https://readdy.ai/api/search-image?query=tissue%20paper%20box%20soft%20white%20professional%20product%20photography%20clean%20white%20background%20household%20essential&width=400&height=400&seq=prod-nonfood-004&orientation=squarish', description: 'Soft facial tissue paper' },
    { id: 23, name: 'Floor Cleaner', category: 'non-food-fmcg', brand: 'International', image: 'https://readdy.ai/api/search-image?query=floor%20cleaner%20bottle%20liquid%20professional%20product%20photography%20clean%20white%20background%20cleaning%20product&width=400&height=400&seq=prod-nonfood-005&orientation=squarish', description: 'Multi-surface floor cleaner' },
    { id: 24, name: 'Air Freshener', category: 'non-food-fmcg', brand: 'Regional Brand', image: 'https://readdy.ai/api/search-image?query=air%20freshener%20spray%20can%20fragrance%20professional%20product%20photography%20clean%20white%20background%20home%20care&width=400&height=400&seq=prod-nonfood-006&orientation=squarish', description: 'Long-lasting room freshener' },
  ];

  const currentCategory = categories.find(c => c.id === categoryParam);
  const filteredProducts = categoryParam
    ? allProducts.filter(p => p.category === categoryParam)
    : allProducts;

  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
  };

  return (
    <>
      {/* Hero Section with Image */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=diverse%20FMCG%20products%20display%20colorful%20packaging%20food%20beverages%20snacks%20dairy%20household%20items%20arranged%20professionally%20on%20modern%20retail%20shelves%20bright%20lighting%20organized%20presentation%20Syria%20Damascus&width=1920&height=600&seq=products-hero-main&orientation=landscape"
            alt="Our Products"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex items-center space-x-4 mb-8">
            <span className="text-sm font-semibold text-brand-coral tracking-widest uppercase">/ OUR PRODUCTS</span>
            <div className="h-px w-16 bg-brand-coral"></div>
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6">
            {currentCategory ? currentCategory.name : 'All Products'}
          </h1>
          <p className="text-2xl lg:text-3xl text-gray-200 leading-relaxed max-w-4xl font-light">
            {currentCategory
              ? `Explore our complete range of ${currentCategory.name.toLowerCase()} distributed across Syria.`
              : 'Top Brands Syria distributes a wide range of fast-moving consumer goods across food and non-food categories.'
            }
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex flex-wrap items-center gap-4">
            <LocalizedLink
              href="/products"
              className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${!categoryParam
                ? 'bg-brand-teal text-white'
                : 'bg-brand-paleblue text-brand-charcoal hover:bg-brand-teal hover:text-white'
                }`}
            >
              All Products
            </LocalizedLink>
            {categories.map((category) => (
              <LocalizedLink
                key={category.id}
                href={`/products?category=${category.id}`}
                className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-2 ${categoryParam === category.id
                  ? `${category.color} text-white`
                  : 'bg-brand-paleblue text-brand-charcoal hover:bg-brand-teal hover:text-white'
                  }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${category.icon} text-lg`}></i>
                </div>
                <span>{category.name}</span>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white" data-product-shop>
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between mb-12">
            <p className="text-lg text-brand-charcoal">
              Showing <strong className="text-brand-jet">{filteredProducts.length}</strong> products
              {currentCategory && <span> in <strong className="text-brand-jet">{currentCategory.name}</strong></span>}
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <AnimatedCard className="h-full bg-white rounded-2xl overflow-hidden border-2 border-gray-100 cursor-pointer">
                  <div className="relative w-full h-56 bg-brand-paleblue overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-brand-teal text-white text-xs font-semibold rounded-full">
                        {product.brand}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-brand-charcoal font-medium uppercase tracking-wider">
                      {getCategoryName(product.category)}
                    </span>
                    <h3 className="text-lg font-bold text-brand-jet mt-2 mb-2 group-hover:text-brand-teal transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-brand-charcoal leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-charcoal to-brand-jet">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Looking for Specific Products?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us for detailed product catalogs and availability information
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LocalizedLink
              href="/contact"
              className="inline-flex items-center space-x-3 px-10 py-4 bg-brand-coral text-white rounded-full font-semibold text-lg hover:brightness-110 transition-all shadow-xl hover:shadow-2xl whitespace-nowrap cursor-pointer"
            >
              <span>Contact Us</span>
              <i className="ri-arrow-right-line text-xl"></i>
            </LocalizedLink>
            <LocalizedLink
              href="/brands"
              className="inline-flex items-center space-x-3 px-10 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-brand-jet transition-all whitespace-nowrap cursor-pointer"
            >
              <span>View Brands</span>
              <i className="ri-arrow-right-line text-xl"></i>
            </LocalizedLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<div>Loading Products...</div>}>
        {/* <ProductsContent /> */}
      </Suspense>
    </div>
  );
}

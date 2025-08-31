export type Product = {
  id: string
  name: string
  category: string
  price: number
  imageUrl: string
}

export const products: Product[] = [
  // Shoes (6)
  { id: "shoe-1", name: "AeroRun Sneaker - Red", category: "shoes", price: 89, imageUrl: "/products/shoe-1.png" },
  { id: "shoe-2", name: "AeroRun Sneaker - Blue", category: "shoes", price: 89, imageUrl: "/products/shoe-2.png" },
  { id: "shoe-3", name: "TrailGrip Runner - Black", category: "shoes", price: 119, imageUrl: "/products/shoe-3.png" },
  { id: "shoe-4", name: "TrailGrip Runner - Olive", category: "shoes", price: 119, imageUrl: "/products/shoe-4.png" },
  { id: "shoe-5", name: "CityWalk Canvas - White", category: "shoes", price: 69, imageUrl: "/products/shoe-5.png" },
  { id: "shoe-6", name: "CityWalk Canvas - Navy", category: "shoes", price: 69, imageUrl: "/products/shoe-6.png" },

  // Backpacks (6)
  { id: "pack-1", name: "Summit Pack 20L - Black", category: "backpacks", price: 79, imageUrl: "/products/pack-1.png" },
  { id: "pack-2", name: "Summit Pack 20L - Olive", category: "backpacks", price: 79, imageUrl: "/products/pack-2.png" },
  {
    id: "pack-3",
    name: "Metro Daypack - Charcoal",
    category: "backpacks",
    price: 99,
    imageUrl: "/products/pack-3.png",
  },
  { id: "pack-4", name: "Metro Daypack - Sand", category: "backpacks", price: 99, imageUrl: "/products/pack-4.png" },
  { id: "pack-5", name: "Alpine Rucksack - Navy", category: "backpacks", price: 129, imageUrl: "/products/pack-5.png" },
  { id: "pack-6", name: "Alpine Rucksack - Rust", category: "backpacks", price: 129, imageUrl: "/products/pack-6.png" },

  // Headphones (6)
  {
    id: "head-1",
    name: "PureSound Over-Ear - Black",
    category: "headphones",
    price: 149,
    imageUrl: "/products/head-1.png",
  },
  {
    id: "head-2",
    name: "PureSound Over-Ear - Silver",
    category: "headphones",
    price: 149,
    imageUrl: "/products/head-2.png",
  },
  { id: "head-3", name: "BassX Wireless - Red", category: "headphones", price: 99, imageUrl: "/products/head-3.png" },
  { id: "head-4", name: "BassX Wireless - Blue", category: "headphones", price: 99, imageUrl: "/products/head-4.png" },
  { id: "head-5", name: "StudioPro ANC - Black", category: "headphones", price: 199, imageUrl: "/products/head-5.png" },
  { id: "head-6", name: "StudioPro ANC - White", category: "headphones", price: 199, imageUrl: "/products/head-6.png" },

  // Watches (6)
  {
    id: "watch-1",
    name: "Chrono Classic - Silver",
    category: "watches",
    price: 179,
    imageUrl: "/products/watch-1.png",
  },
  { id: "watch-2", name: "Chrono Classic - Black", category: "watches", price: 179, imageUrl: "/products/watch-2.png" },
  { id: "watch-3", name: "Field Watch - Green", category: "watches", price: 139, imageUrl: "/products/watch-3.png" },
  { id: "watch-4", name: "Field Watch - Tan", category: "watches", price: 139, imageUrl: "/products/watch-4.png" },
  { id: "watch-5", name: "Minimal Watch - White", category: "watches", price: 109, imageUrl: "/products/watch-5.png" },
  { id: "watch-6", name: "Minimal Watch - Navy", category: "watches", price: 109, imageUrl: "/products/watch-6.png" },

  // Sunglasses (6)
  { id: "sun-1", name: "Wayfarer - Black", category: "sunglasses", price: 79, imageUrl: "/products/sun-1.png" },
  { id: "sun-2", name: "Wayfarer - Tortoise", category: "sunglasses", price: 79, imageUrl: "/products/sun-2.png" },
  { id: "sun-3", name: "Aviator - Silver", category: "sunglasses", price: 99, imageUrl: "/products/sun-3.png" },
  { id: "sun-4", name: "Aviator - Gold", category: "sunglasses", price: 99, imageUrl: "/products/sun-4.png" },
  { id: "sun-5", name: "Round - Clear", category: "sunglasses", price: 69, imageUrl: "/products/sun-5.png" },
  { id: "sun-6", name: "Round - Black", category: "sunglasses", price: 69, imageUrl: "/products/sun-6.png" },

  // Jackets (6)
  { id: "jkt-1", name: "All-Weather Shell - Navy", category: "jackets", price: 159, imageUrl: "/products/jkt-1.png" },
  { id: "jkt-2", name: "All-Weather Shell - Black", category: "jackets", price: 159, imageUrl: "/products/jkt-2.png" },
  { id: "jkt-3", name: "Quilted Puffer - Olive", category: "jackets", price: 179, imageUrl: "/products/jkt-3.png" },
  { id: "jkt-4", name: "Quilted Puffer - Sand", category: "jackets", price: 179, imageUrl: "/products/jkt-4.png" },
  { id: "jkt-5", name: "Denim Trucker - Light", category: "jackets", price: 119, imageUrl: "/products/jkt-5.png" },
  { id: "jkt-6", name: "Denim Trucker - Dark", category: "jackets", price: 119, imageUrl: "/products/jkt-6.png" },

  // Chairs (6)
  { id: "chair-1", name: "Ergo Chair - Black Mesh", category: "chairs", price: 229, imageUrl: "/products/chair-1.png" },
  { id: "chair-2", name: "Ergo Chair - Gray Mesh", category: "chairs", price: 229, imageUrl: "/products/chair-2.png" },
  { id: "chair-3", name: "Lounge Chair - Walnut", category: "chairs", price: 349, imageUrl: "/products/chair-3.png" },
  { id: "chair-4", name: "Lounge Chair - Oak", category: "chairs", price: 349, imageUrl: "/products/chair-4.png" },
  { id: "chair-5", name: "Dining Chair - White", category: "chairs", price: 99, imageUrl: "/products/chair-5.png" },
  { id: "chair-6", name: "Dining Chair - Black", category: "chairs", price: 99, imageUrl: "/products/chair-6.png" },

  // Lamps (6)
  { id: "lamp-1", name: "Desk Lamp - Matte Black", category: "lamps", price: 59, imageUrl: "/products/lamp-1.png" },
  { id: "lamp-2", name: "Desk Lamp - Brass", category: "lamps", price: 69, imageUrl: "/products/lamp-2.png" },
  { id: "lamp-3", name: "Floor Lamp - White Shade", category: "lamps", price: 129, imageUrl: "/products/lamp-3.png" },
  { id: "lamp-4", name: "Floor Lamp - Linen Shade", category: "lamps", price: 129, imageUrl: "/products/lamp-4.png" },
  { id: "lamp-5", name: "Arc Lamp - Chrome", category: "lamps", price: 179, imageUrl: "/products/lamp-5.png" },
  { id: "lamp-6", name: "Arc Lamp - Black", category: "lamps", price: 179, imageUrl: "/products/lamp-6.png" },

  // Mugs (6)
  { id: "mug-1", name: "Stoneware Mug - Cream", category: "mugs", price: 19, imageUrl: "/products/mug-1.png" },
  { id: "mug-2", name: "Stoneware Mug - Charcoal", category: "mugs", price: 19, imageUrl: "/products/mug-2.png" },
  { id: "mug-3", name: "Enamel Camp Mug - Blue", category: "mugs", price: 15, imageUrl: "/products/mug-3.png" },
  { id: "mug-4", name: "Enamel Camp Mug - Green", category: "mugs", price: 15, imageUrl: "/products/mug-4.png" },
  { id: "mug-5", name: "Glass Mug - Clear", category: "mugs", price: 22, imageUrl: "/products/mug-5.png" },
  { id: "mug-6", name: "Glass Mug - Amber", category: "mugs", price: 22, imageUrl: "/products/mug-6.png" },

  // Keyboards (6)
  {
    id: "kbd-1",
    name: "Mechanical Keyboard - White",
    category: "keyboards",
    price: 129,
    imageUrl: "/products/kbd-1.png",
  },
  {
    id: "kbd-2",
    name: "Mechanical Keyboard - Black",
    category: "keyboards",
    price: 129,
    imageUrl: "/products/kbd-2.png",
  },
  {
    id: "kbd-3",
    name: "Wireless Keyboard - Silver",
    category: "keyboards",
    price: 79,
    imageUrl: "/products/kbd-3.png",
  },
  {
    id: "kbd-4",
    name: "Wireless Keyboard - Space Gray",
    category: "keyboards",
    price: 79,
    imageUrl: "/products/kbd-4.png",
  },
  { id: "kbd-5", name: "Compact Keyboard - Mint", category: "keyboards", price: 69, imageUrl: "/products/kbd-5.png" },
  {
    id: "kbd-6",
    name: "Compact Keyboard - Lavender",
    category: "keyboards",
    price: 69,
    imageUrl: "/products/kbd-6.png",
  },
]

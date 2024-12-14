import { Recipe } from '../types/recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A traditional Italian pizza with fresh basil, mozzarella, and tomatoes',
    imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    ingredients: [
      '2 cups all-purpose flour',
      '1 cup warm water',
      'Fresh mozzarella',
      'Fresh basil leaves',
      'San Marzano tomatoes'
    ],
    instructions: [
      'Prepare the pizza dough and let it rise',
      'Stretch the dough into a circle',
      'Add tomato sauce, fresh mozzarella, and basil',
      'Bake at 450°F for 12-15 minutes'
    ],
    author: 'Chef Mario',
    createdAt: '2024-03-15',
    likes: 124
  },
  {
    id: '2',
    title: 'Chocolate Chip Cookies',
    description: 'Soft and chewy cookies with melted chocolate chips',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    ingredients: [
      '2 1/4 cups flour',
      '1 cup butter',
      '3/4 cup sugar',
      '2 eggs',
      'Chocolate chips'
    ],
    instructions: [
      'Cream butter and sugars',
      'Add eggs and vanilla',
      'Mix in dry ingredients',
      'Fold in chocolate chips',
      'Bake at 375°F for 10-12 minutes'
    ],
    author: 'Baker Sarah',
    createdAt: '2024-03-14',
    likes: 89
  },
  {
    id: '3',
    title: 'Spicy Thai Green Curry',
    description: 'Authentic Thai green curry with coconut milk, vegetables, and your choice of protein',
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
    prepTime: 25,
    cookTime: 30,
    servings: 6,
    ingredients: [
      'Green curry paste',
      'Coconut milk',
      'Bamboo shoots',
      'Thai basil',
      'Fish sauce'
    ],
    instructions: [
      'Heat coconut milk in a large pot',
      'Add curry paste and stir until fragrant',
      'Add protein and vegetables',
      'Simmer until cooked through',
      'Garnish with Thai basil'
    ],
    author: 'Chef Lily',
    createdAt: '2024-03-13',
    likes: 156
  },
  {
    id: '4',
    title: 'Classic French Croissants',
    description: 'Buttery, flaky croissants made from scratch',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a',
    prepTime: 120,
    cookTime: 25,
    servings: 12,
    ingredients: [
      'All-purpose flour',
      'Active dry yeast',
      'Cold butter',
      'Milk',
      'Salt'
    ],
    instructions: [
      'Make the dough and chill',
      'Laminate with butter',
      'Shape into croissants',
      'Proof until doubled',
      'Bake until golden'
    ],
    author: 'Pastry Chef Jean',
    createdAt: '2024-03-12',
    likes: 201
  },
  {
    id: '5',
    title: 'Fresh Poke Bowl',
    description: 'Hawaiian-style raw fish bowl with rice and fresh vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    prepTime: 20,
    cookTime: 0,
    servings: 2,
    ingredients: [
      'Sushi-grade tuna',
      'Sushi rice',
      'Soy sauce',
      'Avocado',
      'Seaweed'
    ],
    instructions: [
      'Cook sushi rice',
      'Cube the fish',
      'Prepare the marinade',
      'Slice vegetables',
      'Assemble bowls'
    ],
    author: 'Chef Kai',
    createdAt: '2024-03-11',
    likes: 167
  },
  {
    id: '6',
    title: 'Homemade Pasta Carbonara',
    description: 'Classic Roman pasta dish with eggs, pecorino, and guanciale',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    ingredients: [
      'Spaghetti',
      'Guanciale',
      'Eggs',
      'Pecorino Romano',
      'Black pepper'
    ],
    instructions: [
      'Cook pasta al dente',
      'Crisp the guanciale',
      'Prepare egg mixture',
      'Combine while hot',
      'Serve immediately'
    ],
    author: 'Chef Marco',
    createdAt: '2024-03-10',
    likes: 189
  },
  {
    id: '7',
    title: 'Vegetarian Buddha Bowl',
    description: 'Nutritious bowl packed with grains, roasted vegetables, and tahini dressing',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    prepTime: 30,
    cookTime: 40,
    servings: 4,
    ingredients: [
      'Quinoa',
      'Sweet potato',
      'Chickpeas',
      'Kale',
      'Tahini'
    ],
    instructions: [
      'Cook quinoa',
      'Roast vegetables',
      'Prepare dressing',
      'Massage kale',
      'Assemble bowls'
    ],
    author: 'Chef Emma',
    createdAt: '2024-03-09',
    likes: 145
  }
];
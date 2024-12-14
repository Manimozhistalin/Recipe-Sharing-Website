import React from 'react';
import { Clock, Users, Heart, ChevronLeft } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

export function RecipeDetail({ recipe, onBack }: RecipeDetailProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ChevronLeft size={20} />
        Back to recipes
      </button>

      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
          <p className="text-gray-600">{recipe.description}</p>
        </div>

        <div className="flex items-center justify-between py-4 border-y border-gray-200">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-gray-500" />
            <span>Prep: {recipe.prepTime} min</span>
            <span>Cook: {recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-gray-500" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-rose-500" />
            <span>{recipe.likes} likes</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700">{instruction}</li>
            ))}
          </ol>
        </div>

        <div className="text-sm text-gray-500">
          <p>Posted by {recipe.author} on {new Date(recipe.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
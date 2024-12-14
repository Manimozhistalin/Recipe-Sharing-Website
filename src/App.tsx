import React, { useState } from 'react';
import { recipes } from './data/recipes';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetail } from './components/RecipeDetail';
import { RecipeForm } from './components/RecipeForm';
import { Header } from './components/layout/Header';
import { SignInForm } from './components/auth/SignInForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { useAuth } from './hooks/useAuth';
import { Recipe } from './types/recipe';

function App() {
  const { user, isAuthenticated, signIn, signUp, signOut } = useAuth();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        {showSignUp ? (
          <SignUpForm
            onSignUp={signUp}
            onSwitchToSignIn={() => setShowSignUp(false)}
          />
        ) : (
          <SignInForm
            onSignIn={signIn}
            onSwitchToSignUp={() => setShowSignUp(true)}
          />
        )}
      </div>
    );
  }

  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => setShowForm(false)}
            className="mb-6 text-gray-600 hover:text-gray-800"
          >
            ← Back to recipes
          </button>
          <RecipeForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={setSearchQuery}
        onShowForm={() => setShowForm(true)}
        user={user}
        onSignOut={signOut}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
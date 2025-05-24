import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecipes } from '../context/RecipeContext.jsx'
import { FaPlus, FaMinus } from 'react-icons/fa'
import './SubmitRecipePage.css'

const SubmitRecipePage = () => {
  const navigate = useNavigate()
  const { addRecipe } = useRecipes()
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Medium',
    ingredients: [''],
    instructions: [''],
    notes: '',
    image: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const categories = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Desserts',
    'Vegetarian'
  ]
  
  const difficultyLevels = ['Easy', 'Medium', 'Hard']
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }
  
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }))
  }
  
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions]
    newInstructions[index] = value
    
    setFormData(prev => ({
      ...prev,
      instructions: newInstructions
    }))
  }
  
  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }))
  }
  
  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = [...formData.ingredients]
      newIngredients.splice(index, 1)
      
      setFormData(prev => ({
        ...prev,
        ingredients: newIngredients
      }))
    }
  }
  
  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }))
  }
  
  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = [...formData.instructions]
      newInstructions.splice(index, 1)
      
      setFormData(prev => ({
        ...prev,
        instructions: newInstructions
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.prepTime.trim()) newErrors.prepTime = 'Prep time is required'
    if (!formData.servings.trim()) newErrors.servings = 'Number of servings is required'
    if (!formData.image.trim()) newErrors.image = 'Image URL is required'
    
    // Check if all ingredients are filled
    const emptyIngredientIndex = formData.ingredients.findIndex(ing => !ing.trim())
    if (emptyIngredientIndex !== -1) {
      newErrors.ingredients = `Ingredient #${emptyIngredientIndex + 1} cannot be empty`
    }
    
    // Check if all instructions are filled
    const emptyInstructionIndex = formData.instructions.findIndex(inst => !inst.trim())
    if (emptyInstructionIndex !== -1) {
      newErrors.instructions = `Instruction #${emptyInstructionIndex + 1} cannot be empty`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      try {
        // Filter out any empty ingredients or instructions
        const cleanedData = {
          ...formData,
          ingredients: formData.ingredients.filter(ing => ing.trim()),
          instructions: formData.instructions.filter(inst => inst.trim())
        }
        
        // Add recipe to context
        await addRecipe(cleanedData)
        
        setSubmitSuccess(true)
        
        // Reset form after successful submission
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } catch (error) {
        console.error('Error submitting recipe:', error)
        setErrors({ submit: 'Failed to submit recipe. Please try again.' })
      } finally {
        setIsSubmitting(false)
      }
    }
  }
  
  if (submitSuccess) {
    return (
      <div className="submit-success">
        <div className="container">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h2>Recipe Submitted Successfully!</h2>
            <p>Thank you for sharing your recipe with our community.</p>
            <p>Redirecting to homepage...</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="submit-recipe-page">
      <div className="container">
        <div className="submit-header">
          <h1 className="submit-title">Share Your Recipe</h1>
          <p className="submit-description">
            Share your favorite recipe with our community. Fill out the form below with all the details.
          </p>
        </div>
        
        <div className="submit-content">
          <form className="recipe-form" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="form-error">{errors.submit}</div>
            )}
            
            <div className="form-section">
              <h2 className="form-section-title">Basic Information</h2>
              
              <div className="form-group">
                <label htmlFor="title" className="form-label">Recipe Title*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`form-input ${errors.title ? 'error' : ''}`}
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Chocolate Chip Cookies"
                />
                {errors.title && <div className="error-message">{errors.title}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category" className="form-label">Category*</label>
                  <select
                    id="category"
                    name="category"
                    className={`form-select ${errors.category ? 'error' : ''}`}
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <div className="error-message">{errors.category}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="difficulty" className="form-label">Difficulty</label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    className="form-select"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >
                    {difficultyLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description*</label>
                <textarea
                  id="description"
                  name="description"
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly describe your recipe"
                  rows="3"
                ></textarea>
                {errors.description && <div className="error-message">{errors.description}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="prepTime" className="form-label">Prep Time*</label>
                  <input
                    type="text"
                    id="prepTime"
                    name="prepTime"
                    className={`form-input ${errors.prepTime ? 'error' : ''}`}
                    value={formData.prepTime}
                    onChange={handleChange}
                    placeholder="e.g., 15 minutes"
                  />
                  {errors.prepTime && <div className="error-message">{errors.prepTime}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="cookTime" className="form-label">Cook Time</label>
                  <input
                    type="text"
                    id="cookTime"
                    name="cookTime"
                    className="form-input"
                    value={formData.cookTime}
                    onChange={handleChange}
                    placeholder="e.g., 30 minutes"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="servings" className="form-label">Servings*</label>
                  <input
                    type="text"
                    id="servings"
                    name="servings"
                    className={`form-input ${errors.servings ? 'error' : ''}`}
                    value={formData.servings}
                    onChange={handleChange}
                    placeholder="e.g., 4"
                  />
                  {errors.servings && <div className="error-message">{errors.servings}</div>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="image" className="form-label">Image URL*</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className={`form-input ${errors.image ? 'error' : ''}`}
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter a URL for your recipe image"
                />
                {errors.image && <div className="error-message">{errors.image}</div>}
                <div className="form-help">
                  Provide a link to an image of your recipe. For best results, use a landscape-oriented image.
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h2 className="form-section-title">Ingredients</h2>
              {errors.ingredients && <div className="error-message">{errors.ingredients}</div>}
              
              <div className="ingredients-list">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-row">
                    <input
                      type="text"
                      className="form-input"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder={`Ingredient #${index + 1}`}
                    />
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeIngredient(index)}
                      disabled={formData.ingredients.length <= 1}
                    >
                      <FaMinus />
                    </button>
                  </div>
                ))}
              </div>
              
              <button type="button" className="add-btn" onClick={addIngredient}>
                <FaPlus /> Add Ingredient
              </button>
            </div>
            
            <div className="form-section">
              <h2 className="form-section-title">Instructions</h2>
              {errors.instructions && <div className="error-message">{errors.instructions}</div>}
              
              <div className="instructions-list">
                {formData.instructions.map((instruction, index) => (
                  <div key={index} className="instruction-row">
                    <div className="instruction-number">{index + 1}</div>
                    <textarea
                      className="form-textarea"
                      value={instruction}
                      onChange={(e) => handleInstructionChange(index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                      rows="2"
                    ></textarea>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeInstruction(index)}
                      disabled={formData.instructions.length <= 1}
                    >
                      <FaMinus />
                    </button>
                  </div>
                ))}
              </div>
              
              <button type="button" className="add-btn" onClick={addInstruction}>
                <FaPlus /> Add Step
              </button>
            </div>
            
            <div className="form-section">
              <h2 className="form-section-title">Additional Notes</h2>
              
              <div className="form-group">
                <textarea
                  id="notes"
                  name="notes"
                  className="form-textarea"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional tips, variations, or storage instructions"
                  rows="4"
                ></textarea>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubmitRecipePage
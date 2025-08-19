<template>
  <div class="family-recipes">
    <h2>Our Family Recipes</h2>
    <div class="recipe-list">
      <RecipePreview
        v-for="recipe in familyRecipes"
        :key="recipe.recipe_id"
        :recipe="recipe"
        sourceType="family"
      />
    </div>
  </div>
</template>

<script>
import RecipePreview from '../components/RecipePreview.vue';
import AbaShakshuka from '@/assets/AbaShakshuka.jpg';
export default {
  name: "FamilyRecipesPage",
  components: { RecipePreview },
  data() {
    return {
      familyRecipes: [
        {
          recipe_id: 2222,
          name: 'Israeli Shakshuka',
          picture: AbaShakshuka,
          timeToMake: 45,
          popularity: 0,
          dietCategory: 'Vegetarian',
          isGlutenFree: 1,
          created_by: 1,
          description: 'This a recipe that my father enjoy cooking for the family. It is a traditional Israeli dish made with poached eggs in a spicy tomato sauce.',
          ingredients: [
            '1 large onion',
            '4 tomatoes',
            '1 capsicum',
            '2 cloves garlic',
            '4 eggs',
            '1 spoon paprika',
            '1 can of tomato paste',
            'Dashes - pepper',
            'Dashes – salt'
          ],
          cuisine: 'Middle Eastern',
          dishes: 2,
          analyzedInstructions: [
            { name: '', steps: [
              { step: 'Slice the eggplants and tomatoes.', number: 1, equipment: [], ingredients: [] },
              { step: 'Mix bread crumbs and cheese.', number: 2, equipment: [], ingredients: [] }
            ]}
          ]
        },
        {
          recipe_id: 1750517500886,
          name: 'Eggplant Parmesan',
          picture: 'https://img.spoonacular.com/recipes/715497-556x370.jpg',
          timeToMake: 60,
          popularity: 2,
          dietCategory: 'vegetarian',
          isGlutenFree: 1,
          created_by: 2,
          description: 'Classic Italian Eggplant Parmesan, baked to perfection. Rich in flavor and easy to make.',
          ingredients: [
            '2 large eggplants',
            '1 cup marinara sauce',
            '2 cups mozzarella cheese',
            '1/2 cup parmesan cheese',
            '1 cup gluten-free breadcrumbs',
            '2 eggs',
            'Salt and pepper to taste'
          ],
          cuisine: 'Italian',
          dishes: 2,
          analyzedInstructions: [
            { name: '', steps: [
              { step: 'Slice and salt the eggplants.', number: 1, equipment: [], ingredients: [] },
              { step: 'Layer with sauce and cheese.', number: 2, equipment: [], ingredients: [] }
            ]}
          ]
        },
        {
          recipe_id: 1750517500887,
          name: 'Vegan Lentil Soup',
          picture: 'https://img.spoonacular.com/recipes/716426-556x370.jpg',
          timeToMake: 40,
          popularity: 3,
          dietCategory: 'vegan',
          isGlutenFree: 1,
          created_by: 1,
          description: 'A hearty vegan lentil soup packed with vegetables and flavor.',
          ingredients: [
            '1 cup lentils',
            '2 carrots, diced',
            '2 celery stalks, diced',
            '1 onion, chopped',
            '2 cloves garlic, minced',
            '4 cups vegetable broth',
            '1 tsp cumin',
            'Salt and pepper to taste'
          ],
          cuisine: 'Middle Eastern',
          dishes: 6,
          analyzedInstructions: [
            { name: '', steps: [
              { step: 'Sauté vegetables.', number: 1, equipment: [], ingredients: [] },
              { step: 'Add lentils and broth.', number: 2, equipment: [], ingredients: [] }
            ]}
          ]
        },
        {
          recipe_id: 1750517500888,
          name: 'Chicken Shawarma',
          picture: 'https://img.spoonacular.com/recipes/715594-556x370.jpg',
          timeToMake: 50,
          popularity: 4,
          dietCategory: 'none',
          isGlutenFree: 0,
          created_by: 2,
          description: 'Delicious homemade chicken shawarma with authentic spices.',
          ingredients: [
            '500g chicken breast',
            '2 tbsp shawarma spice mix',
            '1/2 cup yogurt',
            '2 tbsp olive oil',
            '1 onion, sliced',
            'Salt and pepper to taste',
            'Pita bread for serving'
          ],
          cuisine: 'Middle Eastern',
          dishes: 4,
          analyzedInstructions: [
            { name: '', steps: [
              { step: 'Marinate chicken.', number: 1, equipment: [], ingredients: [] },
              { step: 'Grill and slice.', number: 2, equipment: [], ingredients: [] }
            ]}
          ]
        }
      ]
    };
  },
  created() {
    sessionStorage.setItem('familyRecipes', JSON.stringify(this.familyRecipes));
  }
};
</script>
<style scoped>
  .family-recipes {
    padding: 2rem;
  }
  .recipe-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
</style>

<style scoped>
</style>

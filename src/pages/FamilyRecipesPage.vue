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

export default {
  name: "FamilyRecipesPage",
  components: { RecipePreview },
  data() {
    return {
      familyRecipes: [
        {
          recipe_id: 1750517500885,
          name: 'Tomato Cutlets',
          picture: 'https://img.spoonacular.com/recipes/663588-556x370.jpg',
          timeToMake: 45,
          popularity: 1,
          dietCategory: 'none',
          isGlutenFree: 0,
          created_by: 1,
          description: 'You can never have too many side dish recipes, so give Tomato Cutlets a try. This recipe serves 5. One portion of this dish contains about <b>15g of protein</b>, <b>17g of fat</b>, and a total of <b>305 calories</b>. For <b>$2.98 per serving</b>, this recipe <b>covers 25%</b> of your daily requirements of vitamins and minerals. This recipe from Foodista requires salt, juice of lemon, olive oil, and eggs. 19 people were glad they tried this recipe. From preparation to the plate, this recipe takes about <b>45 minutes</b>. Overall, this recipe earns an <b>excellent spoonacular score of 88%</b>. <a href="https://spoonacular.com/recipes/chicken-cutlets-with-tomato-saut-27288">Chicken Cutlets with Tomato Sauté</a>, <a href="https://spoonacular.com/recipes/turkey-cutlets-with-tomato-sauce-411770">Turkey Cutlets with Tomato Sauce</a>, and <a href="https://spoonacular.com/recipes/tomato-and-garlic-stuffed-chicken-cutlets-84694">Tomato-and-Garlic-Stuffed Chicken Cutlets</a> are very similar to this recipe.',
          ingredients: [
            '6-7 baby eggplant - halved',
            '3 beefsteak tomatoes – sliced about ¼ inch thick',
            '1 cup - Italian style bread crumbs',
            '2 eggs beaten with 1 tablespoon milk',
            'Juice of ½ lemon',
            '2-3 tablespoons of olive oil',
            '½ cup Fresh Italian parsley – chopped',
            'Dashes - pepper',
            'Fresh grated Romano cheese',
            'Dashes – salt'
          ],
          cuisine: 'Middle Eastern',
          dishes: 4,
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

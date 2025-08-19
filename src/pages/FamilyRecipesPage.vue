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
import AbaShakshuka from '@/assets/Aba_Shakshuka.jpg';
import KoreanChicken from '@/assets/Korean_Chicken.jpeg';
import Kimchi from '@/assets/kimchi.jpeg';
import dakgalbi from '@/assets/dakgalbi.jpg';

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
              { step: 'Heat oil in a large pan. Sauté onion and capsicum until soft.', number: 1, equipment: [], ingredients: [] },
              { step: 'Add garlic, paprika, and tomato paste. Cook for 1 minute.', number: 2, equipment: [], ingredients: [] },
              { step: 'Add tomatoes and seasonings. Simmer for 15 minutes.', number: 3, equipment: [], ingredients: [] },
              { step: 'Make wells in the sauce and crack eggs into them. Cover and cook until eggs are set.', number: 4, equipment: [], ingredients: [] }
            ]}
          ]
        },
        {
          recipe_id: 1111,
          name: 'Korean Chicken',
          picture: KoreanChicken,
          timeToMake: 75,
          popularity: 2,
          dietCategory: 'None',
          isGlutenFree: 0,
          created_by: 2,
          description: "This dish made by Aviv's wife Bomi, is a delicious Korean-style chicken with a sweet and spicy glaze.",
          ingredients: [
            '1 kg chicken wings or drumettes',
            '3 tbsp soy sauce',
            '2 tbsp gochujang (Korean chili paste)',
            '2 tbsp honey',
            '1 tbsp sesame oil',
            '3 cloves garlic, minced',
            '1 inch ginger, grated',
            '2 green onions, chopped',
            '1 tbsp rice vinegar',
            '1 tsp sesame seeds',
            '1/2 tsp black pepper',
            '2 tbsp vegetable oil for frying'
          ],
          cuisine: 'Korean',
          dishes: 2,
          analyzedInstructions: [
            { name: '', steps: [
              { step: 'Clean and pat dry the chicken wings. Cut into smaller pieces if desired.', number: 1, equipment: [], ingredients: [] },
              { step: 'In a bowl, mix soy sauce, gochujang, honey, sesame oil, minced garlic, and grated ginger to make marinade.', number: 2, equipment: [], ingredients: [] },
              { step: 'Marinate chicken with half the sauce mixture for at least 30 minutes in refrigerator.', number: 3, equipment: [], ingredients: [] },
              { step: 'Heat vegetable oil in a large pan or wok over medium-high heat.', number: 4, equipment: [], ingredients: [] },
              { step: 'Cook marinated chicken pieces until golden brown and crispy, about 15-20 minutes, turning occasionally.', number: 5, equipment: [], ingredients: [] },
              { step: 'Add rice vinegar and remaining marinade, toss to coat and cook for 2-3 minutes until sticky.', number: 6, equipment: [], ingredients: [] },
              { step: 'Garnish with chopped green onions and sesame seeds before serving.', number: 7, equipment: [], ingredients: [] }
            ]}
          ]
        },
        {
          recipe_id: 4444,
          name: 'Korean Dakgalbi',
          picture: dakgalbi,
          timeToMake: 40,
          popularity: 20,
          dietCategory: 'None',
          isGlutenFree: 1,
          created_by: 1,
          description: 'Dakgalbi is a popular Korean dish made with stir-fried chicken, vegetables, and spicy sauce. It is often cooked on a hot plate at the table.',
          ingredients: [
            '500g boneless chicken thighs, cut into bite-sized pieces',
            '2 cups cabbage, chopped',
            '1 cup sweet potato, sliced thinly',
            '1 cup rice cakes (tteokbokki)',
            '1 onion, sliced',
            '2 green onions, chopped',
            '2 tbsp gochujang (Korean chili paste)',
            '1 tbsp gochugaru (Korean red pepper flakes)',
            '2 tbsp soy sauce',
            '1 tbsp sesame oil',
            '1 tbsp sugar',
            '2 cloves garlic, minced',
            'Salt and pepper to taste'
          ],
          cuisine: 'Korean',
          dishes: 4,
          analyzedInstructions: [
            { name: '', steps: [
              { step: 'In a large bowl, mix gochujang, gochugaru, soy sauce, sesame oil, sugar, minced garlic, salt, and pepper to make the marinade.', number: 1, equipment: [], ingredients: [] },
              { step: 'Add chicken pieces to the marinade and let it sit for at least 15 minutes.', number: 2, equipment: [], ingredients: [] },
              { step: 'Heat a large skillet or hot plate over medium-high heat. Add the marinated chicken and cook until browned.', number: 3, equipment: [], ingredients: [] },
              { step: 'Add cabbage, sweet potato, onion, and rice cakes to the skillet. Stir-fry until vegetables are tender and chicken is cooked through.', number: 4, equipment: [], ingredients: [] },
              { step: 'Garnish with chopped green onions before serving. Enjoy with lettuce wraps or rice.', number: 5, equipment: [], ingredients: [] }
            ]}
          ]
        },
        {
          recipe_id: 3333,
          name: 'Kimchi',
          picture: Kimchi,
          timeToMake: 120,
          popularity: 1,
          dietCategory: 'Vegetarian',
          isGlutenFree: 1,
          created_by: 2,
          description: 'Delicious homemade korean kimchi, a staple side dish made with fermented vegetables.',
          ingredients: [
            '1 large napa cabbage (about 2 lbs)',
            '1/4 cup sea salt',
            '1 tbsp grated fresh ginger',
            '5 cloves garlic, minced',
            '1 tsp sugar',
            '3 tbsp fish sauce (or soy sauce for vegetarian)',
            '1-3 tbsp Korean red pepper flakes (gochugaru)',
            '4 scallions, chopped',
            '1 daikon radish, julienned (optional)',
            '1 carrot, julienned (optional)'
          ],

          cuisine: 'Korean',
          dishes: 10,
           analyzedInstructions: [
            { name: '', steps: [
              { step: 'Cut cabbage into 2-inch pieces and salt generously. Let sit for 2 hours.', number: 1, equipment: [], ingredients: [] },
              { step: 'Rinse cabbage thoroughly and drain well.', number: 2, equipment: [], ingredients: [] },
              { step: 'Mix ginger, garlic, sugar, fish sauce, and red pepper flakes to make paste.', number: 3, equipment: [], ingredients: [] },
              { step: 'Combine cabbage with paste and vegetables. Mix well.', number: 4, equipment: [], ingredients: [] },
              { step: 'Pack into clean jar, leaving 1 inch headspace. Ferment at room temperature for 3-5 days.', number: 5, equipment: [], ingredients: [] }
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
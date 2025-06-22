<template>
  <div class="container">
    <h3>{{ title }}</h3>
    <div v-if="recipes.length === 0" class="text-center text-muted">
      No recipes to show.
    </div>

    <div class="row">
      <div class="col" v-for="r in recipes" :key="r.recipe_id">
        <RecipePreview class="recipePreview"  :sourceType="this.type" :recipe="r" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
       type: String, 
       default: "random"
    }
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
methods: {
  async updateRecipes() {
    if (this.type === "lastViewed") {
          try {
        
            const response = await this.axios.get("http://localhost:3000/users/lastViews", { withCredentials: true });
            this.recipes = Array.isArray(response.data) ? response.data : (response.data.recipes || []);
          } catch (error) {
            console.log(error);
            this.recipes = [];
          }
          console.log("Last viewed recipes:", this.recipes);
          // Update the store with the last viewed recipes
          this.$root.store.lastViewedRecipes = [...this.recipes];
        }
    else if (this.type === "random") {

      //הקוד המקורי- כאשר יש נקודות בspoonacular//

    // try {
    //   const response = await this.axios.get(
    //     this.$root.store.server_domain + "/recipes/random"
    //   );
    //   console.log("API response:", response.data);
    //   const recipes = response.data;
    //   this.recipes = [];
    //   this.recipes.push(...recipes);
    // } catch (error) {
    //   console.log(error);
    // }


    //when there are no points in spoonacular, we use the following code://
    this.recipes = [
       {
        recipe_id: 655212,
        name: "Peanut Butter and Apple Oatmeal Breakfast Bars",
        picture: "https://img.spoonacular.com/recipes/655212-556x370.jpg",
        timeToMake: "45 minutes",
        popularity: 15,
        dietCategory: "vegetarian",
        isGlutenFree: false,
        created_by: null,
        description:
          "If you want to add more <b>gluten free, dairy free, paleolithic, and primal</b> recipes to your recipe box, Marinated Boquerones might be a recipe you should try. For <b>$3.76 per serving</b>, you get a main course that serves 6. One serving contains <b>352 calories</b>, <b>34g of protein</b>, and <b>22g of fat</b>. A mixture of thyme, olive oil extra vergine, coarse sea salt, and a handful of other ingredients are all it takes to make this recipe so flavorful. 6 people were glad they tried this recipe. It is brought to you by Delicious Days. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 87%</b>, which is tremendous. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/asian-marinated-chicken-thighs-632848\">Asian Marinated Chicken Thighs</a>, <a href=\"https://spoonacular.com/recipes/asian-marinated-eggplant-632849\">Asian Marinated Eggplant</a>, and <a href=\"https://spoonacular.com/recipes/balsamic-marinated-lamb-chops-633932\">Balsamic Marinated Lamb Chops</a>.",
        ingredients: [
          "2 cups Quaker oats",
          "1/4 cup smooth peanut butter",
          "1 tbsp butter",
          "2 tbsp vegetable oil",
          "1 cup whole wheat flour",
          "2 tbsp honey",
          "1/3 cup brown sugar",
          "1 tbsp vanilla extract",
          "1 tbsp cinnamon",
          "1 apple, peeled and diced"
        ],
        cuisine: "unknown",
        dishes: "unknown",
        isWatched: false,
        isFavorite: false
      },
      {
        recipe_id: 664726,
        name: "Vegetarian Tostadas With Spicy Black Beans (+gluten free)",
        picture: "https://img.spoonacular.com/recipes/664726-556x370.jpg",
        timeToMake: "45 minutes",
        popularity: 3,
        dietCategory: "vegetarian",
        isGlutenFree: true,
        created_by: null,
        description:
          "If you want to add more <b>gluten free and lacto ovo vegetarian</b> recipes to your recipe box...",
        ingredients: [
          "4 White or Yellow Corn Tortillas",
          "1 15oz can of Black Beans (drained)",
          "1/4 cup onions diced",
          "1 clove Garlic minced",
          "1/2 tablespoon Olive Oil",
          "1-3 Chiles in Adobo Sauce (diced)",
          "1 1/2 cup Spinach (sliced julienne style)",
          "Spinkle of dried basil and garlic sea salt (for black beans)",
          "8 Cherry Tomatoes (halved)",
          "Feta Cheese",
          "Sour Cream",
          "your favorite salsa"
        ],
        cuisine: "Mexican",
        dishes: "unknown",
        isWatched: false,
        isFavorite: false
      },
      {
        recipe_id: 716411,
        name: "Snickerdoodle Ice Cream",
        picture: "https://img.spoonacular.com/recipes/716411-556x370.jpg",
        timeToMake: "45 minutes",
        popularity: 215,
        dietCategory: "vegetarian",
        isGlutenFree: true,
        created_by: null,
        description:
          "Snickerdoodle Ice Cream might be a good recipe to expand your dessert repertoire...",
        ingredients: [
          "1/2 teaspoon ground cinnamon",
          "1/8 teaspoon ground nutmeg",
          "1 1/2 cups half-and-half",
          "2 cups heavy whipping cream",
          "1/3 cup packed light brown sugar",
          "2 teaspoons vanilla extract",
          "1/3 cup vanilla sugar (can substitute plain sugar)"
        ],
        cuisine: "unknown",
        dishes: "unknown",
        isWatched: false,
        isFavorite: false
      },
    ];
        this.$root.store.randomRecipes = [...this.recipes];
    }

  },
}
};
</script>

<style scoped>
.container {
  min-height: 400px;
}
</style>

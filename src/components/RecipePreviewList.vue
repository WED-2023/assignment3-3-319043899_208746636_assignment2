<template>
  <div class="container">
    <h3>{{ title }}</h3>
    <div v-if="type === 'lastViewed' && !isLoggedIn">
      <LoginPage />
    </div>
    <div v-else>
      <div v-if="recipes.length === 0" class="text-center text-muted">
        No recipes to show.
      </div>

      <div class="row">
        <div class="col" v-for="r in recipes" :key="r.recipe_id">
          <RecipePreview class="recipePreview" :sourceType="type" :recipe="r" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import LoginPage from "../pages/LoginPage.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
    LoginPage,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "random",
    },
  },
  data() {
    return {
      recipes: [],
    };
  },
  computed: {
    isLoggedIn() {
      console.log("Checking login status:", this.$root.store.username);
      // Adjust according to your store logic
      return this.$root.store.username;
    },
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      if (this.type === "lastViewed") {
        if (!this.isLoggedIn) {
          this.recipes = [];
          return;
        }
        try {
          const response = await this.axios.get("http://localhost:3000/users/lastViews", { withCredentials: true });

          this.recipes = Array.isArray(response.data) ? response.data : (response.data.recipes || []);

        } catch (error) {
          console.log(error);
          this.recipes = [];
        }
        this.$root.store.lastViewedRecipes = [...this.recipes];
      } else if (this.type === "random") {
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
        "recipe_id": 657968,
        "name": "Raw Carrot Cake",
        "picture": "https://img.spoonacular.com/recipes/657968-556x370.jpg",
        "timeToMake": "45 minutes",
        "popularity": 2,
        "dietCategory": "vegan",
        "isGlutenFree": true,
        "created_by": null,
        "description": "Raw Carrot Cake requires roughly <b>45 minutes</b> from start to finish. This recipe serves 6. For <b>$1.62 per serving</b>, this recipe <b>covers 13%</b> of your daily requirements of vitamins and minerals. Watching your figure? This gluten free, dairy free, lacto ovo vegetarian, and whole 30 recipe has <b>483 calories</b>, <b>10g of protein</b>, and <b>28g of fat</b> per serving. It is brought to you by Foodista. This recipe is liked by 2 foodies and cooks. <b>Easter</b> will be even more special with this recipe. Head to the store and pick up cinnamon powder, raisins, almond flour, and a few other things to make it today. All things considered, we decided this recipe <b>deserves a spoonacular score of 51%</b>. This score is solid. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/carrot-cake-raw-buckwheat-porridge-gluten-free-raw-61611\">Carrot Cake Raw Buckwheat Porridge (gluten-free & Raw)</a>, <a href=\"https://spoonacular.com/recipes/raw-carrot-cake-1235149\">Raw Carrot Cake</a>, and <a href=\"https://spoonacular.com/recipes/raw-carrot-cake-muffins-205018\">Raw Carrot Cake \"Muffins\"</a>.",
        "ingredients": [
            "4 Carrots, finely grated",
            "1 cup Raisins, soaked",
            "1/4 cup Dried apricots, chopped",
            "1/2 cup Mixed peel",
            "1/2 cup Date purée (Make the date purée by grinding 1c soft dates a<",
            "2 cups Almond flour",
            "1 cup Desiccated coconut",
            "1 teaspoon Ginger powder",
            "1 teaspoon Cinnamon powder",
            "5 cloves"
        ],
        "cuisine": "unknown",
        "dishes": "unknown",
        "analyzedInstructions": [
            {
                "name": "",
                "steps": [
                    {
                        "number": 1,
                        "step": "Pulse carrots, raisins, date paste & spices in a blender.",
                        "ingredients": [
                            {
                                "id": 0,
                                "name": "date paste",
                                "localizedName": "date paste",
                                "image": ""
                            },
                            {
                                "id": 11124,
                                "name": "carrot",
                                "localizedName": "carrot",
                                "image": "sliced-carrot.png"
                            },
                            {
                                "id": 9299,
                                "name": "raisins",
                                "localizedName": "raisins",
                                "image": "https://spoonacular.com/cdn/ingredients_100x100/raisins.jpg"
                            },
                            {
                                "id": 2035,
                                "name": "spices",
                                "localizedName": "spices",
                                "image": "spices.png"
                            }
                        ],
                        "equipment": [
                            {
                                "id": 404726,
                                "name": "blender",
                                "localizedName": "blender",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/blender.png"
                            }
                        ]
                    },
                    {
                        "number": 2,
                        "step": "Drop in the chopped apricots, and mixed peel and pulse a couple of times.",
                        "ingredients": [
                            {
                                "id": 9426,
                                "name": "candied orange peel",
                                "localizedName": "candied orange peel",
                                "image": "candied-orange.png"
                            },
                            {
                                "id": 9021,
                                "name": "apricot",
                                "localizedName": "apricot",
                                "image": "apricot.jpg"
                            }
                        ],
                        "equipment": []
                    },
                    {
                        "number": 3,
                        "step": "Remove the mixture into a large bowl, along with the almond flour and desiccated coconut.",
                        "ingredients": [
                            {
                                "id": 12108,
                                "name": "desiccated coconut",
                                "localizedName": "desiccated coconut",
                                "image": "shredded-coconut.jpg"
                            },
                            {
                                "id": 10093740,
                                "name": "almond flour",
                                "localizedName": "almond flour",
                                "image": "almond-meal-or-almond-flour.jpg"
                            }
                        ],
                        "equipment": [
                            {
                                "id": 404783,
                                "name": "bowl",
                                "localizedName": "bowl",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg"
                            }
                        ]
                    },
                    {
                        "number": 4,
                        "step": "Mix well, press into place in a large cake pan, and refrigerate uncovered till it sets.",
                        "ingredients": [],
                        "equipment": [
                            {
                                "id": 404747,
                                "name": "cake form",
                                "localizedName": "cake form",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/cake-pan.png"
                            }
                        ]
                    },
                    {
                        "number": 5,
                        "step": "Cut into bite sized squares, frost it with whipped cream or roll them into balls and dust with desiccated coconut.",
                        "ingredients": [
                            {
                                "id": 12108,
                                "name": "desiccated coconut",
                                "localizedName": "desiccated coconut",
                                "image": "shredded-coconut.jpg"
                            },
                            {
                                "id": 1054,
                                "name": "whipped cream",
                                "localizedName": "whipped cream",
                                "image": "whipped-cream.jpg"
                            },
                            {
                                "id": 0,
                                "name": "roll",
                                "localizedName": "roll",
                                "image": "dinner-yeast-rolls.jpg"
                            }
                        ],
                        "equipment": []
                    }
                ]
            }
        ],
        "isWatched": false,
        "isFavorite": false
    },
    {
        "recipe_id": 642821,
        "name": "Figure Friendly Mushroom and Bacon Strata",
        "picture": "https://img.spoonacular.com/recipes/642821-556x370.jpg",
        "timeToMake": "45 minutes",
        "popularity": 3,
        "dietCategory": "none",
        "isGlutenFree": false,
        "created_by": null,
        "description": "Figure Friendly Mushroom and Bacon Strata might be a good recipe to expand your main course recipe box. This recipe serves 4. For <b>$1.5 per serving</b>, this recipe <b>covers 28%</b> of your daily requirements of vitamins and minerals. One serving contains <b>519 calories</b>, <b>29g of protein</b>, and <b>17g of fat</b>. It is brought to you by Foodista. 3 people have made this recipe and would make it again. From preparation to the plate, this recipe takes around <b>45 minutes</b>. A mixture of eggs, bacon bits, olive oil, and a handful of other ingredients are all it takes to make this recipe so yummy. With a spoonacular <b>score of 45%</b>, this dish is solid. <a href=\"https://spoonacular.com/recipes/figure-friendly-strawberry-cheesecake-555133\">Figure Friendly Strawberry Cheesecake</a>, <a href=\"https://spoonacular.com/recipes/mushroom-bacon-and-swiss-strata-495650\">Mushroom, Bacon, and Swiss Strata</a>, and <a href=\"https://spoonacular.com/recipes/mushroom-bacon-breakfast-strata-428459\">Mushroom Bacon Breakfast Strata</a> are very similar to this recipe.",
        "ingredients": [
            "4 large eggs",
            "4 large egg whites",
            "1/2 cup low fat milk",
            "2 cups bread , stale and cubed",
            "1/4 cup onion, minced",
            "1/4 cup red bell (capsicum) peppers, minced",
            "1/4 cup yellow bell pepper, minced",
            "1 cup mushroom , sliced",
            "2 tablespoons basil, chopped",
            "2 tablespoons bacon bits, use real bacon bits",
            "1 teaspoon olive oil",
            "1/2 cup cheese, shredde"
        ],
        "cuisine": "unknown",
        "dishes": "unknown",
        "analyzedInstructions": [
            {
                "name": "",
                "steps": [
                    {
                        "number": 1,
                        "step": "Heat non-stick skillet over medium heat.",
                        "ingredients": [],
                        "equipment": [
                            {
                                "id": 404645,
                                "name": "frying pan",
                                "localizedName": "frying pan",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/pan.png"
                            }
                        ]
                    },
                    {
                        "number": 2,
                        "step": "Add oil and saute onion and peppers for 5 minutes to soften.",
                        "ingredients": [
                            {
                                "id": 10111333,
                                "name": "peppers",
                                "localizedName": "peppers",
                                "image": "green-pepper.jpg"
                            },
                            {
                                "id": 11282,
                                "name": "onion",
                                "localizedName": "onion",
                                "image": "brown-onion.png"
                            },
                            {
                                "id": 4582,
                                "name": "cooking oil",
                                "localizedName": "cooking oil",
                                "image": "vegetable-oil.jpg"
                            }
                        ],
                        "equipment": [],
                        "length": {
                            "number": 5,
                            "unit": "minutes"
                        }
                    },
                    {
                        "number": 3,
                        "step": "Add mushrooms and saute another 5 minutes.",
                        "ingredients": [
                            {
                                "id": 11260,
                                "name": "mushrooms",
                                "localizedName": "mushrooms",
                                "image": "https://spoonacular.com/cdn/ingredients_100x100/mushrooms.png"
                            }
                        ],
                        "equipment": [],
                        "length": {
                            "number": 5,
                            "unit": "minutes"
                        }
                    },
                    {
                        "number": 4,
                        "step": "Spray baking dish with cooking spray and add bread cubes. Top with mushroom mixture, basil, and salt and pepper to your taste.",
                        "ingredients": [
                            {
                                "id": 1102047,
                                "name": "salt and pepper",
                                "localizedName": "salt and pepper",
                                "image": "salt-and-pepper.jpg"
                            },
                            {
                                "id": 4679,
                                "name": "cooking spray",
                                "localizedName": "cooking spray",
                                "image": "cooking-spray.png"
                            },
                            {
                                "id": 10018064,
                                "name": "bread cubes",
                                "localizedName": "bread cubes",
                                "image": "croutons.png"
                            },
                            {
                                "id": 11260,
                                "name": "mushrooms",
                                "localizedName": "mushrooms",
                                "image": "https://spoonacular.com/cdn/ingredients_100x100/mushrooms.png"
                            },
                            {
                                "id": 2044,
                                "name": "basil",
                                "localizedName": "basil",
                                "image": "basil.jpg"
                            }
                        ],
                        "equipment": [
                            {
                                "id": 404646,
                                "name": "baking pan",
                                "localizedName": "baking pan",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/roasting-pan.jpg"
                            }
                        ]
                    },
                    {
                        "number": 5,
                        "step": "Sprinkle with bacon bits and cheese.",
                        "ingredients": [
                            {
                                "id": 43212,
                                "name": "bacon bits",
                                "localizedName": "bacon bits",
                                "image": "bacon-bits.jpg"
                            },
                            {
                                "id": 1041009,
                                "name": "cheese",
                                "localizedName": "cheese",
                                "image": "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png"
                            }
                        ],
                        "equipment": []
                    },
                    {
                        "number": 6,
                        "step": "Whip eggs and milk together and pour over bread mixture.",
                        "ingredients": [
                            {
                                "id": 18064,
                                "name": "bread",
                                "localizedName": "bread",
                                "image": "white-bread.jpg"
                            },
                            {
                                "id": 1123,
                                "name": "egg",
                                "localizedName": "egg",
                                "image": "egg.png"
                            },
                            {
                                "id": 1077,
                                "name": "milk",
                                "localizedName": "milk",
                                "image": "milk.png"
                            }
                        ],
                        "equipment": []
                    },
                    {
                        "number": 7,
                        "step": "Refrigerate for one hour up to overnight.",
                        "ingredients": [],
                        "equipment": [],
                        "length": {
                            "number": 60,
                            "unit": "minutes"
                        }
                    },
                    {
                        "number": 8,
                        "step": "Heat oven to 35",
                        "ingredients": [],
                        "equipment": [
                            {
                                "id": 404784,
                                "name": "oven",
                                "localizedName": "oven",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg"
                            }
                        ]
                    },
                    {
                        "number": 9,
                        "step": "Bake 20 minutes covered with foil. Uncover and bake another 10 minutes until puffed and lightly browned.",
                        "ingredients": [],
                        "equipment": [
                            {
                                "id": 404784,
                                "name": "oven",
                                "localizedName": "oven",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/oven.jpg"
                            },
                            {
                                "id": 404765,
                                "name": "aluminum foil",
                                "localizedName": "aluminum foil",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/aluminum-foil.png"
                            }
                        ],
                        "length": {
                            "number": 30,
                            "unit": "minutes"
                        }
                    }
                ]
            }
        ],
        "isWatched": false,
        "isFavorite": false
    },
    {
        "recipe_id": 640959,
        "name": "Crunchy Prawn Skewers With Lemony Avocado Dip",
        "picture": "https://img.spoonacular.com/recipes/640959-556x370.jpg",
        "timeToMake": "45 minutes",
        "popularity": 5,
        "dietCategory": "none",
        "isGlutenFree": false,
        "created_by": null,
        "description": "Crunchy Prawn Skewers With Lemony Avocado Dip is a <b>pescatarian</b> recipe with 4 servings. This main course has <b>675 calories</b>, <b>33g of protein</b>, and <b>26g of fat</b> per serving. For <b>$3.26 per serving</b>, this recipe <b>covers 26%</b> of your daily requirements of vitamins and minerals. It can be enjoyed any time, but it is especially good for <b>The Super Bowl</b>. This recipe from Foodista requires prawns, crème fraiche, olive oil, and bamboo skewers. This recipe is liked by 5 foodies and cooks. From preparation to the plate, this recipe takes around <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 81%</b>, which is outstanding. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/harissa-beef-skewers-with-avocado-dip-1094473\">Harissa beef skewers with avocado dip</a>, <a href=\"https://spoonacular.com/recipes/grilled-hotdog-skewers-with-creamy-avocado-dip-21746\">Grilled Hotdog Skewers With Creamy Avocado Dip</a>, and <a href=\"https://spoonacular.com/recipes/lemony-prawn-chorizo-rice-pot-224301\">Lemony prawn & chorizo rice pot</a>.",
        "ingredients": [
            "Flesh of 1 avocado",
            "125 ml crème fraiche",
            "Juice and zest of 1 lemon",
            "400 grams breadcrumbs",
            "36 mediums prawns, deveined",
            "30 ml olive oil",
            "12 wood or bamboo skewers"
        ],
        "cuisine": "unknown",
        "dishes": "unknown",
        "analyzedInstructions": [
            {
                "name": "",
                "steps": [
                    {
                        "number": 1,
                        "step": "Combine the avocado, crme fraiche and lemon juice in a food processor until smooth. Season to taste and set aside.",
                        "ingredients": [
                            {
                                "id": 9152,
                                "name": "lemon juice",
                                "localizedName": "lemon juice",
                                "image": "lemon-juice.jpg"
                            },
                            {
                                "id": 9037,
                                "name": "avocado",
                                "localizedName": "avocado",
                                "image": "avocado.jpg"
                            }
                        ],
                        "equipment": [
                            {
                                "id": 404771,
                                "name": "food processor",
                                "localizedName": "food processor",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/food-processor.png"
                            }
                        ]
                    },
                    {
                        "number": 2,
                        "step": "Combine the breadcrumbs and zest, and season well.",
                        "ingredients": [
                            {
                                "id": 18079,
                                "name": "breadcrumbs",
                                "localizedName": "breadcrumbs",
                                "image": "breadcrumbs.jpg"
                            }
                        ],
                        "equipment": []
                    },
                    {
                        "number": 3,
                        "step": "Coat the prawns in olive oil and toss with the breadcrumbs. Thread three prawns onto each skewer.",
                        "ingredients": [
                            {
                                "id": 18079,
                                "name": "breadcrumbs",
                                "localizedName": "breadcrumbs",
                                "image": "breadcrumbs.jpg"
                            },
                            {
                                "id": 4053,
                                "name": "olive oil",
                                "localizedName": "olive oil",
                                "image": "olive-oil.jpg"
                            },
                            {
                                "id": 15270,
                                "name": "shrimp",
                                "localizedName": "shrimp",
                                "image": "shrimp.png"
                            }
                        ],
                        "equipment": [
                            {
                                "id": 3065,
                                "name": "skewers",
                                "localizedName": "skewers",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/wooden-skewers.jpg"
                            }
                        ]
                    },
                    {
                        "number": 4,
                        "step": "Grill for 2 minutes on each side, or until crisp and golden, and serve immediately with the dip.",
                        "ingredients": [
                            {
                                "id": 0,
                                "name": "dip",
                                "localizedName": "dip",
                                "image": ""
                            }
                        ],
                        "equipment": [
                            {
                                "id": 404706,
                                "name": "grill",
                                "localizedName": "grill",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/grill.jpg"
                            }
                        ],
                        "length": {
                            "number": 2,
                            "unit": "minutes"
                        }
                    },
                    {
                        "number": 5,
                        "step": "TIP: Soak the skewers in cold water for at least an hour beforehand to prevent them burning.",
                        "ingredients": [
                            {
                                "id": 14412,
                                "name": "water",
                                "localizedName": "water",
                                "image": "water.png"
                            }
                        ],
                        "equipment": [
                            {
                                "id": 3065,
                                "name": "skewers",
                                "localizedName": "skewers",
                                "image": "https://spoonacular.com/cdn/equipment_100x100/wooden-skewers.jpg"
                            }
                        ]
                    }
                ]
            }
        ],
        "isWatched": false,
        "isFavorite": false
        }
    ]
        this.$root.store.randomRecipes = [...this.recipes];
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 400px;
}
</style>

<template>
  <div>
    <!-- Optional Title -->
    <h2 v-if="title" class="mb-4">{{ title }} <span v-if="showCount">({{ recipes.length }})</span></h2>
    
    <!-- No Results Message -->
    <div v-if="recipes.length === 0">
      <slot name="empty">
        <div class="text-center text-muted my-5">
          {{ noResultsMessage }}
        </div>
      </slot>
    </div>

    <!-- Recipe Grid -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="recipe in displayedRecipes" :key="recipe.recipe_id">
        <RecipePreview class="recipePreview" :sourceType="sourceType" :recipe="recipe" />
      </div>
    </div>

    <!-- Pagination controls -->
    <div v-if="recipes.length > recipesPerPage" class="d-flex justify-content-center mt-4">
      <nav :aria-label="`${sourceType} pagination`">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipesList",
  components: {
    RecipePreview,
  },
  props: {
    // Recipe data
    recipes: {
      type: Array,
      required: true,
    },
    // Display options
    title: {
      type: String,
      default: ""
    },
    sourceType: {
      type: String,
      default: "search"
    },
    showCount: {
      type: Boolean,
      default: false
    },
    noResultsMessage: {
      type: String,
      default: "No recipes to show."
    },
    // Pagination options
    recipesPerPage: {
      type: Number,
      default: 6,
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.recipes.length / this.recipesPerPage);
    },
    displayedRecipes() {
      if (!this.showPagination) {
        return this.recipes;
      }
      const start = (this.currentPage - 1) * this.recipesPerPage;
      const end = start + this.recipesPerPage;
      return this.recipes.slice(start, end);
    },
  },
  watch: {
    recipes() {
      // Reset to first page when recipes change
      this.currentPage = 1;
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        // Scroll to top of results
        window.scrollTo({
          top: this.$el.offsetTop - 100,
          behavior: "smooth"
        });
        // Emit event for parent components that might need to know about page changes
        this.$emit('page-changed', page);
      }
    }
  }
};
</script>

<style scoped>
.page-link {
  color: #d1925e;
}

.page-item.active .page-link {
  background-color: #d1925e;
  border-color: #d1925e;
  color: white;
}

.page-link:focus {
  box-shadow: 0 0 0 0.25rem rgba(209, 146, 94, 0.25);
}
</style>

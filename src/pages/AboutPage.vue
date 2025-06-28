<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">About My Recipes</h1>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Our Mission</h5>
            <p class="card-text">
              This is a recipe sharing platform where users can discover, share, and save their favorite recipes.
              Our mission is to build a community of food enthusiasts who love to cook and share culinary experiences.
            </p>
            
            <h5 class="card-title mt-4">Features</h5>
            <ul>
              <li>Browse a wide collection of recipes</li>
              <li>Search for specific recipes by ingredients or categories</li>
              <li>Create and share your own recipes</li>
              <li>Save your favorite recipes for quick access</li>
              <li>Share family recipes with the community</li>
            </ul>
            
            <h5 class="card-title mt-4">Contact</h5>
            <p class="card-text">
              For any questions or suggestions, please contact us at support@myrecipes.com
            </p>
          </div>
        </div>
        
        <!-- Team Background Section -->
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title text-center mb-3 team-title">Our Team</h5>
            <p class="card-text team-intro">
              Our team consists of two passionate developers who love cooking, eating and technology. 
              We're dedicated to creating the best recipe sharing platform for food enthusiasts worldwide.
            </p>
            
            <div class="row mt-4">
              <div class="col-md-6">
                <div class="team-member">
                  <h6>Ido Bergerzon</h6>
                  <div class="profile-section">
                    <img :src="idoImage" 
                         alt="Ido Bergerzon" 
                         class="profile-pic" />
                    <div class="profile-links">
                      <p><i class="bi bi-globe"></i> <a href="https://wed-2023.github.io/319043899/" target="_blank">Louis Singer</a></p>
                      <p><i class="bi bi-linkedin"></i> <a href="https://www.linkedin.com/in/ido-bergerzon-279822307/" target="_blank">LinkedIn Profile</a></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="team-member">
                  <h6>Aviv Nachmias</h6>
                  <div class="profile-section">
                    <img :src="avivImage" 
                         alt="Aviv Nachmias" 
                         class="profile-pic" />
                    <div class="profile-links">
                      <p><i class="bi bi-globe"></i> <a href="https://wed-2023.github.io/208746636/" target="_blank">Aaron Griner</a></p>
                      <p><i class="bi bi-linkedin"></i> <a href="https://www.linkedin.com/in/aviv-nachmias/" target="_blank">LinkedIn Profile</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Previous Work Section -->
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Prior Shared Work</h5>
            <div class="text-center mb-3">
              <h6>🌐 Play Our Previous Game</h6>
              <a href="https://wed-2023.github.io/assignment2-319043899_208746636_assignment2/" 
                 target="_blank" 
                 class="btn btn-primary">
                Click here to play Galactic Combat! 🚀
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import local images
import IdoProfilePic from '@/assets/team/ido_linkedin.jpeg';
import AvivProfilePic from '@/assets/team/aviv_linkedin.jpeg';

export default {
  name: "AboutPage",
  data() {
    return {
      idoImage: IdoProfilePic,
      avivImage: AvivProfilePic
    };
  }
}
</script>

<style scoped>
.team-member {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: #f8f9fa;
  transition: box-shadow 0.3s ease;
}

.team-member:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.team-member h6 {
  color: #343a40;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.team-member a {
  color: #0d6efd;
  text-decoration: none;
}

.team-member a:hover {
  text-decoration: underline;
}

.profile-section {
  display: flex;
  align-items: center;
  margin-top: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.profile-section:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f8f9fa;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  margin-right: 1.5rem;
  transition: transform 0.3s ease;
}

.profile-pic:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.profile-links {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-links p {
  margin-bottom: 0.7rem;
  font-size: 1.1rem;
}

.profile-links i {
  margin-right: 0.5rem;
  color: #0d6efd;
  font-size: 1.2rem;
}

.profile-links a {
  font-size: 1.1rem;
  font-weight: 500;
  padding: 4px 0;
  transition: color 0.2s ease;
}

.profile-links a:hover {
  color: #0b5ed7;
  text-decoration: none;
  transform: translateX(3px);
}
</style>

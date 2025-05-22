<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const connecter = async () => {
  try {
    const response = await fetch('https://greenvelvet.alwaysdata.net/kwick/api/login/' + username.value + '/' + password.value)
    const data = await response.json()

    if (data.result.status === 'done') {
      
      localStorage.setItem('token', data.result.token); 
      localStorage.setItem('user_id', data.result.id); 

      router.push('/chat'); 
    } else {
      errorMessage.value = data.result.message;
    }
  } catch (error) {
    errorMessage.value = "Erreur lors de la connexion";
  }
};

</script>

<template>
  <div class="relative w-screen h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center co">
    <div class="bg-white p-15 rounded-2xl shadow-2xl w-96">
      <img src="@/assets/MessengerLogo.png" alt="Connexion" class="h-6 w-6" />
      <div class="space-y-4">
       
        <div>
          <input
            v-model="username"
            class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Entrez votre nom"
          />
        </div>

    
        <div>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="********"
          />
        </div>


        <button
          @click="connecter"
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Se connecter
        </button>
      </div>


      <p v-if="errorMessage" class="mt-4 text-red-500 text-center font-medium">
        {{ errorMessage }}
      </p>

      <p class="mt-4 text-center text-gray-700">
        Pas encore de compte ?
        <RouterLink to="/inscription" class="text-blue-500 font-semibold hover:underline">Inscrivez-vous</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>

.container {
  background: #ffffff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  width: 400px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.container:hover {
  transform: translateY(-5px);
}

.co{
  margin-left: 180px;
}
h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}


.input-group {
  text-align: left;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 1rem;
  transition: border 0.3s ease-in-out;
}

input:focus {
  border: 2px solid #309661;
  outline: none;
  box-shadow: 0 0 10px rgba(113, 223, 133, 0.3);
}


button {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  color: rgb(255, 255, 255);
  background-color: rgb(86, 203, 86);
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}



.error-message {
  color: #ff4d4d;
  font-weight: bold;
  margin-top: 10px;
}


.signup-link {
  margin-top: 1rem;
  color: #2575fc;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
}

.signup-link:hover {
  text-decoration: underline;
}

</style>
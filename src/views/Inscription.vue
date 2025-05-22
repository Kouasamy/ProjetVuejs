<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const inscrire = async () => {
  try {
    const response = await fetch('https://greenvelvet.alwaysdata.net/kwick/api/signup/' + username.value + '/' + password.value)
    const data = await response.json()

    // Vérifie si la réponse est correcte
    if (data.result && data.result.status === 'done') {
      localStorage.setItem('token', data.result.token)
      localStorage.setItem('user_id', data.result.id)
      router.push('/')
    } else {
      errorMessage.value = data.result ? data.result.message : 'Erreur inconnue'
    }
  } catch (error) {
    errorMessage.value = "Erreur lors de l'inscription"
  }
}
</script>

<template>
  <div class="relative w-screen h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ins">
    <div class="bg-white p-10 rounded-2xl shadow-2xl w-96">
      <div class="flex justify-center mb-4">
        <img src="@/assets/MessengerLogo.png" alt="Inscription" class="h-12 w-12" />
      </div>

      <div class="space-y-4">
        <input v-model="username" class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg" placeholder="Nom d'utilisateur" />
        <input v-model="password" type="password" class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg" placeholder="Mot de passe" />
        
        <button @click="inscrire" class="w-full bg-green-600 text-white py-2 rounded-lg font-semibold">
          S'inscrire
        </button>
      </div>

      <p v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>

      <p class="mt-4 text-center text-gray-700">
        Déjà un compte ? <RouterLink to="/" class="text-blue-500">Connectez-vous</RouterLink>
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
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
}

.signup-link:hover {
  text-decoration: underline;
}
.ins{ 
  margin-left: 180px;
}
</style>

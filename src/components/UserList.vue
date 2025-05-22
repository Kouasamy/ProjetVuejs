<script setup>
import { ref, onMounted } from "vue";

const users = ref([]); 
const searchQuery = ref(""); 
const token = localStorage.getItem("token");


const formatFullName = (username) => {
  return username
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

// Fonction pour récupérer les utilisateurs connectés
const fetchUsers = async () => {
  try {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/kwick/api/user/logged/${token}`);
    const data = await response.json();

    if (data.result.status === "done") {
      users.value = data.result.user.map((username) => ({
        username,
        fullName: formatFullName(username),
        online: true, 
      }));
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

// Avoir les initiales des noms 
const getInitials = (fullName) => {
  const parts = fullName.split(" ");
  return parts[0][0] + (parts[1] ? parts[1][0] : ""); 
};


const filteredUsers = () => {
  return users.value.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};
  

onMounted(fetchUsers);
</script>
<template>
  <div class="user-list">
  
    <input v-model="searchQuery" placeholder="Rechercher un utilisateur..." />

    
    <ul>
      <li v-for="user in filteredUsers()" :key="user.username">
        <div class="avatar">{{ getInitials(user.fullName) }}</div>
        <span :class="user.online ? 'online' : 'offline'"></span>
        <span class="name">{{ user.fullName }}</span>
        
      </li>
    </ul>
  </div>
</template>
<style scoped>
.user-list {
  padding: 15px;
  background: #fcfcfc;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #ffffff;
  color: black;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

li:hover {
  transform: scale(1.02);
}


.avatar {
  width: 40px;
  height: 40px;
  background: #bbe2bf9d;
  color: rgb(0, 0, 0);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.online, .offline {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.online {
  background-color: green;
}

.offline {
  background-color: red;
}

/* Nom d'utilisateur */
.name {
  font-size: 1rem;
  font-weight: bold;
}
</style>

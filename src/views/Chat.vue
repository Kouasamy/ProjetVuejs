<script setup>
import { useRouter } from "vue-router";
import UserList from "../components/UserList.vue";
import ChatMessages from "../components/ChatMessages.vue"; 

const router = useRouter();


const logout = () => {
  localStorage.clear(); 
  router.push("/"); 
};
</script>

<template>
  <div class="chat-container">
    <aside>
      <img src="@/assets/MessengerLogo.png" alt="Inscription" class="logo" />
      <button @click="logout"><img src="@/assets/deconnecter.png" alt="" class="deconnexion"></button>
      <UserList />
    </aside>
    <main>
      <ChatMessages />
    </main>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
}
aside {
  width: 500px;
  padding: 20px;
  background-color: #f4f4f4;
}
main {
  flex-grow: 1;
  padding: 20px;
  background-color: rgb(119, 216, 110);
}
.logo{
  height: 50px;
}
button{
  border-radius: 60px;
  background-color: rgba(222, 22, 22, 0.788);
  border: none;
  margin-left: 50px;
  margin-bottom: 10px;
  cursor: pointer;
}
.deconnexion{
  height: 20px;
}
</style>

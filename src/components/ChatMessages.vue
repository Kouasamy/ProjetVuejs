<script setup>
import { ref, onMounted } from "vue";

const messages = ref([]); 
const newMessage = ref(""); 
const token = localStorage.getItem("token"); 
const userId = Number(localStorage.getItem("user_id")); 

//  Récupération des messages
const fetchMessages = async () => { 
  try {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/kwick/api/talk/list/${token}/0`);
    const data = await response.json();

    if (data.result.status === "done") {
      const newMessages = data.result.talk.map(msg => ({
        user_name: msg.user_name, 
        content: msg.content, 
      }));

      messages.value = [...new Set([...messages.value, ...newMessages])];
    }
  } catch (error) {
    console.error("Erreur récupération :", error);
  }
};


const sendMessage = async () => {


  if (!token || !userId) { 
    console.error("Token ou User ID manquant !");
    return;
  }

  const encodedMessage = encodeURIComponent(newMessage.value);


  messages.value.push({
    user_name: "Moi", 
    content: newMessage.value, 
  });


  newMessage.value = "";

  try {
    const response = await fetch(`https://greenvelvet.alwaysdata.net/kwick/api/say/${token}/${userId}/${encodedMessage}`);
    const data = await response.json();

    if (data.result.status === "done") {
      console.log("Message envoyé !");
    } else {
      console.error("Erreur API:", data.result.message);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
  }
};

onMounted(fetchMessages);
</script>

<template>
  <div class="chat">
  
    <div class="messages">
      <div v-for="msg in messages" class="message">
        <strong>{{ msg.user_name }}:</strong> {{ msg.content }}
      </div>
    </div>


    <div class="message-input">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Écrire un message..." />
      <button @click="sendMessage">Envoyer</button>
    </div>
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  color: rgb(0, 0, 0);
  background: #ffffff;
  height: 300px;
}
.message-input {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: #fff;
}
input {
  flex-grow: 1;
  padding: 8px;
}
button {
  padding: 8px 12px;
  background: #5fd40b;
  color: white;
  border: none;
  cursor: pointer;
}
strong{
  font-weight: bold;
}
.messages {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    overflow-y: auto;
    height: 400px;
  }

  .message {
    background-color: #ffffff;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .message strong {
    color: #000000;
    font-weight: bold;
  }

  .message:nth-child(odd) {
    background-color: #f1f1f1;
  }

  .message:nth-child(even) {
    background-color: #e7e7e7;
  }

  .message:last-child {
    margin-bottom: 0;
  }
</style>

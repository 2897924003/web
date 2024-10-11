<template>
  <q-page class="flex flex-center">
    <div class="chat-container">
      <div class="chat-box">
        <div class="message-list">
          <div v-for="(message, index) in messages" :key="index" class="message">
            <strong>{{ message.sender }} to {{ message.receiver }}:</strong> {{ message.text }}
          </div>
        </div>
        <q-input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          label="Type your message"
          outlined
          bottom-slots
        >
          <template v-slot:append>
            <q-btn @click="sendMessage" color="primary" icon="send" />
          </template>
        </q-input>
        <q-input
          v-model="receiver"
          label="Recipient"
          outlined
          bottom-slots
        />
        <q-input
          v-model="senderName"
          label="Your Name"
          outlined
          bottom-slots
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 用于存储消息、新消息、接收者和发送者姓名
const newMessage = ref('');
const receiver = ref('');
const senderName = ref('Your Name');
const messages = ref([]);

// WebSocket 连接
const socket = ref(null);

onMounted(() => {
  socket.value = new WebSocket('ws://localhost:8080'); // 替换为你的后端 WebSocket 地址

  socket.value.onmessage = (event) => {
    const message = JSON.parse(event.data);
    messages.value.push(message);
  };
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.close();
  }
});

const sendMessage = () => {
  if (newMessage.value.trim() && receiver.value.trim() && senderName.value.trim()) {
    const message = {
      sender: senderName.value.trim(),
      receiver: receiver.value.trim(),
      text: newMessage.value.trim()
    };
    socket.value.send(JSON.stringify(message));
    newMessage.value = '';
  }
};
</script>

<style scoped>
.chat-container {
  width: 100%;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.chat-box {
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 100vh;
}

.message-list {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #f9f9f9;
}

.message {
  margin-bottom: 10px;
}

.q-input {
  margin: 10px;
}

.q-btn {
  margin: 0;
}
</style>

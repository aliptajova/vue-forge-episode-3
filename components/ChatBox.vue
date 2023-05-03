<template>
  <!-- 
    https://vuejs.org/guide/components/props.html
    Code out the chatbox for Exercise 1 here -->
    
    <div class="mockup-window border border-base-300">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="`chat ${me.id === message.userId ? `chat-end` : `chat-start`}`">
        <div class="chat-bubble">{{message.text}}</div>
      </div>
      <input type="text" placeholder="Your messages here" className="input input-bordered w-full max-w-xs"/>
      <button class="btn">Send</button>
    </div>

</template>

<script setup lang="ts">
import { Message, User } from '~~/types';
// @ts-expect-error I couldn't find any types for vue 3 markdownit
import MarkDown from 'vue3-markdown-it';

interface Props {
  messages: Message[]
  users: User[]
  me: User
  usersTyping?: User[]
}
const props = defineProps<Props>()

const text = ref<String>("");
const isOpen = ref(false);
</script>


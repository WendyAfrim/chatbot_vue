import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChatView from "../views/ChatView.vue";
import ChatBotView from "../views/ChatBotView.vue";
import LoginView from "../views/LoginView.vue";
import JoinChatRoom from "../components/front/JoinChatRoom.vue";
import ChatRoomList from "../components/admin/ChatRoomList.vue";
import ChatRoom from "../components/admin/ChatRoom.vue";
import AddChatRoom from "../components/admin/AddChatRoom.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatView,
    },
    {
      path: "/chatbot",
      name: "chatbot",
      component: ChatBotView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/chatrooms",
      name: "chatrooms",
      component: JoinChatRoom,
    },
    {
      path: "/admin/chatrooms",
      name: "admin_chatrooms",
      component: ChatRoomList,
    },
    {
      path: "/admin/chatrooms/:id",
      name: "admin_chatroom_details",
      component: ChatRoom,
    }, 
    {
      path: "/admin/chatrooms/add",
      name: "admin_chatroom_add",
      component: AddChatRoom,
    }, 
  ],
});

export default router;

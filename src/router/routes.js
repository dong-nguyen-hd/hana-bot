const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/PageHome.vue"), name:"Home" },
      { path: "/about", component: () => import("src/pages/PageAbout.vue"), name:"About" },
      { path: "/memories", component: () => import("src/pages/PageMemories.vue"), name:"Memories" },
      { path: "/search", component: () => import("src/pages/PageSearch.vue"), name:"Search" },
      { path: "/new-queet", component: () => import("src/pages/PageNewQueet.vue"), name:"New Queet" },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;

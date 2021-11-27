<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black header-layer">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          <span
            v-show="$route.path != '/new-queet'"
            style="padding-left: 2px"
            >{{ $route.name }}</span
          >
          <q-btn
            unelevated
            flat
            round
            dense
            v-close-popup
            class="q-pl-sm"
            to="/"
            v-show="$route.path == '/new-queet'"
          >
            <q-icon name="fas fa-arrow-left" style="width: 20px; height: 20px" />
          </q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer bordered class="bg-white text-black lt-md">
      <q-toolbar class="q-pa-none">
        <q-toolbar-title>
          <q-list class="row no-wrap">
            <q-item to="/" clickable v-ripple exact class="col">
              <q-item-section top>
                <q-icon
                  name="home"
                  style="font-size: 40px !important"
                  class="footer-icon align-center"
                />
              </q-item-section>
            </q-item>

            <q-item to="/notification" clickable v-ripple exact class="col">
              <q-item-section avatar>
                <q-icon
                  name="far fa-bell"
                  style="font-size: 30px !important"
                  class="footer-icon align-center"
                />
              </q-item-section>
            </q-item>

            <q-item to="/search" clickable v-ripple exact class="col">
              <q-item-section avatar>
                <q-icon
                  name="search"
                  style="font-size: 37px !important"
                  class="footer-icon align-center"
                />
              </q-item-section>
            </q-item>

            <q-item to="/about" clickable v-ripple exact class="col">
              <q-item-section avatar>
                <q-icon
                  name="help"
                  style="font-size: 34px !important"
                  class="footer-icon align-center"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer
      :width="280"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="gt-sm"
    >
      <q-icon
        name="fas fa-dove"
        class="q-pl-xl q-py-lg"
        size="md"
        color="primary"
      />

      <q-list>
        <q-item to="/" clickable v-ripple exact class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>

        <q-item to="/notification" clickable v-ripple exact class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="far fa-bell" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >Memories</q-item-section
          >
        </q-item>

        <q-item to="/about" clickable v-ripple exact class="q-pl-xl">
          <q-item-section avatar>
            <q-icon name="help" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold"
            >About</q-item-section
          >
        </q-item>
      </q-list>
      <q-btn
        unelevated
        rounded
        @click="diaglogNewQueet = true"
        color="primary"
        label="Queet"
        class="q-ml-xl q-mt-xl q-px-xl"
      />
    </q-drawer>

    <q-dialog v-model="diaglogNewQueet" no-backdrop-dismiss>
      <q-card style="width: 600px; max-width: 600px; border-radius: 16px">
        <q-card-section
          class="row reverse items-center q-pa-none"
          style="width: 100%; height: 54px"
        >
          <q-btn
            style="width: 34px; height: 34px"
            class="q-mr-sm"
            flat
            round
            dense
            v-close-popup
            @click="newContent = ''"
          >
            <q-icon name="close" style="width: 20px; height: 20px" />
          </q-btn>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-none">
          <div class="row" style="width: 600px">
            <div style="width: 78px">
              <q-avatar size="xl" class="col q-pa-md">
                <img src="..\assets\images\heart.jpg" />
              </q-avatar>
            </div>

            <div style="width: 522px">
              <q-scroll-area style="height: 230px" class="col q-pr-md">
                <q-input
                  bottom-slots
                  v-model="newContent"
                  placeholder="What's happening?"
                  borderless
                  autogrow
                  :maxlength="maxLenghtInput"
                  class="new-queet"
                >
                </q-input>
              </q-scroll-area>
            </div>
          </div>
        </q-card-section>

        <q-separator />
        <q-card-actions class="q-pa-none reverse" style="height: 54px">
          <q-btn
            to="/"
            v-close-popup
            @click="addNewQueet"
            :disable="!newContent"
            unelevated
            rounded
            color="primary"
            label="Queet"
            no-caps
            class="q-mr-md"
          />
          <span v-show="newContent" class="line q-mr-md"></span>
          <span v-show="newContent" class="q-mr-md"
            >{{ newContent.length }}/{{ maxLenghtInput }}</span
          >
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-input
        rounded
        outlined
        dense
        class="q-ma-md gt-sm"
        placeholder="Search Quitter"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list separator padding>
        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Title</q-item-label>
            <q-item-label class="text-weight-bold">Something</q-item-label>
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Title</q-item-label>
            <q-item-label class="text-weight-bold">Something</q-item-label>
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="q-pa-md">
          <q-item-section>
            <q-item-label overline class="text-grey">Title</q-item-label>
            <q-item-label class="text-weight-bold">Something</q-item-label>
            <q-item-label caption
              >Secondary line text. Lorem ipsum dolor sit amet, consectetur
              adipiscit elit.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-btn
        to="/new-queet"
        v-show="$route.path != '/new-queet'"
        round
        size="20px"
        color="primary"
        class="lt-md button-add"
      >
        <q-icon size="20px" name="far fa-edit" />
      </q-btn>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import db from "src/boot/firebase";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";

export default {
  data() {
    return {
      diaglogNewQueet: false,
      newContent: "",
      maxLenghtInput: 2000,
    };
  },
  methods: {
    async addNewQueet() {
      await addDoc(collection(db, "queet"), {
        content: this.newContent,
        date: Date.now(),
        liked: false,
      });

      this.newContent = "";
    },
  },
  mounted() {
    const q = query(collection(db, "queet"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let queetChange = change.doc.data();

        if (change.type === "added") {
          console.log("New queet: ", queetChange);
        }
      });
    });
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
};
</script>

<style lang="scss">
.header-layer{
  z-index: 1001;
}

.line {
  width: 1px;
  height: 30px;
  background-color: $line;
}

.new-queet {
  textarea {
    font-size: 19px;
    line-height: 1.4 !important;
  }
}

.align-center {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.footer-icon {
  width: 100%;
  height: 100%;
}

.button-add {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1000;
  opacity: 0.7;
}

.button-add:hover {
  background-color: $primary;
  opacity: 1;
}
</style>
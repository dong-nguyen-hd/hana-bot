<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            bottom-slots
            v-model="newContent"
            placeholder="What's happening?"
            counter
            maxlength="2000"
            autogrow
            class="new-queet"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="..\assets\images\heart.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            to="/"
            @click="addNewQueet"
            :disable="!newContent"
            unelevated
            rounded
            color="primary"
            label="Queet"
            no-caps
            class="q-mb-lg"
          />
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { defineComponent } from "vue";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

export default defineComponent({
  name: "PageNewQueet",
  data() {
    return {
      newContent: "",
    };
  },
  methods: {
    async addNewQueet() {
      await addDoc(collection(db, "queet"), {
        content: this.newContent.trim(),
        date: Date.now(),
        liked: false,
        hidden: false,
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
});
</script>

<style lang="scss">
.new-queet {
  textarea {
    font-size: 19px;
    line-height: 1.4 !important;
  }
}
</style>

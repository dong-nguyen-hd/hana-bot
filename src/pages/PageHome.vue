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
            maxlength="280"
            autogrow
            class="new-queet"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
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

      <q-separator size="10px" color="grey-2" class="divider" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item class="queet q-py-md" v-for="queet in queets" :key="queet.id">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Dong Nguyen</strong>
                <span class="text-grey-7">
                  @dong-nguyen <br class="lt-md" />&bull;
                  {{ relativeDate(queet.date) }}</span
                >
              </q-item-label>
              <q-item-label class="queet-content text-body1"
                >{{ queet.content }}
              </q-item-label>
              <div class="queet-icons row justify-between q-mt-sm">
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="far fa-comment"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-retweet"
                />
                <q-btn
                  flat
                  round
                  @click="toggleLiked(queet)"
                  :color="queet.liked ? 'pink' : 'grey'"
                  size="sm"
                  :icon="queet.liked ? 'fas fa-heart' : 'far fa-heart'"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-trash"
                  @click="deleteQueet(queet)"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { defineComponent } from "vue";
import { formatDistance } from "date-fns";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default defineComponent({
  name: "PageHome",
  data() {
    return {
      newContent: "",
      queets: [],
    };
  },
  methods: {
    relativeDate(value) {
      return formatDistance(value, new Date(), { addSuffix: true });
    },
    async addNewQueet() {
      await addDoc(collection(db, "queet"), {
        content: this.newContent,
        date: Date.now(),
        liked: false,
      });

      this.newContent = "";
    },
    async deleteQueet(queet) {
      await deleteDoc(doc(db, "queet", queet.id));
    },
    async toggleLiked(queet) {
      const dataRef = doc(db, "queet", queet.id);

      await updateDoc(dataRef, {
        liked: !queet.liked,
      });
    },
  },
  mounted() {
    const q = query(collection(db, "queet"), orderBy("date"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let queetChange = change.doc.data();
        queetChange.id = change.doc.id;

        if (change.type === "added") {
          console.log("New queet: ", queetChange);
          this.queets.unshift(queetChange);
        }
        if (change.type === "modified") {
          console.log("Modified queet: ", queetChange);
          let index = this.queets.findIndex((x) => x.id === queetChange.id);
          Object.assign(this.queets[index], queetChange);
        }
        if (change.type === "removed") {
          console.log("Removed queet: ", queetChange);
          let index = this.queets.findIndex((x) => x.id === queetChange.id);
          this.queets.splice(index, 1);
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

.divider {
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: $grey-4;
}

.queet-content {
  white-space: pre-line;
}

.queet-icons {
  margin-left: -5px;
}

.queet:not(:first-child) {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>

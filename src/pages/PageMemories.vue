<template>
  <q-page class="relative-position overflow-hidden">
    <div class="memories-block">
      <p class="q-pa-lg text-h5 text-weight-light text-center">
        {{ filterQueet.length > 0 ? "Memories Today" : "No Memories Today" }}
      </p>
    </div>

    <q-scroll-area
      class="q-pa-none absolute scroll-block"
      v-show="filterQueet.length"
    >
      <q-list separator v-show="filterQueet.length">
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item
            class="queet q-py-md"
            v-for="queet in filterQueet"
            :key="queet.id"
          >
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="..\assets\images\heart.jpg" />
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
                  @click="confirmEdit(queet)"
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="far fa-comment"
                >
                  <q-tooltip transition-show="rotate" transition-hide="rotate">
                    Edit
                  </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  :color="queet.hidden ? 'light-green' : 'grey'"
                  size="sm"
                  icon="fas fa-retweet"
                  @click="comfirmHide(queet)"
                >
                  <q-tooltip transition-show="rotate" transition-hide="rotate">
                    Hide
                  </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  @click="toggleLiked(queet)"
                  :color="queet.liked ? 'pink' : 'grey'"
                  size="sm"
                  :icon="queet.liked ? 'fas fa-heart' : 'far fa-heart'"
                >
                  <q-tooltip transition-show="rotate" transition-hide="rotate">
                    Like
                  </q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-trash"
                  @click="comfirmDelete(queet)"
                >
                  <q-tooltip transition-show="rotate" transition-hide="rotate">
                    Delete
                  </q-tooltip>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>

      <q-dialog v-model="isDelete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="text-h6">Delete Queet?</span>
          </q-card-section>
          <q-separator />
          <q-card-section style="max-width: 70vh">
            <span
              >This can’t be undone and it will be removed from your
              profile.</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              flat
              label="Delete"
              color="negative"
              v-close-popup
              @click="deleteQueet()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="isHidden" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="text-h6">Hide Queet?</span>
          </q-card-section>
          <q-separator />
          <q-card-section style="max-width: 70vh">
            <span
              >This can’t be undone and it will be hidden from your
              profile.</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              flat
              label="Hide"
              color="negative"
              v-close-popup
              @click="hideQueet(true)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-scroll-area>

    <q-dialog class="gt-sm" v-model="isEdit" no-backdrop-dismiss>
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
                  v-model="modifyContent"
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
            @click="editQueet()"
            :disable="!modifyContent"
            unelevated
            rounded
            color="primary"
            label="Save"
            no-caps
            class="q-mr-md"
          />
          <span v-show="modifyContent" class="line q-mr-md"></span>
          <span v-show="modifyContent" class="q-mr-md"
            >{{ modifyContent.length }}/{{ maxLenghtInput }}</span
          >
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="isEdit"
      transition-show="slide-up"
      transition-hide="slide-down"
      transition-duration="300"
      class="lt-md"
      style="z-index: 1002"
      maximized
    >
      <q-card class="absolute-top">
        <q-card-section
          class="row items-center q-pa-none"
          style="width: 100%; height: 50px"
        >
          <q-btn
            style="width: 34px; height: 34px"
            class="q-ml-sm"
            flat
            round
            dense
            v-close-popup
          >
            <q-icon
              name="fas fa-arrow-left"
              style="width: 20px; height: 20px"
            />
          </q-btn>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-none scroll edit-dialog">
          <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
            <div class="col">
              <q-input
                bottom-slots
                v-model="modifyContent"
                placeholder="What's happening?"
                counter
                :maxlength="maxLenghtInput"
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
                v-close-popup
                @click="editQueet()"
                :disable="!modifyContent"
                unelevated
                rounded
                color="primary"
                label="Save"
                no-caps
                class="q-mb-lg"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { defineComponent } from "vue";
import {
  differenceInCalendarDays,
  formatDistanceToNow,
  format,
} from "date-fns";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default defineComponent({
  name: "PageMemories",
  data() {
    return {
      queets: [],

      isDelete: false,
      deleteObj: Object,

      isHidden: false,
      hiddenObj: Object,

      isEdit: false,
      modifyObj: Object,
      modifyContent: "",

      maxLenghtInput: 2000,
    };
  },
  computed: {
    filterQueet: function () {
      let dateNow = this.convertTimestampToDate(Date.now());

      let temp = this.queets.filter(
        (x) =>
          dateNow.day === this.convertTimestampToDate(x.date).day &&
          dateNow.month === this.convertTimestampToDate(x.date).month &&
          dateNow.year != this.convertTimestampToDate(x.date).year
      );

      return temp;
    },
  },
  methods: {
    convertTimestampToDate(timestamp) {
      let tempTime = new Date(timestamp);

      let timeReturn = {
        day: tempTime.getDate(),
        month: tempTime.getMonth(),
        year: tempTime.getFullYear(),
      };

      return timeReturn;
    },
    confirmEdit(queet) {
      this.isEdit = true;
      this.modifyContent = queet.content;
      Object.assign(this.modifyObj, queet);
    },
    async editQueet() {
      const dataRef = doc(db, "queet", this.modifyObj.id);

      await updateDoc(dataRef, {
        content: this.modifyContent,
      });
    },
    relativeDate(value) {
      let tempDate = parseInt(differenceInCalendarDays(value, new Date()));

      return tempDate >= 0 && tempDate < 1
        ? formatDistanceToNow(value, { addSuffix: true })
        : format(value, "MMM d, y");
    },
    async comfirmHide(queet) {
      this.hiddenObj = queet;

      if (queet.hidden) await this.hideQueet(false);
      else this.isHidden = true;
    },
    async hideQueet(isHidden) {
      const dataRef = doc(db, "queet", this.hiddenObj.id);

      await updateDoc(dataRef, {
        hidden: isHidden,
      });
    },
    comfirmDelete(queet) {
      this.isDelete = true;
      this.deleteObj = queet;
    },
    async deleteQueet() {
      await deleteDoc(doc(db, "queet", this.deleteObj.id));
    },
    async toggleLiked(queet) {
      const dataRef = doc(db, "queet", queet.id);

      await updateDoc(dataRef, {
        liked: !queet.liked,
      });
    },
  },
  mounted() {
    const q = query(collection(db, "queet"), orderBy("liked"), orderBy("date"));
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
.memories-block {
  width: 100%;
  height: 100px;
}

.scroll-block {
  width: 100%;
  height: calc(100% - 100px);
  bottom: 0px;
}

.edit-dialog {
  max-height: calc(100% - 100px);
}

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
  overflow-wrap: anywhere;
}

.queet-icons {
  margin-left: -5px;
}

.queet:not(:first-child) {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>

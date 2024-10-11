<template>
  <q-page class="column flex flex-center q-gutter-sm">
    <!-- Header Image -->
    <div>
      <q-card class="fit column flex flex-center q-gutter-sm">
        <q-img src="/icons/eye.png"></q-img>

        <div class="text-h6 text-center">
          Typology of Chinese countryside self built house
        </div>

        <div class="row flex q-gutter-sm justify-center">
          <!-- Two Floors Card -->
          <q-card
            class="col-5 cursor-pointer"
            @click="showSubcategories('twoFloors')"
          >
            <q-card-section>
              <q-img src="/icons/twofloor.png"></q-img>
            </q-card-section>
            <q-card-section class="text">
              <strong>Two floors:</strong>
              New Chinese style/ European style/ Nordic style /Modern style
            </q-card-section>
          </q-card>

          <!-- Three Floors Card -->
          <q-card
            class="col-5 cursor-pointer"
            @click="showSubcategories('threeFloors')"
          >
            <q-card-section>
              <q-img src="/icons/threefloor.png"></q-img>
            </q-card-section>
            <q-card-section class="text">
              <strong>Three floors:</strong>
              Chinese style/New Chinese style/European style/Simple style
            </q-card-section>
          </q-card>
        </div>
      </q-card>
    </div>

    <!-- Dialog for Subcategories -->
    <q-dialog
      v-model="dialogVisible"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">Subcategories</div>
        </q-card-section>
        <q-separator />
        <q-card-section v-if="currentCategory === 'twoFloors'">
          <!-- Add subcategories for Two Floors here -->
          <q-card-actions
            class="q-gutter-md justify-around row flex flex-center"
          >
            <q-btn
              label="New Chinese Style"
              to="examplepage"
              class="col-2"
            ></q-btn>
            <q-btn
              label="European style"
              to="examplepage"
              class="col-2"
            ></q-btn>
            <q-btn label="Nordic style" to="examplepage" class="col-2"></q-btn>
            <q-btn label="modern style" to="examplepage" class="col-2"></q-btn>
          </q-card-actions>
        </q-card-section>

        <q-card-section v-else-if="currentCategory === 'threeFloors'">
          <!-- Add subcategories for Three Floors here -->
          <q-card-actions
            class="q-gutter-md justify-around row flex flex-center"
          >
            <q-btn
              label="New Chinese Style"
              to="examplepage"
              class="col-2"
            ></q-btn>
            <q-btn
              label="European style"
              to="examplepage"
              class="col-2"
            ></q-btn>
            <q-btn label="Nordic style" to="examplepage" class="col-2"></q-btn>
            <q-btn label="modern style" to="examplepage" class="col-2"></q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      currentCategory: "",
    };
  },
  methods: {
    showSubcategories(category) {
      this.currentCategory = category;
      this.dialogVisible = true;
    },
  },
};
</script>

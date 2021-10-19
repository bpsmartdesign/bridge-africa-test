<template>
  <b-modal
    id="modalright"
    ref="modalright"
    :title="$t('pages.add-new-modal-title')"
    modal-class="modal-right"
  >
    <b-form>
      <b-form-group :label="$t('pages.product-name')">
        <b-form-input v-model="elt.title" />
      </b-form-group>
      <b-form-group :label="$t('pages.category')">
        <v-select :options="categories" v-model="elt.category" />
      </b-form-group>
      <b-form-group :label="$t('pages.description')">
        <b-textarea v-model="elt.description" :rows="2" :max-rows="2" />
      </b-form-group>
      <b-form-group :label="$t('pages.status')">
        <b-form-radio-group
          stacked
          class="pt-2"
          :options="statuses"
          v-model="elt.status"
        />
      </b-form-group>
    </b-form>

    <template slot="modal-footer">
      <b-button variant="outline-secondary" @click="hideModal('modalright')">{{
        $t("pages.cancel")
      }}</b-button>
      <b-button variant="primary" @click="store()" class="mr-1">{{
        $t("pages.submit")
      }}</b-button>
    </template>
  </b-modal>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  components: {
    "v-select": vSelect
  },
  props: {
    categories: {
      type: Array,
      default: undefined
    },
    statuses: {
      type: Array,
      default: undefined
    },
    elt: {
      type: Object,
      default: undefined
    },
    editedIndex: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      emptyElt: {
        id: undefined,
        title: "",
        category: "",
        description: "",
        status: "",
        date: null
      }
    };
  },

  methods: {
    s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    },
    guid() {
      return (
        this.s4() +
        this.s4() +
        "-" +
        this.s4() +
        "-" +
        this.s4() +
        "-" +
        this.s4() +
        "-" +
        this.s4() +
        this.s4() +
        this.s4()
      );
    },
    store() {
      if (this.editedIndex < 0) {
        const today = new Date();
        this.$parent.$parent.items.unshift({
          ...this.elt,
          id: this.guid(),
          category: this.elt.category.value,
          date: `${today.getDate()}.${today.getMonth() +
            1}.${today.getFullYear()}`
        });
        this.$notify(
          "success",
          "Added",
          "Successfully added " + this.elt.title + " as a new product",
          {
            duration: 3000,
            permanent: false
          }
        );
      } else {
        const id = this.$parent.$parent.items.findIndex(
          item => item.id === this.editedIndex
        );
        this.$parent.$parent.items[id].title = this.elt.title
        this.$parent.$parent.items[id].description = this.elt.description
        this.$parent.$parent.items[id].status = this.elt.status
        this.$parent.$parent.items[id].category = this.elt.category.value
        this.$notify(
          "warning",
          "Edited",
          "Successfully edited that product",
          {
            duration: 3000,
            permanent: false
          }
        );
      }

      this.hideModal("modalright");
      this.$parent.$parent.editedIndex = -1
      this.$parent.$parent.editedElt = Object.assign({}, this.emptyElt)
    },
    hideModal(refname) {
      this.$parent.$parent.editedIndex = -1;
      this.$parent.$parent.editedElt = Object.assign({}, this.emptyElt);
      this.$refs[refname].hide();
    }
  }
};
</script>

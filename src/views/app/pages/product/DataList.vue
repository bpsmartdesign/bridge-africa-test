<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        :title="$t('menu.product')"
        :selectAll="selectAll"
        :isSelectedAll="isSelectedAll"
        :isAnyItemSelected="isAnyItemSelected"
        :keymap="keymap"
        :displayMode="displayMode"
        :changeDisplayMode="changeDisplayMode"
        :changeOrderBy="changeOrderBy"
        :changePageSize="changePageSize"
        :sort="sort"
        :searchChange="searchChange"
        :from="from"
        :to="to"
        :total="total"
        :perPage="perPage"
      ></list-page-heading>
      <template v-if="isLoad">
        <list-page-listing
          :displayMode="displayMode"
          :items="items"
          :selectedItems="selectedItems"
          :toggleItem="toggleItem"
          :lastPage="lastPage"
          :perPage="perPage"
          :page="page"
          :changePage="changePage"
          :handleContextMenu="handleContextMenu"
          :onContextMenuAction="onContextMenuAction"
        ></list-page-listing>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
      <add-new-modal :categories="categories" :statuses="statuses" :elt="editedElt" :editedIndex="editedIndex"></add-new-modal>
    </b-colxx>
  </b-row>
</template>

<script>
import axios from "axios";
import { apiUrl } from "../../../../constants/config";
import AddNewModal from "../../../../containers/pages/AddNewModal";
import ListPageHeading from "../../../../containers/pages/ListPageHeading";
import ListPageListing from "../../../../containers/pages/ListPageListing";

export default {
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
    "add-new-modal": AddNewModal
  },
  data() {
    return {
      isLoad: false,
      apiBase: apiUrl + "/cakes/fordatatable",
      displayMode: "list",
      sort: {
        column: "title",
        label: "Product Name"
      },
      categories: [
        {
          label: "Category 1",
          value: "Category 1"
        },
        {
          label: "Category 2",
          value: "Category 2"
        },
        {
          label: "Category 3",
          value: "Category 3"
        }
      ],
      statuses: [
        {
          text: "ON HOLD",
          value: "ON HOLD"
        },
        {
          text: "PROCESSED",
          value: "PROCESSED"
        }
      ],
      page: 1,
      perPage: 4,
      search: "",
      from: 0,
      editedIndex: -1,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [
        {
          id: 0,
          title: "dolore sint",
          date: "19.09.2021",
          category: "Category 1",
          status: "ON HOLD",
          description:
            "Labore proident voluptate deserunt et velit. Consequat occaecat officia fugiat sunt laboris labore amet nulla tempor excepteur qui excepteur Lorem est. Amet nostrud id officia ut irure ipsum in quis. Ipsum ut ipsum quis reprehenderit sit do nostrud aliqua duis reprehenderit pariatur ipsum. Velit ex ullamco esse veniam cillum.\r\n"
        }, {
          id: 7,
          title: "excepteur exercitation",
          date: "19.09.2021",
          category: "Category 2",
          status: "PROCESSED",
          description:
            "Ullamco proident reprehenderit occaecat occaecat consectetur duis pariatur sint anim commodo aliquip ad laboris. Fugiat ipsum amet officia excepteur labore duis laboris officia consequat reprehenderit ipsum tempor. Minim in eu veniam incididunt non voluptate laborum eu elit veniam. Quis laboris cupidatat nisi voluptate consequat id irure eiusmod cupidatat eiusmod. Incididunt id amet adipisicing aliquip ullamco sit aliquip. Occaecat veniam eu minim labore.\r\n"
        }, {
          id: 11,
          title: "irure do",
          date: "19.09.2021",
          category: "Category 1",
          status: "ON HOLD",
          description:
            "Pariatur reprehenderit quis Lorem sunt. Non exercitation irure magna irure quis culpa in incididunt consectetur veniam ullamco id. Laboris excepteur qui voluptate do reprehenderit duis dolore occaecat aliqua excepteur occaecat labore sint ex.\r\n"
        }, {
          id: 12,
          title: "proident cillum",
          date: "19.09.2021",
          category: "Category 3",
          status: "PROCESSED",
          description:
            "Aute ea do tempor ut nisi et. Magna laboris officia labore in velit mollit. Aliqua minim ea voluptate cillum fugiat consequat voluptate.\r\n"
        }
      ],
      selectedItems: [],
      editedElt: {
        id: undefined,
        title: "",
        category: "",
        description: "",
        status: "",
        date: null
      },
      newElt: {
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
    async loadItems() {
      this.total = this.items.length
      this.isLoad = true;
    },

    changeDisplayMode(displayType) {
      this.displayMode = displayType;
    },
    changePageSize(perPage) {
      this.page = 1;
      this.perPage = perPage;
    },
    changeOrderBy(sort) {
      this.sort = sort;
    },
    searchChange(val) {
      this.search = val;
      this.page = 1;
    },

    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map(x => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    toggleItem(event, itemId) {
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items;
        var start = this.getIndex(itemId, itemsForToggle, "id");
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id;
          })
        );
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x !== itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    handleContextMenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextMenuAction(action) {
      const id = this.selectedItems[0];
      switch (action) {
        case "delete":
          this.items = this.items.filter(ret => ret.id !== id);
          this.$notify("error", "Deleted", "Successfully deleted", {
              duration: 3000,
              permanent: false
          });
          break;
        case "edit":
          this.editedIndex = id
          this.editedElt = Object.assign({}, this.items.find(item => item.id === id))

          console.log(this.editedElt)
          this.$bvModal.show('modalright')
          break;
      }
    },
    changePage(pageNum) {
      this.page = pageNum;
    }
  },
  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    },
    apiUrl() {
      return `${this.apiBase}?sort=${this.sort.column}&page=${this.page}&per_page=${this.perPage}&search=${this.search}`;
    }
  },
  watch: {
    search() {
      this.page = 1;
    },
    apiUrl() {
      this.loadItems();
    }
  },
  mounted() {
    this.loadItems();
  }
};
</script>

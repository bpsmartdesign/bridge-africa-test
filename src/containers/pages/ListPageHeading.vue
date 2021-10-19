<template>
  <b-row>
    <b-colxx xxs="12">
      <h1>{{ title }}</h1>
      <div class="top-right-button-container">
        <b-button
          v-b-modal.modalright
          variant="primary"
          size="lg"
          class="top-right-button"
        >{{ $t('pages.add-new') }}</b-button>
      </div>
      <piaf-breadcrumb />
      <div class="mb-2 mt-2">
        <span class="text-muted primary mr-1 mb-2" style="background-color: #008ecc; color: #ffffff !important; font-style: italic, display: inline-block; border: solid .1px #008ecc; padding: 15px;">
          Right click on any data line to see available actions
        </span>
      </div>
      <div class="separator mb-5" />
    </b-colxx>
  </b-row>
</template>
<script>
import {
  DataListIcon,
  ThumbListIcon,
  ImageListIcon
} from "../../components/Svg";
import AddNewModal from "./AddNewModal";

export default {
  components: {
    "data-list-icon": DataListIcon,
    "thumb-list-icon": ThumbListIcon,
    "image-list-icon": ImageListIcon,
    "add-new-modal": AddNewModal
  },
  props: [
    "title",
    "selectAll",
    "isSelectedAll",
    "isAnyItemSelected",
    "keymap",
    "displayMode",
    "changeDisplayMode",
    "changeOrderBy",
    "changePageSize",
    "sort",
    "searchChange",
    "from",
    "to",
    "total",
    "perPage",
    "items"
  ],
  data() {
    return {
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
      sortOptions: [
        {
          column: "title",
          label: "Product Name"
        },
        {
          column: "category",
          label: "Category"
        },
        {
          column: "status",
          label: "Status"
        }
      ],
      pageSizes: [4, 8, 12]
    };
  }
};
</script>

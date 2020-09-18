<template>
  <li class="nav-sub-menu-item">
    <nav-menu-item
      v-if="!item.children || isChildrenHidden"
      :item="item"
      :is-first-layer="isFirstLayer"
      :hide-arrow="isChildrenHidden"
      :index="index"
      :min-width="minWidth"
      @close="closePopover"
    />
    <el-popover
      v-else
      :visible-arrow="false"
      :append-to-body="isFirstLayer ? appendToBody : false"
      :ref="`popover${indexPath.join('_')}`"
      :popper-class="`nav-menu-item-pop nav-menu-item-pop-${theme} ${isCollapsedMenu ? 'nav-overflowed-menu-item-pop' : ''}`"
      :disabled="item.disabled"
      :placement="isFirstLayer ? 'bottom-start' : 'right-start'"
      :trigger="trigger"
      :width="width ? width : 'auto'"
      @show="handleOpen"
      @hide="handleClose"
    >
      <ul class="nav-popover-menu">
        <slot>
          <nav-sub-menu-item
            v-for="(sItem, sIndex) in filterHide(item.children || [])"
            :item="sItem"
            :key="sIndex"
            :index="sIndex"
            :min-width="isFirstLayer ? width : minWidth"
            class="nav-popover-menu nav-sub-menu-item"
          >
            <!--  {{sItem}} -->
          </nav-sub-menu-item>
        </slot>
      </ul>
      <nav-menu-item
        slot="reference"
        :is-first-layer="isFirstLayer"
        :item="item"
        :sub-menu-hover="popoverHover"
      />
    </el-popover>
  </li>
</template>

<script>
import {
  Popover
} from 'element-ui';
import NavMenuItem from './nav-menu-item.vue';
import menuMixin from './menu-mixin';

export default {
  name: 'NavSubMenuItem',

  components: {
    [Popover.name]: Popover,
    NavMenuItem
  },

  mixins: [menuMixin],

  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: -1
    },
    isFirstLayer: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    minWidth: {
      type: Number,
      default: 0
    },
    isCollapsedMenu: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      popoverHover: false
    };
  },

  computed: {
    trigger() {
      return this.rootMenu.trigger;
    },
    appendToBody() {
      return this.rootMenu.appendToBody;
    },
    theme() {
      return this.rootMenu.theme;
    }
  },

  mounted() {
  },

  methods: {
    handleOpen() {
      if (!this.item.disabled) {
        this.rootMenu.handleOpen(this.item, this.index, this.indexPath);
        this.popoverHover = true;
      }
    },

    handleClose() {
      if (!this.item.disabled) {
        this.rootMenu.handleClose(this.item, this.index, this.indexPath);
        this.popoverHover = false;
      }
    },

    closePopover() {
      var parent = this.$parent;
      while (
        parent &&
        parent.$options.name !== 'NavBar'
      ) {
        parent = parent.$parent;
        if (parent.$options.name !== 'NavSubMenuItem') {
          continue;
        }
        // console.log(parent, 'close', parent.$refs[`popover${parent.indexPath.join('_')}`], parent.indexPath.join('_'))
        parent.$refs[`popover${parent.indexPath.join('_')}`].doClose();
      }
    }
  }
};
</script>

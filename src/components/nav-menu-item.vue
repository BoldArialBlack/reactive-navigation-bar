<template>
  <div
    :class="{
      'is-active': getIsActive(item) || childrenActive([item]),
      'current-active': getIsActive(item),
      'disabled': item.disabled,
      'nav-bar-menu-item': isFirstLayer,
      'nav-bar-overflowed-menu-item': isOverflowed,
      'sub-menu-hover': subMenuHover
    }"
    :style="{
      'min-width': minWidth ? minWidth + 'px' : ''
    }"
    class="nav-menu-item"
  >
    <a
      :href="item.path && isChildrenHidden ? path : 'javascript:void(0)'"
      :style="{
        'line-height': isFirstLayer ? barHeight : menuHeight,
        'height': isFirstLayer ? barHeight : menuHeight
      }"
      class="nav-menu-item__link"
      @click="handleClick($event)"
      @mouseover="isEllipsisActive($event)"
    >
      <!-- :title="item.disabled ? item.title : ''" -->
      <span class="nav-menu-item__title">
        <i
          v-if="item.icon"
          :class="item.icon"
          class="nav-menu-item__icon"
        />
        <span class="nav-menu-item__text">{{ item.title }}</span>
      </span>
      <i
        v-if="showArrow"
        :class="isFirstLayer ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
        class="nav-menu-submenu-arrow"
      />
    </a>
  </div>
</template>

<script>
import menuMixin from './menu-mixin';

export default {
  name: 'NavMenuItem',

  components: {
  },

  mixins: [menuMixin],

  props: {
    isFirstLayer: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: -1
    },
    hideArrow: {
      type: Boolean,
      default: false
    },
    subMenuHover: {
      type: Boolean,
      default: false
    },
    minWidth: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      location: window.location.href.split('#')[1]
    };
  },

  computed: {
    isRoute() {
      return this.rootMenu.routeMode;
    },
    isActive() {
      return (!this.isRoute && (this.rootMenu.defaultActive || this.rootMenu.activeIndex || (this.$route && this.$route.path))) ||
        (this.$route && this.$route.path);
    },
    isHash() {
      return (this.$router && this.$router.mode === 'hash') || !this.$router;
    },
    path() {
      const {
        isHash,
        item
      } = this;
      const isHttp = /^http(s)?:\/\//.test(item.path);
      return isHash && !isHttp ? `#${item.path}` : item.path;
    },
    showArrow() {
      let rootArrow = this.rootMenu.arrow;
      const { item, hideArrow, isOverflowed, isFirstLayer } = this;
      return !(isFirstLayer && !rootArrow) &&
        item.children &&
        !item.disabled &&
        !hideArrow &&
        !isOverflowed;
    },
    isOverflowed() {
      return this.item.type === 'overflowed';
    },
    barHeight() {
      const height = this.rootMenu.barHeight;
      return typeof height === 'string' ? height : `${height}px`;
    },
    menuHeight() {
      const height = this.rootMenu.menuHeight;
      return typeof height === 'string' ? height : `${height}px`;
    },
    rootIndex() {
      return this.rootMenu.rootIndex;
    }
  },

  methods: {
    getIsActive(item) {
      if (!item) return false;
      // console.log(this.isActive, this.rootIndex, 'getIsActive')
      return (item.path && this.isActive === item.path && item.path !== this.rootIndex) ||
        (item.meta && item.meta.index && item.meta.index === this.isActive);
    },

    handleSelect(ev) {
      this.rootMenu.handleSelect(this.item, this.index, this.indexPath, ev);
      if (!this.isFirstLayer && !this.item.children) {
        this.$emit('close');
      }
    },

    handleClick(ev) {
      const { item } = this;
      if (item.disabled) {
        ev.preventDefault();
        return false;
      };
      this.handleSelect(ev);
    },

    isEllipsisActive(e) {
      let target = e.target;
      if (target.offsetWidth < target.scrollWidth) {
        target.title = this.item.title;
      }
    },

    childrenActive(menus) {
      if (menus && menus.length) {
        let active = false;
        menus.some(item => {
          if (this.getIsActive(item) && item.type !== 'overflowed') {
            active = true;
            return true;
          }

          if (item.children && item.children.length) {
            active = this.childrenActive(item.children);
            if (active) return true;
          }
        });
        return active;
      } else {
        return false;
      }
    }
  }
};
</script>

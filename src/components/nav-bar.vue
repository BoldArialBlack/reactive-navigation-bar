<template>
  <div
    :class="`nav-bar-${theme}`"
    :style="{width: navWidth}"
    class="nav-bar"
  >
    <div
      ref="content"
      class="nav-bar-content">
      <ul class="nav-menu-list">
        <!-- <nav-sub-menu-item
          v-for="(menu, index) in menus"
          :key="index"
          :item="menu"
          :index="index"
          is-first-layer
          class="nav-menu"
          :class="{
            'show-active-background': barBackgroundActive,
            'show-underline': underline
          }"
        /> -->
        <!-- <nav-menu
          ref="mainMenu"
          :menus="menus"
          :class="{
            'show-active-background': barBackgroundActive,
            'show-underline': underline
          }"
        />
        <nav-menu
          v-if="collapsed"
          :menus="[moreMenu]"
          :index="menus.length"
          :class="{
            'show-active-background': barBackgroundActive,
            'show-underline': underline
          }"
          is-collapsed-menu
        /> -->
        <nav-sub-menu-item
          v-for="(menu, index) in menus"
          :ref="`menu${index}`"
          :key="index"
          :item="menu"
          :index="index"
          :class="{
            'show-active-background': barBackgroundActive,
            'show-underline': underline
          }"
          :width="widthIndex[index]"
          is-first-layer
          class="nav-menu"
        />
        <nav-sub-menu-item
          v-if="collapsed"
          :key="key"
          :item="moreMenu"
          :index="menus.length"
          :class="{
            'show-active-background': barBackgroundActive,
            'show-underline': underline
          }"
          is-first-layer
          class="nav-menu"
        />
        <!-- <nav-menu
          v-for="(menu, index) in menus"
          :key="index"
          :item="menu"
          :index="index"
          :menuKey="menuKey"
        />
        <nav-menu
          v-if="collapsed"
          :key="key"
          :item="moreMenu"
          :index="menus.length"
        /> -->
      </ul>
    </div>
  </div>
</template>

<script>
import cssVarPoly from './css-var-polyfill';

import NavSubMenuItem from './nav-sub-menu-item.vue';
import menuMixins from './menu-mixin';

const overflowedTemplate = {
  hide: false,
  icon: 'el-icon-more',
  type: 'overflowed'
};

export default {
  name: 'NavBar',

  components: {
    NavSubMenuItem,
  },

  mixins: [menuMixins],

  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    defaultActive: {
      type: String,
      default: null
    },
    routeMode: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'click'
    },
    theme: {
      type: String,
      default: 'light'
    },
    themeColor: {
      type: String,
      default: '#1890ff'
    },
    backgroundColor: {
      type: String,
      default: '#1890ff1a'
    },
    barBackgroundColor: {
      type: String,
      default: '#fff'
      // default: '#141f2e'
    },
    align: {
      type: String,
      default: 'fluid' // 'fixed' or 'fluid'
    },
    width: {
      type: [Number, String],
      default: null
    },
    arrow: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    barBackgroundActive: {
      type: Boolean,
      default: true
    },
    underline: {
      type: Boolean,
      default: false
    },
    barHeight: {
      type: [String, Number],
      default: 56
    },
    menuHeight: {
      type: [String, Number],
      default: 32
    },
    rootIndex: {
      type: String,
      default: null
    },
    debounce: {
      type: Number,
      default: 300
    },
    strictAlign: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      activeIndex: this.defaultActive,
      menus: [],
      moreMenu: {},
      collapsed: false,
      collapsedMenu: [],
      key: 10000,
      background: this.backgroundColor,
      widthIndex: []
    };
  },

  computed: {
    navWidth() {
      const { width } = this;
      if (!width) {
        return '100%';
      };
      return typeof width === 'string' ? width : `${width}px`;
    },
    defaultMenus() {
      return this.filterHide(this.data);
    }
  },

  watch: {
    data(val, old) {
      this.menus = this.defaultMenus;
      this.$nextTick(() => {
        this.onWindowResize();
      });
    },
    collapsedMenu(val, old) {
      if (JSON.stringify(val) !== JSON.stringify(old)) {
        this.moreMenu = overflowedTemplate;
        this.moreMenu.children = val;
        this.key++;
      }
    },
    theme(val) {
      if (val === 'light') {
        this.background = this.backgroundColor;
      } else {
        this.background = '#24292e';
      }
      this.setBackgroundColor(this.background);
    },
    themeColor(val) {
      if (val) {
        this.setThemeColor(val);
      }
    },
    backgroundColor(val) {
      if (val) {
        this.setBackgroundColor(val);
      }
    },
    barBackgroundColor(val) {
      if (val) {
        this.setBarBackgroundColor(val);
      }
    },
    menus(val, old) {
      if (!this.strictAlign || JSON.stringify(val) === JSON.stringify(old)) return;
      this.$nextTick(() => {
        val.forEach((item, index) => {
          let el = this.$refs[`menu${index}`][0].$el.querySelector('.nav-bar-menu-item');
          this.$set(this.widthIndex, index, el.offsetWidth);
        });
      });
    }
  },

  created() {
  },

  mounted() {
    this.menus = this.defaultMenus;
    if (this.align === 'fluid') {
      window.addEventListener('resize', this.onWindowResize);
      this.$nextTick(() => {
        setTimeout(() => {
          this.onWindowResize();
        }, this.debounce);
      });
    }

    if (this.theme === 'dark') {
      this.background = '#24292e';
    }

    this.setThemeColor(this.themeColor);
    this.setBackgroundColor(this.background);
    this.setBarBackgroundColor(this.barBackgroundColor);

    this.init();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },

  methods: {
    init() {
      cssVarPoly.init();

      // 页面跳转兼容ie
      function checkIE() {
        return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
      }

      if (checkIE()) {
        window.addEventListener('hashchange', () => {
          var currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath);
          }
        }, false);
      }
    },
    handleSelect(item, index, indexPath) {
      if (item.path) this.activeIndex = item.path;
      this.$emit('select', item, index, indexPath);
    },

    handleOpen(item, index, indexPath) {
      this.$emit('open', item, index, indexPath);
    },

    handleClose(item, index, indexPath) {
      this.$emit('close', item, index, indexPath);
    },

    setThemeColor(color) {
      document.documentElement.style.setProperty('--THEME-COLOR', color);
      cssVarPoly.updateVars({
        '--THEME-COLOR': this.themeColor,
        '--BACKGROUND-COLOR': this.background,
        '--BAR-BACKGROUND-COLOR': this.barBackgroundColor
      });
    },

    setBackgroundColor(color) {
      document.documentElement.style.setProperty('--BACKGROUND-COLOR', color);
      cssVarPoly.updateVars({
        '--THEME-COLOR': this.themeColor,
        '--BACKGROUND-COLOR': this.background,
        '--BAR-BACKGROUND-COLOR': this.barBackgroundColor
      });
    },

    setBarBackgroundColor(color) {
      document.documentElement.style.setProperty('--BAR-BACKGROUND-COLOR', color);
      cssVarPoly.updateVars({
        '--THEME-COLOR': this.themeColor,
        '--BACKGROUND-COLOR': this.background,
        '--BAR-BACKGROUND-COLOR': this.barBackgroundColor
      });
    },

    onWindowResize() {
      let innerWidth = this.$refs.content.offsetWidth;
      let menus = this.$refs.content.querySelectorAll('.nav-bar-menu-item:not(.nav-bar-overflowed-menu-item)');
      let widthCount = 0;

      this.collapsedMenu = [];
      this.collapsed = false;

      for (let i = 0; i < menus.length; i++) {
        widthCount += menus[i].offsetWidth;

        //  宽度超出容器时
        //  当菜单尚未加载完并且空余空间不足
        if (widthCount > innerWidth ||
          (i !== menus.length - 1 && widthCount > innerWidth - 60)) {
          this.collapsedMenu.push(this.menus[i]);
          this.collapsed = true;
          menus[i].style.visibility = 'hidden';
          menus[i].style.position = 'absolute';
          continue;
        }
        menus[i].style.visibility = 'visible';
        menus[i].style.position = 'relative';
      }
    }
  }
};
</script>

export const sourcecodeA = `<template>
  <div class="vd-demo__block vd-demo__block-2">
    <div style="margin-bottom: 16px">
      <el-button @click="toggle">主题切换</el-button>
      <el-button @click="toggleColor">toggleColour</el-button>
    </div>
    <div style="display: flex">
      <div style="flex: 1">
        <reactive-navigation-bar
          :theme="theme"
          :data="dataList"
          :theme-color="color"
          width="calc(100% - 100px)"
        />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        theme: 'light',
        dataList: [],
        color: '#1890ff'
      }
    },
    mounted() {
      this.dataList = [
        {
          title: 'Dashboard',
          hide: false,
          path: '1',
          icon: 'el-icon-s-tools',
          children: [
            {
              title: '分析页',
              hide: false,
              icon: 'el-icon-star-off',
              path: '1.1',
              disabled: true
            },
            {
              title: '监控页',
              icon: 'el-icon-s-operation',
              path: '1.2',
              hide: false
            },
            {
              title: '工作台',
              icon: 'el-icon-s-cooperation',
              path: '1.3',
              hide: false
            }
          ]
        },
        {
          title: '表单页',
          hide: false,
          icon: 'el-icon-s-order',
          children: [
            {
              title: '数据管理对象长长长长长长长',
              hide: false,
              path: '2.1',
              children: [{
                title: '数据管理对象长长长长长长长',
                hide: false,
                path: '2.1.1'
              }]
            },
            {
              title: '分步表单',
              hide: false,
              path: '2.2',
              children: [{
                title: '数据管',
                hide: false,
                path: '2.2.1'
              }]
            },
            {
              title: '高级表单',
              hide: false,
              path: '2.3'
            }
          ]
        },
        {
          title: '列表页',
          hide: false,
          path: '3',
          icon: 'el-icon-s-platform'
        },
        {
          title: '搜索列表',
          hide: false,
          path: '4.1',
          icon: 'el-icon-search',
          children: [
            {
              title: '搜索列表(文章)',
              hide: false,
              path: '4.1.1'
            },
            {
              title: '搜索列表(应用)',
              hide: false,
              disabled: true,
              path: '4.1.2'
            },
            {
              title: '搜索列表(项目)',
              hide: false,
              path: '4.1.3'
            }
          ]
        },
        {
          title: '详情页',
          hide: false,
          disabled: true,
          path: '5',
          icon: 'el-icon-s-claim'
        }
      ];
    },
    methods: {
      toggleColor() {
        if (this.color === '#ffd04b') {
          this.color = '#1890ff';
        } else {
          this.color = '#ffd04b';
        }
      },
      toggle() {
        if (this.theme === 'light') {
          this.theme = 'dark';
        } else {
          this.theme = 'light';
        }
      }
    }
  }
</script>`

export const sourcecodeB = `<template>
<div class="vd-demo__block vd-demo__block-2">
  <div style="display: flex">
    <div style="flex: 1">
      <reactive-navigation-bar
        v-bind="navProps"
      />
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [],
    }
  },

  computed: {
    active() {
      return this.$route && this.$route.meta && this.$route.meta.active;
    },
    navProps() {
      const {
        dataList,
        active
      } = this;
      return {
        data: dataList,
        trigger: 'hover',
        arrow: false,
        defaultActive: active,
        barBackgroundActive: true
      };
    }
  },

  mounted() {
    this.dataList = [
      {
        title: 'Dashboard',
        hide: false,
        path: '1',
        icon: 'el-icon-s-tools',
        children: [
          {
            title: '分析页',
            hide: false,
            icon: 'el-icon-star-off',
            path: '1.1',
            disabled: true
          },
          {
            title: '监控页',
            icon: 'el-icon-s-operation',
            path: '1.2',
            hide: false
          },
          {
            title: '工作台',
            icon: 'el-icon-s-cooperation',
            path: '1.3',
            hide: false
          }
        ]
      },
      {
        title: '表单页',
        hide: false,
        icon: 'el-icon-s-order',
        children: [
          {
            title: '数据管理对象长长长长长长长',
            hide: false,
            path: '2.1',
            children: [{
              title: '数据管理对象长长长长长长长',
              hide: false,
              path: '2.1.1'
            }]
          },
          {
            title: '分步表单',
            hide: false,
            path: '2.2',
            children: [{
              title: '数据管',
              hide: false,
              path: '2.2.1'
            }]
          },
          {
            title: '高级表单',
            hide: false,
            path: '2.3'
          }
        ]
      },
      {
        title: '列表页',
        hide: false,
        path: '3',
        icon: 'el-icon-s-platform'
      },
      {
        title: '搜索列表',
        hide: false,
        path: '4.1',
        icon: 'el-icon-search',
        children: [
          {
            title: '搜索列表(文章)',
            hide: false,
            path: '4.1.1'
          },
          {
            title: '搜索列表(应用)',
            hide: false,
            disabled: true,
            path: '4.1.2'
          },
          {
            title: '搜索列表(项目)',
            hide: false,
            path: '4.1.3'
          }
        ]
      },
      {
        title: '详情页',
        hide: false,
        disabled: true,
        path: '5',
        icon: 'el-icon-s-claim'
      }
    ];
  }
}
</script>`

export const sourcecodeC = `<template>
<div class="vd-demo__block vd-demo__block-2">
  <reactive-navigation-bar
    v-model="filter"
    :options="filterOptions"
    disabled
    @change="handleFilter"
  />
</div>
</template>

<script>
  export default {
    data () {
      return {
        filter: '',
        filterOptions: [{
          label: '公开项',
          value: 'public',
          disabled: true
        }, {
          label: '未公开项',
          value: 'private'
        }, {
          label: '租户内',
          value: 'within'
        }, {
          label: '租户外',
          value: 'outside',
          className: 'class-name-test'
        }]
      }
    },
    methods: {
      handleFilter(value) {
        console.log(value);
      }
    }
  }
</script>`

export const sourcecodeD = `<template slot="source">
<div class="vd-demo__block vd-demo__block-2">
  <reactive-navigation-bar
    v-model="filter"
    :options="filterOptions"
    @change="handleFilter"
  >
    筛选
  </reactive-navigation-bar>
</div>
</template>
<script>
  export default {
    data () {
      return {
        filter: '',
        filterOptions: [{
          label: '公开项',
          value: 'public',
          disabled: true
        }, {
          label: '未公开项',
          value: 'private'
        }, {
          label: '租户内',
          value: 'within'
        }, {
          label: '租户外',
          value: 'outside',
          className: 'class-name-test'
        }]
      }
    },
    methods: {
      handleFilter(value) {
        console.log(value);
      }
    }
  }
</script>`

export const sourcecodeE = `<template>
  <div class="vd-demo__block vd-demo__block-2">
    <reactive-navigation-bar
      v-model="filter"
      :options="filterOptions"
      :render-content="renderContent"
      @change="handleFilter"
    />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        filter: '',
        filterOptions: [{
          label: '公开项',
          value: 'public',
          disabled: true
        }, {
          label: '未公开项',
          value: 'private'
        }, {
          label: '租户内',
          value: 'within'
        }, {
          label: '租户外',
          value: 'outside',
          className: 'class-name-test'
        }]
      }
    },
    methods: {
      handleFilter(value) {
        console.log(value);
      },
      renderContent(h, data) {
        return (<span>自定义渲染_{data.label}</span>);
      }
    }
  }
</script>
`
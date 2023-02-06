<template>
  <div class="elTreeContainer pageMain">
    <div class="pageTitle">el-tree树形控件</div>
    <div class="pageContent">
      <el-input v-model="keyword" size="small" placeholder="输入关键字" clearable/>
      <div class="header">
        <el-checkbox v-model="childChecked">同步选中子部门</el-checkbox>
        <el-checkbox v-model="draggable">是否可以拖拽</el-checkbox>
        <el-checkbox v-model="showCheckbox">是否显示勾选框</el-checkbox>
      </div>
      <el-tree
        :filter-node-method="filterNode"
        :data="list"
        :show-checkbox="showCheckbox"
        :check-strictly="true"
        :draggable="draggable"
        node-key="id"
        default-expand-all
        @check="check"
        ref="tree" />
    </div>
  </div>
</template>
<script>
  export default {
    watch: {
      keyword(val) {
        this.$nextTick(() => {
          this.$refs.tree.filter(val)
        })
      }
    },
    data() {
      return {
        keyword: '',
        childChecked: true,
        draggable: false,
        showCheckbox: true,
        list: [{
          label:'腾讯集团',
          id:0,
          children:[{
          id: 1,
          label: '财务部',
          children: [{
            id: 11,
            label: '张三'
          }, {
            id: 12,
            label: '李四'
          }]
        }, {
          id: 2,
          label: '研发部',
          children: [{
            id: 21,
            label: '前端',
            children: [{
              id: 211,
              label: '王五'
            }, {
              id: 212,
              label: '赵六'
            }]
          }, {
            id: 22,
            label: '后端',
            children: [{
              id: 221,
              label: '陈七'
            }, {
              id: 222,
              label: '宋八'
            }]
          }]
        }]
        }],
        checkedList: []
      }
    },
    methods: {
      //搜索节点
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) > -1
      },
      //勾选某一项
      check(node, data) {
        if (this.childChecked) {
          if (node.children) {
            let boolean = data.checkedKeys.includes(node.id)
            this.setChild(node.children, boolean)
          }
          this.getCheck(this.$refs.tree.getCheckedNodes())
        } else {
          this.getCheck(data.checkedNodes)
        }
      },
      //遍历子节点
      setChild(array, boolean) {
        array.forEach(item => {
          this.$refs.tree.setChecked(item.id, boolean)
          if (item.children) {
            this.setChild(item.children, boolean)
          }
        })
      },
      //输出勾选的项
      getCheck(array) {
        this.checkedList = array.map(item => {
          return {
            id: item.id,
            label: item.label
          }
        })
      },
      //初始化设置默认勾选项
      init(){
        this.$refs.tree.setCheckedKeys([1,21])
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style lang="scss">
  .elTreeContainer {
    .pageContent {
      .el-input {
        margin-bottom: 16px;
        width: 200px;
      }
      .header {
        margin-bottom: 16px;
      }
      .el-tree__empty-block{
        min-height: 300px;
      }
    }
  }
</style>

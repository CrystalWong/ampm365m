<template>
<div>
  <mu-appbar>
    <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
    <mu-flat-button color="white" label="go" slot="right"/>
  </mu-appbar>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
.appbar-search-field{
  color: #FFF;
  margin-bottom: 0;
  &.focus-state {
    color: #FFF;
  }
  .mu-text-field-hint {
    color: fade(#FFF, 54%);
  }
  .mu-text-field-input {
    color: #FFF;
  }
  .mu-text-field-focus-line {
    background-color: #FFF;
  }
}
.navbar {
  position: fixed;
  width: 100%;
  bottom: 0;
  max-width: 750px;
}
</style>

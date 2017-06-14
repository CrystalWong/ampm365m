<template>
<div>
  <mu-appbar>
    <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
    <mu-flat-button color="white" label="go" slot="right"/>
  </mu-appbar>
  <mu-paper class="navbar">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video"/>
      <mu-bottom-nav-item value="music" title="Music" icon="music_note"/>
      <mu-bottom-nav-item value="books" title="Books" icon="books"/>
      <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"/>
    </mu-bottom-nav>
  </mu-paper>

</div>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'movies',
      bottomNavColor: 'movies'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
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
}
</style>

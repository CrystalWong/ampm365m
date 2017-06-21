<template>
<div>
  <mu-paper class="navbar">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video" to="/Spreadactive"/>
      <mu-bottom-nav-item value="music" title="Music" icon="music_note" to="/luckydraw"/>
      <mu-bottom-nav-item value="books" title="Books" icon="books" to="/coupon"/>
      <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo" to="/Receivecoupons"/>
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

<style lang="less" scoped>
.navbar {
  position: fixed;
  width: 100%;
  bottom: 0;
  max-width: 750px;
}
</style>

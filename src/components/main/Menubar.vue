<template>
  <div>
    <button class="mint-button mint-button--default mint-button--large" @click="openPicker">
      <label class="mint-button-text">点击弹出 DateTime Picker</label>
    </button>
    <mt-datetime-picker
      ref="picker"
      type="time"
      v-model="pickerValue">
    </mt-datetime-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        'pickerValue': '12:00'
      }
    },
    created () {
      // this.$refs.picker.open()
    },
    methods: {
      openPicker () {
        this.$refs.picker.open()
      }
    }
  }
</script>

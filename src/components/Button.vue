<template>
  <button
    v-text="buttonText"
    @click.prevent="onClick()"
  />
</template>

<script>

export default {
  props: {
    onClick: {
      type: Function,
      default: () => '',
    },
    buttonText: {
      type: String,
      default: 'Button',
    },
  },
}
</script>

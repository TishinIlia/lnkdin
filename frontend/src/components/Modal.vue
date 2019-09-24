<template>
  <div class="modal" :class="active ? 'active' : ''" id="modal-id">
    <a href="#" @click.prevent="close" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-container" style="padding: 0">
      <div class="modal-header bg-primary">
        <a href="#" @click.prevent="close" class="btn btn-clear float-right text-light" aria-label="Close"></a>
        <div class="modal-title h5 text-light">{{title}}</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <slot></slot>
        </div>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    active: {
      default: false,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    loading: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    close () {
      if (this.loading) return
      this.$emit('close', false)
    }
  }
}
</script>

<template>
  <Modal title="Add persons" :active="active" @close="close($event)">
    <div class="empty">
      <div class="empty-icon">
        <i class="icon icon-people icon-4x"></i>
      </div>
      <p class="empty-title h5">You have no new messages</p>
      <p class="empty-subtitle">Click the button to start a conversation.</p>
      <div class="empty-action">
        <button class="btn btn-primary" v-show="!addSingleProfile" @click="openSingleProfile">Add one</button>
        <div class="input-group" v-show="addSingleProfile">
          <span class="input-group-addon">https://www.linkedin.com/in/</span>
          <input class="form-input" type="text" v-model="singleProfile" placeholder="Profile">
          <button class="btn btn-primary input-group-btn" @click="uploadSingle" :disabled="!this.singleProfile > 0">Add</button>
        </div>
      </div>
      <div class="empty-action">
        <input type="file" ref="upload" accept=".cvs" class="add-file__input" @input="uploadCVS">
        <button class="btn btn-primary" @click="openUploadModal">Upload CVS <i class="icon icon-upload"></i></button>
      </div>
    </div>
    <template slot="footer">
      <button @click="close(false)" class="btn btn-primary">Close</button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
export default {
  name: 'AddModal',
  components: {
    Modal
  },
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      addSingleProfile: false,
      singleProfile: ''
    }
  },
  methods: {
    close (event) {
      this.$emit('close', event)
    },
    openUploadModal () {
      this.$refs.upload.click()
    },
    uploadSingle () {
      if (this.singleProfile.length > 0) {
        console.log(this.singleProfile)
        this.$notify({ type: 'toast-success', text: `Profile successfully uploaded` })
        this.singleProfile = ''
        this.closeSingleProfile()
      }
    },
    uploadCVS (event) {
      console.log(event.target.files[0])
      const file = event.target.files[0]
      this.$notify({ type: 'toast-success', text: `${file.name} successfully uploaded` })
      this.$refs.upload.value = ''
      this.close(false)
    },
    openSingleProfile () {
      this.addSingleProfile = true
    },
    closeSingleProfile () {
      this.addSingleProfile = false
    }
  }
}
</script>

<style lang="scss">
  .add-file__input {
    display: none;
  }
</style>

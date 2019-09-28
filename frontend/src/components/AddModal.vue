<template>
  <Modal title="Add persons" :active="active" @close="close($event)" :loading="loading">
    <div class="empty">
      <div class="empty-action">
        <button class="btn btn-primary" v-show="!addSingleProfile" @click="openSingleProfile">Add one</button>
        <div class="input-group" v-show="addSingleProfile">
          <span class="input-group-addon">https://www.linkedin.com/in/</span>
          <input class="form-input" type="text" v-model="singleProfile" placeholder="Profile">
          <button class="btn btn-primary input-group-btn" @click="uploadSingle" :disabled="!this.singleProfile > 0">Add</button>
        </div>
      </div>
      <div class="empty-action">
        <input type="file" ref="upload" name="csvFile" accept=".csv" class="add-file__input" @input="uploadCVS">
        <button class="btn btn-primary" @click="openUploadModal">Upload CSV <i class="icon icon-upload"></i></button>
      </div>
      <div class="loading loading-lg" v-show="loading"></div>
    </div>
    <template slot="footer">
      <button @click="close(false)" class="btn btn-primary" :disabled="loading">Close</button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import Papa from 'papaparse'
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
      loading: false,
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
      if (this.singleProfile.length === 0) return
      this.loading = true
      const profile = {
        url: this.singleProfile
      }
      fetch('http://localhost:3012/profiles/', {
        method: 'POST',
        body: JSON.stringify(profile),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      })
        .then(res => {
          if (!res.ok) throw new Error('Upload profile failed')
          this.$notify({ type: 'toast-success', text: `Profile successfully uploaded` })
          this.$emit('update')
        })
        .catch(err => {
          this.$notify({ type: 'toast-error', text: err })
        })
        .then(() => {
          this.loading = false
        })
      this.singleProfile = ''
      this.closeSingleProfile()
    },
    uploadCVS (event) {
      this.loading = true
      const file = event.target.files[0]
      Papa.parse(file,
        {
          complete: (data) => {
            const results = data.data.map(item => {
              return { url: item[0] }
            })
            fetch('http://localhost:3012/profiles/csv', {
              method: 'POST',
              body: JSON.stringify(results),
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'same-origin'
            })
              .then(res => {
                if (!res.ok) throw new Error('Upload CSV file failed')
                this.$notify({ type: 'toast-success', text: `CSV ${file.name} successfully uploaded` })
                this.$refs.upload.value = ''
                this.$emit('update')
                this.close(false)
              })
              .catch(err => {
                this.$notify({ type: 'toast-error', text: err })
              })
              .then(() => {
                this.loading = false
              })
          },
          skipEmptyLines: true
        })
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

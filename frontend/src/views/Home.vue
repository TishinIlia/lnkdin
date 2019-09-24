<template>
  <div>
    <header class="header">
      <div class="container grid-xl navbar">
        <section class="navbar-section">
          <button class="btn btn-primary" @click="openAddModal">Add Profiles</button>
        </section>
      </div>
    </header>
    <main>
      <div class="container grid-xl">
        <section class="profiles">
          <div v-if="loading">
            <div class="loading loading-lg"></div>
          </div>
          <div v-else>
            <div v-if="profiles.length === 0">
              <div class="empty">
                <p class="empty-subtitle h3">Let's add profiles</p>
                <div class="empty-action">
                  <button class="btn btn-primary" @click="openAddModal">Add</button>
                </div>
              </div>
            </div>
            <article class="table" v-else>
              <table class="table table-striped table-hover">
                <thead>
                <tr>
                  <th>LinkedIn</th>
                  <th>Date of update</th>
                  <th></th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in profiles" :key="item._id">
                  <td>{{item.url}}</td>
                  <td>{{item.date | date}}</td>
                  <td><i class="icon icon-refresh text-primary"></i></td>
                  <td><i class="icon icon-cross text-error" @click="deleteProfile(item._id)"></i></td>
                </tr>
                </tbody>
              </table>
            </article>
          </div>
        </section>
      </div>
    </main>
    <AddModal :active="addModal" @close="closeAddModal($event)" @update="addModalEmitUpdate"></AddModal>
  </div>
</template>

<script>
import AddModal from '@/components/AddModal'
export default {
  name: 'home',
  components: {
    AddModal
  },
  data () {
    return {
      addModal: false,
      profiles: [],
      loading: false
    }
  },
  beforeMount () {
    this.getProfiles()
  },
  methods: {
    openAddModal () {
      this.addModal = true
    },
    closeAddModal (event) {
      this.addModal = event
    },
    addModalEmitUpdate () {
      this.getProfiles()
    },
    getProfiles () {
      this.loading = true
      fetch('http://localhost:3012/profiles/', { credentials: 'same-origin' })
        .then(res => {
          if (!res.ok) throw new Error('Loading error')
          return res.json()
        })
        .then(data => {
          this.profiles = data
        })
        .catch(err => {
          this.$notify({ type: 'toast-error', text: `${err}` })
        })
        .then(() => {
          this.loading = false
        })
    },
    deleteProfile (id) {
      this.loading = true
      fetch('http://localhost:3012/profiles/', {
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      })
        .then(res => {
          if (!res.ok) throw new Error('Deleting error')
          this.$notify({ type: 'toast-success', text: `Profile was deleted successfully` })
          this.getProfiles()
        })
        .catch(err => {
          this.$notify({ type: 'toast-error', text: `${err}` })
        })
        .then(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
  @import "~spectre.css/src/spectre";
  @import "~spectre.css/src/spectre-exp";
  @import "~spectre.css/src/spectre-icons";

  .header {
    padding: 1rem 0;
    border-bottom: 1px solid $dark-color;
  }
  .profiles {
    padding: 3rem;
  }
</style>

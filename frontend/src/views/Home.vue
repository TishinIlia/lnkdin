<template>
  <div>
    <header class="header">
      <div class="container grid-xl navbar">
        <section class="navbar-section">
          <button class="btn btn-link" @click="openAddModal">Add</button>
          <button class="btn btn-link">2</button>
          <button class="btn btn-link">3</button>
        </section>
        <section class="navbar-section">
          <div class="input-group input-inline">
            <input class="form-input" type="text" placeholder="Search contact" title="Search contact">
            <button class="btn btn-primary input-group-btn">Search</button>
          </div>
        </section>
      </div>
    </header>
    <main>
      <section></section>
    </main>
    <footer>Footer</footer>
    <AddModal :active="addModal" @close="closeAddModal($event)"></AddModal>
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
      addModal: false
    }
  },
  methods: {
    openAddModal () {
      this.addModal = true
    },
    closeAddModal (event) {
      this.addModal = event
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
</style>

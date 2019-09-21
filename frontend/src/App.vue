<template>
  <div id="app">
    <router-view/>
    <notifications class="mr-2" :duration="5000">
      <template slot="body" slot-scope="props">
        <div class="toast mt-2" :class="props.item.type">
          <button class="btn btn-clear float-right" @click="props.close"></button>
          <div v-html="props.item.text"></div>
        </div>
      </template>
    </notifications>
  </div>
</template>

<style lang="scss">

</style>

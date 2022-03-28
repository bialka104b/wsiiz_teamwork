<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div>
    <div class="bodyContainer">
        <header class="header">
            <div class="row bg-white headerRow">
                <div class="col-6 logoContainer fw-bold">LOGO</div>
                <nav class="col-6 d-flex justify-content-between">
                    <div class="navLink">
                        <a href="" class="d-block fw-bold">Zakładka1</a>
                    </div>
                    <div class="navLink">
                        <a href="" class="d-block fw-bold">Zakładka2</a>
                    </div>
                    <div class="navLink">
                        <a href="" class="d-block fw-bold">Zakładka3</a>
                    </div>
                </nav>
            </div>
            <div class="container titlePage">
                <h3>Wylicz kalorie i zadbaj o swoje zdrowie</h3>
                <h1>BEST CALCULATOR</h1>
                <p>Węglowodany, kalorie, białka, IG</p>
                <button class="btn btn-primary calc mt-4">Przelicz</button>
            </div>
        </header>
        <main>
            <section></section>
        </main>
        <footer></footer>
    </div>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
  </div>
</template>

<script>
import axios from 'axios';
export default{
  name: 'app',
  data(){
    return {
      result: []
    }
  },
  created(){
    this.getProducts();
  }, 
  methods: {
      async getProducts() {
        await axios.get(`http://localhost:4000/api/products`)
                .then(res => {
                  console.log(res, "res");
                  if (res.status == 200) {
                    this.result = res.data;
                     console.log(res.data);
                  } else {
                    console.log(this.result);
                  }
                })
                .catch(err => {
                  console.log(err);
                })
      },
}
}
</script>

<style>
/* @import './assets/base.css'; */

/* #app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
} */
</style>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div>
    <div class="bodyContainer">
        <header class="header">
            <div class="row bg-white headerRow">
                <div class="col-6 logoContainer fw-bold">
                  <img src="./assets/images/logo.png" alt="" class="logoImage">
                </div>
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
                <h1>FIT CALCULATOR</h1>
                <p>Węglowodany, kalorie, białka, IG</p>
                <button class="btn btn-primary calc mt-4">Przelicz</button>
            </div>
        </header>
    </div>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->
    <div class="mainContainer container my-5">
      <main id="main">
            <section class="calculatorSection my-5">
              <div class="container">
                <h1 class="text-center">Twój kalkulator</h1>
                <input type="button" value="ggg">
                <div class="row">
                  <div class="col-6">
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Wybierz produkt</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <button type="button" class="btn backgroundPrimary text-white">Oblicz</button>
                    <div>Wynik to:</div>
                  </div>
                  <div class="col-6">
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Wybierz gramature</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>
            <section class="productsSection">
                <div class="row">
                  <h1 class="text-center">Wszystkie produkty</h1>
                  <h5 class="text-center">Tu znajdziesz szczegółowe opisy wszystkich produktów</h5>
                  <div class="col-3" v-for="product in products" :key="product">
                    
                    <p>Id: {{product.id}}</p>
                    <p class="backgroundPrimary text-white p-2 text-center mb-0">{{product.nazwa}}
                    </p>
                    <hr class="mt-1 backgroundPrimary hr">
                    <div class="imageProduct">
                      <img src="https://cdn.shopify.com/s/files/1/0406/0322/2179/products/gro_5_bdbc6680-6aca-47d0-a1ec-1a212514aa5a_600x800_crop_center.jpg?v=1591727776" alt="" class="img-fluid rounded mx-auto d-block">
                    </div>
                    
                    <p class="textJustify">Opis: {{product.opis}}</p>
                    <p>Kalorie: {{product.kalorie}}</p>
                    <p>Białko: {{product.bialko}}</p>
                    <p>Błonnik: {{product.blonnik}}</p>
                    <p>Tłuszcz: {{product.tluszcz}}</p>
                    <p>Węglowodany: {{product.weglowodany}}</p>
                    <p>Ig: {{product.ig}}</p>
                    <p>KJ: {{product.kj}}</p>
                    
                  </div>
                  
                </div>
            </section>
      </main>
    </div>
    <div class="footerContainer backgroundPrimary">
        <footer class="container py-5">Footer</footer>
    </div>

  <main>
    <!-- <TheWelcome /> -->
  </main>
  </div>
</template>

<script>
import axios from 'axios';
export default{
  name: 'app',
  data(){
    return {
      result: [],
      count: 0,
      products: []
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
                    this.count = res.data.count;
                    this.products = res.data.products;
                     console.log(res.data, "res data");
                  } else {
                    console.log(this.result, "result");
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
.logoContainer {
  padding: 10px;
  height: 100px;
}
.logoImage {
  display: block;
  max-width: 100%;
  max-height: calc(100%);
}

#main {

}
.textJustify {
  text-align: justify;
}
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

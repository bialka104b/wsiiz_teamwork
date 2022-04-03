<script setup>
import Footer from './components/Footer.vue';
import TheWelcome from './components/TheWelcome.vue';
import Header from './components/Header.vue';
import Calculator from './components/Calculator.vue';
</script>

<template>
  <div>
    <Header />
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->
    <div class="mainContainer container my-5">
      <main id="main">
          <Calculator/>
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
    <Footer />
  <main>
    <!-- <TheWelcome /> -->
    
  </main>
  </div>
</template>

<script>
import axios from 'axios';
// import Multiselect from 'vue-multiselect'
// import Multiselect from '@vueform/multiselect'

export default{
  name: 'app',
  components: {
    // Multiselect
  },

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
<style src="@vueform/multiselect/themes/default.css"></style>
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

.character-label-icon {
  margin: 0 6px 0 0;
  height: 26px;
}
.character-option-icon {
  margin: 0 6px 0 0;
  height: 22px;
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

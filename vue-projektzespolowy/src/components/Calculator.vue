
<template>
    <div>
        <section class="calculatorSection my-5">
              <div class="container">
                <h1 class="text-center">Twój kalkulator</h1>
                <input type="button" value="ggg">
                <div class="row">
                  <div class="col-6">
                    <!-- <select class="form-select" aria-label="Default select example">
                      <option selected>Wybierz produkt</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select> -->
                    <button type="button" class="btn bg-primary text-white">Oblicz</button>
                    <div>Wynik to:</div>
                  </div>
                  <div class="col-6">
                    <!-- <select class="form-select" aria-label="Default select example">
                      <option selected>Wybierz gramature</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select> -->
                    <!-- <Multiselect
                      v-model="value"
                      :options="options"
                    /> -->
                    <Multiselect
                      v-model="valueSelectedProducts"
                      placeholder="Wybierz produkt"
                      label="nazwa"
                      :options="filteredList"
                      
                    >
                    <!-- :options="[
                        { value: 'captainamerica', name: 'Captain America', icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/03_-_Captain_America_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png' },
                        { value: 'spiderman', name: 'Spiderman', icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/12_-_Spiderman_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png' },
                        { value: 'ironman', name: 'Iron Man', icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/02_-_IRONMAN_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png' },
                      ]" -->
                      <!-- <template v-slot:singlelabel="{ valueSelectedProducts }">
                        <div class="multiselect-single-label">
                          <img class="character-label-icon" :src="valueSelectedProducts"> {{ valueSelectedProducts.nazwa }}
                        </div>
                      </template> -->

                      <!-- <template v-slot:option="{ optionsSelectedProducts }">
                        <img class="character-option-icon" :src="optionsSelectedProducts"> {{ valueSelectedProducts.nazwa }}
                      </template> -->
                    </Multiselect>
                  </div>
                </div>
              </div>
              <!-- <p v-for="item in product" :key="item">
                {{item.nazwa}}
              </p> -->
            </section>
            {{optionsSelectedProducts}}
            <input v-model="text" type="number" step="0.01">
            <button @click="wylicz">Dodaj {{count}}</button>
    </div>
</template>

<script>
import axios from 'axios';
import Multiselect from '@vueform/multiselect';
export default {
    props: {
        filteredList: {
            type: Array
        }
    },
    components: {
        Multiselect
    },
    data(){
        return {
            products: [], // tablica lecąca z API
            //SELECT FOR PRODUCTS
            valueSelectedProducts: null,
            optionsSelectedProducts: [],
            placeholderSelectedProducts: '',
            labelSelectedProducts: "nazwa",

            text: 0,
            count: 0,
            value: null,
            options: [
                'Batman',
                'Robin',
                'Joker',
            ],
            example7: {
                value: null,
                placeholder: 'Select your character',
                label: 'name',
                options: [
                    { value: 'captainamerica', name: 'Captain America', icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/03_-_Captain_America_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png' },
                    { value: 'spiderman', name: 'Spiderman', icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/12_-_Spiderman_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png' },
                    { value: 'ironman', name: 'Iron Man', icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/02_-_IRONMAN_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png' },
                ]
            },
        }
    },
    
    created(){
        // this.wylicz();
        this.getProducts();
    },
    methods: {
        wylicz(){
            this.count = this.count + this.text;
        },
        
        async getProducts() {
            const config = {
              method: 'get',
              url: `http://localhost:4000/api/products`,
              headers: { 
                'Content-Type': 'application/json',
              }
            };
            await axios(config)
                .then(res => {
                    if (res.status == 200) {
                        this.products = res.data.products;
                        // this.optionsSelectedProducts = res.data.products;
                        // console.log(res.data.products, "ddjskslad");
                        // console.log(this.products, "this.products");
                    } else {
                        console.log(this.result, "result");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },

        przygotujSelected(id, name){
            const object = {
                id: id,
                name: name
            };
            return object;
        }
    },
    computed:{
    filteredList(){
      return this.products.filter(post => {
        // return post.name.toLowerCase().includes(this.search.toLowerCase())
        // console.log(post, "post");
        return post
      })
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
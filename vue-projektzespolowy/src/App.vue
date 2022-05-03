<script setup>
import Footer from './components/Footer.vue';
import TheWelcome from './components/TheWelcome.vue';
import Header from './components/Header.vue';
import Calculator from './components/Calculator.vue';
</script>
<template>
	<div>
        <Header :showBgImage="false"/>
        <!-- <header>
            <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

            <div class="wrapper">
                <HelloWorld msg="You did it!" />
            </div>
        </header> -->
        <!-- {{this.result}} -->
        
        <div class="mainContainer container my-5">
            <main id="main">
                <router-view :result="result" />
                <!-- <Calculator :filteredList="filteredList"/> -->
            </main>
        </div>
            
        <main>
            
        </main>
        <Footer />
        <!-- {{listInMultiselectProductsArr}} -->
        <Multiselect
            v-model="value"
            placeholder="Wybierz produkt"
            :options="result"
            :multiple="true"
            :taggable="true" 
            :custom-label="customLabel"
            :close-on-select="true" 
            :clear-on-select="false" 
            :preserve-search="true"
            :label="nazwa"
            :track-by="nazwa" 
            :preselect-first="false"
        />
	</div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import lodash from 'lodash';

export default{
	name: 'app',
	components: {
		Multiselect,
	},
    
	data(){
		return {
			result: [],
			search:'',
			count: 0,
			products: [],
            value: [],//value do multiselect
            listInMultiselectProducts: [],//tu jest nasze options do multiselect
            id: 0,
            ig: null,
            img: '',
            nazwa: '',
		}
	},
	created(){
        this.getProducts();
	}, 
	computed:{
        listInMultiselectProductsArr(){
            lodash.mapValues([...this.result], (el)=> {
                this.listInMultiselectProducts.push({id: el.id, nazwa: el.nazwa})
            });
        },

		filteredList(){
			return this.result.filter(post => {
				return post.nazwa.toLowerCase().includes(this.search.toLowerCase())
				// return post.name.toLowerCase().includes(this.search.toLowerCase())
			})
		},
	},
	
	methods: {
        customLabel ({ id, nazwa, img }) {
            return `${nazwa}`;
        },
        
        async getProducts() {
            const config = {
              method: 'get',
              url: `http://localhost:4000/api/allProducts`,
              headers: { 
                'Content-Type': 'application/json',
              }
            };
            await axios(config)
                .then(res => {
                    if (res.status == 200) {
                        this.result = [...res.data.products];
                        this.count = res.data.count;
                        this.products = res.data.products;
                    } else {}
                })
                .catch(err => {
                    console.log(err);
                })
        },
	}
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
@import './scss/main.scss';
.logoContainer {
	padding: 10px;
	height: 100px;
}
.logoImage {
	display: block;
	max-width: 100%;
	max-height: calc(100%);
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
</style>

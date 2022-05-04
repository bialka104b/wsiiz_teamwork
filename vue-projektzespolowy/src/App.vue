<script setup>
import Footer from './components/Footer.vue';
import TheWelcome from './components/TheWelcome.vue';
import Header from './components/Header.vue';
import Calculator from './components/Calculator.vue';
</script>
<template>
	<div>
        <Header :showBgImage="false"/>
        <div class="mainContainer container my-5" id="mainContainer">
            <main id="main">
                <router-view :result="result" />
            </main>
        </div>
        <Footer />
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
</style>

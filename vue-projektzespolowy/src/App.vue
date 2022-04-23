<script setup>
import Footer from './components/Footer.vue';
import TheWelcome from './components/TheWelcome.vue';
import Header from './components/Header.vue';
import Calculator from './components/Calculator.vue';
</script>
<template>
	<div>
        <Header />
            <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/welcome">welcome</router-link> |
            <router-link to="/about">About</router-link>
            </nav>
            <main>
                <router-view />
            </main>
        <!-- <header>
            <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

            <div class="wrapper">
                <HelloWorld msg="You did it!" />
            </div>
        </header> -->
        <!-- {{this.result}} -->
        
        <div class="mainContainer container my-5">
            <main id="main">
                <h1 class="text-center">Twój kalkulator</h1>
                
                <!-- <Calculator :filteredList="filteredList"/> -->
                <!-- <Multiselect
                    v-model="valueOne"
                    placeholder="Wybierz produkt"
                    :options="result"
                    :custom-label="customLabel"
                    :close-on-select="true" 
                    :clear-on-select="true"
                    :label="nazwa"
                    :track-by="nazwa"
                    :show-labels="false"
                >
                </Multiselect> -->
                <div class="row">
                    <div class="div-multiselect col-12 col-sm-6 col-md-4">
                        <Multiselect 
                        v-model="valueOne" 
                        placeholder="Wybierz produkt" 
                        :label="nazwa" 
                        :track-by="nazwa"  
                        :options="result" 
                        :show-labels="false" 
                        :custom-label="customLabel1">
                            <template v-slot:option="{ option }">
                                <div class="imageOption">
                                    <img class="character-option-icon" :src='`src/assets/products/${option.img}`' width="50" height="50"> {{ option.nazwa }}
                                </div>
                            </template>
                        </Multiselect>
                    </div>
                    <div class="div-multiselect col-12 col-sm-6 col-md-4">
                        <label class="d-block">
                            <span>Waga produktu w g lub ml</span>
                            <input type="number" name="weightProduct" step="1" v-model="weight" placeholder="Wpisz ilośc gram" class="d-block w-100 weightProduct">
                        </label>
                    </div>
                    <div class="div-multiselect col-12 col-sm-6 col-md-4">
                        <button type="button" @click="add()" class="btn btn-primary p-1 w-100">Dodaj</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-xl-9">
                        <div class="table-responsive mt-2">
                            <table class="table table-hover table-md table-dark rounded">
                                <thead>
                                    <tr>
                                        <th scope="col" class="borderRadiusLT">Nazwa</th>
                                        <th scope="col">Ilość</th>
                                        <th scope="col">Kalorie</th>
                                        <th scope="col">Tłuszcz</th>
                                        <th scope="col">Błonnik</th>
                                        <th scope="col">Bialko</th>
                                        <th scope="col">Węglowodany</th>
                                        <th scope="col" class="borderRadiusRT"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item) in displayList" :key="item">
                                        <td scope="row" class="bg-primary text-white">{{item.nazwa}}</td>
                                        <td scope="row" class="bg-primary text-white">{{item.ilosc}}g</td>
                                        <td class="bg-primary text-white">{{item.kalorie.toFixed(2)}}</td>
                                        <td class="bg-primary text-white">{{item.tluszcz}}g</td>
                                        <td class="bg-primary text-white">{{item.blonnik}}g</td>
                                        <td class="bg-primary text-white">{{item.bialko}}g</td>
                                        <td class="bg-primary text-white">{{item.weglowodany}}g</td>
                                        <td class="bg-primary text-white alignCenter"><button class="btn btn-success btn-sm" @click="removeProduct(item.id, item.ilosc)"><i class="uil uil-trash-alt"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td scope="row" class="borderRadiusLB">suma</td>
                                        <td></td>
                                        <td>{{sumCalories}}</td>
                                        <td>{{sumFat}}g</td>
                                        <td>{{sumFiber}}g</td>
                                        <td>{{sumProtein}}g</td>
                                        <td>{{sumCarbs}}g</td>
                                        <td class="borderRadiusRB"><button type="button" @click="clearList()" class="btn btn-primary p-1 w-100 btn-sm">Wyczyść listę</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-12 col-xl-3">
                        <PieChart v-if="this.displayList != [] || this.displayList != null"
                            :width="200"
                            :height="300"
                            :chartData="chartData"
                            :chartOptions="chartOptions"
                        />
                    </div>
                </div>
                
                
                <section class="productsSection">
                        <div class="row">
                            <h1 class="text-center">Wszystkie produkty</h1>
                            <h5 class="text-center">Tu znajdziesz szczegółowe opisy wszystkich produktów</h5>
                            <div class="col-3" v-for="product in result" :key="product">
                                
                                <p>Id: {{product.id}}</p>
                                <p class="bg-primary text-white p-2 text-center mb-0">{{product.nazwa}}
                                </p>
                                <hr class="mt-1 bg-primary hr">
                                <div class="imageProduct">
                                    <img v-if="product.img != null" :src="`src/assets/products/${product.img}`" alt="" class="img-fluid rounded mx-auto d-block">
                                    <img v-else src="https://cdn.shopify.com/s/files/1/0406/0322/2179/products/gro_5_bdbc6680-6aca-47d0-a1ec-1a212514aa5a_600x800_crop_center.jpg?v=1591727776" alt="" class="img-fluid rounded mx-auto d-block">
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
            
        <main>
            <!-- <TheWelcome /> -->
            
        </main>
        <Footer />
        {{listInMultiselectProductsArr}}
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
// import Multiselect from '@vueform/multiselect'
import PieChart from "./PieChart.js";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


export default{
	name: 'app',
	components: {
		Multiselect,
        // Bar ,
        PieChart,
	},
    
	data(){
		return {
            chartData: {},
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                },
            },
			result: [],
			search:'',
			count: 0,
			products: [],
            value: [],//value do multiselect
            valueOne: null,//value do single select
            weight: 0,
            listInMultiselectProducts: [],//tu jest nasze options do multiselect
            blonnik: 0.0,
            bialko: 0.0,
            id: 0,
            ig: null,
            img: '',
            kalorie: 0,
            kj: 0,
            nazwa: '',
            opis: '',
            tluszcz: 0.0,
            weglowodany: 0,
            displayList: [],
            //SUMA DO LISTY
            sumCalories: 0,
            sumFat: 0,
            sumFiber: 0,
            sumProtein: 0,
            sumCarbs: 0,
		}
	},
	created(){
        this.getProducts();
        this.getLocalStorage();
        this.returnChartData();
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
        customLabel1 ({ nazwa, img }) {
            return `${nazwa}`;
        },
        convertWeightToGrams(waga){
            return waga/100;
        },
        returnChartData(){
            this.chartData = {
                labels: [ 'Tłuszcz', 'Błonnik', 'Białko', 'Węglowodany'],
                datasets: [
                    {
                    backgroundColor: [ '#000', '#8ebd0e', '#DD1B16', 'yellow'],
                    data: [
                        this.sumFat,
                        this.sumFiber,
                        this.sumProtein,
                        this.sumCarbs
                    ],
                    hoverOffset: 2
                    }
                ]
            }
        },
        customLabel ({ id, nazwa, img }) {
            return `${nazwa}`;
        },
        summationOfCalories(){
            this.sumCalories = lodash.sumBy(this.displayList, 'kalorie').toFixed(2);
        },
        summationOfFat(){
            this.sumFat = lodash.sumBy(this.displayList, 'tluszcz').toFixed(3);
        },
        summationOfFiber(){
            this.sumFiber= lodash.sumBy(this.displayList, 'blonnik').toFixed(3);
        },
        summationOfProtein(){
            this.sumProtein = lodash.sumBy(this.displayList, 'bialko').toFixed(3);
        },
        summationOfCarbs(){
            this.sumCarbs = lodash.sumBy(this.displayList, 'weglowodany').toFixed(2);
        },
        add(){
            let emptyArr = [];
            let weight = this.convertWeightToGrams(this.weight);
            if (this.displayList) {
                emptyArr =  this.displayList;
            }
            //zrób obsługe kiedy nazwa jest nulem
            const object = {
                id: Math.floor(Math.random()*10000+1),
                nazwa: this.valueOne.nazwa,
                kalorie: weight * this.valueOne.kalorie,
                tluszcz: weight * this.valueOne.tluszcz,
                blonnik: weight * this.valueOne.blonnik,
                bialko: weight * this.valueOne.bialko,
                weglowodany: weight * this.valueOne.weglowodany,
                ilosc: this.weight,
            };
            emptyArr.push(object);
            this.setLocalStorage(emptyArr)
            this.updateList();
        },
        updateList(){
            this.getLocalStorage();
        },
        getLocalStorage(){
            this.displayList= JSON.parse(localStorage.getItem("lista"));
            this.summationOfCalories()
            this.summationOfFat()
            this.summationOfFiber()
            this.summationOfProtein()
            this.summationOfCarbs()
            this.returnChartData();
            return this.displayList;
        },
        setLocalStorage(item){
            localStorage.setItem('lista', JSON.stringify(item));
        },
        removeProduct(itemId, itemIlosc){
            this.getLocalStorage();
            this.setLocalStorage(this.displayList.filter(item => {
                    if (item.id !== itemId) {
                        return item;
                    }
            }));
            this.getLocalStorage();
            if ([...this.displayList].length == 0) {
                this.clearList()
            }
        },
        clearList(){
            localStorage.removeItem("lista");
            this.getLocalStorage();
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
                    } else {
                        // console.log(this.result);
                    }
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

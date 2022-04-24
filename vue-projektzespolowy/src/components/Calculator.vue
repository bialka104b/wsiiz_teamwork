<script setup>
	import OneProduct from './OneProduct.vue';
</script>
<template>
    <section class="calculatorSection my-5">
        <h1 class="text-center">Twój kalkulator</h1>
			<div class="row m-0">
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

			<div class="row m-0 mt-4">
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
				<div class="col-12 col-xl-3 py-2">
					<PieChart v-if="this.displayList != [] || this.displayList != null"
						:width="200"
						:height="300"
						:chartData="chartData"
						:chartOptions="chartOptions"
					/>
				</div>
			</div>
			
			<div class="row m-0 mt-4" v-if="valueOne != null">
				<div class="col-6 col-md-3">
					<!-- <p>Id: {{product.id}}</p> -->
					<p class="bg-primary text-white p-2 text-center mb-0">{{valueOne.nazwa}}
					</p>
					<hr class="mt-1 bg-primary hr">
					<div class="imageProduct">
						<img v-if="valueOne.img != null" :src="`src/assets/products/${valueOne.img}`" alt="" class="img-fluid rounded mx-auto d-block">
						<img v-else src="https://cdn.shopify.com/s/files/1/0406/0322/2179/products/gro_5_bdbc6680-6aca-47d0-a1ec-1a212514aa5a_600x800_crop_center.jpg?v=1591727776" alt="" class="img-fluid rounded mx-auto d-block">
					</div>
					
				</div>
				<div class="col-6 col-md-5" v-if="valueOne.nazwa != undefined">
					<p class="mb-0">Kalorie: {{valueOne.kalorie}}</p>
					<p class="mb-0">Białko: {{valueOne.bialko}}</p>
					<p class="mb-0">Błonnik: {{valueOne.blonnik}}</p>
					<p class="mb-0">Tłuszcz: {{valueOne.tluszcz}}</p>
					<p class="mb-0">KJ: {{valueOne.kj}}</p>
					<p class="mb-0">Ig: {{valueOne.ig}}</p>
					<p class="mb-0">Węglowodany: {{valueOne.weglowodany}}</p>
				</div>
				<div class="col-12 col-md-4" v-if="valueOne.nazwa != undefined">
					<p class="textJustify">Opis: {{valueOne.opis}}</p>
				</div>
			</div>
			
    </section>
</template>

<script>
import Multiselect from 'vue-multiselect';
import PieChart from "../PieChart.js";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
import lodash from 'lodash';

export default {
    props: {
        result: {
            type: Array
        }
    },
    components: {
        Multiselect,
		PieChart,
    },
    data(){
        return {
			//MULTISELECT
            valueOne: null,//value do single select
			nazwa: '',
			//CALCULATOR
			weight: 0,
			//LIST
			displayList: [],
			sumCalories: 0,
            sumFat: 0,
            sumFiber: 0,
            sumProtein: 0,
            sumCarbs: 0,
			//CHART JS
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
        }
    },
    
    created(){
        this.getLocalStorage();
        this.returnChartData();
    },
    methods: {
		//MULTISELECT
		customLabel1 ({ nazwa, img }) {
            return `${nazwa}`;
        },
		//LIST
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
		convertWeightToGrams(waga){
            return waga/100;
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
				opis: this.valueOne.opis,
				ig: this.valueOne.ig,
            };
            emptyArr.push(object);
            this.setLocalStorage(emptyArr)
            this.updateList();
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
		updateList(){
            this.getLocalStorage();
        },
		clearList(){
            localStorage.removeItem("lista");
            this.getLocalStorage();
        },
		//LOCAL STORAGE
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
        
        //CHART JS
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
    },
    computed:{
    filteredList(){
      return this.products.filter(post => {
        // return post.name.toLowerCase().includes(this.search.toLowerCase())
        return post
      })
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
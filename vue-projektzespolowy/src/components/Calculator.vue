<script setup>
	import OneProduct from './OneProduct.vue';
</script>
<template>
    <section class="calculatorSection my-5">
        <h1 class="text-center">{{$t("header.yourCalculator")}}</h1>
			<div class="row m-0">
				<div class="div-multiselect col-12 col-sm-6 col-md-4">
					
					<Multiselect 
					v-model="valueOne" 
					:placeholder="$t('header.selectProduct')"
                    i18n-placeholder
					:label="nazwa" 
					:track-by="nazwa"  
					:options="result" 
					:show-labels="false" 
					:custom-label="customLabel1">
						<template v-slot:option="{ option }">
							<div class="imageOption">
								<img class="character-option-icon" :src='`src/assets/products/${option.img}`' width="50" height="50"> {{ $t(option.nazwa) }}
							</div>
						</template>
					</Multiselect>
				</div>
				<div class="div-multiselect col-12 col-sm-6 col-md-4">
					<label class="d-block">
						<span>{{$t("header.weightProduct")}}</span>
						<input type="number" name="weightProduct" step="1" v-model="weight"
                        :placeholder="$t('header.enterGrams')"
                        i18n-placeholder
                        class="d-block w-100 weightProduct">
					</label>
				</div>
				<div class="div-multiselect col-12 col-sm-6 col-md-4">
					<button type="button" @click="add()" class="btn btn-primary p-1 w-100">{{$t('header.add')}}</button>
				</div>
			</div>

			<div class="row m-0 mt-4">
				<div class="col-12 col-xl-9">
					<div class="table-responsive mt-2">
						<table class="table table-hover table-md table-dark rounded">
							<thead>
								<tr>
									<th scope="col" class="borderRadiusLT">{{$t('header.name')}}</th>
									<th scope="col">{{$t('header.quantity')}}</th>
									<th scope="col">{{$t('header.calories')}}</th>
									<th scope="col">{{$t('header.fat')}}</th>
									<th scope="col">{{$t('header.fiber')}}</th>
									<th scope="col">{{$t('header.protein')}}</th>
									<th scope="col">{{$t('header.carbohydrates')}}</th>
									<th scope="col" class="borderRadiusRT alignCenter">
                                        <button class="btn btn-success btn-sm myTooltip" @click="show()">
                                            <i class="uil uil-plus"></i>
                                            <span class="tooltiptext tooltip-left">{{$t('header.addOther')}}</span>
                                        </button>
                                    </th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item) in displayList" :key="item">
									<td scope="row" class="bg-primary text-white">{{$t(item.nazwa)}}</td>
									<td scope="row" class="bg-primary text-white">{{item.ilosc}}g</td>
									<td class="bg-primary text-white">{{item.kalorie.toFixed(2)}}</td>
									<td class="bg-primary text-white">{{item.tluszcz.toFixed(3)}}g</td>
									<td class="bg-primary text-white">{{item.blonnik.toFixed(3)}}g</td>
									<td class="bg-primary text-white">{{item.bialko.toFixed(3)}}g</td>
									<td class="bg-primary text-white">{{item.weglowodany.toFixed(3)}}g</td>
									<td class="bg-primary text-white alignCenter">
                                        <button class="btn btn-success btn-sm myTooltip" @click="removeProduct(item.id, item.ilosc)">
                                            <i class="uil uil-minus"></i>
                                            <span class="tooltiptext tooltip-left">{{$t('header.removeItem')}}</span>
                                        </button>
                                        
                                    </td>
								</tr>
								<tr v-show="showAddMyProduct">
									<td scope="row" class="">
                                        <input type="text" name="nazwa" class="d-block w-100 weightProduct"  placeholder="nazwa" v-model="nazwa">
                                    </td>
									<td>
                                        <input type="number" step="1" min="1" name="ilosc" class="d-block w-100 weightProduct" placeholder="ilosc w gramach" v-model="ilosc">
                                    </td>
									<td>
                                        <input type="number" step="0.001" name="kalorie" class="d-block w-100 weightProduct" placeholder="kalorie" v-model="kalorie">
                                    </td>
									<td>
                                        <input type="number" step="0.001" name="tluszcz" class="d-block w-100 weightProduct" placeholder="tluszcz" v-model="tluszcz">
                                    </td>
									<td>
                                        <input type="number" step="0.001" name="blonnik" class="d-block w-100 weightProduct" placeholder="blonnik" v-model="blonnik">
                                    </td>
									<td>
                                        <input type="number" step="0.001" name="bialko" class="d-block w-100 weightProduct" placeholder="bialko" v-model="bialko">
                                    </td>
									<td>
                                        <input type="number" step="0.001" name="weglowodany" class="d-block w-100 weightProduct" placeholder="weglowodany" v-model="weglowodany">
                                    </td>
									<td class="alignCenter">
                                        <button class="btn btn-success btn-sm myTooltip" @click="addMyProduct()">
                                            <i class="uil uil-plus"></i>
                                            <span class="tooltiptext tooltip-left">{{$t('header.addToList')}}</span>
                                        </button>
                                    </td>
								</tr>
								<tr>
									<td scope="row" class="borderRadiusLB">{{$t("header.sum")}}</td>
									<td></td>
									<td>{{sumCalories}}</td>
									<td>{{sumFat}}g</td>
									<td>{{sumFiber}}g</td>
									<td>{{sumProtein}}g</td>
									<td>{{sumCarbs}}g</td>
									<td class="borderRadiusRB alignCenter">
                                        <button type="button" @click="clearList()" class="btn btn-success btn-sm myTooltip">
                                            <i class="uil uil-trash-alt"></i>
                                            <span class="tooltiptext tooltip-left">{{$t('header.clearList')}}</span>
                                        </button>
                                    </td>
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
				<div class="col-6 col-md-3" v-if="valueOne.nazwa != undefined">
					<p class="mb-0">Kalorie: {{valueOne.kalorie}}</p>
					<p class="mb-0">Białko: {{valueOne.bialko}}</p>
					<p class="mb-0">Błonnik: {{valueOne.blonnik}}</p>
					<p class="mb-0">Tłuszcz: {{valueOne.tluszcz}}</p>
					<p class="mb-0">KJ: {{valueOne.kj}}</p>
					<p class="mb-0">Ig: {{valueOne.ig}}</p>
					<p class="mb-0">Węglowodany: {{valueOne.weglowodany}}</p>
				</div>
				<div class="col-12 col-md-6" v-if="valueOne.nazwa != undefined">
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
import { i18n } from './../../src/main'

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
            showAddMyProduct: false,
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
            blonnik: 0.000,
            bialko: 0.000,
            ilosc: 0,
            kalorie: 0.000,
            tluszcz:0.000,
            weglowodany:0.000,
            nazwa:'',
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
        console.log(this.fat);
    },
    methods: {
        show(){
            this.showAddMyProduct = !this.showAddMyProduct
        },
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
        addMyProduct(){
            const object = {
                id: Math.floor(Math.random()*10000+1),
                nazwa: this.nazwa,
                kalorie: this.kalorie,
                tluszcz: this.tluszcz,
                blonnik: this.blonnik,
                bialko: this.bialko,
                weglowodany: this.weglowodany,
                ilosc: Math.round(this.ilosc),
            }
            this.getLocalStorage();
            let emptyArr = [];
            if (this.displayList) {
                emptyArr =  this.displayList;
            }
            emptyArr.push(object);
            this.setLocalStorage(emptyArr)
            this.updateList();
            this.show();
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
        lang(f){
            return i18n.tc(f);
        },
        
        //CHART JS
		returnChartData(){
            this.chartData = {
                labels: [ "Tłuszcz", 'Błonnik', 'Białko', 'Węglowodany'],
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
<template>
  <div class="modal-backdrop">
    <div class="modal" v-show="value">
      <header class="modal-header text-primary">
		<div v-if="nazwa != ''">{{$t(nazwa)}} </div>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          <i class="uil uil-times-square text-primary"></i>
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
			<div class="w-50 m-auto">
				<img :src="`src/assets/products/${img}`" alt="" class="img-fluid border-1 border-primary" style="border-style:solid">
			</div>
			<div>
				<p class="textJustify">{{opis}}</p>
				<span class="font-small">*{{$t('header.valuesGiven')}}</span>
				<p class="mb-0">{{$t("header.calories")}}: {{kalorie}}</p>
				<p class="mb-0">{{$t("header.protein")}}: {{bialko}}g</p>
				<p class="mb-0">{{$t("header.fiber")}}: {{blonnik}}g</p>
				<p class="mb-0">{{$t("header.fat")}}: {{tluszcz}}g</p>
				<p class="mb-0">{{$t("header.carbohydrates")}}: {{weglowodany}}g</p>
				<p class="mb-0">Ig: {{ig}}</p>
				<p class="mb-0">KJ: {{kj}}</p>
				<div class="row">
					<div class="col-6" v-if="product != null">
						<PieChart v-if="chartData !={}"
							:width="500"
							:height="200"
							:chartData="chartData"
							:chartOptions="chartOptions"
						/>
					</div>
					<div class="col-6">
						<BarChart
							:chart-options="chartOptionsBar"
							:chart-data="chartDataBar"
							:width="200"
							:height="200"
						/>
						
					</div>
				</div>
			</div>
        </slot>
       </section>

      <footer class="modal-footer">
        <button
          type="button"
          class="btn btn-primary text-white"
          @click="close"
        >
          {{$t("header.close")}}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PieChart from "../PieChart";
import BarChart from "../BarChart";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

  export default {
    name: 'Modal',
    props: {
        product: {
			type: Object
		},
		value: {
			type:Boolean
		},
    },
	components: {
		PieChart,
		BarChart
	},
    data() {
        return {
			result: {},
            id: 0,
            nazwa: '',
            kalorie: 0,
            kj:0,
            bialko:0,
            tluszcz: 0,
            weglowodany: 0,
            blonnik: 0,
            ig: 0, 
            img: "",
            opis: '', 
            kategoria:"",
			opis: "",
			//CHART JS
			chartData: {},
			chartDataBar: {},
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
						display:false,
                        position: 'bottom'
                    },
                },
            },
			chartOptionsBar: {
				responsive: true,
				plugins: {
                    legend: {
						display:false,
                        position: 'bottom'
                    },
                },
			}
        }
    },
	updated() {
		this.createProduct(this.product);
		this.returnChartData(this.product);
		this.returnChartDataBar();
	},
    methods: {
		
		close() {
			this.$emit('close');
		},
		createProduct(product){
			if (product) {
				this.id= product.id,
				this.nazwa= this.product.nazwa,
				this.kalorie= this.product.kalorie,
				this.kj=this.product.kj,
				this.bialko=this.product.bialko,
				this.tluszcz= this.product.tluszcz,
				this.weglowodany= this.product.weglowodany,
				this.blonnik= this.product.blonnik,
				this.ig= this.product.ig, 
				this.img= this.product.img,
				this.opis= this.product.opis, 
				this.kategoria=this.product.kategoria
				this.opis = this.product.opis
			}
		},
	  	//CHART JS
		returnChartData(){
			if (this.product) {
				this.chartData = {
					labels: [ "Tłuszcz", 'Błonnik', 'Białko', 'Węglowodany'],
					datasets: [
						{
						backgroundColor: [ '#000', '#8ebd0e', '#DD1B16', 'yellow'],
						data: [
							this.tluszcz,
							this.blonnik,
							this.bialko,
							this.weglowodany
						],
						hoverOffset: 2
						}
					]
				}
			}
        },
		returnChartDataBar(){
			this.chartDataBar = {
				labels: ["Kalorie", 'IG'],
				datasets: [{ 
					data: [this.kalorie, this.ig],
					backgroundColor: ['rgba(54, 162, 235, 0.5)','rgba(75, 192, 192, 0.5)'],
					borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
					borderWidth: 2
				}]
			}
		}
    },
  };
</script>

<style>
  
  
  
</style>
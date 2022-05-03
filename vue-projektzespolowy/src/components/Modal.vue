<template>
  <div class="modal-backdrop">
    <div class="modal" v-show="value">
      <header class="modal-header text-primary">
        <slot name="header">
          {{$t(nazwa)}} 
        </slot>
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
				<span>Podane wartości są podane dla 100 g produktu</span>
				<p class="mb-0">{{$t("header.calories")}}: {{kalorie}}</p>
				<p class="mb-0">{{$t("header.protein")}}: {{bialko}}g</p>
				<p class="mb-0">{{$t("header.fiber")}}: {{blonnik}}g</p>
				<p class="mb-0">{{$t("header.fat")}}: {{tluszcz}}g</p>
				<p class="mb-0">{{$t("header.carbohydrates")}}: {{weglowodany}}g</p>
				<p class="mb-0">Ig: {{ig}}</p>
				<p class="mb-0">KJ: {{kj}}</p>
				<div class="row">
					<div class="col-6" v-if="product != null">
						<!-- {{returnChartData(product)}} -->
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
import { Bar } from 'vue-chartjs';
import PieChart from "../PieChart";
import BarChart from "../BarChart";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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
	created(){
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
		// async getProducts() {
		// 	await console.log(this.product, "this")
        //     const config = {
        //       method: 'get',
        //       url: `http://localhost:4000/api/product/${this.product.id}`,
        //       headers: { 
        //         'Content-Type': 'application/json',
        //       }
        //     };
        //     await axios(config)
        //         .then(res => {
        //             if (res.status == 200) {
        //                 this.result = res.data.products[0];
		// 				console.log(res.data.products,"dd")
		// 				console.log(this.result,"result")
        //                 // this.count = res.data.count;
        //                 // this.products = res.data.products;
        //             } else {}
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        // },
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: block;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    height: 80vh;
    top: 10vh;
    left: calc((100% - 500px)/2);
    padding: 15px;
  }

  .modal-header,
  .modal-footer {
    /* padding: 15px; */
    
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    /* padding: 20px 10px; */
  }

  .btn-close {
    position: absolute;
    top: 10px;
    right: 0;
    border: none;
    font-size: 26px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
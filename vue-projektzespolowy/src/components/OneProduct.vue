<template>
    <div class="row">
        <div class="col-2">
            <p class="bg-primary text-white p-2 text-center mb-0">{{nazwa}}
            </p>
            <hr class="mt-1 bg-primary hr">
            <div class="imageProduct">
                <img v-if="img != null" :src="`src/assets/products/${img}`" alt="" class="img-fluid rounded mx-auto d-block">
                <img v-else src="https://cdn.shopify.com/s/files/1/0406/0322/2179/products/gro_5_bdbc6680-6aca-47d0-a1ec-1a212514aa5a_600x800_crop_center.jpg?v=1591727776" alt="" class="img-fluid rounded mx-auto d-block">
            </div>
            
        </div>
        <div class="col-5" v-if="nazwa != undefined">
            <p class="textJustify">Opis: {{opis}}</p>
        </div>
        <div class="col-5" v-if="nazwa != undefined">
            <p>Kalorie: {{kalorie}}</p>
            <p>Białko: {{bialko}}</p>
            <p>Błonnik: {{blonnik}}</p>
            <p>Tłuszcz: {{tluszcz}}</p>
            <p>KJ: {{kj}}</p>
            <p>Ig: {{ig}}</p>
            <p>Węglowodany: {{weglowodany}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        bialko: {type: Number | 0},
        blonnik: {type: Number},
        id: {type: Number},
        ig: {type: Number},
        img: {type: String},
        kalorie: {type: Number},
        kategoria: {type: String},
        kj: {type: Number},
        nazwa: {type: String},
        tluszcz: {type: Number},
        weglowodany: {type: Number},
    },
    data() {
        return {
            result: {},
            idProduct: 0,
            product: {
                bialko: undefined,
                blonnik: undefined,
                id: 0,
                ig: undefined,
                img: undefined,
                kalorie: undefined,
                kategoria: undefined,
                kj: undefined,
                nazwa: undefined,
                tluszcz: undefined,
                weglowodany: undefined,
            }
        }
    },
    created() {
        
    },
    computed: {
        
    },
    methods: {
        async getOneProduct() {
            const config = {
              method: 'get',
              url: `http://localhost:4000/api/product/${this.id}`,
              headers: { 
                'Content-Type': 'application/json',
              }
            };
            await axios(config)
                .then(res => {
                    if (res.status == 200) {
                        this.result = [...res.data.products]
                    } else {}
                })
                .catch(err => {
                    console.log(err);
                })
        },
    },
}
</script>
<template>
    <section class="productsSection">
        <div class="row">
            <h1 class="text-center">Wszystkie produkty</h1>
            <h5 class="text-center">Tu znajdziesz szczegółowe opisy wszystkich produktów</h5>
            <div class="col-3 position-relative mt-3" v-for="(product, index) in result" :key="product">
                <div class="shadow-lg">
                    <p class="bg-primary text-white p-2 text-center mb-0">{{product.nazwa}}
                    </p>
                    <hr class="mt-1 bg-primary hr">

                    <div class="imageProduct">
                        <img v-if="product.img != null" :src="`src/assets/products/${product.img}`" alt="" class="img-fluid rounded mx-auto d-block">
                        <img v-else src="https://cdn.shopify.com/s/files/1/0406/0322/2179/products/gro_5_bdbc6680-6aca-47d0-a1ec-1a212514aa5a_600x800_crop_center.jpg?v=1591727776" alt="" class="img-fluid rounded mx-auto d-block">
                    </div>
                    <button @click="isOpenM(index)" class="btn bg-primary text-white position-absolute btnShow">
                            <i class="uil uil-eye"></i>
                    </button>
                    <div v-show="isOpen[index] == true">
                        <p class="textJustify">Opis: {{product.opis}}</p>
                        <p class="mb-0">Kalorie: {{product.kalorie}}</p>
                        <p class="mb-0">Białko: {{product.bialko}}</p>
                        <p class="mb-0">Błonnik: {{product.blonnik}}</p>
                        <p class="mb-0">Tłuszcz: {{product.tluszcz}}</p>
                        <p class="mb-0">Węglowodany: {{product.weglowodany}}</p>
                        <p class="mb-0">Ig: {{product.ig}}</p>
                        <p class="mb-0">KJ: {{product.kj}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        result: {
            type: Array
        }
    },
    data() {
        return {
            isOpen: [],
        }
    },
    created() {
        for (let index = 0; index < this.result.length; index++) {
            this.isOpen.push(false);
        }
    },
    methods: {
        isOpenM(index){
            this.isOpen[index] = !this.isOpen[index];
            return this.isOpen[index];
        },
    },
}
</script>
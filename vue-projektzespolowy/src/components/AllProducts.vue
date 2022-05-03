<template>
    <section class="productsSection">
        <div class="row">
            <h1 class="text-center">{{$t("header.allProducts")}}</h1>
            <h5 class="text-center">{{$t("header.descriptionInfo")}}</h5>
                

                <Modal
                    v-show="isModalVisible"
                    @close="closeModal"
                    :product="productinModal"
                    :value="isModalVisible"
                    
                />
            <div class="col-3 position-relative mt-3" v-for="(product, index) in result" :key="product.id">
                <div class="shadow-lg">
                    <p class="bg-primary text-white p-2 text-center mb-0">{{$t(product.nazwa)}}
                    </p>
                    <hr class="mt-1 bg-primary hr">

                    <div class="imageProduct">
                        <img v-if="product.img != null" :src="`src/assets/products/${product.img}`" alt="" class="img-fluid rounded mx-auto d-block">
                        <img v-else src="https://cdn.shopify.com/s/files/1/0406/0322/2179/products/gro_5_bdbc6680-6aca-47d0-a1ec-1a212514aa5a_600x800_crop_center.jpg?v=1591727776" alt="" class="img-fluid rounded mx-auto d-block">
                    </div>
                    <button @click="isOpenM(index)" class="btn bg-primary text-white position-absolute btnShow">
                            <i class="uil uil-eye"></i>
                    </button>
                    <button
                    type="button"
                    class="btn bg-primary text-white position-absolute btnShow"
                    style="right:15px"
                    @click="showModal(product)"
                    >{{$t('header.more')}}</button>
                    <div v-show="isOpen[index] == true" class="px-4 py-2">
                        <p class="mb-0">{{$t("header.calories")}}: {{product.kalorie}}</p>
                        <p class="mb-0">{{$t("header.protein")}}: {{product.bialko}}</p>
                        <p class="mb-0">{{$t("header.fiber")}}: {{product.blonnik}}</p>
                        <p class="mb-0">{{$t("header.fat")}}: {{product.tluszcz}}</p>
                        <p class="mb-0">{{$t("header.carbohydrates")}}: {{product.weglowodany}}</p>
                        <p class="mb-0">Ig: {{product.ig}}</p>
                        <p class="mb-0">KJ: {{product.kj}}</p>
                        <!-- opis
                        kalorie
                        bialko
                        blonnik
                        tluszcz
                        kj -->
                    </div>
                </div>
            </div>
        </div>
        
    </section>
</template>

<script>
import Modal from "./Modal.vue";
export default {
    props: {
        result: {
            type: Array
        }
    },
    components: {
        Modal
    },
    data() {
        return {
            isModalVisible: false,
            isOpen: [],
            productinModal: null,
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
        showModal(product) {
            this.productinModal = product;
            // this.productinModal = product.id;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    },
}
</script>
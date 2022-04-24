<template>
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
</template>

<script>
export default {
    props: {
        result: {
            type: Array
        }
    },
}
</script>
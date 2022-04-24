<template>
    <div class="headerContainer">
        <header class="header">
            <div class="row bg-white headerRow">
                <div class="col-6 logoContainer fw-bold">
                  <img src="../assets/images/logo.png" alt="" class="logoImage">
                </div>
                <nav class="col-6 d-flex justify-content-between">
                    <div class="navLink">
                        <router-link to="/" class="d-block fw-bold btn-primary">Home</router-link>
                    </div>
                    <div class="navLink">
                        <router-link to="/allProducts" class="d-block fw-bold btn-primary">All Products</router-link>
                    </div>
                    <div class="navLink">
                        <router-link to="/about" class="d-block fw-bold btn-primary">About</router-link>
                    </div>
                </nav>
            </div>
            <div class="container titlePage">
                <h3>Wylicz kalorie i zadbaj o swoje zdrowie</h3>
                <h1>FIT CALCULATOR</h1>
                <p>Węglowodany, kalorie, białka, IG</p>
                <button class="btn btn-primary calc mt-4">Przelicz</button>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    props: {
        showBgImage: {
            type: Boolean
        }
    },
}
</script>
<template>
    <div class="headerContainer">
        <header class="header">
            <div class="row bg-white headerRow">
                <div class="col-6 logoContainer fw-bold">
                  <img src="../assets/images/logo.png" alt="" class="logoImage">
                </div>
                <nav class="col-6 d-flex justify-content-between">
                    <div class="navLink">
                        <router-link to="/" class="d-block fw-bold btn-primary">{{$t("header.calculator")}}</router-link>
                    </div>
                    <div class="navLink">
                        <router-link to="/allProducts" class="d-block fw-bold btn-primary">{{$t("header.allProducts")}}</router-link>
                    </div>
                    <div class="navLink">
                        <router-link to="/about" class="d-block fw-bold btn-primary">About</router-link>
                    </div>
                    <div class="locale-changer">
                        <select v-model="$i18n.locale">
                        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
                        </select>
                    </div>
                </nav>
            </div>
            <div class="container titlePage">
                <h3>{{$t("header.calculateCalories")}}</h3>
                <h1>FIT CALCULATOR</h1>
                <p>{{$t("header.carboCalProtIg")}}</p>
                <router-link to="/about" class="btn btn-primary calc mt-4">{{$t("header.calculator")}}</router-link>
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
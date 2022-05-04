<template>
    <div class="headerContainer">
        <header class="header">
            <div class="row bg-white headerRow">
                <div class="col-3 col-md-3 col-lg-4 logoContainer fw-bold">
                  <img src="../assets/images/logo.png" alt="" class="logoImage">
                </div>
                <nav class="col-6 col-sm-9 col-md-9 col-lg-8 d-flex justify-content-between">
                    <div class="navLink displaySm">
                        <router-link to="/" class="d-block fw-bold btn-primary">{{$t("header.calculator")}}</router-link>
                    </div>
                    <div class="navLink displaySm">
                        <router-link to="/allProducts" class="d-block fw-bold btn-primary">{{$t("header.allProducts")}}</router-link>
                    </div>
                    <div class="navLink displaySm">
                        <router-link to="/about" class="d-block fw-bold btn-primary">{{$t("header.about")}}</router-link>
                    </div>
                    <div class="navLink locale-changer">
                        <select v-model="$i18n.locale">
                        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
                        </select>
                    </div>
                </nav>
                <div class="col-3 d-flex flex-row-reverse p-0">
                    <button class="btn btn-primary dropButton" @click="showDropdown">
                        <i class="uil uil-list-ul text-white"></i>
                    </button>
                    <ul class="listDropdown" v-show="show">
                        <li class="">
                            <div class="navLink">
                                <router-link to="/" class="d-block fw-bold btn-primary">{{$t("header.calculator")}}</router-link>
                            </div>
                        </li>
                        <li>
                            <div class="navLink">
                                <router-link to="/allProducts" class="d-block fw-bold btn-primary">{{$t("header.allProducts")}}</router-link>
                            </div>
                        </li>
                        <li>
                            <div class="navLink">
                                <router-link to="/about" class="d-block fw-bold btn-primary">{{$t("header.about")}}</router-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="container titlePage">
                <h3>{{$t("header.calculateCalories")}}</h3>
                <h1>FIT CALCULATOR</h1>
                <p>{{$t("header.carboCalProtIg")}}</p>
                <router-link to="/calculator" class="btn btn-primary calc text-white mt-4 hoverButton">{{$t("header.calculator")}}</router-link>
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
    data() {
        return {
            show: false
        }
    },
    methods: {
        showDropdown() {
            this.show = !this.show;
        },
    },
}
</script>
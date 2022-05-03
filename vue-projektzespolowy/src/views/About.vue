<template>
    <div class="">
        <h1 class="text-center">{{$t("header.projectCreators")}}</h1>
        <div class="row ">
            <div class="col-12 col-md-6 my-2 aboutRow">
                <img src="https://media-exp1.licdn.com/dms/image/C4E03AQHXcwNIAj38Ow/profile-displayphoto-shrink_400_400/0/1625325793517?e=1657152000&v=beta&t=xR83f-YN0c0S5Gs_PiI_6FNwzIAZjwtndAbKOvameTI" class="foto"/>
                <div class="d-inline-block px-4">
                    <h5>Frontend Developer i Lider zespołu</h5>
                    <p>Marta Jamróz Kulig</p>
                </div>
            </div>
            <div class="col-12 col-md-6 my-2 aboutRow">
                <img src="./../assets/images/Michał_Drozd.jpg" class="foto"/>
                <div class="d-inline-block px-4">
                    <h5>Backend Developer</h5>
                    <p>Michał Drozd</p>
                </div>
            </div>
            <div class="col-12 col-md-6 my-4 aboutRow">
                <img src="./../assets/images/Dawid_Gac.jpg" class="foto"/>
                <div class="d-inline-block px-4">
                    <h5>Business Analyst</h5>
                    <p>Dawid Gac</p>
                </div>
            </div>
            <div class="col-12 col-md-6 my-4 aboutRow">
                <img src="./../assets/images/Kamil_Koncewicz.jpg" class="foto"/>
                <div class="d-inline-block px-4">
                    <h5>Graphic Designer</h5>
                    <p>Kamil Koncewicz</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.aboutRow {
    height: 250px;
}
.foto {
    box-shadow: 0px 0px 15px 0px rgba(66, 68, 90, 1);
    border: 6px solid black;
    display: inline-block;
    width: 200px;
    height: 100%;
    object-fit: cover;
}
</style>
<script setup>
// defineProps({
//   msg: {
//     type: String,
//     required: true
//   }
// })
</script>

<template>
  	<div class="footerContainer backgroundPrimary">
    	<footer class="container py-5">
			<div class="copyright-text">
				<p>Copyright &amp; <strong>FIT Calculator </strong>All Rights Reserved.</p>
			</div>
			<div class="footer-social-section d-flex justify-content-between align-items-center">
              	<h4 class="social-title mb-0">Follow Us On Social:</h4>
				<ul class="social-link nav">
					<li class="nav-item"><a href="" target="_blank" class="nav-link"><i class="uil uil-github"></i></a></li>
					<li class="nav-item"><a href="" target="_blank" class="nav-link"><i class="uil uil-instagram"></i></a></li>
					<li class="nav-item"><a href="" target="_blank" class="nav-link"><i class="uil uil-google"></i></a></li>
					<li class="nav-item"><a href="" target="_blank" class="nav-link"><i class="uil uil-linkedin"></i></a></li>
					<li class="nav-item"><a href="" target="_blank" class="nav-link"><i class="uil uil-twitter"></i></a></li>
				</ul>
            </div>
    	</footer>
    <!-- <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>.
    </h3> -->
  	</div>
</template>

<style scoped>
.footerContainer {
	background-image: url(
            "/src/assets/images/bgFooter.jpg"
    );
	background-size: contain;
}
.social-link {
	font-size: 33px;
}
.social-link .nav-link {
	color: #516b09;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

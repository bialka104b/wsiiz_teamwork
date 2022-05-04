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
				<p><i class="uil uil-copyright"></i> &amp; <strong>FIT Calculator </strong>{{$t("header.rightReserved")}}</p>
			</div>
			<div class="footer-social-section d-flex justify-content-between align-items-center">
              	<h4 class="social-title mb-0">{{$t("header.followUs")}}:</h4>
				<ul class="social-link nav">
					<li class="nav-item"><a href="" target="_blank" class="nav-link"><i class="uil uil-github"></i></a></li>
					<li class="nav-item"><a href="" target="_blank" class="nav-link"><i class="uil uil-instagram"></i></a></li>
					<li class="nav-item"><a href="" target="_blank" class="nav-link"><i class="uil uil-google"></i></a></li>
					<li class="nav-item"><a href="" target="_blank" class="nav-link"><i class="uil uil-linkedin"></i></a></li>
					<li class="nav-item"><a href="" target="_blank" class="nav-link"><i class="uil uil-twitter"></i></a></li>
				</ul>
            </div>
    	</footer>
  	</div>
</template>
<template>
  <header class="header-area">
    <div class="navbar-area" :class="{ sticky: scrolled }">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <nav class="navbar navbar-expand-lg">
              <a class="navbar-brand" href="index.html">
                <svg width="215" height="48" viewBox="0 0 215 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.7698 17.5157C39.7698 17.5157 42.987 12.6604 36.8257 6.17257C32.5727 2.33617 26.9377 0 20.7567 0C13.9818 0 7.37297 2.49379 3.9053 7.72908C1.32706 11.6218 2.55989 15.0191 4.61178 17.2905C6.33999 19.2045 6.23584 19.9616 7.19002 21.6814C8.05131 23.2295 10.1342 29.6244 12.8362 31.3301C12.8362 31.3301 8.94919 21.4928 22.454 19.8153C22.454 19.8153 21.4013 18.0702 12.5801 17.8084C4.0967 17.5579 3.88278 13.5554 4.38098 11.5739C5.1916 8.34831 11.4739 5.44357 19.3578 8.58192C21.8826 9.58676 24.1428 10.707 26.1018 11.8301C24.4665 12.9841 20.0474 12.7279 20.0474 12.7279C23.1295 15.6045 28.2719 14.853 30.1662 14.4477C32.0998 15.855 33.4396 17.1104 34.0814 17.952C35.59 19.9222 40.2624 24.0119 41.2362 22.1627C42.2045 20.3078 39.7698 17.5157 39.7698 17.5157Z" fill="#75ACB4"/>
<path d="M1.69597 30.48C1.69597 30.48 -1.5212 35.3353 4.64011 41.8232C8.89308 45.6596 14.528 47.9957 20.7091 47.9957C27.484 47.9957 34.0928 45.5019 37.5605 40.2666C40.1387 36.374 38.9059 32.9767 36.854 30.7052C35.1258 28.7912 35.2299 28.0341 34.2758 26.3143C33.4145 24.7663 31.3316 18.3713 28.6295 16.6656C28.6295 16.6656 32.5166 26.5029 19.0118 28.1805C19.0118 28.1805 20.0645 29.9256 28.8857 30.1873C37.3691 30.4378 37.583 34.4403 37.0848 36.4218C36.2742 39.6474 29.9918 42.5522 22.1079 39.4138C19.5832 38.409 17.323 37.2887 15.364 36.1657C16.9993 35.0117 21.4184 35.2678 21.4184 35.2678C18.3363 32.3912 13.1939 33.1427 11.2996 33.548C9.36594 32.1407 8.02616 30.8854 7.38441 30.0438C5.87575 28.0735 1.2034 23.9838 0.229527 25.833C-0.744349 27.6823 1.69597 30.48 1.69597 30.48Z" fill="#1F5C64"/>
<path d="M79.4089 32.6558L75.4064 41.629C74.7168 43.1404 74.1595 44.1594 73.7373 44.6801C73.3151 45.2036 72.8479 45.4625 72.3356 45.4625C71.8459 45.4625 71.4124 45.2514 71.0352 44.8292C70.7904 44.5619 70.2302 43.5852 69.3521 41.8935C68.4739 40.2047 67.7449 38.7045 67.1679 37.3901L62.7657 27.4824C62.1662 26.1033 61.5329 25.4137 60.8658 25.4137C60.1537 25.4137 59.7653 26.0019 59.6978 27.1813C59.5429 29.8045 59.4641 32.2308 59.4641 34.4516C59.4641 36.7652 59.5739 38.333 59.7991 39.1549C59.9539 39.6446 60.1594 39.9993 60.4155 40.2216C60.6716 40.444 61.3669 40.8437 62.5012 41.4235C63.2358 41.8035 63.6017 42.4565 63.6017 43.391C63.6017 45.8819 60.4099 47.126 54.029 47.126C48.6474 47.126 45.9565 45.9157 45.9565 43.4895C45.9565 42.8674 46.0945 42.4171 46.3731 42.1384C46.6518 41.8598 47.3667 41.4432 48.5235 40.8887C49.2582 40.5538 49.7507 40.1006 50.0069 39.5208C50.263 38.9438 50.4797 37.8207 50.657 36.1516C50.8569 34.3728 51.0455 31.4539 51.2228 27.3952C51.4001 23.3364 51.4902 19.8631 51.4902 16.9725C51.4902 13.3472 51.2115 10.89 50.657 9.60085C50.4572 9.15614 50.2292 8.824 49.9731 8.59883C49.7169 8.37647 49.2328 8.08656 48.5235 7.73191C46.9445 6.97758 46.1564 5.99808 46.1564 4.79621C46.1564 4.01936 46.4519 3.30725 47.0402 2.66269C47.6285 2.01813 48.4138 1.56216 49.3904 1.29476C50.3699 1.00485 51.676 0.757163 53.3085 0.543248C54.9438 0.332148 56.3258 0.225189 57.4601 0.225189C60.3057 0.225189 62.3182 0.458808 63.4976 0.926043C64.0746 1.1484 64.5305 1.44957 64.8655 1.82674C65.2004 2.20672 65.6761 2.98357 66.301 4.16291L73.2391 16.9387C73.9935 18.3404 74.517 19.1961 74.8069 19.5057C75.0968 19.8181 75.4965 19.9729 76.0088 19.9729C76.4535 19.9729 76.8475 19.8068 77.1937 19.4719C77.5371 19.1369 77.9453 18.5149 78.4125 17.603L83.1158 8.42995C83.6928 7.2506 84.0728 6.48501 84.2501 6.12755C85.3394 3.90396 86.4174 2.42626 87.4842 1.69163C88.8408 0.734646 91.3093 0.256151 94.8896 0.256151C101.183 0.256151 104.33 1.69163 104.33 4.55978C104.33 5.20434 104.206 5.72224 103.964 6.11066C103.719 6.49909 103.218 6.97195 102.464 7.52926C101.439 8.30892 100.795 9.42916 100.53 10.8984C100.018 13.9664 99.7617 17.7015 99.7617 22.1064C99.7617 27.778 100.029 32.7459 100.561 37.0157C100.693 38.0628 100.899 38.7721 101.178 39.1492C101.456 39.5292 102.171 40.095 103.328 40.8493C104.127 41.3841 104.53 42.0962 104.53 42.9828C104.53 44.5393 103.497 45.6399 101.428 46.2844C100.361 46.6391 99.2382 46.8727 98.0589 46.9853C96.8795 47.0951 95.0669 47.1513 92.6209 47.1513C88.8633 47.1513 86.0599 46.884 84.2163 46.352C82.1701 45.7525 81.1483 44.7279 81.1483 43.284C81.1483 42.7492 81.2806 42.3129 81.548 41.9667C81.8154 41.6233 82.505 40.9957 83.6168 40.0809C84.1938 39.6137 84.5879 38.713 84.8018 37.3788C85.0129 36.0447 85.1198 33.776 85.1198 30.5758C85.1198 28.7969 85.0354 27.6288 84.8693 27.0743C84.7033 26.5198 84.3514 26.2412 83.8195 26.2412C83.1974 26.2412 82.5951 26.669 82.0181 27.5247C81.4326 28.3916 80.5657 30.1001 79.4089 32.6558Z" fill="#1F5C64"/>
<path d="M155.658 17.6114V25.7514C155.658 30.6658 155.293 34.1448 154.558 36.191C152.979 40.5059 149.508 43.6302 144.152 45.5639C140.904 46.7657 137.236 47.3653 133.144 47.3653C126.006 47.3653 120.289 45.6652 116 42.2623C113.908 40.5932 112.465 38.6595 111.662 36.4584C110.863 34.2574 110.461 31.0768 110.461 26.9195C110.461 25.2954 110.517 22.6271 110.627 18.9146C110.694 16.2913 110.728 14.5575 110.728 13.7103C110.728 11.8638 110.59 10.586 110.311 9.87388C110.033 9.16176 109.428 8.49469 108.493 7.87265C107.027 6.91566 106.292 5.8489 106.292 4.66955C106.292 3.80263 106.664 3.03423 107.409 2.36715C108.155 1.70007 109.138 1.2441 110.362 0.999222C112.808 0.509469 115.699 0.264597 119.034 0.264597C122.704 0.264597 125.75 0.543247 128.173 1.09774C130.552 1.63252 131.742 2.84283 131.742 4.73429C131.742 5.66876 131.396 6.41465 130.709 6.96914C130.554 7.10143 129.887 7.44763 128.708 8.00212C127.996 8.31455 127.512 8.8803 127.258 9.70218C127.002 10.5241 126.876 11.8807 126.876 13.7722C126.876 15.7059 126.786 19.8885 126.608 26.3144C126.496 30.1395 127.531 33.0527 129.71 35.0539C131.489 36.7005 133.78 37.5224 136.581 37.5224C138.36 37.5224 139.972 37.1959 141.416 36.5372C142.86 35.8814 143.961 34.9863 144.718 33.852C145.317 32.9851 145.728 32.0169 145.951 30.9501C146.173 29.8834 146.286 28.4282 146.286 26.5817V19.2439C146.173 13.6174 146.013 10.3214 145.801 9.35316C145.59 8.38491 144.873 7.62496 143.651 7.06765C142.494 6.55538 141.706 6.08814 141.284 5.66594C140.862 5.24374 140.651 4.72022 140.651 4.09817C140.651 2.76402 141.444 1.79296 143.035 1.17936C144.625 0.568581 147.175 0.26178 150.691 0.26178C154.136 0.26178 156.632 0.562948 158.178 1.16247C159.723 1.762 160.497 2.71899 160.497 4.03062C160.497 4.67518 160.365 5.15368 160.097 5.4661C159.83 5.77853 159.129 6.25702 157.995 6.90158C156.815 7.56866 156.143 8.2864 155.977 9.05199C155.808 9.82321 155.704 12.6773 155.658 17.6114Z" fill="#1F5C64"/>
<path d="M188.413 0C191.326 0 194.07 0.410939 196.651 1.23282C197.808 1.6128 198.596 1.79857 199.018 1.79857C199.463 1.79857 200.397 1.54244 201.819 1.03017C202.286 0.875359 202.765 0.796552 203.254 0.796552C204.498 0.796552 205.689 1.53118 206.823 2.99762C208.647 5.35631 209.559 7.93455 209.559 10.7351C209.559 12.6491 209.075 14.1944 208.11 15.3709C207.141 16.5503 205.869 17.1385 204.29 17.1385C203.001 17.1385 201.732 16.6713 200.488 15.7368C200.108 15.4469 199.187 14.4027 197.718 12.6013C195.272 9.59802 192.457 8.0978 189.28 8.0978C186.389 8.0978 184.092 9.1533 182.392 11.2671C180.692 13.3809 179.839 16.2266 179.839 19.8068C179.839 25.1209 181.196 29.6469 183.909 33.382C184.931 34.7386 186.155 35.8223 187.579 36.6329C189.001 37.4464 190.414 37.8517 191.816 37.8517C192.972 37.8517 193.921 37.4689 194.667 36.7005C195.413 35.9321 195.784 34.9497 195.784 33.7479C195.784 32.6811 195.472 31.924 194.85 31.4793C194.605 31.3019 194.377 31.195 194.166 31.1612C193.955 31.1274 193.316 31.1105 192.249 31.1105C191.292 31.1105 190.498 30.8065 189.865 30.1929C189.232 29.5822 188.914 28.8081 188.914 27.8737C188.914 26.0272 190.135 24.7156 192.584 23.9388C195.275 23.0944 198.377 22.6722 201.889 22.6722C205.647 22.6722 208.805 23.0606 211.363 23.8402C213.787 24.5974 215 25.9653 215 27.944C215 28.7434 214.721 29.4386 214.167 30.0297C213.609 30.618 212.889 30.9698 211.999 31.0796C211.22 31.1922 210.716 31.3639 210.482 31.5975C210.249 31.8311 210.01 32.4025 209.765 33.3144C208.808 36.8496 206.942 39.8079 204.161 42.1863C202.247 43.8103 199.941 45.0769 197.239 45.9889C194.537 46.9008 191.697 47.3568 188.717 47.3568C183.847 47.3568 179.377 46.2337 175.307 43.9876C171.128 41.6965 167.947 38.4962 165.769 34.3812C163.945 30.9585 163.033 27.2544 163.033 23.2745C163.033 19.2495 164.122 15.4244 166.301 11.7991C168.614 7.90922 171.848 4.90597 176.006 2.79215C179.628 0.93447 183.766 0 188.413 0Z" fill="#1F5C64"/>
</svg>

              </a>
              <!-- <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="toggler-icon" />
                <span class="toggler-icon" />
                <span class="toggler-icon" />
              </button> -->

              <div id="navbarSupportedContent" class="collapse navbar-collapse sub-menu-bar">
                <ul id="nav" class="navbar-nav ml-auto">
                  <!-- <li class="nav-item active">
                    <a class="page-scroll" href="#home" style="color:black">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="page-scroll" href="#features" style="color:black">Features</a>
                  </li> -->
              
                  <li class="nav-item">
                    <!-- <a class="main-btn" data-scroll-nav="0" href="#pricing">Login</a> -->
                    <!-- <button class="btn" type="button" id="start-btn" v-on:click="this.$router.push({ path: '/signup' })">Login</button> -->
                    <!-- <button class="btn" type="button" id="start-btn">Login</button> -->
                  </li>
                </ul>
              </div> <!-- navbar collapse -->
              <button class="btn" type="button" id="start-btn" v-on:click="this.$router.push({ path: '/signup' })">Get Started</button>

         
            </nav> <!-- navbar -->
          </div>
        </div> <!-- row -->
      </div> <!-- container -->
    </div> <!-- navbar area -->
  </header>
</template>

<script>
import $ from "jquery";


export default {
  data () {
    return {
      scrolled: false
    }
  },
  computed: {
    logo () {
      return this.scrolled ? require('../assets/images/logo-2.svg') : require('../assets/images/logo.svg')
    }
  },
  mounted () {
    // Sticky headesr
    $(window).on('scroll', () => {
      this.scrolled = $(window).scrollTop() > 20
    })
  }
}
</script>

<style>
.navbar-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}

.sticky {
  position: fixed;
  z-index: 99;
  background-color: #fff;
  -webkit-box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.05);
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}

.sticky .navbar {
  padding: 10px 0;
}

.navbar {
  padding: 25px 0;
  border-radius: 5px;
  position: relative;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}

.navbar-brand {
  padding: 0;
}

.navbar-toggler {
  padding: 0;
}

.navbar-toggler .toggler-icon {
  width: 30px;
  height: 2px;
  background-color: #fff;
  display: block;
  margin: 5px 0;
  position: relative;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}

.navbar-toggler.active .toggler-icon:nth-of-type(1) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  top: 7px;
}

.navbar-toggler.active .toggler-icon:nth-of-type(2) {
  opacity: 0;
}

.navbar-toggler.active .toggler-icon:nth-of-type(3) {
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -ms-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
  top: -7px;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .navbar-collapse {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 9;
    -webkit-box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 5px 12px;
  }
}

@media (max-width: 767px) {
  .navbar-collapse {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 9;
    -webkit-box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 5px 12px;
  }
}

.navbar-nav .nav-item {
  margin-right: 45px;
  position: relative;
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .navbar-nav .nav-item {
    margin-right: 30px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .navbar-nav .nav-item {
    margin: 0;
  }
}

@media (max-width: 767px) {
  .navbar-nav .nav-item {
    margin: 0;
  }
}

.navbar-nav .nav-item a {
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
  padding-top: 20px;
  margin-top: 20px;
  /* padding: 10px 0; */
  position: relative;
  font-family: "Poppins", sans-serif;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .navbar-nav .nav-item a {
    display: block;
    padding: 4px 0;
    color: #2E2E2E;
  }
}

@media (max-width: 767px) {
  .navbar-nav .nav-item a {
    display: block;
    padding: 4px 0;
    color: #2E2E2E;
  }
}

.navbar-nav .nav-item:hover .sub-menu {
  top: 100%;
  opacity: 1;
  visibility: visible;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .navbar-nav .nav-item:hover .sub-menu {
    top: 0;
  }
}

@media (max-width: 767px) {
  .navbar-nav .nav-item:hover .sub-menu {
    top: 0;
  }
}

.navbar-nav .nav-item .sub-menu {
  width: 200px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 110%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .navbar-nav .nav-item .sub-menu {
    position: relative;
    width: 100%;
    top: 0;
    display: none;
    opacity: 1;
    visibility: visible;
  }
}

@media (max-width: 767px) {
  .navbar-nav .nav-item .sub-menu {
    position: relative;
    width: 100%;
    top: 0;
    display: none;
    opacity: 1;
    visibility: visible;
  }
}
.navbar-nav .nav-item .sub-menu li {
  display: block;
}

.navbar-nav .nav-item .sub-menu li a {
  display: block;
  padding: 8px 20px;
  color: #2E2E2E;
}

.navbar-nav .nav-item .sub-menu li a.active,
.navbar-nav .nav-item .sub-menu li a:hover {
  padding-left: 25px;
  color: #1F5C64;
}

/* .main-button {
  background-color: #1F5C64;
} */

.navbar-nav .sub-nav-toggler {
  display: none;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .navbar-nav .sub-nav-toggler {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    background: none;
    color: #2E2E2E;
    font-size: 18px;
    border: 0;
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 767px) {
  .navbar-nav .sub-nav-toggler {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    background: none;
    color: #2E2E2E;
    font-size: 18px;
    border: 0;
    width: 30px;
    height: 30px;
  }
}

.navbar-nav .sub-nav-toggler span {
  width: 8px;
  height: 8px;
  border-left: 1px solid #2E2E2E;
  border-bottom: 1px solid #2E2E2E;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  position: relative;
  top: -5px;
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .navbar-btn {
    position: absolute;
    top: 50%;
    right: 50px;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
}

@media (max-width: 767px) {
  .navbar-btn {
    position: absolute;
    top: 50%;
    right: 50px;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
}



/* .navbar-btn .main-btn {
  height: 45px;
  line-height: 45px;
  background: -webkit-linear-gradient(left, #1F5C64 0%, #1F5C64 50%, #1F5C64 100%);
  background: -o-linear-gradient(left, #1F5C64 0%, #1F5C64 50%, #1F5C64 100%);
  background: linear-gradient(to right, #1F5C64 0%, #1F5C64 50%, #1F5C64 100%);
  background-size: 200%;
}

.navbar-btn .main-btn:hover {
  color: #fff;
  background-position: right center;
} */

.sticky .navbar-toggler .toggler-icon {
  background-color: #2E2E2E;
}

.sticky .navbar-nav .nav-item a {
  color: #2E2E2E;
}

.sticky .navbar-nav .nav-item.active>a,
.sticky .navbar-nav .nav-item:hover>a {
  color: #1F5C64;
}

#start-btn{
  background-color: #75ACB4 !important;
  color: white;
}

#start-btn:hover{
  background-color: #1F5C64 !important;
}

.page-scroll{
  color: black !important;
  /* margin-top: 10px !important; */

}

</style>

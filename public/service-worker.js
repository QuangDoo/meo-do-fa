if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return s[e]||(a=new Promise(async a=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=a}else importScripts(e),a()})),a.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},a=(a,s)=>{Promise.all(a.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(a)};self.define=(a,c,i)=>{s[a]||(s[a]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+a.slice(1)};return Promise.all(c.map(a=>{switch(a){case"exports":return s;case"module":return n;default:return e(a)}})).then(e=>{const a=i(...e);return s.default||(s.default=a),s})}))}}define("./service-worker.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/4CkoVzF7nCj2YEFkOjCIX/_buildManifest.js",revision:"27ecb68b463123c19baf6849564409e5"},{url:"/_next/static/4CkoVzF7nCj2YEFkOjCIX/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/11ed4fd39ee16d5a576f19160bdd3a03c949f835.5e8907f1ab26be55928f.js",revision:"f03ea2084927362406b68159c086335b"},{url:"/_next/static/chunks/27d51d120bc94881be651b5253f76d7682541990.bd16cf0c1365d748b9b5.js",revision:"a23c6f6850655d06944362c93f27e2d6"},{url:"/_next/static/chunks/29107295.8f1d796667d1e8b232cf.js",revision:"c002be30f678aa9b3a4a50bba1736acc"},{url:"/_next/static/chunks/4047657cf38b6acc4f3aca0f88a992e453043df5.cff6c60cd7c44d033c97.js",revision:"eb5420b7b61fc38363a751f5dc4b1fef"},{url:"/_next/static/chunks/4f7e5b1942f2cedf1eb0be81358ec9967e1034ad.1eacc7d8f292b7e8845d.js",revision:"712fd7ff4dcae2cfb8ae1837286a83cf"},{url:"/_next/static/chunks/51.ffecee72ded022955a9b.js",revision:"51cc0bcb338f66fb4cb5f62d8cbedc5f"},{url:"/_next/static/chunks/61e5f7b25c401633b03c14cffcfe66cdd02993ca.0387c5934100cb0dabfd.js",revision:"29658251cf21ff08705db21ae4852722"},{url:"/_next/static/chunks/7063c4586cd9cc1aebc6942c8a228e53701b9742.9adf5b4eb45509767c87.js",revision:"32e6c6f33ed08502993a59eb9946ce7f"},{url:"/_next/static/chunks/75fc9c18.9632b3bc8a17d216d8d5.js",revision:"a1d0b9260641b7302b504e876688c723"},{url:"/_next/static/chunks/9d7d20a7.955cd01b185e91c5e5fc.js",revision:"092922c847857276e09f07690ba228b6"},{url:"/_next/static/chunks/a7102ef34955a78a79b28c98d7e5a4c78aec0ec3.019bdef28ba791fa01ee.js",revision:"b77a74fd9e8310b0f45b6577f7552108"},{url:"/_next/static/chunks/cd0d16f5437ad11d251d5f0f105c3c4561917b92.aa341539f567950a951e.js",revision:"db0db5871afca058c6bca93148e6a0e8"},{url:"/_next/static/chunks/commons.f2b264b44fbc01367330.js",revision:"d9d4991b2f5225eeccee368a2d679e5c"},{url:"/_next/static/chunks/f5180a74f322d8179869df4e78b9bb51e3fcbe9e.ea8158b8385aa11a182a.js",revision:"217a8e309db6c5f1a2bf46a94be80a36"},{url:"/_next/static/chunks/framework.380a80350faa950c8f76.js",revision:"5cba2424f6857a1e6c4a288f467da050"},{url:"/_next/static/chunks/main-28517efec494e31a8a80.js",revision:"fd7d3523b614f0e296d1345196bf4a5d"},{url:"/_next/static/chunks/pages/_app-1d698a570b6ab33b5c5f.js",revision:"e51eea1123e0cfc722c40486fd25cc86"},{url:"/_next/static/chunks/pages/_error-cd6ec294b065b7831326.js",revision:"11039271ffe26a3ecbb465784ea53a9b"},{url:"/_next/static/chunks/pages/about-us-705c90c168a7135b9b0f.js",revision:"2d31c4a4ef14408ad6b93f14514ce7aa"},{url:"/_next/static/chunks/pages/authentications/signup_business-6f7c039f6c0aaa48ad09.js",revision:"6824a657b4a16c4c061cbae1317d50a8"},{url:"/_next/static/chunks/pages/career-5c4f9141b1b7948a5415.js",revision:"414c74262bd6dd59cc6d792964604e6c"},{url:"/_next/static/chunks/pages/career/jobs/%5BjobId%5D-d0673e8ba623b08dc684.js",revision:"b14ecba48ee8422bc32f2b3aa3b59206"},{url:"/_next/static/chunks/pages/cart-832f2f6c141f5f2ed30d.js",revision:"b27943579d3e9f5bc75719d7d8218e54"},{url:"/_next/static/chunks/pages/checkout-21b527697ec6397d8b08.js",revision:"a56a061eb869ba321f61a2fcf9fe1667"},{url:"/_next/static/chunks/pages/deals-8dee190d3ac06c504c5b.js",revision:"f815fdabd6cd1b847b8614e33aa07550"},{url:"/_next/static/chunks/pages/dispute-resolution-f057208c16898c7a8ca5.js",revision:"0d196e5148da7e3b36d85c209e4f4a18"},{url:"/_next/static/chunks/pages/general-policy-1fa5a283bad7d7ba8d3a.js",revision:"65e787ad71c7fb8e2e844653ba455c4c"},{url:"/_next/static/chunks/pages/help-d94e2650a1ac800ddee9.js",revision:"36df75e2cb94c2187d53ac183390a1aa"},{url:"/_next/static/chunks/pages/help/%5BhelpId%5D-7b351c0b0421fbe6b2f0.js",revision:"b15207abb99901131df23e8b5d9c8da8"},{url:"/_next/static/chunks/pages/help/huong-dan-chuyen-khoan-bc7c9d7b109047cda80c.js",revision:"bb35e683b06f43843852a2c4b2710a87"},{url:"/_next/static/chunks/pages/index-d213093dff2c57d8046a.js",revision:"38f72f5f418a5cc08470a0e93d7c69e2"},{url:"/_next/static/chunks/pages/ingredients-26631f09d67340fc888e.js",revision:"b96d2bc8f73be12ccf4f8f90d7eabbd2"},{url:"/_next/static/chunks/pages/ingredients/%5B...slug%5D-739542c30d471bf6f3bd.js",revision:"1a063241c8d77cc8aab492d455d979eb"},{url:"/_next/static/chunks/pages/manufacturers-b628ca2f2d9549743154.js",revision:"10818cdb166240b1484571f161478010"},{url:"/_next/static/chunks/pages/my-account-c0232099fbf3c74289dd.js",revision:"c660060114888fcda3660f53cafe2d3d"},{url:"/_next/static/chunks/pages/my-orders-036e434a8b795fd1c4f8.js",revision:"0767f1ac1d9e267e2bdf571808a342a0"},{url:"/_next/static/chunks/pages/my-orders/%5BorderId%5D-deed5141fb1becfcbb37.js",revision:"38f3232f49a4b79fdc7b175407b440aa"},{url:"/_next/static/chunks/pages/my-promo-codes-78dd02ebb78952b6eaa1.js",revision:"37ce6e3f3214ddd34d71dfb57683e60e"},{url:"/_next/static/chunks/pages/news-aaa8d93cf04dda5b1c2e.js",revision:"00402679f1574a6f4ed9264e44e11977"},{url:"/_next/static/chunks/pages/news/%5BpostId%5D-8758993c520906c8d389.js",revision:"100d4545a905d53498b063cd6e724719"},{url:"/_next/static/chunks/pages/notifications-c17d94af88c81948e441.js",revision:"91d64acfc940ee16a76b199d804f8b1d"},{url:"/_next/static/chunks/pages/operating-regulations-82183ca9f4c1e5fe4bb0.js",revision:"c674a50e182c07c89975ae22531f2c5c"},{url:"/_next/static/chunks/pages/privacy-policy-ba941ed2c94e5136c93c.js",revision:"a0180ac79550cff370a0d8a4aca75e70"},{url:"/_next/static/chunks/pages/products-109953d58468fb8209b7.js",revision:"bff9ba8308e5c6e558b55e8ef58a66ee"},{url:"/_next/static/chunks/pages/products/%5BproductId%5D-b524305d0fdaa08c40f0.js",revision:"66f22f7b38f7017f9fc2fb59e9711f91"},{url:"/_next/static/chunks/pages/promo-codes-67da39709b574063a5e2.js",revision:"4cb6560e9db36e93ee18831dfeca8cf6"},{url:"/_next/static/chunks/pages/quick-order-a3e1b21ad8aea3fd5709.js",revision:"b8106dfe2624624a0e9e8bd097e23d9b"},{url:"/_next/static/chunks/pages/terms-and-conditions-29e87792ada35b2fe8e4.js",revision:"779987761bf3e7543b137f5a5ccad49d"},{url:"/_next/static/chunks/pages/terms-of-service-d04b0894c4ca5d30056e.js",revision:"303d29eeac9a4c54e140b923f243a30a"},{url:"/_next/static/chunks/pages/terms-of-use-364819ca8a1ffa8c496d.js",revision:"5d64b559a211203ede34fbb7d03b2206"},{url:"/_next/static/chunks/polyfills-2ef7089b721d5851aa0d.js",revision:"ee3b78db6561c53237197e268fd96d8d"},{url:"/_next/static/chunks/webpack-971da562817baa5f341c.js",revision:"84e013be92b980ef4f6d7604b573a193"},{url:"/_next/static/css/9bb83065c2746b3d04f7.css",revision:"10bb31bb539f113bef44351f5af32157"},{url:"/_next/static/css/b35c60ad66200cf1dfcb.css",revision:"4f56ef417b6d6fd2850fbac387e5b024"},{url:"/_next/static/media/ajax-loader.fb6f3c230cb846e25247dfaa1da94d8f.gif",revision:"c5cd7f5300576ab4c88202b42f6ded62"},{url:"/_next/static/media/slick.2630a3e3eab21c607e21576571b95b9d.svg",revision:"f97e3bbf73254b0112091d0192f17aec"},{url:"/_next/static/media/slick.295183786cd8a138986521d9f388a286.woff",revision:"b7c9e1e479de3b53f1e4e30ebac2403a"},{url:"/_next/static/media/slick.a4e97f5a2a64f0ab132323fbeb33ae29.eot",revision:"ced611daf7709cc778da928fec876475"},{url:"/_next/static/media/slick.c94f7671dcc99dce43e22a89f486f7c2.ttf",revision:"d41f55a78e6f49a5512878df1737e58a"},{url:"/_next/static/media/utm-avo.6d85fc7dd378f16d546a16a436428e03.woff",revision:"85f78fbacb4401d7a56280c6d49dcb11"},{url:"/_next/static/media/utm-avobold.9c0ab9a6808a3a6b7473efbbc1f37015.woff",revision:"fee5203af564e3fd118ab1f8916c6087"},{url:"/assets/images/NTT-fb6d731b186fd67092490155abaa2dfe03a58d2ad74cdf1e494b27050ddb4576.png",revision:"e21027a857afc2099d38565f081ae9cc"},{url:"/assets/images/about-us-1.jpg",revision:"a6ec92ce5711f68817a2145f15819073"},{url:"/assets/images/about-us-2.jpg",revision:"51a6c993615f6e52c692caa4b3067078"},{url:"/assets/images/about-us-3.jpg",revision:"ab1ccd4ae277ba9b437ec7c15dffda17"},{url:"/assets/images/account-type__clinic.png",revision:"96107375eaa21b307b83ae9beaa33bff"},{url:"/assets/images/account-type__drugstore.png",revision:"9adbaca0089412015987e972d5feb713"},{url:"/assets/images/account-type__pharmacy.png",revision:"3082d086b073b36c5ecb3080349c89b9"},{url:"/assets/images/ahamove-da817db210e5d075aed3853aeed370863737426a27abc6e91c16ccc8a89e6e2f.png",revision:"91a3963b8c4fdf7d5a73983ad379bf25"},{url:"/assets/images/android-ac8666e166fe12cc8e6fa05c08bd05ab3797f5b68a40bc7756b05638c050e3a7.png",revision:"1c65c11e236c915a2cc38c113b5dcd80"},{url:"/assets/images/app_store-df16e1f9024ceb5d5e123c0921d28b347703ca506f48eadf987013eac135ae0f.png",revision:"0a74691509fb0514474e71f02954e078"},{url:"/assets/images/bct-150ac1809a7ae41e0a4b21f1e1e21a26a2f93ee0c79e5c99cc197dd2fdc988c8.png",revision:"e448525f2500e9f81ecb4bf8096d1c1b"},{url:"/assets/images/category_1.png",revision:"3942b3b4bed2e098ea28a0a81fd38e91"},{url:"/assets/images/category_2.png",revision:"fcba88093e47dd50da1784eb1aa32fe8"},{url:"/assets/images/category_3.png",revision:"4fb05af19006a149df51c1eac26dc3d6"},{url:"/assets/images/category_4.png",revision:"1fa4ca87b3ae17c972a9154d1e116d6d"},{url:"/assets/images/category_5.png",revision:"54864a4a03697ba93c5047c39c6b4fd5"},{url:"/assets/images/customer1.jpg",revision:"7c8b5aae4da3178389e48c03c3eb99c4"},{url:"/assets/images/drugstore1.jpg",revision:"555f6f4802da4881c8f0b36975ddee6f"},{url:"/assets/images/drugstore2.jpg",revision:"d9a7eca13512b1c5991230d2efdb7246"},{url:"/assets/images/drugstore3.jpg",revision:"7ad13059e21a1eaf5e66dc6145a2dab0"},{url:"/assets/images/e27-cb4049170b35067044fcd0f349629ab7aa611553abd57a68ef387ebb3f9ae024.png",revision:"19c43a04b68f48284ced1355b8aeaf16"},{url:"/assets/images/echelon-d5bad3e2adbe7549273ad51da80009b9f90e7d65816faef38effad7c3e71bd14.png",revision:"283f3590d037cf1e17fb116bd41ea4f4"},{url:"/assets/images/forbes_vn-80e941e673a0197e8510b2b44ec5bdcb8f7bcac4e2ac5a0ea74450fe38636188.png",revision:"d0d7d5a1632fbf612a683ac14fbf63d0"},{url:"/assets/images/ghn-7c7a86d8247685ce42bf1dd7eea07970b502b4a21be9ab6a15787dc0899a3b79.png",revision:"f087f1b5a9be1ef7500d124c6a440643"},{url:"/assets/images/ghtk-22fbe4903100177078c795a37f7ce7260582b95c1bad6cf37a0dba76127e7f5d.png",revision:"eb96f1209bbadb04612f755dfaa21868"},{url:"/assets/images/google_store-a423ff0891a18d965fd4037cad14a26b0e4f4e05b344d20ae6eb59e999e19e4d.png",revision:"2c6b8c54ba80dc298b095fc6be244c27"},{url:"/assets/images/grab-0d623c296e4838dd4d67984a580fa1b244962d8e5e8de76f3acb548cddbf0c6c.png",revision:"fe9f347a260bf98a8a254d987e434b16"},{url:"/assets/images/invest_global-68fe307b2be9da042162fcfde07c27fbeac62c3a0a3c9293a93f45410831ebe6.png",revision:"c4b527affbcf2596ee12c584c17dcdf5"},{url:"/assets/images/ios-77d063cf231d64a33f6f1421415984d5cbc27f9b1314e42f6fbdce69f2b58b35.png",revision:"5df85fbf1460bb0b98575bf803e3ac9d"},{url:"/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d(1).svg",revision:"51e19e5d6d83dc353272fb6b947ed0bf"},{url:"/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d.svg",revision:"51e19e5d6d83dc353272fb6b947ed0bf"},{url:"/assets/images/logo-icon-inverse-0b2c86569d4f524c701d36a672b0e6a64d8f61ba1d543bbe822b0fb282164ac2.svg",revision:"23c652a8b14c5d073d5660b47ab326e7"},{url:"/assets/images/logo.jpeg",revision:"e1d0cf26ddad71649ce14ebeb174d768"},{url:"/assets/images/logo2.png",revision:"c5dd4729b01c303001f606c1f9a73e73"},{url:"/assets/images/logo3.png",revision:"44a1552bf5710113ac0798b2dc9c9f39"},{url:"/assets/images/newsletter.png",revision:"5db2779a49dd8f86cd672aef288b7abe"},{url:"/assets/images/ninjavan-df8ca83378c8c4f339ac240d845807ef5cfdef493b0e0a1762b8cb4ccce8feea.png",revision:"5591496665c693b6310584a7c2cb1d8b"},{url:"/assets/images/no-image.jpg",revision:"625d1aff2d58f024870ef61b95680166"},{url:"/assets/images/partner1.jpg",revision:"a8ed2cffc9a893b3e9ce12f17bd175a9"},{url:"/assets/images/partner2.jpg",revision:"d13f08bfb49232dfd5901c7090b613fb"},{url:"/assets/images/partner3.jpg",revision:"19a9ae75dbba2c7afc952c290ccc2cc8"},{url:"/assets/images/pharma-logistics-logo.png",revision:"146b2cc6a5c3e0ba55d4f6ddf786adec"},{url:"/assets/images/pitch_at_palace-16eaf1ce142a949922a0541c3ee98771a49aa1194e3ee11a2511d975e0620642.png",revision:"d45e2383f9e57657a16a3536a8ad0805"},{url:"/assets/images/seedstars-c72fdf9dd4cb45a0259ffdf573570545dfd5382b94110a0934a4e82a9f900426.png",revision:"71b8bb8359fee89100eb3ffec54f0119"},{url:"/assets/images/slider1.png",revision:"1dc502fbf5cc032cd056317d10694c79"},{url:"/assets/images/slider2.png",revision:"6cee8c7e0c21bf2d33969c27c220bf6b"},{url:"/assets/images/slider3.png",revision:"f2b6aa44e131d3983f48399f85d37fa1"},{url:"/assets/images/tai_chinh_cuoc_song-d63649e52a8c7c68a84b850388b3e0fa89ada03c0e072003ab1b1e4c207362b6.png",revision:"e77636e8da4887206077f9e3525e42b3"},{url:"/assets/images/viettelpost-7e17e215b6fb2451347c386209259806b03dd68db90c636c9d800439cf195b0c.png",revision:"6f29a462faeb31f09b4160cbae7c0d89"},{url:"/favicon.ico",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/android-icon-192x192-menofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/apple-icon-114x114-medofa-manifest-20129.png",revision:"dc8f76bd75381f660f0ebdf71e0634bf"},{url:"/icons/apple-icon-120x120-medofa-manifest-20129.png",revision:"f1363331da74ed1a040243f29b8c9493"},{url:"/icons/apple-icon-144x144-medofa-manifest-20129.png",revision:"28770c9b8c9466b8ca95606ae23d226b"},{url:"/icons/apple-icon-152x152-medofa-manifest-20129.png",revision:"50f5a6e113ec5f1af9f4d764ca6813f0"},{url:"/icons/apple-icon-180x180-medofa-manifest-20129.png",revision:"6f9cf4a4bd74feda82e137679e1eaad0"},{url:"/icons/apple-icon-57x57-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/apple-icon-60x60-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/apple-icon-72x72-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/apple-icon-76x76-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/favicon-16x16-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/favicon-32x32-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/favicon-512x512-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/favicon-96x96-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/locales/en/aboutUs.json",revision:"fd89121793488606646c656863054948"},{url:"/locales/en/applyJob.json",revision:"24a39e4b97beb3d038077a3aaec6de16"},{url:"/locales/en/cancelOrder.json",revision:"a871be76cf0cd3b8266493fa63264546"},{url:"/locales/en/carousels.json",revision:"be810aaae019a2d6a01598a5c3fa3537"},{url:"/locales/en/cart.json",revision:"819691d3a3679679427d76bf8d229106"},{url:"/locales/en/checkout.json",revision:"b5ab801f0c2f3ad0bbf46a5dc18a177c"},{url:"/locales/en/common.json",revision:"e2055e03876226a6f63af3f8edb903d7"},{url:"/locales/en/deals.json",revision:"5275aead62d42faed916ec0e2c71ec7d"},{url:"/locales/en/disputeResolution.json",revision:"fb4d479e58e2bef55e2dae5462c6ca29"},{url:"/locales/en/errors.json",revision:"bdc2763f8d1f816a6793d09dfde39819"},{url:"/locales/en/filterTags.json",revision:"b061a255893745e69377f34ea95cff9f"},{url:"/locales/en/footer.json",revision:"30b498d0ecf7a47f347a6568999f6ad8"},{url:"/locales/en/generalPolicy.json",revision:"f80058f6042606de8f02593ef130511d"},{url:"/locales/en/header.json",revision:"0e2d0f26d085930d28961560ac25d5df"},{url:"/locales/en/help.json",revision:"d439b4eedb333d7bc8cc8b66bc835aae"},{url:"/locales/en/ingredientDetails.json",revision:"af2e35e13377223927f462b51f646a08"},{url:"/locales/en/jobDetail.json",revision:"5e3ed6c6be77a349bccbb791c5902644"},{url:"/locales/en/login.json",revision:"6c0c1966d397029e9711b50eeecfc43d"},{url:"/locales/en/manufacturers.json",revision:"814fa2de92a8b021d91819fd418d7aab"},{url:"/locales/en/myAccount.json",revision:"a6b13ac0705541898003f2f27845d997"},{url:"/locales/en/myOrders.json",revision:"43ec2f666304078843bb6f64b68a8f7f"},{url:"/locales/en/myPromoCodes.json",revision:"b5ada9282d5717f4a1a415f5b6abc084"},{url:"/locales/en/navbar.json",revision:"57389a596c9f59b15c3e636417578d30"},{url:"/locales/en/noti.json",revision:"01a8e225bd9da263ae74e0f036f29a89"},{url:"/locales/en/operatingRegulations.json",revision:"ebcca3af1ed4549675c00ba23e226ce5"},{url:"/locales/en/partner.json",revision:"6afab885f9c04b7c30df9259f3a0125a"},{url:"/locales/en/password.json",revision:"a26d06d0a30d477d0f4793270228ca50"},{url:"/locales/en/privacyPolicy.json",revision:"1974ea950e13a4f968b4b64108266d09"},{url:"/locales/en/productBadge.json",revision:"61d1ecc4a77ad3cb7f1f278a14ab5d35"},{url:"/locales/en/productCard.json",revision:"4fea66acc285efbc8cbb9c2e097bee1c"},{url:"/locales/en/productDetail.json",revision:"a2b4918abd5e7af6a60aa377cbc4be7f"},{url:"/locales/en/products.json",revision:"dfc44748ab4aa559454f9920fb887166"},{url:"/locales/en/productsSidebar.json",revision:"dbbee03f115287fd5de29d905b57ef64"},{url:"/locales/en/promoCodes.json",revision:"9814b67e0469c00b2e0d1ea7a740101e"},{url:"/locales/en/question.json",revision:"075a1aa1c91f79d6a1f282139e5d69f2"},{url:"/locales/en/quickOrder.json",revision:"ba33fb044a59fb5ffbf12bd4dec02d55"},{url:"/locales/en/register.json",revision:"a82b267a52488340801f9da7f27e6c19"},{url:"/locales/en/searchBar.json",revision:"8f937419e55026f39d1a63e03458e1fb"},{url:"/locales/en/strength.json",revision:"cecf7a1355f47c1f3087a9d7fe57d274"},{url:"/locales/en/termsOfService.json",revision:"b9f1dfbdba7743448c32f43dac3fa50d"},{url:"/locales/vi/aboutUs.json",revision:"fd89121793488606646c656863054948"},{url:"/locales/vi/applyJob.json",revision:"c30e8711276198b4e717b89f08b8b7b9"},{url:"/locales/vi/cancelOrder.json",revision:"1abac73a87b8ea5c280cda4187fe0ee7"},{url:"/locales/vi/carousels.json",revision:"bdd003d5331a7050fbca6075042ec285"},{url:"/locales/vi/cart.json",revision:"d76b05eba76e007026f009646e214c20"},{url:"/locales/vi/checkout.json",revision:"508dd34f69d87bafeb42f6d2fe8e3c5d"},{url:"/locales/vi/common.json",revision:"5bd3c04e0a83e0baa23c0b892bf2cc3e"},{url:"/locales/vi/deals.json",revision:"ae2e7b2783b2c0329b4e454b0f38e2d4"},{url:"/locales/vi/disputeResolution.json",revision:"07321d5d17caa23c6423852f7a9b853a"},{url:"/locales/vi/errors.json",revision:"09963e85dbcd05143eb8d9a1b02b9b94"},{url:"/locales/vi/filterTags.json",revision:"ff962f19962a60f8bd42d8fc6ca61d45"},{url:"/locales/vi/footer.json",revision:"2069b9e47a0f0044da627551536abb60"},{url:"/locales/vi/generalPolicy.json",revision:"1491feea655576563b77f39e0797ec2f"},{url:"/locales/vi/header.json",revision:"f948b429eacf8670996eb073f2aca00b"},{url:"/locales/vi/help.json",revision:"636cbb317881f0a3d1f749cb89299724"},{url:"/locales/vi/ingredientDetails.json",revision:"5d08611097e91ffd2dfc728f5169aa5c"},{url:"/locales/vi/jobDetail.json",revision:"7c98d7529f2de07b91670e3adf065246"},{url:"/locales/vi/login.json",revision:"ceab1d621e45fa95f635948dcc54ead6"},{url:"/locales/vi/manufacturers.json",revision:"f81526c1d4cb160adc68f756e5e3e4a2"},{url:"/locales/vi/myAccount.json",revision:"63bcd671ef4251f85356c95dde98efb1"},{url:"/locales/vi/myOrders.json",revision:"a3076fe9b72350f3185ba147e2fae6c0"},{url:"/locales/vi/myPromoCodes.json",revision:"7a9bbe393a315ff4eb7ed2b693ea209c"},{url:"/locales/vi/navbar.json",revision:"7ab158f984471fc4f20d9f09e0c1e98c"},{url:"/locales/vi/noti.json",revision:"a04d0d2d99448a88dd43a7307ce6b3ec"},{url:"/locales/vi/operatingRegulations.json",revision:"4631ee878782c940b28136c265173144"},{url:"/locales/vi/partner.json",revision:"73a943de0f3cccd983e3966083a0d4ae"},{url:"/locales/vi/password.json",revision:"458c0f6186f9bb3764b39657b063fb7f"},{url:"/locales/vi/privacyPolicy.json",revision:"b36f2eb64a14519384a7467aa5ecd40d"},{url:"/locales/vi/productBadge.json",revision:"59661e40bf57697b9edd05613771166c"},{url:"/locales/vi/productCard.json",revision:"454d6ca4c62dca5df9d19ae532eae70a"},{url:"/locales/vi/productDetail.json",revision:"fc1c8be29fa93ffb61d20e4f3a703d28"},{url:"/locales/vi/products.json",revision:"ecb8055b4fed56c69c2106c32b3220c4"},{url:"/locales/vi/productsSidebar.json",revision:"372fb086546e68ebd3ad74d45e4621b7"},{url:"/locales/vi/promoCodes.json",revision:"7d38023f0dc5372f351534aee468a573"},{url:"/locales/vi/question.json",revision:"66c1b4e377e448b451e55b55944cd3c6"},{url:"/locales/vi/quickOrder.json",revision:"1181ebf69399ea04b3295f57481d3742"},{url:"/locales/vi/register.json",revision:"5c617b9fde6425f8cc4d202bb01d388e"},{url:"/locales/vi/searchBar.json",revision:"92c23669e87d3d34b26d03e85d3835f2"},{url:"/locales/vi/strength.json",revision:"02f95fb3d7a42ca83508a814352fe6c1"},{url:"/locales/vi/termsOfService.json",revision:"733a257a0b7e4cd440ac1ea7e74b44f1"},{url:"/manifest.json",revision:"65e20a78c2b8b6d958827793c330e779"},{url:"/sw.js",revision:"5dc7d265b6e41eb97dfa1ae1398eecbd"},{url:"/sw.js.map",revision:"e28707c04504adc926ec413426589b64"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));

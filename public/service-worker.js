if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return s[e]||(a=new Promise(async a=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=a}else importScripts(e),a()})),a.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},a=(a,s)=>{Promise.all(a.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(a)};self.define=(a,c,i)=>{s[a]||(s[a]=Promise.resolve().then(()=>{let s={};const d={uri:location.origin+a.slice(1)};return Promise.all(c.map(a=>{switch(a){case"exports":return s;case"module":return d;default:return e(a)}})).then(e=>{const a=i(...e);return s.default||(s.default=a),s})}))}}define("./service-worker.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0ce94f7c8b011548743f19937f491f25a716dbee.1cf6959741c087f21f9d.js",revision:"4f547161a01448a4ef52283503a886a6"},{url:"/_next/static/chunks/11ed4fd39ee16d5a576f19160bdd3a03c949f835.fdc2e162a3b372641600.js",revision:"30df3273d1b1412a53ab2f666bc720d1"},{url:"/_next/static/chunks/1d427b345a869f3dd7ecf1798d6bd40f27f8a642.ddbab24919aec215932e.js",revision:"f021fd919559142b37eb88138399f583"},{url:"/_next/static/chunks/29107295.22e78d46b67902d86a48.js",revision:"f73d5d8418529b7463450bcad9a3f330"},{url:"/_next/static/chunks/3219b0463c73d194474d7f9f9126f2daaccd0116.0387c5934100cb0dabfd.js",revision:"29658251cf21ff08705db21ae4852722"},{url:"/_next/static/chunks/36ecf8610c406fd87fb9b8feceab74f2ce8fa49b.259822d76c81ecc987c3.js",revision:"625e8838b3aa01a65cca7a179e2bdda4"},{url:"/_next/static/chunks/4f7e5b1942f2cedf1eb0be81358ec9967e1034ad.1eacc7d8f292b7e8845d.js",revision:"712fd7ff4dcae2cfb8ae1837286a83cf"},{url:"/_next/static/chunks/51.679c4b9296d4683afb43.js",revision:"3752f7c991f8ea0b3931923a20909f8c"},{url:"/_next/static/chunks/75fc9c18.a761c4b1d12e6d6532ec.js",revision:"b0107927c9a4af7796db9a6e6d938778"},{url:"/_next/static/chunks/a7102ef34955a78a79b28c98d7e5a4c78aec0ec3.e78192f4d3998f0f71d8.js",revision:"b77a74fd9e8310b0f45b6577f7552108"},{url:"/_next/static/chunks/c1396fca0a0953dff76cd12d193c1a5f94a20e60.9adf5b4eb45509767c87.js",revision:"32e6c6f33ed08502993a59eb9946ce7f"},{url:"/_next/static/chunks/cea8c01d.955cd01b185e91c5e5fc.js",revision:"092922c847857276e09f07690ba228b6"},{url:"/_next/static/chunks/commons.aabca234a116267fdaf1.js",revision:"ee99351e9e8301e70551ce8aa484a3b5"},{url:"/_next/static/chunks/f5f2417281d464080efe0f002156355cb0daaef5.47ed886891ff1d998f4d.js",revision:"95a3ea4ee0e969a1a6cdc39ce801e8a1"},{url:"/_next/static/chunks/framework.380a80350faa950c8f76.js",revision:"5cba2424f6857a1e6c4a288f467da050"},{url:"/_next/static/chunks/main-db687107e9ca99da60b6.js",revision:"fd7d3523b614f0e296d1345196bf4a5d"},{url:"/_next/static/chunks/pages/_app-71cb3a03e4ea440ce3ef.js",revision:"e51eea1123e0cfc722c40486fd25cc86"},{url:"/_next/static/chunks/pages/_error-d82b96a5bb9e27d65e0c.js",revision:"11039271ffe26a3ecbb465784ea53a9b"},{url:"/_next/static/chunks/pages/about-us-77d01c06dcb734f2e971.js",revision:"2d31c4a4ef14408ad6b93f14514ce7aa"},{url:"/_next/static/chunks/pages/authentications/signup_business-9ecc628670cf890cb5cb.js",revision:"6824a657b4a16c4c061cbae1317d50a8"},{url:"/_next/static/chunks/pages/career-5c4f9141b1b7948a5415.js",revision:"414c74262bd6dd59cc6d792964604e6c"},{url:"/_next/static/chunks/pages/career/jobs/%5BjobId%5D-8ebec1a40566ae710b25.js",revision:"b14ecba48ee8422bc32f2b3aa3b59206"},{url:"/_next/static/chunks/pages/cart-7facd48ed2e6f8bf5a10.js",revision:"b27943579d3e9f5bc75719d7d8218e54"},{url:"/_next/static/chunks/pages/checkout-641b3ea34d6bc9516e5f.js",revision:"385a22bd0450cd59d1788150405c3444"},{url:"/_next/static/chunks/pages/deals-0a1b60f0c6a2c82e690c.js",revision:"f815fdabd6cd1b847b8614e33aa07550"},{url:"/_next/static/chunks/pages/dispute-resolution-8b914c9239ff0028d7d7.js",revision:"0d196e5148da7e3b36d85c209e4f4a18"},{url:"/_next/static/chunks/pages/general-policy-e2f6b8ff20dcededbece.js",revision:"65e787ad71c7fb8e2e844653ba455c4c"},{url:"/_next/static/chunks/pages/help-dbbae0592a68d564a44e.js",revision:"36df75e2cb94c2187d53ac183390a1aa"},{url:"/_next/static/chunks/pages/help/%5BhelpId%5D-3edda164dc47d1f18685.js",revision:"b15207abb99901131df23e8b5d9c8da8"},{url:"/_next/static/chunks/pages/help/huong-dan-chuyen-khoan-01b2be7922792cfa8cd9.js",revision:"bb35e683b06f43843852a2c4b2710a87"},{url:"/_next/static/chunks/pages/index-454f50fe715dab8c3546.js",revision:"38f72f5f418a5cc08470a0e93d7c69e2"},{url:"/_next/static/chunks/pages/ingredients-391d2852787de3a7dbb3.js",revision:"0022c03068b37df77e9545972d297ecc"},{url:"/_next/static/chunks/pages/ingredients/%5B...slug%5D-db219f86c4cf76435dc6.js",revision:"1a063241c8d77cc8aab492d455d979eb"},{url:"/_next/static/chunks/pages/manufacturers-8fdd7d1c5d812d459318.js",revision:"10818cdb166240b1484571f161478010"},{url:"/_next/static/chunks/pages/my-account-63c2b665fdd902c20d47.js",revision:"c660060114888fcda3660f53cafe2d3d"},{url:"/_next/static/chunks/pages/my-orders-e7f02042e15f8519de16.js",revision:"0767f1ac1d9e267e2bdf571808a342a0"},{url:"/_next/static/chunks/pages/my-orders/%5BorderNo%5D-e52143acae600fd26c08.js",revision:"1e7bd27f4502ccab48bac45446fa2d38"},{url:"/_next/static/chunks/pages/my-promo-codes-0212d9048be075f48568.js",revision:"37ce6e3f3214ddd34d71dfb57683e60e"},{url:"/_next/static/chunks/pages/news-65176e7903c9f02e0bb8.js",revision:"00402679f1574a6f4ed9264e44e11977"},{url:"/_next/static/chunks/pages/news/%5BpostId%5D-3fa57f9dcda301ff39ef.js",revision:"100d4545a905d53498b063cd6e724719"},{url:"/_next/static/chunks/pages/notifications-eaab7c04aaa175e0dc14.js",revision:"91d64acfc940ee16a76b199d804f8b1d"},{url:"/_next/static/chunks/pages/operating-regulations-82183ca9f4c1e5fe4bb0.js",revision:"c674a50e182c07c89975ae22531f2c5c"},{url:"/_next/static/chunks/pages/privacy-policy-0255a2826c120fee63b7.js",revision:"a0180ac79550cff370a0d8a4aca75e70"},{url:"/_next/static/chunks/pages/products-d26443b9b371c511c324.js",revision:"bff9ba8308e5c6e558b55e8ef58a66ee"},{url:"/_next/static/chunks/pages/products/%5BproductId%5D-57add06056f3875d412f.js",revision:"66f22f7b38f7017f9fc2fb59e9711f91"},{url:"/_next/static/chunks/pages/promo-codes-7b1b5535fec594d33ab4.js",revision:"4cb6560e9db36e93ee18831dfeca8cf6"},{url:"/_next/static/chunks/pages/quick-order-69a28e6dabdf91c7a824.js",revision:"b8106dfe2624624a0e9e8bd097e23d9b"},{url:"/_next/static/chunks/pages/terms-and-conditions-29e87792ada35b2fe8e4.js",revision:"779987761bf3e7543b137f5a5ccad49d"},{url:"/_next/static/chunks/pages/terms-of-service-0708153f24f60b5c24c1.js",revision:"303d29eeac9a4c54e140b923f243a30a"},{url:"/_next/static/chunks/pages/terms-of-use-dcb7680f1263c05fe82f.js",revision:"5d64b559a211203ede34fbb7d03b2206"},{url:"/_next/static/chunks/polyfills-939bcedcc87e1b9b8e11.js",revision:"09ac25d1e534be66926d56410254ba6a"},{url:"/_next/static/chunks/webpack-c497977e289f1edc5b42.js",revision:"e461892748955c3bcc9080eedf3d83e1"},{url:"/_next/static/css/efbd1c8640ec5b63e0d6.css",revision:"ee3d47fb14f19b938fe763bab30bd8d1"},{url:"/_next/static/css/fc9a9a701978a3505ecf.css",revision:"8f669ea3145467639f3b3a105fac7966"},{url:"/_next/static/fccLyFOJ5IWSIWFLWTPZK/_buildManifest.js",revision:"081247571b338e204a49ac7ecebcfca8"},{url:"/_next/static/fccLyFOJ5IWSIWFLWTPZK/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/media/ajax-loader.fb6f3c230cb846e25247dfaa1da94d8f.gif",revision:"c5cd7f5300576ab4c88202b42f6ded62"},{url:"/_next/static/media/slick.2630a3e3eab21c607e21576571b95b9d.svg",revision:"f97e3bbf73254b0112091d0192f17aec"},{url:"/_next/static/media/slick.295183786cd8a138986521d9f388a286.woff",revision:"b7c9e1e479de3b53f1e4e30ebac2403a"},{url:"/_next/static/media/slick.a4e97f5a2a64f0ab132323fbeb33ae29.eot",revision:"ced611daf7709cc778da928fec876475"},{url:"/_next/static/media/slick.c94f7671dcc99dce43e22a89f486f7c2.ttf",revision:"d41f55a78e6f49a5512878df1737e58a"},{url:"/_next/static/media/utm-avo.6d85fc7dd378f16d546a16a436428e03.woff",revision:"85f78fbacb4401d7a56280c6d49dcb11"},{url:"/_next/static/media/utm-avobold.9c0ab9a6808a3a6b7473efbbc1f37015.woff",revision:"fee5203af564e3fd118ab1f8916c6087"},{url:"/assets/images/NTT-fb6d731b186fd67092490155abaa2dfe03a58d2ad74cdf1e494b27050ddb4576.png",revision:"e21027a857afc2099d38565f081ae9cc"},{url:"/assets/images/about-us-1.jpg",revision:"a6ec92ce5711f68817a2145f15819073"},{url:"/assets/images/about-us-2.jpg",revision:"51a6c993615f6e52c692caa4b3067078"},{url:"/assets/images/about-us-3.jpg",revision:"ab1ccd4ae277ba9b437ec7c15dffda17"},{url:"/assets/images/account-type__clinic.png",revision:"96107375eaa21b307b83ae9beaa33bff"},{url:"/assets/images/account-type__drugstore.png",revision:"9adbaca0089412015987e972d5feb713"},{url:"/assets/images/account-type__pharmacy.png",revision:"3082d086b073b36c5ecb3080349c89b9"},{url:"/assets/images/ahamove-da817db210e5d075aed3853aeed370863737426a27abc6e91c16ccc8a89e6e2f.png",revision:"91a3963b8c4fdf7d5a73983ad379bf25"},{url:"/assets/images/android-ac8666e166fe12cc8e6fa05c08bd05ab3797f5b68a40bc7756b05638c050e3a7.png",revision:"1c65c11e236c915a2cc38c113b5dcd80"},{url:"/assets/images/app_store-df16e1f9024ceb5d5e123c0921d28b347703ca506f48eadf987013eac135ae0f.png",revision:"0a74691509fb0514474e71f02954e078"},{url:"/assets/images/bct-150ac1809a7ae41e0a4b21f1e1e21a26a2f93ee0c79e5c99cc197dd2fdc988c8.png",revision:"e448525f2500e9f81ecb4bf8096d1c1b"},{url:"/assets/images/category_1.png",revision:"3942b3b4bed2e098ea28a0a81fd38e91"},{url:"/assets/images/category_2.png",revision:"fcba88093e47dd50da1784eb1aa32fe8"},{url:"/assets/images/category_3.png",revision:"4fb05af19006a149df51c1eac26dc3d6"},{url:"/assets/images/category_4.png",revision:"1fa4ca87b3ae17c972a9154d1e116d6d"},{url:"/assets/images/category_5.png",revision:"54864a4a03697ba93c5047c39c6b4fd5"},{url:"/assets/images/customer1.jpg",revision:"7c8b5aae4da3178389e48c03c3eb99c4"},{url:"/assets/images/drugstore1.jpg",revision:"555f6f4802da4881c8f0b36975ddee6f"},{url:"/assets/images/drugstore2.jpg",revision:"d9a7eca13512b1c5991230d2efdb7246"},{url:"/assets/images/drugstore3.jpg",revision:"7ad13059e21a1eaf5e66dc6145a2dab0"},{url:"/assets/images/e27-cb4049170b35067044fcd0f349629ab7aa611553abd57a68ef387ebb3f9ae024.png",revision:"19c43a04b68f48284ced1355b8aeaf16"},{url:"/assets/images/echelon-d5bad3e2adbe7549273ad51da80009b9f90e7d65816faef38effad7c3e71bd14.png",revision:"283f3590d037cf1e17fb116bd41ea4f4"},{url:"/assets/images/forbes_vn-80e941e673a0197e8510b2b44ec5bdcb8f7bcac4e2ac5a0ea74450fe38636188.png",revision:"d0d7d5a1632fbf612a683ac14fbf63d0"},{url:"/assets/images/ghn-7c7a86d8247685ce42bf1dd7eea07970b502b4a21be9ab6a15787dc0899a3b79.png",revision:"f087f1b5a9be1ef7500d124c6a440643"},{url:"/assets/images/ghtk-22fbe4903100177078c795a37f7ce7260582b95c1bad6cf37a0dba76127e7f5d.png",revision:"eb96f1209bbadb04612f755dfaa21868"},{url:"/assets/images/google_store-a423ff0891a18d965fd4037cad14a26b0e4f4e05b344d20ae6eb59e999e19e4d.png",revision:"2c6b8c54ba80dc298b095fc6be244c27"},{url:"/assets/images/grab-0d623c296e4838dd4d67984a580fa1b244962d8e5e8de76f3acb548cddbf0c6c.png",revision:"fe9f347a260bf98a8a254d987e434b16"},{url:"/assets/images/invest_global-68fe307b2be9da042162fcfde07c27fbeac62c3a0a3c9293a93f45410831ebe6.png",revision:"c4b527affbcf2596ee12c584c17dcdf5"},{url:"/assets/images/ios-77d063cf231d64a33f6f1421415984d5cbc27f9b1314e42f6fbdce69f2b58b35.png",revision:"5df85fbf1460bb0b98575bf803e3ac9d"},{url:"/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d(1).svg",revision:"ea989010f96abefdb705a464a7b7d8c9"},{url:"/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d.svg",revision:"ea989010f96abefdb705a464a7b7d8c9"},{url:"/assets/images/logo-icon-inverse-0b2c86569d4f524c701d36a672b0e6a64d8f61ba1d543bbe822b0fb282164ac2.svg",revision:"5a58ee50e7a72cecb232eab553e7f7ff"},{url:"/assets/images/logo.jpeg",revision:"e1d0cf26ddad71649ce14ebeb174d768"},{url:"/assets/images/logo2.png",revision:"c5dd4729b01c303001f606c1f9a73e73"},{url:"/assets/images/logo3.png",revision:"44a1552bf5710113ac0798b2dc9c9f39"},{url:"/assets/images/newsletter.png",revision:"5db2779a49dd8f86cd672aef288b7abe"},{url:"/assets/images/ninjavan-df8ca83378c8c4f339ac240d845807ef5cfdef493b0e0a1762b8cb4ccce8feea.png",revision:"5591496665c693b6310584a7c2cb1d8b"},{url:"/assets/images/no-image.jpg",revision:"625d1aff2d58f024870ef61b95680166"},{url:"/assets/images/partner1.jpg",revision:"a8ed2cffc9a893b3e9ce12f17bd175a9"},{url:"/assets/images/partner2.jpg",revision:"d13f08bfb49232dfd5901c7090b613fb"},{url:"/assets/images/partner3.jpg",revision:"19a9ae75dbba2c7afc952c290ccc2cc8"},{url:"/assets/images/pharma-logistics-logo.png",revision:"146b2cc6a5c3e0ba55d4f6ddf786adec"},{url:"/assets/images/pitch_at_palace-16eaf1ce142a949922a0541c3ee98771a49aa1194e3ee11a2511d975e0620642.png",revision:"d45e2383f9e57657a16a3536a8ad0805"},{url:"/assets/images/seedstars-c72fdf9dd4cb45a0259ffdf573570545dfd5382b94110a0934a4e82a9f900426.png",revision:"71b8bb8359fee89100eb3ffec54f0119"},{url:"/assets/images/slider1.png",revision:"1dc502fbf5cc032cd056317d10694c79"},{url:"/assets/images/slider2.png",revision:"6cee8c7e0c21bf2d33969c27c220bf6b"},{url:"/assets/images/slider3.png",revision:"f2b6aa44e131d3983f48399f85d37fa1"},{url:"/assets/images/tai_chinh_cuoc_song-d63649e52a8c7c68a84b850388b3e0fa89ada03c0e072003ab1b1e4c207362b6.png",revision:"e77636e8da4887206077f9e3525e42b3"},{url:"/assets/images/viettelpost-7e17e215b6fb2451347c386209259806b03dd68db90c636c9d800439cf195b0c.png",revision:"6f29a462faeb31f09b4160cbae7c0d89"},{url:"/favicon.ico",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/android-icon-192x192-menofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/apple-icon-114x114-medofa-manifest-20129.png",revision:"dc8f76bd75381f660f0ebdf71e0634bf"},{url:"/icons/apple-icon-120x120-medofa-manifest-20129.png",revision:"f1363331da74ed1a040243f29b8c9493"},{url:"/icons/apple-icon-144x144-medofa-manifest-20129.png",revision:"28770c9b8c9466b8ca95606ae23d226b"},{url:"/icons/apple-icon-152x152-medofa-manifest-20129.png",revision:"50f5a6e113ec5f1af9f4d764ca6813f0"},{url:"/icons/apple-icon-180x180-medofa-manifest-20129.png",revision:"6f9cf4a4bd74feda82e137679e1eaad0"},{url:"/icons/apple-icon-57x57-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/apple-icon-60x60-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/apple-icon-72x72-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/apple-icon-76x76-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/favicon-16x16-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/favicon-32x32-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/favicon-512x512-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/icons/favicon-96x96-medofa-manifest-20129.png",revision:"2b7d2df5ea943c388253f08cd33a0f3c"},{url:"/locales/en/aboutUs.json",revision:"730ef79c6d0fb306c771520e72c00d97"},{url:"/locales/en/applyJob.json",revision:"bd2bf20a0a9fe45550cc814949cf12c7"},{url:"/locales/en/cancelOrder.json",revision:"c85292be1446fc0674f9706bc5a2ae90"},{url:"/locales/en/carousels.json",revision:"354ccba79ab80a38688efaf1cd78ac18"},{url:"/locales/en/cart.json",revision:"cb3a2f1580a077db263034a5f2132c6c"},{url:"/locales/en/checkout.json",revision:"fde552d2ab4f38ca44352740711165e6"},{url:"/locales/en/common.json",revision:"095431c08a672450aecb0392c0f32354"},{url:"/locales/en/deals.json",revision:"6cbb448243c5a73a343a5b3d581769e0"},{url:"/locales/en/disputeResolution.json",revision:"97b2621d2ed1bcdbc5858cdda6564f93"},{url:"/locales/en/errors.json",revision:"58a72a28947105c79993797187eae1ed"},{url:"/locales/en/filterTags.json",revision:"ca3cda59b4e337893cc738103de66e6e"},{url:"/locales/en/footer.json",revision:"e82cae74f902168759a202df70532604"},{url:"/locales/en/generalPolicy.json",revision:"8a10f55ee0ca7ad615626606dfcd1f7c"},{url:"/locales/en/header.json",revision:"62340d525ee3677d54627e953e4faab1"},{url:"/locales/en/help.json",revision:"44bbaaa993aecfe77c012df35d87b088"},{url:"/locales/en/ingredientDetails.json",revision:"ed4c1b60541d7e51fdbbc9e65982ca28"},{url:"/locales/en/jobDetail.json",revision:"8fb5d83bd8ae3bf52808cb9165d86d42"},{url:"/locales/en/login.json",revision:"0d4b2785b4a5f03a8c30c19252652c28"},{url:"/locales/en/manufacturers.json",revision:"a1b8b21ecb9649f4ec9490352db4c8d9"},{url:"/locales/en/myAccount.json",revision:"c2245293630fc2e9e56420b3135cc78b"},{url:"/locales/en/myOrders.json",revision:"984a1831d4e1454e8453d228ec4aef6d"},{url:"/locales/en/myPromoCodes.json",revision:"77850ddd3fc5c3a9195bced47ca3466e"},{url:"/locales/en/navbar.json",revision:"877616cde06da1c94da2efbe5eeca4e8"},{url:"/locales/en/noti.json",revision:"2e03cc682c735f096007ad59969a388a"},{url:"/locales/en/operatingRegulations.json",revision:"db972fdeb2d5843e3fce518fed9c46f4"},{url:"/locales/en/partner.json",revision:"5031e803fc13c9fd39eff241281fbbae"},{url:"/locales/en/password.json",revision:"25988013718d38af6d6ca67c4483f237"},{url:"/locales/en/privacyPolicy.json",revision:"59b7e8609ec4cf9d865a9d6b975bbfe9"},{url:"/locales/en/productBadge.json",revision:"0777f4b858b8b142021be582d36b6cbf"},{url:"/locales/en/productCard.json",revision:"63847f27cf79bbbe21368a66f3019bc5"},{url:"/locales/en/productDetail.json",revision:"ebf98d99b68954ae8540a063ce3d15b5"},{url:"/locales/en/products.json",revision:"de7931ca2405672f7d5b9b90f51357d6"},{url:"/locales/en/productsSidebar.json",revision:"ed611d5d1b8886401dad7e420a9d6dab"},{url:"/locales/en/promoCodes.json",revision:"033f145eaa79c1769577ec371a702cfd"},{url:"/locales/en/question.json",revision:"b1cc30eb7ddc9fbe486a066e379d4dda"},{url:"/locales/en/quickOrder.json",revision:"10227e3f4c8ada4c6eeada3ac9e6f90d"},{url:"/locales/en/register.json",revision:"d0819e81394e39bfdc0e14459fab1f01"},{url:"/locales/en/searchBar.json",revision:"1ac471af7dd8f7608b2853a0f7594831"},{url:"/locales/en/strength.json",revision:"248f93a0fcd5fda129f845d5ddf452c7"},{url:"/locales/en/termsOfService.json",revision:"b64afc1c9cef522451673c9cea69dd75"},{url:"/locales/vi/aboutUs.json",revision:"730ef79c6d0fb306c771520e72c00d97"},{url:"/locales/vi/applyJob.json",revision:"fa57f7dd94aa93de55f4179d404087bb"},{url:"/locales/vi/cancelOrder.json",revision:"72a97b1a0b2d92f9558811b29dc857f5"},{url:"/locales/vi/carousels.json",revision:"329ba497c2a697ff00f8014ed7697eb6"},{url:"/locales/vi/cart.json",revision:"a4af78d307cc0920885f66409e356348"},{url:"/locales/vi/checkout.json",revision:"d9d38486ed5cbfa24f338fbb49d719d2"},{url:"/locales/vi/common.json",revision:"a2b5c26433a6c3f8ae4c4710aabf5ea8"},{url:"/locales/vi/deals.json",revision:"3bf35f1851df86bb03b433e02098d6d5"},{url:"/locales/vi/disputeResolution.json",revision:"775c47ab3ea3af50e6643613d6921368"},{url:"/locales/vi/errors.json",revision:"f0f0e7b5ebf9057555d87b915e57d555"},{url:"/locales/vi/filterTags.json",revision:"f0dcf93c30d70a87a35078dde04fb1ed"},{url:"/locales/vi/footer.json",revision:"d7d1fb262e0254d09acafc0f599c39cb"},{url:"/locales/vi/generalPolicy.json",revision:"5c62912f061e582c1eccfc4b02b47d7e"},{url:"/locales/vi/header.json",revision:"6201de7d48cbeeab8adb5a2316afb415"},{url:"/locales/vi/help.json",revision:"6472ce81de3c4e27e2bdcd189fbf7251"},{url:"/locales/vi/ingredientDetails.json",revision:"e3a53255ea4f340c9e20cc8478c56db8"},{url:"/locales/vi/jobDetail.json",revision:"f71dc252c13c8750195cc289383b6cf7"},{url:"/locales/vi/login.json",revision:"a430ef9068bdb00614c31903de596734"},{url:"/locales/vi/manufacturers.json",revision:"4b72c5b6ba6b74af194b552da98b8739"},{url:"/locales/vi/myAccount.json",revision:"bc84fabacd25470e59c79f36b3b4c934"},{url:"/locales/vi/myOrders.json",revision:"02a6e598a22db66f40a061600e55781e"},{url:"/locales/vi/myPromoCodes.json",revision:"87fd75f5361cec0900d237a3360d6e6a"},{url:"/locales/vi/navbar.json",revision:"b6881d3b1278e45215060e8c9db0678d"},{url:"/locales/vi/noti.json",revision:"bfa5663cf0b2fd474d5aa79f8a0606c7"},{url:"/locales/vi/operatingRegulations.json",revision:"1ec319ac868da8f945531a5095c7a30d"},{url:"/locales/vi/partner.json",revision:"23372d3a5c8f2675a322f51967dcc59a"},{url:"/locales/vi/password.json",revision:"fde06badaba74c58ee483f1b061cf195"},{url:"/locales/vi/privacyPolicy.json",revision:"902ac52391b374ec74dbb830c0160007"},{url:"/locales/vi/productBadge.json",revision:"0645089f6f18a3d1e4781a365134cdff"},{url:"/locales/vi/productCard.json",revision:"509dadf99ee57581019cbda469409b65"},{url:"/locales/vi/productDetail.json",revision:"0d300912a5243b2c1a40d90852b5298e"},{url:"/locales/vi/products.json",revision:"7534e1d78bc613c6cf1fba74da2ddbfe"},{url:"/locales/vi/productsSidebar.json",revision:"7e3bb42f9d69ea799cd12c34cbdb7c9c"},{url:"/locales/vi/promoCodes.json",revision:"5d913ffb45566053cd003c278cfab1c6"},{url:"/locales/vi/question.json",revision:"c2f9671fd27acb31862420823b666b06"},{url:"/locales/vi/quickOrder.json",revision:"0f6a82a719c6561fb7f73026e6325338"},{url:"/locales/vi/register.json",revision:"cb6c922cde59fd295854c68482954e3f"},{url:"/locales/vi/searchBar.json",revision:"ce2b71f56f00b6e1100c23c6004cf17f"},{url:"/locales/vi/strength.json",revision:"01b5b3e99a138c81fd5487ca4f698399"},{url:"/locales/vi/termsOfService.json",revision:"b54b92c88f2f60e5d71b4981e1537374"},{url:"/manifest.json",revision:"4047395af5e582f7a9f3adf0860f8752"},{url:"/sw.js",revision:"5dc7d265b6e41eb97dfa1ae1398eecbd"},{url:"/sw.js.map",revision:"b6458cf6917e3f1f096b296679c70218"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));

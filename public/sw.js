if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return s[e]||(a=new Promise(async a=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=a}else importScripts(e),a()})),a.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},a=(a,s)=>{Promise.all(a.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(a)};self.define=(a,c,i)=>{s[a]||(s[a]=Promise.resolve().then(()=>{let s={};const d={uri:location.origin+a.slice(1)};return Promise.all(c.map(a=>{switch(a){case"exports":return s;case"module":return d;default:return e(a)}})).then(e=>{const a=i(...e);return s.default||(s.default=a),s})}))}}define("./sw.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/SUVfNgHNb_bh5Az2VzGYq/_buildManifest.js",revision:"e79f9f0bb90d46b59a7804383738033c"},{url:"/_next/static/SUVfNgHNb_bh5Az2VzGYq/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/0f1ac474.bc7cea42df0f8d6a7860.js",revision:"041cedb2b8b92150eedcf389c82482d3"},{url:"/_next/static/chunks/11ed4fd39ee16d5a576f19160bdd3a03c949f835.902b8b2d039dbfbdf9e4.js",revision:"bd280082224441bef028283ff9558279"},{url:"/_next/static/chunks/269d525b8166acc6289541b37456d0ba4d8f01af.56170d83df9c21d42c54.js",revision:"ed84e2f143e200e8804bd49e102e8853"},{url:"/_next/static/chunks/29107295.db3068114b0a5c4f2f03.js",revision:"b4853570bb491381f8a5dbf0cff1f1e6"},{url:"/_next/static/chunks/43.7eccc4876cfc9eae9a25.js",revision:"76efb02651ecbf9a5359073a1b6e4006"},{url:"/_next/static/chunks/670d1a01c989ec2f1b937054abeef305d549b992.c8866cdddb5d98cc775e.js",revision:"73172ea89e8dfd21f15434fdd157955a"},{url:"/_next/static/chunks/9d968e72d16cd7d153c5d96611d795cc27ddd0f2.221f8dda9c9be8b1e101.js",revision:"e22bd605351b33fdeeda248e543f34fc"},{url:"/_next/static/chunks/a48943dd8e88308223ed26aaa24012eb51a3bdb7.ffa260ba194747e2deb8.js",revision:"85b5cbc79e38dda923dc1626260a2764"},{url:"/_next/static/chunks/a7102ef34955a78a79b28c98d7e5a4c78aec0ec3.e830abfbdd5c46ed0255.js",revision:"900689ddc45135b5ff51d06d26a0c405"},{url:"/_next/static/chunks/c1984297.bc7564fa166f0d34b14f.js",revision:"d3d8c93e10b7435184d4735789be6884"},{url:"/_next/static/chunks/commons.8440830fd357c9465a63.js",revision:"f8630e3094309ec57ba6ae5a3fb39a03"},{url:"/_next/static/chunks/framework.380a80350faa950c8f76.js",revision:"5cba2424f6857a1e6c4a288f467da050"},{url:"/_next/static/chunks/main-05d5e5f7aba42f33dc18.js",revision:"11be53e2a55fba4e025bb986a0116b65"},{url:"/_next/static/chunks/pages/_app-d293a6fe0bcbdd304b9a.js",revision:"f190cf9a1b24f86ef36b7e5f47e5e808"},{url:"/_next/static/chunks/pages/_error-3ac5d8c475e0aa228b16.js",revision:"acf7e3e97bba5db4eb4d530dce13e389"},{url:"/_next/static/chunks/pages/about-us-6245df09c935da8cb6f7.js",revision:"eb1b848761fd8124b6e8f36c6e34b9c8"},{url:"/_next/static/chunks/pages/authentications/signup_business-5821cec5979aad831d5a.js",revision:"ab2951547d9886cca2b25c1f59624c0b"},{url:"/_next/static/chunks/pages/career-919694788c543d3d9539.js",revision:"977a5bce8521d9fce032284177570d14"},{url:"/_next/static/chunks/pages/career/jobs/%5BjobId%5D-f2ba14fd0546179a6feb.js",revision:"adcc4c8c6d79bc86cc22ed839a8fdef8"},{url:"/_next/static/chunks/pages/cart-073fc7e375fc14a46546.js",revision:"df5d1953d0ac125620006d309cc3a7da"},{url:"/_next/static/chunks/pages/checkout-1988b75fe9372faaa8cd.js",revision:"f108535e247f01e4af4a2b3e87733dc2"},{url:"/_next/static/chunks/pages/deals-7f19a7012d6ba8ce066d.js",revision:"d6c3a684a1012d9c50c4812f0ab5dea5"},{url:"/_next/static/chunks/pages/dispute-resolution-55c73203f0faa56c819d.js",revision:"c517358f637b07cb6a5458b0fca2319d"},{url:"/_next/static/chunks/pages/help-f394dbc22f8f968fb40c.js",revision:"eb03fad4db213838a3a856aec8697a8e"},{url:"/_next/static/chunks/pages/help/%5BhelpId%5D-0231d219ca2ba326b1bc.js",revision:"b5213b2e0aeb57b1690830febe52fa7c"},{url:"/_next/static/chunks/pages/help/huong-dan-chuyen-khoan-7276d30894b9d5cf94a6.js",revision:"7ccd39cad12caab0dc3a306aa2a4047a"},{url:"/_next/static/chunks/pages/index-360b334dc2354b9ef4ee.js",revision:"b67f0d0a4136d98ff258133b0f2953e5"},{url:"/_next/static/chunks/pages/ingredients-e9ab3fdcda9a4bdc51b6.js",revision:"d325a2bffcc9ceb38b3f5fee274c09dd"},{url:"/_next/static/chunks/pages/ingredients/%5B...slug%5D-bf69f39e32356297a617.js",revision:"17fffc387353942f0fab636736900ec9"},{url:"/_next/static/chunks/pages/manufacturers-830d4391ed50fe620840.js",revision:"09cedb2e9206e18b3f9a146517d18a41"},{url:"/_next/static/chunks/pages/my-account-0b528683833fbc5f9042.js",revision:"eb761fe064200a2ffa9ade7d152c32fc"},{url:"/_next/static/chunks/pages/my-orders-c94d3664cdec2308e4bd.js",revision:"518304cfd9c3e5527e12efb4a6fb832d"},{url:"/_next/static/chunks/pages/my-orders/%5BorderId%5D-9fc1b0695829eb8de7a0.js",revision:"4c1be6e728da0344b2b5e2154ea8fa33"},{url:"/_next/static/chunks/pages/news-3e067cbc72eafe3b4ab3.js",revision:"8db3238b72317c4a1071d0efd34f6378"},{url:"/_next/static/chunks/pages/news/%5BpostId%5D-293a14604096a3747329.js",revision:"bc8f7f5b6ad473d8302d483a6b64527c"},{url:"/_next/static/chunks/pages/notifications-591f91a706d3e161aa13.js",revision:"521232160a9bb951896162d79d881fa3"},{url:"/_next/static/chunks/pages/privacy-policy-0d25d57757e20442301c.js",revision:"905242b3b0d5a36d35f1ef69746d7817"},{url:"/_next/static/chunks/pages/products-8fd0ef079cabb40b8533.js",revision:"49dfbbfd52627d81c5a9b0fcb9661700"},{url:"/_next/static/chunks/pages/products/%5BproductId%5D-9e64f3cbadf0296b6053.js",revision:"f8aa20c0cefe85286eb545eef4b43b1d"},{url:"/_next/static/chunks/pages/promo-codes-0adeba319dd8a366dd8d.js",revision:"7803a3ba79cd5c5ee0ad6ec0f0708e9e"},{url:"/_next/static/chunks/pages/quick-order-025608c3ee713de50977.js",revision:"74c0cc892ce5e9d4059e41402bf4861c"},{url:"/_next/static/chunks/pages/terms-of-service-cb52d4285ad6a09b9e91.js",revision:"30a133ef76af85fbb2b59070b45ed046"},{url:"/_next/static/chunks/polyfills-d21a212d5ce3e61476b9.js",revision:"b3889eebec9f1c1b16a60e2f107c18b2"},{url:"/_next/static/chunks/webpack-cf1580a1928a39679cd9.js",revision:"0283c85b7d4024f9ef2e8e21a5eb38ff"},{url:"/_next/static/css/d9f2717960a12bd25974.css",revision:"bba21d4c909b06d093826942cde9efa5"},{url:"/_next/static/css/efbd1c8640ec5b63e0d6.css",revision:"ee3d47fb14f19b938fe763bab30bd8d1"},{url:"/_next/static/media/ajax-loader.fb6f3c230cb846e25247dfaa1da94d8f.gif",revision:"c5cd7f5300576ab4c88202b42f6ded62"},{url:"/_next/static/media/slick.2630a3e3eab21c607e21576571b95b9d.svg",revision:"f97e3bbf73254b0112091d0192f17aec"},{url:"/_next/static/media/slick.295183786cd8a138986521d9f388a286.woff",revision:"b7c9e1e479de3b53f1e4e30ebac2403a"},{url:"/_next/static/media/slick.a4e97f5a2a64f0ab132323fbeb33ae29.eot",revision:"ced611daf7709cc778da928fec876475"},{url:"/_next/static/media/slick.c94f7671dcc99dce43e22a89f486f7c2.ttf",revision:"d41f55a78e6f49a5512878df1737e58a"},{url:"/assets/images/NTT-fb6d731b186fd67092490155abaa2dfe03a58d2ad74cdf1e494b27050ddb4576.png",revision:"e21027a857afc2099d38565f081ae9cc"},{url:"/assets/images/account-type__clinic.png",revision:"96107375eaa21b307b83ae9beaa33bff"},{url:"/assets/images/account-type__drugstore.png",revision:"9adbaca0089412015987e972d5feb713"},{url:"/assets/images/account-type__pharmacy.png",revision:"3082d086b073b36c5ecb3080349c89b9"},{url:"/assets/images/ahamove-da817db210e5d075aed3853aeed370863737426a27abc6e91c16ccc8a89e6e2f.png",revision:"91a3963b8c4fdf7d5a73983ad379bf25"},{url:"/assets/images/android-ac8666e166fe12cc8e6fa05c08bd05ab3797f5b68a40bc7756b05638c050e3a7.png",revision:"1c65c11e236c915a2cc38c113b5dcd80"},{url:"/assets/images/app_store-df16e1f9024ceb5d5e123c0921d28b347703ca506f48eadf987013eac135ae0f.png",revision:"0a74691509fb0514474e71f02954e078"},{url:"/assets/images/bct-150ac1809a7ae41e0a4b21f1e1e21a26a2f93ee0c79e5c99cc197dd2fdc988c8.png",revision:"e448525f2500e9f81ecb4bf8096d1c1b"},{url:"/assets/images/customer1.jpg",revision:"7c8b5aae4da3178389e48c03c3eb99c4"},{url:"/assets/images/drugstore1.jpg",revision:"f13f7f198fe8c48c12516fa5bad3e6f1"},{url:"/assets/images/drugstore2.jpg",revision:"d5f4bb380a70e7337e100da7818c6e38"},{url:"/assets/images/drugstore3.jpg",revision:"cbd39364245c62ce238d54736b00e2b7"},{url:"/assets/images/e27-cb4049170b35067044fcd0f349629ab7aa611553abd57a68ef387ebb3f9ae024.png",revision:"19c43a04b68f48284ced1355b8aeaf16"},{url:"/assets/images/echelon-d5bad3e2adbe7549273ad51da80009b9f90e7d65816faef38effad7c3e71bd14.png",revision:"283f3590d037cf1e17fb116bd41ea4f4"},{url:"/assets/images/forbes_vn-80e941e673a0197e8510b2b44ec5bdcb8f7bcac4e2ac5a0ea74450fe38636188.png",revision:"d0d7d5a1632fbf612a683ac14fbf63d0"},{url:"/assets/images/ghn-7c7a86d8247685ce42bf1dd7eea07970b502b4a21be9ab6a15787dc0899a3b79.png",revision:"f087f1b5a9be1ef7500d124c6a440643"},{url:"/assets/images/ghtk-22fbe4903100177078c795a37f7ce7260582b95c1bad6cf37a0dba76127e7f5d.png",revision:"eb96f1209bbadb04612f755dfaa21868"},{url:"/assets/images/google_store-a423ff0891a18d965fd4037cad14a26b0e4f4e05b344d20ae6eb59e999e19e4d.png",revision:"2c6b8c54ba80dc298b095fc6be244c27"},{url:"/assets/images/grab-0d623c296e4838dd4d67984a580fa1b244962d8e5e8de76f3acb548cddbf0c6c.png",revision:"fe9f347a260bf98a8a254d987e434b16"},{url:"/assets/images/invest_global-68fe307b2be9da042162fcfde07c27fbeac62c3a0a3c9293a93f45410831ebe6.png",revision:"c4b527affbcf2596ee12c584c17dcdf5"},{url:"/assets/images/ios-77d063cf231d64a33f6f1421415984d5cbc27f9b1314e42f6fbdce69f2b58b35.png",revision:"5df85fbf1460bb0b98575bf803e3ac9d"},{url:"/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d(1).svg",revision:"ea989010f96abefdb705a464a7b7d8c9"},{url:"/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d.svg",revision:"ea989010f96abefdb705a464a7b7d8c9"},{url:"/assets/images/logo-icon-inverse-0b2c86569d4f524c701d36a672b0e6a64d8f61ba1d543bbe822b0fb282164ac2.svg",revision:"5a58ee50e7a72cecb232eab553e7f7ff"},{url:"/assets/images/logo.jpeg",revision:"e1d0cf26ddad71649ce14ebeb174d768"},{url:"/assets/images/logo2.png",revision:"5f1affcd7389d2fa106b1173472389b4"},{url:"/assets/images/logo3.png",revision:"123a198334646b4b64d459d67c9ec93f"},{url:"/assets/images/newsletter.png",revision:"5db2779a49dd8f86cd672aef288b7abe"},{url:"/assets/images/ninjavan-df8ca83378c8c4f339ac240d845807ef5cfdef493b0e0a1762b8cb4ccce8feea.png",revision:"5591496665c693b6310584a7c2cb1d8b"},{url:"/assets/images/no-image.jpg",revision:"625d1aff2d58f024870ef61b95680166"},{url:"/assets/images/partner1.jpg",revision:"a8ed2cffc9a893b3e9ce12f17bd175a9"},{url:"/assets/images/partner2.jpg",revision:"d13f08bfb49232dfd5901c7090b613fb"},{url:"/assets/images/partner3.jpg",revision:"19a9ae75dbba2c7afc952c290ccc2cc8"},{url:"/assets/images/pitch_at_palace-16eaf1ce142a949922a0541c3ee98771a49aa1194e3ee11a2511d975e0620642.png",revision:"d45e2383f9e57657a16a3536a8ad0805"},{url:"/assets/images/seedstars-c72fdf9dd4cb45a0259ffdf573570545dfd5382b94110a0934a4e82a9f900426.png",revision:"71b8bb8359fee89100eb3ffec54f0119"},{url:"/assets/images/slider1.png",revision:"1dc502fbf5cc032cd056317d10694c79"},{url:"/assets/images/slider2.png",revision:"6cee8c7e0c21bf2d33969c27c220bf6b"},{url:"/assets/images/slider3.png",revision:"f2b6aa44e131d3983f48399f85d37fa1"},{url:"/assets/images/tai_chinh_cuoc_song-d63649e52a8c7c68a84b850388b3e0fa89ada03c0e072003ab1b1e4c207362b6.png",revision:"e77636e8da4887206077f9e3525e42b3"},{url:"/assets/images/viettelpost-7e17e215b6fb2451347c386209259806b03dd68db90c636c9d800439cf195b0c.png",revision:"6f29a462faeb31f09b4160cbae7c0d89"},{url:"/favicon.ico",revision:"e1d0cf26ddad71649ce14ebeb174d768"},{url:"/icons/android-icon-192x192-menofa-manifest-20129.png",revision:"93d14d320ab144098e9f505f93e7bf5b"},{url:"/icons/apple-icon-114x114-medofa-manifest-20129.png",revision:"dc8f76bd75381f660f0ebdf71e0634bf"},{url:"/icons/apple-icon-120x120-medofa-manifest-20129.png",revision:"f1363331da74ed1a040243f29b8c9493"},{url:"/icons/apple-icon-144x144-medofa-manifest-20129.png",revision:"28770c9b8c9466b8ca95606ae23d226b"},{url:"/icons/apple-icon-152x152-medofa-manifest-20129.png",revision:"50f5a6e113ec5f1af9f4d764ca6813f0"},{url:"/icons/apple-icon-180x180-medofa-manifest-20129.png",revision:"6f9cf4a4bd74feda82e137679e1eaad0"},{url:"/icons/apple-icon-57x57-medofa-manifest-20129.png",revision:"8b0d452da17872ac8a887dbb50833957"},{url:"/icons/apple-icon-60x60-medofa-manifest-20129.png",revision:"3d08b9721534a2c84861cdd3e297195f"},{url:"/icons/apple-icon-72x72-medofa-manifest-20129.png",revision:"f792c6d0dd68c1db7b3e148789c56884"},{url:"/icons/apple-icon-76x76-medofa-manifest-20129.png",revision:"01b30fee75f0cc68275842a0744a9161"},{url:"/icons/favicon-16x16-medofa-manifest-20129.png",revision:"2f0592e200f5d1bd50c469839b0e2b5e"},{url:"/icons/favicon-32x32-medofa-manifest-20129.png",revision:"4ba26da62cf180d9db667b2196cd7f37"},{url:"/icons/favicon-512x512-medofa-manifest-20129.png",revision:"512f8f56c7448c3680efda6375505b28"},{url:"/icons/favicon-96x96-medofa-manifest-20129.png",revision:"aa67914b8be58a9b96413ab70cb8c800"},{url:"/locales/en/account.json",revision:"a0caf09cd51619bc3fbb47f2489bcb1f"},{url:"/locales/en/applyJob.json",revision:"bd2bf20a0a9fe45550cc814949cf12c7"},{url:"/locales/en/cancelOrder.json",revision:"e6296371c7551256f005389f5ede299c"},{url:"/locales/en/carousels.json",revision:"354ccba79ab80a38688efaf1cd78ac18"},{url:"/locales/en/cart.json",revision:"5fa7e018520c23096f27635444980990"},{url:"/locales/en/checkout.json",revision:"d9861b070a8701d07e2ebb45d64c74e1"},{url:"/locales/en/common.json",revision:"52035119e5d5a122f1654771f410ee8d"},{url:"/locales/en/deals.json",revision:"d2453c6a48f74474a9c0e3e9041fde73"},{url:"/locales/en/errors.json",revision:"f4e55818f28c9a82dd4de530cde37db1"},{url:"/locales/en/footer.json",revision:"86b614030f4da4cb46462b66476147db"},{url:"/locales/en/header.json",revision:"62340d525ee3677d54627e953e4faab1"},{url:"/locales/en/ingredientDetails.json",revision:"8c79faf55a849766c1da69f1848bc7ce"},{url:"/locales/en/jobDetail.json",revision:"8fb5d83bd8ae3bf52808cb9165d86d42"},{url:"/locales/en/login.json",revision:"7a60ec0d815bc5f7c6ef4bbe9ec8cc4b"},{url:"/locales/en/manufacturers.json",revision:"a1b8b21ecb9649f4ec9490352db4c8d9"},{url:"/locales/en/myOrders.json",revision:"6fb53cd0afa81d65b1265e9b3d97dc9f"},{url:"/locales/en/navbar.json",revision:"2a1b9a61c23277d1b5c8b0e83aa2c67b"},{url:"/locales/en/partner.json",revision:"fa5528994ac804e2e1f958337ee48a2a"},{url:"/locales/en/password.json",revision:"918d2d20660ba7f65341c6eef55b88c1"},{url:"/locales/en/productBadge.json",revision:"ed288a0f89b70d582472fbfd524793a3"},{url:"/locales/en/productCard.json",revision:"63847f27cf79bbbe21368a66f3019bc5"},{url:"/locales/en/products.json",revision:"9d7cead8907966df8f129e0b17f78d05"},{url:"/locales/en/promoCodes.json",revision:"d83f18269afe7ae787bc10055e420fcf"},{url:"/locales/en/register.json",revision:"d0819e81394e39bfdc0e14459fab1f01"},{url:"/locales/en/searchBar.json",revision:"50d081dc4bf9b93e0fd6b5f1f9f7bf22"},{url:"/locales/en/strength.json",revision:"02b40e853f9ddee02b2bc7d108a30989"},{url:"/locales/vi/account.json",revision:"84aeaa4a8f94c314c4580efd2ff656b5"},{url:"/locales/vi/applyJob.json",revision:"fa57f7dd94aa93de55f4179d404087bb"},{url:"/locales/vi/cancelOrder.json",revision:"038f002731c94f86c4b6784cbad177f8"},{url:"/locales/vi/carousels.json",revision:"329ba497c2a697ff00f8014ed7697eb6"},{url:"/locales/vi/cart.json",revision:"a48f9a8debdf88b4b557e4eb0d86a9f4"},{url:"/locales/vi/checkout.json",revision:"1436ccb2d0cba037f589509fc8c6b3d0"},{url:"/locales/vi/common.json",revision:"be7646752d1d9739f477e89418588ab1"},{url:"/locales/vi/deals.json",revision:"fa81c54d96f39fce94b292c3de801578"},{url:"/locales/vi/errors.json",revision:"759d3baf44b4ab02c0caf3ce3aca626b"},{url:"/locales/vi/footer.json",revision:"4e5cbd41e0d3d8e6d2b5400674451d0d"},{url:"/locales/vi/header.json",revision:"6201de7d48cbeeab8adb5a2316afb415"},{url:"/locales/vi/ingredientDetails.json",revision:"6f9113ee93641a68c97c72218c208ac5"},{url:"/locales/vi/jobDetail.json",revision:"f71dc252c13c8750195cc289383b6cf7"},{url:"/locales/vi/login.json",revision:"eac05051a7de044368f3cf5d39ee692a"},{url:"/locales/vi/manufacturers.json",revision:"4b72c5b6ba6b74af194b552da98b8739"},{url:"/locales/vi/myOrders.json",revision:"26b48682bad37de3a8c98b51a3f1d239"},{url:"/locales/vi/navbar.json",revision:"ba95f46429caae810bba118e2288bd01"},{url:"/locales/vi/partner.json",revision:"d6626323611e4b13c4d603653da085e5"},{url:"/locales/vi/password.json",revision:"7d9f61f71ee445714cd9a5f6c5abe10b"},{url:"/locales/vi/productBadge.json",revision:"d88df2a6e3c89b27c7a1b48a1d0fc1c3"},{url:"/locales/vi/productCard.json",revision:"509dadf99ee57581019cbda469409b65"},{url:"/locales/vi/products.json",revision:"b52f4adb18e13c0cc6d1c15cbf109461"},{url:"/locales/vi/promoCodes.json",revision:"5c0922ad52fded5c24df68c6457e2400"},{url:"/locales/vi/register.json",revision:"cb6c922cde59fd295854c68482954e3f"},{url:"/locales/vi/searchBar.json",revision:"0e6b11a71d6cb840ca43dd1930264533"},{url:"/locales/vi/strength.json",revision:"ffd1608c4cb4b25ef5324bc93de9e7db"},{url:"/manifest.json",revision:"4047395af5e582f7a9f3adf0860f8752"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));

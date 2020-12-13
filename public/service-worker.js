if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js');
      let a = Promise.resolve();
      return (
        c[e] ||
          (a = new Promise(async (a) => {
            if ('document' in self) {
              const c = document.createElement('script');
              (c.src = e), document.head.appendChild(c), (c.onload = a);
            } else importScripts(e), a();
          })),
        a.then(() => {
          if (!c[e]) throw new Error(`Module ${e} didn’t register its module`);
          return c[e];
        })
      );
    },
    a = (a, c) => {
      Promise.all(a.map(e)).then((e) => c(1 === e.length ? e[0] : e));
    },
    c = { require: Promise.resolve(a) };
  self.define = (a, s, i) => {
    c[a] ||
      (c[a] = Promise.resolve().then(() => {
        let c = {};
        const d = { uri: location.origin + a.slice(1) };
        return Promise.all(
          s.map((a) => {
            switch (a) {
              case 'exports':
                return c;
              case 'module':
                return d;
              default:
                return e(a);
            }
          })
        ).then((e) => {
          const a = i(...e);
          return c.default || (c.default = a), c;
        });
      }));
  };
}
define('./service-worker.js', ['./workbox-c2b5e142'], function (e) {
  'use strict';
  importScripts(),
    e.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/JUDRjE5QY_a0dACm0WLWK/_buildManifest.js',
          revision: '5faafcfd828cb0d34c1b057ddeb9b2ab'
        },
        {
          url: '/_next/static/JUDRjE5QY_a0dACm0WLWK/_ssgManifest.js',
          revision: 'abee47769bf307639ace4945f9cfd4ff'
        },
        {
          url: '/_next/static/chunks/0f1ac474.5ccc8f6e992b669e93cf.js',
          revision: 'd0c04117a284edcede220667b66b26ef'
        },
        {
          url:
            '/_next/static/chunks/11ed4fd39ee16d5a576f19160bdd3a03c949f835.ed8a79dc6dd5eec0b0a0.js',
          revision: '0bb5b9d343aa32816a9ed5fe06af931f'
        },
        {
          url:
            '/_next/static/chunks/22f14daf50dd9450488e0111fe9b123a39317fd3.5b26f19f3fa9e38f7c70.js',
          revision: '4111123dd467e06bba7cec5979629456'
        },
        {
          url:
            '/_next/static/chunks/269d525b8166acc6289541b37456d0ba4d8f01af.ddb3354d3e8d27f11ee6.js',
          revision: '45416ee75f79ee521d2ac253aef5b753'
        },
        {
          url: '/_next/static/chunks/29107295.17142cb710d3fff10981.js',
          revision: 'fb62a95bb052bf0e229c8b9d53ea8a9a'
        },
        {
          url:
            '/_next/static/chunks/441a595b455b62f872e36d2e5d6a007bc1739f3f.ad856c307d0cda43592e.js',
          revision: '6340dd14614cb91f4d1f0f2c5d6fe203'
        },
        {
          url: '/_next/static/chunks/48.1a970e83061cc1c5c475.js',
          revision: '02fdae71c7123d0f6b055d0d3a68adfa'
        },
        {
          url: '/_next/static/chunks/657c2e6e.118394efc85bb3e961c1.js',
          revision: '1c52964f8a3254cb2484ddb77c0856a9'
        },
        {
          url:
            '/_next/static/chunks/670d1a01c989ec2f1b937054abeef305d549b992.a54aaf58c0f70907327b.js',
          revision: '44c17747456e985c709cd75b072c3a70'
        },
        {
          url: '/_next/static/chunks/75fc9c18.a761c4b1d12e6d6532ec.js',
          revision: 'b0107927c9a4af7796db9a6e6d938778'
        },
        {
          url:
            '/_next/static/chunks/9d968e72d16cd7d153c5d96611d795cc27ddd0f2.33c6c273f13522d8214f.js',
          revision: '2088e77b16f1ac851418bfabefdc3781'
        },
        {
          url:
            '/_next/static/chunks/a48943dd8e88308223ed26aaa24012eb51a3bdb7.533e35d0abb980e5ba01.js',
          revision: '82f273be7a649fb40507ae617694a550'
        },
        {
          url:
            '/_next/static/chunks/a7102ef34955a78a79b28c98d7e5a4c78aec0ec3.bd90a4ef8ed46dbebd9e.js',
          revision: 'f152dde46b24507ecae51609c683517a'
        },
        {
          url: '/_next/static/chunks/commons.ec15d9cfe0490799afe1.js',
          revision: '473839626d48ada8b7636f21a4a8a3ca'
        },
        {
          url:
            '/_next/static/chunks/fc3868d5b084085337f201cbe911c8b85bdf8b14.9f1c1dfcf819632b08c9.js',
          revision: '256c5af7c233445e66479b1c1a24ad2a'
        },
        {
          url: '/_next/static/chunks/framework.380a80350faa950c8f76.js',
          revision: '5cba2424f6857a1e6c4a288f467da050'
        },
        {
          url: '/_next/static/chunks/main-1cb62b7a896d39080b77.js',
          revision: '9f32cbc6afc7bc9d79d5f7106721c90e'
        },
        {
          url: '/_next/static/chunks/pages/_app-56cef887ce3d11ee7ecc.js',
          revision: 'ebc3affb09b833d4950c338ae0fc9e54'
        },
        {
          url: '/_next/static/chunks/pages/_error-89880925fc554ceab9fe.js',
          revision: '9e66fd64cc887165f15d12274ff030f2'
        },
        {
          url: '/_next/static/chunks/pages/about-us-a7b83952d417b2e9ef37.js',
          revision: '8c7e7541974ed096c5bfc278c54c84cf'
        },
        {
          url: '/_next/static/chunks/pages/authentications/signup_business-00af51f6200a9ad6d672.js',
          revision: 'a82441247c1802cbf5a3013dcd70aaa8'
        },
        {
          url: '/_next/static/chunks/pages/career-f244de656771982484af.js',
          revision: '8eea511d21ceeda441d263809827a167'
        },
        {
          url: '/_next/static/chunks/pages/career/jobs/%5BjobId%5D-55dc9053af767e6ae72e.js',
          revision: '880e69bd6b542e33f7b66bb68394ae89'
        },
        {
          url: '/_next/static/chunks/pages/cart-6921b04e1a1698603be4.js',
          revision: '623c204bbebf1c523c4b143c2b1d58ce'
        },
        {
          url: '/_next/static/chunks/pages/checkout-9e690874232fb55946e8.js',
          revision: '980c22eb165e1a7fbf0b6921526c02df'
        },
        {
          url: '/_next/static/chunks/pages/deals-3122725dde3ccadcf8de.js',
          revision: '8ab48830acfc528bf7617561dc342453'
        },
        {
          url: '/_next/static/chunks/pages/dispute-resolution-f0349d7d1ab9a13ff5f3.js',
          revision: 'ff8a192b19a594555823c95e005b31b4'
        },
        {
          url: '/_next/static/chunks/pages/help-20525b3f19bf2e06abfb.js',
          revision: '79b812c7c394c614f9bed0f2e34d9ef3'
        },
        {
          url: '/_next/static/chunks/pages/help/%5BhelpId%5D-6aad3cd37b5fbd90780c.js',
          revision: 'f2912e9a1e3ac857f48d343490fd93bc'
        },
        {
          url: '/_next/static/chunks/pages/help/huong-dan-chuyen-khoan-e499c41878f49b0af22d.js',
          revision: 'a2715553360fb9abb0d02b24c5a63f26'
        },
        {
          url: '/_next/static/chunks/pages/index-080cb83cf079c7abc8e7.js',
          revision: 'a674b999692b6a55d12774d43beb0741'
        },
        {
          url: '/_next/static/chunks/pages/ingredients-e6b352216a0c4dea82a4.js',
          revision: '0446250137cdd71e3af63227c1ed086b'
        },
        {
          url: '/_next/static/chunks/pages/ingredients/%5B...slug%5D-5840b130da68101287e5.js',
          revision: '0ef68177448451c1564c565604f717c9'
        },
        {
          url: '/_next/static/chunks/pages/manufacturers-2286bc765ace5f678597.js',
          revision: 'bec30fa904db5a1961861474da8f966a'
        },
        {
          url: '/_next/static/chunks/pages/my-account-08e5944a0d8498be2408.js',
          revision: 'ca5a0f8a69461db6419a0fd09cda87e0'
        },
        {
          url: '/_next/static/chunks/pages/my-orders-d632ea7990cc23596381.js',
          revision: 'c81087364f5344fa1947eb8737c9eebf'
        },
        {
          url: '/_next/static/chunks/pages/my-orders/%5BorderId%5D-5834f5cad6108b771afa.js',
          revision: '3c84dc1f0587ae8221ee62ed88aa6f2b'
        },
        {
          url: '/_next/static/chunks/pages/news-3331d06ca70f828b392e.js',
          revision: '4d7c28513a649c5707cb9c867f9eda5b'
        },
        {
          url: '/_next/static/chunks/pages/news/%5BpostId%5D-d71dec125e7ca6fa9892.js',
          revision: '8648182ec10009784aeced8847662d07'
        },
        {
          url: '/_next/static/chunks/pages/notifications-ebd07c3577d230f369a9.js',
          revision: 'ed6278f3c8fad996181cbdc655ecbbfd'
        },
        {
          url: '/_next/static/chunks/pages/notifications/NotiItem-ab8a034d56d43ead8e72.js',
          revision: 'ec70a213748c4570bbac94cb7d49e06d'
        },
        {
          url: '/_next/static/chunks/pages/privacy-policy-1ea79e836157f701134b.js',
          revision: '09f6cc7d919f752e07e9e36d85c661d8'
        },
        {
          url: '/_next/static/chunks/pages/products-980f6074d3300ab15091.js',
          revision: '98cce64c4e2310b0eb26db4537cbcdb0'
        },
        {
          url: '/_next/static/chunks/pages/products/%5BproductId%5D-096de7b4bb6d87b6d5bf.js',
          revision: '1234235fd961e7a86fa3eccb6e8aca0c'
        },
        {
          url: '/_next/static/chunks/pages/promo-codes-60e55cfc645119302f3d.js',
          revision: 'a8279d48935c69128b14f005d86630ea'
        },
        {
          url: '/_next/static/chunks/pages/quick-order-bf73bb338b38bb0db244.js',
          revision: '5c00e0ec3577f58437e99c6961750615'
        },
        {
          url: '/_next/static/chunks/pages/terms-of-service-d674dc3f7157aac905fa.js',
          revision: 'a7befefe667933e870dcff3a7de4b756'
        },
        {
          url: '/_next/static/chunks/polyfills-c3549571cab2cda0f0a7.js',
          revision: 'fb3b055dfa380d48076448253d7de65b'
        },
        {
          url: '/_next/static/chunks/webpack-4aac36ac7ebf1595a97c.js',
          revision: '105804f81b92e0819ac2b54b33337156'
        },
        {
          url: '/_next/static/css/4fab8ef03e939e251636.css',
          revision: '2ab937a3e86f950575f152e2e45567cc'
        },
        {
          url: '/_next/static/css/efbd1c8640ec5b63e0d6.css',
          revision: 'ee3d47fb14f19b938fe763bab30bd8d1'
        },
        {
          url: '/_next/static/media/ajax-loader.fb6f3c230cb846e25247dfaa1da94d8f.gif',
          revision: 'c5cd7f5300576ab4c88202b42f6ded62'
        },
        {
          url: '/_next/static/media/slick.2630a3e3eab21c607e21576571b95b9d.svg',
          revision: 'f97e3bbf73254b0112091d0192f17aec'
        },
        {
          url: '/_next/static/media/slick.295183786cd8a138986521d9f388a286.woff',
          revision: 'b7c9e1e479de3b53f1e4e30ebac2403a'
        },
        {
          url: '/_next/static/media/slick.a4e97f5a2a64f0ab132323fbeb33ae29.eot',
          revision: 'ced611daf7709cc778da928fec876475'
        },
        {
          url: '/_next/static/media/slick.c94f7671dcc99dce43e22a89f486f7c2.ttf',
          revision: 'd41f55a78e6f49a5512878df1737e58a'
        },
        {
          url:
            '/assets/images/NTT-fb6d731b186fd67092490155abaa2dfe03a58d2ad74cdf1e494b27050ddb4576.png',
          revision: 'e21027a857afc2099d38565f081ae9cc'
        },
        {
          url: '/assets/images/account-type__clinic.png',
          revision: '96107375eaa21b307b83ae9beaa33bff'
        },
        {
          url: '/assets/images/account-type__drugstore.png',
          revision: '9adbaca0089412015987e972d5feb713'
        },
        {
          url: '/assets/images/account-type__pharmacy.png',
          revision: '3082d086b073b36c5ecb3080349c89b9'
        },
        {
          url:
            '/assets/images/ahamove-da817db210e5d075aed3853aeed370863737426a27abc6e91c16ccc8a89e6e2f.png',
          revision: '91a3963b8c4fdf7d5a73983ad379bf25'
        },
        {
          url:
            '/assets/images/android-ac8666e166fe12cc8e6fa05c08bd05ab3797f5b68a40bc7756b05638c050e3a7.png',
          revision: '1c65c11e236c915a2cc38c113b5dcd80'
        },
        {
          url:
            '/assets/images/app_store-df16e1f9024ceb5d5e123c0921d28b347703ca506f48eadf987013eac135ae0f.png',
          revision: '0a74691509fb0514474e71f02954e078'
        },
        {
          url:
            '/assets/images/bct-150ac1809a7ae41e0a4b21f1e1e21a26a2f93ee0c79e5c99cc197dd2fdc988c8.png',
          revision: 'e448525f2500e9f81ecb4bf8096d1c1b'
        },
        { url: '/assets/images/customer1.jpg', revision: '7c8b5aae4da3178389e48c03c3eb99c4' },
        { url: '/assets/images/drugstore1.jpg', revision: '555f6f4802da4881c8f0b36975ddee6f' },
        { url: '/assets/images/drugstore2.jpg', revision: 'd9a7eca13512b1c5991230d2efdb7246' },
        { url: '/assets/images/drugstore3.jpg', revision: '7ad13059e21a1eaf5e66dc6145a2dab0' },
        {
          url:
            '/assets/images/e27-cb4049170b35067044fcd0f349629ab7aa611553abd57a68ef387ebb3f9ae024.png',
          revision: '19c43a04b68f48284ced1355b8aeaf16'
        },
        {
          url:
            '/assets/images/echelon-d5bad3e2adbe7549273ad51da80009b9f90e7d65816faef38effad7c3e71bd14.png',
          revision: '283f3590d037cf1e17fb116bd41ea4f4'
        },
        {
          url:
            '/assets/images/forbes_vn-80e941e673a0197e8510b2b44ec5bdcb8f7bcac4e2ac5a0ea74450fe38636188.png',
          revision: 'd0d7d5a1632fbf612a683ac14fbf63d0'
        },
        {
          url:
            '/assets/images/ghn-7c7a86d8247685ce42bf1dd7eea07970b502b4a21be9ab6a15787dc0899a3b79.png',
          revision: 'f087f1b5a9be1ef7500d124c6a440643'
        },
        {
          url:
            '/assets/images/ghtk-22fbe4903100177078c795a37f7ce7260582b95c1bad6cf37a0dba76127e7f5d.png',
          revision: 'eb96f1209bbadb04612f755dfaa21868'
        },
        {
          url:
            '/assets/images/google_store-a423ff0891a18d965fd4037cad14a26b0e4f4e05b344d20ae6eb59e999e19e4d.png',
          revision: '2c6b8c54ba80dc298b095fc6be244c27'
        },
        {
          url:
            '/assets/images/grab-0d623c296e4838dd4d67984a580fa1b244962d8e5e8de76f3acb548cddbf0c6c.png',
          revision: 'fe9f347a260bf98a8a254d987e434b16'
        },
        {
          url:
            '/assets/images/invest_global-68fe307b2be9da042162fcfde07c27fbeac62c3a0a3c9293a93f45410831ebe6.png',
          revision: 'c4b527affbcf2596ee12c584c17dcdf5'
        },
        {
          url:
            '/assets/images/ios-77d063cf231d64a33f6f1421415984d5cbc27f9b1314e42f6fbdce69f2b58b35.png',
          revision: '5df85fbf1460bb0b98575bf803e3ac9d'
        },
        {
          url:
            '/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d(1).svg',
          revision: 'ea989010f96abefdb705a464a7b7d8c9'
        },
        {
          url:
            '/assets/images/logo-49156a6a8b6688f3eb1098b08d406267e8770cffd64b6f07bb31e2e52536346d.svg',
          revision: 'ea989010f96abefdb705a464a7b7d8c9'
        },
        {
          url:
            '/assets/images/logo-icon-inverse-0b2c86569d4f524c701d36a672b0e6a64d8f61ba1d543bbe822b0fb282164ac2.svg',
          revision: '5a58ee50e7a72cecb232eab553e7f7ff'
        },
        { url: '/assets/images/logo.jpeg', revision: 'e1d0cf26ddad71649ce14ebeb174d768' },
        { url: '/assets/images/logo2.png', revision: '5f1affcd7389d2fa106b1173472389b4' },
        { url: '/assets/images/logo3.png', revision: '123a198334646b4b64d459d67c9ec93f' },
        { url: '/assets/images/newsletter.png', revision: '5db2779a49dd8f86cd672aef288b7abe' },
        {
          url:
            '/assets/images/ninjavan-df8ca83378c8c4f339ac240d845807ef5cfdef493b0e0a1762b8cb4ccce8feea.png',
          revision: '5591496665c693b6310584a7c2cb1d8b'
        },
        { url: '/assets/images/no-image.jpg', revision: '625d1aff2d58f024870ef61b95680166' },
        { url: '/assets/images/partner1.jpg', revision: 'a8ed2cffc9a893b3e9ce12f17bd175a9' },
        { url: '/assets/images/partner2.jpg', revision: 'd13f08bfb49232dfd5901c7090b613fb' },
        { url: '/assets/images/partner3.jpg', revision: '19a9ae75dbba2c7afc952c290ccc2cc8' },
        {
          url:
            '/assets/images/pitch_at_palace-16eaf1ce142a949922a0541c3ee98771a49aa1194e3ee11a2511d975e0620642.png',
          revision: 'd45e2383f9e57657a16a3536a8ad0805'
        },
        {
          url:
            '/assets/images/seedstars-c72fdf9dd4cb45a0259ffdf573570545dfd5382b94110a0934a4e82a9f900426.png',
          revision: '71b8bb8359fee89100eb3ffec54f0119'
        },
        { url: '/assets/images/slider1.png', revision: '1dc502fbf5cc032cd056317d10694c79' },
        { url: '/assets/images/slider2.png', revision: '6cee8c7e0c21bf2d33969c27c220bf6b' },
        { url: '/assets/images/slider3.png', revision: 'f2b6aa44e131d3983f48399f85d37fa1' },
        {
          url:
            '/assets/images/tai_chinh_cuoc_song-d63649e52a8c7c68a84b850388b3e0fa89ada03c0e072003ab1b1e4c207362b6.png',
          revision: 'e77636e8da4887206077f9e3525e42b3'
        },
        {
          url:
            '/assets/images/viettelpost-7e17e215b6fb2451347c386209259806b03dd68db90c636c9d800439cf195b0c.png',
          revision: '6f29a462faeb31f09b4160cbae7c0d89'
        },
        { url: '/favicon.ico', revision: 'e1d0cf26ddad71649ce14ebeb174d768' },
        {
          url: '/icons/android-icon-192x192-menofa-manifest-20129.png',
          revision: '93d14d320ab144098e9f505f93e7bf5b'
        },
        {
          url: '/icons/apple-icon-114x114-medofa-manifest-20129.png',
          revision: 'dc8f76bd75381f660f0ebdf71e0634bf'
        },
        {
          url: '/icons/apple-icon-120x120-medofa-manifest-20129.png',
          revision: 'f1363331da74ed1a040243f29b8c9493'
        },
        {
          url: '/icons/apple-icon-144x144-medofa-manifest-20129.png',
          revision: '28770c9b8c9466b8ca95606ae23d226b'
        },
        {
          url: '/icons/apple-icon-152x152-medofa-manifest-20129.png',
          revision: '50f5a6e113ec5f1af9f4d764ca6813f0'
        },
        {
          url: '/icons/apple-icon-180x180-medofa-manifest-20129.png',
          revision: '6f9cf4a4bd74feda82e137679e1eaad0'
        },
        {
          url: '/icons/apple-icon-57x57-medofa-manifest-20129.png',
          revision: '8b0d452da17872ac8a887dbb50833957'
        },
        {
          url: '/icons/apple-icon-60x60-medofa-manifest-20129.png',
          revision: '3d08b9721534a2c84861cdd3e297195f'
        },
        {
          url: '/icons/apple-icon-72x72-medofa-manifest-20129.png',
          revision: 'f792c6d0dd68c1db7b3e148789c56884'
        },
        {
          url: '/icons/apple-icon-76x76-medofa-manifest-20129.png',
          revision: '01b30fee75f0cc68275842a0744a9161'
        },
        {
          url: '/icons/favicon-16x16-medofa-manifest-20129.png',
          revision: '2f0592e200f5d1bd50c469839b0e2b5e'
        },
        {
          url: '/icons/favicon-32x32-medofa-manifest-20129.png',
          revision: '4ba26da62cf180d9db667b2196cd7f37'
        },
        {
          url: '/icons/favicon-512x512-medofa-manifest-20129.png',
          revision: '512f8f56c7448c3680efda6375505b28'
        },
        {
          url: '/icons/favicon-96x96-medofa-manifest-20129.png',
          revision: 'aa67914b8be58a9b96413ab70cb8c800'
        },
        { url: '/locales/en/applyJob.json', revision: 'bd2bf20a0a9fe45550cc814949cf12c7' },
        { url: '/locales/en/cancelOrder.json', revision: 'e6296371c7551256f005389f5ede299c' },
        { url: '/locales/en/carousels.json', revision: '354ccba79ab80a38688efaf1cd78ac18' },
        { url: '/locales/en/cart.json', revision: 'ffc59db0b98d9223152949289cae31f7' },
        { url: '/locales/en/checkout.json', revision: '808cd67ab5c1bf348d841848b0a4b79f' },
        { url: '/locales/en/common.json', revision: '6cb0abf8f25c84b2e0e611a1d67c6a92' },
        { url: '/locales/en/deals.json', revision: 'b086934d17023d8043156afc2e1c859c' },
        { url: '/locales/en/errors.json', revision: '68c2b140734be215046663faaac7e3f6' },
        { url: '/locales/en/filterTags.json', revision: '0d26de90863cad91f7d3fea8788032aa' },
        { url: '/locales/en/footer.json', revision: 'ffc4fe414b598032cbff8d95aae5b7cd' },
        { url: '/locales/en/header.json', revision: '62340d525ee3677d54627e953e4faab1' },
        { url: '/locales/en/ingredientDetails.json', revision: 'ed4c1b60541d7e51fdbbc9e65982ca28' },
        { url: '/locales/en/jobDetail.json', revision: '8fb5d83bd8ae3bf52808cb9165d86d42' },
        { url: '/locales/en/login.json', revision: '0d4b2785b4a5f03a8c30c19252652c28' },
        { url: '/locales/en/manufacturers.json', revision: 'a1b8b21ecb9649f4ec9490352db4c8d9' },
        { url: '/locales/en/myAccount.json', revision: 'c2245293630fc2e9e56420b3135cc78b' },
        { url: '/locales/en/myOrders.json', revision: 'dfe420349b59e81d3e02ba3ca5653f33' },
        { url: '/locales/en/navbar.json', revision: '0710cd3efb69e52753385b99061b4dc6' },
        { url: '/locales/en/noti.json', revision: 'e5233ab2415c321d6afa7770112d1905' },
        { url: '/locales/en/partner.json', revision: 'dcba22f1987204b7014ccdb2c8ab6260' },
        { url: '/locales/en/password.json', revision: '25988013718d38af6d6ca67c4483f237' },
        { url: '/locales/en/productBadge.json', revision: '0777f4b858b8b142021be582d36b6cbf' },
        { url: '/locales/en/productCard.json', revision: '63847f27cf79bbbe21368a66f3019bc5' },
        { url: '/locales/en/productDetail.json', revision: 'ebf98d99b68954ae8540a063ce3d15b5' },
        { url: '/locales/en/products.json', revision: '9d7cead8907966df8f129e0b17f78d05' },
        { url: '/locales/en/productsSidebar.json', revision: 'ed611d5d1b8886401dad7e420a9d6dab' },
        { url: '/locales/en/promoCodes.json', revision: 'd83f18269afe7ae787bc10055e420fcf' },
        { url: '/locales/en/register.json', revision: 'd0819e81394e39bfdc0e14459fab1f01' },
        { url: '/locales/en/searchBar.json', revision: '50d081dc4bf9b93e0fd6b5f1f9f7bf22' },
        { url: '/locales/en/strength.json', revision: '02b40e853f9ddee02b2bc7d108a30989' },
        { url: '/locales/vi/applyJob.json', revision: 'fa57f7dd94aa93de55f4179d404087bb' },
        { url: '/locales/vi/cancelOrder.json', revision: '038f002731c94f86c4b6784cbad177f8' },
        { url: '/locales/vi/carousels.json', revision: '329ba497c2a697ff00f8014ed7697eb6' },
        { url: '/locales/vi/cart.json', revision: 'a4af78d307cc0920885f66409e356348' },
        { url: '/locales/vi/checkout.json', revision: '7d2d1ecc2495d13cae07495c709417c2' },
        { url: '/locales/vi/common.json', revision: 'dffe6368169b2cc121390cf153b0e79e' },
        { url: '/locales/vi/deals.json', revision: '2cea3343aab694c68fcb384d4245f613' },
        { url: '/locales/vi/errors.json', revision: '1aab30703090e60fecb93a8186a41023' },
        { url: '/locales/vi/filterTags.json', revision: '77f16f4c151a8c3a45d9597b8e5433d3' },
        { url: '/locales/vi/footer.json', revision: 'c203a459987254ca7710e6ab47176a90' },
        { url: '/locales/vi/header.json', revision: '6201de7d48cbeeab8adb5a2316afb415' },
        { url: '/locales/vi/ingredientDetails.json', revision: 'e3a53255ea4f340c9e20cc8478c56db8' },
        { url: '/locales/vi/jobDetail.json', revision: 'f71dc252c13c8750195cc289383b6cf7' },
        { url: '/locales/vi/login.json', revision: 'a430ef9068bdb00614c31903de596734' },
        { url: '/locales/vi/manufacturers.json', revision: '4b72c5b6ba6b74af194b552da98b8739' },
        { url: '/locales/vi/myAccount.json', revision: 'bc84fabacd25470e59c79f36b3b4c934' },
        { url: '/locales/vi/myOrders.json', revision: '7ddb4872e647a5e6bb3a8d37dcbadc6c' },
        { url: '/locales/vi/navbar.json', revision: '7536281d121031b3069e250434117db9' },
        { url: '/locales/vi/noti.json', revision: 'ec54a034874947c73bd43bebff1bbf3f' },
        { url: '/locales/vi/partner.json', revision: '9baef9a1c435365051ba824e647d4e49' },
        { url: '/locales/vi/password.json', revision: 'fde06badaba74c58ee483f1b061cf195' },
        { url: '/locales/vi/productBadge.json', revision: '0645089f6f18a3d1e4781a365134cdff' },
        { url: '/locales/vi/productCard.json', revision: '509dadf99ee57581019cbda469409b65' },
        { url: '/locales/vi/productDetail.json', revision: '0d300912a5243b2c1a40d90852b5298e' },
        { url: '/locales/vi/products.json', revision: 'b52f4adb18e13c0cc6d1c15cbf109461' },
        { url: '/locales/vi/productsSidebar.json', revision: 'af5b3743501d9d49e99dec0301e85fc6' },
        { url: '/locales/vi/promoCodes.json', revision: '5c0922ad52fded5c24df68c6457e2400' },
        { url: '/locales/vi/register.json', revision: 'cb6c922cde59fd295854c68482954e3f' },
        { url: '/locales/vi/searchBar.json', revision: '0e6b11a71d6cb840ca43dd1930264533' },
        { url: '/locales/vi/strength.json', revision: 'ffd1608c4cb4b25ef5324bc93de9e7db' },
        { url: '/manifest.json', revision: '4047395af5e582f7a9f3adf0860f8752' },
        { url: '/sw.js', revision: '5dc7d265b6e41eb97dfa1ae1398eecbd' },
        { url: '/sw.js.map', revision: 'b6458cf6917e3f1f096b296679c70218' },
        { url: '/vercel.svg', revision: '4b4f1876502eb6721764637fe5c41702' }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })
        ]
      }),
      'GET'
    );
});

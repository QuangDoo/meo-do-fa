import React from 'react';
import News from 'src/components/Modules/News';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import NewsDetail from '../../components/Modules/NewsDetail/NewsDetail';

const data = {
  author: 'Admin',
  categories: [
    { href: '/news', title: 'ĐỒNG HÀNH CÙNG THUOCSI' },
    { href: '/news', title: 'TIN TỨC THUOCSI.VN' }
  ],
  imgUrl: 'https://i1.sndcdn.com/avatars-xpq4R8nRHWRL7NiZ-pyJFyg-t500x500.jpg',
  title:
    'Doanh nhân Nguyễn Hoàng: Không tham vọng đưa BuyMed trở thành kỳ lân, mà có giấc mơ lớn hơn',
  description: `
    <div>
      <div class="details-block">
        <h4 style="font-size: 13px; line-height: 40px;font-weight: 400; margin: 0; border-bottom: 1px solid #a2a2a2; margin-bottom: 10px;">CHI TIẾT SẢN PHẨM
        </h4> <div id="editor-content">
        <p>Dùng trị da nhờn: Dùng 2 muỗng canh cám 
          gạo trộn với 2 muỗng canh nước chanh và nước ấm đủ tạo thành bột nhão. Đắp hỗn hợp này lên mặt
          đã rửa sạch bằng nước ấm chừng 15 – 20 phút rồi rửa nhẹ bằng nước ấm. Nên đắp vào buổi tối 
          trước khi đi ngủ. Kiên trì làm từ 1 – 2 lần/ tuần, chất nhờn trên da sẽ giảm dần.</p><p>Tẩy 
          tế bào chết toàn thân: Trong lipid của cám gạo còn có tinh dầu cám gạo (gamma oryzanol) – 
          là một hoạt chất có tác dụng chống acid hóa, ngăn chặn sự xâm nhập của tia cực tím, cản trở 
          hoạt động bài tiết sắc tố melamin trong biểu bì, do đó có tác dụng phòng chống nám da. Vitamin
          E giúp da chống lại sự lão hóa…
        </p>
        <p>Rửa mặt: Làm ướt mặt, dùng 1 ít bột cám gạo thoa đều trực
            tiếp lên da và massage vài phút rồi rửa sạch lại bằng nước. Pha 1 ít bột cám gạo với sữa tươi
            hoặc nước thoa lên da, massage vài phút rồi rửa sạch lại bằng nước.</p><p>Đắp mặt nạ: Rửa mặt 
            sạch. Sau đó, pha hỗn hợp gồm 2 muỗng bột cám gạo + sữa tươi + mật ong thành hỗn hợp sệt thoa 
            lên da để trong 20 – 30 phút. Sau đó rửa sạch lại bằng nước.</p><p>Tắm toàn thân: Làm sạch da
            bằng cách tắm tẩy da chết. Hoặc dùng Muối tẩy da chết tắm trước khi đắp cám gạo để đạt hiệ
            u quả tối ưu. Pha hỗn hợp gồm ½ gói bột cám gạo + 100ml sữa + mật ong thành hỗn hợp sệt thoa lên da, 
            massage trong vòng 20 – 30 phút rồi tắm lại bằng nước. Ngoài sữa tươi ra, có thể thay thế bằng nước 
            ép trái cây cam, vài giọi chanh, dưa leo, dâu tây …
          </p>
        <p>
          <img src="http://media3.scdn.vn/img4/2020/11_17/ppANhtfGkxSGeLLeLRXB_simg_d0daf0_800x1200_max.jpg" 
            style="margin: 0 auto;width:100%;display:block;">
          <br><br>
          <img src="http://media3.scdn.vn/img4/2020/11_17/omEzERl84bQ2Bv8rgAuT_simg_d0daf0_800x1200_max.jpg" 
            style="margin: 0 auto;width:100%;display:block;">
          <br></br>
          <img src="http://media3.scdn.vn/img4/2020/11_17/Whtsxke0eC6z4DpNSmMA_simg_d0daf0_800x1200_max.jpg" 
            style="margin: 0 auto;width:100%;display:block;">
          <br></br>
          <img src="http://media3.scdn.vn/img4/2020/11_17/8fswn1Uxs607FCwmY8Tp_simg_d0daf0_800x1200_max.jpg" 
            style="margin: 0 auto;width:100%;display:block;">
          <br></br>
          <img src="http://media3.scdn.vn/img4/2020/11_17/Sw5EMH5NHe4TGs3Z5cTC_simg_d0daf0_800x1200_max.jpg" 
            style="margin: 0 auto;width:100%;display:block;">
          <br></br>
          <img src="http://media3.scdn.vn/img4/2020/11_17/OTnZzGYL4bicTPxZ9VDD_simg_d0daf0_800x1200_max.jpg" 
            style="margin: 0 auto;width:100%;display:block;">
          <br></br><img src="http://media3.scdn.vn/img4/2020/11_17/iblFqVv7eFHSMTjSbVov_simg_d0daf0_800x1200_max.jpg" 
            style="margin: 0 auto;width:100%;display:block;">
          <br></br>
        </p>
      </div>
    </div>`
};

const imgUrl =
  'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c596bb11090425.560f16f7207b1.jpg';
const links = [
  { href: '', title: 'Contrary  Lorem Ipsum is not simply random text' },
  { href: '', title: 'Contrary to text Contrary to populartext Contrary to populartext' },
  { href: '', title: 'Contrary to popular belief, Lorem random text Contrary to populartext' },
  { href: '', title: 'Contrary Ipsum is not simply random text Contrary to populartext' },
  { href: '', title: 'Contrary is not simply random text Contrary to populartext' },
  { href: '', title: 'Contrary to to populartext Contrary to populartext Contrary to populartext' }
];

const NewsPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <News bannerImgUrl={imgUrl} links={links}>
        <NewsDetail
          imgUrl={data.imgUrl}
          categories={data.categories}
          description={data.description}
          author={data.author}
          title={data.title}></NewsDetail>
      </News>

      <Footer />
    </>
  );
};

NewsPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'header', 'footer', 'productCard', 'productBadge']
});

export default NewsPage;

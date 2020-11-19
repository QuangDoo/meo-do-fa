import React from 'react'
import Link from 'next/link'

const data = {
  categories: [
    { href: '/news', title: 'ĐỒNG HÀNH CÙNG THUOCSI' },
    { href: '/news', title: 'TIN TỨC THUOCSI.VN' }
  ],
  imgUrl: 'https://i1.sndcdn.com/avatars-xpq4R8nRHWRL7NiZ-pyJFyg-t500x500.jpg',
  title:  'Doanh nhân Nguyễn Hoàng: Không tham vọng đưa BuyMed trở thành kỳ lân, mà có giấc mơ lớn hơn',
  description: `<div><div class="details-block"><h4 style="font-size: 13px; line-height: 40px; 
  font-weight: 400; margin: 0; border-bottom: 1px solid #a2a2a2; margin-bottom: 10px;">
  CHI TIẾT SẢN PHẨM</h4> <div id="editor-content"><p>Dùng trị da nhờn: Dùng 2 muỗng canh cám 
  gạo trộn với 2 muỗng canh nước chanh và nước ấm đủ tạo thành bột nhão. Đắp hỗn hợp này lên mặt
  đã rửa sạch bằng nước ấm chừng 15 – 20 phút rồi rửa nhẹ bằng nước ấm. Nên đắp vào buổi tối 
  trước khi đi ngủ. Kiên trì làm từ 1 – 2 lần/ tuần, chất nhờn trên da sẽ giảm dần.</p><p>Tẩy 
  tế bào chết toàn thân: Trong lipid của cám gạo còn có tinh dầu cám gạo (gamma oryzanol) – 
  là một hoạt chất có tác dụng chống acid hóa, ngăn chặn sự xâm nhập của tia cực tím, cản trở 
  hoạt động bài tiết sắc tố melamin trong biểu bì, do đó có tác dụng phòng chống nám da. Vitamin
  E giúp da chống lại sự lão hóa…</p><p>Rửa mặt: Làm ướt mặt, dùng 1 ít bột cám gạo thoa đều trực
  tiếp lên da và massage vài phút rồi rửa sạch lại bằng nước. Pha 1 ít bột cám gạo với sữa tươi
  hoặc nước thoa lên da, massage vài phút rồi rửa sạch lại bằng nước.</p><p>Đắp mặt nạ: Rửa mặt 
  sạch. Sau đó, pha hỗn hợp gồm 2 muỗng bột cám gạo + sữa tươi + mật ong thành hỗn hợp sệt thoa 
  lên da để trong 20 – 30 phút. Sau đó rửa sạch lại bằng nước.</p><p>Tắm toàn thân: Làm sạch da
  bằng cách tắm tẩy da chết. Hoặc dùng Muối tẩy da chết tắm trước khi đắp cám gạo để đạt hiệ
  u quả tối ưu. Pha hỗn hợp gồm ½ gói bột cám gạo + 100ml sữa + mật ong thành hỗn hợp sệt thoa lên da, 
  massage trong vòng 20 – 30 phút rồi tắm lại bằng nước. Ngoài sữa tươi ra, có thể thay thế bằng nước 
  ép trái cây cam, vài giọi chanh, dưa leo, dâu tây …</p><p><img src="http://media3.scdn.vn/img4/2020/
  11_17/ppANhtfGkxSGeLLeLRXB_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto;display:block;"><br>
  <br><img src="http://media3.scdn.vn/img4/2020/11_17/omEzERl84bQ2Bv8rgAuT_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto;display:block;"><br><br><img src="http://media3.scdn.vn/img4/2020/11_17/Whtsxke0eC6z4DpNSmMA_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto;display:block;"><br><br><img src="http://media3.scdn.vn/img4/2020/11_17/8fswn1Uxs607FCwmY8Tp_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto;display:block;"><br><br><img src="http://media3.scdn.vn/img4/2020/11_17/Sw5EMH5NHe4TGs3Z5cTC_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto;display:block;"><br><br><img src="http://media3.scdn.vn/img4/2020/11_17/OTnZzGYL4bicTPxZ9VDD_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto;display:block;"><br><br><img src="http://media3.scdn.vn/img4/2020/11_17/iblFqVv7eFHSMTjSbVov_simg_d0daf0_800x1200_max.jpg" style="margin: 0 auto;display:block;"><br><br><br></p></div>                           </div>                       </div>`
};

type Props = {
  categories?: any
  title?: string
  description?: string
  createAt?: string
  author?: string
}
function NewsDetail (props: Props) {
  function createMarkup() {
    return { __html: data.description };
  }
  return (
    <>
      <div className="news-detail">
        <div className="news-header">
          <div className="news-header__category">
            {
              data.categories.map((category,index)=>(<span key={index}><Link href={category.href}>
              <a className="news-header__link">{category.title}</a>
            </Link></span>))
            }
          </div>
          <h1 className="news-header__title text-center">{data.title}</h1>
          <div className="post-item__content-divider"></div>
          <div className="news-header__poston">
            {`post on `}
            <Link href="#">
              <a href="#" className="news-header__link">SEPTEMBER 14,2020</a>
            </Link>
            {`,by `}
            <Link href="#">
              <a href="#" className="news-header__link">Admin</a>
            </Link>
          </div>
        </div>
        <div className="post-item__img">
          <img 
            className="post-item__img-item" 
            alt={data.title}
            src={data.imgUrl}
          ></img>
        </div>
        <div className="news-detail__content">
          <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
      </div>
    </>
  )
}


export default NewsDetail
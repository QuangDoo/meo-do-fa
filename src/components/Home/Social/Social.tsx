import React from 'react';

const Social = (): JSX.Element => {
  return (
    <section className="bg-white text-center py-5 home__in-the-news">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Truyền thông nói gì về thuocsi.vn</h2>
          </div>
        </div>
        <div className="row in-the-news__items">
          <div className="col-sm-3 col-6 in-the-news__item">
            <a
              href="https://www.seedstarsworld.com/event/seedstars-hochiminh-2018/"
              rel="noreferrer"
              target="_blank">
              <img
                alt="Seedstars"
                className="lozad img-fluid bg-light"
                src="https://assets.thuocsi.vn/assets/in_the_news/seedstars-c72fdf9dd4cb45a0259ffdf573570545dfd5382b94110a0934a4e82a9f900426.png"
                title="Thuocsi thắng Seedstars"
              />
            </a>
          </div>
          <div className="col-sm-3 col-6 in-the-news__item">
            <a
              href="https://taichinhcuocsong.vn/doc-bao-giup-ban/startup-viet-trinh-lang-tai-thuy-si-6432.html"
              rel="nofollow noreferrer"
              target="_blank">
              <img
                alt="Tài chính cuộc sống"
                className="lozad img-fluid"
                src="https://assets.thuocsi.vn/assets/in_the_news/tai_chinh_cuoc_song-d63649e52a8c7c68a84b850388b3e0fa89ada03c0e072003ab1b1e4c207362b6.png"
                title='Thuocsi - Startup Việt "trình làng" tại Thụy Sĩ'
              />
            </a>
          </div>
          <div className="col-sm-3 col-6 in-the-news__item">
            <a
              href="https://pitchatpalace.com/pitchpalace-vietnam-1-0-the-results/"
              rel="nofollow noreferrer"
              target="_blank">
              <img
                alt="Pitch@Palace"
                className="lozad img-fluid"
                src="https://assets.thuocsi.vn/assets/in_the_news/pitch_at_palace-16eaf1ce142a949922a0541c3ee98771a49aa1194e3ee11a2511d975e0620642.png"
                title="Thuocsi thắng pitch@palace"
              />
            </a>
          </div>
          <div className="col-sm-3 col-6 in-the-news__item">
            <a
              href="http://oi.nttdata.com/en/contest/9th/venue/c05/"
              rel="nofollow noreferrer"
              target="_blank">
              <img
                alt="NTT DATA Open Innovation Contest 9.0"
                className="lozad img-fluid"
                src="https://assets.thuocsi.vn/assets/in_the_news/NTT-fb6d731b186fd67092490155abaa2dfe03a58d2ad74cdf1e494b27050ddb4576.png"
                title="Thuocsi thắng NTT Data"
              />
            </a>
          </div>
          <div className="col-sm-3 col-6 in-the-news__item">
            <a
              href="https://e27.co/our-ho-chi-minh-city-top100-winners-prove-that-the-vietnamese-dragon-is-awake-20190313/"
              rel="nofollow noreferrer"
              target="_blank">
              <img
                alt="E27 Top100"
                className="lozad img-fluid bg-dark"
                src="https://assets.thuocsi.vn/assets/in_the_news/echelon-d5bad3e2adbe7549273ad51da80009b9f90e7d65816faef38effad7c3e71bd14.png"
                title="Thuocsi (Buymed) trong bản tin e27"
              />
            </a>
          </div>
          <div className="col-sm-3 col-6 in-the-news__item">
            <a
              href="https://investglobal.vn/tin-tuc/startup-phan-phoi-duoc-pham-truc-tuyen-buymed-duoc-dau-tu-500-000-usd-tu-2-quy-dau-tu-183.html"
              rel="nofollow noreferrer"
              target="_blank">
              <img
                alt="Invest Global"
                className="lozad img-fluid"
                src="https://assets.thuocsi.vn/assets/in_the_news/invest_global-68fe307b2be9da042162fcfde07c27fbeac62c3a0a3c9293a93f45410831ebe6.png"
                title="Thuocsi (Buymed) trong bản tin Invest Global"
              />
            </a>
          </div>
          <div className="col-sm-3 col-6 in-the-news__item">
            <a
              href="https://forbesvietnam.com.vn/tin-cap-nhat/buymed-startup-muon-giam-tinh-trang-thuoc-gia-nhan-von-500000-usd-7709.html"
              rel="nofollow noreferrer"
              target="_blank">
              <img
                alt="Forbes Vietnam"
                className="lozad img-fluid"
                src="https://assets.thuocsi.vn/assets/in_the_news/forbes_vn-80e941e673a0197e8510b2b44ec5bdcb8f7bcac4e2ac5a0ea74450fe38636188.png"
                title="Thuocsi (Buymed) trong bản tin Forbes Vietnam"
              />
            </a>
          </div>
          <div className="col-sm-3 col-6 in-the-news__item">
            <a
              href="https://e27.co/vietnamese-online-pharma-marketplace-thuocsi-vn-secures-us500k-from-cocoon-capital-vietcapital-ventures-20190926/"
              rel="nofollow noreferrer"
              target="_blank">
              <img
                alt="E27 - thuocsi secures $500"
                className="lozad img-fluid"
                src="https://assets.thuocsi.vn/assets/in_the_news/e27-cb4049170b35067044fcd0f349629ab7aa611553abd57a68ef387ebb3f9ae024.png"
                title="Thuocsi (Buymed) nhận được $500 tiền đầu tư"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Social;

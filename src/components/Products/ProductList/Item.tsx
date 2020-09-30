import React from 'react'

const Item = () => {
  return (
    <div className="product-card-container">
      <article className="product-card card">
        <div className="product-card__main">
          <div className="product-card__description mb-3">
            <div className="product-card__new-arrival">Mới</div>
            <a href="https://thuocsi.vn/products/egudin-solifenacin-succinat-5mg-medisun-h-30v">
              <div
                className="product-card__image mb-3 lozad"
                style={{
                  backgroundImage: 'url("https://images.thuocsi.vn/Lg9NokKW5SY2TGdtiEKFCNeR")',
                }}
              />
            </a>
            <div>
              <a
                className="text-decoration-none"
                href="https://thuocsi.vn/products/egudin-solifenacin-succinat-5mg-medisun-h-30v"
              >
                <h6 className="product-card__name">
                  egudin solifenacin succinat 5mg medisun (h/30v)
                </h6>
              </a>
              <div className="product__status mb-2" />
              <small className="text-muted">Hộp 3 vỉ x 10 viên</small>
              <br />
              <small className="text-muted product-card__category">
                Nhóm: <a href="https://thuocsi.vn/categories/than-tiet-nieu">thận, tiết niệu</a>
              </small>
            </div>
          </div>
          <div className="product-card__buy">
            <div className="mb-2">
              <span className="product-card__price">
                430.500<span className="unit">đ</span>
              </span>
            </div>
            <div className="qty js-qty">
              <button className="btn btn-sm qty__button qty__button--minus">
                <i className="fas fa-minus" />
              </button>
              <input
                type="tel"
                name="item_quantity"
                className="form-control px-1 no-spinner text-center qty__input"
                inputMode="numeric"
                min={0}
                max={100000}
                step={1}
                autoComplete="off"
                placeholder="0"
              />
              <button className="btn btn-sm qty__button qty__button--plus">
                <i className="fas fa-plus" />
              </button>
              <div className="qty__status text-center">
                <small className="text-danger qty__status-updating">
                  <i className="fas fa-spinner fa-spin mr-1" />
                  Đang cập nhật
                </small>
                <small className="text-primary qty__status-updated">
                  <i className="fas fa-check-circle mr-1" />
                  Đã cập nhật
                </small>
                <small className="text-danger qty__status-error">
                  <i className="fas fa-exclamation-circle mr-1" />
                  Lỗi cập nhật
                </small>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Item

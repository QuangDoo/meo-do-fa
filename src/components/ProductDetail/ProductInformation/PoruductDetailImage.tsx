import React from 'react'

const ProuductDetailImage = (props) => {
    
    return (
        <div className="col-md-4">
            <div className="d-flex justify-content-between mb-2">
                <div className="product__thumbnails scrollbar-on-hover pr-1 mr-3">
                    <div className="d-flex flex-column">
                        <img alt="Kidney Cap Bát Vị Bổ Thận Dương Opc (H/50v) 1" className="img-fluid product__thumbnail lozad selected" data-action="click->product#selectThumbnail" data-src={props.imageUrl} data-target="product.thumbnail" src={props.imageUrl}
                            title="Kidney Cap Bát Vị Bổ Thận Dương Opc (H/50v) 1" data-loaded="true" />
                    </div>
                </div>
                <div className="flex-grow-1">
                    <div className="lozad product__image" data-background-image="https://images.thuocsi.vn/qefH9wdrY1UZzaa9MWJ9pJoi" data-target="product.primaryImage" data-loaded="true" style={{ backgroundImage: 'url("https://images.thuocsi.vn/qefH9wdrY1UZzaa9MWJ9pJoi")' }} />
                </div>
            </div>
            <small className="text-muted">* Hình sản phẩm có thể thay đổi theo thời gian</small>
        </div>
    )
}
export default ProuductDetailImage
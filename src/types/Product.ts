import { Category } from './Category';
import { ProductBadgeType } from './ProductBadgeType';
import { Supplier } from './Supplier';

export type Product = {
  id: string; // Id sản phẩm
  name: string; // Tên sản phẩm
  image: string; // Ảnh sản phẩm
  unit: string; // Đơn vị tính, vd "Chai 100 viên", "Hộp 2 vỉ x 15 viên"
  categories: Category[]; // Các nhóm thuốc
  badges?: ProductBadgeType[]; // Các tag
  new?: boolean; // Sản phẩm mới
  discountPercent?: number; // Tỉ lệ giảm giá
  supplier?: Supplier; // Nhà cung cấp
  oldPrice?: string; // Giá cũ (nếu có giảm giá)
  price: string; // Giá hiện tại
  deal?: boolean; // Sản phẩm này đang có deal
  expirationDate?: string; // Hạn sử dụng (nếu có tag "cận date")
};

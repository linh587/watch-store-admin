import { MenuItem } from "../../models/menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "Trang chủ",
    isTitle: true,
    role: "",
  },
  {
    id: 2,
    label: "Trang chủ",
    icon: "ri-dashboard-2-line",
    link: "/dashboard",
    role: "",
  },
  {
    id: 3,
    label: "Quản lý sản phẩm",
    isTitle: true,
    role: "",
  },
  {
    id: 4,
    label: "Quản lý sản phẩm",
    icon: "bx bxs-watch",
    role: "",
    subItems: [
      {
        id: 5,
        label: "Nhóm sản phẩm",
        link: "/product-management/brands",
        parentId: 4,
        role: "",
      },
      {
        id: 6,
        label: "Sản phẩm",
        link: "/product-management/products",
        parentId: 4,
        role: "",
      },
      {
        id: 15,
        label: "Size sản phẩm",
        link: "/product-management/sizes",
        parentId: 4,
        role: "",
      },
      {
        id: 16,
        label: "Giá sản phẩm",
        link: "/product-management/prices",
        parentId: 4,
        role: "",
      },
    ],
  },
  {
    id: 7,
    label: "Quản lý đơn mua",
    isTitle: true,
    role: "staff",
  },
  {
    id: 8,
    label: "Quản lý đơn mua",
    icon: "ri-bill-line",
    role: "staff",
    subItems: [
      {
        id: 9,
        label: "Danh sách đơn",
        link: "/order-management/orders",
        parentId: 8,
        role: "staff",
      },
    ],
  },
  {
    id: 11,
    label: "Quản lý người dùng",
    isTitle: true,
    role: "admin",
  },
  {
    id: 12,
    label: "Quản lý người dùng",
    icon: "ri-account-circle-line",
    role: "admin",
    subItems: [
      {
        id: 13,
        label: "Khách hàng",
        link: "/user-management/customers",
        parentId: 12,
        role: "admin",
      },
      {
        id: 14,
        label: "Nhân viên",
        link: "/user-management/staffs",
        parentId: 12,
        role: "admin",
      },
      {
        id: 15,
        label: "Nhà cung cấp",
        link: "/user-management/suppliers",
        parentId: 12,
        role: "admin",
      },
    ],
  },
  {
    id: 16,
    label: "Quản lý phiếu nhập",
    isTitle: true,
    role: "admin",
  },
  {
    id: 17,
    label: "Quản lý phiếu nhập",
    icon: "ri-bill-line",
    role: "admin",
    subItems: [
      {
        id: 18,
        label: "Phiếu nhập",
        link: "/receipt-management/receipts",
        parentId: 17,
        role: "admin",
      },
    ],
  },
];

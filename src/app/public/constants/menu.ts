import { MenuItem } from "../../models/menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "Trang chủ",
    isTitle: true,
  },
  {
    id: 2,
    label: "Trang chủ",
    icon: "ri-dashboard-2-line",
    link: "/dashboard",
  },
  {
    id: 3,
    label: "Quản lý sản phẩm",
    isTitle: true,
  },
  {
    id: 4,
    label: "Quản lý sản phẩm",
    icon: "bx bxs-watch",
    subItems: [
      {
        id: 5,
        label: "Nhóm sản phẩm",
        link: "/product-management/brands",
        parentId: 4,
      },
      {
        id: 6,
        label: "Sản phẩm",
        link: "/product-management/products",
        parentId: 4,
      },
      {
        id: 15,
        label: "Size sản phẩm",
        link: "/product-management/sizes",
        parentId: 4,
      },
      {
        id: 16,
        label: "Giá sản phẩm",
        link: "/product-management/prices",
        parentId: 4,
      },
    ],
  },
  {
    id: 7,
    label: "Quản lý đơn mua",
    isTitle: true,
  },
  {
    id: 8,
    label: "Quản lý đơn mua",
    icon: "ri-bill-line",
    subItems: [
      {
        id: 9,
        label: "Danh sách đơn",
        link: "/order-management/orders",
        parentId: 8,
      },
      {
        id: 10,
        label: "Chi tiết đơn",
        link: "/order-management/order-detail",
        parentId: 8,
      },
    ],
  },
  {
    id: 11,
    label: "Quản lý tài khoản",
    isTitle: true,
  },
  {
    id: 12,
    label: "Quản lý tài khoản",
    icon: "ri-account-circle-line",
    subItems: [
      {
        id: 13,
        label: "Tài khoản",
        link: "/customer-management",
        parentId: 12,
      },
      {
        id: 14,
        label: "Chi tiết tài khoản",
        link: "/",
        parentId: 12,
      },
    ],
  },
];

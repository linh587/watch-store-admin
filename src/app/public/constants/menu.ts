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
    icon: "ri-dashboard-2-line",
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
    icon: "ri-dashboard-2-line",
    subItems: [
      {
        id: 9,
        label: "Danh sách dơn",
        link: "",
        parentId: 8,
      },
      {
        id: 10,
        label: "Chi tiết đơn",
        link: "/",
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
    icon: "ri-dashboard-2-line",
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

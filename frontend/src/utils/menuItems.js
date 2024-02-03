import {
  dashboard,
  expenses,
  transactions,
  trend,
  fund,
  rosca,
} from "../utils/Icons";

export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "View Transactions",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Incomes",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Expenses",
    icon: expenses,
    link: "/dashboard",
  },
  {
    id: 5,
    title: "MoneyMinds Fund",
    icon: fund,
    link: "/fund",
  },
  {
    id: 6,
    title: "ROSCA",
    icon: rosca,
    link: "/rosca",
  },
];

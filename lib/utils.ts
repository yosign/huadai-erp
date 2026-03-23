import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { cases, contracts, customers, paymentRecords, tickets, type PaymentRecord } from "@/lib/mock-data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function currency(amount: number): string {
  return "¥ " + amount.toLocaleString("zh-CN")
}

export function getCustomerName(id: string): string {
  return customers.find((c) => c.id === id)?.name ?? id
}

export function getCaseName(id: string): string {
  return cases.find((item) => item.id === id)?.name ?? id
}

export function caseStatusClassName(status: string): string {
  const map: Record<string, string> = {
    "待提交": "bg-gray-100 text-gray-600",
    "受理中": "bg-blue-100 text-blue-700",
    "审查中": "bg-yellow-100 text-yellow-700",
    "下证中": "bg-purple-100 text-purple-700",
    "已完成": "bg-green-100 text-green-700",
  }
  return map[status] ?? "bg-gray-100 text-gray-600"
}

export function getStatusClass(status: string): string {
  const map: Record<string, string> = {
    "待提交": "bg-gray-100 text-gray-600",
    "受理中": "bg-blue-100 text-blue-700",
    "审查中": "bg-yellow-100 text-yellow-700",
    "下证中": "bg-purple-100 text-purple-700",
    "已完成": "bg-green-100 text-green-700",
    "签约中": "bg-amber-100 text-amber-700",
    "已续签": "bg-emerald-100 text-emerald-700",
    "已到期": "bg-orange-100 text-orange-700",
    "流失": "bg-slate-200 text-slate-700",
    VIP: "bg-rose-100 text-rose-700",
    "重点": "bg-blue-100 text-blue-700",
    "普通": "bg-slate-100 text-slate-700",
    "执行中": "bg-blue-100 text-blue-700",
    "待续签": "bg-orange-100 text-orange-700",
    "已收款": "bg-emerald-100 text-emerald-700",
    "部分收款": "bg-amber-100 text-amber-700",
    "逾期未收": "bg-rose-100 text-rose-700",
    "待处理": "bg-slate-100 text-slate-700",
    "处理中": "bg-blue-100 text-blue-700",
    "已处理": "bg-emerald-100 text-emerald-700",
    "已开票": "bg-emerald-100 text-emerald-700",
    "待开票": "bg-amber-100 text-amber-700",
    "已寄送": "bg-blue-100 text-blue-700",
  }

  return map[status] ?? caseStatusClassName(status)
}

export function paymentStatusClassName(status: string): string {
  return getStatusClass(status)
}

export function ticketStatusClassName(status: string): string {
  return getStatusClass(status)
}

export function getPaymentTag(payment: PaymentRecord): "default" | "warning" | "danger" {
  if (payment.status === "逾期未收") return "danger"
  if (payment.status === "部分收款") return "warning"
  return "default"
}

export function getCustomerCases(customerId: string) {
  return cases.filter((item) => item.client === customerId)
}

export function getCustomerContracts(customerId: string) {
  return contracts.filter((item) => item.customerId === customerId)
}

export function getCustomerPayments(customerId: string) {
  return paymentRecords.filter((item) => item.client === customerId)
}

export function getCustomerTickets(customerId: string) {
  return tickets.filter((item) => item.client === customerId)
}

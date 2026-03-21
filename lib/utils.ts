import { clsx, type ClassValue } from "clsx"

import { cases, contracts, customers, paymentRecords, tickets, type CaseStatus, type PaymentStatus, type ServiceLevel, type SignStatus, type TicketStatus } from "@/lib/mock-data"

export function cn(...values: ClassValue[]) {
  return clsx(values)
}

export function currency(value: number) {
  return `¥${value.toLocaleString("zh-CN")}`
}

export function getCustomerName(customerId: string) {
  return customers.find((item) => item.id === customerId)?.name ?? "--"
}

export function getCaseName(caseId: string) {
  return cases.find((item) => item.id === caseId)?.name ?? "--"
}

export function getCustomerById(customerId: string) {
  return customers.find((item) => item.id === customerId)
}

export function getCaseById(caseId: string) {
  return cases.find((item) => item.id === caseId)
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

export function getPaymentTag(payment: { dueDate: string; status: PaymentStatus }) {
  const today = new Date("2024-06-10")
  const dueDate = new Date(payment.dueDate)
  const diff = Math.ceil((dueDate.getTime() - today.getTime()) / 86400000)
  if (payment.status === "逾期未收" || diff < 0) return "danger"
  if (diff <= 7) return "warning"
  return "normal"
}

export function getStatusClass(status: string): string {
  const map: Record<string, string> = {
    待提交: "border-gray-200 bg-gray-100 text-gray-600",
    受理中: "border-blue-200 bg-blue-100 text-blue-800",
    审查中: "border-orange-200 bg-orange-100 text-orange-800",
    下证中: "border-purple-200 bg-purple-100 text-purple-800",
    已完成: "border-green-200 bg-green-100 text-green-800",
    签约中: "border-indigo-200 bg-indigo-100 text-indigo-800",
    已续签: "border-green-200 bg-green-100 text-green-800",
    已到期: "border-red-200 bg-red-100 text-red-800",
    流失: "border-gray-200 bg-gray-100 text-gray-500",
    VIP: "border-amber-200 bg-amber-100 text-amber-800",
    重点: "border-blue-200 bg-blue-100 text-blue-800",
    普通: "border-gray-200 bg-gray-100 text-gray-600",
    已处理: "border-green-200 bg-green-100 text-green-800",
    待处理: "border-orange-200 bg-orange-100 text-orange-800",
    处理中: "border-blue-200 bg-blue-100 text-blue-800",
    已收款: "border-green-200 bg-green-100 text-green-800",
    部分收款: "border-orange-200 bg-orange-100 text-orange-800",
    逾期未收: "border-red-200 bg-red-100 text-red-800",
    执行中: "border-blue-200 bg-blue-100 text-blue-800",
    待续签: "border-amber-200 bg-amber-100 text-amber-800",
    待开票: "border-amber-200 bg-amber-100 text-amber-800",
    已开票: "border-green-200 bg-green-100 text-green-800",
    已寄送: "border-blue-200 bg-blue-100 text-blue-800",
    材料补正: "border-amber-200 bg-amber-100 text-amber-800",
    财务催收: "border-red-200 bg-red-100 text-red-800",
    案件跟进: "border-sky-200 bg-sky-100 text-sky-800",
    销售推进: "border-emerald-200 bg-emerald-100 text-emerald-800",
  }

  return map[status] ?? "border-gray-200 bg-gray-100 text-gray-600"
}

export function signStatusClassName(status: SignStatus) {
  return getStatusClass(status)
}

export function serviceLevelClassName(level: ServiceLevel) {
  return getStatusClass(level)
}

export function caseStatusClassName(status: CaseStatus) {
  return getStatusClass(status)
}

export function paymentStatusClassName(status: PaymentStatus) {
  return getStatusClass(status)
}

export function ticketStatusClassName(status: TicketStatus) {
  return getStatusClass(status)
}

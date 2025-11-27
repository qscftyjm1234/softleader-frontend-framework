export default {
  module: 'insurance',
  routes: [
  {
    label: "保險總覽",
    icon: "mdi-view-dashboard-variant",
    path: "/insurance/dashboard",
    permission: "insurance.view"
  },
  {
    label: "保單行政",
    icon: "mdi-file-document-multiple",
    children: [
      {
        label: "保單管理",
        icon: "mdi-file-certificate",
        path: "/insurance/policies",
        permission: "policy.view"
      },
      {
        label: "核保作業",
        icon: "mdi-file-check",
        path: "/insurance/underwriting",
        permission: "underwriting.view"
      },
      {
        label: "批改作業",
        icon: "mdi-file-edit",
        path: "/insurance/endorsements",
        permission: "endorsement.view"
      }
    ]
  },
  {
    label: "理賠服務",
    icon: "mdi-shield-alert",
    children: [
      {
        label: "理賠案件",
        icon: "mdi-folder-alert",
        path: "/insurance/claims",
        permission: "claim.view"
      },
      {
        label: "理賠審核",
        icon: "mdi-gavel",
        path: "/insurance/claim-review",
        permission: "claim.review"
      }
    ]
  },
  {
    label: "客戶全貌",
    icon: "mdi-account-group",
    path: "/insurance/customers",
    permission: "customer.view"
  },
  {
    label: "商品工廠",
    icon: "mdi-package-variant-closed",
    path: "/insurance/products",
    permission: "product.view"
  },
  {
    label: "收費作業",
    icon: "mdi-cash-multiple",
    path: "/insurance/billing",
    permission: "billing.view"
  }
]
}

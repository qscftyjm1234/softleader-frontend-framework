export default {
  module: 'insurance',
  items: [
    {
      label: '保險總覽',
      icon: 'mdi-view-dashboard-variant',
      to: '/insurance/dashboard',
      permission: 'insurance.view'
    },
    {
      label: '保單行政',
      icon: 'mdi-file-document-multiple',
      children: [
        {
          label: '保單管理',
          icon: 'mdi-file-certificate',
          to: '/insurance/policies',
          permission: 'policy.view'
        },
        {
          label: '核保作業',
          icon: 'mdi-file-check',
          to: '/insurance/underwriting',
          permission: 'underwriting.view'
        },
        {
          label: '批改作業',
          icon: 'mdi-file-edit',
          to: '/insurance/endorsements',
          permission: 'endorsement.view'
        }
      ]
    },
    {
      label: '理賠服務',
      icon: 'mdi-shield-alert',
      children: [
        {
          label: '理賠案件',
          icon: 'mdi-folder-alert',
          to: '/insurance/claims',
          permission: 'claim.view'
        },
        {
          label: '理賠審核',
          icon: 'mdi-gavel',
          to: '/insurance/claim-review',
          permission: 'claim.review'
        }
      ]
    },
    {
      label: '客戶全貌',
      icon: 'mdi-account-group',
      to: '/insurance/customers',
      permission: 'customer.view'
    },
    {
      label: '商品工廠',
      icon: 'mdi-package-variant-closed',
      to: '/insurance/products',
      permission: 'product.view'
    },
    {
      label: '收費作業',
      icon: 'mdi-cash-multiple',
      to: '/insurance/billing',
      permission: 'billing.view'
    }
  ]
}

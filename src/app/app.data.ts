export const DOCUMENTATION_SIDEBAR = [
  {
    label: { text: 'Quickstart', icon: 'book', link: 'documentation/start' }
  },
  {
    label: { text: 'Modules', icon: 'cubes' },
    list: [
      {
        label: { text: 'Forms & Inputs'},
        list: [
          {
            label: { text: 'Checkbox', link: 'documentation/checkbox'}
          }
        ]
      },
      {
        label: { text: 'Grid & Layout'},
        list: [
          {
            label: { text: 'Column', link: 'documentation/column'}
          }
        ]
      },
      {
        label: { text: 'Elements'},
        list: [
          {
            label: { text: 'Button', link: 'documentation/button'}
          }
        ]
      }
    ]
  }
];


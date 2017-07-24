export const appSidebar = [
  {
    label: { text: 'Guide' },
    list: [
      {
        label: { text: 'Quickstart', link: 'quickstart'}
      }
    ]
  },
  {
    label: { text: 'Modules' },
    list: [
      {
        label: { text: 'Navigation' },
        list: [
          {
            label: { text: 'Sidebar', link: 'module/sidebar' }
          },
          {
            label: { text: 'Menu', link: 'module/menu' }
          },
          {
            label: { text: 'Tabs', link: 'module/tabs' }
          }
        ]
      },
      {
        label: { text: 'Grid' },
        list: [
          {
            label: { text: 'Column', link: 'module/column' }
          },
          {
            label: { text: 'Tile', link: 'module/Tile' }
          }
        ]
      },
      {
        label: { text: 'Notification & Panel' },
        list: [
          {
            label: { text: 'Modal', link: 'module/modal' }
          }
        ]
      }
    ]
  }
];

module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  base: '/notes/',
  themeConfig: {
    nav: [
      { text: 'External', link: 'https://google.com', target:'_self', rel:'' },
      { text: 'JavaScript', link: '/JavaScript/', target:'_self' },
      { text: 'guide', link: '/guide/', target:'_self' },
    ],
    sidebar: {
      displayAllHeaders: true // 默认值：false  显示所有页面的标题链接
    },
    lastUpdated: 'Last Updated'
  }	
}
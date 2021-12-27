module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  base: '/notes/',
  plugins: [
    ['vuepress-plugin-code-copy', {
        color: '#fff',
        // backgroundTransition: Boolean,
        // backgroundColor: String,
        // successText: String
    }],
    ['@vuepress/last-updated'],
    {
      transformer: (timestamp, lang) => {
        // 不要忘了安装 moment
        const moment = require('moment')
        moment.locale('zh-cn')
        return moment(timestamp).format('YYYY-MM-DD hh:mm:ss')
      }
    }
],
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
const { defaultTheme } = require('@vuepress/theme-default')
const navbar = require('./config/navbar')
const sidebar = require('./config/sidebar')
const path = require('path')

module.exports = {
  base: '/flame-cn/',
  lang: 'zh-CN',
  title: 'Flame引擎中文文档',
  description: 'Flame — 基于Flutter的2D游戏引擎',
  head: [['link', { rel: 'icon', href: '/images/favicon.png' }]],
  theme: defaultTheme({
    logo: '/images/logo.png',
    navbar: navbar,
    sidebar: sidebar,
    docsRepo: 'https://github.com/ilgnefz/flame-cn',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkText: '编辑此页',
    contributorsText: '贡献者',
    lastUpdatedText: '最后更新',
  })
}
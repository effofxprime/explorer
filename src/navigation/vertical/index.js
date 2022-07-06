import store from '@/store'
import { isTestnet } from '../../libs/utils'

const modules = [
  {
    scope: 'normal',
    title: 'summary',
    route: 'info',
  },
  {
    scope: 'normal',
    title: 'blocks',
    route: 'blocks',
  },
  {
    scope: 'normal',
    title: 'staking',
    route: 'staking',
  },
  {
    scope: 'normal',
    title: 'governance',
    route: 'governance',
    exclude: 'emoney',
  },
  {
    scope: 'normal',
    title: 'uptime',
    route: 'uptime',
  },
  {
    scope: 'normal',
    title: 'statesync',
    route: 'statesync',
  },
//  {
//    scope: 'cos-mos',
//    title: 'gravity',
//    route: 'gravity',
//  },
//  {
//    scope: 'osmosis',
//    title: 'trade',
//    route: 'osmosis-trade',
//  },
]

function processMenu() {
  const chainMenus = [
    {
      header: 'blockchains',
    },
  ]
  Object.keys(store.state.chains.config).forEach(chain => {
    const menu = {
      title: chain,
      icon: store.state.chains.config[chain].logo,
    }
    const { excludes } = store.state.chains.config[chain]
    const children = []
    modules.forEach(m => {
      if (excludes === undefined || excludes.indexOf(m.route) === -1) {
        if (m.scope.match('normal') || m.scope.match(chain)) {
          children.push({
          // header: `item-${chain}-${m.route}`,
            title: m.title,
            route: { name: m.route, params: { chain } },
          })
        }
      }
    })
    menu.children = children
    chainMenus.push(menu)
  })
  chainMenus.push({ header: 'DONATE' })
  chainMenus.push({
    title: 'Donation Addresses',
    href: 'https://explorer.erialos.me/coffee',
    icon: 'DollarSignIcon',
  })
  chainMenus.push({ header: 'Explorer' })
  if (isTestnet()) {
    chainMenus.push({
      title: 'Mainnet Explorer',
      href: 'https://explorer.erialos.me',
      icon: 'ChromeIcon',
    })
  } else {
    chainMenus.push({
      title: 'Testnet Explorer',
      href: 'https://testnet.explorer.erialos.me',
      icon: 'ChromeIcon',
    })
  }
  chainMenus.push({ header: 'LINKS' })
  chainMenus.push({
    title: 'Erialos.me',
    href: 'https://erialos.me',
    icon: 'ChromeIcon',
  })
  chainMenus.push({
    title: 'Erialos - Twitter',
    href: 'https://twitter.com/ErialosOfAstora',
    icon: 'TwitterIcon',
  })
  chainMenus.push({
    title: 'Erialos - Github Projects',
    href: 'https://github.com/effofxprime',
    icon: 'GithubIcon',
  })
  chainMenus.push({ header: 'DISCORD CHATS' })
  chainMenus.push({
    title: 'Vidulum',
    href: 'https://discord.gg/EuYCCSFUFR',
    icon: 'EyeIcon',
  })
  chainMenus.push({
    title: 'Beezee',
    href: 'https://discord.gg/yd4SGwRTHP',
    icon: 'EyeIcon',
  })
  chainMenus.push({
    title: 'PaceValiArmy',
    href: 'https://discord.gg/XdZMvUFXjF',
    icon: 'EyeIcon',
  })
  chainMenus.push({
    title: 'BTC Princess',
    href: 'https://discord.gg/VfDWX4Pw3a',
    icon: 'EyeIcon',
  })
  chainMenus.push({ header: 'POW MINING SERVERS' })
  chainMenus.push({
    title: 'Crypto 2Mars',
    href: 'https://discord.com/invite/2mars',
    icon: 'EyeIcon',
  })
  return chainMenus
}

export default processMenu()

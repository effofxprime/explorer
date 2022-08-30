import store from '@/store'
import { isTestnet } from '../../libs/utils'

<<<<<<< HEAD
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

=======
>>>>>>> master
function processMenu() {
  const chainMenus = []
  const blockchains = []
  Object.keys(store.state.chains.config).forEach(chain => {
    const menu = {
      title: chain,
      logo: store.state.chains.config[chain].logo,
      route: { name: 'dashboard', params: { chain } },
    }
    blockchains.push(menu)
  })
<<<<<<< HEAD
  chainMenus.push({ header: 'DONATE' })
  chainMenus.push({
    title: 'Donation Addresses',
    href: 'https://explorer.erialos.me/coffee',
    icon: 'DollarSignIcon',
  })
  chainMenus.push({ header: 'Explorer' })
=======

  if (blockchains.length > 1) {
    chainMenus.push({ header: 'ecosystem' })
    chainMenus.push({
      title: 'blockchains',
      children: blockchains,
      tag: `${blockchains.length}`,
      icon: 'https://ping.pub/logo.svg',
    })
  }
  chainMenus.push({ header: 'LINKS' })
>>>>>>> master
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
<<<<<<< HEAD
    title: 'Erialos.me',
    href: 'https://erialos.me',
    icon: 'ChromeIcon',
=======
    title: 'Github',
    href: 'https://github.com/ping-pub/explorer',
    icon: 'GithubIcon',
  })
  chainMenus.push({
    title: 'Discord',
    href: 'https://discord.gg/CmjYVSr6GW',
    icon: 'EyeIcon',
>>>>>>> master
  })
  chainMenus.push({
    title: 'Erialos - Twitter',
    href: 'https://twitter.com/ErialosOfAstora',
    icon: 'TwitterIcon',
  })
  chainMenus.push({
<<<<<<< HEAD
    title: 'Erialos - Github Projects',
    href: 'https://github.com/effofxprime',
    icon: 'GithubIcon',
=======
    title: 'Telegram',
    href: 'https://t.me/pingpub',
    icon: 'SendIcon',
>>>>>>> master
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
    href: 'https://discord.gg/X47AATjQFy',
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

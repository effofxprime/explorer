import store from '@/store'
import { isTestnet } from '../../libs/utils'

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

  if (blockchains.length > 1) {
    chainMenus.push({ header: 'ecosystem' })
    chainMenus.push({
      title: 'blockchains',
      children: blockchains,
      tag: `${blockchains.length}`,
      icon: 'https://explorer.erialos.me/logo.svg',
    })
  }
  chainMenus.push({ header: 'LINKS' })
  if (isTestnet()) {
    chainMenus.push({
      title: 'Mainnet Explorer',
      href: 'https://explorer.erialos.me',
      icon: 'ChromeIcon',
    })
  } else {
    chainMenus.push({
      title: 'Testnet Explorer',
      href: 'http://testnet.explorer.erialos.me',
      icon: 'LifeBuoyIcon',
    })
  }
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
    title: 'PaceValiArmy',
    href: 'https://discord.gg/X47AATjQFy',
    icon: 'EyeIcon',
  })
  chainMenus.push({
    title: 'BTC Princess',
    href: 'https://discord.gg/VfDWX4Pw3a',
    icon: 'EyeIcon',
  })
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
  chainMenus.push({ header: 'POW MINING SERVERS' })
  chainMenus.push({
    title: 'Crypto 2Mars',
    href: 'https://discord.com/invite/2mars',
    icon: 'EyeIcon',
  })
  return chainMenus
}

export default processMenu()

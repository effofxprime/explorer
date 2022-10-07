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
      icon: 'GlobeIcon',
    })
  } else {
    chainMenus.push({
      title: 'Testnet Explorer',
      href: 'http://testnet.explorer.erialos.me',
      icon: 'AlertCircleIcon',
    })
  }
  chainMenus.push({
    title: 'Erialos.me',
    href: 'https://erialos.me',
    icon: 'GlobeIcon',
  })
  chainMenus.push({
    title: 'Erialos - Discord *Soon*',
    href: '',
    icon: 'MessageSquareIcon',
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
    icon: 'MessageSquareIcon',
  })
  chainMenus.push({
    title: 'BTC Princess',
    href: 'https://discord.gg/VfDWX4Pw3a',
    icon: 'MessageSquareIcon',
  })

  return chainMenus
}

export default processMenu()

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
      icon: 'https://explorer.thesilverfox.pro/logo.svg',
    })
  }
  chainMenus.push({ header: 'sponsors' })
  chainMenus.push({
    title: 'Becole',
    href: 'https://becole.com',
    logo: 'https://becole.com/static/logo/logo_becole.png',
  })
  chainMenus.push({
    title: 'Osmosis',
    href: 'https://app.osmosis.zone',
    logo: 'https://ping.pub/logos/osmosis.jpg',
  })
  chainMenus.push({ header: 'LINKS' })
  if (isTestnet()) {
    chainMenus.push({
      title: 'Mainnet Explorer',
      href: 'https://explorer.thesilverfox.pro',
      icon: 'GlobeIcon',
    })
  } else {
    chainMenus.push({
      title: 'Testnet Explorer',
      href: 'https://testnet.explorer.thesilverfox.pro',
      icon: 'AlertCircleIcon',
    })
  }
  chainMenus.push({
    title: 'The Silver Fox',
    href: 'https://thesilverfox.pro',
    icon: 'GlobeIcon',
  })
  chainMenus.push({
    title: 'The Silver Foxes - Discord *Soon*',
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
    title: 'Pace Vali Army',
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

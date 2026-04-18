import { contactLinks } from './site.config'

export const web3Content = {
  hero: {
    address: '0xRafif...Alton',
    tagline: 'Building on Lisk. Community-first. On-chain by default.',
    status: 'ONLINE — Draft portfolio signal live',
    ctas: [
      { label: 'Initiate Connection', href: contactLinks.github },
      { label: 'View Research Trail', href: contactLinks.linkedin },
    ],
  },
  about: {
    title: '// about.md',
    body: [
      'Developer dan researcher yang ingin menempatkan Web3 sebagai sistem yang bisa dipahami, bukan hanya di-hype. Fokus utamanya ada pada komunitas, mekanisme DeFi, dan pengalaman pengguna yang terasa native bagi orang yang benar-benar hidup di ekosistem ini.',
      'Versi awal portofolio ini sengaja memakai draft content yang konservatif. Nantinya section ini bisa diganti dengan riwayat on-chain, eksperimen protokol, dan kontribusi komunitas yang sudah terverifikasi.',
    ],
    stats: [
      { label: 'Focus', value: 'Lisk + DeFi + Community' },
      { label: 'Mode', value: 'Research / Frontend / Systems' },
      { label: 'Signal', value: 'Draft lens ready for real case studies' },
    ],
  },
  projects: [
    {
      name: 'Community Liquidity Dashboard',
      network: 'Lisk',
      status: 'Draft Placeholder',
      description: 'Reserved slot for a future case study on turning community metrics into an on-chain style control room.',
      link: '#contact',
    },
    {
      name: 'Governance Notes Archive',
      network: 'Cross-chain',
      status: 'Research Track',
      description: 'A place for documenting governance mechanics, token incentive observations, and sharper protocol commentary.',
      link: '#contact',
    },
    {
      name: 'Wallet Onboarding Flow',
      network: 'Ethereum / L2',
      status: 'Concept',
      description: 'A UX-focused placeholder for onboarding people into Web3 without forcing them to decode the jargon first.',
      link: '#contact',
    },
  ],
  transactionFeed: [
    '[QUEUE] Lisk ecosystem notes indexed — 2d ago',
    '[DRAFT] Community incentive thesis updated — 5d ago',
    '[REVIEW] Wallet UX friction audit captured — 9d ago',
    '[MAP] Research topics connected to DeFi mechanics — 12d ago',
  ],
  skills: {
    blockchain: [
      { name: 'Solidity', gas: 'Medium' },
      { name: 'Lisk', gas: 'Medium' },
      { name: 'Ethers.js', gas: 'Low' },
    ],
    frontend: [
      { name: 'React', gas: 'Low' },
      { name: 'Next.js', gas: 'Medium' },
      { name: 'Tailwind CSS', gas: 'Low' },
    ],
    tools: [
      { name: 'Hardhat', gas: 'Medium' },
      { name: 'Foundry', gas: 'High' },
      { name: 'The Graph', gas: 'High' },
    ],
  },
  contact: {
    title: '// initiate_transaction.sol',
    intro: 'No wallet pop-up here. For v1, connection paths stay simple and direct.',
    actions: [
      { label: 'to: github', href: contactLinks.github },
      { label: 'to: linkedin', href: contactLinks.linkedin },
      { label: 'to: email', href: contactLinks.email },
    ],
  },
}

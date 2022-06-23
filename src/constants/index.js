export const listBooths = (i18n) => [
  {
    title: 'Milky Way Booths',
    img: 'milkyway/milky-way.jpg',
    listImgSlide: [
      'milkyway/milky-way.jpg',
      'milkyway/topview.jpg',
      'milkyway/6x12(16-6).jpg',
      'milkyway/6x12(17-6).jpg',
      'milkyway/6x12(17-6)-1.jpg',
      'milkyway/6x12(17-6)-2.jpg',
      'milkyway/fronview.jpg',
      'milkyway/1.jpg',
    ],
    info: [
      {
        name: i18n.t('booth.quantity'),
        value: 2,
      },
      {
        name: 'Booth 0',
        value: '6x12m',
      },
      {
        name: i18n.t('booth.backage'),
        value: i18n.t('booth.valueOfBackage'),
        style: 'break',
      },
      {
        name: i18n.t('booth.specialOffer'),
        value: i18n.t('booth.valueOfOffer'),
        style: 'break',
      },
    ],
  },
  {
    title: 'Galaxy Booths',
    img: 'galaxysun/galaxy.jpg',
    listImgSlide: [
      'galaxysun/galaxy.jpg',
      'galaxysun/topview.jpg',
      'galaxysun/6X6(16-6).jpg',
      'galaxysun/6x6 (17-6).jpg',
      'galaxysun/6x6 (17-6)-1.jpg',
      'galaxysun/frontview.jpg',
      'galaxysun/topview.jpg',
    ],
    info: [
      {
        name: i18n.t('booth.quantity'),
        value: 5,
      },
      {
        name: 'Booth 0',
        value: '6x6m',
      },
      {
        name: i18n.t('booth.backage2'),
        value: i18n.t('booth.valueOfBackage2'),
        style: 'break',
      },
      {
        name: i18n.t('booth.specialOffer'),
        value: i18n.t('booth.valueOfOffer2'),
        style: 'break',
      },
    ],
  },
  {
    title: 'Sun Booths',
    img: 'galaxysun/sun.jpg',
    listImgSlide: [
      'galaxysun/sun.jpg',
      'galaxysun/1.jpg',
      'galaxysun/6X6(16-6).jpg',
      'galaxysun/6x6 (17-6).jpg',
      'galaxysun/6x6 (17-6)-1.jpg',
      'galaxysun/frontview.jpg',
      'galaxysun/topview.jpg',
    ],
    info: [
      {
        name: i18n.t('booth.quantity'),
        value: 6,
      },
      {
        name: 'Booth 0',
        value: '6x6m',
      },
      {
        name: i18n.t('booth.eventPackage'),
        value: i18n.t('booth.silver'),
      },
      {
        name: i18n.t('booth.livestreamPackage'),
        value: i18n.t('booth.gold'),
      },
      {
        name: i18n.t('booth.socialPackage'),
        value: i18n.t('booth.silver'),
      },
      {
        name: i18n.t('booth.mediaPackage'),
        value: i18n.t('booth.silver'),
      },
    ],
  },
  {
    title: 'Moon Booths',
    img: 'moon/moon.jpg',
    listImgSlide: [
      'moon/moon.jpg',
      'moon/1.jpg',
      'moon/2.jpg',
      'moon/3x6(16-6).jpg',
      'moon/3x6(17-6).jpg',
      'moon/3x6(17-6)-1.jpg',
      'moon/frontview.jpg',
      'moon/topview.jpg',
    ],
    info: [
      {
        name: i18n.t('booth.quantity'),
        value: 20,
      },
      {
        name: 'Booth 0',
        value: '6x3m',
      },
      {
        name: i18n.t('booth.eventPackage'),
        value: i18n.t('booth.bronze'),
      },
      {
        name: i18n.t('booth.livestreamPackage'),
        value: i18n.t('booth.silver'),
      },
      {
        name: i18n.t('booth.socialPackage'),
        value: i18n.t('booth.silver'),
      },
      {
        name: i18n.t('booth.mediaPackage'),
        value: i18n.t('booth.silver'),
      },
    ],
  },
  {
    title: 'Earth Booths',
    img: 'earth/earth.jpg',
    listImgSlide: [
      'earth/earth.jpg',
      'earth/1.jpg',
      'earth/2.jpg',
      'earth/3x4(16-6).jpg',
      'earth/frontview(1).jpg',
      'earth/frontview.jpg',
      'earth/topview.jpg',
    ],
    info: [
      {
        name: i18n.t('booth.quantity'),
        value: 70,
      },
      {
        name: 'Booth 3',
        value: '3x3m',
      },
      {
        name: i18n.t('booth.eventPackage'),
        value: i18n.t('booth.standard'),
      },
      {
        name: i18n.t('booth.livestreamPackage'),
        value: i18n.t('booth.bronze'),
      },
      {
        name: i18n.t('booth.socialPackage'),
        value: i18n.t('booth.silver'),
      },
      {
        name: i18n.t('booth.mediaPackage'),
        value: i18n.t('booth.silver'),
      },
    ],
  },
  {
    title: 'Starship Booths',
    img: 'startship/startship.jpg',
    listImgSlide: [
      'startship/startship.jpg, startship/(13-6-2022).jpg',
      'startship/f_b(13-6-2022).jpeg',
      'startship/f_b(13-6-2022)-1.jpeg',
    ],
    info: [
      {
        name: i18n.t('booth.quantity'),
        value: 6,
      },
      {
        name: 'F&B Booth',
        value: '3x5m',
      },
      {
        name: i18n.t('booth.eventPackage'),
        value: i18n.t('booth.standard'),
      },
    ],
  },
]

export const listMenu = (i18n) => [
  {
    name: i18n.t('menuHome'),
    path: `/${i18n.activeLocale}`,
  },
  {
    name: i18n.t('menuPartner'),
    path: `/${i18n.activeLocale}/partner`,
  },
  {
    name: i18n.t('menuCommunity'),
    path: `/${i18n.activeLocale}/community`,
  },
]

export const listItemHomeAdmin = [
  {
    title: 'Setting homepage',
    hrefTitle: '/admin/home-edit',
  },
  {
    title: 'Banner',
    hrefTitle: '/admin/banner',
  },
  {
    title: "Event's Visual",
    hrefTitle: '/admin/images',
    subTitle: 'Create',
    hrefSubTitle: '/admin/images/create',
  },
  {
    title: 'Media Sponsors',
    hrefTitle: '/admin/partners',
    subTitle: 'Create',
    hrefSubTitle: '/admin/partners/create',
  },
  {
    title: 'Sponsors',
    hrefTitle: '/admin/nha-tai-tro',
    subTitle: 'Create',
    hrefSubTitle: '/admin/nha-tai-tro/create',
  },
  {
    title: 'Post',
    hrefTitle: '/admin/post',
    subTitle: 'Create',
    hrefSubTitle: '/admin/post/create',
  },
  {
    title: 'Video',
    hrefTitle: '/admin/video',
    subTitle: 'Create',
    hrefSubTitle: '/admin/video/create',
  },
  {
    title: 'Advisory',
    hrefTitle: '/admin/advisory',
    subTitle: 'Create',
    hrefSubTitle: '/admin/advisory/create',
  },
  {
    title: 'Map',
    hrefTitle: '/admin/map',
  },
]

export const STT_COR = {
  1: 5,
  2: 8,
  3: 12,
}

export const mapList = (i18n) => [
  {
    x: 860,
    y: 820,
    content: {
      text: i18n.t('map.1'),
      x: 800,
      y: 860,
    },
    stt: 1,
  },
  {
    x: 990,
    y: 820,
    content: {
      text: 'Photobooth',
      x: 950,
      y: 860,
    },
    stt: 2,
  },
  {
    x: 730,
    y: 820,
    content: {
      text: i18n.t('map.3'),
      x: 700,
      y: 860,
    },
    stt: 3,
  },
  {
    x: 659,
    y: 550,
    content: {
      text: i18n.t('map.4'),
      x: 609,
      y: 590,
    },
    stt: 4,
  },
  {
    x: 748,
    y: 625,
    content: {
      text: i18n.t('map.5'),
      x: 698,
      y: 665,
    },
    stt: 5,
  },
  {
    x: 871,
    y: 575,
    content: {
      text: i18n.t('map.6'),
      x: 821,
      y: 615,
    },
    stt: 6,
  },
  {
    x: 244,
    y: 267,
    content: {
      text: i18n.t('map.7'),
      x: 20,
      y: 277,
    },
    stt: 7,
  },
  {
    x: 980,
    y: 135,
    content: {
      text: i18n.t('map.8'),
      x: 930,
      y: 105,
    },
    stt: 8,
  },
  {
    x: 523,
    y: 360,
    content: {
      text: i18n.t('map.9'),
      x: 503,
      y: 400,
    },
    stt: 9,
  },
  {
    x: 960,
    y: 360,
    content: {
      text: i18n.t('map.9'),
      x: 800,
      y: 400,
    },
    stt: 9,
  },
  {
    x: 550,
    y: 290,
    content: {
      text: i18n.t('map.10a'),
      x: 500,
      y: 330,
    },
    stt: '10a',
  },
  {
    x: 885,
    y: 290,
    content: {
      text: 'Booth YGGSea(6x10)',
      x: 815,
      y: 330,
    },
    stt: '10b',
  },
  {
    x: 660,
    y: 240,
    content: {
      text: 'Booth Binance(8x12)',
      x: 610,
      y: 295,
    },
    stt: 11,
  },
  {
    x: 234,
    y: 610,
    content: {
      text: i18n.t('map.12'),
      x: 220,
      y: 580,
    },
    stt: 12,
  },
  {
    x: 510,
    y: 595,
    content: {
      text: i18n.t('map.13'),
      x: 460,
      y: 635,
    },
    stt: 13,
  },
  {
    x: 550,
    y: 663,
    content: {
      text: i18n.t('map.14'),
      x: 400,
      y: 703,
    },
    stt: 14,
  },
  {
    x: 840,
    y: 663,
    content: {
      text: i18n.t('map.14'),
      x: 700,
      y: 703,
    },
    stt: 14,
  },
  {
    x: 380,
    y: 640,
    content: {
      text: i18n.t('map.14'),
      x: 250,
      y: 720,
    },
    stt: 14,
  },
  {
    x: 830,
    y: 470,
    content: {
      text: i18n.t('map.15'),
      x: 780,
      y: 510,
    },
    stt: 15,
  },
  {
    x: 1050,
    y: 560,
    content: {
      text: i18n.t('map.16'),
      x: 1000,
      y: 600,
    },
    stt: 16,
  },
  {
    x: 1000,
    y: 640,
    content: {
      text: i18n.t('map.17'),
      x: 950,
      y: 680,
    },
    stt: 17,
  },
]

export const listProjects = (i18n) => [
  {
    name: 'my-defi-pet',
    content: i18n.t('list.contentDefiPet'),
  },
  {
    name: 'only-sport',
    content: i18n.t('list.contentOnlySport'),
  },
  {
    name: 'space-crypto',
    content: i18n.t('list.contentSpaceCrypto'),
  },
  {
    name: 'thetan',
    content: i18n.t('list.contentThetan'),
  },
  {
    name: '9d-nft',
    content: i18n.t('list.content9dNft'),
  },
]

export const listSponsor = [
  'binance.png',
  'bsc.png',
  'coinex.png',
  'xtcom.png',
  'gosu.png',
  'realbox.png',
  'ez-chain.png',
  'logo-stech.png',
  'vndt.png',
]

export const lINK_STATUS_LIST = [
  {
    name: 'Có',
    value: true,
  },
  {
    name: 'Không',
    value: false,
  },
]

export const HOME_DESCRIPTION_TYPE = {
  BLOCK1: 'BLOCK1',
  BLOCK2: 'BLOCK2',
  BLOCK3: 'BLOCK3',
  BLOCK4: 'BLOCK4',
}

export const MAIN_VIDEO_OPTION = [
  {
    name: 'Có',
    value: true,
  },
  {
    name: 'Không',
    value: false,
  },
]

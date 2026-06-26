import badgeImg      from '../assets/imgs/level2/badge.png';
import keyImg        from '../assets/imgs/level2/key.png';
import flashlightImg from '../assets/imgs/level2/flashlight.png';
import clothImg      from '../assets/imgs/level2/cloth.png';
import ropeImg       from '../assets/imgs/level2/rope.png';
import watchImg      from '../assets/imgs/level2/watch.png';
import envelopeImg   from '../assets/imgs/level2/envelope.png';
import coinImg       from '../assets/imgs/level2/coin.png';
import fingerprintImg  from '../assets/imgs/level4/fingerprint.png';
import cigaretteImg    from '../assets/imgs/level4/cigarette.png';
import glassesImg      from '../assets/imgs/level4/glasses.png';
import bulletImg       from '../assets/imgs/level4/bullet.png';
import tornPhotoImg    from '../assets/imgs/level4/tornPhoto.png';
import newspaperImg    from '../assets/imgs/level4/newspaper.png';
import redThreadImg    from '../assets/imgs/level4/redThread.png';
import candleImg       from '../assets/imgs/level4/candle.png';
import mapImg          from '../assets/imgs/endless/map.png';
import compassImg      from '../assets/imgs/endless/compass.png';
import lockpickImg     from '../assets/imgs/endless/lockpick.png';
import tapeImg         from '../assets/imgs/endless/tape.png';
import magnifierImg    from '../assets/imgs/endless/magnifier.png';
import knifeImg        from '../assets/imgs/endless/knife.png';
import inkImg          from '../assets/imgs/endless/ink.png';
import parchmentImg    from '../assets/imgs/endless/parchment.png';

export const level2Items = [
  { id: 'badge', img: badgeImg, label: 'Badge', top: '72%', left: '18%', width: '80px'  },
  { id: 'key', img: keyImg, label: 'Key', top: '68%', left: '44%', width: '90px'  },
  { id: 'flashlight', img: flashlightImg, label: 'Flashlight', top: '74%', left: '68%', width: '80px'  },
  { id: 'cloth', img: clothImg, label: 'Cloth', top: '60%', left: '78%', width: '100px' },
  { id: 'rope', img: ropeImg, label: 'Rope', top: '65%', left: '5%',  width: '90px'  },
  { id: 'watch', img: watchImg, label: 'Watch', top: '52%', left: '32%', width: '85px'  },
  { id: 'envelope', img: envelopeImg, label: 'Envelope', top: '58%', left: '55%', width: '80px'  },
  { id: 'coin', img: coinImg, label: 'Coin', top: '76%', left: '35%', width: '60px'  },
];

export const level4Items = [
  { id: 'fingerprint', img: fingerprintImg, label: 'Fingerprint', top: '65%', left: '15%', width: '80px'  },
  { id: 'cigarette', img: cigaretteImg, label: 'Cigarette', top: '70%', left: '40%', width: '90px'  },
  { id: 'glasses', img: glassesImg, label: 'Glasses', top: '55%', left: '65%', width: '85px'  },
  { id: 'bullet', img: bulletImg, label: 'Bullet', top: '75%', left: '25%', width: '60px'  },
  { id: 'tornPhoto', img: tornPhotoImg, label: 'Torn Photo', top: '60%', left: '80%', width: '80px'  },
  { id: 'newspaper', img: newspaperImg, label: 'Newspaper', top: '68%', left: '55%', width: '100px' },
  { id: 'redThread', img: redThreadImg, label: 'Red Thread', top: '72%', left: '8%',  width: '90px'  },
  { id: 'candle', img: candleImg, label: 'Candle', top: '50%', left: '45%', width: '70px'  },
];

export const endlessItemsPool = [
  ...level2Items,
  ...level4Items,
  { id: 'map', img: mapImg, label: 'Map', top: '62%', left: '20%', width: '90px'  },
  { id: 'compass', img: compassImg, label: 'Compass', top: '70%', left: '50%', width: '75px'  },
  { id: 'lockpick', img: lockpickImg, label: 'Lockpick', top: '75%', left: '70%', width: '70px'  },
  { id: 'tape', img: tapeImg, label: 'Tape', top: '55%', left: '35%', width: '80px'  },
  { id: 'magnifier', img: magnifierImg, label: 'Magnifier',  top: '65%', left: '60%', width: '85px'  },
  { id: 'knife', img: knifeImg, label: 'Knife', top: '72%', left: '10%', width: '80px'  },
  { id: 'ink', img: inkImg, label: 'Ink', top: '58%', left: '75%', width: '70px'  },
  { id: 'parchment', img: parchmentImg, label: 'Parchment', top: '68%', left: '42%', width: '90px'  },
];

export const pickRandom8 = () =>
  [...endlessItemsPool]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);
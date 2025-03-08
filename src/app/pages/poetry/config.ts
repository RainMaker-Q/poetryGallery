export const PoetryImage: Record<string, string> = {
  main: 'http://img.qingsweetdays.top/ssby_main.webp',
  img1: 'http://img.qingsweetdays.top/ssby1.webp',
  img2: 'http://img.qingsweetdays.top/ssby2.webp',
  img3: 'http://img.qingsweetdays.top/ssby3.jpeg',
  img4: 'http://img.qingsweetdays.top/ssby4.jpeg',
  img5: 'http://img.qingsweetdays.top/ssby5.jpeg',
  img6: 'http://img.qingsweetdays.top/ssby6.jpeg',
  img7: 'http://img.qingsweetdays.top/ssby7.jpeg',
} 

export const PoetryDetailPageImageList = Object.keys(PoetryImage).filter(item => item!=='main').map(key => PoetryImage[key])
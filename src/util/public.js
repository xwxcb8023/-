// 静态资源路径
import {topPath} from '@/util/staticPath'
/**
 * 获取滚动条到达顶部的距离
* */
const getScrollTop = ()=>{
  let scrollPos;
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset; }
  else if (document.compatMode && document.compatMode != 'BackCompat')
  { scrollPos = document.documentElement.scrollTop; }
  else if (document.body) { scrollPos = document.body.scrollTop; }
  return scrollPos;
}
/**
 * 头部导航菜单的状态
 * haveBanner 有banner页的头部状态
 * notBanner 没有banner页的头部状态
* */
const topStatus = {
  haveBanner:{
    logo : topPath.logo1,
    topbgStatus : 'topDefault',
    menuStatus : 'default',
    inputStatus : 'inputDefault1',
    item : 'itemDefault'
  },
  notBanner:{
    logo : topPath.logo2,
    topbgStatus : 'topDistance',
    menuStatus : 'topDis',
    inputStatus : 'inputDefault2',
    item : 'itemDis'
  }
}
/**
 * 进入全屏模式
 * element 需要全屏的元素
 * */
const fullScreen = (element) => {
  if(element.requestFullscreen){
    element.requestFullscreen();
  }else if(element.mozRequestFullScreen){
    element.mozRequestFullScreen();
  }else if(element.msRequestFullscreen){
    element.msRequestFullscreen();
  }else if(element.oRequestFullscreen){
    element.oRequestFullscreen();
  }else if(element.webkitRequestFullscreen){
    element.webkitRequestFullscreen();
  }else {
    let docHtml = document.documentElement;
    let docBody = document.body;
    //element = document.getElementById('video');
    let cssText = 'width:100%;height:100%;overflow:hidden;';
    docHtml.style.cssText = cssText;
    docBody.style.cssText = cssText;
    element.style.cssText = cssText+';'+'margin:0px;padding:0px;';
    document.IsFullScreen = true;
  }
}
/**
 * 退出全屏模式
 * element 需要退出全屏的元素
 * */
const exitFullScreen = element => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.oRequestFullscreen){
    document.oCancelFullScreen();
  }else if (document.webkitExitFullscreen){
    document.webkitExitFullscreen();
  }else{
    let docHtml = document.documentElement;
    let docBody = document.body;
    docHtml.style.cssText = "";
    docBody.style.cssText = "";
    element.style.cssText = "";
    document.IsFullScreen = false;
  }
}
/**
 * A是要查找元素所在的数组，x要查找的元素
 * 返回要查找的元素在数组中的下标
* */
const bsearch = (A,x) => {
  let l = 0,  //查找的起始位置
    r = A.length - 1, //查找的结束位置
    guess;  //猜测的位置
  while(l <= r){
    guess = Math.floor( (l + r) / 2)
    // 循环不变式, guess 等于l,r 中间位置, l 查找范围左，r 查找范围右
    if(A[guess] === x) return guess
    else if(A[guess] > x) r = guess - 1
    else l = guess + 1
    // 循环不变式, l 查找范围左，r 查找范围右
  }
  return -1
}
/**
 * 压缩图片的base64
 * base64 需要压缩的base64文件
 * w 要压缩成的默认宽度（宽高等比压缩）
 * callback 回调函数
* */
const compressPicture = (base64,w,callback)=>{
  let newImage = new Image();
  let quality = 0.6;    //压缩系数0-1之间
  newImage.src = base64;
  newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
  let imgWidth, imgHeight;
  newImage.onload = function () {
    imgWidth = this.width;
    imgHeight = this.height;
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w;
        canvas.height = w * imgHeight / imgWidth;
      } else {
        canvas.height = w;
        canvas.width = w * imgWidth / imgHeight;
      }
    } else {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      quality = 0.6;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    let base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
    // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
    // while (base64.length / 1024 > 150) {
    // 	quality -= 0.01;
    // 	base64 = canvas.toDataURL("image/jpeg", quality);
    // }
    // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
    // while (base64.length / 1024 < 50) {
    // 	quality += 0.001;
    // 	base64 = canvas.toDataURL("image/jpeg", quality);
    // }
    callback(base64);//必须通过回调函数返回，否则无法及时拿到该值
  }
}

/**
 * 正则匹配img标签并替换src值
 * content要匹配的字符串
 * capture 获取到的src值
 * callback 回调函数
* */
const replaceImgSrc = (content,callback) =>{
    return content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi,(match, capture)=>{
       compress(capture,500,0.5).then(res=>{

       })
       //String =  '<img src="'+str+'"/>';
       //return '<img src="'+callback(capture)+'"/>';
    })
}
/**
 * @param base64String 压缩图片
 * @param w 压缩的宽度大小
 * @param quality 压缩比例
 **/
const compress = (base64String, w, quality) => {
  let b = ''
  let getMimeType = function (urlData) {
    let arr = urlData.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    // return mime.replace("image/", "");
    return mime;
  };
  let newImage = new Image();
  let imgWidth, imgHeight;

  let promise = new Promise(resolve => newImage.onload = resolve);
  newImage.src = base64String;
  return promise.then(() => {
    imgWidth = newImage.width;
    imgHeight = newImage.height;
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w;
        canvas.height = w * imgHeight / imgWidth;
      } else {
        canvas.height = w;
        canvas.width = w * imgWidth / imgHeight;
      }
    } else {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
    let base64 = canvas.toDataURL(getMimeType(base64String), quality);
    return base64;
  })
}
/**生成随机字符**/
const randomNumber = () => {
  let text = '1234567890abcdefjhijklinopqrsduvwxyz';
  let arr = [];
  for(let i = 0;i < text.length;i++){
    if(!arr.includes(text[i])){
      arr.push(text[i])
    }
  }
  let one = parseInt(Math.random() * (32 - 0) + 0)
  let two = parseInt(Math.random() * (32 - 0) + 0);
  let three = parseInt(Math.random() * (32 - 0) + 0);
  let four = parseInt(Math.random() * (32 - 0) + 0);
  let res = arr[one]+arr[two]+arr[three]+arr[four];
  return res;
}


export {
  getScrollTop,
  topStatus,
  fullScreen,
  exitFullScreen,
  bsearch,
  compressPicture,
  replaceImgSrc,
  compress,
  randomNumber
}

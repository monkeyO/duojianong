//$(function () {
//  var cloud1 = $('.img-wrapper .cloud1');
//  var cloud2 = $('.img-wrapper .cloud2');
//  var cloud3 = $('.img-wrapper .cloud3');
//  var cloud4 = $('.img-wrapper .cloud4');
//  var cloud5 = $('.img-wrapper .cloud5');
//  var cloud6 = $('.img-wrapper .cloud6');
//  
//  var left1 = cloud1.position().left;
//  var left2 = cloud2.position().left;
//  var left3 = cloud3.position().left;
//  var left4 = cloud4.position().left;
//  var left5 = cloud5.position().left;
//  var left6 = cloud6.position().left;
//
//  /* 鐧戒簯鐨勭Щ鍔�*/
//  cloudMove(cloud1, left1, 60);
//  cloudMove(cloud2, left2, 180);
//  cloudMove(cloud3, left3, 100);
//  cloudMove(cloud4, left4, 220);
//  cloudMove(cloud5, left5, 140);
//  cloudMove(cloud6, left6, 30);
//  function cloudMove(cloud, left, time) {
//      setInterval(function () {
//          left--;
//          if (left < -cloud.innerWidth()){
//              left = $(window).innerWidth();
//          }
//          cloud.css('left', left + 'px');
//      }, time);
//  }
//})
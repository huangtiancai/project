$(function(){
			//获取每张图片的宽度
				var imgWidth = $(".c_can").find("img").width();
				var imgIndex = 1;//一开始下标是取1，不是0
			//初始化Banner图,首尾添加两张
			function initBanner(){
				var ul = $(".c_can").find("ul");
				var first = ul.children().first().clone(); //克隆第一张图片
				var last = ul.children().last().clone(); //克隆最后一张图片
				ul.prepend(last);
				ul.append(first);
				
				$(".c_can").css({"marginLeft":-imgWidth}); //一开始就是第二张图片
			}
			initBanner();

			var len = $(".c_can ul").children().length; //拿到初始化后的图片个数

			//控制banner图的两个耳朵的出现和隐藏
			$(".c_last").hover(function(){
				$(this).css({backgroundPosition:"0 0"});
			},function(){
				$(this).css({backgroundPosition:"-84px 50%"});
			});
			$(".c_next").hover(function(){
				$(this).css({backgroundPosition:"-208px 0"});
			},function(){
				$(this).css({backgroundPosition:"-125px 50%"});
			});

			$(".c_bta").click(function(){
				imgIndex = $(this).parents(".b_cir").index() + 1;
				$(this).addClass("btnSelect").parents(".b_cir").siblings().find(".c_bta").removeClass("btnSelect");//因为c_bta没有兄弟姐妹，只有他的父母有兄弟姐妹，通过他父母的兄弟姐妹找到c_bta，一次移除其他兄弟姐妹的样式
				$(".c_can").animate({"marginLeft":-imgIndex*imgWidth});
			});

			//设置自动播放banner图
			var BannerTime = null;
			function autoPlay(){
				BannerTime = setInterval(function(){
					$(".c_next").trigger("click");
				},3000);
			}
			autoPlay();//一开始设置自动播放轮播图

			$(".c_can").mouseover(function(){
				clearInterval(BannerTime);
			}).mouseout(function(){
				autoPlay();
			});

			var nowTime = 0;
			//当点击左耳朵
			$(".c_last").click(function(){
				if(new Date() - nowTime > 500){
					nowTime = new Date();
					var tindex = (imgIndex == 0) ? 0 : --imgIndex;
					changeBanner(tindex);
				}
			});
			//当点击右耳朵
			$(".c_next").click(function(){
				if(new Date() - nowTime > 500){
					nowTime = new Date();
					var tindex = (imgIndex == len) ? len : ++imgIndex;
					changeBanner(tindex);
				}
			});

			//点击左右耳朵的方法
			function changeBanner($index){
				$(".c_bta").eq($index-1).addClass("btnSelect").parents(".b_cir").siblings().find(".c_bta").removeClass("btnSelect");
				$(".c_can").stop(true, true).animate({"marginLeft":-imgWidth*$index},function(){
					if($index == 0){ //判断回到最后一张图片
						$(".c_can").css({"marginLeft":-imgWidth*(len - 2)});//所有图片回到最终状态
						$(".c_bta").eq(imgIndex-1).addClass("btnSelect").parents(".b_cir").siblings().find(".c_bta").removeClass("btnSelect");
						imgIndex = len - 2;
					}else if($index >= len - 1){ //判断回到第一张图片
						$(".c_can").css({"marginLeft":-imgWidth});//所有图片回到最初状态
						$(".c_bta").eq(0).addClass("btnSelect").parents(".b_cir").siblings().find(".c_bta").removeClass("btnSelect");
						imgIndex = 1;
					}
				});
			}
		});
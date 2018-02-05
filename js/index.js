window.onload = function() {
	var start = document.getElementsByClassName("start")[0]
	start.onclick = function() {
		this.style.display = "none";
		Game.init() //游戏初始化
	}
}
var Game = {
	enemy: { //创建敌人数据
		em1: {
			style: "enemy1",
			hp: "1",
			score: "1",
			speed: 10
		},
		em2: {
			style: "enemy2",
			hp: "2",
			score: "3",
			speed: 20
		},
		em3: {
			style: "enemy3",
			hp: "3",
			score: "5",
			speed: 30
		}
	},
	checkpoint: [{ //创建数据
			data: ["em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1"],
			iNum: 10,
			speedX: 10,
			speedY: 10,
			timer: 2500
		},
		{
			data: ["em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1"],
			iNum: 10,
			speedX: 10,
			speedY: 10,
			timer: 2000
		},
		{
			data: ["em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1"],
			iNum: 10,
			speedX: 10,
			speedY: 20,
			timer: 1000
		}
	],
	airData: { //飞机数据
		air1: {
			style: "air",
			speed: 10,
			bullet: "bullet"
		}
	},
	level: 0,
	maxLevel: 3,
	init: function() { //初始化数据
		this.createScore();
		this.createEnemy(this.checkpoint[this.level]);
		this.createAir();
		this.level++;
	},
	createScore: function() { //创建积分
		var oDiv = document.createElement("div");
		var oBox = document.getElementsByClassName("box")[0];
		this.oBox = oBox;
		oDiv.className = "score";
		oDiv.innerHTML = "积分：<span>0</span>";
		oBox.appendChild(oDiv);
		var oSpan = oDiv.getElementsByTagName("span")[0];
		this.oSpan = oSpan;
	},
	createEnemy: function(checkpoint) { //创建敌人
		var data = checkpoint.data;
		var arr = [];
		var that = this;
		var oUl = document.createElement("ul");
		oUl.style.width = 40 * checkpoint.iNum + "px";
		oUl.className = "honeycomb";
		this.oUl = oUl;
		this.oBox.appendChild(oUl);
		oUl.style.left = (this.oBox.offsetWidth - oUl.offsetWidth) / 2 + "px";
		for(var i = 0; i < data.length; i++) {
			var oLi = document.createElement("li");
			oLi.className = this.enemy[data[i]].style;
			oLi.hp = this.enemy[data[i]].hp;
			oLi.score = this.enemy[data[i]].score;
			oLi.speed = this.enemy[data[i]].speed;
			oUl.appendChild(oLi);
		}
		var oLi = oUl.getElementsByTagName("li");
		this.oLi = oLi;
		for(var j = 0; j < oLi.length; j++) {
			arr.push([oLi[j].offsetLeft, oLi[j].offsetTop])
		}
		for(var k = 0; k < oLi.length; k++) {
			oLi[k].style.position = "absolute";
			oLi[k].style.left = arr[k][0] + "px";
			oLi[k].style.top = arr[k][1] + "px";
		}
		this.enemyMove(checkpoint);
		setInterval(function() {
			that.random();
		}, checkpoint.timer)

	},
	enemyMove: function(checkpoint) { //敌人移动
		var that = this;
		that.oUl.timer = null;
		var l = 0;
		var r = this.oBox.offsetWidth - this.oUl.offsetWidth;
		that.oUl.timer = setInterval(move, 200);

		function move() {
			if(that.oUl.offsetLeft >= r) {
				checkpoint.speedX *= -1;
				that.oUl.style.top = that.oUl.offsetTop + checkpoint.speedY + "px";
			} else if(that.oUl.offsetLeft <= l) {
				checkpoint.speedX *= -1;
				that.oUl.style.top = that.oUl.offsetTop + checkpoint.speedY + "px";
			}
			that.oUl.style.left = that.oUl.offsetLeft + checkpoint.speedX + "px";

		}
	},
	createAir: function() { //创建飞机
		var oAir = document.createElement("div");
		oAir.className = this.airData.air1.style;
		this.oAir = oAir;
		this.oBox.appendChild(oAir);
		oAir.style.left = (this.oBox.offsetWidth - oAir.offsetWidth) / 2 + "px";
		oAir.style.top = (this.oBox.offsetHeight - oAir.offsetHeight) + "px";
		this.airMove(this.airData.air1)
	},
	airMove: function(air) { //飞机移动
		var that = this;
		var timer = null;
		var code = 0;

		document.onkeydown = function(ev) {
			if(!timer) {
				timer = setInterval(move, 20);
			}
			var ev = ev || window.event;
			if(ev.keyCode == 37) {
				code = 1
			} else if(ev.keyCode == 39) {
				code = 2
			}
		}
		document.onkeyup = function(ev) {
			var ev = ev || window.event;
			if(ev.keyCode == 37) {
				clearInterval(timer);
				code = 0;
				timer = null;
			} else if(ev.keyCode == 39) {
				clearInterval(timer);
				code = 0;
				timer = null;
			} else if(ev.keyCode == 32) {
				that.createBullet()
			}
		}

		function move() {
			if(code == 1) {
				that.oAir.style.left = that.oAir.offsetLeft - air.speed + "px";
			} else if(code == 2) {
				that.oAir.style.left = that.oAir.offsetLeft + air.speed + "px";
			}
		}
	},
	createBullet: function() { //创建子弹
		var oB = document.createElement("div");
		oB.className = "bullet";
		this.oBox.appendChild(oB);
		oB.style.left = this.oAir.offsetLeft + this.oAir.offsetWidth / 2 - oB.offsetWidth / 2 + "px";
		oB.style.top = this.oBox.offsetHeight - this.oAir.offsetHeight - oB.offsetHeight - 4 + "px";
		this.bulletMove(oB);
	},
	bulletMove: function(oB) { //子弹移动
		var that = this;
		oB.timer = null;
		oB.timer = setInterval(move, 50);

		function move() {
			if(oB.offsetTop <= (that.oBox.offsetTop - oB.offsetHeight)) {
				clearInterval(oB.timer);
				that.oBox.removeChild(oB);
			} else {
				oB.style.top = oB.offsetTop - 10 + "px";
			}
			for(var i = 0; i < that.oLi.length; i++) {
				if(that.collision(oB, that.oLi[i])) {
					if(that.oLi[i].hp == 1) {
						that.oSpan.innerText = parseInt(that.oSpan.innerText) + parseInt(that.oLi[i].score);
						clearInterval(that.oLi[i].timer);
						that.oUl.removeChild(that.oLi[i]);
					} else {
						that.oLi[i].hp--
					}
					clearInterval(oB.timer);
					that.oBox.removeChild(oB);
					if(that.oLi.length == 0) {
						if(that.level == that.maxLevel) {
							document.getElementsByClassName("end")[0].style.display = "block";
							clearInterval(that.oUl.timer);
							that.oBox.removeChild(that.oUl);
						} else {
							clearInterval(that.oUl.timer);
							that.oBox.removeChild(that.oUl);
							that.createEnemy(that.checkpoint[that.level]);
							that.level++;
						}
					}
				}
			}
		}

	},
	random: function() { //自由落体
		var that = this;
		var nowLi = this.oLi[parseInt(this.oLi.length * Math.random())]
		nowLi.timer = null;

		nowLi.timer = setInterval(function() {
			var a = (that.oAir.offsetLeft + that.oAir.offsetWidth / 2) - (nowLi.offsetLeft + that.oUl.offsetLeft + nowLi.offsetWidth / 2);
			var b = (that.oAir.offsetTop + that.oAir.offsetHeight / 2) - (nowLi.offsetTop + that.oUl.offsetTop + nowLi.offsetHeight / 2);
			var c = Math.sqrt(a * a + b * b);
			var iX = (nowLi.speed * a) / c;
			var iY = (nowLi.speed * b) / c;
			nowLi.style.left = nowLi.offsetLeft + iX + "px";
			nowLi.style.top = nowLi.offsetTop + iY + "px";

			if(that.collision(that.oAir, nowLi)) {
				alert("游戏结束");
				window.location.reload();
			}
		}, 80)

	},
	collision: function(obj1, obj2) { //检测碰撞
		var L1 = obj1.offsetLeft;
		var R1 = obj1.offsetLeft + obj1.offsetWidth;
		var T1 = obj1.offsetTop;
		var B1 = obj1.offsetTop + obj1.offsetHeight;

		var L2 = obj2.offsetLeft + this.oUl.offsetLeft;
		var R2 = obj2.offsetLeft + this.oUl.offsetLeft + obj2.offsetWidth;
		var T2 = obj2.offsetTop + this.oUl.offsetTop;
		var B2 = obj2.offsetTop + this.oUl.offsetTop + obj2.offsetHeight;
		if(L1 > R2 || R1 < L2 || T1 > B2 || B1 < T2) {
			return false
		} else {
			return true
		}
	}
}
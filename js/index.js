window.onload = function () {
	var start = document.getElementsByClassName("start")[0]
	start.onclick = function () {
		this.style.display = "none";
		Game.init() //游戏初始化
	}
}
var Game = {
	enemy: { //创建敌人数据
		em1: {
			style: "enemy1",
			hp: "1",
			score: "3",
			scorePlus: 2,
			speed: 10
		},
		em2: {
			style: "enemy2",
			hp: "2",
			score: "5",
			scorePlus: 5,
			speed: 20
		},
		em3: {
			style: "enemy3",
			hp: "3",
			score: "10",
			scorePlus: 10,
			speed: 30
		},
		em4: {
			style: "enemy4",
			hp: "5",
			score: "20",
			scorePlus: 15,
			speed: 35
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
	},
	{
		data: ["em3", "em4", "em3", "em4", "em3", "em4", "em3", "em4", "em3", "em4", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1", "em1"],
		iNum: 10,
		speedX: 30,
		speedY: 40,
		timer: 800
	},
	{
		data: ["em3", "em4", "em3", "em4", "em3", "em4", "em3", "em4", "em3", "em4","em3", "em4", "em3", "em4", "em3", "em4", "em3", "em4", "em3", "em4", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em3", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em2", "em1"],
		iNum: 10,
		speedX: 40,
		speedY: 60,
		timer: 700
	}
	],
	airData: { //飞机数据
		air1: {
			style: "air",
			speed: 15,
			bullet: "bullet",
			bulletNum: 1,
			hp: 1
		}
	},
	tipsData: [
		"左右移动 ← →，",
		"空格 开枪，",
		"强化生命（100）：↑，",
		"强化飞机（300）：↓"
	],
	level: 0,
	maxLevel: 5,
	init: function () { //初始化数据
		this.createScore();
		this.createTips();
		this.createEnemy(this.checkpoint[this.level]);
		this.createAir();
		this.maxLevel = this.checkpoint.length;//自动获取最高关卡数量
		this.level++;
	},
	createScore: function () { //创建积分
		var oDiv = document.createElement("div");
		var oBox = document.getElementsByClassName("box")[0];
		this.oBox = oBox;
		oDiv.className = "score";
		oDiv.innerHTML = "积分：<span>0</span>";
		oBox.appendChild(oDiv);
		var oSore = oDiv.getElementsByTagName("span")[0];
		this.oSore = oSore;
	},
	createTips: function () {//创建提示
		var oDiv = document.createElement("div");
		oDiv.className = "tips";
		var temp = "";
		this.tipsData.forEach(function (val, index) {
			temp += val;
		});
		oDiv.innerText = temp;
		this.oTips = oDiv;
		this.oBox.appendChild(oDiv);
	},
	createEnemy: function (checkpoint) { //创建敌人
		var data = checkpoint.data;
		var arr = [];
		var that = this;
		document.title = this.level + 1;
		var oUl = document.createElement("ul");
		oUl.style.width = 40 * checkpoint.iNum + "px";
		oUl.className = "honeycomb";
		this.oUl = oUl;
		this.oUl.rdTiemr = null;
		this.oBox.appendChild(oUl);
		oUl.style.left = (this.oBox.offsetWidth - oUl.offsetWidth) / 2 + "px";
		for (var i = 0; i < data.length; i++) {
			var r = Math.random();
			var oLi = document.createElement("li");
			oLi.className = this.enemy[data[i]].style;
			oLi.hp = this.enemy[data[i]].hp;
			oLi.score = parseInt(this.enemy[data[i]].score) + parseInt(this.enemy[data[i]].scorePlus * r);
			oLi.speed = this.enemy[data[i]].speed;
			oUl.appendChild(oLi);
		}
		var oLi = oUl.getElementsByTagName("li");
		this.oLi = oLi;
		for (var j = 0; j < oLi.length; j++) {
			arr.push([oLi[j].offsetLeft, oLi[j].offsetTop])
		}
		for (var k = 0; k < oLi.length; k++) {
			oLi[k].style.position = "absolute";
			oLi[k].style.left = arr[k][0] + "px";
			oLi[k].style.top = arr[k][1] + "px";
		}
		this.enemyMove(checkpoint);
		this.oUl.rdTiemr = setInterval(function () {
			that.random();
		}, checkpoint.timer)

	},
	enemyMove: function (checkpoint) { //敌人移动
		var that = this;
		that.oUl.timer = null;
		var l = 0;
		var r = this.oBox.offsetWidth - this.oUl.offsetWidth;
		that.oUl.timer = setInterval(move, 200);

		function move() {
			if (that.oUl.offsetLeft >= r) {
				checkpoint.speedX *= -1;
				that.oUl.style.top = that.oUl.offsetTop + checkpoint.speedY + "px";
			} else if (that.oUl.offsetLeft <= l) {
				checkpoint.speedX *= -1;
				that.oUl.style.top = that.oUl.offsetTop + checkpoint.speedY + "px";
			}
			that.oUl.style.left = that.oUl.offsetLeft + checkpoint.speedX + "px";

		}
	},
	createAir: function () { //创建飞机
		var oAir = document.createElement("div");
		oAir.className = this.airData.air1.style;
		oAir.speed = this.airData.air1.speed;
		oAir.hp = this.airData.air1.hp;
		oAir.bulletNum = this.airData.air1.bulletNum;
		oAir.innerText = oAir.hp;
		this.oAir = oAir;
		this.oBox.appendChild(oAir);
		oAir.style.left = (this.oBox.offsetWidth - oAir.offsetWidth) / 2 + "px";
		oAir.style.top = (this.oBox.offsetHeight - oAir.offsetHeight) + "px";
		this.airMove();
	},
	airMove: function () { //飞机移动
		var that = this;
		this.oAir.timer = null;
		var code = 0;

		document.onkeydown = function (ev) {
			if (!that.oAir.timer) {
				that.oAir.timer = setInterval(move, 20);
			}
			var ev = ev || window.event;
			if (ev.keyCode == 37) {
				code = 1
			} else if (ev.keyCode == 39) {
				code = 2
			}
		}
		document.onkeyup = function (ev) {
			var ev = ev || window.event;
			if (ev.keyCode == 37) {
				clearInterval(that.oAir.timer);
				code = 0;
				that.oAir.timer = null;
			} else if (ev.keyCode == 39) {
				clearInterval(that.oAir.timer);
				code = 0;
				that.oAir.timer = null;
			} else if (ev.keyCode == 38 && that.oSore.innerText >= 100) {//强化生命
				that.oSore.innerText -= 100;
				that.oAir.innerText++;
			} else if (ev.keyCode == 40 && that.oSore.innerText >= 300) {//强化子弹
				that.oSore.innerText -= 300;
				that.oAir.bulletNum++
			} else if (ev.keyCode == 32) {
				for (var i = 0; i < that.oAir.bulletNum; i++) {//发射子弹
					that.createBullet();
				}
			}
		}

		function move() {
			if (code == 1) {
				if (that.oAir.offsetLeft >= 0) {
					that.oAir.style.left = that.oAir.offsetLeft - that.oAir.speed + "px";
				} else {
					clearInterval(that.oAir.timer);
				}

			} else if (code == 2) {
				if (that.oAir.offsetLeft <= (that.oBox.offsetWidth - that.oAir.offsetWidth)) {
					that.oAir.style.left = that.oAir.offsetLeft + that.oAir.speed + "px";
				} else {
					clearInterval(that.oAir.timer);
				}

			}
		}
	},
	createBullet: function () { //创建子弹
		var oB = document.createElement("div");
		oB.className = "bullet";
		this.oBox.appendChild(oB);
		oB.style.left = this.oAir.offsetLeft + this.oAir.offsetWidth / 2 - oB.offsetWidth / 2 + "px";
		oB.style.top = this.oBox.offsetHeight - this.oAir.offsetHeight - oB.offsetHeight - 4 + "px";
		this.bulletMove(oB);
	},
	bulletMove: function (oB) { //子弹移动
		var that = this;
		oB.timer = null;
		oB.timer = setInterval(move, 30);

		function move() {
			if (oB.offsetTop <= (that.oBox.offsetTop - oB.offsetHeight)) {
				clearInterval(oB.timer);
				that.oBox.removeChild(oB);
			} else {
				oB.style.top = oB.offsetTop - 10 + "px";
			}
			for (var i = 0; i < that.oLi.length; i++) {
				if (that.collision(oB, that.oLi[i])) {
					if (that.oLi[i].hp == 1) {//消灭敌人
						var oScoreText = document.createElement("span");
						oScoreText.className = "scoretext";
						oScoreText.style.left = oB.offsetLeft + "px";
						oScoreText.style.top = oB.offsetTop + "px";
						oScoreText.innerText = "+" + parseInt(that.oLi[i].score);
						that.oBox.appendChild(oScoreText);
						setTimeout(function () {
							that.oBox.removeChild(oScoreText);
						}, 800);
						that.oSore.innerText = parseInt(that.oSore.innerText) + parseInt(that.oLi[i].score);
						clearInterval(that.oLi[i].timer);
						that.oUl.removeChild(that.oLi[i]);
					} else {
						that.oLi[i].hp--
					}
					clearInterval(oB.timer);
					that.oBox.removeChild(oB);
					if (that.oLi.length == 0) {
						console.log("level:"+that.level );
						console.log("maxLevel:"+that.maxLevel );
						if (that.level == that.maxLevel) {
							clearInterval(that.oUl.rdTiemr);
							clearInterval(that.oUl.timer);
							that.oBox.removeChild(that.oUl);
							document.getElementsByClassName("end")[0].style.display = "block";
							
						} else {
							clearInterval(that.oUl.rdTiemr);
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
	random: function () { //自由落体
		var that = this;
		var nowLi = this.oLi[parseInt(this.oLi.length * Math.random())]
		nowLi.timer = null;

		nowLi.timer = setInterval(function () {
			var a = (that.oAir.offsetLeft + that.oAir.offsetWidth / 2) - (nowLi.offsetLeft + that.oUl.offsetLeft + nowLi.offsetWidth / 2);
			var b = (that.oAir.offsetTop + that.oAir.offsetHeight / 2) - (nowLi.offsetTop + that.oUl.offsetTop + nowLi.offsetHeight / 2);
			var c = Math.sqrt(a * a + b * b);
			var iX = (nowLi.speed * a) / c;
			var iY = (nowLi.speed * b) / c;
			nowLi.style.left = nowLi.offsetLeft + iX + "px";
			nowLi.style.top = nowLi.offsetTop + iY + "px";

			if (that.collision(that.oAir, nowLi)) {
				if (that.oAir.innerText == 1) {
					clearInterval(that.oUl.rdTiemr);
							clearInterval(that.oUl.timer);
					alert("游戏结束");
					window.location.reload();
				} else {
					clearInterval(nowLi.timer);
					that.oUl.removeChild(nowLi);
					that.oAir.innerText--;
					if (that.oLi.length == 0) {
						if (that.level == that.maxLevel) {
							clearInterval(that.oUl.rdTiemr);
							clearInterval(that.oUl.timer);
							that.oBox.removeChild(that.oUl);
							document.getElementsByClassName("end")[0].style.display = "block";
							
						} else {
							clearInterval(that.oUl.rdTiemr);
							clearInterval(that.oUl.timer);
							that.oBox.removeChild(that.oUl);
							that.createEnemy(that.checkpoint[that.level]);
							that.level++;
						}
					}
				}
			}
		}, 80)

	},
	collision: function (obj1, obj2) { //检测碰撞
		var L1 = obj1.offsetLeft;
		var R1 = obj1.offsetLeft + obj1.offsetWidth;
		var T1 = obj1.offsetTop;
		var B1 = obj1.offsetTop + obj1.offsetHeight;

		var L2 = obj2.offsetLeft + this.oUl.offsetLeft;
		var R2 = obj2.offsetLeft + this.oUl.offsetLeft + obj2.offsetWidth;
		var T2 = obj2.offsetTop + this.oUl.offsetTop;
		var B2 = obj2.offsetTop + this.oUl.offsetTop + obj2.offsetHeight;
		if (L1 > R2 || R1 < L2 || T1 > B2 || B1 < T2) {
			return false
		} else {
			return true
		}
	}
}
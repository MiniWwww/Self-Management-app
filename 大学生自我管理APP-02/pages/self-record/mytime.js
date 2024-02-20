export default {
	//时间处理，获取需要的输出格式
	addTimes(m){return m<10?'0'+m:m}, //对于一位数字的，前面加个'0'
	traversalTime(timestamp) {
		//timestamp(时间戳)是整数，否则要parseInt转换
		let time = new Date(timestamp);
		let y = time.getFullYear();
		let m = time.getMonth() + 1; //对于getMonth，实际上第i月返回值是i-1,所以getmonth之后还要+1
		let d = time.getDate();
		let h = time.getHours();
		let min =  time.getMinutes();
		let s = time.getSeconds();
		return y+'-'+this.addTimes(m)+'-'+this.addTimes(d)+' '+this.addTimes(h)+':'+this.addTimes(min)+":"+this.addTimes(s);
	}
}
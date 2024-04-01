<template>
	<view class="container">
		<view class="example-info">
			<text class="example-info-text">用于从 Mikan Project 的 RSS 中获取磁力数据。</text>
		</view>
		<uni-section class="mb-10" title="RSS 地址" type="line">
			<view class="input-section">
				<uni-easyinput v-model="rssUrl" placeholder="请输入 RSS 地址" />
			</view>
			<view class="input-section">
				<button type="primary" @click="submit" :loading="loading" :disabled="buttonDisabled">解析</button>
			</view>
			<view class="input-section">
				<button @click="copy" :disabled="copyDisabled">复制</button>
			</view>
		</uni-section>
		<uni-section class="mb-10" :title="rssTitle" type="line">
			<view class="input-section">
				<uni-easyinput type="textarea" autoHeight v-model="magnetUrl" />
			</view>
		</uni-section>
	</view>
</template>

<script>
	import {
		parse
	} from '../../utils/rss-parser';

	export default {
		data() {
			return {
				rssUrl: "",
				magnetUrl: "",
				rssTitle: "磁力链结果",
				loading: false,
				messageText: "已复制",
				msgType: ""
			};
		},
		methods: {
			submit() {
				this.loading = true;
				uni.request({
					url: this.rssUrl,
					success: (res) => {
						this.magnetUrl = "";
						let parseRes = parse(res.data);
						this.rssTitle = parseRes[0];

						for (let i = 1; i < parseRes.length; ++i) {
							this.magnetUrl += parseRes[i] + '\n';
						}
					},
					complete: (res) => {
						this.loading = false;
					}
				});
			},
			copy(type) {
				uni.setClipboardData({
					data: this.magnetUrl,
				});
			}
		},
		computed: {
			buttonDisabled() {
				return this.rssUrl.trim().length == 0;
			},
			copyDisabled() {
				return this.magnetUrl.trim().length == 0;
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.uni-wrap {
		flex-direction: column;
		/* #ifdef H5 */
		height: calc(100vh - 44px);
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		flex: 1;
	}

	.mb-10 {
		margin-bottom: 10px;
	}

	.decoration {
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: $uni-success;
	}

	.input-section {
		padding: 5px;
	}
</style>
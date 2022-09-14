<template>
  <div class="homeContainer">
	<el-button type="primary" size="small" @click="toAdd">添加字段</el-button>
	<el-table  :data="tableData" border>
		<el-table-column prop="name" label="字段名称" min-width="180" align="center"/>
		<el-table-column prop="type" label="字段类型" min-width="180" align="center"/>
		<el-table-column prop="type" label="更新人员" min-width="180" align="center"/>
		<el-table-column prop="api" label="更新时间" min-width="180" align="center"/>
		<el-table-column prop="api" label="分类" min-width="180" align="center"/>
		<el-table-column prop="api" label="状态" min-width="180" align="center"/>
		<el-table-column fixed="right" label="操作" width="100" align="center">
			<template slot-scope="scope">
				<el-button @click="toEidt(scope.row)" type="text" size="small">删除</el-button>
				<el-button @click="toEidt(scope.row)" type="text" size="small">编辑</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-dialog :title="form.id?'编辑字段':'新建字段'" :visible.sync="dialogShow" custom-class="filedDialog">
		<div class="dialogBox">
			<div class="leftContent">
				<div class="filedBox" v-for="(item,index) in fieldList" :key="index">
					<div class="title">{{item.title}}</div>
					<div class="option">
						<div v-for="(item2,index2) in item.data" :key="index2" :class="{'active':activeField.type==item2.type}" @click="chooseItem(item2)">{{item2.name}}</div>
					</div>
				</div>
			</div>
			<div class="rightContent">
				<el-tabs v-model="activeTab" @tab-click="changeTab">
					<el-tab-pane label="基本信息" name="1">
						<div class="fieldName">{{activeField.name}}</div>
						<div class="fieldDesc">{{activeField.desc}}</div>
						<el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
							<el-form-item label="字段名称" prop="name" required>
								<el-input v-model.trim="form.name" maxlength="20" placeholder="请输入字段名称，20字以内，需唯一"/>
							</el-form-item>
							<el-form-item label="API名称">
								<el-input v-model="form.name" disabled/>
							</el-form-item>
							<el-form-item label="最大字符数" required v-show="['input','textarea'].includes(activeField.type)">
								<el-input v-model="form.max" placeholder="请输入最大字符数，范围1～100" maxlength="3"/>
							</el-form-item>
							<el-form-item label="最小字符数" required v-show="['input','textarea'].includes(activeField.type)">
								<el-input v-model="form.min"placeholder="请输入最小字符数，范围0～100" maxlength="3"/>
							</el-form-item>
							<el-form-item label="允许最大位数" required v-show="['money','number'].includes(activeField.type)">
								<el-input v-model="form.big" placeholder="请输入允许最大位数，范围1～14" maxlength="14"/>
							</el-form-item>
							<el-form-item label="小数位数" required v-show="['money','number','percent'].includes(activeField.type)">
								<el-input v-model="form.small" placeholder="请输入小数位数，范围0～2" maxlength="1"/>
							</el-form-item>
							<el-form-item label="电话类型" prop="repeat" required v-show="['phone'].includes(activeField.type)">
								<el-radio-group v-model="form.repeat">
									<el-radio label="1">手机号</el-radio>
									<el-radio label="2">手机号+固定电话</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="关联对象" prop="relation" required v-show="['relation'].includes(activeField.type)">
								<el-select v-model="form.relation" placeholder="请选择关联对象">
									<el-option label="客户" value="1"></el-option>
									<el-option label="商机" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="相关列表标题" required v-show="['relation'].includes(activeField.type)">
								<div slot="label" class="labelLine">
									<span class="labelText">相关列表标题</span>
									<el-tooltip class="item" effect="dark">
										<div slot="content">当前对象在关联对象详情页的列表标题</div>
										<i class="el-icon-question"></i>
									</el-tooltip>
								</div>
								<el-input v-model.trim="form.name" maxlength="20" placeholder="请输入列表标题，20字以内"/>
							</el-form-item>
							<el-form-item label="数据范围" prop="relation" required v-show="['relation'].includes(activeField.type)">
								<el-select v-model="form.relation" placeholder="请选择关联对象">
									<el-option label="全公司" value="1"></el-option>
									<el-option label="本人及下属" value="2"></el-option>
									<el-option label="本人所属部门" value="3"></el-option>
									<el-option label="本部门及下级部门" value="4"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="添加选项" prop="relation" required v-show="['radio','select'].includes(activeField.type)">
								单选多选
							</el-form-item>
							<el-form-item label="日期类型" prop="repeat" v-show="['date'].includes(activeField.type)">
								<el-radio-group v-model="form.repeat">
									<el-radio label="1">时间</el-radio>
									<el-radio label="2">日期</el-radio>
									<el-radio label="3">日期时间</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="日期类型" prop="repeat" v-show="['dateRange'].includes(activeField.type)">
								<el-radio-group v-model="form.repeat">
									<el-radio label="1">日期范围</el-radio>
									<el-radio label="3">日期时间范围</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="选项设置" prop="relation" required v-show="['cascader'].includes(activeField.type)">
								级联设置
							</el-form-item>
							<el-form-item label="数据范围" prop="relation" required v-show="['partradio'].includes(activeField.type)">
								<el-select v-model="form.relation" placeholder="请选择数据范围">
									<el-option label="全公司部门" value="1"></el-option>
									<el-option label="操作人所属部门" value="4"></el-option>
									<el-option label="操作人所属部门及下级部门" value="5"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="数据范围" prop="relation2" required v-show="['partselect'].includes(activeField.type)">
								<el-select v-model="form.relation2" placeholder="请选择数据范围" multiple collapse-tags>
									<el-option label="全公司部门" value="1"></el-option>
									<el-option label="操作人所属部门" value="4"></el-option>
									<el-option label="操作人所属部门及下级部门" value="5"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="数据范围" prop="relation3" required v-show="['personradio'].includes(activeField.type)">
								<el-select v-model="form.relation3" placeholder="请选择数据范围">
									<el-option label="全公司人员" value="1"></el-option>
									<el-option label="操作人" value="2"></el-option>
									<el-option label="操作人及下属" value="3"></el-option>
									<el-option label="操作人所属部门人员" value="4"></el-option>
									<el-option label="操作人所属部门及下级部门人员" value="5"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="数据范围" prop="relation4" required v-show="['personselect'].includes(activeField.type)">
								<el-select v-model="form.relation4" placeholder="请选择数据范围" multiple collapse-tags>
									<el-option label="全公司人员" value="1"></el-option>
									<el-option label="操作人" value="2"></el-option>
									<el-option label="操作人及下属" value="3"></el-option>
									<el-option label="操作人所属部门人员" value="4"></el-option>
									<el-option label="操作人所属部门及下级部门人员" value="5"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="编号预览" v-show="['sort'].includes(activeField.type)">
								<el-input v-model="form.name" disabled/>
							</el-form-item>
							<el-form-item label="前缀" required v-show="['sort'].includes(activeField.type)">
								<el-input v-model="form.name" placeholder="请输入前缀，10个字以内"/>
							</el-form-item>
							<el-form-item label="编号位数" required v-show="['sort'].includes(activeField.type)">
								<div slot="label" class="labelLine">
									<span class="labelText">编号位数</span>
									<el-tooltip class="item" effect="dark">
										<div slot="content">当编号最大值超过编号位数限制时，编号支持继续增加</div>
										<i class="el-icon-question"></i>
									</el-tooltip>
								</div>
								<el-input v-model="form.name" placeholder="请输入编号位数，范围1-20" maxlength="20"/>
							</el-form-item>
							<el-form-item label="编号初始值" required v-show="['sort'].includes(activeField.type)">
								<el-input v-model="form.name" placeholder="请输入编号初始值，范围1-20" maxlength="20"/>
							</el-form-item>
							<el-form-item label="后缀" required v-show="['sort'].includes(activeField.type)">
								<el-input v-model="form.name" placeholder="请输入后缀，10个字以内"/>
							</el-form-item>
							<el-form-item label="最大图片数" required v-show="['img'].includes(activeField.type)">
								<el-input v-model="form.imgNum" placeholder="请输入最大图片数量，范围1～10" maxlength="10"/>
							</el-form-item>
							<el-form-item label="单张图片限制" v-show="['img'].includes(activeField.type)">
								<div>20M以内</div>
							</el-form-item>
							<el-form-item label="最大文件数" required v-show="['file'].includes(activeField.type)">
								<el-input v-model="form.fileNum" placeholder="请输入最大文件数量，范围1～10" maxlength="10"/>
							</el-form-item>
							<el-form-item label="单个文件限制" v-show="['file'].includes(activeField.type)">
								<div>200M以内</div>
							</el-form-item>
							<el-form-item label="省市区设置" v-show="['area'].includes(activeField.type)">
								<div>省市区设置</div>
							</el-form-item>
							<el-form-item label="自动获取当前位置" prop="repeat" required v-show="['location'].includes(activeField.type)">
								<el-radio-group v-model="form.repeat">
									<el-radio label="1">是</el-radio>
									<el-radio label="2">否</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="定位可选范围" prop="repeat" required v-show="['location'].includes(activeField.type)">
								<el-radio-group v-model="form.repeat">
									<el-radio label="1">限制</el-radio>
									<el-radio label="2">不限制</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="周边" required v-show="['location'].includes(activeField.type)">
								<el-input v-model="form.imgNum" placeholder=""/>
							</el-form-item>
							<el-form-item label="提示信息" prop="desc">
								<el-input type="textarea" v-model="form.desc" placeholder="请输入提示信息，200字以内" maxlength="200"  show-word-limit :autosize="{ minRows: 3, maxRows: 6 }"/>
							</el-form-item>
							<el-form-item label="是否掩码展示" prop="repeat" v-show="['phone','email'].includes(activeField.type)">
								<div slot="label" class="labelLine">
									<span class="labelText">是否掩码展示</span>
									<el-tooltip class="item" effect="dark">
										<div slot="content">1. 勾选“是”，该字段值在页面上将以掩码展示，例如{{activeField.type=='phone'?'“189****1234”':'“****”'}}<br/>2. 字段配置掩码后，如果用户看到为掩码态，则该字段不允许编辑</div>
										<i class="el-icon-question"></i>
									</el-tooltip>
								</div>
								<el-radio-group v-model="form.repeat">
									<el-radio label="1">是</el-radio>
									<el-radio label="2">否</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="去掩码职能" prop="relation" v-show="['phone','email'].includes(activeField.type)">
								<div slot="label" class="labelLine">
									<span class="labelText">去掩码职能</span>
									<el-tooltip class="item" effect="dark">
										<div slot="content">设置不遵循掩码显示规则的职能</div>
										<i class="el-icon-question"></i>
									</el-tooltip>
								</div>
								<el-select v-model="form.arr" placeholder="请选择去掩码职能" multiple collapse-tags>
									<el-option label="管理员" value="1"></el-option>
									<el-option label="本人及下属" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="是否允许重复" prop="repeat" required>
								<el-radio-group v-model="form.repeat">
									<el-radio label="1">允许重复</el-radio>
									<el-radio label="2" :disabled="activeField.type=='textarea'">不允许重复</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-form>
					</el-tab-pane>
					<el-tab-pane label="权限配置" name="2"></el-tab-pane>
				</el-tabs>
			</div>
		</div>
	  <div slot="footer" class="dialogFooter">
		<el-button @click="dialogShow = false" size="small">取 消</el-button>
		<el-button type="primary" @click="confirm" size="small">确 定</el-button>
	  </div>
	</el-dialog>
  </div>
</template>

<script>
	export default {
		components:{
			 
		},
		data() {
			return {
				tableData:[{
					name:'邮箱',
					max:10,
					min:1,
					api:'email',
					tip:'提示信息',
					repeat:1,
					id:1
				}],
				dialogShow:false,
				form:{
					arr:[]
				},
				fieldList:[{
					title:'输入型字段',
					data:[{name:'单行文本',type:'input',desc:'适用于填写简短的文字，如“姓名”、“公司名称”'},{name:'多行文本',type:'textarea',desc:'适用于填写大段的文字，如“备注”、“建议”'},{name:'金额',type:'money',desc:'适用于填写数字，如“成本报价”、“订单金额”'},{name:'数字',type:'number',desc:'适用于填写数字，如“数量”、“年龄”'},{name:'百分比',type:'percent',desc:'适用于填写百分数，如“赢率”'},{name:'电话',type:'phone',desc:'适用于填写手机号码或固定电话'},{name:'邮箱',type:'email',desc:'适用于填写邮件地址'},{name:'网址',type:'web',desc:'适用于填写网址'}]
				},{
					title:'选择型字段',
					data:[{name:'单选',type:'radio',desc:'适用于在几个选项中选择一个，如“客户等级”'},{name:'多选',type:'select',desc:'适用于在几个选项中选择多个，如“投票”'},{name:'日期',type:'date',desc:'适用于选择开始日期或日期时间：2099-12-01 12:12:12'},{name:'日期范围',type:'dateRange',desc:'适用于选择开始日期和结束日期：2099-12-01～2099-12-31'},{name:'布尔值',type:'boolen'},{name:'级联选择',type:'cascader',desc:'适用于多层级下拉选择，如“省市区”'},{name:'部门单选',type:'partradio',desc:'适用于选择公司内指定部门'},{name:'部门多选',type:'partselect',desc:'适用于选择公司内多个部门'},{name:'人员单选',type:'personradio',desc:'适用于选择公司内指定人员'},{name:'人员多选',type:'personselect',desc:'适用于选择公司内多个人员'},{name:'省市区',type:'area',desc:'适用于选择地区定位，例如“公司所在区域”'},{name:'定位',type:'location',desc:'适用于在地图上精确创建定位信息，例如“拜访目的地”'}]
				},{
					title:'功能型字段',
					data:[{name:'自动编号',type:'sort',desc:'系统按规则自动生成编码且不可修改，如“订单编号”'},{name:'关联对象',type:'relation',desc:'适用于将当前对象和其他对象建立关联关系',desc:'适用于上传图片，可直接点击打开展示'},{name:'图片',type:'img',desc:'适用于将当前对象和其他对象建立关联关系',desc:'适用于上传图片，可直接点击打开展示'},{name:'附件',type:'file',desc:'适用于上传附件，文件类型不限，可下载至本地'}]
				}],
				activeTab:'1',
				activeField:'',//选中的自定义字段
				rules:{
					name: [{ required: true, message: '请输入字段名称'}],
					max: [{ required: true, message: '请输入最大字符数'}],
					min: [{ required: true, message: '请输入最小字符数'}],
					big: [{ required: true, message: '请输入允许最大位数'}],
					small: [{ required: true, message: '请输入小数位数'}]
				}
			}
		},
		methods: {
			toAdd(){
				this.form={}
				this.dialogShow=true
			},
			toEidt(item){
				this.form=item
				this.dialogShow=true
			},
			chooseItem(item){
				this.activeField=item
			},
			changeTab(e){
				this.activeTab=e.name
			},
			confirm(){
				this.$refs.form.validate((res)=>{
					console.log(this.activeField)
				})
			}
		},
		created() {
			setTimeout(()=>{
				this.dialogShow=true
				this.activeField=this.fieldList[0].data[0]
			})
		}
	}
</script>
<style lang="scss">
	.homeContainer{
		background-color: #fff;
		width: 700px;
		padding:  16px;
		.el-table{
			margin-top: 16px;
		}
		.filedDialog{
			width: 800px;
			.dialogBox{
				display: flex;
				height: 600px;
				.leftContent{
					width: 188px;
					border-right: 1px solid #E5E6EB;
					padding: 0 24px;
					box-sizing: border-box;
					overflow-y: auto;
					.filedBox{
						.title{
							font-size: 14px;
							font-weight: bold;
							line-height: 40px;
						}
						.option{
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;
							div{
								width: 60px;
								height: 28px;
								display: flex;
								align-items: center;
								justify-content: center;
								margin-bottom: 10px;
								font-size: 12px;
								cursor: pointer;
								background: #F2F3F5;
								border-radius: 4px;
								border: 1px solid #E5E6EB;
								&.active{
									background: #E8F3FF;
									border: 1px solid #8aaeff;
								}
							}
						}
					}
				}
				.rightContent{
					flex:1;
					overflow-y: auto;
					.el-tabs{
						.el-tabs__nav-wrap::after {
							height: 1px;
						    background-color: #E5E6EB;
						}
						.el-tabs__header{
							margin: 0;
							.el-tabs__item{
								padding: 0 20px;
							}
						}
						.el-tabs__content{
							padding: 16px;
							.fieldDesc{
								color: #999;
								font-size: 12px;
								margin: 10px 0;
							}
						}
					}
					.el-form{
						.labelLine{
							display: inline-block;
							.labelText{
								margin-right: 4px;
								display: inline-block;
							}
						}
					}
				}
			}
		}
	}
</style>
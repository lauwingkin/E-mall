import Mock from 'mockjs'


//webpack默认对外暴露图片和json
import banner from './banner.json'
import floor from './floor.json'

Mock.mock("/mock/banner",{code:200,data:banner});  //模拟首页轮播图数据
Mock.mock("/mock/floor",{code:200,data:floor});
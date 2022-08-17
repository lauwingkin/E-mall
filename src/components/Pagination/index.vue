<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <!-- 触发自定义事件，并 传参 -->
    <button
      v-if="startNumAndEndNum.start >= 2"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start >= 3">···</button>
    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start" 
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template> 

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      console.log(this.total, this.pageSize);
      return Math.ceil(this.total / this.pageSize); //向上取整
    },

    //连续页码至少是5
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      //先定义起始页码和结束页码数字
      let start = 0,
        end = 0;
      console.log("总页数" + totalPage);

      //页数不足不正常现象
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象
        start = pageNo - (continues - 1) / 2;
        end = pageNo + (continues - 1) / 2;
        if (start < 1) {
          //不正常现象start负数
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          //不正常现象 ,end大于页码
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      console.log("start : " + start + " /end : " + end);
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background:skyblue;
}
</style>
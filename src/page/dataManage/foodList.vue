<template>
  <div>
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%">
        <!-- 折叠内容 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="食品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="餐馆名称">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="餐馆 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="餐馆地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="食品评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{ props.row.month_sales }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 表头 -->
        <el-table-column
          label="食品名称"
          prop="id">
        </el-table-column>
        <el-table-column
          label="食品介绍"
          prop="name">
        </el-table-column>
        <el-table-column
          label="评分"
          prop="rating">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="Pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="20"
            :total="1000"
            :current-page="currentPage"
            @current-change="changePage">
          </el-pagination>
      </div>
      <!-- 弹出框 -->
      <el-dialog title="修改食品信息" v-model="outerVisible">
        <el-form :label-position="left" label-width="80px" :model="formLabelAlign">
          <el-form-item label="食品名称">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍">
            <el-input v-model="formLabelAlign.description"></el-input>
          </el-form-item>
          <el-form-item label="食品分类">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in menuOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品图片">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-table
          :data="specs"
          style="width: 100%">
          <el-table-column
            prop="specs"
            label="规格"
            width="180">
          </el-table-column>
          <el-table-column
            prop="packing_fee"
            label="包装费"
            width="180">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column label="操作" >
					    <template slot-scope="scope">
					        <el-button
					          size="small"
					          type="danger"
					          @click="deleteSpecs(scope.$index)">删除</el-button>
					    </template>
					    </el-table-column>
        </el-table>
        <el-button type="primary" @click="innerVisible = true">添加规格</el-button>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="outerVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 规格 -->
      <el-dialog
          title="提示"
          v-model="innerVisible"
          width="30%"
          :before-close="handleClose">
          <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
              label="规格"
              prop="specs"
              :rules="[
                { required: true, message: '规格不能为空'}
              ]"
            >
              <el-input v-model.number="numberValidateForm.specs" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
  </div>
</template>
<script>
  import headTop from "../../components/headTop.vue";
  export default {
    components:{
      headTop
    },
    data() {
      return {
        // 食品列表数据
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          description: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          rating: '5',
          month_sales: '201'

        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          rating: '5',
          month_sales: '201'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          rating: '5',
          month_sales: '201'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          rating: '5',
          month_sales: '201'
        }],
        // 弹出窗规格列表数据
        specs:[],
        menuOptions: [{
          value: '选项1',
          label: '好吃'
        }, {
          value: '选项2',
          label: '特价'
        }, {
          value: '选项3',
          label: '午间爆卖'
        }, {
          value: '选项4',
          label: '百亿补贴'
        }, {
          value: '选项5',
          label: '满减'
        }],
        value:'好吃',
        // 弹出窗  食品详情设置
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        // 第二层弹框规格规则
        numberValidateForm: {
          specs: ''
        },
        // 控制第一层弹出窗弹出
        outerVisible: false,
        // 控制第二层弹出窗弹出
        innerVisible: false,
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.outerVisible = true
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
<style lang="less">
  @import '../../style/mixin';
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .table_container{
    padding: 20px;
  }
  .Pagination{
    margin-top: 10px;
    text-align: left;
  }

  // 图片上传
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
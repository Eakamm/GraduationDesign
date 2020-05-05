<template>
  <div class="app-container">
    <el-row>
      <span>书籍类型:</span>
      <el-select v-model="type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.type"
            :value="item.type">
          </el-option>
       </el-select>

        <span>爬取页数(一页20条数据):</span>
        <el-input v-model="page_count" style="width: 100px;" placeholder="请输入页数"></el-input>

        <el-button type="success" round @click="runScrapy">启动</el-button>
    </el-row>

    <el-divider>搜索</el-divider>

    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="书名" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入书名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="得分" prop="rate">
        <el-input
          v-model="queryParams.rate"
          placeholder="请输入得分"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原作名" prop="originalName">
        <el-input
          v-model="queryParams.originalName"
          placeholder="请输入原作名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input
          v-model="queryParams.author"
          placeholder="请输入作者"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出版社" prop="publisher">
        <el-input
          v-model="queryParams.publisher"
          placeholder="请输入出版社"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="出版时间" prop="publishTime">
        <el-input
          v-model="queryParams.publishTime"
          placeholder="选择出版时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
          />
      </el-form-item>
      <el-form-item label="书籍简介" prop="descripe">
        <el-input
          v-model="queryParams.descripe"
          placeholder="请输入书籍简介"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原价" prop="originalPrice">
        <el-input
          v-model="queryParams.originalPrice"
          placeholder="请输入原价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="现价" prop="nowPrice">
        <el-input
          v-model="queryParams.nowPrice"
          placeholder="请输入现价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ISBN号" prop="isbn">
        <el-input
          v-model="queryParams.isbn"
          placeholder="请输入ISBN号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
        <el-form-item label="书籍类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.type"
            :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间" prop="addTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.addTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择添加时间">
        </el-date-picker>
      </el-form-item>
    <!--  <el-form-item label="点击量" prop="clicks">
        <el-input
          v-model="queryParams.clicks"
          placeholder="请输入点击量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-divider style="color: #1890FF;">书籍信息</el-divider>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:book:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:book:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:book:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:book:export']"
        >导出</el-button>
      </el-col>
    </el-row>


    <el-table v-loading="loading" :data="bookList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <!-- <el-table-column label="图片地址" align="center" prop="imageUrl" /> -->
      <el-table-column label="书名" align="center" prop="title" />
      <el-table-column label="得分" align="center" prop="rate" />
      <el-table-column label="原作名" align="center" prop="originalName" />
      <el-table-column label="作者" align="center" prop="author" />
      <el-table-column label="出版社" align="center" prop="publisher" />
      <el-table-column label="出版时间" align="center" prop="publishTime" width="180">
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.publishTime) }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="原价" align="center" prop="originalPrice" />
      <el-table-column label="ISBN号" align="center" prop="isbn" />
      <el-table-column label="书籍类型" align="center" prop="type" />
      <el-table-column label="添加时间" align="center" prop="addTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.addTime) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="点击量" align="center" prop="clicks" /> -->
      <!-- <el-table-column label="豆瓣地址" align="center" prop="douBanUrl" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:book:edit']"
          >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:book:remove']"
          >删除</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="historyPrice(scope.row)"
          >历史价格</el-button>
                      <!-- v-hasPermi="['system:book:remove']" -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改书籍对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="图片地址" prop="imageUrl">
          <el-input v-model="form.imageUrl" placeholder="请输入图片地址" />
        </el-form-item>
        <el-form-item label="书名" prop="title">
          <el-input v-model="form.title" placeholder="请输入书名" />
        </el-form-item>
        <el-form-item label="得分" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入得分" />
        </el-form-item>
        <el-form-item label="原作名" prop="originalName">
          <el-input v-model="form.originalName" placeholder="请输入原作名" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-input v-model="form.publisher" placeholder="请输入出版社" />
        </el-form-item>
        <el-form-item label="出版时间" prop="publishTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.publishTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择出版时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="书籍简介" prop="descripe">
          <el-input v-model="form.descripe" placeholder="请输入书籍简介" />
        </el-form-item>
        <el-form-item label="原价" prop="originalPrice">
          <el-input v-model="form.originalPrice" placeholder="请输入原价" />
        </el-form-item>
        <el-form-item label="现价" prop="nowPrice">
          <el-input v-model="form.nowPrice" placeholder="请输入现价" />
        </el-form-item>
        <el-form-item label="ISBN号" prop="isbn">
          <el-input v-model="form.isbn" placeholder="请输入ISBN号" />
        </el-form-item>
        <el-form-item label="书籍类型">
          <el-select v-model="form.type" placeholder="请选择书籍类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="点击量" prop="clicks">
          <el-input v-model="form.clicks" placeholder="请输入点击量" />
        </el-form-item>
        <el-form-item label="豆瓣地址" prop="douBanUrl">
          <el-input v-model="form.douBanUrl" placeholder="请输入豆瓣地址" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBook, getBook, delBook, addBook, updateBook, exportBook } from "@/api/system/book";
import {listBook_type2} from '@/api/system/book_type'
import {runScrapy} from '@/api/system/scrapy'

export default {
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 书籍表格数据
      bookList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        imageUrl: undefined,
        title: undefined,
        rate: undefined,
        originalName: undefined,
        author: undefined,
        publisher: undefined,
        publishTime: undefined,
        descripe: undefined,
        originalPrice: undefined,
        nowPrice: undefined,
        isbn: undefined,
        type: undefined,
        addTime: undefined,
        clicks: undefined,
        douBanUrl: undefined,
        translator: undefined,
        jdUrl: undefined,
        commitnumbers: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        addTime: [
          { required: true, message: "添加时间不能为空", trigger: "blur" }
        ],
      },
      // 下拉框属性
      options: [],
      // 爬取书籍类型
      type: '',
      // 爬取页数
      page_count: '',
    };
  },
  created() {
    this.getList();
    this.getBookType();
  },
  methods: {
    // 运行爬虫
    runScrapy(){
      this.loading = true
      runScrapy(this.type, this.page_count).then(response=>{
        console.log(response.data)
        let data = response.data
        console.log(data[0].result)
        if(data[0].result == "爬取成功"){
          this.loading = false;
          this.$message(data[0].result);
        }else{
          this.loading = false;
          this.$message.error('爬取失败');
        }
      })
    },
    /** 查询书籍列表 */
    getList() {
      this.loading = true;
      listBook(this.queryParams).then(response => {
        this.bookList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 获取书籍类型
    getBookType(){
      listBook_type2().then(response =>{
        let data = response.data
        this.options = data
      })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        imageUrl: undefined,
        title: undefined,
        rate: undefined,
        originalName: undefined,
        author: undefined,
        publisher: undefined,
        publishTime: undefined,
        descripe: undefined,
        originalPrice: undefined,
        nowPrice: undefined,
        isbn: undefined,
        type: undefined,
        addTime: undefined,
        clicks: undefined,
        douBanUrl: undefined,
        translator: undefined,
        jdUrl: undefined,
        commitnumbers: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加书籍";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBook(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改书籍";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateBook(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addBook(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除书籍编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delBook(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    // 历史价格
    historyPrice(row){
      console.log(row)
      this.$router.push({path: '/history/mmm', query:{book_data: row}})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有书籍数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportBook(queryParams);
        }).then(response => {
          console.log(response.msg)
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>

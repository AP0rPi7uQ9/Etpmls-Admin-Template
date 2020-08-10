<template>
  <div class="permissions-container">
    <el-alert
      title="注意！"
      type="warning"
      description="请谨慎配置本页面！第一次配置前请先向相关人员请教，配置错误将会导致后台无法打开！"
      show-icon
      style="margin-bottom: 2rem;"
    ></el-alert>
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button type="danger" @click="handleReset">重置</el-button>
      </vab-query-form-left-panel>
    </vab-query-form>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <JsonEditor
          v-model="jsonData"
          :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
          }"
          :obj-data="jsonData"
        ></JsonEditor>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="w-2">
          <div class="code-pre">
            <div slot="content">
              <pre>
							<code id="res_code" class="json"></code>
						</pre>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import hljs from "vue-json-edit/node_modules/highlight.js";
  import { getRouterList } from "@/api/router";
  import { MenuCreate } from "@/api/api";
  export default {
    name: "App",
    data: function () {
      return {
        jsonData: {},
      };
    },
    watch: {
      jsonData: function () {
        let c = this.formatJson(JSON.stringify(this.jsonData));
        this.drawResCode(c);
      },
    },
    created() {
      this.fetchData();
    },
    mounted: function () {
      let c = this.formatJson(JSON.stringify(this.jsonData));
      this.drawResCode(c);
    },
    methods: {
      //JSON format print
      formatJson: function (txt, compress /*是否为压缩模式*/) {
        /* 格式化JSON源码(对象转换为JSON文本) */
        var indentChar = "  ";
        if (/^\s*$/.test(txt)) {
          console.error("数据为空,无法格式化! ");
          return;
        }
        try {
          var data = eval("(" + txt + ")");
        } catch (e) {
          throw (
            ("数据源语法错误,格式化失败! 错误信息: " + e.description, "err")
          );
          return;
        }
        var draw = [],
          last = false,
          This = this,
          line = compress ? "" : "\n",
          nodeCount = 0,
          maxDepth = 0;

        var notify = function (name, value, isLast, indent /*缩进*/, formObj) {
          nodeCount++; /*节点计数*/
          for (var i = 0, tab = ""; i < indent; i++)
            tab += indentChar; /* 缩进HTML */
          tab = compress ? "" : tab; /*压缩模式忽略缩进*/
          maxDepth = ++indent; /*缩进递增并记录*/
          if (value && value.constructor == Array) {
            /*处理数组*/
            draw.push(
              tab + (formObj ? '"' + name + '":' : "") + "[" + line
            ); /*缩进'[' 然后换行*/
            for (var i = 0; i < value.length; i++)
              notify(i, value[i], i == value.length - 1, indent, false);
            draw.push(
              tab + "]" + (isLast ? line : "," + line)
            ); /*缩进']'换行,若非尾元素则添加逗号*/
          } else if (value && typeof value == "object") {
            /*处理对象*/
            draw.push(
              tab + (formObj ? '"' + name + '":' : "") + "{" + line
            ); /*缩进'{' 然后换行*/
            var len = 0,
              i = 0;
            for (var key in value) len++;
            for (var key in value)
              notify(key, value[key], ++i == len, indent, true);
            draw.push(
              tab + "}" + (isLast ? line : "," + line)
            ); /*缩进'}'换行,若非尾元素则添加逗号*/
          } else {
            if (typeof value == "string") value = '"' + value + '"';
            draw.push(
              tab +
                (formObj ? '"' + name + '":' : "") +
                value +
                (isLast ? "" : ",") +
                line
            );
          }
        };
        var isLast = true,
          indent = 0;
        notify("", data, isLast, indent, false);
        return draw.join("");
      },

      //绘制res body
      drawResCode: function (content) {
        var target = document.getElementById("res_code");
        target.textContent = content;
        hljs.highlightBlock(target);
      },
      async fetchData() {
        const res = await getRouterList();
        this.jsonData = {
          data: res.data,
        };
        this.res = res;
      },
      async handleSave() {
        var menuJson = JSON.stringify(this.jsonData.data);
        const { msg } = await MenuCreate({ menu: menuJson });
        this.$baseMessage(msg, "success");
        this.fetchData();
      },
      handleReset() {
        this.fetchData();
      },
    },
  };
</script>

<style>
  @import "~vue-json-edit/node_modules/highlight.js/styles/github.css";
</style>

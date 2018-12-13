<template>
  <div class="CheckContent">
    <div class="courseHtml" v-html="ResHTML"></div>
    <div class="courseCheck">
      <div class="courseBox" v-for="(course, index) in courseArr">
        <div>
          <span>{{course.name}}</span>
          <span class="teacher">{{course.teacher}}</span>
        </div>
        <div class="courseUnitContent">
          <div class="courseUnit" v-for="item in course.courseUnits">
            <span class="text">{{item.smartWeeks | formatSmartWeeks}}</span>
            <span class="text">{{item.dayOfWeek}}</span>
            <span class="text">第{{item.timeStart}}节</span>
            <span class="text">{{item.building}}{{item.room}}</span>
          </div>
        </div>
        <div class="radioContent">
          <input
            class="radioStyle"
            type="radio"
            value="true"
            :name="index"
            v-model="checkForm[index].isCorrect"
          >
          <span class="radioText">完全正确</span>
          <input
            class="radioStyle"
            type="radio"
            value="false"
            :name="index"
            v-model="checkForm[index].isCorrect"
          >
          <span class="radioText">有错误</span>
          <input
            class="errorInput"
            type="text"
            placeholder="错在哪里"
            v-model="checkForm[index].errorMessage"
          >
        </div>
      </div>
      <input class="submitBtn" type="button" value="提交" @click="submit">
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      ResHTML: "",
      courseArr: [],
      checkForm: []
    };
  },
  filters: {
    formatSmartWeeks: function(value) {
      const indexArr = [];
      for (let i = 0; i < value.length; i++) {
        if (value[i] === 1) {
          indexArr.push(i + 1);
        }
      }
      const singleChildArray = []; //存放不连续的数组
      let childArray = []; //存放当前连续数组
      const childArrayContent = []; //存放连续数组的数组
      let serial = false; //标记变量，标记目前是否是连续的
      for (let i = 0; i < indexArr.length; i++) {
        if (indexArr[i + 1] - indexArr[i] === 1) {
          serial = true;
          childArray.push(indexArr[i]);
          childArray.push(indexArr[i + 1]);
        } else {
          serial = false;
        }
        //serial是false，说明当前连续已被断开
        if (!serial) {

          // 数组去重
          const formatChildSet = new Set(childArray);
          const formatChildArray = [...formatChildSet];
          if (formatChildArray.length !== 0) {
            childArrayContent.push(formatChildArray);
          }

          if (i === indexArr.length - 1) {
            let lastIsExsit = false;
            for (let j = 0; j < childArrayContent.length; j++) {
              const childArrayItem = [...childArrayContent[j]];
              if (childArrayItem.indexOf(indexArr[i]) !== -1) {
                lastIsExsit = true;
              } else {
                lastIsExsit = false;
              }
            }
            if (!lastIsExsit) {
              singleChildArray.push(indexArr[i]);
            }
          } else {
            singleChildArray.push(indexArr[i]);
          }

          childArray = [];
        }
      }
      const singleChildStr = singleChildArray.join(",");
      let childStr = "";
      for (let q = 0; q < childArrayContent.length; q++) {
        const lastIndex = childArrayContent[q].length - 1;
        childStr =
          childArrayContent[q][0] + "-" + childArrayContent[q][lastIndex] + " ";
      }
      return singleChildStr + childStr + "周";
    }
  },
  async mounted() {
    const getData = await axios.get("http://127.0.0.1:7001/getCheckData");
    // console.log(getData.data);
    this.ResHTML = getData.data.html;
    this.courseArr = getData.data.courseArr;

    // 初始化审核表单
    const checkForm = [];
    for (let i = 0; i < getData.data.courseArr.length; i++) {
      checkForm.push({
        isCorrect: true,
        errorMessage: "",
        id: getData.data.courseArr[i]._id
      });
    }
    this.checkForm = checkForm;
    // console.log(checkForm);
  },
  methods: {
    async submit() {
      console.log(this.checkForm);
      const reqData = {
        checkForm: this.checkForm
      }
      const postCheckDataRes = await axios.post("http://127.0.0.1:7001/postCheckData", reqData);

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.CheckContent {
  display: flex;
  height: 100vh;
  width: 100vw;
}
.courseHtml {
  flex-basis: 50%;
  height: 100%;
}
.courseCheck {
  flex-basis: 40%;
  /* padding: 20px; */
  margin-left: 20px;
  font-size: 20px;
  font-family: "黑体";
}
.courseBox {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}
.courseUnitContent {
  display: flex;
  flex-direction: column;
}
.courseUnit {
  margin: 5px 10px 0 10px;
}
.radioStyle {
  height: 30px;
  width: 30px;
  margin-left: 10px;
}
.radioContent {
  display: flex;
  margin-top: 10px;
}
.teacher {
  color: rgb(218, 10, 10);
  margin-left: 30px;
}
.text {
  margin-right: 20px;
}
.radioText {
  margin-top: 3px;
  margin-left: 10px;
}
.errorInput {
  margin-left: 20px;
  width: 300px;
  font-size: 17px;
}
.submitBtn {
  height: 40px;
  width: 80px;
  font-size: 24px;
  margin: 20px 0 30px 200px;
}
</style>

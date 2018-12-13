<template>
  <div class="CheckContent">
    <div class="calendarContent">
      <div class="calendarBox">
        <Calendar :sundayStart="true" ref="calendar1"></Calendar>
        <Calendar :sundayStart="true" ref="calendar2"></Calendar>
        <Calendar :sundayStart="true" ref="calendar3"></Calendar>
        <Calendar :sundayStart="true" ref="calendar4"></Calendar>
      </div>
      <div class="calendarBox">
        <Calendar :sundayStart="true" ref="calendar5"></Calendar>
        <Calendar :sundayStart="true" ref="calendar6"></Calendar>
        <Calendar :sundayStart="true" ref="calendar7"></Calendar>
        <Calendar :sundayStart="true" ref="calendar8"></Calendar>
      </div>
      <div class="calendarBox">
        <Calendar :sundayStart="true" ref="calendar9"></Calendar>
        <Calendar :sundayStart="true" ref="calendar10"></Calendar>
        <Calendar :sundayStart="true" ref="calendar11"></Calendar>
        <Calendar :sundayStart="true" ref="calendar12"></Calendar>
      </div>
      <div class="calendarBox">
        <Calendar :sundayStart="true" ref="calendar13"></Calendar>
      </div>
    </div>
    <div class="dateCheck">
      <div class="courseBox" v-for="(course, index) in courseArr">
        <div class="courseUnitContent">
          <div class="courseUnit" v-for="item in course.courseUnits">
            <div>
              <span class="text">{{item.dayOfWeek}}</span>
              <span class="text">第{{item.timeStart}}节</span>
            </div>
            <span class="text">智能周：{{item.smartWeeks}}</span>
            <!-- <span class="text">{{item.dateArr}}</span> -->
            <el-checkbox-group>
              <el-checkbox-button v-for="date in item.dateArr" :label="date" :key="date">{{date}}</el-checkbox-button>
            </el-checkbox-group>
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
import Calendar from "vue-calendar-component";
export default {
  components: {
    Calendar
  },
  data: function() {
    return {
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      year: "2018",
      courseArr: [],
      checkForm: []
    };
  },
  async mounted() {
    this.months.map((e, i) => {
      if (e !== 13) {
        this.$refs["calendar" + e].ChoseMonth(
          this.year + "-" + e + "-1",
          false
        );
      } else {
        this.$refs["calendar" + e].ChoseMonth(
          Number(this.year) + 1 + "-1-1",
          false
        );
      }
    });

    const getCheckDateDataRes = await axios.get(
      "http://127.0.0.1:7001/getCheckDateData"
    );
    console.log(getCheckDateDataRes.data);
    this.courseArr = getCheckDateDataRes.data;

    // 初始化审核表单
    const checkForm = [];
    for (let i = 0; i < getCheckDateDataRes.data.length; i++) {
      checkForm.push({
        isCorrect: true,
        errorMessage: "",
        id: getCheckDateDataRes.data[i]._id
      });
    }
    this.checkForm = checkForm;
  },
  methods: {
    async submit() {
      console.log(this.checkForm);
      const reqData = {
        checkForm: this.checkForm
      };
      const postCheckDateDataRes = await  axios.post("http://127.0.0.1:7001/postCheckDateData", reqData);
      console.log(postCheckDateDataRes.data);
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
.calendarContent {
  flex-basis: 50%;
  height: 100%;
  overflow: scroll;
  /* display: flex;
  flex-direction: column; */
}
.dateCheck {
  flex: 1;
  /* padding: 20px; */
  margin-left: 20px;
  font-size: 20px;
  font-family: "黑体";
  height: 100%;
  overflow: scroll;
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
  display: flex;
  flex-direction: column;
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
.calendarBox {
  display: flex;
}
/* .wh_content_all {
  height: 100%!important;
} */
.wh_container {
  margin: 0 !important;
}
</style>

<template>
  <div class="CheckContent">
    <div class="courseHtml" v-html="ResHTML"></div>
    <div class="courseCheck">
      <div class="courseBox" v-for="(course, index) in courseArr">
        <!-- <input type="checkbox" :value="index"> -->
        <div>
          <span>{{course.name}}</span>
          <span class="teacher">{{course.teacher}}</span>
        </div>
        <div class="courseUnitContent">
          <div class="courseUnit" v-for="item in course.courseUnits">
            <span class="text">{{item.weeks}}</span>
            <span class="text">{{item.dayOfWeek}}</span>
            <span class="text">第{{item.timeStart}}节</span>
            <span class="text">{{item.building}}{{item.room}}</span>
          </div>
        </div>
        <div class="radioContent">
          <input class="radioStyle" type="radio" :name="index">
          <span class="radioText">完全正确</span>
          <input class="radioStyle" type="radio" :name="index">
          <span class="radioText">有错误</span>
          <input class="errorInput" type="text" placeholder="错在哪里">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      ResHTML: "",
      courseArr: []
    };
  },
  async mounted() {
    const getData = await axios.get("http://127.0.0.1:7001/login");
    console.log(getData.data);
    this.ResHTML = getData.data.html;
    this.courseArr = getData.data.newCourseArr;
  },
  methods: {}
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
  flex: 1;
  padding: 20px;
  font-size: 20px;
  font-family: "黑体"
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
  font-size: 17px
}
</style>

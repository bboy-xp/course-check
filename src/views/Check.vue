<template>
  <div class="CheckContent">
    <div class="courseHtml" v-html="ResHTML"></div>
    <div class="courseCheck">
      <div class="courseBox" v-for="(course, index) in courseArr" key="index">
        <input type="checkbox" :value="index">
        <span>{{course.name}}</span>
        <div>{{course.teacher}}</div>
        <div class="courseUnitContent">
          <div class="courseUnit" v-for="item in course.courseUnits">
            <div>{{item.weeks}}</div>
            <div>{{item.building}}{{item.room}}</div>
          </div>
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
}
.courseBox {
  margin-bottom: 10px;
}
.courseUnitContent {
  display: flex;
}
.courseUnit {
  margin: 3px 10px;
}
</style>
